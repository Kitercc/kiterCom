import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { LczChart } from '../../../common/LczChart'
import { getAreaGlobalOptions, getAreaSeriesOptions } from '.'
import { BasicAreaProps, RotationAnimate } from '../type'
import { defaultGlobal } from './deafultValue'
import {
  generalAxis,
  generalLegendConfig,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
import { GeneralLegend, GeneralTitle, GeneralToolBox, GeneralDataMap } from '../../../common/type'
import {
  getAxisOptions,
  getLegendOptions,
  getTitleOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { ChartCarousel } from '../../../common/chartCarousel'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  GridComponent,
  TitleComponent,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  BarChart,
  CanvasRenderer
])

export class CreateChart extends LczChart {
  mouseoverEvent: any
  chartCarousel?: ChartCarousel
  constructor(options: CreateChartProps) {
    super(options)
    this.tooltipIndex = 0
    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(config: BasicAreaProps, dataMemo: { [key: string]: GeneralDataMap[] }, colors: string[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    const options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig,
      chartType = 'area'
    } = config
    const {
      titleConfig = generalTitleConfig as GeneralTitle,
      legendConfig = generalLegendConfig as GeneralLegend,
      toolConfig = generalToolConfig as GeneralToolBox,
      rotationAnimate
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel?.time)

    const dataSeries = seriesConfig?.dataSeries || []
    // 处理全局
    const global = getAreaGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'line')
    //处理标题
    const title = getTitleOptions(titleConfig)
    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)
    //处理坐标轴
    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x')
    const _yAxis = getAxisOptions(yAxis, dataMemo, 'y')
    //处理系列options
    const series = getAreaSeriesOptions(config, dataMemo, colors, { isStack: chartType === 'stackArea' })
    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })

    Object.assign(options, global, title, toolbar, _xAxis, _yAxis, series, legend, tooltip)

    if (options) this.myChart.setOption(options, true)

    this.hideTip()
    if (tooltipConfig.autoPlay?.display && !rotationAnimate?.display) {
      this.showTooltip(tooltipConfig)
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
    }

    if (rotationAnimate?.display) {
      if (!this.chartCarousel) {
        this.chartCarousel = new ChartCarousel(this.myChart, rotationAnimate || ({} as RotationAnimate))
      } else {
        this.chartCarousel.initAnimate(rotationAnimate, tooltipConfig.autoPlay?.display)
      }
    } else {
      this.chartCarousel?.hideAnimate()
    }
  }

  dispose() {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.chartCarousel && this.chartCarousel.destroy()
    this.hideTip()
    this.myChart.dispose()
    //@ts-ignore
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
