export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing?: number | string // 文字间距
}

export interface PlaceholderConfig {
  display: boolean
  text: string
  placeTextStyle: TextStyle
}

export interface Padding {
  top: number
  right: number
  bottom: number
  left: number
}

export interface BgConfig {
  display: boolean
  color: any
}

export interface BorderConfig {
  display: boolean
  color: string
  width: number
  focusColor: string
}

export interface SearchIcon {
  display: boolean
  position: string
  speed: number
  color: string
  size: number
}

export interface Shadow {
  display: boolean
  color: string
  xOffset: number
  yOffset: number
  vague: number
  extend: number
}

type DataMap = { value: string }

export interface SearchProps {
  radius?: number
  placeholderConfig?: PlaceholderConfig
  textStyle?: TextStyle
  padding?: Padding
  bgConfig?: BgConfig
  borderConfig?: BorderConfig
  searchIcon?: SearchIcon
  outShadow?: Shadow
  inShadow?: Shadow
  data?: DataMap[]
  onChange?: (param: DataMap) => void
}
