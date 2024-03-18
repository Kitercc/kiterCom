import * as echarts from 'echarts/core'
import { TitleComponent, PolarComponent } from 'echarts/components'
import { BarChart, GraphChart, PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import { DefaultGaugeConfig, DefaultGlobalConfig, DefaultRingtitleConfig } from './defaultValue'
import { generalToolConfig } from '../../../common/generalValue'
import { getPolarConfig, getRingAngleAxis, getRingSeries, getRingTitleOptions } from '.'
import { getToolbarOptions } from '../../../common'
import { LabelLayout } from 'echarts/features'
import { PercentageRingProps, ringDataMap, RingGlobalConfig } from '../type'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([TitleComponent, PolarComponent, BarChart, GraphChart, PieChart, CanvasRenderer, LabelLayout])

export class CreateChart {
  el: HTMLDivElement
  myChart: echarts.EChartsType
  width: number
  height: number
  uuid: string
  constructor(options: CreateChartProps) {
    this.el = options.wrapper
    this.width = options.width
    this.height = options.height
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 1, renderer: 'canvas', locale: 'ZH' })
    this.uuid = randomChar('lcz-pie')
  }

  setConfig(props: PercentageRingProps, dataMemo: ringDataMap) {
    const { globalConfig = DefaultGlobalConfig, gaugeConfig = DefaultGaugeConfig, chartType = 'ring' } = props

    const {
      margin = { x: 50, y: 50 },
      backgroundColor,
      ringtitleConfig = DefaultRingtitleConfig,
      toolbarConfig = generalToolConfig
    } = globalConfig as RingGlobalConfig

    let options = {
      backgroundColor,
      radiusAxis: {
        show: false,
        type: 'category'
      }
    }
    //生成polar
    const polarConfig = getPolarConfig(margin, gaugeConfig)

    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig)

    // 处理标题
    const title = !dataMemo.nullData ? getRingTitleOptions(ringtitleConfig, gaugeConfig, dataMemo) : {}

    //处理angleAxis
    const angleAxisConfig = getRingAngleAxis(gaugeConfig, chartType)

    //处理series
    const series = getRingSeries(props, dataMemo, chartType)

    options = Object.assign(options, polarConfig, toolbar, title, angleAxisConfig, series)
    // console.log(options)

    if (options && this.myChart) this.myChart.setOption(options, true)
  }

  setEvents(type: 'click', fn) {
    this.myChart.off(type)
    this.myChart.on(type, params => {
      fn.call(this.myChart, params, type)
    })
  }

  resize(size: { w: number; h: number }) {
    this.width = size.w
    this.height = size.h
    this.myChart.resize()
  }

  dispose() {
    try {
      this.myChart?.clear && this.myChart.clear()
      this.myChart?.dispose && this.myChart.dispose()
      //@ts-ignore
      ;(this.el = null), (this.myChart = null)
    } catch (error) {
      //@ts-ignore
      ;(this.el = null), (this.myChart = null)
    }
  }
}
