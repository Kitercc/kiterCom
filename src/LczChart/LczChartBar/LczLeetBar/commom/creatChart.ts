import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { PictorialBarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getGlobalOptions, getLeetSeriesOptions } from '.'
import { GlobalBarStyle, LeetBarProps, LeetDataSeries } from '../type'
import {
  getTitleOptions,
  getAxisOptions,
  getToolbarOptions,
  getTooltipOptions,
  getLegendOptions
} from '../../../common'
import {
  generalAxis,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
import { GeneralDataMap, GeneralTitle } from '../../../common/type'
import { defatultLineBarLegendConfig } from '../../../LczChartBlend/LczBasicLineBar/common/defaultValue'
import { BarLineLegendConfig } from '../../../LczChartBlend/LczBasicLineBar/type'
import { defaultGlobal, defaultGlobalBarStyle } from './defaultValue'
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
  PictorialBarChart,
  CanvasRenderer,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
])

export class CreateChart extends LczChart {
  mouseoverEvent: any
  constructor(options: CreateChartProps) {
    super(options)

    this.mouseoverEvent = this.hideTip.bind(this)
  }

  async setConfig(config: LeetBarProps, dataMemo: { [key: string]: GeneralDataMap[] }, styleMemo: LeetDataSeries[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    let options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig
    } = config
    const {
      titleConfig = generalTitleConfig as GeneralTitle,
      legendConfig = defatultLineBarLegendConfig as BarLineLegendConfig,
      toolConfig = generalToolConfig,
      globalBarStyle = defaultGlobalBarStyle as GlobalBarStyle
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig

    const dataSeries = seriesConfig?.dataSeries || [],
      colors = styleMemo.map(v => v.color)

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel.time)

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'leet')
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolConfig)
    // 处理坐标

    //象形图开启图像重叠，y轴最小值不管用
    const symbolRepeatArr = styleMemo.map(v => {
      if (v.barStyle.display) {
        return v.barStyle.symbolRepeat
      } else {
        return globalBarStyle.symbolRepeat
      }
    })
    const hasSymbolRepeat = symbolRepeatArr.includes(true)

    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x')
    const _yAxis = getAxisOptions(yAxis, dataMemo, 'y', { isSymbolRepeat: hasSymbolRepeat })
    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })

    const series = await getLeetSeriesOptions(config, dataMemo, styleMemo, globalBarStyle)

    options = Object.assign(options, global, legend, title, toolbar, _xAxis, _yAxis, series, tooltip)

    if (options) this.myChart.setOption(options, true)

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
    this.myChart?.dispose()
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    //@ts-ignore
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
