import {
  GeneralNumberFormat,
  GeneralShadowStyle,
  GeneralTextStyle,
  GeneralAxisBgStyle,
  GeneralToolBox,
  GeneralPieDataMap
} from '../../common/type'
import { TubeVal } from '../LczPercentageRing/type'

export interface GaugeGlobalConfig {
  margin: { x: number; y: number }
  backgroundColor: string
  toolConfig: GeneralToolBox
  dataAnimate: {
    processAn: boolean
    numberAn: boolean
  }
}

export interface GaugeAxisLabelTextStyle extends GeneralTextStyle {
  width?: number | null
  overflow?: 'truncate' | 'breakAll' | 'none'
}

export interface GaugeAxisLabel {
  display: boolean
  distance: number
  suffix: { content: any }
  gaugeAxisLabelTextStyle: GaugeAxisLabelTextStyle
  gaugeAxisLabaelBgStyle: GeneralAxisBgStyle
  gaugeAxisLabelShadow: GeneralShadowStyle
  gaugeAxisLabaelFormat?: GeneralNumberFormat
}

export interface SubsectionConfig {
  subsectionColor: any
}

export interface GaugeAxisLineStyle {
  colorType: 'unify' | 'subsection'
  //unify
  unifyColor: any
  //subsection
  subsectionConfig: SubsectionConfig[]
  //
  opacity: number

  width: number
  roundCap: boolean
}

export interface GaugeAxisLine {
  display: boolean
  gaugeAxisLineStyle: GaugeAxisLineStyle
  guageAxisLineShadow: GeneralShadowStyle
}

export interface GaugeAxisTickStyle {
  display?: boolean
  color?: any
  opacity?: number
  lineType?: 'solid' | 'dashed' | 'dotted'
  width?: number
  length?: number
  radius?: number
}

export interface GaugeAxisTick {
  display: boolean
  splitNumber: number | null
  distance: number
  gaugeAxisTickStyle: GaugeAxisTickStyle
  gaugeAxisTickShadow: GeneralShadowStyle
}

export interface GaugeSplitLine {
  display: boolean
  distance: number
  gaugeSplitLineStyle: GaugeAxisTickStyle
  gaugeSplitLineShadow: GeneralShadowStyle
}

export interface GaugeAxis {
  axisLabel: GaugeAxisLabel
  axisLine: GaugeAxisLine
  axisTick: GaugeAxisTick
  splitLine: GaugeSplitLine
}

export interface PointerStyle extends GaugeAxisTickStyle {
  pointerType: 'system' | 'custom'
  //system
  systemType: string //circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', Default
  //custom
  customPath: string
  //
  pointerSyncColor: boolean
  showAbove: boolean
  xOffset: number
  yOffset: number
}

export interface PointerConfig {
  display: boolean
  pointerStyle: PointerStyle
  pointerContour: GaugeAxisTickStyle
  pointerShadow: GeneralShadowStyle
}

export interface FixedPointerStyle extends GaugeAxisTickStyle {
  fixedPointerType: 'system' | 'custom' | 'svg'
  //system
  systemType: string //circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none
  //custom
  customImg: any
  //svg
  svgPath: any
  size: number
  showAbove: boolean
  xOffset: number
  yOffset: number
}

export interface FixedPointConfig {
  display: boolean
  fixedPointerStyle: FixedPointerStyle
  fixedPointerContour: GaugeAxisTickStyle
  fixedPointerShadow: GeneralShadowStyle
}

export interface ProgressStyle {
  syncColor: boolean
  color: any
  width: number
  opacity: number
  roundCap: boolean
  overlap: boolean
  clip: boolean
}

export interface ProgressConfig {
  display: boolean
  progressStyle: ProgressStyle
  progressContour: GaugeAxisTickStyle
  progressShadow: GeneralShadowStyle
}

export interface BasicGaugeConfig {
  radius: number
  extremumConfig: {
    min: TubeVal
    max: TubeVal
  }
  angleConfig: {
    startAngle: number
    endAngle: number
  }
  pointerConfig: PointerConfig
  fixedPointConfig: FixedPointConfig
  progressConfig: ProgressConfig
}

export interface GaugeTitleStyle {
  isReal?: boolean
  unitContent?: string
  syncColor: boolean
  color: any
  backgroundColor: any
  fontFamily: string
  fontSize: number
  fontWeight: string
  width: number | null | undefined
  height: number | null | undefined
  overflow: 'truncate' | 'breakAll' | 'none'
  xOffset: number
  yOffset: number
}

export interface GaugeTitleConfig {
  display: boolean
  gaugeTitleStyle: GaugeTitleStyle
  gaugeTitleContour: GaugeAxisTickStyle
  gaugeTitleShadow: GeneralShadowStyle
  format?: GeneralNumberFormat
}

export interface GaugeDataSeries {
  map: { fieldName: string; displayName: string }
  color: any
  gaugeTitleConfig: GaugeTitleConfig
  gaugeDetailConfig: GaugeTitleConfig
}

export interface GaugeSeriesConfig {
  gaugeDataSeries: GaugeDataSeries[] //数据系列
}

export interface BasicGaugeProps {
  w?: number
  h?: number
  globalConfig: GaugeGlobalConfig
  axisConfig: GaugeAxis
  gaugeConfig: BasicGaugeConfig
  seriesConfig: GaugeSeriesConfig
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
}
