import * as echarts from 'echarts/core'
import 'echarts-wordcloud'
import { TooltipComponent, GridComponent, ToolboxComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { debounce, randomChar } from '../../../../common/util'
import { GeneralPieDataMap, GeneralTooltipConfig } from '../../../common/type'
import { DataSeries, WordCloudProps } from '../type'
import { getSeries } from '.'
import { defaultGlobal, defaultTooltipConfig } from './defaultValue'
import { generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { getTitleOptions, getToolbarOptions, getTooltipOptions } from '../../../common'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([TooltipComponent, GridComponent, CanvasRenderer, ToolboxComponent])

export class CreateChart {
  el: HTMLDivElement
  myChart: echarts.EChartsType
  width: number
  height: number
  uuid: string
  tooltipIndex: number
  tipTimer: any
  mouseoverEvent: any
  finished: boolean
  constructor(options: CreateChartProps) {
    this.el = options.wrapper
    this.width = options.width
    this.height = options.height
    this.myChart = echarts.init(this.el, undefined, { devicePixelRatio: 1, renderer: 'canvas', locale: 'ZH' })
    this.uuid = randomChar('lcz-wordcloud')
    this.tooltipIndex = 0
    this.mouseoverEvent = this.hideTip.bind(this)
    this.finished = false
  }

  async setConfig(props: WordCloudProps, data: GeneralPieDataMap[], stylesMemo: DataSeries[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    const { globalConfig = defaultGlobal, tooltipConfig = defaultTooltipConfig } = props
    const datSeries = props.seriesConfig?.dataSeries || []

    const { backgroundColor, titleConfig = generalTitleConfig, toolbarConfig = generalToolConfig } = globalConfig

    let options: any = { backgroundColor }

    const title = getTitleOptions(titleConfig)

    const toolbar = getToolbarOptions({}, toolbarConfig)

    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, datSeries, this.uuid, {
      chartType: 'wordcloud'
    })

    const series = await getSeries(props, data, stylesMemo)

    options = Object.assign(options, title, toolbar, tooltip, series)

    setTimeout(() => {
      if (options) this.myChart.setOption(options, true)
    })

    if (tooltipConfig.autoPlay?.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig)
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
    } else {
      this.myChart && this.myChart.off('globalout')
      this.hideTip()
    }

    this.setEvents(
      'finished',
      debounce(() => {
        if (this.myChart) {
          if (!this.finished) {
            if (tooltipConfig.autoPlay?.display) {
              this.hideTip()
              this.showTooltip(tooltipConfig)
              this.el.addEventListener('mouseover', this.mouseoverEvent)
              this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
            } else {
              this.myChart.off('globalout')
              this.hideTip()
            }
          } else {
            this.myChart.off('finished')
          }
          this.finished = true
        }
      }, 50)
    )
  }

  showTooltip(tooltipConfig: GeneralTooltipConfig) {
    this.hideTip(false)
    const options: any = this.myChart && this.myChart.getOption()
    if (!options || !options.series || options.series.length <= 0 || !this.myChart) return
    const data = options.series[0].data
    const _interval = (tooltipConfig?.autoPlay?.interval || 1) >= 1 ? tooltipConfig.autoPlay?.interval || 1 : 1

    this.tipTimer = setTimeout(() => {
      if (this.tooltipIndex <= data.length - 1) {
        this.myChart &&
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: this.tooltipIndex
          })
        this.tooltipIndex = this.tooltipIndex + 1
        this.showTooltip(tooltipConfig)
      } else {
        this.myChart &&
          this.myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: 0
          })
        this.tooltipIndex = 1
        this.showTooltip(tooltipConfig)
      }
    }, _interval * 1000)
  }

  setEvents(type: 'click' | 'globalout' | 'finished', fn) {
    this.myChart.off(type)
    switch (type) {
      case 'finished': {
        this.myChart.on(type, () => {
          fn.call(this.myChart, type)
        })
        break
      }
      default: {
        this.myChart.on(type, params => {
          fn.call(this.myChart, params, type)
        })
        break
      }
    }
  }

  hideTip(flay = true) {
    this.tipTimer && clearTimeout(this.tipTimer)
    flay &&
      this.myChart &&
      this.myChart.dispatchAction({
        type: 'hideTip'
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
