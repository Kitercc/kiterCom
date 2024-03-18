import { isEqual } from 'lodash'
import * as THREE from 'three'
import Earth from '../../../LczEarth/common/earth'
import EarthEvent from '../../../LczEarth/common/EarthEvent'
import { OutScatterPoint, ScatterPointData } from '../../../LczEarth/type/child'
import { formatColor } from '../../../Lcz3dAreaMap/common/index'

type Options = {
  scatterPoint: OutScatterPoint
  earth: Earth
  onClick(param: ScatterPointData): void
}

export default class Scatter {
  scatterPoint: OutScatterPoint
  lastScatterPoint?: OutScatterPoint
  earth: Earth
  scatterGroup = new THREE.Group()
  scatterMaterial?: THREE.MeshBasicMaterial
  onClick: (param: ScatterPointData) => void

  constructor(options: Options) {
    this.earth = options.earth
    this.scatterPoint = options.scatterPoint
    this.onClick = options.onClick
    this.earth.earthGroup.add(this.scatterGroup)
    this.initScatter()

    this.initScatterEvent()
  }

  async updata(scatterPoint: OutScatterPoint) {
    this.scatterPoint = scatterPoint
    const { baseConfig, data } = scatterPoint,
      { baseConfig: lastBaseConfig, data: lastData } = this.lastScatterPoint || {}
    if (baseConfig?.imgUrl !== lastBaseConfig?.imgUrl || baseConfig?.color !== lastBaseConfig?.color) {
      await this.initMaterial()
    }

    if (!isEqual(data, lastData) || !isEqual(baseConfig?.size, lastBaseConfig?.size)) {
      this.initScatter(true)
    }
  }

  async initScatter(upData = false) {
    const { baseConfig, data = [] } = this.scatterPoint,
      { width = 10, height = 10 } = baseConfig?.size || {}

    !upData && (await this.initMaterial())
    const geometry = new THREE.PlaneGeometry(width / 2, height / 2, 1, 1)
    let hasNames: string[] | null = []

    //  删除和更新 数据点
    for (let i = 0; i < this.scatterGroup.children.length; i++) {
      const child = this.scatterGroup.children[i] as THREE.Mesh
      if (child && child.isMesh && child.userData.currentData) {
        const inData = data.find(v => this.getName(v) === child.name)
        if (inData) {
          child.geometry = geometry
          hasNames.push(child.name)
        } else {
          this.scatterGroup.remove(child)
          i--
        }
      }
    }

    // 添加新增的数据点
    data.forEach(item => {
      const name = this.getName(item)
      if (hasNames && !hasNames.includes(name)) this.addPoint(item, geometry, name)
    })

    this.lastScatterPoint = this.scatterPoint
    hasNames = null
  }

  addPoint(cData: ScatterPointData, geometry: THREE.PlaneGeometry, name: string) {
    const { lng, lat } = cData,
      pos = this.earth.lglt2xyz(lng, lat, 101),
      points = new THREE.Mesh(geometry, this.scatterMaterial)
    points.position.set(pos.x, pos.y, pos.z)
    points.lookAt(0, 0, 0)
    points.userData.currentData = cData
    points.name = name
    points.renderOrder = 1
    this.scatterGroup.add(points)
  }

  async initMaterial() {
    const imgUrl = this.scatterPoint.baseConfig?.imgUrl,
      color = this.scatterPoint.baseConfig?.color,
      colors = formatColor(color),
      map = await (imgUrl ? this.earth.textureLoad.load(imgUrl) : null)

    this.scatterMaterial =
      this.scatterMaterial ||
      new THREE.MeshBasicMaterial({
        map,
        side: THREE.BackSide,
        color: colors.color,
        opacity: colors.opacity,
        transparent: true,
        depthTest: false
      })

    this.scatterMaterial.map = map
    this.scatterMaterial.color = colors.color
    this.scatterMaterial.opacity = colors.opacity
    this.scatterMaterial.needsUpdate = true
  }

  initScatterEvent() {
    if (this.scatterPoint.onClick && this.earth.__event && this.earth.__event.events) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const self = this
      this.earth.__event.events.click[this.scatterPoint.id] = function (this: EarthEvent) {
        const intersects = this.__raycaster.intersectObjects(self.scatterGroup.children, true)

        if (intersects.length > 0) {
          for (let i = 0; i < intersects.length; i++) {
            const intersect = intersects[i],
              targetObj = intersect.object
            if (
              targetObj &&
              targetObj.type === 'Mesh' &&
              targetObj.userData.currentData &&
              targetObj.name.indexOf('lcz-earth-scatter-point') === 0
            ) {
              const currentData = targetObj.userData.currentData
              self.onClick(currentData)
            }
          }
        }
      }

      this.earth.__event.initEventListeners(true)
    }
  }

  destroyEvent() {
    if (this.earth.__event && this.earth.__event.events) {
      this.earth.__event.dispose()
      delete this.earth.__event.events.click[this.scatterPoint.id]
      this.earth.__event.initEventListeners()
    }
  }

  getName(cData: ScatterPointData) {
    const id = this.scatterPoint.id
    return `${id}-${cData.lng}-${cData.lat}`
  }

  destroy() {
    if (!this.earth.isDestroy) {
      this.scatterGroup.clear()
      this.earth.earthGroup.remove(this.scatterGroup)
      this.destroyEvent()
    }

    this.scatterMaterial?.dispose()

    // @ts-ignore
    this.scatterPoint = this.lastScatterPoint = this.earth = this.scatterGroup = this.scatterMaterial = null
  }
}
