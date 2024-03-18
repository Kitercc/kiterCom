import * as echarts from 'echarts/core'
import { randomChar } from '../../common/util'
import { GeneralTooltipConfig } from './type'

interface LczChartProps {
  wrapper: HTMLElement
  width: number
  height: number
  type?: string
}

function getSeriesIndex(series: any[], name) {
  const _i = series.findIndex(s => !!s.data.find(d => d.name == name)),
    si = _i > 0 ? _i : 0,
    di = (series?.[si]?.data || []).findIndex(d => d.name == name)

  return {
    seriesIndex: si,
    dataIndex: di
  }
}

export class LczChart {
  myChart: echarts.EChartsType
  el: HTMLElement
  width: number
  height: number
  uuid: string
  tipTimer?: NodeJS.Timeout
  tooltipIndex = 0
  eventAction: any = {}
  bindEventTimer?: NodeJS.Timeout

  constructor(options: LczChartProps) {
    this.el = options.wrapper
    this.width = options.width
    this.height = options.height
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 2, renderer: 'canvas', locale: 'ZH' })
    this.uuid = randomChar(options.type || 'cart-')
  }

  showTooltip(tooltipConfig: GeneralTooltipConfig, type = 'xAxis') {
    this.hideTip(false)
    const options: any = this.myChart.getOption()
    const carouselData = options?.[type][0]?.data || []
    const series = options.series

    if (carouselData.length === 0 || series.length === 0) {
      this.hideTip()
      return false
    }

    const _interval = (tooltipConfig?.autoPlay?.interval || 1) >= 1 ? tooltipConfig.autoPlay?.interval || 1 : 1

    this.tipTimer = setTimeout(() => {
      if (this.tooltipIndex <= carouselData.length - 1) {
        const name = carouselData[this.tooltipIndex],
          { seriesIndex, dataIndex } = getSeriesIndex(series, name)
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex,
          dataIndex
        })
        this.tooltipIndex = this.tooltipIndex + 1
        this.showTooltip(tooltipConfig, type)
      } else {
        const { seriesIndex, dataIndex } = getSeriesIndex(series, carouselData[0])
        this.myChart.dispatchAction({
          type: 'showTip',
          seriesIndex,
          dataIndex
        })
        this.tooltipIndex = 1
        this.showTooltip(tooltipConfig, type)
      }
    }, _interval * 1000)
  }

  hideTip(flay = true) {
    this.tipTimer && clearTimeout(this.tipTimer)
    flay &&
      this.myChart.dispatchAction({
        type: 'hideTip'
      })
  }

  setEvents(type: 'click' | 'mouseover' | 'mousemove' | 'globalout', fn) {
    this.myChart.off(type)

    if (!this.eventAction[type]) {
      this.eventAction[type] = [fn]
    } else {
      const findIndex = this.eventAction[type].findIndex(v => fn.name && v.name === fn.name)
      findIndex >= 0 ? this.eventAction[type].splice(findIndex, 1, fn) : this.eventAction[type].push(fn)
    }

    this.bindEventTimer && clearTimeout(this.bindEventTimer)
    this.bindEventTimer = setTimeout(() => {
      this.bindEvent()
    }, 300)
  }

  bindEvent() {
    for (const eventType in this.eventAction) {
      const fnObj = this.eventAction[eventType]
      this.myChart.on(eventType, params => {
        fnObj.forEach(v => v.call(this.myChart, eventType, params))
      })
    }

    this.eventAction = {}
  }

  resize(size: { w: number; h: number }) {
    this.width = size.w
    this.height = size.h
    this.myChart && this.myChart.resize()
  }

  dispose() {
    this.hideTip()
    this.myChart.dispose()
    //@ts-ignore
    this.el = this.myChart = null
  }
}
