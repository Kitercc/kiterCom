export interface dataConfig {
  value: number
  base?: number
  text?: string
}

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number | string // 文字间距
}

export interface TitleConfig {
  display: boolean
  titleContent: string
  textStyle: TextStyle
  lineFeed: boolean
}

export interface FormatConfig {
  display: boolean
  thousandth: boolean // 千分位
  numDo: number // 保留小数 小数点位数
  rounding: boolean // 四舍五入
  percentage: boolean
  negativeing: 'minus' | 'brackets' | 'abs' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
  zeroFill?: boolean
}

export interface SuffixConfig {
  display: boolean
  leftOffset: number
  topOffset: number
  suffix: string
  textStyle?: TextStyle
}

export interface NumberConfig {
  display: boolean
  baseValue: number
  textStyle: TextStyle
  formatConfig?: FormatConfig
  suffixConfig?: SuffixConfig

  suffix?: string
  negativeing?: 'minus' | 'brackets' | 'abs'
  thousandth?: boolean
}

export interface FontConfig {
  style: string
  size: number
  riseColor: string
  declineColor: string
  flatColor: string
  syncValueColor: boolean
}

export type ChangeHandler = (data: dataConfig) => void
export type DataHandler = (data: dataConfig) => void

export interface IndicatorsTrendsProps {
  horiAlign?: string
  vertAlign?: string
  titlePosition?: string
  titleIconSpac?: number
  iconValSpac?: number
  titleConfig?: TitleConfig
  fontConfig?: FontConfig
  numberConfig?: NumberConfig
  data?: any[]
  onClick?: ChangeHandler
  onDataChange?: DataHandler
}
