import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  VisualMapComponent
} from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import { randomChar } from '../../../../common/util'
import { TestTubeProps, TubeStyle } from '../type'
import { defaultGlobalConfig } from './defaultValue'
import { generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { getGlobalOptions, getSeries } from '.'
import { getTitleOptions, getToolbarOptions } from '../../../common'

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
  PieChart
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
    this.uuid = randomChar('lcz-pie')
  }

  setConfig(props: TestTubeProps, value: { tubeValue: number; nullData: boolean }, { w, h }) {
    const { globalConfig = defaultGlobalConfig, seriesConfig } = props
    const { titleConfig = generalTitleConfig, toolbarConfig = generalToolConfig } = globalConfig
    this.width = w
    this.height = h

    let options = {}

    // 处理全局
    const global = getGlobalOptions(globalConfig, (seriesConfig?.tubeStyle || {}) as TubeStyle, {
      w: this.width,
      h: this.height
    })
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig)

    const series = getSeries(props, value, { w, h })

    options = Object.assign(options, global, title, toolbar, series)

    if (options && this.myChart) this.myChart.setOption(options, true)
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
