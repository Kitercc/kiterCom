import Heatmap from 'heatmap.js'
import ChinaMap from '../../../LczChina2dMap/common/chinaMap'
import { OutPolymerizationHeat, PolymerizationHeatDataMap, colorSeries } from '../../../LczChina2dMap/type/child'
import { setProjectionPath } from '../../LczChina2dMapTip/common'
import _ from 'lodash'

interface HeatProps {
  heatConfig: OutPolymerizationHeat
  myMap: ChinaMap
  el: HTMLDivElement
  w: number
  h: number
}

interface HeatData extends PolymerizationHeatDataMap {
  x?: number
  y?: number
}

export default class Heat {
  el: HTMLDivElement
  myMap: ChinaMap
  w: number
  h: number
  heatConfig: OutPolymerizationHeat
  lastData: PolymerizationHeatDataMap[]
  drawData: Map<string, HeatData> // 热力图渲染用的数据
  diffValues: Map<string, number> // 每次比较的差值
  projection: any // 地图 经纬度转坐标的函数
  heatmapInstance: Heatmap // 热力图的实例对象
  animateTimer: NodeJS.Timer | null
  increaseIndex: number
  constructor(props: HeatProps) {
    this.drawData = new Map()
    this.diffValues = new Map()
    this.heatConfig = props.heatConfig
    this.lastData = props.heatConfig.data || []
    this.myMap = props.myMap
    this.el = props.el
    this.w = props.w
    this.h = props.h
    this.animateTimer = null
    this.increaseIndex = 0
    this.getProjection()

    const { radius, minOpacity, maxOpacity, fuzzyFactor, colorSeries = [], data = [] } = this.heatConfig
    const config = {
      container: this.el,
      radius: radius,
      minOpacity: minOpacity / 100,
      maxOpacity: maxOpacity / 100,
      blur: fuzzyFactor,
      gradient: this.getGradient(colorSeries)
    }
    this.heatmapInstance = Heatmap.create(config)
    this.initDrawData(data)
  }

  initDrawData(data: PolymerizationHeatDataMap[]) {
    this.animateTimer && clearInterval(this.animateTimer)
    this.diffValues.clear()
    this.increaseIndex = 0
    this.drawData.clear()
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      const { lat, lng } = item
      const [x, y] = this.projection([lng, lat])
      if (!isNaN(x) && !isNaN(y)) this.drawData.set(`${item.lat}|${item.lng}`, { ...item, value: 0, x, y })
    }
    this.animateData(data)
  }

  setDrawData(data?: PolymerizationHeatDataMap[]) {
    this.animateTimer && clearInterval(this.animateTimer)
    this.diffValues.clear()
    this.increaseIndex = 0
    data = data || this.lastData
    for (let i = 0; i < data.length; i++) {
      const item = data[i],
        { lat, lng } = item,
        name = `${lat}|${lng}`
      if (!this.drawData.has(name)) {
        const [x, y] = this.projection([lng, lat])
        if (!isNaN(x) && !isNaN(y)) this.drawData.set(name, { ...item, value: 0, x, y })
      }
    }

    if (data.length < this.drawData.size) {
      for (const [key] of this.drawData) {
        const findData = data.find(item => `${item.lat}|${item.lng}` === key)
        if (!findData) this.drawData.delete(key)
      }
    }

    this.animateData(data)
  }

  animateData(data: PolymerizationHeatDataMap[]) {
    const { display = false, frequency = 10, speed = 100 } = this.heatConfig.dataAnimate || {}
    if (!display) return this.setData(data)
    this.animateTimer && clearInterval(this.animateTimer)

    if (data.length > this.drawData.size) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i],
          { lat, lng } = item,
          [x, y] = this.projection([lng, lat]),
          name = `${lat}|${lng}`
        if (!this.drawData.has(name)) {
          if (!isNaN(x) && !isNaN(y)) this.drawData.set(`${item.lat}|${item.lng}`, { ...item, value: 0, x, y })
        }
      }
    } else if (data.length < this.drawData.size) {
      for (const [key] of this.drawData) {
        const findData = data.find(item => `${item.lat}|${item.lng}` === key)
        if (!findData) this.drawData.delete(key)
      }
    }
    this.setData(this.drawData)
    this.animateTimer = setInterval(() => this.dataGrowth(data, frequency), speed)
  }

  dataGrowth(data: PolymerizationHeatDataMap[], frequency: number) {
    if (frequency > this.increaseIndex) {
      for (const [key, value] of this.drawData) {
        const findData = data.find(item => `${item.lat}|${item.lng}` === key)
        if (findData) {
          this.increaseIndex === 0 && this.diffValues.set(key, (findData.value - value.value) / frequency)
          if (this.diffValues.has(key)) {
            const diff = this.diffValues.get(key) || 0
            diff !== 0 && (value.value += diff || 0)
          }
          this.drawData[key] = value
        }
      }
      this.setData(this.drawData)
      this.increaseIndex++
    } else {
      this.animateTimer && clearInterval(this.animateTimer)
      this.diffValues.clear()
      this.increaseIndex = 0
    }
  }

  getGradient(colors: colorSeries[]) {
    const color = {}
    colors.forEach(v => {
      !color[v.proportion] && (color[v.proportion] = v.color)
    })
    return color
  }

  setData(data: PolymerizationHeatDataMap[] | Map<string, HeatData>) {
    let cloneData = data as PolymerizationHeatDataMap[]
    if (!Array.isArray(data)) {
      const _data = _.cloneDeep(data)
      cloneData = Array.from(_data.values())
    }
    const newData = this.formatData(cloneData),
      values = newData.map(v => v.value),
      max = (this.establish(this.heatConfig.maxValue) ? this.heatConfig.maxValue : Math.max(...values)) || 0,
      min = (this.establish(this.heatConfig.minValue) ? this.heatConfig.minValue : Math.min(...values)) || 0

    this.heatmapInstance.setDataMax(max > min ? max : min)
    this.heatmapInstance.setDataMin(max > min ? max : min)

    this.heatmapInstance.setData({
      max: max > min ? max : min,
      min: max > min ? min : max,
      data: newData
    })
  }

  getProjection() {
    this.projection = setProjectionPath(this.myMap.mapData, this.w, this.h).projection
  }

  formatData(data: PolymerizationHeatDataMap[] | undefined) {
    const newData: HeatData[] = []

    if (data) {
      data.forEach(v => {
        const item: HeatData = { value: 0 }
        const { lat, lng } = v
        const [x, y] = this.projection([lng, lat])
        if (!isNaN(x) && !isNaN(y)) {
          item.x = parseInt(x)
          item.y = parseInt(y)
          item.value = v.value
          newData.push(item)
        }
      })
    }
    return newData
  }

  upDataotherProp(props: OutPolymerizationHeat) {
    this.heatConfig = props
    const { maxOpacity, minOpacity, colorSeries = [], fuzzyFactor, radius } = props,
      newConfig = {
        radius,
        maxOpacity: maxOpacity / 100,
        minOpacity: minOpacity / 100,
        blur: fuzzyFactor,
        gradient: this.getGradient(colorSeries)
      }

    this.heatmapInstance.configure(newConfig)
  }

  establish(val) {
    return !isNaN(val) && val !== null
  }

  destroy() {
    // @ts-ignore
    ;(this.el = null), (this.myMap = null), (this.heatConfig = null)
    this.heatmapInstance && this.heatmapInstance.removeData()
  }
}
