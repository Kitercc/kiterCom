import { ScrollConfig } from '../LczColumnTable/type'

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

export type DataMap = { value?: any; id?: any; content?: any }

export interface SearchConfig {
  unfoldWay: 'allUnfold' | 'clickUnfold'
  packWidth: number
  unfoldDirection: 'left' | 'right'
  searchPack: boolean
}

export interface LineOptions {
  lineHeight: number
  lineSpace: number
  margin: number
  textStyle: { fontFamily: string; fontWeight: any; letterSpacing?: number | string }
  normalStyle: {
    lineBgColor: string
    color: string
    fontSize: number
  }
  hoverStyle: {
    display: boolean
    lineBgColor: string
    color: string
    fontSize: number
  }
}
export interface OptionsPanel {
  display: boolean
  topOffset: number
  displayMode: 'nullAll' | 'nullNone'
  height: number
  borderRadius: number
  bgConfig: {
    display: boolean
    bgColor: string
    img: string
  }
  borderConfig: {
    display: boolean
    color: string
    width: number
  }
  backGauge: {
    display: boolean
    top: number
    bottom: number
  }
  lineOptions: LineOptions
  outShadow?: Shadow
  inShadow?: Shadow
  horcroll?: ScrollConfig
}
export interface TextSearchProps {
  h?: number
  enterSearch?: boolean
  radius?: number
  searchConfig?: SearchConfig
  placeholderConfig?: PlaceholderConfig
  textStyle?: TextStyle
  padding?: Padding
  bgConfig?: BgConfig
  borderConfig?: BorderConfig
  searchIcon?: SearchIcon
  emptyIcon?: {
    display: boolean
    size: number
    color: string
  }
  optionsPanel?: OptionsPanel
  outShadow?: Shadow
  inShadow?: Shadow
  data?: DataMap[]
  onChange?: (param: DataMap) => void
  onClick?: (param: DataMap) => void
}
