import { getPNode, sysSvgUrl } from '.'
import { LightFlowPathProps } from '../type'
import SvgFetch from './SvgFetch'
import { renderSvg } from './index'
import ColorUtil, { IColorObj } from '../../common/util/ColorUtil'
import { Tween } from '@tweenjs/tween.js'
import { cloneDeep, isEqual } from 'lodash'

type SvgObj = {
  html: string
  svgNode: SVGSVGElement
}

type Point = {
  x: number
  y: number
}

interface MLightFlowPathProps {
  wrapper: HTMLDivElement
  refPathCtx: CanvasRenderingContext2D
  refFlowPathCtx: CanvasRenderingContext2D
  lightPathProps: LightFlowPathProps
}

const PI2 = 2 * Math.PI

export default class LightFlowPath {
  flowPathConfig: MLightFlowPathProps
  svgObj?: SvgObj
  points: Point[] = []
  flowPath: flowPath | null = null
  renderFlowTimer: NodeJS.Timeout | null = null

  constructor(comProps: MLightFlowPathProps) {
    this.flowPathConfig = comProps

    this.init()
  }

  async init(sizeChange = false) {
    try {
      const update = await this.setSvgObj()
      this.getSvgPoint()
      this.drawPath()
      ;(update || sizeChange) && this.renderFlowPath()
    } catch (error) {
      console.warn(error)
    }
  }

  async update(lightPathProps: LightFlowPathProps) {
    const { w, h, pathConfig, lineConfig, animation } = lightPathProps,
      lastLightPathProps = cloneDeep(this.flowPathConfig.lightPathProps)
    this.flowPathConfig.lightPathProps = lightPathProps

    if (
      w !== lastLightPathProps.w ||
      h !== lastLightPathProps.h ||
      !isEqual(pathConfig, lastLightPathProps.pathConfig)
    ) {
      // 全部更新
      this.init(w !== lastLightPathProps.w || h !== lastLightPathProps.h)
    }

    if (!isEqual(lineConfig, lastLightPathProps.lineConfig) || !isEqual(animation, lastLightPathProps.animation)) {
      // 更新流动的线
      this.renderFlowPath()
    }
  }

  drawPath() {
    if (!this.points.length) return

    this.clearPath()
    const { lightPathProps, refPathCtx } = this.flowPathConfig,
      { lineWidth = 1, color = '#fff', shadow } = lightPathProps.pathConfig || {},
      { display = false, color: sColor = '#fff', vague = 0 } = shadow || {}
    if (lineWidth <= 0) return

    refPathCtx.fillStyle = color
    for (let i = 0; i < this.points.length; i++) {
      const { x, y } = this.points[i]
      refPathCtx.beginPath()
      refPathCtx.arc(x, y, lineWidth / 2, 0, PI2)
      refPathCtx.closePath()
      refPathCtx.shadowBlur = display ? vague : 0
      refPathCtx.shadowColor = display ? sColor : 'transparent'
      refPathCtx.fill()
    }
  }

  clearPath() {
    const refPathCtx = this.flowPathConfig.refPathCtx
    refPathCtx.clearRect(0, 0, refPathCtx.canvas.width, refPathCtx.canvas.height)
  }

  renderFlowPath() {
    if (this.renderFlowTimer) clearTimeout(this.renderFlowTimer)

    this.renderFlowTimer = setTimeout(() => {
      try {
        this.flowPath && (this.flowPath.destroy(), (this.flowPath = null))
        const { refFlowPathCtx, lightPathProps } = this.flowPathConfig
        if (
          !this.points.length ||
          (lightPathProps.lineConfig?.length || 0) <= 0 ||
          (lightPathProps.lineConfig?.size || 0) <= 0 ||
          (lightPathProps.animation?.duration || 0) <= 0
        )
          return
        this.flowPath = new flowPath(refFlowPathCtx, this.points, lightPathProps)
      } catch (error) {
        console.warn(error)
      }
    }, 100)
  }

  getSvgPoint() {
    if (!this.svgObj || !this.svgObj.svgNode) return false

    this.machinPoints()
    this.svgObj.svgNode.remove()
  }

  machinPoints() {
    const svgNode = this.svgObj?.svgNode,
      pNode = getPNode(svgNode)
    if (!svgNode || !pNode) return false

    let { width: svgWidth, height: svgHidth } = svgNode.getBoundingClientRect()
    const svgViewBox = svgNode.viewBox

    if (svgViewBox && svgViewBox.baseVal) {
      svgWidth = svgViewBox.baseVal.width
      svgHidth = svgViewBox.baseVal.height
    }

    const { w = 100, h = 100 } = this.flowPathConfig.lightPathProps,
      scale = { x: w / svgWidth, y: h / svgHidth },
      totleLength = pNode.getTotalLength(),
      points: Point[] = []
    for (let i = 0; i < totleLength; i++) {
      let { x, y } = pNode.getPointAtLength(i)
      x = x * scale.x
      y = y * scale.y
      points.push({ x, y })
    }

    this.points = points
  }

  async setSvgObj() {
    const { w = 0, h = 0, pathConfig } = this.flowPathConfig.lightPathProps,
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
      resolve !== this.svgObj?.html && (updata = true)
      const xml = new DOMParser().parseFromString(resolve, 'image/svg+xml')
      const svgEl = xml.getElementsByTagName('svg')[0]
      const svg = renderSvg(svgEl, this.flowPathConfig.wrapper)

      this.svgObj = {
        html: resolve,
        svgNode: svg
      }
    }
    return updata
  }

  destory() {
    this.clearPath()
    this.svgObj && this.svgObj.svgNode.remove()
    this.flowPath && this.flowPath.destroy()
    // @ts-ignore
    this.flowPathConfig = this.svgObj = this.points = this.flowPath = null
  }
}

class flowPath {
  ctx: CanvasRenderingContext2D
  points: Point[]
  pathLength: number
  config: LightFlowPathProps
  length = 100
  speed = 0
  colorLerp?: ColorRange
  delayTimer?: NodeJS.Timeout
  offset = { value: 0 }
  tweenInstance: Tween<{ value: number }> | null = null
  animateId?: number

  constructor(ctx: CanvasRenderingContext2D, points: Point[], config: LightFlowPathProps) {
    this.ctx = ctx
    this.points = cloneDeep(points)
    this.config = config
    this.pathLength = this.points.length

    this.init()
  }

  init() {
    this.getColorRange()
    const { animation, lineConfig } = this.config,
      { delay = 0, duration = 3, reverse = false } = animation || {}
    const pointLen = this.points.length
    this.speed = pointLen / (duration * 1000)
    this.length = lineConfig?.length || 100

    reverse && this.points.reverse()
    this.delayTimer = setTimeout(this.start.bind(this), delay * 1000)
  }

  start() {
    this.cancelTweenAnimate()
    const { loop = true, interval = 0, duration = 1 } = this.config.animation || {}

    const intervalTime = !loop ? interval * 1000 : 0,
      startVal = loop ? 0 : -this.length - 1,
      endVal = this.pathLength

    this.tweenInstance = new Tween({
      value: startVal
    })
      .to({ value: endVal }, duration * 1000)
      .repeat(Infinity)
      .delay(intervalTime)
      .start()
      .onUpdate(offset => {
        this.offset = offset

        this.render()
      })

    this.animate()
  }

  cancelTweenAnimate() {
    this.tweenInstance && (this.tweenInstance.stop(), (this.tweenInstance = null))
    this.animateId && cancelAnimationFrame(this.animateId)
  }

  animate() {
    if (!this.tweenInstance) return
    this.animateId = requestAnimationFrame(this.animate.bind(this))
    this.tweenInstance.update()
  }

  render() {
    const { ctx, points, pathLength, length, colorLerp, config } = this,
      { shadow, size = 1 } = config.lineConfig || {},
      { display = false, color = '#fff', vague = 0 } = shadow || {},
      loop = config.animation?.loop || false,
      offset = Math.round(this.offset.value)
    this.clear()

    ctx.shadowBlur = display ? vague : 0
    ctx.shadowColor = display ? color : 'transparent'

    for (let cur = offset; cur <= offset + length - 1; cur++) {
      const curPoint = loop ? points[cur % pathLength] : points[cur]
      if (curPoint) {
        const i = (cur - offset) / (length - 1)
        ctx.fillStyle = colorLerp?.get(i) || '#fff'
        ctx.beginPath()
        ctx.arc(curPoint.x, curPoint.y, size, 0, PI2)
        ctx.closePath()
        ctx.fill()
      }
    }
  }

  clear() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }

  getColorRange() {
    const { color, length = 100 } = this.config.lineConfig || {}
    this.colorLerp = new ColorRange(color, length)
  }

  destroy() {
    this.cancelTweenAnimate()
    this.clear()
    this.delayTimer && clearTimeout(this.delayTimer)
    // @ts-ignore
    this.colorLerp = this.config = this.points = null
  }
}

class ColorRange {
  color: any
  length: number
  range: any = []
  constructor(color, length: number) {
    this.color = color
    this.length = length
    this.getRange()
  }

  getRange() {
    const { selected = 'single', gradient } = this.color || {}
    let { colors = [] } = gradient || {}
    const colorLen = colors.length

    if (selected === 'single' || colorLen === 1) return

    const colorAllZero = colors.every(v => v.begins === 0)
    if (colorAllZero) colors = colors.map((v, i) => ({ ...v, begins: (100 / (colorLen - 1)) * i }))
    const colorsObj = {}
    colors.forEach(v => (colorsObj[v.begins] = v))
    colors = Object.values(colorsObj)
    colors.sort((a, b) => a.begins - b.begins)
    if (colors[0].begins > 0) {
      colors.unshift({
        begins: 0,
        value: colors[0].value
      })
    }
    const lastColor = colors[colors.length - 1]
    if (lastColor.begins < 100) {
      colors.push({
        begins: 100,
        value: lastColor.value
      })
    }

    for (let i = 0; i < colors.length - 1; i++) {
      const { value, begins } = colors[i],
        beginsPercentage = begins / 100,
        startColor = ColorUtil.parseColorString(value),
        endColor = ColorUtil.parseColorString(colors[i + 1].value)

      this.range.push({
        pos: begins / 100,
        step: colors[i + 1].begins / 100 - beginsPercentage,
        start: startColor,
        end: endColor,
        diff: this.getDiff(startColor, endColor)
      })
    }
  }

  get(i: number) {
    const { selected = 'single', single = '#fff', gradient } = this.color || {},
      { colors = [] } = gradient || {}

    if (selected === 'single' || colors.length === 1) {
      let signColor = single
      if (selected === 'gradient') signColor = colors[0].value
      return signColor
    }

    if (this.length === 1) {
      return colors[0].value
    }

    for (const item of this.range) {
      const val = (i - item.pos) / item.step
      if (val >= 0 && val <= 1) {
        const inc = this.getIncrement(item.diff, val)
        const cColor = this.getCurColor(item.start, inc)
        return ColorUtil.toRgbaString(cColor)
      }
    }
    return null
  }

  getCurColor(start, inc) {
    const resolve = {}
    for (const key in start) {
      resolve[key] = start[key] + inc[key]
    }
    return resolve as IColorObj
  }

  getIncrement(diff, val) {
    const resolve = {}
    for (const key in diff) {
      resolve[key] = diff[key] * val
    }
    return resolve as IColorObj
  }

  getDiff(startColor: IColorObj, endColor: IColorObj) {
    const resolve = {}
    for (const key in endColor) {
      resolve[key] = endColor[key] - startColor[key]
    }
    return resolve as IColorObj
  }
}
