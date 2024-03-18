import * as echarts from 'echarts/core'
import { TitleComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import 'echarts-liquidfill'
import { randomChar } from '../../../../common/util'
import { WaterPoloProps } from '../type'
import { getWaterSeries } from '.'
import { getTitleOptions } from '../../../common'
import { generalTitleConfig } from '../../../common/generalValue'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([CanvasRenderer, TitleComponent])

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
    this.uuid = randomChar('lcz-water-polo')
  }

  setConfig(props: WaterPoloProps, value: { waterValue: number; nullData: boolean }) {
    let options = { backgroundColor: props.globalConfig?.bgColor }

    const title = getTitleOptions(props.globalConfig?.titleConfig || generalTitleConfig)

    const series = getWaterSeries(props, value)

    options = Object.assign(options, title, series)

    options && this?.myChart && this.myChart.setOption(options, true)
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
