import * as echarts from 'echarts/core'
import { GridComponent, TitleComponent, TooltipComponent, ToolboxComponent } from 'echarts/components'
import { GraphChart } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { LczChart } from '../../../common/LczChart'
import { MechanicalBubbleProps } from '../type'
import { getTitleOptions, getToolbarOptions } from '../../../common'
import { getMechanicalSeries } from '.'
import { GeneralPieDataMap } from '../../../common/type'

interface CreateChartProps {
  wrapper: HTMLDivElement
  width: number
  height: number
}

echarts.use([
  GraphChart,
  TooltipComponent,
  GridComponent,
  TitleComponent,
  UniversalTransition,
  ToolboxComponent,
  CanvasRenderer
])

export class CreateChart extends LczChart {
  constructor(options: CreateChartProps) {
    super(options)
  }
  setConfig(config: MechanicalBubbleProps, dataMemo: GeneralPieDataMap[]) {
    const { globalConfig } = config,
      { bgColor, titleConfig, toolbarConfig } = globalConfig
    const options = {
      backgroundColor: bgColor,
      tooltip: {
        show: false
      }
    }
    // 处理标题
    const title = getTitleOptions(titleConfig)
    // 生成工具栏
    const toolbar = getToolbarOptions({}, toolbarConfig)
    //气泡图series
    const series = getMechanicalSeries(config, dataMemo)

    Object.assign(options, title, toolbar, series)

    if (options) this.myChart.setOption(options, true)
  }

  dispose() {
    this.myChart.dispose()
    //@ts-ignore
    this.el = this.myChart = this.mouseoverEvent = null
  }
}
