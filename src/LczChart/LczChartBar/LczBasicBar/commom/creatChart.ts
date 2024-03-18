import * as echarts from 'echarts/core'
import {
  TooltipComponent,
  GridComponent,
  LegendComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent,
  DataZoomComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { LczChart } from '../../../common/LczChart'
import { getBarDataZommOptions, getBarSeriesOptions, getGlobalOptions } from '.'
import { TitleConfig, BasicBarProps, DataSeries, CarouselAnimation } from '../type'
import {
  getLegendOptions,
  getTitleOptions,
  getAxisOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { defaultGlobal, defaultTitleConfig, defaultBarLegendConfig, defaultToolbarConfig } from './defaultValue'
import { generalAxis, GeneralToolTip, generalxAxis, generalyAxis } from '../../../common/generalValue'
import { GeneralDataMap, GeneralLegend } from '../../../common/type'
import { configDisplayCompatible } from '../../../../common/util'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
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

  setConfig(config: BasicBarProps, dataMemo: { [key: string]: GeneralDataMap[] }, styledsMemo: DataSeries[]) {
    this.el.removeEventListener('mouseover', this.mouseoverEvent)
    this.hideDataZoom(true)

    let options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig,
      chartType = 'bar'
    } = config
    const {
      titleConfig = defaultTitleConfig as TitleConfig,
      legendConfig = defaultBarLegendConfig as GeneralLegend,
      toolbarConfig = defaultToolbarConfig,
      carouselAnimation = {} as CarouselAnimation
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig

    const dataSeries = seriesConfig?.dataSeries || [],
      decorateDisplay = seriesConfig?.decorateDisplay || false,
      colors = styledsMemo.map(v => v.color)

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel.time)

    const legendClickDis = configDisplayCompatible(legendConfig?.clickInt, 'clicked')
    if (decorateDisplay && legendConfig?.clickInt && legendClickDis) legendConfig.clickInt.display = false

    // 处理全局
    const global = getGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, dataMemo, dataSeries, colors, 'bar')
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig, decorateDisplay ? { chartType } : {})
    // 处理坐标
    const _xAxis = getAxisOptions(xAxis, dataMemo, 'x')
    const _yAxis = getAxisOptions(yAxis, dataMemo, 'y')
    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo })

    const series = getBarSeriesOptions(config, dataMemo, styledsMemo, { isStack: chartType === 'stackBar' })

    const dataZoomOptions = getBarDataZommOptions(carouselAnimation, chartType)

    options = Object.assign(options, global, legend, title, toolbar, dataZoomOptions, _xAxis, _yAxis, series, tooltip)

    if (options && this.myChart) this.myChart.setOption(options, true)

    if (tooltipConfig.autoPlay?.display && !carouselAnimation.display) {
      this.hideTip()
      this.showTooltip(tooltipConfig)
      this.el.addEventListener('mouseover', this.mouseoverEvent)
      this.setEvents('globalout', () => this.showTooltip(tooltipConfig))
    } else {
      this.hideTip()
    }

    setTimeout(() => {
      if (carouselAnimation.display && chartType == 'bar') {
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
      if (options.dataZoom[0].endValue == options.xAxis[0].data.length - 1) {
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
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
