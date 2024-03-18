import { Border } from '../LczCalendar/type'
import { Horcroll, NumberFormat, Suffix, TextStyle } from '../LczCarouselTable/type'
import { FontConfig, FormatConfig } from '../LczIndicatorsTrends/type'

export interface ScrollConfig extends Horcroll {
  displayType: 'all' | 'hover'
}

export interface GlobalConfig {
  arrangementMode: 'horizontal' | 'portrait'
  // portrait
  rowNumber: number
  // horizontal
  columnNumber: number
  lineHeight: number
  scrollConfig?: ScrollConfig
  columnLine?: Border
  border?: Border
  updated: boolean
}

export interface AnimateConfig {
  display: boolean
  switchSpeed: number
  timeInterval: number
  speed: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' // 匀速 慢快慢 低速开始 低速结束 低速开始和结束
  updataNum: number
}

export interface HeaderConfig {
  display: boolean // 是否显示
  height: number // 行高
  bgColor: string
  align: 'center' | 'left' | 'right'
  headerStyle?: TextStyle
}

export interface LineConfig {
  lineSpeed: number
  border?: Border
  lineStyle?: {
    bgColor: string
    opacity: number
  }[]
}

export interface TextConfig {
  fontStyle?: TextStyle
}

export interface NumberConfig {
  numberFormat?: NumberFormat
  textStyle?: TextStyle
  styleIntervalFlag: boolean
  styleInterval?: { min: number; max: number; color: string; fontWeight: any; fontSize: number }[]
}

export interface TargetConfig {
  baseValue: string
  showValue: boolean
  iconValueSpace: number
  textStyle?: TextStyle
  fontConfig?: FontConfig // 图标
  numberFormat?: FormatConfig
}

export interface ColumnArr {
  field: string
  colName: string
  colWidth: number
  alignType: 'left' | 'center' | 'right'
  xOffset: number
  border?: Border
  valueType: 'text' | 'number' | 'target'
  overflow?: 'ellipsis' | 'lineFeed'

  textConfig?: TextConfig
  numberConfig?: NumberConfig
  targetConfig?: TargetConfig

  suffix?: Suffix // 后缀
}

export interface ColumnTableProps {
  w?: number
  h?: number
  id: string
  globalConfig?: GlobalConfig
  animateConfig?: AnimateConfig
  header?: HeaderConfig
  lineconfig?: LineConfig // 行配置
  customCol?: ColumnArr[] // 自定义列
  data?: any[]
  onClick?: (param: any) => void
}
