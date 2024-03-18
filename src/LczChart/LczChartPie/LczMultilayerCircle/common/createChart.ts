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
import { getLegendOptions, getTitleOptions } from '../../../common'
import { randomChar } from '../../../../common/util'
import { generalTitleConfig } from '../../../common/generalValue'
import { MultilayerCircleProps, SeriesConfig } from '../type'
import { defaultGlobalConfig, defaultNumberLabel } from './defaultValue'
import { defaultLegendConfig } from '../../Lcz3dTorus/common/defaultValue'
import { GeneralPieDataMap } from '../../../common/type'
import { DataSeries } from '../../Lcz3dTorus/type'
import { getCircleSeries, getCircleYaxisOptions, getGlobalOptions } from '.'

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
    this.uuid = randomChar('lcz-circle')
  }

  setConfig(props: MultilayerCircleProps, data: GeneralPieDataMap[], styledsMemo: DataSeries[]) {
    const { globalConfig = defaultGlobalConfig, seriesConfig = {} as SeriesConfig } = props
    const {
        backgroundColor,
        titleConfig = generalTitleConfig,
        legendConfig = defaultLegendConfig,
        numberLabel = defaultNumberLabel
      } = globalConfig,
      { dataSeries = [] } = seriesConfig,
      colors = styledsMemo.map(v => v.color)

    let options: any = {
      backgroundColor,
      xAxis: [
        {
          show: false
        }
      ]
    }
    const title = getTitleOptions(titleConfig)

    const global = getGlobalOptions(globalConfig)

    const yAxisOptions = getCircleYaxisOptions(numberLabel, dataSeries, data, { colors })

    const legend = getLegendOptions(legendConfig, data, seriesConfig?.dataSeries || [], colors, 'basic-pie')

    const series = getCircleSeries(props, data, { colors })

    options = Object.assign(options, global, title, yAxisOptions, legend, series)
    // console.log(options)

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
