import { GeneralShadowStyle, GeneralTitle } from '../../common/type'

interface DataAnimate {
  display: boolean
  direction: 'right' | 'left'
  amplitude: number
  period: number | null
}

export interface GlobalConfig {
  margin?: { x: number; y: number }
  bgColor?: string
  titleConfig?: GeneralTitle
  dataAnimate?: DataAnimate
}

export interface IndexStyle {
  fontFamily: string
  fontSize: number
  color: string
  insideColor: string
  fontWeight: any
  xAlign: 'left' | 'center' | 'right'
  yAlign: 'top' | 'middle' | 'bottom'
  format?: {
    display: boolean
    decimal: number
    round: boolean
    negativeing: string
    percentage: boolean
  }
}
export interface IndexConfig {
  display: boolean
  textStyle?: IndexStyle
  position: 'inside' | 'left' | 'right' | 'top' | 'bottom'
}

export interface BallStyle {
  radius: number
  shape: 'system' | 'custom'
  // system
  symbol: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'container'
  // custom
  path: string
  color: any
  opacity: number
  shadow?: GeneralShadowStyle
}

export interface WaveStyle {
  waveLength: number
  color: any
  opacity: number
  shadow?: GeneralShadowStyle
}

export interface OutlineStyle {
  display: boolean
  borderDistance: number
  color: string
  width: number
  shadow?: GeneralShadowStyle
}
export interface WaterPoloDiagram {
  ballStyle?: BallStyle
  waveStyle?: WaveStyle
  border?: {
    display: boolean
    color: string
    width: number
  }
  outlineStyle?: OutlineStyle
}

export type DataMap = { value: number }

export interface WaterPoloProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  indexConfig?: IndexConfig
  waterPoloDiagram?: WaterPoloDiagram
  data?: DataMap[]
  onClick?: (params: DataMap) => void
}
