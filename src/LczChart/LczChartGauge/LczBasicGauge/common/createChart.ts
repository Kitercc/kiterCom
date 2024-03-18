import * as echarts from 'echarts/core'
import { TitleComponent } from 'echarts/components'
import { GaugeChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import { LabelLayout } from 'echarts/features'
import { BasicGaugeProps, GaugeDataSeries } from '../type'
import { GeneralPieDataMap } from '../../../common/type'
import { getGaugeSeries } from '.'
import { getToolbarOptions } from '../../../common'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([TitleComponent, GaugeChart, CanvasRenderer, LabelLayout])

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

  async setConfig(props: BasicGaugeProps, dataMemo: GeneralPieDataMap[], stylesMemo: GaugeDataSeries[]) {
    const { globalConfig } = props,
      { backgroundColor, toolConfig } = globalConfig

    let options = { backgroundColor }

    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolConfig)

    //生成series
    const series = await getGaugeSeries(props, dataMemo, stylesMemo)

    options = Object.assign(options, toolbar, series)

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
      this.myChart?.dispose && this.myChart.dispose()
      this.myChart?.clear && this.myChart.clear()
      //@ts-ignore
      ;(this.el = null), (this.myChart = null)
    } catch (error) {
      //@ts-ignore
      ;(this.el = null), (this.myChart = null)
    }
  }
}
