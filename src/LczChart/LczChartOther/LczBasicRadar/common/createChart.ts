import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent
} from 'echarts/components'
import { RadarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import {
  generalLegendConfig,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip
} from '../../../common/generalValue'
import { LczBasicRadarProps } from '../type'

import { GeneralRadarDataMap } from '../../../common/type'

import { getTitleOptions, getToolbarOptions } from '../../../common'
import { getRadarLegendOptions, getRadarOptions, getRadarSeriesOptions, getRadarTooltipOptions } from '.'
import { defaultRadarGlobal } from './defaultValue'

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
  RadarChart
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
    this.uuid = randomChar('lcz-radar')
  }

  setConfig(props: LczBasicRadarProps, dataMemo: GeneralRadarDataMap[], stylesMemo: any[]) {
    const { globalConfig = defaultRadarGlobal, seriesConfig, tooltipConfig = GeneralToolTip } = props
    const {
      backgroundColor,
      titleConfig = generalTitleConfig,
      legendConfig = generalLegendConfig,
      toolConfig = generalToolConfig
    } = globalConfig

    let options: any = { backgroundColor }
    //标题
    const title = getTitleOptions(titleConfig)

    //图例
    const legend = getRadarLegendOptions(legendConfig, dataMemo, seriesConfig?.radarDataSeries || [])

    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)

    //处理坐标轴
    const radarConfig = getRadarOptions(props, dataMemo)

    //处理提示框
    const tooltip = getRadarTooltipOptions(tooltipConfig, seriesConfig?.radarDataSeries || [], dataMemo)

    //处理系列series
    const series = getRadarSeriesOptions(props, dataMemo, stylesMemo)

    options = Object.assign(options, title, toolbar, series, radarConfig, legend, tooltip)

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
