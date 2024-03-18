import { AreaName, Boundary, TextStyle } from '.'
import { FontConfig, FormatConfig, SuffixConfig } from '../../LczIndicatorsTrends/type'

// 分段指标型区域热力
//#region
export interface StyleSeries {
  min: number
  max: number
  color: string
  selected?: boolean
}

export type SegmentedRegionalHeatDataMap = {
  adcode?: string | number
  name?: string
  value: number
}

export interface ThermalIndicator {
  display: boolean
  position?: { x: number; y: number }
  orientation: 'level' | 'vertical'
  itemGap: number
  fontStyle?: {
    display: boolean
    align: 'left' | 'right'
    speed: number
    textStyle?: TextStyle
  }
  indicator?: {
    width: number
    height: number
    radius: number
  }
  clickInteraction: boolean
}

export interface SegmentedRegionalHeat {
  type: 'lcz-china-2dmap-segmentedRegionalHeat'
  id: string
  config: {
    show: boolean
    condition: any
    noData: string
    boundary?: Boundary
    styleSeries?: StyleSeries[]
    thermalIndicator?: ThermalIndicator
  }
  data?: SegmentedRegionalHeatDataMap[]
}

export interface OutSegmentedRegionalHeat {
  type: 'lcz-china-2dmap-segmentedRegionalHeat'
  id: string
  show: boolean
  condition: any
  noData: string
  boundary?: Boundary
  styleSeries?: StyleSeries[]
  thermalIndicator?: ThermalIndicator
  data?: SegmentedRegionalHeatDataMap[]
}
//#endregion

// 散点
//#region
export interface SandianGlobal {
  reversion: boolean
  beyondVisible: boolean
  clickToSelect: boolean
  size?: {
    min: number
    max: number
  }
}

export interface Shadow {
  display: boolean
  c: string
  e: number
}

export interface SanDianStyleSeries extends NormalStyle {
  type: string
  syncDefaultSelectStyle: boolean
  seriesSelectStyle?: SanDianSelectStyle
}

export interface SanDianSelectStyle extends NormalStyle {
  display: boolean
}

export interface NormalStyle {
  styleType: 'dot' | 'img' | 'icon'
  color: string
  stroke?: Boundary
  shadow?: Shadow
  iconValue: IconValueType
  imgUrl: string
}

export type CarouselConfig = {
  display: boolean
  stopCondition: any
  interval: number
}

export type SanDianDataMap = {
  lng: string | number
  lat: string | number
  value: number
  type?: string
  id?: string
}
export interface SanDian {
  type: 'lcz-china-2dmap-sandian'
  id: string
  config: {
    show: boolean
    condition: any
    global?: SandianGlobal
    normalStyle?: NormalStyle
    selectStyle?: SanDianSelectStyle
    styleSeries?: SanDianStyleSeries[]
    carouselConfig?: CarouselConfig
  }
  data?: SanDianDataMap[]
  event?: {
    onClick?: HandlerEvent<SanDianDataMap>
    onChange?: HandlerEvent<SanDianDataMap>
  }
}

export interface OutSanDian {
  type: 'lcz-china-2dmap-sandian'
  id: string
  show: boolean
  condition: any
  global?: SandianGlobal
  normalStyle?: NormalStyle
  selectStyle?: SanDianSelectStyle
  styleSeries?: SanDianStyleSeries[]
  carouselConfig?: CarouselConfig
  data?: SanDianDataMap[]
  onClick?: HandlerEvent<SanDianDataMap>
  onChange?: HandlerEvent<SanDianDataMap>
}
//#endregion

// 提示框
//#region
export interface TipSign {
  display: boolean
  width: number
  height: number
  imgUrl: string
  rotate: boolean
}

export interface TipArea {
  display: boolean
  color: any
  borderColor: string
}
export interface CurrentArea {
  manualTrigger: boolean
  targetType: 'mouseenter' | 'click'
  autoCarousel: boolean
  residenceTime: number
  movePause: boolean
  sign?: TipSign
  area?: TipArea
  areaName?: AreaName
}

export interface FreeStyle {
  seat?: { x: number; y: number }
  padd?: { l: number; t: number; b: number; r: number }
  bgConfig?: { color: any; imgUrl: string }
  border?: Boundary
}

export interface PromptBoxStyle {
  fixed: boolean
  fixedSeat?: { x: number; y: number }
  fixedPadd?: { l: number; t: number; b: number; r: number }
  fixedBgConfig?: { color: any; imgUrl: string }
  fixedBorder?: Boundary
  leftT?: FreeStyle
  rightT?: FreeStyle
  leftB?: FreeStyle
  rightB?: FreeStyle
}

export type alignment = 'flex-start' | 'flex-end' | 'center' | 'space-between'

export interface Latout {
  arrangement: 'row' | 'column'
  lineHeight: number | string | null
  lineWidth: number | string | null
  horizontal: alignment
  vertical: alignment
  contentOverflow: 'show' | 'ellipsis' | 'lineFeed'
}

export interface StyleInterval {
  min: number
  max: number
  color: string
  fontWeight: any
  fontSize: number
}

export interface IndexTextStyle extends TextStyle {
  display: boolean
}

export interface StateStyles {
  stateVal: string
  textStyle?: TextStyle
}

export interface ValueStyle {
  leftOffset: number
  valueType: 'text' | 'number' | 'index' | 'state'
  textStyle?: TextStyle
  suffixConfig?: SuffixConfig
  // number
  format?: FormatConfig
  intervalStyle?: boolean
  styleInterval?: StyleInterval[]
  // index
  baseValue?: string
  showValue?: boolean
  iconValueSpace?: number
  fontConfig?: FontConfig // 图标
  indexTextStyle?: IndexTextStyle
  // state
  stateStyles?: StateStyles[]
}

export interface LineContent {
  fieldName: string
  title: string
  latout?: Latout
  position?: { x: number; y: number }
  titleStyle?: TextStyle
  valueStyle?: ValueStyle
}

export interface Tip {
  type: 'lcz-china-2dmap-tip'
  id: string
  config: {
    show: boolean
    condition: any
    reversion: boolean
    currentArea?: CurrentArea
    size?: {
      width: number
      height: number
    }
    promptBox?: PromptBoxStyle
    lineContent?: LineContent[]
  }
  data?: any[]
  event?: {
    onChange?: HandlerEvent<any>
    onMouseenter?: HandlerEvent<any>
    onMouseleave?: HandlerEvent<any>
  }
}

export interface OutTip {
  type: 'lcz-china-2dmap-tip'
  id: string
  show: boolean
  condition: any
  reversion: boolean
  currentArea?: CurrentArea
  size?: {
    width: number
    height: number
  }
  promptBox?: PromptBoxStyle
  lineContent?: LineContent[]
  data?: any[]
  onChange?: HandlerEvent<any>
  onMouseenter?: HandlerEvent<any>
  onMouseleave?: HandlerEvent<any>
}

//#endregion

// 飞线
//#region

export type FlyDataMap = {
  fromlat: number | string
  fromlng: number | string
  tolat: number | string
  tolng: number | string
}

export interface Flight {
  smooth: number
  speed: number
  radian: number
  randomStart: boolean
}

export interface FlyLineStyle {
  colors: {
    startColor: string
    endColor: string
  }
  width: number
  len: number
}
export interface LineConfig {
  baseline?: Boundary
  flyLine?: FlyLineStyle
}

export interface ToGround {
  display: boolean
  color: string // 颜色
  cut: number // 切割点
  haloRadius: number // 晕开半径
  startRadius: number // 初始半径
  stepTime: number // 晕开间隔
  stroke?: Boundary //  描边
  time: number // 消失时间
  times: number // 晕开次数
}
export interface FlyLine {
  type: 'lcz-china-2dmap-flyline'
  id: string
  config: {
    show: boolean
    condition: any
    flight?: Flight
    lineConfig?: LineConfig
    toGround?: ToGround
  }
  data?: FlyDataMap[]
}

export interface OutFlyLine {
  type: 'lcz-china-2dmap-flyline'
  id: string
  show: boolean
  condition: any
  flight?: Flight
  lineConfig?: LineConfig
  toGround?: ToGround
  data?: FlyDataMap[]
}
//#endregion

// 聚合热力

export type PolymerizationHeatDataMap = {
  value: number
  lng?: string | number
  lat?: string | number
  type?: string
}

export interface colorSeries {
  proportion: number
  color: string
}
export interface PolymerizationHeat {
  type: 'lcz-china-2dmap-polymerizationHeat'
  id: string
  config: {
    show: boolean
    condition: any
    radius: number
    minValue: number | null
    maxValue: number | null
    minOpacity: number
    maxOpacity: number
    fuzzyFactor: number
    colorSeries?: colorSeries[]
    dataAnimate?: { display: boolean; frequency: number; speed: number }
  }
  data?: PolymerizationHeatDataMap[]
}

export interface OutPolymerizationHeat {
  type: 'lcz-china-2dmap-polymerizationHeat'
  id: string
  show: boolean
  condition: any
  radius: number
  minValue: number | null
  maxValue: number | null
  minOpacity: number
  maxOpacity: number
  fuzzyFactor: number
  colorSeries?: colorSeries[]
  dataAnimate?: { display: boolean; frequency: number; speed: number }
  data?: PolymerizationHeatDataMap[]
}
