import * as THREE from 'three'
import { formatColor, removeMaterial } from '../../../Lcz3dAreaMap/common'
import CreateThreeMap from '../../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../../Lcz3dAreaMap/type'
import { AreaMapAreaHeatData, OutAreaHeat } from '../../../Lcz3dAreaMap/type/child'
import { cloneDeep, isEqual } from 'lodash'

interface AreaHeatProps {
  threeMap: CreateThreeMap
  areaHeat: OutAreaHeat
  mapPath?: MapPath[]
}

export default class AreaHeat {
  mapInstance: CreateThreeMap
  areaHeat: OutAreaHeat
  level?: number
  heatObj = new THREE.Object3D()
  materialObj: { [key: string]: THREE.MeshPhongMaterial } = {}
  constructor(option: AreaHeatProps) {
    this.mapInstance = option.threeMap
    this.areaHeat = option.areaHeat

    this.mapInstance.mapGroud.add(this.heatObj)
    this.mapInstance.hasChildCom[this.areaHeat.id] = true

    this.getMaterialObj()
  }

  updataView(option: AreaHeatProps) {
    this.mapInstance = option.threeMap

    const lastConfig = cloneDeep(this.areaHeat)
    this.areaHeat = option.areaHeat

    if (
      !isEqual(lastConfig.data, option.areaHeat.data) ||
      !isEqual(lastConfig.heatConfig, option.areaHeat.heatConfig)
    ) {
      this.getMaterialObj()
    }

    if (this.level && this.level !== option.mapPath?.length) {
      this.level = option.mapPath?.length
      const areaHeatblock = this.heatObj.getObjectByName('区域热力区块')
      areaHeatblock &&
        (areaHeatblock.remove(...areaHeatblock.children), areaHeatblock.clear(), this.heatObj.remove(areaHeatblock))
      this.drawHeat()
    } else {
      this.drawHeat()
      this.level = option.mapPath?.length
    }

    this.heatObj.position.x = this.mapInstance.offset.x * this.mapInstance.scale.x
    this.heatObj.position.y = this.mapInstance.offset.y * this.mapInstance.scale.y
    this.heatObj.position.z = 0

    this.mapInstance.cssRenderer()
  }

  drawHeat() {
    const data = this.areaHeat?.data || [],
      block = this.heatObj.getObjectByName('区域热力区块')

    if (!block) {
      const mapBlock = this.mapInstance.mapObj.getObjectByName('区块')
      if (mapBlock) {
        const blockObj = new THREE.Object3D(),
          mapBlockChild = mapBlock.children as THREE.Mesh[]
        for (let i = 0; i < mapBlockChild.length; i++) {
          const mesh = mapBlockChild[i]
          const findData = data.find(item => item.adcode == (mesh.userData?.adcode || mesh.userData?.code))
          this.drawArea(findData, mesh, blockObj)
        }
        blockObj.name = '区域热力区块'
        this.heatObj.add(blockObj)
      }
    } else {
      const areaAreaBlock = block.children as THREE.Mesh[]
      for (let i = 0; i < areaAreaBlock.length; i++) {
        const mesh = areaAreaBlock[i]
        const findData = data.find(item => item.adcode == mesh.name)
        this.drawArea(findData, mesh, block, true)
      }
    }
  }

  drawArea(findData: AreaMapAreaHeatData | undefined, mesh: THREE.Mesh, target: THREE.Object3D, updata = false) {
    const meterial = this.materialObj[findData?.adcode || ''] || this.materialObj['defectColor']
    if (!updata) {
      const geometry = mesh.geometry.clone(),
        _mesh = new THREE.Mesh(geometry, [meterial])
      _mesh.name = mesh.userData.adcode || mesh.userData.code
      _mesh.position.z = 0.05
      target.add(_mesh)
    } else {
      mesh.material = [meterial]
    }
  }

  getMaterialObj() {
    removeMaterial(this.materialObj || {})

    const { data = [], heatConfig } = this.areaHeat,
      styleSeries = heatConfig?.styleSeries || [],
      defectColor = formatColor(heatConfig?.defectColor)
    this.materialObj['defectColor'] = new THREE.MeshPhongMaterial({
      color: defectColor.color,
      transparent: true,
      opacity: defectColor.opacity
    })

    for (let i = 0; i < data.length; i++) {
      const { value, adcode } = data[i]
      if (!isNaN(value) && !this.materialObj[adcode]) {
        const findStyle = styleSeries.find(item => item.min <= value && value <= item.max)
        if (findStyle) {
          const color = formatColor(findStyle.color)
          this.materialObj[adcode] = new THREE.MeshPhongMaterial({
            color: color.color,
            transparent: true,
            opacity: color.opacity
          })
        }
      }
    }
  }

  destroy() {
    this.mapInstance?.hasChildCom && (this.mapInstance.hasChildCom[this.areaHeat.id] = false)
    const heatBlock = this.heatObj.getObjectByName('区域热力区块')
    heatBlock && (heatBlock.remove(...heatBlock.children), heatBlock.clear())
    this.heatObj.remove(...this.heatObj.children)
    this.heatObj.clear()
    this.mapInstance.mapGroud && this.mapInstance.mapGroud.remove(this.heatObj)

    !this.mapInstance.isDestroy && this.mapInstance.cssRenderer()

    removeMaterial(this.materialObj || {})

    // @ts-ignore
    this.mapInstance = this.areaHeat = this.heatObj = this.materialObj = null
  }
}
