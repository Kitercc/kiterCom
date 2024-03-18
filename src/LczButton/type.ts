export interface TextConfig {
  defaultValue?: string
  display: boolean
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number // 文字间距
}

export interface BgConfig {
  display: boolean
  type: string // color 颜色  image 图片
  color?: string // type color显示
  imageUrl?: string // type image显示
}

export interface IconConfig {
  display: boolean
  size?: number // 选择图标时的图标大小
  width?: number // 选择图片时的图片宽度
  height?: number // 选择图片时图片高度
  iconPosition: string // 图标位置  left right top bottom
  horiOffset?: number
  vertOffset?: number
  iconType: string // system 系统  custom 自定义
  iconValue?: IconValueType // icon 类名
  imageUrl?: string // 图片链接
  fillColor?: string
}

export interface CommonStyle {
  borderColor: string
  borderWidth: number
  bgConfig?: BgConfig // 普通时背景配置
  textConfig?: TextConfig // 文字配置
  iconConfig?: IconConfig // 图标配置
}

export interface HoverBgConfig {
  display: boolean
  color?: string
  imageUrl?: string
}

export interface HoverIconConfig {
  display: boolean
  width?: number
  height?: number
  size?: number
  horiOffset?: number
  vertOffset?: number
  fillColor?: string
  imageUrl?: string
}

export interface HoverStyle {
  display: boolean
  borderColor: string
  borderWidth: number
  hoverBgConfig?: HoverBgConfig // 悬浮背景配置
  hoverTextConfig?: TextConfig // 悬浮文本
  hoverIconConfig?: HoverIconConfig // 悬浮图标样式
}

export type ChangeHandler = (data: dataMap) => void

interface dataMap {
  value: any
}

export interface ButtonProps {
  align?: string
  horiOffset?: number
  vertOffset?: number
  radius?: number
  commonStyle?: CommonStyle // 普通样式
  hoverStyle?: HoverStyle
  data?: dataMap[]
  onClick?: ChangeHandler
}
