import { memo, useMemo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutHeatmapLayer } from '../../LczAMap/type/child'

export default memo(function LczAMapHeatLayer({ mAmap, heatmap }: { mAmap: mAMap; heatmap: OutHeatmapLayer }) {
  const { globalConfig, heatStyle, data = [] } = heatmap,
    { range = 'province', adcode, deps = 0, outline, nullColor, styleSeries = [] } = heatStyle || {}

  const disProvinceInstance = useRef<any>(null)

  const layerOptions = useMemo(() => {
    const outlineColors = outline?.colors || {
      provinceStroke: '#fff',
      cityStroke: '#f3ff4a',
      countyStroke: '#1be4ff'
    }

    const options: any = {
      zIndex: globalConfig?.zIndex || 0,
      zooms: [globalConfig?.viewRange.min || 2, globalConfig?.viewRange.max || 30],
      styles: {
        'stroke-width': outline?.width || 0,
        'province-stroke': outlineColors.provinceStroke,
        'city-stroke': outlineColors.cityStroke,
        'county-stroke': outlineColors.countyStroke,
        fill: function (p) {
          const adcode = p.adcode
          const findData = data.find(item => item.adcode == adcode)
          if (findData && !isNaN(findData.value)) {
            const findStyle = styleSeries.find(item => item.max >= findData.value && item.min <= findData.value)
            if (findStyle) return findStyle.color
          }
          return nullColor
        }
      }
    }

    switch (range) {
      case 'world':
        break
      case 'country':
        break
      case 'province': {
        options.adcode = [adcode?.value || '']
        options.depth = deps || 0
        break
      }
      default:
        break
    }

    return options
  }, [JSON.stringify(heatmap)])

  useEffect(() => {
    return () => {
      disProvinceInstance.current && disProvinceInstance.current.setMap(null)
      disProvinceInstance.current && disProvinceInstance.current.destroy()
      disProvinceInstance.current = null
    }
  }, [deps, range])

  useEffect(() => {
    if (mAmap && layerOptions) {
      switch (range) {
        case 'province': {
          if (!disProvinceInstance.current) {
            disProvinceInstance.current = new AMap.DistrictLayer.Province(layerOptions)
            disProvinceInstance.current.setMap(mAmap.map)
          } else {
            disProvinceInstance.current.setAdcode(layerOptions.adcode)
            disProvinceInstance.current.setStyles(layerOptions.styles)
            disProvinceInstance.current.setzIndex(layerOptions.zIndex)
            disProvinceInstance.current.setZooms(layerOptions.zooms)
          }

          break
        }
        default:
          break
      }
    }
  }, [mAmap, JSON.stringify(layerOptions), JSON.stringify(heatStyle), JSON.stringify(data), JSON.stringify(styleSeries)])

  return null
})
