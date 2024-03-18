import React from 'react'
import ReactDOM from 'react-dom'
import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { formatColor, removeComponents } from '../../../Lcz3dAreaMap/common'
import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { Area3dMapCurrentArea, OutToolTip } from '../../../Lcz3dAreaMap/type/child'
import { TipSign } from '../../../LczChina2dMap/type/child'
import Sign from '../components/Sign'

interface CurrentAreaProps {
  threeMap: CreateThreeMap
  level: number
  setCurrentData: (data: any) => void
  tooltip?: OutToolTip
}

export default class CurrentArea {
  mapInstance: CreateThreeMap
  level: number
  tooltip: OutToolTip
  setCurrentData: (data: any) => void
  currentObj = new THREE.Object3D()
  currentElemet?: HTMLDivElement
  sideMaterial = new THREE.MeshPhongMaterial({ transparent: true })
  currentIndex = 0
  timer: NodeJS.Timeout | null = null
  running = false
  mapBlockObj?: THREE.Object3D
  stretchHeight = 1
  carouselStatus = true // 轮播状态  false 表示无法轮播
  carouselTime = 0 // 间隔时间
  lastIndex = -1 // 最后一次的激活下标
  lastAdcode = '' // 最后一次的adcode 防止子组件切换事件反复触发
  chindEvent?: (id: any, type: string, param: any) => void
  constructor(option: CurrentAreaProps) {
    this.mapInstance = option.threeMap
    this.tooltip = option.tooltip || ({} as OutToolTip)
    this.level = option.level
    this.setCurrentData = option.setCurrentData

    this.mapInstance.mapGroud.add(this.currentObj)
    this.initCss3dLayers()
  }

  initCss3dLayers() {
    const levels = this.tooltip.globalConfig?.levels || '',
      levelArr = levels.split(',').map(v => (v === '' ? null : Number(v)))

    if (levels === '' || levelArr.includes(this.level)) {
      this.running = true
      this.mapInstance.initCss3dRenderer()
      this.mapInstance.hasChildCom[this.tooltip.id] = true
    } else {
      this.running = false
      this.currentElemet && removeComponents(this.currentElemet)
      this.currentObj.remove(...this.currentObj.children)
      this.mapInstance.hasChildCom[this.tooltip.id] = false
      this.currentObj.clear()
      this.setCurrentData(null)
    }
  }

  updataView(
    threeMap: CreateThreeMap,
    level: number,
    tooltip: OutToolTip,
    stretchHeight: number,
    { chindEvent }: { chindEvent: (id: any, type: string, param: any) => void }
  ) {
    this.stretchHeight = stretchHeight
    this.currentIndex = 0
    this.timer && clearTimeout(this.timer)
    this.mapInstance = threeMap
    this.level = level
    this.tooltip = tooltip
    this.chindEvent = chindEvent

    this.mapBlockObj = this.mapInstance.mapObj.getObjectByName('区块')

    const { autoCarousel = true, residenceTime = 5 } = (tooltip.currentArea || {}) as Area3dMapCurrentArea

    const _residenceTime = residenceTime || 1
    this.carouselTime = _residenceTime >= 1 ? _residenceTime * 1000 : 1000

    this.currentObj.position.x = this.mapInstance.offset.x * this.mapInstance.scale.x
    this.currentObj.position.y = this.mapInstance.offset.y * this.mapInstance.scale.y
    this.currentObj.position.z = 0

    this.initsideMaterial()

    this.initCss3dLayers()

    if (autoCarousel) {
      this.carouselStatus = true
      this.drawCurrenArea()
    } else {
      this.carouselStatus = false
    }

    this.mapInstance.cssRenderer()
  }

  drawCurrenArea(status: any = false) {
    this.timer && clearTimeout(this.timer)
    if (!this.carouselStatus && !status) return false

    const data = this.tooltip.data || [],
      currentData = data[this.currentIndex] || null,
      currenArea = this.tooltip.currentArea?.area,
      sign = this.tooltip.currentArea?.sign,
      dataChange = this.tooltip.onDataChange

    const areaMesh = this.currentObj.getObjectByName('tooltip区域高亮') as THREE.Mesh
    if (currenArea?.display && this.running && currentData) {
      areaMesh && areaMesh.geometry.dispose()
      this.drawHighlightedArea(currentData, areaMesh)
    } else {
      areaMesh && (this.currentObj.remove(areaMesh), areaMesh.clear())
    }

    const signobj = this.currentObj.getObjectByName('tooltip区域标志') as CSS3DObject
    if (sign?.display && this.running && currentData && !isNaN(currentData.lat) && !isNaN(currentData.lng)) {
      this.drawSign(currentData, signobj)
    } else {
      signobj && (this.currentObj.remove(signobj), signobj.clear())
      this.currentElemet && removeComponents(this.currentElemet)
    }

    if (this.running && currentData) {
      this.setCurrentData(currentData)

      if (this.lastAdcode != currentData.adcode) {
        this.lastAdcode = currentData.adcode || currentData.code
        dataChange && this.chindEvent && this.chindEvent(this.tooltip.id, 'onDataChange', currentData)
      }

      if (data.length > 1) {
        if (this.currentIndex < data.length - 1) {
          this.currentIndex++
        } else {
          this.currentIndex = 0
        }
        this.lastIndex = this.currentIndex

        if (this.carouselStatus) {
          this.timer = setTimeout(() => this.drawCurrenArea(), this.carouselTime)
        }
      }
    } else {
      this.lastAdcode = ''
      this.setCurrentData(null)
    }

    this.mapInstance.cssRenderer()
  }

  drawHighlightedArea(data, areaMesh: THREE.Mesh | null) {
    const blockMesh = this.mapBlockObj?.children?.find(
      mesh => (mesh.userData.adcode || mesh.userData.code) == data.adcode
    ) as THREE.Mesh | undefined
    if (blockMesh) {
      let mesh: THREE.Mesh
      const geometry = blockMesh.geometry.clone()
      if (areaMesh) {
        mesh = areaMesh
        mesh.geometry = geometry
        mesh.material = [this.sideMaterial]
      } else {
        mesh = new THREE.Mesh(geometry, [this.sideMaterial])
        mesh.name = 'tooltip区域高亮'
        mesh.position.z = 0.06
        this.currentObj.add(mesh)
      }
    } else {
      this.currentObj.remove(...this.currentObj.children)
      this.currentObj.clear()
    }
  }

  drawSign(data, css3dObj: CSS3DObject | null) {
    const { lng = '', lat = '' } = data,
      sign = this.tooltip.currentArea?.sign || ({} as TipSign)

    if (css3dObj) {
      css3dObj.position.x = +lng * this.mapInstance.scale.x
      css3dObj.position.y = +lat * this.mapInstance.scale.y
      css3dObj.position.z = this.stretchHeight
      const element = css3dObj.element
      ReactDOM.render(<Sign sign={sign} itemData={data} />, element)
    } else {
      const element = document.createElement('div'),
        objectCSS = new CSS3DObject(element)
      element.style.pointerEvents = 'none'

      objectCSS.position.x = +lng * this.mapInstance.scale.x
      objectCSS.position.y = +lat * this.mapInstance.scale.y
      objectCSS.position.z = this.stretchHeight
      objectCSS.scale.set(1 / 8, 1 / 8, 1 / 8)
      objectCSS.name = 'tooltip区域标志'
      this.currentObj.add(objectCSS)

      ReactDOM.render(<Sign sign={sign} itemData={data} />, element)
      this.currentElemet = element
    }
  }

  initsideMaterial() {
    const currenArea = this.tooltip.currentArea?.area
    const sideMaterialColors = formatColor(currenArea?.color)

    this.sideMaterial.color = sideMaterialColors.color
    this.sideMaterial.opacity = sideMaterialColors.opacity
  }

  destroy() {
    this.mapInstance.hasChildCom && (this.mapInstance.hasChildCom[this.tooltip.id] = false)
    this.timer && clearTimeout(this.timer)
    this.sideMaterial.dispose()
    this.currentElemet && removeComponents(this.currentElemet)
    this.currentObj.remove(...this.currentObj.children)
    this.currentObj.clear()
    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.currentObj)
    this.mapInstance.LoadRenderer()
    // @ts-ignore
    this.mapInstance = this.tooltip = this.currentObj = this.mapBlockObj = this.setCurrentData = this.sideMaterial = null
  }
}
