import { CallbackBtn } from '../../Lcz3dAreaMap/type'
import { FlyLine, PolymerizationHeat, SanDian, SegmentedRegionalHeat, Tip } from './child'

export interface TextStyle {
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}

export interface MapRange {
  source: 'system' | 'custom'
  adcode?: { value: string | number }
  uploadData?: any
}

export interface Texture {
  display: boolean
  imgUrl: string
  repeat: boolean
  opacity: number
  width: number
  height: number
}

export interface Boundary {
  display: boolean
  color: string
  type?: 'solid' | 'dashed'
  width: number
}

export interface BgConfig {
  display: boolean
  colorConfig?: {
    display: boolean
    range: 'global' | 'current'
    starColor: string
    endColor: string
    direction: number
  }
  texture?: Texture
}

export interface AreaName extends TextStyle {
  display: boolean
  reversion: boolean
  textSeries?: {
    value: string
    xOffset: number
    yOffset: number
  }[]
}

export interface OverlappingBottom {
  gaussianBlur: number
  xOffset: number
  yOffset: number
  fillColor: string
  borderConfig?: {
    display: boolean
    range: 'global' | 'current'
    startColor: string
    endColor: string
    angle: number
    width: number
  }
  outLine?: {
    display: boolean
    color: string
  }
}
export interface MapConfig {
  range?: MapRange
  showMultistage?: boolean // 显示多级
  drillDown: boolean
  drillType: 'click' | 'dblclick'
  upperType: 'operation_blank' | 'back_button'
  wheelZoom: boolean
  southChinaSea?: {
    displayType: 'mosaic' | 'smallPicture'
    fillColor: string
    storke: string
  }
  maxLevel?: {
    value: any
  }
  rootCode?: {
    value: any
  }
  callbackBtn?: CallbackBtn
  bgConfig?: BgConfig
  boundary?: Boundary
  extremityBoundary?: Boundary
  areaName?: AreaName
  extremityAreaName?: AreaName
  overlappingBottom?: OverlappingBottom[]
}

export interface Transformation {
  perspective: boolean
  rotate?: {
    x: number
    y: number
    z: number
  }
}

export type ChildComponent = SegmentedRegionalHeat | SanDian | Tip | FlyLine | PolymerizationHeat

export type DrollParam = { adcode: string | number; name: string; level: number }

export type Timer = { updateTimer: NodeJS.Timeout | null; clickTimer: NodeJS.Timeout | null }

export interface ChinaMapProps {
  w?: number
  h?: number
  design?: boolean
  mapConfig?: MapConfig
  transformation?: Transformation
  onClick?: (param: any) => void
  onDoubleClick?: (param: any) => void
  onChildComEvent?: (id: string, type: string, parpm: any) => void
  onDrollDown?: (param: DrollParam) => void //下钻时
  onDrollUp?: (param: DrollParam) => void // 上钻
  childComponents?: Array<ChildComponent>
}
