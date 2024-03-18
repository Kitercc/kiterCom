import { ShadowConfig } from '../LczCustomGraphics/type'

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: any
  fontWeight: any
  letterSpacing?: number | string // 文字间距
}

export type DataMap = {
  name: string
  value?: number
  icon?: string
  id: string | number
  link?: string
}

export interface GlobalConfig {
  type: 'index' | 'id' // index  id
  index?: { value: number }
  defaultId?: { value: string | number }
  allAlongpositive?: boolean
}

export interface Carousel {
  display: boolean
  stopCondition: boolean | string
  speed: number
  position: 1 | -1 // 1顺时针 -1 逆时针
  movePause: boolean
}
export interface AnimateConfig {
  switchSpeed: number
  carousel?: Carousel
}

export interface TrackConfig {
  radius: number
  rearNot: boolean
  proportion: number
}

export interface CameraPosition {
  x: number
  y: number
  z: number
}

export interface NumberFormat {
  splitDigit: number
  decimal: number
  rounding: boolean
  negativeing: 'minus' | 'brackets' | 'abs' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
}

export interface SuffixConfig extends TextStyle {
  display: boolean
  suffixVal?: string
  yOffset: number
  interval: number
}

export interface NumberConfig {
  display: boolean
  xOffset: number
  yOffset: number
  textStyle?: TextStyle
  numbFormat?: NumberFormat
  suffixConfig?: SuffixConfig
}

export interface NameConfig {
  display: boolean
  nameSyncStyle?: boolean
  xOffset?: number
  yOffset?: number
  textStyle?: TextStyle

  // 1.0.3
  color?: any
  fontWeight?: any
}

export interface IconSeries {
  nameValue: string
  type: 'system' | 'custom'
  iconVlaue?: IconValueType
  iconColor?: any
  imgUrl?: string
}

export interface IconConfig {
  display: boolean
  xOffset: number
  yOffset: number
  width: number
  height: number
  iconSeries: IconSeries[]
}

export interface NormalCard {
  width: number
  height: number
  radius: number
  opacity: number
  bgConfig?: {
    display: boolean
    color: any
    imgUrl: string
  }
  border?: {
    display: boolean
    color: string
    width: number
  }
  outShadow?: ShadowConfig
  inShadow?: ShadowConfig
  numberConfig?: NumberConfig
  nameConfig?: NameConfig
  iconConfig?: IconConfig
}

export interface HoverStyle {
  display: boolean
  opacity: number
  zoom: number
  yOffset: number
  bgConfig: {
    display: boolean
    color: any
    imgUrl: string
  }
  border: {
    display: boolean
    color: string
    width: number
  }
}

export interface currentNumberConfig {
  display: boolean
  currentSyncStyle?: boolean
  xOffset?: number
  yOffset?: number
  textStyle?: TextStyle
  suffixConfig?: SuffixConfig

  // 1.0.3
  color?: any
  suffix?: any
  fontWeight?: any
}

export interface CurrentStyle {
  display: boolean
  opacity: number
  zoom: number
  yOffset: number
  bgConfig: {
    display: boolean
    color: any
    imgUrl: string
  }
  border: {
    display: boolean
    color: string
    width: number
  }
  number?: currentNumberConfig
  name?: NameConfig
}

export interface ArrowConfig {
  display: boolean
  spacing: number
  yOffset: number
  showType: 'hover' | 'all'
  arrowIconType: 'system' | 'custom'
  iconValue?: IconValueType
  iconSize?: number
  iconColor?: any
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number
}

type HandleChange = (data: DataMap) => void

export interface CircularTargetProps {
  w?: number
  h?: number
  version?: string
  global?: GlobalConfig
  animate?: AnimateConfig
  trackConfig?: TrackConfig
  cameraPosition?: CameraPosition
  normalCard?: NormalCard
  hoverStyle?: HoverStyle
  currentStyle?: CurrentStyle
  arrowConfig?: ArrowConfig
  data?: DataMap[]
  onClick?: HandleChange
  onChange?: HandleChange
  onMouseenter?: HandleChange
  onMouseleave?: HandleChange
}

export interface CardItemProps {
  animate?: AnimateConfig
  currentIndex: number
  index: number
  item: DataMap
  normalCard?: NormalCard
  hoverStyle?: HoverStyle
  currentStyle?: CurrentStyle
  onClick?: (data: DataMap, i: number) => void
}
