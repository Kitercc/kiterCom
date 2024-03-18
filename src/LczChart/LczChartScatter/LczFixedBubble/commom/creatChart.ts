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
import { BubbleDataSeries, FixedBubbleProps } from '../type'
import { getLegendOptions, getTitleOptions, getToolbarOptions } from '../../../common'
import { randomChar } from '../../../../common/util'
import { GeneralDataMap } from '../../../common/type'
import { getBubbleTooltipOptions, getFixedBubbleSeriesOptions, getGlobalOptions } from '.'

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

export class CreateChart {
  el: HTMLDivElement
  myChart: echarts.EChartsType
  width: number
  height: number
  uuid: string
  highTimer: any
  highIndex: number
  constructor(options: CreateChartProps) {
    this.el = options.wrapper
    this.width = options.width
    this.height = options.height
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 2, renderer: 'canvas', locale: 'ZH' })
    this.highIndex = 0
    this.uuid = randomChar('lcz-scatter')
  }

  updata() {
    //
  }

  setConfig(
    config: FixedBubbleProps,
    dataMemo: { seriesData: GeneralDataMap[]; normalData: GeneralDataMap[] } | any,
    styledsMemo: BubbleDataSeries[]
  ) {
    const { globalConfig, seriesConfig, tooltipConfig, layoutConfig } = config,
      { titleConfig, legendConfig, toolbarConfig, focusAnimate } = globalConfig,
      { randomLayout, customLayout = [] } = layoutConfig,
      { seriesData, normalData } = dataMemo,
      dataSeries = seriesConfig.dataSeries || []
    const colorArr = styledsMemo.map(v => v.bubbleStyle.color)

    const intervalName: any[] = []
    if (randomLayout) {
      normalData.forEach(v => intervalName.push(v.category))
    } else {
      normalData.forEach(v => customLayout.some(item => item.bubbleName == v.category) && intervalName.push(v.category))
    }

    let options = {}
    // 处理全局
    const global = getGlobalOptions(globalConfig)

    // 处理标题
    const title = getTitleOptions(titleConfig)

    // 处理图例
    const legend = getLegendOptions(legendConfig, seriesData, dataSeries, colorArr, 'scatter')

    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig)

    // 处理提示框
    const tooltip = getBubbleTooltipOptions.call(this.myChart, tooltipConfig, dataSeries)

    const series = getFixedBubbleSeriesOptions(config, seriesData, styledsMemo, normalData)

    options = Object.assign(options, title, legend, global, toolbar, tooltip, series)

    // console.log(dataMemo)

    // console.log(options)

    if (options) this.myChart.setOption(options, true)

    setTimeout(() => {
      if (focusAnimate.focusA && intervalName.length) {
        this.hideHighlight(true)
        this.showHighlight(focusAnimate, intervalName)
      } else {
        this.hideHighlight(true)
      }
    })
  }

  showHighlight(focusAnimate: { focusA: boolean; interval: number }, intervalName: any[]) {
    const { interval = 1 } = focusAnimate
    this.highTimer = setInterval(() => {
      this.myChart.dispatchAction({
        type: 'downplay'
      })
      if (this.highIndex <= intervalName.length - 1) {
        this.myChart.dispatchAction({
          type: 'highlight',
          name: intervalName[this.highIndex]
        })
        this.highIndex = this.highIndex + 1
      } else {
        this.myChart.dispatchAction({
          type: 'highlight',
          name: intervalName[0]
        })
        this.highIndex = 1
      }
    }, interval * 1000)
  }

  hideHighlight(flay = true) {
    this.highTimer && clearTimeout(this.highTimer)
    this.highIndex = 0
    flay &&
      this.myChart.dispatchAction({
        type: 'downplay'
      })
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
