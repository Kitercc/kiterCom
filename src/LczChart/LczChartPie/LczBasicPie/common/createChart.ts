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
import _ from 'lodash'
import { LczChart } from '../../../common/LczChart'
import { getLegendOptions, getTitleOptions, getTooltipOptions } from '../../../common'
import { getSeries, getVisualMap } from '.'
import { generalTitleConfig, GeneralToolTip } from '../../../common/generalValue'
import { LczBasicPieProps, PieCarousel } from '../type'
import { defaultGlobalConfig } from './defaultValue'
import { defaultLegendConfig } from '../../Lcz3dTorus/common/defaultValue'
import { GeneralPieDataMap } from '../../../common/type'
import { DataSeries } from '../../Lcz3dTorus/type'

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

export class CreateChart extends LczChart {
  selectIndex: number
  selectTimer: NodeJS.Timer | null
  mouseoverEvent: any
  constructor(options: CreateChartProps) {
    super(options)
    this.selectIndex = 0
    this.mouseoverEvent = this.selectStop.bind(this)
    this.selectTimer = null
  }

  setConfig(props: LczBasicPieProps, data: GeneralPieDataMap[], styledsMemo: DataSeries[]) {
    this.selectStop()
    const {
      globalConfig = defaultGlobalConfig,
      seriesConfig,
      tooltipConfig = GeneralToolTip,
      chartType = 'pie'
    } = props
    const { backgroundColor, titleConfig = generalTitleConfig, legendConfig = defaultLegendConfig } = globalConfig,
      colors = styledsMemo.map(v => v.color)

    const carousel = props.pieChart?.select?.display ? props.pieChart?.select?.carousel : false

    let options: any = { backgroundColor }

    const title = getTitleOptions(titleConfig)

    const legend = getLegendOptions(legendConfig, data, seriesConfig?.dataSeries || [], colors, 'basic-pie')

    const tooltip = getTooltipOptions(tooltipConfig, seriesConfig?.dataSeries || [], this.uuid, {
      dataMemo: data,
      chartType: 'pie'
    })

    if (chartType === 'nightingale' && seriesConfig?.visualMap && seriesConfig.visualMap.display) {
      options.visualMap = getVisualMap(seriesConfig?.visualMap)
    }

    const series = getSeries.call(this.myChart, props, data, { colors })
    options = Object.assign(options, title, legend, tooltip, series)

    if (options && this.myChart) this.myChart.setOption(options, true)

    setTimeout(() => {
      this.selectStop()
      if (this.myChart && carousel && carousel.display && props.pieChart?.select?.mode === 'single') {
        this.running(carousel)

        switch (carousel.interactionMode) {
          case 'mouseover':
            this.setEvents('mousemove', () => this.running(carousel))
            break
          case 'click':
            this.setEvents('click', () => this.running(carousel))
            break
        }
      }
    })
  }

  running(carousel: PieCarousel) {
    this.selectStop()
    const options: any = this.myChart?.getOption()
    if (options?.series?.[0].data?.length > 0 && this.myChart) {
      this.selectTimer = setTimeout(() => {
        const series = _.cloneDeep(options.series),
          data = series[0].data

        this.myChart?.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: this.selectIndex
        })
        if (this.selectIndex < data.length - 1) {
          this.selectIndex++
        } else {
          this.selectIndex = 0
        }
        this.running(carousel)
      }, carousel.speed * 1000)
    }
  }

  setEvents(type: 'click' | 'selectchanged' | 'mousemove' | 'mouseover' | 'globalout', fn) {
    this.myChart.off(type)
    switch (type) {
      case 'click':
      case 'mousemove':
        this.myChart.on(type, params => {
          fn.call(this.myChart, params, type)
        })
        break
      case 'selectchanged':
        this.myChart.on(type, params => {
          fn.call(this.myChart, params, type)
        })
        break
      default:
        break
    }
  }

  selectStop() {
    this.selectTimer && clearTimeout(this.selectTimer)
  }

  dispose() {
    try {
      this.selectStop()
      this.myChart && this.myChart.clear()
      this.myChart && this.myChart.dispose()
      //@ts-ignore
      this.el = this.myChart = this.mouseoverEvent = null
    } catch (error) {
      //@ts-ignore
      this.el = this.myChart = this.mouseoverEvent = null
    }
  }
}
