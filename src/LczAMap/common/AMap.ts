import _ from 'lodash'
import { AmapProps, CameraSettings, MapSettings } from '../type'

interface mAMapProps {
  w: number
  h: number
  el: HTMLDivElement
  config: AmapProps
  callback: {
    click: (e: any) => void
    zoomEnd: (e: any) => void
    moveEnd: () => void
  }
}

export default class mAMap {
  map: any
  shadowMap: any
  width: number
  height: number
  traffic?: any
  config: AmapProps | null
  firstUpdata: boolean
  moveStatus: boolean

  constructor(options: mAMapProps) {
    this.config = options.config
    this.width = options.w
    this.height = options.h
    this.shadowMap = null
    this.firstUpdata = true
    this.moveStatus = false
    const { design = true, mapsettings, cameraSettings = {} as CameraSettings } = this.config
    const { Lng, Lat, initZoom = 16, viewMode = '2D', skyColor = '#ff0000', pitch = 60 } = cameraSettings

    const amapParam: any = {
      resizeEnable: true,
      zoom: initZoom,
      center: [Lng, Lat],
      viewMode,
      skyColor,
      pitch,
      zooms: [2, 30],
      showLabel: mapsettings?.showLabel,
      features: this.getfeatures(mapsettings),
      WebGLParams: {
        preserveDrawingBuffer: design
      }
    }

    const mapStyleId = this.getMapStyleId()
    mapStyleId && (amapParam.mapStyle = mapStyleId)
    this.map = new AMap.Map(options.el, amapParam)

    this.shadowMap = _.cloneDeep(this.map)

    this.map.on('click', function (e) {
      options.callback.click(e)
    })

    this.map.on('zoomend', e => {
      options.callback.zoomEnd(e)
      this.moveStatus = false
    })

    this.map.on('mapmove', () => {
      !this.moveStatus && (this.moveStatus = true)
    })

    this.map.on('mouseup', () => {
      if (this.moveStatus) {
        options.callback.moveEnd()
        this.moveStatus = false
      }
    })

    this.upDataTraffic(mapsettings?.showTraffic || false)
  }

  getBounds() {
    const mode = this.map._view.type
    let bounds: any = null
    if (mode === '2D') {
      bounds = this.map.getBounds()
    } else if (mode === '3D') {
      this.shadowMap = _.cloneDeep(this.map)
      this.shadowMap.setPitch(0, true, 0)
      bounds = this.shadowMap.getBounds()
    }
    return bounds
  }

  afterMoved() {
    this.shadowMap = _.cloneDeep(this.map)
  }

  updataView(config: AmapProps) {
    try {
      this.config = config
      const { mapsettings, cameraSettings = {} as CameraSettings } = config
      const { Lng, Lat, initZoom = 16, viewMode, pitch = 60 } = cameraSettings
      const features = this.getfeatures(mapsettings)
      const mapStyleId = this.getMapStyleId()

      this.map.setFeatures(features)
      this.map.setMapStyle(mapStyleId)
      this.map.setCenter([Lng, Lat])
      this.map.setZoom(initZoom)
      viewMode === '3D' && this.map.setPitch(pitch)
      this.upDataTraffic(mapsettings?.showTraffic || false)
    } catch (error) {
      console.log(error)
    }
  }

  upDataTraffic(showTraffic: boolean) {
    if (showTraffic) {
      if (this.traffic) {
        this.traffic.show()
      } else {
        this.traffic = new AMap.TileLayer.Traffic({
          zIndex: 1,
          interval: 180
        })
        this.traffic.setMap(this.map)
      }
    } else {
      this.traffic && this.traffic.hide()
    }
  }

  getfeatures(mapsettings: MapSettings | undefined) {
    const featuresobj = {
        showRoad: 'road',
        showBuild: 'building',
        showPoint: 'point'
      },
      features: any = ['bg']
    for (const key in mapsettings) {
      const item = mapsettings[key]
      item && featuresobj[key] && features.push(featuresobj[key])
    }
    return features
  }

  getMapStyleId() {
    const id = this.config?.mapStyleId || ''
    if (typeof id === 'string') {
      return id
    } else {
      return id.value || ''
    }
  }

  resize(w, h) {
    this.width = w
    this.height = h
    this.map.resize()
  }

  destroy() {
    this.traffic && this.traffic.destroy()
    this.traffic && this.map && this.map.remove(this.traffic)

    this.map && this.map.destroy()
    this.map = this.traffic = this.shadowMap = this.config = null
  }
}
