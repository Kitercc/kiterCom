import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { OutRipples, RipplesStyle } from '../../../Lcz3dAreaMap/type/child'
import { analysisExpression, randomChar } from '../../../common/util'
import Ripple from '../components/Ripple'
import { removeComponents } from '../../../Lcz3dAreaMap/common'

interface Props {
  level: number
  mapInstance: CreateThreeMap
  ripples: OutRipples
}

export default class Ripples {
  level: number
  mapInstance: CreateThreeMap
  ripples: OutRipples
  ripplesObj = new THREE.Object3D()
  uuid = randomChar('lcz-3d-area-map-ripples')
  ripplesElementArr: HTMLDivElement[] = []
  show = true
  constructor(option: Props) {
    this.level = option.level
    this.mapInstance = option.mapInstance
    this.ripples = option.ripples

    this.mapInstance.mapGroud.add(this.ripplesObj)

    this.initCss3dLayers()
  }

  initCss3dLayers() {
    const levels = this.ripples.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v)))

    if (levels === '' || levelArr.includes(this.level)) {
      this.mapInstance.initCss3dRenderer()
      this.mapInstance.hasChildCom[this.ripples.id] = true
      this.show = true
    } else {
      removeComponents(this.ripplesElementArr)
      this.mapInstance.hasChildCom[this.ripples.id] = false
      this.ripplesObj.remove(...this.ripplesObj.children)
      this.ripplesObj.clear()
      this.show = false
    }
  }

  updataView({
    level,
    mapInstance,
    ripples,
    stretchHeight
  }: {
    level: number
    mapInstance: CreateThreeMap
    ripples: OutRipples
    stretchHeight: number
  }) {
    this.level = level
    this.mapInstance = mapInstance
    this.ripples = ripples

    this.initCss3dLayers()

    this.show && this.drawRipples(stretchHeight)

    this.mapInstance.cssRenderer()
  }

  drawRipples(stretchHeight) {
    const data = this.ripples.data || [],
      ripplesChilds = this.ripplesObj.children || [],
      offset = this.mapInstance.offset,
      scale = this.mapInstance.scale,
      childLen = this.ripplesObj.children.length

    for (let index = 0; index < childLen; index++) {
      const css3dObj = ripplesChilds[index] as CSS3DObject,
        name = css3dObj?.name,
        findata = data.find(itemData => name === `ripple-${this.ripples.id}-${itemData.lat}-${itemData.lng}`),
        child = this.ripplesObj.getObjectByName(name) as CSS3DObject

      if (!findata && child) {
        removeComponents(child.element)
        this.ripplesObj.remove(css3dObj)
        child.clear()
        index--
      }
    }

    for (let index = 0; index < data.length; index++) {
      const itemData = data[index],
        name = `ripple-${this.ripples.id}-${itemData.lat}-${itemData.lng}`,
        childObj = this.ripplesObj.getObjectByName(name) as CSS3DObject,
        { style, show, type, expPathArr } = this.getRipplesProps(itemData)

      if (childObj) {
        const element = childObj.element
        if (show) {
          childObj.position.x = +itemData.lng * this.mapInstance.scale.x
          childObj.position.y = +itemData.lat * this.mapInstance.scale.y
          childObj.position.z = stretchHeight
          childObj.scale.set(1 / 16, 1 / 16, 1 / 16)
          ReactDOM.render(
            <Ripple
              key={name}
              id={this.ripples.id}
              expName={type}
              expPathArr={expPathArr}
              itemData={itemData}
              ripplestyle={style}
            />,
            element
          )
        } else {
          childObj.clear()
          this.ripplesObj.remove(childObj)
          removeComponents(element)
        }
      } else {
        if (show) {
          const element = document.createElement('div'),
            objectCSS = new CSS3DObject(element)

          objectCSS.position.x = +itemData.lng * this.mapInstance.scale.x
          objectCSS.position.y = +itemData.lat * this.mapInstance.scale.y
          objectCSS.position.z = stretchHeight
          objectCSS.scale.set(1 / 8, 1 / 8, 1 / 8)
          objectCSS.name = name
          this.ripplesObj.add(objectCSS)

          ReactDOM.render(
            <Ripple
              key={name}
              id={this.ripples.id}
              expName={type}
              expPathArr={expPathArr}
              itemData={itemData}
              ripplestyle={style}
            />,
            element
          )
          this.ripplesElementArr.push(element)
        }
      }
    }

    this.ripplesObj.position.x = offset.x * scale.x
    this.ripplesObj.position.y = offset.y * scale.y
  }

  getRipplesProps(itemData: any) {
    let name = '',
      expPathArr: string[] = []
    const { normalStyle = {} as RipplesStyle, styleSection = [] } = this.ripples.ripplesConfig || {},
      section = styleSection.find((item, i) => {
        expPathArr = [`styleSection[${i}]`]
        if (
          analysisExpression(item.condition, itemData, this.ripples.id, {
            name: 'styleSection[].condition',
            pathArr: expPathArr
          })
        ) {
          name = 'styleSection[]'
          return true
        }
      }),
      resolve = { style: normalStyle, show: true, type: 'normalStyle', expPathArr: [] }

    if (section) {
      resolve.style = section
      resolve.type = name
      resolve.expPathArr = expPathArr as any
    } else {
      if (!normalStyle?.display) resolve.show = false
    }

    return resolve
  }

  destroy() {
    this.mapInstance.hasChildCom && (this.mapInstance.hasChildCom[this.ripples.id] = false)
    this.ripplesObj.remove(...this.ripplesObj.children)
    this.ripplesObj.clear()
    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.ripplesObj)
    removeComponents(this.ripplesElementArr)
    this.mapInstance.LoadRenderer()
    // @ts-ignore
    ;(this.mapInstance = null), (this.ripplesObj = null), (this.ripplesElementArr = null)
  }
}
