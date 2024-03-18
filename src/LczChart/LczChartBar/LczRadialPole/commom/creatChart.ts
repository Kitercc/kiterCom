import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { GeneralTitle, GeneralToolBox } from '../../../common/type'
import { RadialGlobalConfig, RadialPolarAxisConfig, RadialPoleProps } from '../type'
import {
  generalAngleAxis,
  generalRadialAxis,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip
} from '../../../common/generalValue'
import { getTitleOptions, getToolbarOptions } from '../../../common'
import { getAxis, getPolar, getSeries } from '.'
import { getTangLegendOptions, getTangTooltipOptions } from '../../LczTangentialBar/commom'
import { defaultLegendConfig } from '../../../LczChartPie/Lcz3dTorus/common/defaultValue'
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
  MarkPointComponent
])

export class CreateChart extends LczChart {
  mouseoverEvent: any
  constructor(options: CreateChartProps) {
    super(options)

    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(config: RadialPoleProps, dataMemo: any[], colors: any[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    const { globalConfig, radialPolarAxisConfig = {}, seriesConfig, tooltipConfig = GeneralToolTip } = config

    const {
      backgroundColor,
      titleConfig = generalTitleConfig as GeneralTitle,
      toolConfig = generalToolConfig as GeneralToolBox,
      legendConfig = defaultLegendConfig,
      singleSeries = true
    } = (globalConfig || {}) as RadialGlobalConfig

    const dataSeries =
      (singleSeries ? seriesConfig?.signSeries?.dataSeries : seriesConfig?.multiSeries?.dataSeries) || []

    const {
      radialAxis = generalAngleAxis,
      angleAxis = generalRadialAxis
    } = radialPolarAxisConfig as RadialPolarAxisConfig

    let options = { backgroundColor }
    //处理标题
    const title = getTitleOptions(titleConfig)

    // 处理图例
    const legend = getTangLegendOptions(
      legendConfig,
      dataMemo,
      dataSeries || [],
      colors,
      singleSeries && !!seriesConfig?.signSeries?.name
    )

    //处理柱子样式
    const polar = getPolar(config)

    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)

    //处理坐标轴
    const axis = getAxis(radialAxis, angleAxis, dataMemo, { singleSeries, dataSeries })

    // 处理提示框
    const tooltip = getTangTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, {
      dataMemo,
      chartType: 'radial',
      singleSeries: singleSeries && !!seriesConfig?.signSeries?.name
    })

    const series = getSeries(config, dataMemo, colors)

    options = Object.assign(options, title, legend, polar, toolbar, axis, tooltip, series)

    if (options) this.myChart.setOption(options, true)

    if (tooltipConfig.autoPlay?.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig, 'angleAxis')
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig, 'angleAxis'))
    } else {
      this.hideTip()
    }
  }

  dispose() {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.hideTip()
    this.myChart?.dispose && this.myChart.dispose()
    //@ts-ignore
    this.el = this.mouseoverEvent = this.myChart = null
  }
}
