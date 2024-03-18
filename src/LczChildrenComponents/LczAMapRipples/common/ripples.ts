import { compareSize } from '../../../common/util'
import mAMap from '../../../LczAMap/common/AMap'
import { OutRipples, RipplesDataMap, RipplesStyle } from '../../../LczAMap/type/child'
import { systemRipples } from './index'

interface RipplesProps {
  mAmap: mAMap
}

export default class Ripples {
  map: any
  loca: any // 高德地图 Loca.Container
  ripplesList: Map<string, any> // 涟漪列表
  ripples: OutRipples | null
  constructor(options: RipplesProps) {
    this.map = options.mAmap.map

    this.ripplesList = new Map()
    this.ripples = null
  }

  updataView(ripples: OutRipples) {
    this.ripples = ripples
    const ripplesType = ripples.ripplesConfig?.ripplesTyle || 'image'

    switch (ripplesType) {
      // 图片模式
      case 'image': {
        if (!this.loca) {
          this.loca = new Loca.Container({
            map: this.map
          })
        }

        this.updataImageRipples()
        break
      }
      // canvas 模式
      case 'canvas':
        break
    }
  }

  updataImageRipples() {
    const { data, styles } = this.getImageStyles()
    this.loca.animate.stop()
    if (this.ripplesList.size === 0) {
      this.initImageRipples(data, styles)
    } else {
      this.mergeRipplesList(data, styles)
    }
  }

  initImageRipples(data, styles) {
    const globalConfig = this.ripples?.globalConfig

    if (this.ripples?.data?.length) {
      for (const key in data) {
        const itemData: RipplesDataMap[] = data[key],
          _styles: RipplesStyle = styles[key],
          geoJSONData = this.getGeoJSON(itemData),
          style: any = this.getImageRipplesStyles(_styles),
          breath = new Loca.ScatterLayer({
            loca: this.loca,
            zIndex: globalConfig?.level || 1,
            opacity: 1,
            visible: true,
            zooms: [globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30]
          })

        breath.setSource(geoJSONData)
        breath.setStyle(style)

        this.ripplesList.set(key, breath)
      }

      this.loca.animate.start()
    }
  }

  mergeRipplesList(data, styles) {
    const globalConfig = this.ripples?.globalConfig

    for (const [key, val] of this.ripplesList) {
      const findData = data[key]
      val?.clearAnimate()
      if (!findData) {
        this.ripplesList.delete(key)
        val.remove()
      }
    }

    if (this.ripples?.data?.length) {
      for (const name in data) {
        const ripples = this.ripplesList.get(name)
        const itemData: RipplesDataMap[] = data[name],
          _styles: RipplesStyle = styles[name],
          geoJSONData = this.getGeoJSON(itemData),
          style = this.getImageRipplesStyles(_styles)

        if (ripples) {
          ripples.setStyle(style)
          ripples.setzIndex(globalConfig?.level || 0)
          ripples.setZooms([globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30])
          ripples.setSource(geoJSONData)
        } else {
          const breath = new Loca.ScatterLayer({
            loca: this.loca,
            zIndex: globalConfig?.level || 0,
            opacity: 1,
            visible: true,
            zooms: [globalConfig?.viewRange?.min || 2, globalConfig?.viewRange?.max || 30]
          })

          breath.setSource(geoJSONData)
          breath.setStyle(style)

          this.ripplesList.set(name, breath)
        }
      }

      this.loca.animate.start()
    }
  }

  getImageRipplesStyles(styles: RipplesStyle) {
    let size = typeof styles.size === 'number' ? styles.size : styles.size.value
    size = isNaN(+size) ? 0 : Number(size)

    const ripplesConfig = this.ripples?.ripplesConfig,
      style: any = {
        unit: 'px',
        animate: true,
        duration: ripplesConfig?.duration || 1000,
        size: [size, size]
      }
    style.texture = styles.ripplesImageType === 'system' ? systemRipples(styles.systemType) : styles.customImgUrl

    return style
  }

  getImageStyles() {
    const { ripplesConfig, data = [] } = this.ripples || {},
      { normalStyle, sectionConfig = [] } = ripplesConfig || {},
      normalDisplay = normalStyle?.display || false,
      _obj: { data: any; styles: any } = { data: {}, styles: {} }

    if (sectionConfig.length <= 0) {
      if (normalStyle && normalDisplay) {
        _obj.data = { _normal: [...data] }
        _obj.styles = { _normal: normalStyle }
      }
    } else {
      data.forEach(item => {
        const findStyle = sectionConfig.find(v => {
          const { min, max } = compareSize(v.min, v.max)
          return min <= item.value && max >= item.value
        })

        if (findStyle) {
          const name = `${findStyle.max}|${findStyle.min}`
          _obj.data[name] ? _obj.data[name].push(item) : (_obj.data[name] = [item])
          _obj.styles[name] = findStyle
        } else {
          if (normalStyle && normalDisplay) {
            _obj.data['_normal'] ? _obj.data['_normal'].push(item) : (_obj.data['_normal'] = [item])
            _obj.styles['_normal'] = normalStyle
          }
        }
      })
    }

    return _obj
  }

  getGeoJSON(data: RipplesDataMap[]) {
    const FeatureCollection: any = {
      type: 'FeatureCollection',
      features: []
    }

    data.forEach(item => {
      FeatureCollection.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.lng, item.lat]
        },
        properties: {
          level: 'B',
          value: item.value
        }
      })
    })

    return new Loca.GeoJSONSource({ data: FeatureCollection })
  }

  destroy() {
    this.loca?.animate?.destroy()

    this.loca?.viewControl?.clearAnimates()

    for (const [, value] of this.ripplesList) {
      value?.clearAnimate()
      value.destroy()
      this.loca.remove(value)
    }

    this.loca?.destroy()

    this.map = null
    this.ripplesList.clear()
    this.ripples = null
    this.loca = null
  }
}
