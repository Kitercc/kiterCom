import * as echarts from 'echarts/core'
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  ToolboxComponent,
  MarkLineComponent,
  MarkPointComponent
} from 'echarts/components'
import { BarChart, LineChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getLineGlobalOptions, getLineSeriesOptions } from '.'
import { DynamicLineProps, LineDataSeries } from '../type'
import { defaultGlobal } from './deafultValue'
import {
  generalAxis,
  generalLegendConfig,
  generalTitleConfig,
  generalToolConfig,
  GeneralToolTip,
  generalxAxis,
  generalyAxis
} from '../../../common/generalValue'
import { GeneralLegend, GeneralTitle, GeneralToolBox, GeneralDataMap } from '../../../common/type'
import {
  getAxisOptions,
  getLegendOptions,
  getTitleOptions,
  getToolbarOptions,
  getTooltipOptions
} from '../../../common'
import { deepClone } from '../../../../common/util'
import { LczChart } from '../../../common/LczChart'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  TooltipComponent,
  GridComponent,
  TitleComponent,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  BarChart,
  CanvasRenderer
])

export class CreateChart extends LczChart {
  constructor(options: CreateChartProps) {
    super(options)
  }

  setConfig(
    config: DynamicLineProps,
    dataMemo: {
      [key: string]: Array<GeneralDataMap>
    },
    styledsMemo: LineDataSeries[]
  ) {
    let options = {}
    const {
      globalConfig = defaultGlobal,
      axisConfig = generalAxis,
      tooltipConfig = GeneralToolTip,
      seriesConfig
    } = config
    const {
      titleConfig = generalTitleConfig as GeneralTitle,
      legendConfig = generalLegendConfig as GeneralLegend,
      toolConfig = generalToolConfig as GeneralToolBox,
      displayNum = 20
    } = globalConfig
    const { xAxis = generalxAxis, yAxis = generalyAxis } = axisConfig,
      colors = styledsMemo.map(v => v?.brokenLine?.color)

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel?.time)

    const spliceData: any = {}
    Object.keys(dataMemo).forEach(key => {
      spliceData[key] = dataMemo[key].slice(-displayNum)
    })
    const dataSeries = seriesConfig?.dataSeries || []
    // 处理全局
    const global = getLineGlobalOptions(globalConfig)
    // 处理图例
    const legend = getLegendOptions(legendConfig, spliceData, dataSeries, colors, 'line')
    //处理标题
    const title = getTitleOptions(titleConfig)
    //处理工具栏
    const toolbar = getToolbarOptions({}, toolConfig)
    //处理坐标轴
    const _xAxis = getAxisOptions(xAxis, spliceData, 'x')
    const _yAxis = getAxisOptions(yAxis, spliceData, 'y')

    //处理系列options
    const series = getLineSeriesOptions(config, spliceData, styledsMemo)

    // 处理提示框
    const tooltip = getTooltipOptions.call(this.myChart, tooltipConfig, dataSeries, this.uuid, { dataMemo: spliceData })

    options = Object.assign(options, global, title, toolbar, _xAxis, _yAxis, series, legend, tooltip)

    if (options) this.myChart.setOption(options, true)
  }

  setAddData(
    config: DynamicLineProps,
    dataMemo: {
      [key: string]: Array<GeneralDataMap>
    },
    styledsMemo: LineDataSeries[],
    valueRef: React.MutableRefObject<{
      [key: string]: Array<GeneralDataMap>
    } | null>
  ) {
    if (valueRef.current) {
      this.addToData(valueRef.current || dataMemo, dataMemo, config, styledsMemo, valueRef)
    } else {
      valueRef.current = dataMemo
    }
  }

  addToData(
    oldData: { [key: string]: Array<GeneralDataMap> },
    newData: { [key: string]: Array<GeneralDataMap> },
    config: DynamicLineProps,
    styledsMemo: LineDataSeries[],
    valueRef: React.MutableRefObject<{
      [key: string]: Array<GeneralDataMap>
    } | null>
  ) {
    let options = {}
    const maxLength = config.globalConfig?.displayNum || 20

    const _oldData = deepClone(oldData)
    const addToData: any = {}
    if (Object.keys(newData).length) {
      Object.keys(newData).forEach(key => {
        addToData[key] = [...(_oldData[key] || []), ...newData[key]]
        addToData[key] = addToData[key].slice(-maxLength)
      })
    } else {
      Object.keys(_oldData).forEach(key => {
        addToData[key] = [..._oldData[key]]
      })
    }
    const { globalConfig = defaultGlobal, axisConfig = generalAxis, seriesConfig } = config
    const { legendConfig = generalLegendConfig as GeneralLegend } = globalConfig
    const { xAxis = generalxAxis } = axisConfig,
      colors = styledsMemo.map(v => v?.brokenLine?.color)
    const dataSeries = seriesConfig?.dataSeries || []

    xAxis.axisLabel?.labelType === 'time' && (this.myChart[`${this.uuid}-nametype`] = xAxis.axisLabel?.time)
    // 处理图例
    const legend = getLegendOptions(legendConfig, addToData, dataSeries, colors, 'line')
    //处理坐标轴
    const _xAxis = getAxisOptions(xAxis, addToData, 'x')

    const series = getLineSeriesOptions(config, addToData, styledsMemo)
    options = Object.assign(options, series, legend, _xAxis)
    valueRef.current = addToData
    this.myChart.setOption(options)
  }

  getEchartsOptions() {
    const _options = this.myChart.getOption()
    return _options
  }
}
