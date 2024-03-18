export interface dataMap {
  value: number
  max: number
}
export interface TextStyle {
  display?: boolean
  fontFamily?: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing?: number | string // 文字间距
}
export interface ShadowConfig {
  display: boolean
  shadowColor: string
  extend: number
  vague: number
}

export interface InMargin {
  vermargin: number
  leftMargin: number
  rightMargin: number
}
export interface OutBorder {
  display?: boolean
  outBorderDisplay?: boolean
  bgColor: string
  borderWidth: number
  borderColor: string
  radius: number
  inMargin: InMargin
}

export interface ProgressStyleSection {
  min: number
  max: number
  startColor?: string
  endColor?: string
  multiColor?: any // 进度条多色

  noneColor?: string
}
export interface GridConfig {
  height: number
  width: number
  space: number
  radius: number
  bgColor: string
  gradientRange: 'global' | 'local' | 'none' //渐变范围 global 全局 local 局部 none 无

  colorType?: 'bicolor' | 'multicolor' // 颜色类型
  startColor?: string
  endColor?: string
  multiColor?: any // 进度条多色

  noneColor?: string
  // add
  progressSection: boolean
  progressStyleSection?: ProgressStyleSection[]
}
export interface ProgressConfig {
  barRadius: number
  outShadow: ShadowConfig //外阴影
  inShadow: ShadowConfig // 内阴影
  gridConfig: GridConfig // 栅格
  outBorder: OutBorder
}

export interface MessageBg {
  display: boolean
  type: string // 背景类型 color image
  bgColor?: string
  imageUrl?: string
  borderColor: string
  borderWidth: number
  radius?: number
}

export interface TextConfig {
  horiOffset: number // 水平偏移
  vertOffset: number // 垂直偏移
  textStyle: TextStyle
  trueValue: boolean // 真实值
  unit: string // 单位
  negativeing: string // 负数显示值  minus 负号  brackets 括号  abs 绝对值
  decimal: number // 小数位数
  round: boolean // 四舍五入
}

// 提示框样式区间
export interface MessageStyleSection {
  min: number
  max: number
  messageBg: MessageBg
  textConfig: TextStyle
}

export interface MessageConfig {
  display: boolean
  width: number
  height: number
  position: string // 位置 out 框外 in 框内
  inArrangement?: string // 排列方式 self 自适应  left right  框内时 right为尾部
  outArrangement?: string // 排列方式 self 自适应  框内时 right为尾部
  horiOffset: number // 水平偏移
  vertOffset: number // 垂直偏移
  messageBg: MessageBg // 提示背景
  textConfig: TextConfig // 文本配置
  // add
  messageSection: boolean
  messageStyleSection: MessageStyleSection[]
}

export interface AnimateConfig {
  display: boolean
  type: string // linear线性  physics物理
  timer: number
  proportion: number
}

export type DataHandler = (data: dataMap) => void

export interface ProgressBarProps {
  data?: dataMap[]
  w?: number
  progressConfig?: ProgressConfig
  message?: MessageConfig
  animateConfig?: AnimateConfig
  onDataChange?: DataHandler
}
