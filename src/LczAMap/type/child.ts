import { Latout, ValueStyle } from '../../LczChina2dMap/type/child'
import { AnimationConfig } from '../../LczImage/type'
import { TextStyle } from '../../LczTimer/type'

// 点标记
//#region
export type PointDataMap = {
  lng: number | string
  lat: number | string
  type?: string
  id?: string
}

export interface PointGlobal {
  level: number
  viewRange: {
    min: number
    max: number
  }
  carousel?: {
    display: boolean
    speed: number
  }
}

export interface ImageStyle {
  imageType: 'bitmap' | 'vector'
  bitmapUrl?: string
  vectorUrl?: string
  fillColor?: any
  radius: number
  width: number
  height: number
  xOffset: number
  yOffset: number
  rotate: number
}

export interface HighLinghtStyle {
  imageFllow: boolean
  bitmapUrl?: string
  vectorUrl?: string
  fillColor?: any
  radius: number
  scale: number
  xOffset: number
  yOffset: number
  rotate: number
}

export interface PointHighLight {
  display: boolean
  highLinghtStyle?: HighLinghtStyle
}

export interface PointIconConfig {
  conditionType?: { value: string }
  imageStyle?: ImageStyle
  animation?: AnimationConfig
  highLight?: PointHighLight
}

export interface Point {
  type: 'lcz-amap-point'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: PointGlobal
    iconConfig?: PointIconConfig
    customIcon?: PointIconConfig[]
    focusIcon?: PointIconConfig
  }
  data?: PointDataMap[]
  event?: {
    onClick?: (da: PointDataMap) => void
    onMouseenter?: (da: PointDataMap) => void
    onMouseleave?: (da: PointDataMap) => void
    onChange?: (da: PointDataMap) => void
  }
}

export interface OutPoint {
  type: 'lcz-amap-point'
  id: string
  show: boolean
  condition: any
  globalConfig?: PointGlobal
  iconConfig?: PointIconConfig
  customIcon?: PointIconConfig[]
  focusIcon?: PointIconConfig
  data?: PointDataMap[]
  onClick?: (param: PointDataMap) => void
  onMouseenter?: (da: PointDataMap) => void
  onMouseleave?: (da: PointDataMap) => void
  onChange?: (da: PointDataMap) => void
}
//#endregion

// 中心点
//#region
export type CenterPointDataMap = {
  lng: number | string
  lat: number | string
  zoom?: number | string
  id?: number | string
}

export interface CenterPointStyle extends ImageStyle {
  highLight?: PointHighLight
}

export interface CenterPoint {
  type: 'lcz-amap-center-point'
  id: string
  config: {
    show: boolean
    condition: any
    level: number
    viewRange: {
      min: number
      max: number
    }
    defaultUse: boolean
    centerStyle?: CenterPointStyle
  }
  event?: {
    onClick?: (da: CenterPointDataMap) => void
    onDataChange?: (da: CenterPointDataMap) => void
  }
  data?: CenterPointDataMap[]
}

export interface OutCenterPoint {
  type: 'lcz-amap-center-point'
  id: string
  show: boolean
  condition: any
  level: number
  viewRange: {
    min: number
    max: number
  }
  defaultUse: boolean
  centerStyle?: CenterPointStyle
  onClick?: (da: CenterPointDataMap) => void
  onDataChange?: (da: CenterPointDataMap) => void
  data?: CenterPointDataMap[]
}
//#endregion

// 线路
//#region
export type PolylineDataMap = {
  lng: number | string
  lat: number | string
  id?: number | string
}

export interface PolyLineGlobal {
  level: number
  defaultSelect?: {
    value: any
  }
}

interface Stroke {
  display: boolean
  color: string
  width: number
  radius?: number
}

interface PolySelectStyle {
  display: boolean
  opacity: number
  stroke?: Stroke
}
export interface PolyLineConfig {
  condition?: { value: string | number }
  color: string
  width: number
  opacity: number
  stroke?: Stroke
  selectStyle?: PolySelectStyle
  unSelectStyle?: {
    display: boolean
    opacity: number
  }
}
export interface Polyline {
  type: 'lcz-amap-polyline'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: PolyLineGlobal
    lineConfig?: PolyLineConfig
    customLine?: PolyLineConfig[]
  }
  event?: {
    onClick?: (da: PolylineDataMap) => void
  }
  data?: PolylineDataMap[]
}

export interface OutPolyline {
  type: 'lcz-amap-polyline'
  id: string
  show: boolean
  condition: any
  globalConfig?: PolyLineGlobal
  lineConfig?: PolyLineConfig
  customLine?: PolyLineConfig[]
  onClick?: (da: PolylineDataMap) => void
  data?: PolylineDataMap[]
}
//#endregion

// 文字标签
//#region
export type TextLabelDataMap = {
  lng: number | string
  lat: number | string
  value: string
  rotate?: number
}

export interface Global {
  level: number
  viewRange: {
    min: number
    max: number
  }
}

interface TextLabelGlobalStyle {
  display: boolean
  bgConfig?: {
    color: any
    radius: number
  }
  stroke?: Stroke
  padding?: { x: number; y: number }
  size?: {
    width: number | null
    height: number | null
  }
}

export interface TextLabel {
  type: 'lcz-amap-text-label'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: Global
    globalStyle?: TextLabelGlobalStyle
    offset?: {
      x: number
      y: number
    }
    textStyle?: TextStyle
  }
  data?: TextLabelDataMap[]
}

export interface OutTextLabel {
  type: 'lcz-amap-text-label'
  id: string
  show: boolean
  condition: any
  globalConfig?: Global
  globalStyle?: TextLabelGlobalStyle
  offset?: {
    x: number
    y: number
  }
  textStyle?: TextStyle
  data?: TextLabelDataMap[]
}
//#endregion

// 提示框
//#region
export interface ToolTipPosition {
  fixed: boolean
  fixedPosition?: {
    left: number
    top: number
  }
  padding?: {
    left: number
    top: number
    right: number
    bottom: number
  }
  bgConfig?: {
    color: any
    imgUrl: string
    radius: number
  }
  stroke?: Stroke
  offset?: {
    x: number
    y: number
  }
}

export interface ToolTipLineContent {
  fieldName: string
  title: string
  latout?: Latout
  position?: { x: number; y: number }
  titleStyle?: TextStyle
  valueStyle?: ValueStyle
}

export interface ToolTipImageStyle {
  fixedImgUrl?: string
  expImgUrl?: string
  radius: number
  width: number
  height: number
  rotate: number
  clickPreview: boolean
  position?: { x: number; y: number }
}

export interface ToolTipImageConfig extends ToolTipImageStyle {
  display: boolean
  source: 'fixed' | 'exp'

  fixedImageList?: ToolTipImageStyle[]
}
export interface ToolTip {
  type: 'lcz-amap-tooltip'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: Global
    size?: { width: number; height: number }
    positionConfig?: ToolTipPosition
    lineContent?: ToolTipLineContent[]
    imageConfig?: ToolTipImageConfig
  }
  data?: any[]
}

export interface OutToolTip {
  type: 'lcz-amap-tooltip'
  id: string
  show: boolean
  condition: any
  globalConfig?: Global
  size?: { width: number; height: number }
  positionConfig?: ToolTipPosition
  lineContent?: ToolTipLineContent[]
  imageConfig?: ToolTipImageConfig
  data?: any[]
}
//#endregion

// 涟漪
//#region
export type RipplesDataMap = {
  lng: number | string
  lat: number | string
  value: number
}

export interface RipplesStyle {
  display?: boolean

  min?: number
  max?: number

  size: { value: number }
  ripplesImageType: 'system' | 'custom'
  systemType: 'red' | 'green' | 'yellow' | 'blue' | 'red-gradual' | 'green-gradual' | 'yellow-gradual' | 'blue-gradual'
  customImgUrl: string
}

interface RipplesConfig {
  duration: number
  ripplesTyle?: 'canvas' | 'image'
  normalStyle?: RipplesStyle
  sectionConfig?: RipplesStyle[]
}

export interface Ripples {
  type: 'lcz-amap-ripples'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: Global
    ripplesConfig?: RipplesConfig
  }
  data?: RipplesDataMap[]
}

export interface OutRipples {
  type: 'lcz-amap-ripples'
  id: string
  show: boolean
  condition: any
  globalConfig?: Global
  ripplesConfig?: RipplesConfig
  data?: RipplesDataMap[]
}
//#endregion

// 飞线
//#region
export type FlylineDataMap = {
  fromLng: number | string
  fromLat: number | string
  toLng: number | string
  toLat: number | string
}

interface FlyLineFlight {
  smoothSteps: number
  speed: number
  height: number
}

interface LineConfig {
  startWidth: number
  endWidth: number
  baseline?: {
    display: boolean
    color: { value: string }[]
  }
  flyline?: {
    color?: { headColor: string; trailColor: string }
    interval: number
  }
}

export interface FlyLine {
  type: 'lcz-amap-flyline'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: Global
    flight?: FlyLineFlight
    lineConfig?: LineConfig
  }
  data?: FlylineDataMap[]
}

export interface OutFlyLine {
  type: 'lcz-amap-flyline'
  id: string
  show: boolean
  condition: any
  globalConfig?: Global
  flight?: FlyLineFlight
  lineConfig?: LineConfig
  data?: FlylineDataMap[]
}

//#endregion

// 点聚合
//#region
export type ClusterDataMap = {
  lng: number | string
  lat: number | string
  id?: number | string
  name?: string
  type?: string
}

interface ClusterConfig {
  gridSize: number
  maxZoom: number
  minClusterSize: number
}

export interface ClusterIcon {
  min?: number
  max?: number
  iconType: 'system' | 'custom'
  icon: 'juxing' | 'yuanjiaojuxing' | 'jiantou' | 'sanjiaoxing' | 'lingxing' | 'yuan'
  imageUrl: string
  iconColor: string
  globalOffset?: { x: number; y: number }
  width: number
  height: number
  styleFollow?: boolean // 样式系列中的样式跟随
  fontStyle?: TextStyle
  offset?: { x: number; y: number }
}

interface ClusterIconConfig extends ClusterIcon {
  iconSeries?: ClusterIcon[]
}

export interface SignIcon {
  condition?: {
    value: any
  }
  imageUrl: string
  width: number
  height: number
  globalOffset?: { x: number; y: number }
  fontConfig?: {
    display: boolean
    styleFollow?: boolean
    fontStyle?: TextStyle
    offset?: { x: number; y: number }
  }
}

interface IconConfig extends SignIcon {
  imageUrl: string
  width: number
  height: number
  fontConfig?: {
    display: boolean
    styleFollow?: boolean
    fontStyle?: TextStyle
    offset?: { x: number; y: number }
  }
  iconSeries?: SignIcon[]
}
export interface ClusterLayer {
  type: 'lcz-amap-cluster-layer'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: {
      zIndex: number
    }
    clusterConfig?: ClusterConfig
    clusterIconConfig?: ClusterIconConfig
    iconConfig?: IconConfig
    selectIcon?: IconConfig
  }
  data?: ClusterDataMap[]
  event?: {
    onClick?: (param: ClusterDataMap) => void
  }
}

export interface OutClusterLayer {
  type: 'lcz-amap-cluster-layer'
  id: string
  show: boolean
  condition: any
  globalConfig?: {
    zIndex: number
  }
  clusterConfig?: ClusterConfig
  clusterIconConfig?: ClusterIconConfig
  iconConfig?: IconConfig
  selectIcon?: IconConfig
  data?: ClusterDataMap[]
  onClick?: (param: ClusterDataMap) => void
}
//#endregion

// 区域热力
//#region
type HeatData = {
  adcode: string
  value: number
}

interface HeatGlobal {
  zIndex: number
  viewRange: {
    min: number
    max: number
  }
}

interface StyleSeries {
  max: number
  min: number
  color: string
}

interface HeatStyle {
  range: 'world' | 'country' | 'province'
  adcode: {
    value: any
  }
  deps: 0 | 1 | 2
  outline?: {
    colors?: {
      provinceStroke: string
      cityStroke: string
      countyStroke: string
    }
    width: number
  }
  nullColor: string
  styleSeries?: StyleSeries[]
}

export interface HeatmapLayer {
  type: 'lcz-amap-heatmap-layer'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: HeatGlobal
    heatStyle?: HeatStyle
  }
  data?: HeatData[]
}

export interface OutHeatmapLayer {
  type: 'lcz-amap-heatmap-layer'
  id: string
  show: boolean
  condition: any
  globalConfig?: HeatGlobal
  heatStyle?: HeatStyle
  data?: HeatData[]
}
//#endregion

// 聚合热力
//#region

export type PolymerizationHeatData = {
  lng: number | string
  lat: number | string
  value: number | string
}

interface ThreeConfig {
  heightScale: number
  gridSize: number
  heightBezier?: {
    X1: number
    Y1: number
    X2: number
    Y2: number
  }
}

interface ThermalPoint {
  radius: number
  maxVal: any
  minOpacity: number
  maxOpacity: number
  threeConfig?: ThreeConfig
  gradient?: {
    proportion: number
    color: string
  }[]
}

export interface PolymerizationHeat {
  type: 'lcz-amap-polymerization-heat'
  id: string
  config: {
    show: boolean
    condition: any
    globalConfig?: {
      zIndex: number
      viewRange: {
        min: number
        max: number
      }
    }
    thermalPoint?: ThermalPoint
  }
  data?: PolymerizationHeatData[]
}

export interface OutPolymerizationHeat {
  type: 'lcz-amap-polymerization-heat'
  id: string
  show: boolean
  condition: any
  globalConfig?: {
    zIndex: number
    viewRange: {
      min: number
      max: number
    }
  }
  thermalPoint?: ThermalPoint
  data?: PolymerizationHeatData[]
}
//#endregion
