import {
  GeneralBorderStyle,
  GeneralDecorate,
  GeneralNumberFormat,
  GeneralShadowStyle,
  GeneralTextStyle
} from '../../common/type'
import { ValueLabel } from '../LczBasicStrip/type'

export interface MainTitle extends GeneralTextStyle {
  display: boolean
  mainContentType?: 'currentTime' | 'total' | 'custom'
  subContentType?: 'currentTime' | 'total' | 'custom'
  // total
  prefix: any
  unit: any
  numberFormat: GeneralNumberFormat
  //custom
  content: { value: string }

  shadow: GeneralShadowStyle
}

export interface TitleConfig {
  mainTitle: MainTitle
  subTitle: MainTitle
  speed: number
  xPosition: 'left' | 'right' | 'center' | 'auto'
  yPosition: 'top' | 'bottom' | 'center' | 'auto'
  xOffset: number
  yOffset: number
}

export interface BarBgConfig {
  display: boolean
  color: string
  opacity: number
  syncRadius?: boolean
  fillet?: { lt: number; rt: number; lb: number; rb: number }
}

export interface BarStyle {
  barType: 'square' | 'bullet' | 'custom'
  fillet: { lt: number; rt: number; lb: number; rb: number }
  barWidth: number
  barBgColor: BarBgConfig
}

export interface GlobalConfig {
  margin: { t: number; r: number; b: number; l: number }
  bgColor: string
  barCount: number
  barStyle: BarStyle
  titleConfig: TitleConfig
  valueLabel: ValueLabel
}

export interface SortTextStyle {
  display?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  rotate?: number
}

export interface XAxis {
  display: boolean
  textStyle: SortTextStyle
  axisTick?: GeneralBorderStyle
  distance?: number
}

export interface AxisConfig {
  xAxis: XAxis
  yAxis: XAxis
}

export interface TimeLine extends GeneralBorderStyle {
  progressBar: GeneralBorderStyle
}

export interface TimeLabel {
  position: 'auto' | 'top' | 'bottom'
  splitType: 'auto' | 'showAll' | 'none'
  splitNumber: number
  suffix: any
  textStyle: SortTextStyle
  highlight: SortTextStyle
  progress: SortTextStyle
}

export interface GraphStyle {
  display?: boolean
  color: any
  contour: GeneralBorderStyle
  shadow: GeneralShadowStyle
}

export interface NoramlTimeGraph {
  display?: boolean
  activeGraphSync?: boolean
  graphType?: 'system' | 'custom' | 'svg'
  activeGraphType?: 'system' | 'custom' | 'svg'
  // system
  systemStyle?: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
  // custom
  customUrl?: string
  // svg
  svgPath?: string
  size?: { width: number; height: number }
  graphStyle: GraphStyle
}

export interface TimeGraph extends NoramlTimeGraph {
  activeGraphStyle: NoramlTimeGraph
  highlightGraphStyle: NoramlTimeGraph
  progressGraphStyle: NoramlTimeGraph
}

export interface IconButtonConfig {
  display?: boolean
  nextIconType?: 'default' | 'custom'
  nextIcon?: any
  prevIconType?: 'default' | 'custom'
  prevIcon?: any
  playIconType?: 'default' | 'custom'
  playIcon?: any
  stopIconType?: 'default' | 'custom'
  stopIcon?: any
}

export interface PlayConfig {
  display: boolean
  playButton: IconButtonConfig
  stopButton: IconButtonConfig
  size: number
  gap: number
}

export interface Timecontrol {
  nextConfig: IconButtonConfig
  prevConfig: IconButtonConfig
  playConfig: PlayConfig
  textStyle: GraphStyle
  controlHlightStyle: GraphStyle
}

export interface TimeAuto {
  autoPlay: boolean
  loop: boolean
  playInterval: number
}

export interface TimerShaft {
  margin: { r: number; b: number; l: number }
  currentActive: { value: string }
  timeLine: TimeLine
  timeLabel: TimeLabel
  timeGraph: TimeGraph
  timecontrol: Timecontrol
  timeAuto: TimeAuto
  timeActive: boolean
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
  decorate: GeneralDecorate
}

export interface SeriesConfig {
  dataSeries?: DataSeries[]
}

export type SortlDataMap = {
  category: any
  categoryTitle?: any
  value: any
  time: any
  no: any
}
export interface SortBarProps {
  w?: number
  h?: number
  globalConfig: GlobalConfig
  axisConfig: AxisConfig
  timerShaft: TimerShaft
  seriesConfig: SeriesConfig
  data?: SortlDataMap[]
  onClick?: (param: SortlDataMap) => void
}
