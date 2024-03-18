import { getPNode, getPointCon, sysSvgUrl } from '.'
import { CustomPathProps } from '../type'
import * as d3 from 'd3'
import { renderSvg } from './index'
import { cloneDeep, isEqual } from 'lodash'
import SvgFetch from '../../LczLightFlowPath/common/SvgFetch'
import { defaultBodyConfig, defaultPathConfig } from './defaultValue'
import FlowPathAni from './FlowPathAni'

type initSvgObj = {
  html: string
  svgNode: SVGSVGElement
}

interface MLightFlowPathProps {
  wrapper: HTMLDivElement
  refSvgNode: SVGSVGElement
  customPathProps: CustomPathProps
  gradientColorId: string
}

type Point = {
  x: number
  y: number
  rotate: number
}

export default class CustomPath {
  customPathConfig: MLightFlowPathProps
  points: Point[] = []
  flowPathAni: FlowPathAni | null = null
  initSvgObj?: initSvgObj //请求过来的初始svg
  svgPathNode?: SVGPathElement //过滤后的path
  bodyObj?: any

  constructor(comProps: MLightFlowPathProps) {
    this.customPathConfig = comProps
    this.init()
  }

  async init(sizeChange = false) {
    try {
      const update = await this.setSvgObj()
      this.getSvgPoint()
      ;(update || sizeChange) && this.renderFlowPathAndAni()
    } catch (error) {
      console.warn(error)
    }
  }

  async update(customPathProps: CustomPathProps) {
    const { w, h, pathConfig, offset, bodyConfig, animation } = customPathProps,
      lastcustomPathProps = cloneDeep(this.customPathConfig.customPathProps)
    this.customPathConfig.customPathProps = customPathProps

    if (
      w !== lastcustomPathProps.w ||
      h !== lastcustomPathProps.h ||
      !isEqual(pathConfig, lastcustomPathProps.pathConfig) ||
      !isEqual(offset, lastcustomPathProps.offset)
    ) {
      // 全部更新
      this.init(w !== lastcustomPathProps.w || h !== lastcustomPathProps.h)
    } else if (
      !isEqual(bodyConfig, lastcustomPathProps.bodyConfig) ||
      !isEqual(animation, lastcustomPathProps.animation)
    ) {
      this.renderFlowPathAndAni()
    }
  }

  drawPath(node: SVGPathElement) {
    const { pathConfig = defaultPathConfig } = this.customPathConfig.customPathProps,
      { lineWidth, color, lineType } = pathConfig
    node.setAttribute('stroke-width', lineWidth + '')
    node.setAttribute('stroke', color)
    node.setAttribute('fill', 'none')
    node.setAttribute('stroke-dasharray', `${lineType == 'solid' ? '' : '5'}`)
    node.setAttribute('style', 'visibility:visible')
  }

  drawBody() {
    this.clearBody()
    const { bodyConfig = defaultBodyConfig } = this.customPathConfig.customPathProps
    const g = d3.select(this.customPathConfig.refSvgNode).append('g')
    g.attr('style', 'visibility: hidden;')

    switch (bodyConfig.bodyType) {
      case 'circle':
        {
          const circle = g.append('circle')
          circle.attr('x', `-${bodyConfig.circleRadius}`)
          circle.attr('y', `-${bodyConfig.circleRadius}`)
          circle.attr('r', bodyConfig.circleRadius)
          circle.attr('fill', `url(#${this.customPathConfig.gradientColorId})`)
        }
        break
      case 'rect':
        {
          const rect = g.append('rect')
          rect.attr('width', bodyConfig.rectWidth)
          rect.attr('height', bodyConfig.rectHeight)
          rect.attr('fill', `url(#${this.customPathConfig.gradientColorId})`)
          rect.attr('style', `transform: translate(-${bodyConfig.rectWidth / 2}px, -${bodyConfig.rectHeight / 2}px);`)
        }
        break
      case 'img':
        {
          const img = g.append('image')
          img.attr('xlink:href', bodyConfig.img)
          img.attr('width', bodyConfig.imgWidth)
          img.attr('height', bodyConfig.imgHeight)
          img.attr('preserveAspectRatio', 'none')
          img.attr('style', `transform: translate(-${bodyConfig.imgWidth / 2}px, -${bodyConfig.imgHeight / 2}px);`)
        }
        break
    }
    this.bodyObj = g
  }

  clearBody() {
    this.bodyObj && this.bodyObj.remove()
  }

  async setSvgObj() {
    const { w = 0, h = 0, pathConfig } = this.customPathConfig.customPathProps,
      { type = 'system', systemUrl = 'straight-line', customType = 'file', customFileUrl = '', customPath = '' } =
        pathConfig || {}

    let fileUrl = '',
      resolve = '',
      updata = false

    if (type === 'custom') {
      if (customType === 'file') {
        fileUrl = customFileUrl
      } else {
        customPath && (resolve = `<svg viewBox="0 0 ${w} ${h}"><path d="${customPath}"></path></svg>`)
      }
    } else {
      fileUrl = sysSvgUrl[systemUrl]
    }

    if (fileUrl) resolve = await SvgFetch.getFileStr(fileUrl)

    if (resolve) {
      resolve !== this.initSvgObj?.html && (updata = true)
      const xml = new DOMParser().parseFromString(resolve, 'image/svg+xml')
      const svgEl = xml.getElementsByTagName('svg')[0]
      const svg = renderSvg(svgEl, this.customPathConfig.wrapper)

      this.initSvgObj = {
        html: resolve,
        svgNode: svg
      }
    }
    return updata
  }

  getSvgPoint() {
    if (!this.initSvgObj || !this.initSvgObj.svgNode) return false
    this.machinPoints()
    this.initSvgObj.svgNode.remove()
  }

  machinPoints() {
    const svgNode = this.initSvgObj?.svgNode,
      pNode = getPNode(svgNode)
    if (!svgNode || !pNode) return false
    this.drawPath(pNode)
    const totleLength = pNode.getTotalLength(),
      points: Point[] = []
    for (let i = 0; i < totleLength; i++) {
      const _data = getPointCon(pNode, i, totleLength)
      points.push(_data)
    }

    let { width: svgWidth, height: svgHidth } = svgNode.getBoundingClientRect()
    const svgViewBox = svgNode.viewBox

    if (svgViewBox && svgViewBox.baseVal) {
      svgWidth = svgViewBox.baseVal.width
      svgHidth = svgViewBox.baseVal.height
    }
    const { pathConfig = defaultPathConfig } = this.customPathConfig.customPathProps

    const svgRef = this.customPathConfig.refSvgNode
    svgRef.setAttribute('width', `${svgWidth}`)
    svgRef.setAttribute('height', `${svgHidth}`)
    svgRef.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHidth}`)
    svgRef.setAttribute('transform', `scale(${pathConfig.scale})`)

    this.svgPathNode && this.customPathConfig.refSvgNode.removeChild(this.svgPathNode)
    this.customPathConfig.refSvgNode.appendChild(pNode)
    this.svgPathNode = pNode
    this.points = points
  }

  renderFlowPathAndAni() {
    this.drawBody()
    try {
      this.flowPathAni && (this.flowPathAni.destroy(), (this.flowPathAni = null))
      this.flowPathAni = new FlowPathAni(this.bodyObj, this.points, this.customPathConfig.customPathProps)
    } catch (error) {
      console.warn(error)
    }
  }

  destory() {
    this.clearBody()
    this.initSvgObj && this.initSvgObj.svgNode.remove()
    this.svgPathNode && this.customPathConfig.refSvgNode.removeChild(this.svgPathNode)
  }
}
