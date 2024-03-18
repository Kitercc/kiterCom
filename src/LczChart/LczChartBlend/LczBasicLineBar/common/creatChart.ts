import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { GeneralDataMap } from '../../../common/type'
import { DataSeries, LineBarProps } from '../type'
import { getGlobalOptions, getSeries } from '.'
import { defatultLineBarLegendConfig, defaultGlobal } from './defaultValue'
import {
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
import {
  getAxisOptions,
  getBlendAxisOptions,
  getLegendOptions,
  getTitleOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { LczChart } from '../../../common/LczChart'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  GridComponent,
  LegendComponent,
  UniversalTransition,
  BarChart,
  LineChart,
  CanvasRenderer,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart
])

export class CreateChart extends LczChart {
  mouseoverEvent: any

  constructor(options: CreateChartProps) {
    super(options)

    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(config: LineBarProps, dataMemo: { [key: string]: GeneralDataMap[] }, dataSeries: DataSeries[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    const { globalConfig = defaultGlobal, tooltipConfig = GeneralToolTip, chartType = 'linebar' } = config
    const {
      titleConfig = generalTitleConfig,
      legendConfig = defatultLineBarLegendConfig,
      toolbarConfig = generalToolConfig
    } = globalConfig
    const colors = dataSeries.map(v => v.color)

    let options = {}

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'bar')
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig)
    // 处理坐标
    const xAxis = config?.axisConfig?.xAxis || generalxAxis
    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel.time)
    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x')
    const yAxisConfig = [config?.axisConfig?.yAxis || generalyAxis, config?.axisConfig?.secondYAxis || generalyAxis]
    const _yAxis = getBlendAxisOptions(yAxisConfig, dataMemo, 'y')
    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })
    //处理系列
    const series = getSeries(config, dataMemo, dataSeries, { isStack: chartType === 'stackAreaBar' })

    options = Object.assign(options, global, legend, title, toolbar, _xAxis, _yAxis, tooltip, series)

    this.myChart.setOption(options, true)

    // 处理toolTip轮播
    if (tooltipConfig.autoPlay?.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig)
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
    } else {
      this.hideTip()
    }
  }

  dispose() {
    this.hideTip()
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.myChart?.dispose()
    //@ts-ignore
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
