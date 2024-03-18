import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent,
  VisualMapComponent
} from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import { BubbleConfig, BubbleStyle, ScatterProps, ScattrsStyle } from '../type'
import { getBubbleVisualMapStyle, getGlobalOptions, getSeries } from '.'
import { defaultGlobalConfig } from './defaultValue'
import {
  getAxisOptions,
  getLegendOptions,
  getTitleOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { GeneralLegend, GeneralTitle, GeneralToolBox } from '../../../common/type'
import {
  generalAxis,
  generalLegendConfig,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
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
  DataZoomComponent,
  ScatterChart,
  VisualMapComponent,
  CanvasRenderer,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
])

export class CreateChart extends LczChart {
  constructor(options: CreateChartProps) {
    super(options)
  }

  setConfig(
    config: ScatterProps,
    dataMemo: any,
    styles: ScattrsStyle[] | BubbleStyle[],
    { chartType }: { chartType: 'bubble' | 'scatter' }
  ) {
    const {
      globalConfig = defaultGlobalConfig,
      axisConfig = generalAxis,
      seriesConfig,
      tooltipConfig = GeneralToolTip
    } = config
    const {
      titleConfig = generalTitleConfig as GeneralTitle,
      legendConfig = generalLegendConfig as GeneralLegend,
      toolbarConfig = generalToolConfig as GeneralToolBox
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig
    const dataSeries: any = seriesConfig?.dataSeries || []

    const colorArr = styles.map(v => (chartType === 'scatter' ? v.color : v.style.color))

    // 处理全局
    let global = getGlobalOptions(globalConfig)
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colorArr, 'scatter')
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig, { chartType: 'scatter' })
    // 处理坐标
    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x', { chartType: 'scatter' })
    const _yAxis = getAxisOptions(yAxis, dataMemo, 'y', { chartType: 'scatter' })

    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, {
      dataMemo,
      chartType
    })

    const series = getSeries(config, dataMemo, styles, { chartType })

    //处理气泡图 连续映射、分段映射
    if (chartType === 'bubble' && seriesConfig?.bubbleConfig?.styleMode !== 'none') {
      const bubbleConfig = (seriesConfig?.bubbleConfig || {}) as BubbleConfig
      const visualMap = getBubbleVisualMapStyle(bubbleConfig)
      global = Object.assign(global, visualMap)
    }

    const options = Object.assign(global, title, legend, toolbar, _xAxis, _yAxis, tooltip, series)

    if (options) this.myChart.setOption(options, true)
  }
}
