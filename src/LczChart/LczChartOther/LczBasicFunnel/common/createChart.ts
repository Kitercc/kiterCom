import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent
} from 'echarts/components'
import { FunnelChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import { generalTitleConfig, generalToolConfig, GeneralToolTip } from '../../../common/generalValue'
import { FunnelDataSeries, LczBasicFunnelProps } from '../type'
import { defaultFunnelGlobal, defaultFunnelLegend } from './defaultValue'
import { GeneralPieDataMap } from '../../../common/type'
import { getFunnelSeries, getSecondSeries } from '.'
import { getLegendOptions, getTitleOptions, getToolbarOptions, getTooltipOptions } from '../../../common'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  VisualMapComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
  ToolboxComponent,
  FunnelChart
])

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
    this.uuid = randomChar('lcz-funnel')
  }

  setConfig(props: LczBasicFunnelProps, data: GeneralPieDataMap[], styledsMemo: FunnelDataSeries[]) {
    const { globalConfig = defaultFunnelGlobal, seriesConfig, tooltipConfig = GeneralToolTip } = props
    const {
        backgroundColor,
        titleConfig = generalTitleConfig,
        legendConfig = defaultFunnelLegend,
        toolConfig = generalToolConfig
      } = globalConfig,
      colors = styledsMemo.map(v => v.color)

    let options: any = { backgroundColor }

    //标题
    const title = getTitleOptions(titleConfig)
    //图例
    const legend = getLegendOptions(legendConfig, data, seriesConfig?.dataSeries || [], colors, 'basic-pie')
    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)
    //处理提示框
    const tooltip = getTooltipOptions(tooltipConfig, seriesConfig?.dataSeries || [], this.uuid, {
      dataMemo: data,
      chartType: 'pie'
    })

    const series = getFunnelSeries(props, data, { colors })

    const funnelSeries = getSecondSeries(props, series, data)

    options = Object.assign(options, legend, title, toolbar, funnelSeries, tooltip)
    // console.log(options)

    setTimeout(() => {
      if (options) this.myChart.setOption(options, true)
    })
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
      this.myChart && this.myChart.clear()
      this.myChart && this.myChart.dispose()
      //@ts-ignore
      ;(this.el = null), (this.myChart = null), (this.mouseoverEvent = null)
    } catch (error) {
      //@ts-ignore
      ;(this.el = null), (this.myChart = null), (this.mouseoverEvent = null)
    }
  }
}
