import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getStripSeriesOptions, getGlobalOptions, getStripDataZommOptions, machinYAxis } from '.'
import { BasicStripProps, StripDataSeries, ValueLabel } from '../type'
import {
  getLegendOptions,
  getTitleOptions,
  getAxisOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { defaultGlobal } from './defaultValue'
import {
  generalAxis,
  generalLegendConfig,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
import { GeneralDataMap, GeneralTitle, GeneralLegend } from '../../../common/type'
import { CarouselAnimation } from '../../LczBasicBar/type'
import { LczChart } from '../../../common/LczChart'
import { configDisplayCompatible } from '../../../../common/util'

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
  MarkPointComponent,
  LineChart
])

export class CreateChart extends LczChart {
  tipTimer: any
  dataZoomTimer: any
  mouseoverEvent: any
  _showCarouselAni: any
  constructor(options: CreateChartProps) {
    super(options)

    this.mouseoverEvent = this.hideTip.bind(this)
  }

  setConfig(config: BasicStripProps, dataMemo: { [key: string]: GeneralDataMap[] }, styledsMemo: StripDataSeries[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.hideDataZoom(true)

    let options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig,
      chartType = 'strip'
    } = config
    const {
      titleConfig = generalTitleConfig as GeneralTitle,
      legendConfig = generalLegendConfig as GeneralLegend,
      toolbarConfig = generalToolConfig,
      carouselAnimation = {} as CarouselAnimation
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig,
      decorateDisplay = seriesConfig?.decorateDisplay || false

    const clickIntDis = configDisplayCompatible(legendConfig?.clickInt, 'clicked')
    if (decorateDisplay && legendConfig?.clickInt && clickIntDis) legendConfig.clickInt.display = false

    const dataSeries = seriesConfig?.dataSeries || [],
      colors = styledsMemo.map(v => v.color)

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel.time)

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    // 处理图例
    let legend: any = null
    if (chartType === 'signSeries') {
      legend = { legend: { show: false } }
    } else {
      legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'bar')
    }
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig, decorateDisplay ? { chartType: 'strip' } : {})
    // 处理坐标
    const _xAxis = { xAxis: { ...getAxisOptions(yAxis, dataMemo, 'y').yAxis, type: 'value' } }
    let _yAxis: any = { yAxis: getAxisOptions(xAxis, dataMemo, 'x').xAxis }

    if (chartType === 'signSeries') {
      const valueLabel = globalConfig?.valueLabel || (defaultGlobal.valueLabel as ValueLabel)

      _yAxis = machinYAxis(_yAxis.yAxis, valueLabel, dataMemo['_none'], styledsMemo, xAxis)
    }

    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, {
      dataMemo,
      isReversal: true,
      chartType: chartType
    })
    const series = getStripSeriesOptions(config, dataMemo, styledsMemo, { isStack: chartType === 'stackStrip' })

    const dataZoomOptions = getStripDataZommOptions(carouselAnimation, chartType)

    options = Object.assign(options, global, legend, title, toolbar, dataZoomOptions, _xAxis, _yAxis, series, tooltip)

    if (options) this.myChart.setOption(options, true)

    if (tooltipConfig.autoPlay?.display && !carouselAnimation.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig, 'yAxis')
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig, 'yAxis'))
    } else {
      this.hideTip()
    }

    setTimeout(() => {
      if (carouselAnimation.display && (chartType == 'strip' || chartType == 'signSeries')) {
        this.hideDataZoom(true)
        this.showCarouselAni(carouselAnimation)
        this._showCarouselAni = this.showCarouselAni.bind(this, carouselAnimation)

        switch (carouselAnimation.interactionMode) {
          case 'mouse':
            this.setEvents('mousemove', this._showCarouselAni)
            break
          case 'click':
            this.setEvents('click', this._showCarouselAni)
            break
        }
      } else {
        this.hideDataZoom(true)
      }
    })
  }

  showCarouselAni(carouselAnimation: CarouselAnimation) {
    this.hideDataZoom(true)
    this.dataZoomTimer = setInterval(() => {
      const options: any = this.myChart.getOption()
      const startValue = options.dataZoom[0].startValue + carouselAnimation.updateNumber
      const endValue = options.dataZoom[0].endValue + carouselAnimation.updateNumber
      if (options.dataZoom[0].endValue == options.yAxis[0].data.length - 1) {
        this.myChart.dispatchAction({
          type: 'dataZoom',
          startValue: 0,
          endValue: (carouselAnimation.showNumer || 6) - 1
        })
      } else {
        this.myChart.dispatchAction({
          type: 'dataZoom',
          startValue,
          endValue
        })
      }
    }, (carouselAnimation.interval || 3) * 1000)
  }

  hideDataZoom(flay = true) {
    this.dataZoomTimer && clearInterval(this.dataZoomTimer)
    flay &&
      this.myChart.dispatchAction({
        type: 'takeGlobalCursor',
        key: 'dataZoomSelect',
        dataZoomSelectActive: false
      })
  }

  dispose() {
    this.hideDataZoom()
    this.hideTip()
    this.myChart?.dispose()
    this.el.removeEventListener('mouseover', this.mouseoverEvent)

    //@ts-ignore
    this.el = this.mouseoverEvent = this.myChart = null
  }
}
