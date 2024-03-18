import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  TimelineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import { DataSeries, SortBarProps, SortlDataMap } from '../type'
import { getGlobalOptions, getSortOptions, getSortSeries, getSortTitleOptions, getSortXAxis, getTimeConfig } from '.'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  GridComponent,
  TimelineComponent,
  LegendComponent,
  UniversalTransition,
  BarChart,
  CanvasRenderer,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart
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
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 2, renderer: 'canvas', locale: 'ZH' })
    this.uuid = randomChar('lcz-sort')
  }

  setConfig(config: SortBarProps, dataMemo: { key: SortlDataMap[] }, styledsMemo: { key: DataSeries[] }) {
    let options = {}

    const { globalConfig, axisConfig, timerShaft } = config,
      { xAxis } = axisConfig,
      { titleConfig } = globalConfig

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    //处理时间轴
    const timeConfig = getTimeConfig(timerShaft, dataMemo)
    //X轴
    const _xAxis = getSortXAxis(xAxis)
    //系列
    const sortSeries = getSortSeries(config)
    //动态排序的options
    const sortOptions = getSortOptions(config, dataMemo, styledsMemo)
    //标题
    const titleOptions = getSortTitleOptions(titleConfig)

    options = Object.assign(options, titleOptions, global, timeConfig, _xAxis, sortSeries, sortOptions, titleOptions)

    if (options) this.myChart.setOption(options, true)
    // console.log(options)
  }

  setEvents(type: 'click' | 'mouseover' | 'mousemove' | 'globalout', fn) {
    this.myChart.off(type)
    this.myChart.on(type, params => {
      fn.call(this.myChart, type, params)
    })
  }

  resize(size: { w: number; h: number }) {
    this.width = size.w
    this.height = size.h
    this.myChart.resize()
  }

  dispose() {
    //@ts-ignore
    ;(this.el = null), (this.myChart = null)
  }
}
