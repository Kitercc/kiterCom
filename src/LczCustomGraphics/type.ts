export interface BorderStyle {
  display: boolean
  lineType: string // solid Dotted
  dottedW?: number
  dottedSpace?: number
  borderColor: any
  borderWidth: number
}

export interface ShadowConfig {
  display: boolean
  color: string
  x: number
  y: number
  vague: number
  extend: number
}

export interface VagueConfig {
  display: boolean
  gaussianBlur: number
}

export interface FillColor {
  display: boolean
  color: any
}

export type ChangeHandler = () => void
export interface GraphicsProps {
  w?: number
  h?: number
  shape?: string // 形状  rect 矩形 circular 圆  triangle 三角形  star 五角星
  radius?: number // 圆角
  fillColor?: FillColor // 填充颜色
  borderStyle?: BorderStyle
  outShadow?: ShadowConfig
  inShadow?: ShadowConfig
  vagueConfig?: VagueConfig // 模糊配置
  onClick?: ChangeHandler
}
