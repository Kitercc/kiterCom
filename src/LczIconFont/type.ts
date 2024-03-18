export interface Shadow {
  display: boolean
  x: number
  y: number
  color: string
  extend: number
}

export interface BgConfig {
  display: boolean
  bgColor: string
  borderColor: string
  borderWidth: number
  radius: number
}

export type ChangeHandler = () => void

export interface IconFontProps {
  w?: number
  h?: number
  iconValue?: IconValueType
  fillColor?: any
  padding?: number
  animate?: boolean
  shadow?: Shadow
  bgConfig?: BgConfig
  onClick?: ChangeHandler
}
