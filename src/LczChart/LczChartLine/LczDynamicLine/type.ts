import {
  GeneralAxis,
  GeneralLegend,
  GeneralMargin,
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralNumberFormat,
  GeneralShadowStyle,
  GeneralTextStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig,
  GeneralLineDataMap
} from '../../common/type'

interface LineRotationAnimate {
  display: boolean
  interval: number
  interactionMode: 'none' | 'click' | 'mouseover'
}
export interface LineGlobalConfig {
  margin?: GeneralMargin
  bgColor: string
  titleConfig?: GeneralTitle
  legendConfig?: GeneralLegend
  toolConfig?: GeneralToolBox
  rotationAnimate?: LineRotationAnimate
  displayNum?: number
  dataAnimate: boolean
}

export interface BrokenLine extends GeneralShadowStyle {
  display?: boolean
  type: 'solid' | 'dashed' | 'dotted'
  color?: any
  lineWidth: number
  opacity: number
  step?: 'none' | 'start' | 'middle' | 'end'
  smooth: boolean
  connectNulls: boolean
}
export interface DataMarker extends GeneralShadowStyle {
  display?: boolean
  xOffset?: number
  yOffset?: number
  width: number
  height: number
  rotate: number
  markStyle: 'system' | 'custom'
  // system
  typeStyle: 'emptyCircle' | 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
  syncColor: any
  borderColor: any
  lineWidth: number
  color: any
  //custom
  img: string
}

export interface LineValueStyle extends GeneralTextStyle {
  rotate: number
}

export interface LinelValueLabel {
  display?: boolean
  valueStyle?: LineValueStyle
  linePosition?: {
    position: 'top' | 'left' | 'right' | 'bottom' | 'inside'
    xOffset: number
    yOffset: number
  }
  format?: GeneralNumberFormat
}
export interface LineDataSeries {
  map?: { fieldName: string; displayName: string } //映射
  brokenLine?: BrokenLine //折线
  dataMarker?: DataMarker //数据标记
  valueLabel?: LinelValueLabel //数值标签
}

export interface LineSeriesConfig {
  dataSeries?: LineDataSeries[] //数据系列
  markSeries?: GeneralMarkingSeries[]
  markPointSeries?: GeneralMarkPointSeries[]
}

export interface DynamicLineProps {
  w?: number
  h?: number
  design?: boolean
  globalConfig?: LineGlobalConfig
  axisConfig?: GeneralAxis
  seriesConfig?: LineSeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralLineDataMap[]
  onClick?: (param: GeneralLineDataMap) => void
  onDataChange?: (params: { category: any }) => void
}
