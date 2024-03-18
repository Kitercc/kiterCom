import { ScrollConfig } from '../LczColumnTable/type'
import { ShadowConfig } from '../LczCustomGraphics/type'

export interface TextStyle {
  display?: boolean
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing?: number
  fontFamily?: string
}

export type DataMap = {
  id: number | string
  content: string
  parentid: number | string
  ofgroup?: string
  url?: string
}

export interface BorderConfig {
  display: boolean
  color: string
  width: number
}

export interface ChildPanel {
  space: number
  width: number
  borderConfig?: BorderConfig
  outShadow?: ShadowConfig
}

export type Margin = { top: number; bottom: number }

export interface BgConfig {
  display: boolean
  rootBg: any
  childBg: any
}

export interface GlobalTextStyle {
  fontFamily: string
  letterSpacing: number
  groupStyle: TextStyle
}

export interface NavigationConfig {
  currentVal: 'first' | 'id'
  defaultId?: { value: number | string }
  submenuShow: 'inline' | 'vertical'
  expandCurrent: boolean
  contentLeftOffset: number
  childPanel?: ChildPanel
  margin?: Margin
  bgConfig?: BgConfig
  borderConfig?: BorderConfig
  textStyle?: GlobalTextStyle
  horcroll?: ScrollConfig
}

export interface OrdStyle {
  arrow: {
    rightOffset: number
    type: 'linear' | 'filled'
    size: number
    color: string
  }
  ordTextStyle: TextStyle
}

export interface HoverStyle {
  display: boolean
  rowBg: string
  arrowColor: string
  hoverFontStyle?: TextStyle
}

export interface TagLine {
  display: boolean
  position: 'left' | 'right'
  color: string
  width: number
}
export interface FocusStyle {
  display: boolean
  rowBg: string
  arrowColor: string
  tagLine?: TagLine
  focusFontStyle?: TextStyle
}
export interface RowStyle {
  rowHeight: number
  rowSpacing: number
  indent: number
  iconTextSpace: number
  ordStyle?: OrdStyle
  hoverStyle?: HoverStyle
  focusStyle?: FocusStyle
}

export interface IconSeries {
  id: string | number
  type: 'system' | 'custom' | 'more'
  iconValue?: string
  moreIconValue?: IconValueType
  iconColor?: string
  iconHoverColor?: string
  iconFocusColor?: string
  imgUrl?: string
  hoverImgUrl?: string
  focusImgUrl?: string
}

export interface IconConfig {
  display: boolean
  occupy: boolean
  width: number
  height: number
  iconSeries: IconSeries[]
}
export interface NavigationMenuProps {
  globalConfig?: NavigationConfig
  rowStyle?: RowStyle
  iconConfig?: IconConfig
  data?: DataMap[]
  onClick?: (param: DataMap) => void
  onChange?: (param: DataMap) => void
}
