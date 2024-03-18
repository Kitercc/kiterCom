export interface TextStyle {
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}

export interface TabsOptions {
  id: number
  content: string
}

export interface GlobalTextStyle {
  fontFamily: string
  letterSpacing?: number | string
}

export interface GlobalConfig {
  tabType?: string //tab 类型 滚动 roll 普通 ord
  rollWidthOrHeight?: number // 当tab类型时滚动时 固定每个宽度或高度
  arrangement?: string // 'horizontal' 水平  'vertical' 垂直
  tabPosition?: string // 'leftT' | 'rightT' | 'leftB' | 'rightB'
  spacing?: number
  tabBgColor?: string
  alignType?: string // 'left' | 'center' | 'right'
  textStyle?: GlobalTextStyle
}

export interface OrdTextConfig {
  fontFamily?: string
  fontSize?: number
  color?: string
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

export interface OrdStyleConfig {
  ordTextConfig?: TextStyle // 普通 文字样式配置
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  ordTextHover?: TextStyle // 悬浮文本
  HoverbackgroundColor?: string
  HoverborderColor?: string
  HoverborderWidth?: number
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

export interface FocusStyleConfog {
  focusTextConfig?: TextStyle // 选中文字样式配置
  focusBgColor?: string
  focusBorderColor?: string
  focusBorderWidth?: number
  focusBorderRadius?: number
  focusTextHover?: TextStyle
  focusHoverBgColor?: string
  focusHoverBorderColor?: string
  focusHoverBorderWidth?: number
  glideLine?: GlideLine
}

export interface TabCarousel {
  isOpen?: boolean
  interval?: number
}

export interface TabsConfig {
  globalConfig?: GlobalConfig //  全局样式
  ordStyleConfig?: OrdStyleConfig // 普通样式配置
  focusStyleConfig?: FocusStyleConfog // tab 选中样式配置
}

export interface TabsProps {
  tabCarousel?: TabCarousel //轮播配置
  defaultValue?: number
  defaultData?: TabsOptions[] // 数据配置对象
  tabsConfig?: TabsConfig
  ordcontentBoxConfig?: ContentBoxConfig //  内容框配置
  data?: any
  onChange?: any
  onClick?: any
  onDataChange?: any
}
