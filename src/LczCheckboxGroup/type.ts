export interface TextStyle {
  display?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}

export type DataMap = {
  content: any
  id: any
}

export interface CheckConfig {
  display: boolean
  position: 'before' | 'after'
  size: number
  spacing: number
  fillet: number
}
export interface GlobalConfig {
  mode: 'row' | 'column'
  rownum: number
  rowAdapt: boolean
  bisectorWidth: boolean
  colnum: number
  horizontalSpacing: number
  verticalSpacing: number
  show: 'hidden' | 'auto' | 'initial'
  checkConfig?: CheckConfig
  textStyle?: TextStyle
}

export interface CheckStyle {
  display?: boolean
  color: string
  width?: number
  bgColor?: string
  tickColor?: string
}

export interface HoverStyle {
  display: boolean
  checkStyle?: CheckStyle
  hoverTextStyle: TextStyle
}
export interface NormalStyle {
  checkStyle?: CheckStyle
  textStyle?: TextStyle
  hoverStyle?: HoverStyle
}

export interface CheckboxProps {
  type: 'index' | 'id' // index  id
  index: { value: string | null }
  defaultId: { value: string | null }
  globalConfig?: GlobalConfig
  normalStyle?: NormalStyle
  focusStyle?: NormalStyle
  data?: DataMap[]
  onClick?: (param: DataMap) => void
  onChange?: (param: DataMap[]) => void
}
