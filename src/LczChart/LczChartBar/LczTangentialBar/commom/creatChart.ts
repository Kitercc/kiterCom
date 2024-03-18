import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  PolarComponent
} from 'echarts/components'
import { BarChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import {
  generalAngleAxis,
  generalPolarAxisConfig,
  generalRadialAxis,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip
} from '../../../common/generalValue'
import { GeneralTitle, GeneralToolBox, GeneralDataMap } from '../../../common/type'

import { LczTangentialBarProps, TangGlobalConfig } from '../type'
import { getPolar, getTangAxisOptions, getTangLegendOptions, getTangSeriesOptions, getTangTooltipOptions } from '.'
import { getTitleOptions, getToolbarOptions } from '../../../common'
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
  TitleComponent,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  BarChart,
  PolarComponent,
  CanvasRenderer
])

export class CreateChart extends LczChart {
  mouseoverEvent: any
  constructor(options: CreateChartProps) {
    super(options)
    this.el = options.wrapper

    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(
    config: LczTangentialBarProps,
    dataMemo: { [key: string]: GeneralDataMap[] },
    seriesArr: { colors: any[]; pillarTypeArr: any[] }
  ) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    const {
      globalConfig,
      tooltipConfig = GeneralToolTip,
      polarAxisConfig = generalPolarAxisConfig,
      seriesConfig
    } = config
    const {
      backgroundColor,
      titleConfig = generalTitleConfig as GeneralTitle,
      toolConfig = generalToolConfig as GeneralToolBox,
      legendConfig = defaultLegendConfig
    } = globalConfig as TangGlobalConfig
    const { radialAxis = generalRadialAxis, angleAxis = generalAngleAxis } = polarAxisConfig
    const dataSeries = seriesConfig?.dataSeries || []

    let options: any = { backgroundColor }

    //处理标题
    const title = getTitleOptions(titleConfig)

    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)

    //处理极轴
    const polar = getPolar(config)

    // 处理图例
    const legend = getTangLegendOptions(legendConfig, dataMemo, seriesConfig?.dataSeries || [], seriesArr.colors)

    //处理坐标轴
    const _radialAxis = getTangAxisOptions(radialAxis, dataMemo, 'raius')
    const _angleAxis = getTangAxisOptions(angleAxis, dataMemo, 'angle')

    //处理系列options
    const series = getTangSeriesOptions(config, dataMemo, seriesArr.colors, seriesArr.pillarTypeArr)

    // 处理提示框
    const tooltip = getTangTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })

    options = Object.assign(options, title, toolbar, polar, _radialAxis, _angleAxis, legend, series, tooltip)

    if (options && this.myChart) this.myChart.setOption(options, true)

    if (tooltipConfig.autoPlay?.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig, 'radiusAxis')
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig, 'radiusAxis'))
    } else {
      this.hideTip()
    }
  }

  dispose() {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.hideTip()
    this.myChart?.dispose && this.myChart.dispose()
    //@ts-ignore
    this.el = this.myChart = null
  }
}
