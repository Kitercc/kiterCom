import { ShadowConfig } from '../LczCustomGraphics/type'

export interface TextStyle {
  fontFamily?: string
  fontSize?: number
  newcolor?: string | any
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}

export interface BorderStyle {
  display?: boolean
  borderd?: boolean
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
}

export interface TabsOptions {
  id: number | string
  content: any
  remark: string
}

export interface DiscountLineConfig {
  display?: boolean
  status?: boolean
  selfType?: string
  noSelfType?: string
  strNum?: number
}

export interface GlobalTextStyle {
  fontFamily: string
  letterSpacing?: number | string
  noSelfDiscountLine?: DiscountLineConfig
  selfDiscountLine?: DiscountLineConfig
  alignType?: string // 'left' | 'center' | 'right'
  verticalType?: string // 'left' | 'center' | 'right'
}

export interface TabSize {
  rollWidthOrHeight?: number // 当tab类型时滚动时 固定每个宽度或高度
  multiH?: number
  selfAdaption?: boolean
  contentSpacing?: number
}

export interface IconStyleSeries {
  id: number | string
  iconType: 'system' | 'custom' //system 系统  custom 自定义
  // system
  iconValue?: IconValueType
  systemNormal?: { color: any }
  systemHover?: { display: boolean; color: any }
  systemFocus?: { display: boolean; color: any }
  systemFocusHover?: { display: boolean; color: any }
  //custom
  customNormal?: { imgUrl: any }
  customHover?: { display: boolean; imgUrl: any }
  customFocus?: { display: boolean; imgUrl: any }
  customFocusHover?: { display: boolean; imgUrl: any }
}

export interface NormalIcon {
  display: boolean
  iconType: 'system' | 'custom' //system 系统  custom 自定义
  // system
  iconValue?: IconValueType
  systemNormal?: { color: any }
  systemHover?: { display: boolean; color: any }
  systemFocus?: { display: boolean; color: any }
  systemFocusHover?: { display: boolean; color: any }
  //custom
  customNormal?: { imgUrl: any }
  customHover?: { display: boolean; imgUrl: any }
  customFocus?: { display: boolean; imgUrl: any }
  customFocusHover?: { display: boolean; imgUrl: any }
}
export interface IconConfig {
  display: boolean
  iconPosition: 'right' | 'left' | 'top' | 'bottom'
  valSpeed: number
  width: number
  height: number
  normalIcon?: NormalIcon
  iconStyleSeries?: IconStyleSeries[]
}

export interface ArrowDisabledStyle {
  display: boolean
  opacity: number
  styleSync: boolean
  arrowDisabledColor: any
  arrowDisabledImg: any
}

export interface IconArrowConfig {
  display: boolean
  scrollWay?: 'toDistance' | 'toNumber'
  //toDistance
  scrollDistance?: number
  //toNumber
  scrollNumber?: number

  spacing?: number
  offset?: number
  resources?: string // system 系统 custom 自定义
  // system
  type?: string
  size?: number
  colorObj?: any
  // custom
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number

  arrowHoverStyle?: {
    display: boolean
    arrowHoverColor: any
    arrowHoverImg: any
  }
  arrowDisabledStyle?: ArrowDisabledStyle
}

export interface GlobalConfig {
  tabType?: string //tab 类型 滚动 roll 普通 ord 多行 multi
  ordArrangement?: string // 'horizontal' 水平  'vertical' 垂直  普通
  rollArrangement?: string // 'horizontal' 水平  'vertical' 垂直 滚动
  tabPosition?: string // 'leftT' | 'rightT' | 'leftB' | 'rightB'
  spacing?: number
  rowSpacing?: number
  tabBgColor?: string
  tabSize?: TabSize
  textStyle?: GlobalTextStyle
  iconConfig?: IconConfig
  iconArrowConfig?: IconArrowConfig
}

export interface OrdTextConfig {
  fontFamily?: string
  fontSize?: number
  newcolor?: string | any
  fontWeight?: any
}

export interface ContentBoxConfig {
  width?: number
  height?: number
  topOffset?: number
  boxBackground?: string
  boxBorderColor?: string
  boxBderWidth?: number
  boxBorderRadius?: number
}
export interface HoverTextStyle {
  display?: boolean
  hoverStatus?: boolean
  fontFamily?: string
  fontSize?: number
  newcolor?: string | any
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}
export interface OrdHoverStyle {
  display?: boolean
  ordHoverStatus?: boolean
  ordTextHover?: HoverTextStyle // 悬浮文本
  Hoverbackground?:
    | string
    | {
        display: boolean
        ordHovertype: 'color' | 'image'
        color?: any
        imgUrl?: string
      }
  HoverborderColor?: string
  HoverborderWidth?: number
}

export interface OrdStyleConfig {
  ordTextConfig?: TextStyle // 普通 文字样式配置
  bgConfig?:
    | string
    | {
        display: boolean
        ordtype: 'color' | 'image'
        color?: any
        imgUrl?: string
      }
  ordBorderStyle: BorderStyle
  outShadow?: ShadowConfig
  inShadow?: ShadowConfig
  ordHoverStyle: OrdHoverStyle
}

export interface FocusTextConfig {
  focusBgColor?: string
  focusBorderColor?: string
  focusBorderWidth?: number
  focusBorderRadius?: number
}

export interface GlideLine {
  display?: boolean
  bgColor?: string
  width?: number
}

export interface FocusBorderStyle {
  display?: boolean
  borderd?: boolean
  focusBorderColor?: string
  focusBorderWidth?: number
  focusBorderRadius?: number
}

export interface FocusHoverStyle {
  display?: boolean
  focusStatus?: boolean
  focusTextHover?: HoverTextStyle
  focusHoverBg?:
    | string
    | {
        display: boolean
        focusHovertype: 'color' | 'image'
        color?: any
        imgUrl?: string
      }
  focusHoverBorderColor?: string
  focusHoverBorderWidth?: number
}

export interface FocusStyleConfog {
  focusTextConfig?: TextStyle // 选中文字样式配置
  focusBorderStyle?: FocusBorderStyle
  focusBg?:
    | string
    | {
        display: boolean
        focustype: 'color' | 'image'
        color?: any
        imgUrl?: string
      }
  outShadow?: ShadowConfig
  inShadow?: ShadowConfig
  focusHoverStyle?: FocusHoverStyle
  glideLine?: GlideLine
}

export interface TabCarousel {
  display?: boolean
  stopCondition: boolean | string
  interval?: number
  clickInterval?: number
}

export interface TabsConfig {
  globalConfig?: GlobalConfig //  全局样式
  ordStyleConfig?: OrdStyleConfig // 普通样式配置
  focusStyleConfig?: FocusStyleConfog // tab 选中样式配置
}

export type Color = {
  type: 'single' | 'gradient'
  color: string
}

export interface RemarkConfig {
  display?: boolean
  xPosition?: 'top' | 'bottom' //'top' 'bottom'
  yPosition?: 'left' | 'right' //'left' 'right'
  xoffset?: number
  yoffset?: number
  maxHeight?: any
  maxWidth?: any
  bgColor?: string
  radius?: number
  textStyle?: TextStyle
}
export interface TabsProps {
  tabCarousel?: TabCarousel //轮播配置
  type?: 'index' | 'id' // index  id
  index?: { value: number | null }
  defaultId?: { value: string | number | null }
  tabsConfig?: TabsConfig
  ordcontentBoxConfig?: ContentBoxConfig //  内容框配置
  remarkConfig?: RemarkConfig
  data?: TabsOptions[]
  onChange?: any
  onClick?: any
}
