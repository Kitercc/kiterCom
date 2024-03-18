import mAMap from '../../../LczAMap/common/AMap'
import { OutPolyline, PolyLineConfig, PolylineDataMap, PolyLineGlobal } from '../../../LczAMap/type/child'

interface PolyLineOptions {
  polyline: OutPolyline
  mAmap: mAMap
  callback: (param: any) => void
}

export default class PolyLine {
  polyline: OutPolyline
  map: any
  lines: any
  globalConfig?: PolyLineGlobal
  drawlineids: any[]
  callback: (param: any) => void
  currentLine: string

  constructor(options: PolyLineOptions) {
    this.polyline = options.polyline
    this.map = options.mAmap.map
    this.lines = {}
    this.drawlineids = []
    this.callback = options.callback
    this.currentLine = ''
  }

  updataPolyLine(polylineStyle: { data: any; style: any }, globalConfig: PolyLineGlobal, currentLine: string) {
    this.globalConfig = globalConfig
    this.currentLine = String(currentLine)

    const { data, style } = polylineStyle
    const lines = this.lines
    this.drawlineids = []

    if (Object.keys(lines).length > 0) {
      for (const name in lines) {
        if (!data[name]) {
          this.map.remove(this.lines[name])
          delete this.lines[name]
        }
      }
    }

    this.drawlineids = Object.keys(data)

    for (const key in data) {
      const _data = data[key],
        _style = style[key] || style['_none']
      this.drawLine(_data, _style, String(key))
    }
  }

  drawLine(data: PolylineDataMap[], style: PolyLineConfig, type: string) {
    const { color = '#FAD91C', width = 3, opacity = 100, stroke, selectStyle, unSelectStyle } = style,
      seriesValue = this.currentLine || '',
      path = data.map(v => [v.lng, v.lat]),
      polylineOption: any = {
        path,
        zIndex: this.globalConfig?.level || 1,
        strokeColor: color,
        strokeOpacity: opacity / 100,
        strokeWeight: width,
        isOutline: false,
        lineCap: 'round',
        extData: type
      }

    if (seriesValue && this.drawlineids.length > 0 && this.drawlineids.includes(seriesValue)) {
      // 状态选中
      if (type === seriesValue) {
        const { display = false, opacity = 100, stroke } = selectStyle || {}

        if (display) {
          polylineOption.strokeOpacity = opacity / 100
          if (stroke?.display) {
            polylineOption.isOutline = true
            polylineOption.borderWeight = stroke.width
            polylineOption.outlineColor = stroke.color
          } else {
            polylineOption.isOutline = false
          }
        }
      } else {
        //状态 未选中
        if (unSelectStyle?.display) polylineOption.strokeOpacity = unSelectStyle.opacity / 100
      }
    } else {
      if (stroke?.display) {
        polylineOption.isOutline = true
        polylineOption.borderWeight = stroke.width
        polylineOption.outlineColor = stroke.color
      }
    }

    if (this.lines[type]) {
      this.lines[type].setPath(polylineOption.path)
      this.lines[type].setOptions(polylineOption)
      this.lines[type].setExtData(type)
    } else {
      const polyline = new AMap.Polyline(polylineOption)
      this.lines[type] = polyline
      this.map.add(polyline)

      polyline.on('click', this.callback)
    }
  }

  destroy() {
    if (this.lines) {
      for (const key in this.lines) {
        if (Object.prototype.hasOwnProperty.call(this.lines, key)) {
          const line = this.lines[key]
          line.destroy()
          this.map && this.map.remove(line)
        }
      }
      this.lines = null
    }

    // @ts-ignore
    ;(this.polyline = null), (this.globalConfig = null), (this.drawlineids = null)
    this.map = null
  }
}
