import { NumberFormat } from '../LczCarouselTable/type'
import { SectionStyle } from '../LczNumberFlop/type'
import { PagerConfig } from '../LczScrollPage/type'

export interface FontStyle {
  showWidth?: any
  textAlign?: 'left' | 'right' | 'center'
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number // 文字间距
}

export type DataMap = { status: string; name: string; id?: string; value?: number | string; __index?: number }

interface Animate {
  updataNum: number
  switchSpeed: number
  timeInterval: number
  movePause: boolean
}
export interface GlobalConfig {
  alignmentType: 'lt' | 'rt' | 'rb' | 'lb'
  ArrangementMode: 'horizontal' | 'portrait' // horizontal 横向 portrait 纵向
  horizontalNumber?: number //   横向个数
  portraitNumber?: number //纵向个数
  horiSpeed: number
  portSpeed: number
  overflow: 'initial' | 'scroll' | 'hidden' | 'animate'
  textNumberSpeed: number
  animateConfig?: {
    animate?: Animate
    pager?: PagerConfig
  }
}

export interface HoverFontStyle {
  display: boolean
  color: string
  fontWeight: any
}

export interface MarkStyle {
  position: string // left right
  speed: number
  width: number
  height: number
  radius: number
  rotate: number
  normalMaskStyle: StateCategory
}

export interface StateCategory {
  state?: string
  markType: string // system 系统  custom 自定义
  iconValue: IconValueType // system 系统
  iconColor: string // system 系统
  imgUrl: string // custom 自定义
}

interface NumberSuffix {
  display: boolean
  content: string
  yOffset: number
  fontStyle?: FontStyle
}

export interface NumberStyle {
  display: boolean
  showWidth: any
  textAlign: 'left' | 'right' | 'center'
  numberFormat?: NumberFormat
  fontStyle?: FontStyle
  sectionStyle?: SectionStyle[]
  suffix?: NumberSuffix
}

export interface NumberHoverStyle {
  display: boolean
  color: string
  fontWeight: any
  suffix?: {
    display: boolean
    color: string
    fontWeight: any
  }
}

type HandlerClick = (param: DataMap) => void

export type AnimateTimer = {
  carouselTimer?: NodeJS.Timer
  reductionTimer?: NodeJS.Timeout
  mouseStatus: boolean
}

export interface StateCardProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  fontStyle?: FontStyle
  hoverFontStyle?: HoverFontStyle
  numberStyle?: NumberStyle
  numberHoverStyle?: NumberHoverStyle
  markStyle?: MarkStyle
  stateCategory?: StateCategory[]
  onClick?: HandlerClick
  data?: DataMap[]
}
