import { ScrollConfig } from '../LczColumnTable/type'

export type DataMap = {
  id: number | string
  content: string
  parentid: number | string
  isleaf?: any
}

export interface TextStyle {
  fontSize?: number
  fontFamily?: string
  letterSpacing?: number
  color?: string
  fontWeight?: any
}

export interface extendsTextStyle extends TextStyle {
  display: boolean
}

export interface ConnectLine {
  display: boolean
  color: string
  width: number
}
export interface GlobalConfig {
  current: 'first' | 'id'
  defaultId: { value: string }
  isleafVal: string
  parentSelect: boolean
  accordionMode: boolean
  connectLine?: ConnectLine
  textStyle?: TextStyle
  horcroll?: ScrollConfig
}

export interface BorderConfig {
  display: boolean
  color: string
  width: number
  hoverColor: string
  focusColor: string
}

export interface SearchTextStyle {
  placeholder: string
  fontSize: number
  placeholderColor: string
  textColor: string
  mateColor: string
  fontWeight: any
}
export interface TextBox {
  bgColor: string
  btnColor: string
  borderConfig?: BorderConfig
  searchTextStyle?: SearchTextStyle
}
export interface SearchConfig {
  display: boolean
  height: number
  speed: number
  textBox?: TextBox
}

export interface ArrowConfig {
  speed: number
  size: number
  icon: 'filled' | 'linear'
  color: string
  hoverColor: string
  focusColor: string
}

export interface LineStyle {
  indent: number
  lineHeight: number
  lineSpeed: number
  hoverBgColor: any
  focusBgColor: any
}

export interface StyleConfig extends TextStyle {
  hoverStyle?: extendsTextStyle
  focusStyle?: extendsTextStyle
}

export interface Icons {
  display?: boolean
  nodeType?: 'system' | 'custom'
  iconValue?: IconValueType
  color?: string
  hoverColor?: string
  focusColor?: string
  imgUrl?: string
  hoverImgUrl?: string
  focusImgUrl?: string
}

export interface ParentNode {
  display: boolean
  parentNodeType: 'system' | 'custom'
  stowed?: Icons
  expand?: Icons
}
export interface IconConfig {
  display: boolean
  width: number
  height: number
  parentNode?: ParentNode
  childNode?: Icons
}
export interface TreeProps {
  globalConfig?: GlobalConfig
  searchConfig?: SearchConfig
  arrowConfig?: ArrowConfig
  lineStyle?: LineStyle
  styleConfig?: StyleConfig
  iconConfig?: IconConfig
  onClick?: (param: DataMap) => void
  onChange?: (param: DataMap) => void
  data?: DataMap[]
}
