import {
  GeneralBorderStyle,
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralShadowStyle,
  GeneralTooltipConfig,
  GeneralXAxis,
  GeneralYAxis,
  GeneralYaxisLabel
} from '../../common/type'
import { GlobalConfig } from '../../LczChartBar/LczBasicBar/type'

type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

export type DataMap = {
  x: number
  y: number
  series?: string
  seriesTitle?: string
  value?: number
}

export interface ScatterGlobalConfig extends GlobalConfig {
  dataZoom?: {
    display: boolean
    x: boolean
    y: boolean
  }
}

export interface ScattrsStyle {
  symbolSize: number
  color: any
  border?: GeneralBorderStyle
  shadow?: GeneralShadowStyle
}

export interface ContinuityConfig {
  maxSize: number
  minSize: number
  maxValue: number
  minValue: number
  color?: { value: string }[]
  colorLightnessMin: number
  colorLightnessMax: number
  colorSaturationMin: number
  colorSaturationMax: number
}
export interface SubsectionConfig {
  maxValue: number
  minValue: number
  symbolSize: number
  syncColor: boolean
  color: any
  colorLightness: number
  colorSaturation: number
}
export interface BubbleConfig {
  styleMode: 'none' | 'continuity' | 'subsection'
  // continuity 连续映射
  continuityConfig?: ContinuityConfig
  // subsection 分段映射
  subsectionConfig?: SubsectionConfig[]
}

export interface BubbleStyle {
  style?: {
    maxSize: number
    minSize: number
    color: any
  }
  border?: GeneralBorderStyle
  shadow?: GeneralShadowStyle
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  scattrsStyle?: ScattrsStyle
  // 气泡图特有
  bubbleStyle?: BubbleStyle
}

interface XAxis {
  axisLabel?: GeneralYaxisLabel
}

export type ScatterXAxis = Overwrite<GeneralXAxis, XAxis>

export interface AxisConfig {
  xAxis: ScatterXAxis
  yAxis: GeneralYAxis
}
export interface SeriesConfig {
  // 气泡图特有
  bubbleConfig?: BubbleConfig
  // -----------
  dataSeries?: DataSeries[]
  highlight?: {
    scale: boolean
    focus: 'none' | 'self' | 'series'
  }
  markSeries?: GeneralMarkingSeries[]
  markPointSeries?: GeneralMarkPointSeries[]
}

export interface ScatterProps {
  chartType?: 'bubble'
  w?: number
  h?: number
  data?: DataMap[]
  globalConfig?: ScatterGlobalConfig
  axisConfig?: AxisConfig
  seriesConfig?: SeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  onClick?: (param: DataMap) => void
}
