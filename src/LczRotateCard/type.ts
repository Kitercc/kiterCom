import { LineContent } from '../LczChina2dMap/type/child'
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
  suffixVal: string
  yOffset: number
  interval: number
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
}

export interface ArrowConfig {
  display: boolean
  spacing: number
  yOffset: number
  showType: 'hover' | 'all'
  arrowIconType: 'system' | 'custom'
  iconValue?: string
  iconSize?: number
  iconColor?: any
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number
}

type HandleChange = (data: DataMap, i: number) => void

export interface CardCurrentStyle {
  display: boolean
  title: {
    display: boolean
    color: any
    fontWeight: any
  }
  value: {
    display: boolean
    color: any
    fontWeight: any
    suffix: {
      display: boolean
      color: any
      fontWeight: any
    }
  }
}

export interface CardLineContent extends LineContent {
  cardCurrentStyle?: CardCurrentStyle
}

export interface ImgSeries {
  condition: string
  imgType: 'icon' | 'custom'
  cardImg: string
  cardIcon: IconValueType
  iconColor: any
  position?: { x: number; y: number }
  radius: number
  width: number
  height: number
  rotate: number

  imgCurrent: {
    display: boolean
    currentImgType: 'icon' | 'custom'
    cardImg: string
    cardIcon: IconValueType
    iconColor: any
  }
}

export interface RotateCardProps {
  w?: number
  h?: number
  id?: string
  global?: GlobalConfig
  animate?: AnimateConfig
  trackConfig?: TrackConfig
  cameraPosition?: CameraPosition
  normalCard?: NormalCard
  hoverStyle?: HoverStyle
  currentStyle?: CurrentStyle
  arrowConfig?: ArrowConfig
  cardLineContent?: CardLineContent[]
  imgSeries?: ImgSeries[]
  data?: any[]
  onClick?: HandleChange
  onChange?: HandleChange
  onMouseenter?: (data: any) => void
  onMouseleave?: (data: any) => void
}
