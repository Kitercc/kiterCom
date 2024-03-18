import * as echarts from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { SurfaceChart } from 'echarts-gl/charts'
import { Grid3DComponent } from 'echarts-gl/components'
import { getGlobalOptions, getPie3D } from '.'
import { DataSeries, GlobalConfig, LegendConfig, PieConfig } from '../type'
import { getLegendOptions } from '../../../common'
import { GeneralPieDataMap } from '../../../common/type'
interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TitleComponent,
  TooltipComponent,
  SurfaceChart,
  Grid3DComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

export class CreateChart {
  el: HTMLDivElement
  width: number
  height: number
  myChart: echarts.EChartsType
  constructor(options: CreateChartProps) {
    this.el = options.wrapper
    this.width = options.width
    this.height = options.height
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 2, renderer: 'canvas' })
  }

  updataPie(config: PieConfig, data: GeneralPieDataMap[]) {
    const op: any = getPie3D(data, config)
    const _options = this.myChart.getOption()
    if (!op) return false
    this.myChart.setOption({ ..._options, ...op }, true)
  }

  setLegend(config: LegendConfig, dataMemo: GeneralPieDataMap[], dataSeries: DataSeries[], colors: string[]) {
    const options = getLegendOptions(config, dataMemo, dataSeries, colors)
    if (options) this.myChart.setOption(options)
  }

  setGlobalConfig(config: GlobalConfig, colors: string[]) {
    const options: any = getGlobalOptions(config)
    options.color = colors
    if (options) this.myChart.setOption(options)
  }

  setEvents(type: 'click' | 'mouseover' | 'none' | 'mouseout' | 'legendselectchanged', fn) {
    if (type === 'mouseover' || type === 'mouseout') {
      this.myChart.off(type)
      this.myChart.on(type, params => {
        fn.call(this.myChart, type, params)
      })
      this.myChart.off('click')
      this.myChart.on('click', params => {
        fn.call(this.myChart, 'click', params)
      })
    } else if (type === 'legendselectchanged') {
      this.myChart.off('legendselectchanged')
      this.myChart.on('legendselectchanged', params => {
        fn.call(this.myChart, params)
      })
    } else {
      this.myChart.off('click')
      this.myChart.on('click', params => {
        fn.call(this.myChart, type, params)
      })
    }
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
