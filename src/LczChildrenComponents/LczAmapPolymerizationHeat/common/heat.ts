import { OutPolymerizationHeat } from '../../../LczAMap/type/child'
import { isEqual } from 'lodash'
import { numberIsEmpty } from '../../../common/util'

export default class PolymerizationHeat {
  mapInstance: any
  heatmap: any
  heatConfig: OutPolymerizationHeat
  constructor(option: { map: any; polymerizationHeat: OutPolymerizationHeat }) {
    this.mapInstance = option.map
    this.heatConfig = option.polymerizationHeat

    const heatOptions = this.getHeatOption(option.polymerizationHeat),
      heatData = this.getDataSetOption(option.polymerizationHeat)

    this.mapInstance.plugin(['AMap.HeatMap'], () => {
      this.heatmap = new AMap.HeatMap(this.mapInstance, heatOptions)
      this.heatmap.setDataSet(heatData)
    })
  }

  updataView(polymerizationHeat: OutPolymerizationHeat) {
    if (
      !isEqual(this.heatConfig.globalConfig, polymerizationHeat.globalConfig) ||
      !isEqual(this.heatConfig.thermalPoint, polymerizationHeat.thermalPoint)
    ) {
      const heatOptions = this.getHeatOption(polymerizationHeat)
      this.heatmap.setzIndex(heatOptions.zIndex)
      this.heatmap.setOptions(heatOptions)
    }

    if (
      !isEqual(this.heatConfig.data, polymerizationHeat.data) ||
      this.heatConfig.thermalPoint?.maxVal !== polymerizationHeat.thermalPoint?.maxVal
    ) {
      const heatData = this.getDataSetOption(polymerizationHeat)
      this.heatmap.setDataSet(heatData)
    }

    this.heatConfig = polymerizationHeat
  }

  getHeatOption(polymerizationHeat: OutPolymerizationHeat) {
    const { globalConfig, thermalPoint } = polymerizationHeat,
      viewRange = globalConfig?.viewRange || { min: 3, max: 20 }
    const { heightScale = 1, heightBezier = { X1: 0.4, Y1: 0.2, X2: 0.4, Y2: 0.8 }, gridSize = 2 } =
        thermalPoint?.threeConfig || {},
      options = {
        zIndex: globalConfig?.zIndex || 1,
        zooms: [viewRange.min, viewRange.max].sort((a, b) => a - b),
        radius: thermalPoint?.radius || 10,
        opacity: [(thermalPoint?.minOpacity || 0) / 100, (thermalPoint?.maxOpacity || 0) / 100].sort((a, b) => a - b),
        '3d': {
          heightScale,
          gridSize: gridSize < 2 ? 2 : gridSize,
          heightBezier: [heightBezier.X1, heightBezier.Y1, heightBezier.X2, heightBezier.Y2]
        },
        gradient: this.getGradient(thermalPoint?.gradient || [])
      }

    return options
  }

  getGradient(colors: { proportion; color }[]) {
    let color = {}
    colors.forEach(v => {
      !color[v.proportion] && (color[v.proportion] = v.color)
    })

    if (Object.keys(color).length === 0) {
      color = { '0': '#000', '1': '#000' }
    }
    return color
  }

  getDataSetOption(polymerizationHeat: OutPolymerizationHeat) {
    const data = polymerizationHeat.data || [],
      maxVal = polymerizationHeat.thermalPoint?.maxVal,
      heatData = data.map(item => ({ lng: item.lng, lat: item.lat, count: item.value })),
      heatDataSetOption = {
        data: heatData,
        max: maxVal
      }

    if (!numberIsEmpty(maxVal)) {
      let max = -99999
      data.forEach(item => +item.value > max && (max = +item.value))
      heatDataSetOption.max = max
    }
    return heatDataSetOption
  }

  destroy() {
    try {
      this.mapInstance.complete && this.heatmap.setMap(null)
    } catch (error) {
      console.warn(error)
    }
    //@ts-ignore
    this.mapInstance = this.heatmap = this.heatConfig = null
  }
}
