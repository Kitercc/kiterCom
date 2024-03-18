import { FlylineDataMap, OutFlyLine } from '../../../LczAMap/type/child'

export default class FlyLine {
  map: any
  loca: any //  Loca.Container
  flylineInstance: any // Loca.PulseLinkLayer 弧线实例
  flyline: OutFlyLine | null
  constructor(options: { map: any }) {
    this.map = options.map
    this.flyline = null
  }

  updataView(flyline: OutFlyLine) {
    const mapMode: '2D' | '3D' = this.map._view.type
    this.flyline = flyline

    // @ts-ignore
    if (mapMode === '3D' && window.Loca) {
      this.loca && this.loca.animate.stop()
      this.flylineInstance && this.flylineInstance.clearAnimate()
      this.draw3dflyline()
    }
  }

  // 视图为3d时
  draw3dflyline() {
    const { globalConfig, data = [] } = this.flyline || {},
      geodata = this.getflylineGeoData(data),
      flylineStyle = this.getflylineStyles()

    let hasflyline = true

    if (!this.loca) {
      this.loca = new Loca.Container({
        map: this.map
      })
    }

    if (data.length) {
      if (!this.flylineInstance) {
        hasflyline = false
        this.flylineInstance = new Loca.PulseLinkLayer({
          loca: this.loca,
          zIndex: globalConfig?.level || 1,
          zooms: [globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30]
        })
      } else {
        this.flylineInstance.setzIndex(globalConfig?.level || 1)
        this.flylineInstance.setZooms([globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30])
      }

      this.flylineInstance.setSource(geodata)
      this.flylineInstance.setStyle(flylineStyle)
      !hasflyline && this.loca.add(this.flylineInstance)
      this.loca.animate.start()
    } else {
      this.flylineInstance?.destroy()
      this.loca?.remove(this.flylineInstance)
      this.flylineInstance = null
    }
  }

  getflylineStyles() {
    const { flight, lineConfig } = this.flyline || {},
      baseColor = lineConfig?.baseline?.color.map(v => v.value) || [],
      styles = {
        unit: 'px',
        lineColors: ['rgba(0,0,0,0)'],
        height: flight?.height || 1,
        smoothSteps: flight?.smoothSteps || 1,
        speed: flight?.speed || 0,
        lineWidth: [lineConfig?.startWidth || 0, lineConfig?.endWidth || 0],
        headColor: lineConfig?.flyline?.color?.headColor,
        trailColor: lineConfig?.flyline?.color?.trailColor,
        flowLength: lineConfig?.flyline?.interval || 1
      }

    if (lineConfig?.baseline?.display && baseColor.length > 0) {
      styles.lineColors = baseColor
    }

    return styles
  }

  getglylineheight(val = 0) {
    const deep = 590,
      min = 1000

    return min + deep * val
  }

  getflylineGeoData(data: FlylineDataMap[]) {
    const geoJSON: any = {
      type: 'FeatureCollection',
      features: []
    }

    data.forEach(item => {
      geoJSON.features.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [
            [item.fromLng, item.fromLat],
            [item.toLng, item.toLat]
          ]
        }
      })
    })

    return new Loca.GeoJSONSource({
      data: geoJSON
    })
  }

  destroy() {
    this.flylineInstance?.clearAnimate()

    this.loca?.animate?.destroy()
    this.loca?.viewControl?.clearAnimates()

    this.flylineInstance?.destroy(), this.loca?.remove(this.flylineInstance)
    this.loca?.destroy()
    this.map = this.loca = this.flylineInstance = this.flyline = null
  }
}
