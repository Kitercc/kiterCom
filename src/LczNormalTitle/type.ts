import { Border } from '../LczCalendar/type'

export interface ColorConfig {
  colorString: any
}
export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: ColorConfig
  fontWeight: any
  letterSpacing?: number | string // 文字间距
  italics?: boolean
}

interface SweepThrough {
  display?: boolean
  sweepStatus?: boolean
  bgColor?: ColorConfig
  isAnimat?: boolean
}

export interface Shadow {
  display: boolean
  color: string
  xOffSet: number
  yOffSet: number
  vague: number
  extend: number
}

export interface BgConfig {
  display: boolean
  range: 'full' | 'self-adaption'
  padding?: { x: number; y: number }
  bgStyle?: {
    display: boolean
    color: any
    imgUrl: string
  }
  border?: Border
  radius: number
}

type dataMap = {
  value: string
}

export interface NormalTitleProps {
  w?: number // 容器宽度
  h?: number // 容器高度
  textStyle?: TextStyle // 文字样式
  ellipsis?: boolean // 溢出是否显示省略号
  horizon?: string // 水平对齐方式
  writingMode?: 'horizontal-tb' | 'vertical-rl' // 文字排列方式
  vertical?: string // 文字垂直排列方式
  defaultValue?: string // 默认内容
  value?: string
  sweepThrough?: SweepThrough
  outShadow?: Shadow
  bgConfig?: BgConfig
  data?: dataMap[] // 标题的内容，配置后会覆盖标题名配置项的内容。
  onClick?: any // 标题点击事件
  onDataChange?: any // 内容发生改变时触发
}
