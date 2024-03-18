import {
  GeneralDataMap,
  GeneralTitle,
  GeneralLegend,
  GeneralToolBox,
  GeneralAxis,
  GeneralYAxis,
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralTooltipConfig,
  GeneralShadowStyle,
  GenStrackSeries
} from '../../common/type'
import { ValueLabel } from '../../LczChartBar/LczBasicBar/type'
import { AreaStyle } from '../../LczChartLine/LczBasicArea/type'
import { BrokenLine, DataMarker } from '../../LczChartLine/LczBasicLine/type'

type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

interface BarBgConfig {
  display: boolean
  color: string
  opacity: number
  syncRadius: boolean
  radius?: { lt: number; rt: number; lb: number; rb: number }
}

export interface BarStyle {
  display?: boolean
  barType: 'square' | 'bullet' | 'custom'
  radius?: { lt: number; rt: number; lb: number; rb: number }
  bargap?: number
  barCategoryGap?: number
  barBgConfig?: BarBgConfig
}

interface LineBarLegend {
  iconConfig?: {
    legendType: 'normal' | 'custom'
    iconType: 'system' | 'custom' | 'svg'
    // system
    systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
    // custom
    customUrl: string
    // svg
    svgPath?: string
  }
}

export interface DefaultAreaStyle extends GeneralShadowStyle {
  startOrigin: 'start' | 'end'
  opacity: number
}

export type BarLineLegendConfig = Overwrite<GeneralLegend, LineBarLegend>

export interface GlobalConfig {
  margin?: { t: number; r: number; b: number; l: number }
  bgColor: string
  lineStyle?: BrokenLine
  barStyle?: BarStyle
  areaStyle?: DefaultAreaStyle
  titleConfig?: GeneralTitle
  legendConfig?: BarLineLegendConfig
  toolbarConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface LineBarAxisConfig extends GeneralAxis {
  secondYAxis?: GeneralYAxis
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
  chartType: 'bar' | 'line' | 'area'
  valueAxis: '0' | '1'
  lineStyle?: BrokenLine
  barStyle?: BarStyle
  areaStyle?: AreaStyle
  dataMarker?: DataMarker //数据标记
  valueLabel?: ValueLabel //数值标签
}

export interface SeriesConfig {
  dataSeries?: DataSeries[]
  markSeries?: GeneralMarkingSeries[]
  markPointSeries?: GeneralMarkPointSeries[]
  stackSeries?: GenStrackSeries[] //堆叠
}

export interface LineBarProps {
  w?: number
  h?: number
  chartType?: 'linebar' | 'areabar' | 'stackAreaBar'
  globalConfig?: GlobalConfig
  axisConfig?: LineBarAxisConfig
  seriesConfig?: SeriesConfig
  data?: GeneralDataMap[]
  tooltipConfig?: GeneralTooltipConfig
  onClick?: (param: GeneralDataMap) => void
}
