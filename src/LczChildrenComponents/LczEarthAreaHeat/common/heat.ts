import Earth from '../../../LczEarth/common/earth'
import * as THREE from 'three'
import { OutAreaHeat } from '../../../LczEarth/type/child'

type Option = {
  earth: Earth
  areaHeat: OutAreaHeat
}

export default class Heat {
  earth: Earth
  width: number
  height: number
  areaHeat: OutAreaHeat
  lastAreaHeat?: OutAreaHeat
  heatGroup = new THREE.Group()
  canvasDom = document.createElement('canvas')
  heatMaterial?: THREE.MeshBasicMaterial
  mapData?: any
  constructor(option: Option) {
    this.earth = option.earth
    this.areaHeat = option.areaHeat
    this.earth.earthGroup.add(this.heatGroup)
    this.width = 4000
    this.height = this.width / 2

    this.initHeat()
  }

  updata(areaHeat: OutAreaHeat) {
    this.areaHeat = areaHeat
    this.initHeat()
  }

  async initHeat() {
    const { jsonUrl, height = 0 } = this.areaHeat?.baseConfig || {}
    if (!jsonUrl) return

    this.initMaterial()
    this.mapData = await this.earth.getMapData(jsonUrl?.src || '')
    this.drawCanvas()

    const heatMesh = this.heatGroup.getObjectByName('heatMesh') as THREE.Mesh
    if (!heatMesh) {
      const heatMesh = new THREE.Mesh(new THREE.SphereGeometry(100.1 + height / 2, 128, 128), this.heatMaterial)
      heatMesh.name = 'heatMesh'
      this.heatGroup.add(heatMesh)
    } else {
      if (this.lastAreaHeat?.baseConfig?.height !== height) {
        heatMesh.geometry.dispose()
        heatMesh.geometry = new THREE.SphereGeometry(100.1 + height / 2, 128, 128)
      }
    }

    this.lastAreaHeat = this.areaHeat
  }

  drawCanvas() {
    if (this.heatMaterial && this.heatMaterial.map) {
      const { display = true, color = '#fff', width = 1 } = this.areaHeat.boundary || {},
        showBoundry = display && width > 0,
        ctx = this.canvasDom.getContext('2d')
      if (this.mapData && ctx) {
        ctx.clearRect(0, 0, this.width, this.height)

        for (let i = 0; i < this.mapData.features.length; i++) {
          const { geometry, properties } = this.mapData.features[i],
            { type, coordinates } = geometry

          showBoundry && ((ctx.strokeStyle = color), (ctx.lineWidth = width))
          ctx.fillStyle = this.getCurrentAreaFill(properties)
          switch (type) {
            case 'MultiPolygon': {
              coordinates.forEach(coordinate => {
                coordinate.forEach(points => {
                  ctx.beginPath()
                  points.forEach(point => {
                    const [lng, lat] = point,
                      x = ((lng + 180) / 360) * this.width,
                      y = ((90 - lat) / 180) * this.height
                    ctx.lineTo(x, y)
                  })
                  showBoundry && ctx.stroke()
                  ctx.fill()
                })
              })
              break
            }
            case 'Polygon': {
              coordinates.forEach(coordinate => {
                ctx.beginPath()
                coordinate.forEach(point => {
                  const [lng, lat] = point,
                    x = ((lng + 180) / 360) * this.width,
                    y = ((90 - lat) / 180) * this.height
                  ctx.lineTo(x, y)
                })
                showBoundry && ctx.stroke()
                ctx.fill()
              })
              break
            }
          }
        }
      }

      this.heatMaterial.map.needsUpdate = true
      this.heatMaterial.needsUpdate = true
    }
  }

  getCurrentAreaFill({ name }: { name: string; adcode: number }) {
    const { baseConfig, data = [], styleSeries = [] } = this.areaHeat,
      currentData = data.find(v => v.name === name)
    let fill = baseConfig?.defaultFill || 'rgba(0,0,0,0)'

    const value = currentData?.value
    if (value && !isNaN(value) && styleSeries) {
      const cStyle = styleSeries.find(({ min, max }) => min <= value && value <= max)
      cStyle && (fill = cStyle.fill)
    }

    return fill
  }

  initMaterial() {
    this.canvasDom.setAttribute('width', this.width + '')
    this.canvasDom.setAttribute('height', this.height + '')
    this.heatMaterial =
      this.heatMaterial ||
      new THREE.MeshBasicMaterial({
        map: new THREE.Texture(this.canvasDom),
        transparent: true
      })
  }

  destroy() {
    if (!this.earth.isDestroy) {
      this.heatGroup.clear()
      this.earth.earthGroup.remove(this.heatGroup)
    }

    this.canvasDom.remove()
    this.heatMaterial?.dispose()

    // @ts-ignore
    this.areaHeat = this.lastAreaHeat = this.heatGroup = this.earth = this.heatMaterial = this.mapData = null
  }
}
