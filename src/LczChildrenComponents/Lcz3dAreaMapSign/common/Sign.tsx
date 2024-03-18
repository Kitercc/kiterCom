import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { removeComponents } from '../../../Lcz3dAreaMap/common'
import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { AreaMapSignData, OutSign, SignStyle } from '../../../Lcz3dAreaMap/type/child'
import { formatMapPosition } from '../../../LczChina2dMap/common'
import SignContain from '../components/SignContain'

interface SignsProps {
  sign: OutSign
  threeMap: CreateThreeMap
  level: number
}

export default class Signs {
  sign: OutSign
  mapInstance: CreateThreeMap
  level: number
  signObj = new THREE.Object3D()
  signElementArr: HTMLDivElement[] = []
  show = true
  constructor(option: SignsProps) {
    this.sign = option.sign
    this.mapInstance = option.threeMap
    this.level = option.level

    this.mapInstance.mapGroud.add(this.signObj)

    this.initCss2dLayers()
  }

  initCss2dLayers() {
    const levels = this.sign.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v)))

    if (levels === '' || levelArr.includes(this.level)) {
      this.mapInstance.initCss2dRenderer(true)
      this.mapInstance.hasChildCom[this.sign.id] = true
      this.show = true
    } else {
      removeComponents(this.signElementArr)
      this.signObj.remove(...this.signObj.children)
      this.signObj.clear()
      this.mapInstance.hasChildCom[this.sign.id] = false
      this.show = false
    }
  }

  updataView(stretchHeight: number, sign: OutSign, threeMap: CreateThreeMap, level: number) {
    this.level = level
    this.sign = sign
    this.mapInstance = threeMap
    this.initCss2dLayers()

    this.show && this.drawSign(stretchHeight)

    this.mapInstance.cssRenderer()
  }

  drawSign(stretchHeight: number) {
    const data = this.sign.data || []

    const signChilds = this.signObj.children || [],
      childsLen = signChilds.length,
      scale = this.mapInstance.scale,
      offset = this.mapInstance.offset

    for (let i = 0; i < childsLen; i++) {
      const css2dObj = signChilds[i] as CSS2DObject,
        name = css2dObj?.name,
        findata = data.find(itemData => name === `sign-${this.sign.id}-${itemData.adcode}`),
        child = this.signObj.getObjectByName(name) as CSS2DObject

      if (!findata && child) {
        removeComponents(child.element)
        this.signObj.remove(child)
        child.clear()
        i--
      }
    }

    for (let index = 0; index < data.length; index++) {
      const itemData = data[index],
        name = `sign-${this.sign.id}-${itemData.adcode}`,
        { x, y } = this.getSignPosition(itemData),
        childObj = this.signObj.getObjectByName(name) as CSS2DObject,
        { signStyle, value, type } = this.getSignStyle(itemData)

      if (childObj) {
        const element = childObj.element
        childObj.position.set(x, y, stretchHeight + 0.1)
        ReactDOM.render(<SignContain key={name} signStyle={signStyle} value={value} type={type} />, element)
      } else {
        const element = document.createElement('div'),
          objectCSS = new CSS2DObject(element)

        objectCSS.name = name
        objectCSS.position.set(x, y, stretchHeight + 0.1)
        this.signElementArr.push(element)
        ReactDOM.render(<SignContain key={name} signStyle={signStyle} value={value} type={type} />, element)
        this.signObj.add(objectCSS)
      }
    }

    this.signObj.position.x = offset.x * scale.x
    this.signObj.position.y = offset.y * scale.y
  }

  getSignPosition(itemData: AreaMapSignData) {
    const resolve = { x: 0, y: 0 },
      { lat, lng, adcode } = itemData,
      scale = this.mapInstance.scale

    if (!isNaN(Number(lat)) && !isNaN(Number(lng)) && lat !== '' && lat !== null && lng !== '' && lng !== null) {
      resolve.x = Number(lng) * scale.x
      resolve.y = Number(lat) * scale.y
    } else {
      const features = this.mapInstance?.mapData?.features || [],
        current = (features.find(item => (item?.properties?.adcode || item?.properties?.code) == adcode) || {})
          .properties
      if (current) {
        let position = current.centroid || current.center
        position = formatMapPosition(position)
        resolve.x = Number(position[0]) * scale.x
        resolve.y = Number(position[1]) * scale.y
      }
    }

    return resolve
  }

  getSignStyle(itemData) {
    const { globalConfig, normalStyle = {} as SignStyle, focuStyle = {} as SignStyle } = this.sign,
      { select } = globalConfig || {},
      val = itemData['area'],
      resolve: { signStyle: SignStyle; value: any; show: boolean; type: 'normal' | 'focus' } = {
        signStyle: normalStyle,
        value: '',
        show: true,
        type: 'normal'
      }

    if (focuStyle.fontStyle?.styleFollow) focuStyle.fontStyle = normalStyle.fontStyle
    resolve.value = val
    const selectvalue = (select?.value || '').split(',')
    if (selectvalue.includes(String(itemData.adcode))) {
      resolve.signStyle = focuStyle
      resolve.type = 'focus'
    }

    return resolve
  }

  destroy() {
    this.mapInstance.hasChildCom && (this.mapInstance.hasChildCom[this.sign.id] = false)
    this.signObj.remove(...this.signObj.children)
    removeComponents(this.signElementArr)
    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.signObj)
    this.mapInstance.LoadRenderer()
    //@ts-ignore
    this.sign = this.mapInstance = this.signObj = this.signElementArr = null
  }
}
