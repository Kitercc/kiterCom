import { ShadowConfig } from '../../LczCustomGraphics/type'

export interface Stroke {
  color: string
  inShadow: ShadowConfig
}

export interface StyleInterval {
  condition: string | boolean
  radius: string // 初始半径
  haloRadius: string //晕开半径
  haloSpeed: number // 晕开速度
  haloInterval: number // 晕开间隔
  color: string
  stroke: Stroke
}

export interface SitePolling {
  display: boolean
  condition: string | boolean
  triggerEvent: boolean
  interval: number
  stopTime: number
  showPanle: boolean
  moveStop: boolean
}

// 子组件 涟漪
export type Ripples = {
  type: 'lcz-subway-ripples'
  id: string
  config: {
    show: boolean
    condition: any
    siteName: string
    proporScaling: boolean
    styleInterval: StyleInterval[]
    sitePolling?: SitePolling
  }
  data?: any
  event?: { onClick?: (data: any) => void }
}

export type outRipples = {
  type: 'lcz-subway-ripples'
  id: string
  show: boolean
  condition: any
  siteName: string
  proporScaling: boolean
  styleInterval: StyleInterval[]
  sitePolling?: SitePolling
  data?: any
  onClick?: (data: any) => void
}

// 子组件 提示面板
export type Panel = {
  type: 'lcz-subway-panel'
  id: string
  config: {
    show: boolean
    condition: any
    contain: {
      link: any
      url: string
    }
    xOffset: number
    yOffset: number
    width: number
    height: number
  }
  data?: any
}

export type outPanel = {
  type: 'lcz-subway-panel'
  id: string
  show: boolean
  condition: any
  contain: {
    link: any
    url: string
  }
  xOffset: number
  yOffset: number
  width: number
  height: number
  data?: any
}

export interface SignStyle {
  type: 'system' | 'custom'
  iconValue?: IconValueType
  iconSize?: number
  color?: any
  imgUrl?: string
  width?: number
  height?: number
}
export interface SignConfig {
  display?: boolean
  position?: { x: number; y: number }
  signStyle?: SignStyle
}

export interface StyleSeries {
  type: string
  signStyle?: SignConfig
}

export type Sign = {
  type: 'lcz-subway-sign'
  id: string
  config: {
    show: boolean
    condition: any
    signConfig?: SignConfig
    shadow?: ShadowConfig
    styleSeries?: StyleSeries[]
  }
  data?: any
  event?: {
    onClick?: (data: any) => void
  }
}
export type outSign = {
  type: 'lcz-subway-panel'
  id: string
  show: boolean
  condition: any
  signConfig?: SignConfig
  shadow?: ShadowConfig
  styleSeries?: StyleSeries[]
  data?: any
  onClick?: (data: any) => void
}

export type ChildComponent = Ripples | Panel | Sign
