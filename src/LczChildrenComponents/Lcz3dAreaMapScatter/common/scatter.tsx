import { cloneDeep, isEqual } from 'lodash'
import * as d3 from 'd3'
import * as THREE from 'three'
import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { OutScatter, ScatterData, ScatterStyle, Scattertype } from '../../../Lcz3dAreaMap/type/child'
import { arrDuplicateRemove } from '../../../common/util'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { removeComponents } from '../../../Lcz3dAreaMap/common'
import React from 'react'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import ReactDOM from 'react-dom'
import SignContain from '../components/SignContain'
import ScatterContainer from '../components/ScatterContainer'

interface ScatterProps {
  scatter: OutScatter
  threeMap: CreateThreeMap
  level: number
  stretchHeight?: number
  scatterEvent?: (data: ScatterData) => void
}

type ScatterSignElType = {
  [key in 'scatter' | 'sign']: { [key: string]: HTMLDivElement }
}

export default class Scatter {
  scatter: OutScatter
  mapInstance: CreateThreeMap
  level: number
  scatterObj = new THREE.Object3D()
  stylesObj: { [key: string]: { data: ScatterData[]; style: ScatterStyle } } = {}
  show = true
  linear?: (val: number) => number
  scatterEvent?: (data: ScatterData) => void
  scatterSignEl: ScatterSignElType = { scatter: {}, sign: {} }
  constructor(option: ScatterProps) {
    this.scatter = option.scatter
    this.mapInstance = option.threeMap
    this.level = option.level
    this.scatterEvent = option.scatterEvent

    this.mapInstance.mapGroud.add(this.scatterObj)

    this.initLevel()
  }

  initLevel() {
    const levels = this.scatter.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v)))

    if (levels === '' || levelArr.includes(this.level)) {
      this.mapInstance.initCss3dRenderer()
      this.mapInstance.hasChildCom[this.scatter.id] = true
      this.show = true
    } else {
      this.clearElement()
      this.scatterObj.remove(...this.scatterObj.children)
      this.scatterObj.clear()
      this.mapInstance.hasChildCom[this.scatter.id] = false
      this.show = false
    }
  }

  async updataView({ scatter, threeMap, level, stretchHeight = 1 }: ScatterProps) {
    this.level = level
    this.initLevel()
    this.mapInstance = threeMap

    const lastConfig = cloneDeep(this.scatter)
    this.scatter = scatter

    if (
      !this.linear ||
      !isEqual(lastConfig.globalConfig?.size, scatter.globalConfig?.size) ||
      !isEqual(lastConfig.data, scatter.data)
    ) {
      this.getLinear()
    }

    if (
      !Object.keys(this.stylesObj).length ||
      !isEqual(lastConfig.data, scatter.data) ||
      !isEqual(lastConfig.scatterNormalStyle, scatter.scatterNormalStyle) ||
      !isEqual(lastConfig.scatterStyleList, scatter.scatterStyleList) ||
      lastConfig.globalConfig?.zIndex !== scatter.globalConfig?.zIndex
    ) {
      this.stylesObj = this.getScatterStylesObj()
    }
    this.show && this.drawScatter()

    const { offset, scale } = this.mapInstance
    this.scatterObj.position.x = offset.x * scale.x
    this.scatterObj.position.y = offset.y * scale.y
    this.scatterObj.position.z = stretchHeight

    this.mapInstance.cssRenderer()
  }

  drawScatter() {
    const scale = this.mapInstance.scale,
      scatterData = this.scatter.data || [],
      scatterObjClone = this.scatterObj.clone(),
      signObj = this.scatterObj.getObjectByName('散点-标牌') as THREE.Object3D

    // 去除无数据的散点
    for (let i = 0; i < scatterObjClone.children.length; i++) {
      const css3dObj = scatterObjClone.children[i] as CSS3DObject,
        name = css3dObj?.name,
        findata = scatterData.find(itemData => name === `scatter${this.scatter.id}_${itemData.lng}|${itemData.lat}`)

      if (!findata && css3dObj && css3dObj.name !== '散点-标牌') {
        const _scatter3d = this.scatterObj.getObjectByName(name) as CSS3DObject
        _scatter3d && this.scatterObj.remove(_scatter3d)
        _scatter3d && _scatter3d.clear()
        _scatter3d && removeComponents(_scatter3d.element)
        removeComponents(this.scatterSignEl['scatter'][name])
        delete this.scatterSignEl['scatter'][name]

        if (signObj) {
          const data = _scatter3d.userData,
            signName = `sign${this.scatter.id}_${data.lng}|${data.lat}`,
            css2d = signObj.children.find(item => item.name === signName)
          css2d && signObj.remove(css2d)
          removeComponents(this.scatterSignEl['sign'][signName])
          delete this.scatterSignEl['sign'][signName]
        }
      }
    }

    for (const key in this.stylesObj) {
      const { data, style } = this.stylesObj[key],
        { scatter, scatterSign } = style

      for (let i = 0; i < data.length; i++) {
        const { lng, lat, value } = data[i],
          size = this.linear ? this.linear(value) : 0,
          scatterName = `${this.scatter.id}_${lng}|${lat}`,
          _scatterName = 'scatter' + scatterName,
          _scatterObj = this.scatterObj.getObjectByName('scatter' + scatterName) as CSS3DObject

        if (!_scatterObj) {
          if (scatter?.imgUrl) {
            const element = document.createElement('div')
            element.className = 'pointer-event-none'
            const objectCSS = new CSS3DObject(element)
            objectCSS.position.x = +lng * scale.x
            objectCSS.position.y = +lat * scale.y
            objectCSS.scale.set(1 / 8, 1 / 8, 1 / 8)
            objectCSS.name = _scatterName
            objectCSS.userData = data[i]
            ReactDOM.render(
              <ScatterContainer
                key={_scatterName}
                size={size}
                scatter={scatter || ({} as Scattertype)}
                zindex={this.scatter.globalConfig?.zIndex || 1}
              />,
              element
            )
            this.scatterObj.add(objectCSS)
            this.scatterSignEl['scatter'][_scatterName] = element
          }
        } else {
          const element = _scatterObj.element
          _scatterObj.position.x = +lng * scale.x
          _scatterObj.position.y = +lat * scale.y

          ReactDOM.render(
            <ScatterContainer
              key={_scatterName}
              size={size}
              scatter={scatter || ({} as Scattertype)}
              zindex={this.scatter.globalConfig?.zIndex || 1}
            />,
            element
          )
        }

        const signName = 'sign' + scatterName,
          signObj = this.scatterObj.getObjectByName('散点-标牌') as THREE.Object3D

        if (scatterSign?.display) {
          this.mapInstance.initCss2dRenderer(true)
          const offset = scatterSign.offset || { x: 0, y: 0 },
            x = +lng * scale.x + offset.x / 8,
            y = +lat * scale.y - offset.y / 8
          if (!signObj) {
            const signObj = new THREE.Object3D()
            signObj.name = '散点-标牌'
            const element = document.createElement('div'),
              objectCSS = new CSS2DObject(element)

            objectCSS.name = signName
            objectCSS.position.set(x, y, 0)
            this.scatterSignEl['sign'][signName] = element
            ReactDOM.render(
              <SignContain
                key={signName}
                scatterSign={scatterSign}
                data={data[i]}
                scatterEvent={this.signClick.bind(this)}
              />,
              element
            )
            signObj.add(objectCSS)
            this.scatterObj.add(signObj)
          } else {
            const cssObj = signObj.getObjectByName(signName) as CSS2DObject
            if (cssObj) {
              const element = cssObj.element
              cssObj.position.set(x, y, 0)
              ReactDOM.render(
                <SignContain
                  key={signName}
                  scatterSign={scatterSign}
                  data={data[i]}
                  scatterEvent={this.signClick.bind(this)}
                />,
                element
              )
            } else {
              const element = document.createElement('div'),
                objectCSS = new CSS2DObject(element)

              objectCSS.name = signName
              objectCSS.position.set(x, y, 0)
              ReactDOM.render(
                <SignContain
                  key={signName}
                  scatterSign={scatterSign}
                  data={data[i]}
                  scatterEvent={this.signClick.bind(this)}
                />,
                element
              )
              this.scatterSignEl['sign'][signName] = element
              signObj.add(objectCSS)
            }
          }
        } else {
          const cssObj = signObj && (signObj.getObjectByName(signName) as CSS2DObject)
          if (cssObj) {
            cssObj.clear()
            signObj.remove(cssObj)
            removeComponents(this.scatterSignEl['sign'][signName])
            delete this.scatterSignEl['sign'][signName]
          }
        }
      }
    }
  }

  signClick(param: ScatterData) {
    this.scatterEvent && this.scatterEvent(param)
  }

  getScatterStylesObj() {
    const { data = [], scatterNormalStyle = {}, scatterStyleList = [] } = this.scatter,
      eachData = arrDuplicateRemove(data, ['lat', 'lng']),
      scatterData = cloneDeep(eachData),
      listIndex: number[] = [],
      resolve: { [key: string]: { data: ScatterData[]; style: ScatterStyle } } = {}

    if (scatterStyleList.length) {
      scatterStyleList.forEach(style => {
        const filterData = eachData.filter((item, i) => {
          if (style?.type?.value != '' && item.type === style?.type?.value) {
            !listIndex.includes(i) && listIndex.push(i)
            return item
          }
        })
        filterData.length > 0 &&
          !resolve[style?.type?.value] &&
          (resolve[style?.type?.value] = { data: filterData, style })
      })
    }
    resolve['normal'] = { data: scatterData.filter((_, i) => !listIndex.includes(i)), style: scatterNormalStyle }
    return resolve
  }

  getLinear() {
    const { min, max } = this.scatter.globalConfig?.size || { min: { value: 6 }, max: { value: 6 } },
      minVal = isNaN(min.value) ? 0 : min.value,
      maxVal = isNaN(max.value) ? 0 : max.value,
      dataVals = (this.scatter.data || []).map(v => v.value),
      dataMax = Math.max(...dataVals),
      dataMin = Math.min(...dataVals)
    const linear = d3.scale
      .linear()
      .domain([dataMin, dataMax])
      .range([minVal, maxVal].sort((a, b) => a - b))
    this.linear = linear
  }

  clearElement(type: 'all' | 'sign' | 'scatter' = 'all') {
    switch (type) {
      case 'all': {
        for (const key in this.scatterSignEl) {
          const element = this.scatterSignEl[key]
          const elements = Object.values(element) as HTMLDivElement[]
          removeComponents(elements)
        }
        this.scatterSignEl = { scatter: {}, sign: {} }
        break
      }
      default: {
        const elObj = this.scatterSignEl[type]
        const elements = Object.values(elObj) as HTMLDivElement[]
        removeComponents(elements)
        this.scatterSignEl[type] = {}
        break
      }
    }
  }

  destroy() {
    this.mapInstance?.hasChildCom && (this.mapInstance.hasChildCom[this.scatter.id] = false)

    const signObj = this.scatterObj.getObjectByName('散点-标牌') as THREE.Object3D
    signObj && (signObj.remove(...signObj.children), signObj.clear())

    this.scatterObj.remove(...this.scatterObj.children)
    this.scatterObj.clear()

    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.scatterObj)
    !this.mapInstance.isDestroy && this.mapInstance.cssRenderer()

    this.clearElement()

    // @ts-ignore
    this.scatter = this.mapInstance = this.scatterObj = this.stylesObj = this.linear = this.scatterEvent = this.scatterSignEl = null
  }
}
