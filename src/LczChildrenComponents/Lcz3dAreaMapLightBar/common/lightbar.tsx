import React from 'react'
import ReactDOM from 'react-dom'
import { cloneDeep, isEqual } from 'lodash'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import * as d3 from 'd3'

import Plane from '../components/Plane'

import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { LightBarConfig, LightBarDataMap, OutLightBar, TextConfig } from '../../../Lcz3dAreaMap/type/child'
import { formatColor, removeComponents } from '../../../Lcz3dAreaMap/common'
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
import { Events } from '../../../Lcz3dAreaMap/common/MapEvent'

interface LightBarProps {
  lightbar: OutLightBar
  threeMap: CreateThreeMap
  level: number
  chindEvent: (id: any, type: string, param: any) => void
}

export default class LightBar {
  lightbar: OutLightBar
  lastLightbar?: OutLightBar
  mapInstance: CreateThreeMap
  level: number
  chindEvent: (id: any, type: string, param: any) => void
  rangeObj: { [key: string]: (val: number) => number } = {}
  materialArr: (THREE.MeshPhongMaterial | THREE.MeshStandardMaterial)[] = []
  hoverMateralArr: THREE.MeshPhongMaterial[] = []
  show = true
  lightbarGroup = new THREE.Group()
  appearTween?: TWEEN.Tween<{ value: number }>
  planeElements: HTMLDivElement[] = []
  animateStatus = true
  selectObj?: THREE.Object3D
  constructor(options: LightBarProps) {
    this.lightbar = options.lightbar
    this.mapInstance = options.threeMap
    this.level = options.level
    this.chindEvent = options.chindEvent

    this.lightbarGroup.layers.enable(1)
    this.mapInstance.mapGroud.add(this.lightbarGroup)
    this.lightbarGroup.userData.comName = 'lightbar'
    this.initLevel()
    this.initBarEvent()
  }

  initLevel() {
    const levels = this.lightbar.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v)))

    if (levels === '' || levelArr.includes(this.level)) {
      this.mapInstance.initCss2dRenderer(true)
      this.mapInstance.hasChildCom[this.lightbar.id] = true
      this.lightbarGroup.visible = true
      this.show = true
    } else {
      delete this.mapInstance.childComponentUpdataFn[this.lightbar.id]
      this.mapInstance.hasChildCom[this.lightbar.id] = false
      this.appearTween && this.appearTween.stop()
      this.lightbarGroup.visible = false
      this.lightbarGroup.children.forEach(item => {
        const plane = item.getObjectByName('标牌')
        plane && (plane.visible = false)
      })
      this.planeElements.forEach(item => item.classList.add('disable'))
      this.show = false
    }
  }

  updataView(lightbar: OutLightBar, mapInstance: CreateThreeMap, level: number, stretchHeight: number) {
    if (this.lastLightbar) {
      this.lightbar = lightbar
      this.mapInstance = mapInstance
      this.level = level
    }

    this.initLevel()
    this.getRange()

    if (
      !this.lastLightbar ||
      !isEqual(lightbar.globalConfig, this.lastLightbar?.globalConfig) ||
      !isEqual(lightbar.lightbarConfig, this.lastLightbar?.lightbarConfig)
    ) {
      this.initMaterial()
    }

    if (this.show) {
      this.animateStatus = true
      this.drawLightbar()
    }

    const { x: scaleX, y: scaleY } = this.mapInstance.scale
    const { x: offsetX, y: offsetY } = this.mapInstance.offset
    this.lightbarGroup.position.set(offsetX * scaleX, offsetY * scaleY, stretchHeight - 0.1)
    this.lastLightbar = cloneDeep(lightbar)
    this.mapInstance.cssRenderer()
  }

  drawLightbar() {
    this.appearTween && this.appearTween.stop()

    const { x: scaleX, y: scaleY } = this.mapInstance.scale,
      { data = [], lightbarConfig } = this.lightbar,
      { barType = 'rect', barWidth = 1 } = lightbarConfig || ({} as LightBarConfig),
      barHeightLinear = this.rangeObj.barHeightLinear,
      lightbarGrouplist = this.lightbarGroup.children

    // 去除不存在的柱子
    for (let index = 0; index < lightbarGrouplist.length; index++) {
      const barObject = lightbarGrouplist[index] as THREE.Object3D,
        findData = data.find(item => this.getName(item) === barObject.name)
      if (!findData) {
        const el = this.planeElements[index]
        removeComponents(el)
        this.planeElements.splice(index, 1)
        barObject.remove(...barObject.children)
        barObject.clear()
        this.lightbarGroup.remove(barObject)
        index--
      }
    }

    const sortData = [...data].sort((a, b) => +a.value - +b.value)

    for (let i = 0; i < sortData.length; i++) {
      const itemData = sortData[i],
        { lng, lat, value } = itemData,
        barHeight = barHeightLinear(+value),
        _lng = +lng * scaleX,
        _lat = +lat * scaleY,
        name = this.getName(itemData)

      const findbarObj = this.lightbarGroup.getObjectByName(name)
      if (!findbarObj) {
        const obj = new THREE.Object3D()
        obj.name = name
        // 绘制柱子
        const mesh = this.creatBar(barType, barWidth, barHeight)
        mesh.name = '柱子'
        obj.add(mesh)

        // 绘制标牌
        const planeObj = this.creatPlane(barHeight, itemData, i + 1)
        obj.add(planeObj)

        obj.layers.enable(1)
        obj.position.x = _lng
        obj.position.y = _lat
        obj.scale.set(1, 1, 0)
        Object.assign(obj.userData, itemData, { index: i + 1 })
        this.lightbarGroup.add(obj)
      } else {
        // 更新柱子
        const barMesh = findbarObj.getObjectByName('柱子') as THREE.Mesh
        this.creatBar(barType, barWidth, barHeight, barMesh)

        // 更新标牌
        const planeObj = findbarObj.getObjectByName('标牌') as CSS2DObject
        this.creatPlane(barHeight, itemData, i + 1, planeObj)

        findbarObj.position.x = _lng
        findbarObj.position.y = _lat
        findbarObj.scale.set(1, 1, 0)
        findbarObj.userData = itemData
        Object.assign(findbarObj.userData, itemData, { index: i + 1 })
      }
    }

    this.barAppearAnim()
  }

  creatBar(barType, barWidth: number, barHeight: number, barMesh?: THREE.Mesh) {
    const geometry =
      barType === 'rect'
        ? new THREE.BoxGeometry(barWidth / 8, barHeight, barWidth / 8, 50, 50, 50)
        : new THREE.CylinderGeometry(barWidth / 8, barWidth / 8, barHeight, 50, 50)

    let mesh = barMesh

    if (!mesh) {
      mesh = new THREE.Mesh(geometry, this.materialArr)
      mesh.layers.enable(1)
      mesh.rotation.x = Math.PI / 2
      mesh.position.z = barHeight / 2
    } else {
      mesh.geometry = geometry
      mesh.material = this.materialArr
      mesh.position.z = barHeight / 2
    }
    return mesh
  }

  creatPlane(barHeight: number, itemData: LightBarDataMap, index: number, planeObj?: CSS2DObject) {
    const planeStyle = this.lightbar.textConfig || ({} as TextConfig),
      scale = this.rangeObj.planeScaleLinear(index),
      name = this.getName(itemData),
      dataLen = (this.lightbar.data?.length || 0) + 1

    let element, objectCSS

    if (!planeObj) {
      element = document.createElement('div')
      objectCSS = new CSS2DObject(element)
      objectCSS.name = '标牌'
      this.planeElements.push(element)
    } else {
      element = planeObj.element
      objectCSS = planeObj
    }

    objectCSS.visible = true

    objectCSS.position.z = barHeight
    element.classList.add('disable')

    ReactDOM.render(
      <Plane
        key={'lightbar_plane' + name}
        planeStyle={planeStyle}
        scale={scale}
        index={dataLen - index}
        itemData={itemData}
        id={this.lightbar.id}
        chindEvent={this.lightbar.onClick && this.chindEvent}
      />,
      element
    )
    return objectCSS
  }

  barAppearAnim(target?: THREE.Object3D) {
    const raiseTime = this.lightbar.lightbarConfig?.raiseTime || 0,
      showTyle = this.lightbar.globalConfig?.actionWay || 'auto'
    this.mapInstance.childComponentUpdataFn[this.lightbar.id] = {
      target: this,
      fn: () => {
        TWEEN.update()
      }
    }
    this.mapInstance.animate()

    this.appearTween = new TWEEN.Tween({ value: 0 })
      .to({ value: 1 }, raiseTime * 1000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .onUpdate(scale => {
        if (target) {
          target.scale.z = scale.value
        } else {
          this.lightbarGroup.children.forEach(item => {
            item.scale.z = scale.value
          })
        }
      })
      .start()
      .onComplete(() => {
        this.animateStatus = false
        delete this.mapInstance.childComponentUpdataFn[this.lightbar.id]
        showTyle === 'auto' && this.planeElements.forEach(node => node.classList.remove('disable'))
        this.mapInstance.cssRenderer()
      })
  }

  initBarEvent() {
    if (this.mapInstance.__event && this.mapInstance.__event.events) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.mapInstance.__event.events.mousemove[`lightbar_${this.lightbar.id}`] = function (this: Events) {
        if (!self.animateStatus) {
          const intersects = this.__raycaster.intersectObjects(self.lightbarGroup.children, true)

          if (intersects.length > 0) {
            for (let i = 0; i < intersects.length; i++) {
              const intersect = intersects[i],
                targetObj = intersect.object
              if (
                targetObj &&
                targetObj.type === 'Mesh' &&
                targetObj.parent &&
                targetObj.parent.name.indexOf('lightbar') === 0
              ) {
                self.selectBar(targetObj.parent)
                break
              }
            }
          } else {
            self.unSelectBar()
          }
        }
      }
      this.mapInstance.__event.initEventListeners(true)
    }
  }

  selectBar(parent: THREE.Object3D) {
    const actionWay = this.lightbar.globalConfig?.actionWay || 'auto'
    this.mapInstance.el.style.cursor = 'pointer'

    if (!this.selectObj) {
      const bar = parent.getObjectByName('柱子') as THREE.Mesh,
        plane = parent.getObjectByName('标牌') as CSS2DObject

      if (bar) bar.material = this.hoverMateralArr
      if (plane && actionWay === 'slider') plane.element.classList.remove('disable')
      this.selectObj = parent

      this.mapInstance.cssRenderer()
    } else {
      const lastid = this.selectObj.id
      if (lastid !== parent.id) {
        const lastObj = this.lightbarGroup.getObjectById(lastid) as THREE.Object3D
        this.unSelectBar(lastObj)

        const bar = parent.getObjectByName('柱子') as THREE.Mesh,
          plane = parent.getObjectByName('标牌') as CSS2DObject

        if (bar) bar.material = this.hoverMateralArr
        if (plane && actionWay === 'slider') plane.element.classList.remove('disable')
        this.selectObj = parent
        this.mapInstance.cssRenderer()
      }
    }
  }

  unSelectBar(target?: THREE.Object3D) {
    target = target || this.selectObj
    if (!target) return false

    const actionWay = this.lightbar.globalConfig?.actionWay || 'auto'

    const bar = target.getObjectByName('柱子') as THREE.Mesh,
      plane = target.getObjectByName('标牌') as CSS2DObject
    if (bar) bar.material = this.materialArr
    if (plane && actionWay === 'slider') plane.element.classList.add('disable')
    this.selectObj = undefined
    this.mapInstance.cssRenderer()
    this.mapInstance.el.style.cursor = 'default'
  }

  destroyEvent() {
    if (this.mapInstance.__event && this.mapInstance.__event.events) {
      this.mapInstance.__event.dispose()
      delete this.mapInstance.__event.events.mousemove[`lightbar_${this.lightbar.id}`]
      this.mapInstance.__event.initEventListeners()
    }
  }

  getRange() {
    const data = this.lightbar.data || [],
      barHeight = this.lightbar.lightbarConfig?.barHeight || { min: 0, max: 0 },
      dataVals = data.map(v => +v.value),
      dataMax = Math.max(...dataVals),
      dataMin = Math.min(...dataVals),
      planeScale = this.lightbar.textConfig?.scale || { min: 0, max: 0 }
    this.rangeObj = {
      barHeightLinear: d3.scale
        .linear()
        .domain([dataMin, dataMax])
        .range([barHeight.min, barHeight.max].sort((a, b) => a - b)),
      planeScaleLinear: d3.scale
        .linear()
        .domain([1, data.length + 1])
        .range([planeScale.min, planeScale.max].sort((a, b) => a - b))
    }
  }

  initMaterial() {
    this.destroyMaterial()

    const sliderPassStyle = this.lightbar.globalConfig?.sliderPassStyle,
      { colors, barType = 'rect' } = this.lightbar.lightbarConfig || ({} as LightBarConfig),
      { start = '', end = '' } = colors || {}

    const topColor = formatColor(start)

    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    const linearGradient = ctx.createLinearGradient(0, 0, 0, 10)
    linearGradient.addColorStop(0, start)
    linearGradient.addColorStop(1, end)
    ctx.fillStyle = linearGradient
    ctx.fillRect(0, 0, 10, 10)
    const texture = new THREE.CanvasTexture(canvas)

    const gMaterial = new THREE.MeshPhongMaterial({
      transparent: true,
      map: texture
    })

    const topMaterial = new THREE.MeshPhongMaterial({
      color: topColor.color,
      transparent: true,
      opacity: topColor.opacity
    })

    this.materialArr =
      barType === 'rect'
        ? [gMaterial, gMaterial, topMaterial, gMaterial, gMaterial, gMaterial]
        : [gMaterial, topMaterial, gMaterial]

    // 悬浮柱子材质
    {
      const { start = '#fff', end = '#fff' } = sliderPassStyle || {},
        startColor = formatColor(start)
      const canvas = document.createElement('canvas')
      canvas.width = 10
      canvas.height = 10
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      const linearGradient = ctx.createLinearGradient(0, 0, 0, 10)
      linearGradient.addColorStop(0, start)
      linearGradient.addColorStop(1, end)
      ctx.fillStyle = linearGradient
      ctx.fillRect(0, 0, 10, 10)
      const texture = new THREE.CanvasTexture(canvas)

      const hgMaterial = new THREE.MeshPhongMaterial({
        transparent: true,
        map: texture
      })

      const htopMaterial = new THREE.MeshPhongMaterial({
        color: startColor.color,
        transparent: true,
        opacity: startColor.opacity
      })

      this.hoverMateralArr =
        barType === 'rect'
          ? [hgMaterial, hgMaterial, htopMaterial, hgMaterial, hgMaterial, hgMaterial]
          : [hgMaterial, htopMaterial, hgMaterial]
    }
  }

  destroyMaterial() {
    this.materialArr.forEach(item => item.dispose())
    this.hoverMateralArr.forEach(item => item.dispose())
    this.materialArr = this.hoverMateralArr = []
  }

  getName(data: LightBarDataMap) {
    return `lightbar-${data.lat}_${data.lng}`
  }

  destroy() {
    removeComponents(this.planeElements)
    this.destroyEvent()
    this.destroyMaterial()

    this.mapInstance?.hasChildCom && (this.mapInstance.hasChildCom[this.lightbar.id] = false)

    delete this.mapInstance.childComponentUpdataFn[this.lightbar.id]

    this.appearTween && this.appearTween.stop()
    this.lightbarGroup.children.forEach(item => item.remove(...item.children))
    this.lightbarGroup.remove(...this.lightbarGroup.children)
    this.lightbarGroup.clear()
    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.lightbarGroup)
    !this.mapInstance.isDestroy && this.mapInstance.cssRenderer()

    // @ts-ignore
    this.lightbar = this.lastLightbar = this.planeElements = this.mapInstance = this.chindEvent = null

    // @ts-ignore
    this.lightbarGroup = this.appearTween = this.materialArr = this.hoverMateralArr = null
  }
}
