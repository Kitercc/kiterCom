import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, PictorialBarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getBarSeriesOptions, getGlobalOptions } from '.'
import { TitleConfig } from '../../LczBasicBar/type'
import {
  getLegendOptions,
  getTitleOptions,
  getAxisOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { defaultGlobal, defaultTitleConfig, defaultBarLegendConfig, defaultToolbarConfig } from './defaultValue'
import { generalAxis, GeneralToolTip, generalxAxis, generalyAxis } from '../../../common/generalValue'
import { GeneralDataMap, GeneralLegend } from '../../../common/type'
import { BasicStereohistogram, StereohistogramDataSeries } from '../type'
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
  CanvasRenderer,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  PictorialBarChart
])

export class CreateChart extends LczChart {
  mouseoverEvent: any
  constructor(options: CreateChartProps) {
    super(options)
    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(
    config: BasicStereohistogram,
    dataMemo: { [key: string]: GeneralDataMap[] },
    seriesStyle: StereohistogramDataSeries[]
  ) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    let options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig
    } = config
    const {
      titleConfig = defaultTitleConfig as TitleConfig,
      legendConfig = defaultBarLegendConfig as GeneralLegend,
      toolbarConfig = defaultToolbarConfig
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig

    const dataSeries = seriesConfig?.dataSeries || []

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel.time)

    const colors = seriesStyle.map(item => (globalConfig.barStyle?.barType === 'prism' ? item.prismColor : item.color))

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'stereohistogram')
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig, { chartType: 'stereohistogram' })
    // 处理坐标
    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x')
    const _yAxis = getAxisOptions(yAxis, dataMemo, 'y')
    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })

    const series = getBarSeriesOptions(config, dataMemo, {
      colors,
      seriesStyle,
      isStack: true
    })

    options = Object.assign(options, global, legend, title, toolbar, _xAxis, _yAxis, series, tooltip)

    if (options) this.myChart.setOption(options, true)

    this.hideTip()
    if (tooltipConfig.autoPlay?.display) {
      this.showTooltip(tooltipConfig)
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
    }
  }

  dispose() {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.hideTip()
    this.myChart.dispose()
    //@ts-ignore
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
