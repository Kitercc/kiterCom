import { PagerConfig } from '../LczScrollPage/type'
import { TimerForMat } from '../LczTimer/type'

export interface FontStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number | string // 文字间距
  italics?: boolean
  textAlign?: any
}

export type TIMER = {
  timer: any
  timerTwo: any
  timerThree: any
  loadTimer: any
}

export interface Carousel {
  display: boolean
  speed?: number
  timeSpeed?: number
  carouselFactor?: 'all' | 'greaterThanDataLen'
}
export interface GlobalConfig {
  showType: 'fixedHeight' | 'highlyAdaptive' // 固定高度  高度自适应
  numbers?: number
  rowHeight?: number
  entryInterval: number
  speed: number
  singleBg?: {
    display: boolean
    color: any
    image: string
  }
  border?: {
    display: boolean
    width: number
    color: string
  }
  carousel?: Carousel
}

export interface Margin {
  top: number
  left: number
  right: number
  bottom: number
}

export interface TitleConfig {
  titleShowrownum: number
  titleBgColor: string
  titleMargin: Margin
  titleStyle: FontStyle
}

export interface SplitLine {
  display: boolean
  style: string
  color: string
  width: number
}

export interface Abstract {
  absShowrownum: number
  absBgColor: string
  absMargin: Margin
  absStyle: FontStyle
}

export interface DateConfig {
  display: boolean
  format?: TimerForMat
  bgColor: string
  margin?: {
    t: number
    r: number
    b: number
    l: number
  }
  dateStyle?: FontStyle
}

export interface TextConfig {
  titleConfig?: TitleConfig
  splitLine?: SplitLine
  abstract?: Abstract
  dateConfig?: DateConfig
}

export interface Drawing {
  display: boolean
  position: string
  topMargin: number
  leftMargin: number
  rightMargin: number
  width: number
  height: any
  radius: number
  borderColor: string
  borderWidth: number
  bgColor: string
}

export interface MaskConfig {
  display: boolean
  maskHeight: number
  color: any
}

export type DataMap = {
  title: string
  digest?: string
  picture?: string
  id?: string
  code?: string
  date?: string
  digestArr?: string[]
  __index?: number
}

export interface Pager extends PagerConfig {
  position: 'right' | 'bottom'
}

type HandlerClick = (param: DataMap) => void

export interface NewsListProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  textConfig?: TextConfig
  drawing?: Drawing
  maskConfig?: MaskConfig
  pager?: Pager
  data?: DataMap[]
  onClick?: HandlerClick
}
