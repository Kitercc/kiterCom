export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number | string // 文字间距
}

export interface DataMap {
  text: string
}

export interface MultilineTextprops {
  w?: number
  h?: number
  data?: DataMap[]
  textStyle?: TextStyle
  defaultText?: string
  alignType?: any // left center right
  textIndent?: number
  lineHeight?: number
  roll?: boolean
  duration?: number
}
