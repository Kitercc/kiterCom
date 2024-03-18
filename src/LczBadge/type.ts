import { NumberFormat, TextStyle } from '../LczCircularTarget/type'

export type DataMap = {
  value: number | string
}

export interface GlobalConfig {
  lessThanZeroHidden: boolean
  thumbnail?: {
    display: boolean
    threshold: number
  }
}

export interface BadgeNumformat extends NumberFormat {
  display: boolean
}

export interface BadgeTextStyle extends TextStyle {
  display: boolean
}

export interface BgConfig {
  display: boolean
  xOffset: number
  yOffset: number
  color: string
  radius: number
}

export interface BadgeSectionStyle {
  min: number
  max: number
  bgConfig: BgConfig
  text: {
    display: boolean
    showVal: boolean
    fontSize: number
    color: string
    fontWeight: any
  }
}

export interface SuperNumber {
  format?: BadgeNumformat
  bgConfig?: BgConfig
  textStyle?: BadgeTextStyle
  sectionStyleFlag: boolean // 数字区间样式
  sectionStyle?: BadgeSectionStyle[]
}

export type handlerChange = (param: DataMap) => void

export interface BadgeProps {
  global?: GlobalConfig
  superNumber?: SuperNumber
  data?: DataMap[]
  onClick?: handlerChange
  onDataChange?: handlerChange
}
