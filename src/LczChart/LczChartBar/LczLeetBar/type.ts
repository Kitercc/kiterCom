import { NumberFormat } from '../../../LczCarouselTable/type'
import {
  GeneralAxis,
  GeneralDataMap,
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralToolBox,
  GeneralTooltipConfig
} from '../../common/type'
import { BarLineLegendConfig } from '../../LczChartBlend/LczBasicLineBar/type'
import { LegendConfig, TextStyle } from '../../LczChartPie/Lcz3dTorus/type'

export interface SubTitle extends TextStyle {
  display: boolean
  content?: { value: string }
}

export interface TitleConfig extends TextStyle {
  display: boolean
  content?: { value: string }
  subTitle?: SubTitle
  speed: number
  xPosition: 'left' | 'right' | 'center' | 'auto'
  yPosition: 'top' | 'bottom' | 'center' | 'auto'
  xOffset: number
  yOffset: number
}

export interface GlobalBarStyle {
  bargap: number
  barCategoryGap: number
  GlobalBarType: 'system' | 'custom' | 'svg'
  // system
  systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
  // custom
  customUrl: string
  // svg
  svgPath: string

  symbolRepeat: boolean
  symbolClip: boolean
  symbolRotate: number
  barSize: {
    width: number | null | undefined
    height: number | null | undefined
  }
  barPosition: {
    xOffset: number
    yOffset: number
  }
  opacity: number
}

export interface BarStyle {
  display: boolean
  barType: 'system' | 'custom' | 'svg'
  // system
  systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
  // custom
  customUrl: string
  // svg
  svgPath: string

  symbolRepeat: boolean
  symbolClip: boolean
  symbolRotate: number
  barSize: {
    width: number | null | undefined
    height: number | null | undefined
  }
  barPosition: {
    xOffset: number
    yOffset: number
  }
  opacity: number
}

export interface ValueStyle extends TextStyle {
  xOffset: number
  yOffset: number
  rotate?: number
  format?: NumberFormat
}

export interface ValueLabel {
  display: boolean
  valueStyle?: ValueStyle
  position: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
}

export interface BarLegendConfig extends LegendConfig {
  spacing: number
}

export interface RotationAnimate {
  display: boolean
  interval: number
  interactionMode: 'none' | 'click' | 'mouseover'
}
export interface GlobalConfig {
  margin?: { t: number; r: number; b: number; l: number }
  bgColor: string
  globalBarStyle?: GlobalBarStyle
  titleConfig?: TitleConfig
  valueLabel?: ValueLabel
  legendConfig?: BarLineLegendConfig
  toolConfig?: GeneralToolBox
  dataAnimate: boolean
}

//#region

export interface ShadowStyle {
  shadowBlur: number
  shadowColor: string
  shadowOffsetX: number
  shadowOffsetY: number
}

//#endregion

export interface LeetDataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
  barStyle: BarStyle
}

export interface BorderStyle {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
}
export interface LayelStyle extends TextStyle {
  display: boolean
  position:
    | 'start'
    | 'middle'
    | 'end'
    | 'insideStartTop'
    | 'insideStartBottom'
    | 'insideMiddleTop'
    | 'insideMiddleBottom'
    | 'insideEndTop'
    | 'insideEndBottom'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'inside'
    | 'insideLeft'
    | 'insideRight'
    | 'insideTop'
    | 'insideBottom'
    | 'insideTopLeft'
    | 'insideBottomLeft'
    | 'insideTopRight'
    | 'insideBottomRight'
  xOffset: number
  yOffset: number
  borderStyle: BorderStyle
  shadow: ShadowStyle
  format: NumberFormat
}

export interface MarkSeries {
  markType: 'min' | 'max' | 'average'
  lineType: 'solid' | 'dashed' | 'dotted'
  startStyle?: {
    style: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
    width: number
    height: number
  }
  syncColor: boolean
  lineColor: any
  opacity: number
  width: number
  labelStyle?: LayelStyle
}

export interface MarkPointSeries {
  pointType: 'min' | 'max' | 'average'
  pointstyle: 'system' | 'custom'
  // system
  pointIcon: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
  syncColor: boolean
  color: any
  opacity: number
  borderStyle: BorderStyle
  shadow: ShadowStyle
  // custom
  imgUrl: string

  size?: { width: number; height: number }
  symbolRotate: number
  pointLabel?: LayelStyle
}

export interface HighlightSeries {
  display: boolean
  extremum: 'max' | 'min'
  color: any
}
export interface SeriesConfig {
  dataSeries?: LeetDataSeries[]
  markSeries?: GeneralMarkingSeries[]
  markPointSeries?: GeneralMarkPointSeries[]
}

export type DataMap = {
  category: string
  value: number
  series?: string
  stack?: string
}

export interface Tipposition {
  offsetType: 'normal' | 'custom'
  xPosition: number
  yPosition: number
  margin?: { t: number; r: number; b: number; l: number }
}

export interface BgStyle extends BorderStyle, ShadowStyle {
  className: string
}

export interface TipStyle {
  textStyle?: TextStyle
  bgStyle?: BgStyle
}
export interface Tooltip {
  tipposition?: Tipposition
  tipStyle?: TipStyle
}

export interface HoverTrigger {
  display: boolean
  alwaysShowContent: boolean
}

export interface Indicator {
  type: 'line' | 'shadow' | 'none' | 'cross'
  snap: boolean
}
export interface TooltipConfig {
  autoPlay?: { display: boolean; interval: number }
  hoverTrigger?: HoverTrigger
  tooltip?: Tooltip
  indicator?: Indicator
}

export interface LeetBarProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  axisConfig?: GeneralAxis
  seriesConfig?: SeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
