//真实地球
export interface RealEarth {
  type: 'lcz-earth-real-earth'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      color: string
      texture: string
    }
  }
}

export interface OutRealEarth {
  type: 'lcz-earth-real-earth'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    color: string
    texture: string
  }
}

// 环境光
export interface AmbientLight {
  type: 'lcz-earth-ambient-light'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      color: string
      intensity: number
    }
  }
}

export interface OutAmbientLight {
  type: 'lcz-earth-ambient-light'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    color: string
    intensity: number
  }
}

// 方向光
export interface DirectionalLight {
  type: 'lcz-earth-directional-light'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      color: string
      intensity: number
      position?: {
        x: number
        y: number
        z: number
      }
    }
  }
}

export interface OutDirectionalLight {
  type: 'lcz-earth-directional-light'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    color: string
    intensity: number
    position?: {
      x: number
      y: number
      z: number
    }
  }
}

// 区域热力

type AreaHeatData = {
  name?: string
  value?: number
}

export interface AreaHeat {
  type: 'lcz-earth-area-heat'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      jsonUrl: { src: string }
      height: number
      defaultFill: string
    }
    boundary?: Boundary
    styleSeries?: { min: number; max: number; fill: string }[]
  }
  data?: AreaHeatData[]
}
export interface OutAreaHeat {
  type: 'lcz-earth-area-heat'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    jsonUrl: { src: string }
    height: number
    defaultFill: string
  }
  boundary?: Boundary
  styleSeries?: { min: number; max: number; fill: string }[]
  data?: AreaHeatData[]
}

// 散点

export type ScatterPointData = {
  lng: number
  lat: number
}
export interface ScatterPoint {
  type: 'lcz-earth-scatter-point'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      imgUrl: string
      color: string
      size: {
        width: number
        height: number
      }
    }
  }
  data?: ScatterPointData[]
  event?: {
    onClick?: HandlerEvent<ScatterPointData>
  }
}

export interface OutScatterPoint {
  type: 'lcz-earth-scatter-point'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    imgUrl: string
    color: string
    size: {
      width: number
      height: number
    }
  }
  data?: ScatterPointData[]
  onClick?: HandlerEvent<ScatterPointData>
}

// 飞线
export type FlyLineData = {
  fromlat: number
  fromlng: number
  tolat: number
  tolng: number
}

type FlyConfig = {
  smooth: number
  speed: number
  random: boolean
}

type FlyLineConfig = {
  width: number
  baseLine?: Boundary
  flyLine?: {
    color?: {
      start: string
      end: string
    }
    length: number
  }
}

type HeadIcon = {
  display: boolean
  imgUrl: string
  width: number
  height: number
}

type LandingEffect = {
  display: boolean
  radius: number
  color: string
}
export interface FlyLine {
  type: 'lcz-earth-fly-line'
  id: string
  config: {
    show: boolean
    condition: any
    flyConfig?: FlyConfig
    lineConfig?: FlyLineConfig
    headIcon?: HeadIcon
    landingEffect?: LandingEffect
  }
  data?: FlyLineData[]
}

export interface OutFlyLine {
  type: 'lcz-earth-fly-line'
  id: string
  show: boolean
  condition: any
  flyConfig?: FlyConfig
  lineConfig?: FlyLineConfig
  headIcon?: HeadIcon
  landingEffect?: LandingEffect
  data?: FlyLineData[]
}

// 标牌
export type TitleBubbleData = {
  lng: number
  lat: number
  name: string
  code?: string
  height?: number
}
export interface TitleBubble {
  type: 'lcz-earth-title-bubble'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      bgType: 'color' | 'custom'
      bgColor: any
      bgImgUrl: string
      opacity: number
      size?: { width: number; height: number }
      border?: Boundary
      basicPosition?: { x: number; y: number }
      fontStyle?: TextStyle
      textOffset?: { x: number; y: number }
    }
  }
  data?: TitleBubbleData[]
  event?: {
    onClick?: HandlerEvent<TitleBubbleData>
  }
}

export interface OutTitleBubble {
  type: 'lcz-earth-title-bubble'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    bgType: 'color' | 'custom'
    bgColor: any
    bgImgUrl: string
    opacity: number
    size?: { width: number; height: number }
    border?: Boundary
    basicPosition?: { x: number; y: number }
    fontStyle?: TextStyle
    textOffset?: { x: number; y: number }
  }
  data?: TitleBubbleData[]
  onClick?: HandlerEvent<TitleBubbleData>
}

// 涟漪
export type RipplesData = {
  lng: number
  lat: number
}

export interface Ripples {
  type: 'lcz-earth-ripples'
  id: string
  config: {
    show: boolean
    condition: any
    baseConfig?: {
      startRadiu: number
      endRadiu: number
      circleNum: number
      speed: number
      interval: number
    }
    styleSeries?: {
      ratio: number
      color: string
    }[]
  }
  data?: RipplesData[]
}

export interface OutRipples {
  type: 'lcz-earth-ripples'
  id: string
  show: boolean
  condition: any
  baseConfig?: {
    startRadiu: number
    endRadiu: number
    circleNum: number
    speed: number
    interval: number
  }
  styleSeries?: {
    ratio: number
    color: string
  }[]
  data?: RipplesData[]
}
