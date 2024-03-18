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
  GeneralLineDataMap,
  GenStrackSeries
} from '../../common/type'

export interface RotationAnimate {
  display: boolean
  showNumer: number
  updateNumber: number
  interval: number
  dragPan?: boolean
}
export interface AreaGlobalConfig {
  margin?: GeneralMargin
  bgColor: string
  titleConfig?: GeneralTitle
  legendConfig?: GeneralLegend
  toolConfig?: GeneralToolBox
  rotationAnimate?: RotationAnimate
  dataAnimate: boolean
}

export interface BrokenLine extends GeneralShadowStyle {
  type: 'solid' | 'dashed' | 'dotted'
  color: any
  lineWidth: number
  opacity: number
  step: 'none' | 'start' | 'middle' | 'end'
  smooth: boolean
  connectNulls: boolean
}
export interface DataMarker extends GeneralShadowStyle {
  display: boolean
  xOffset: number
  yOffset: number
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

export interface AreaValueStyle extends GeneralTextStyle {
  rotate: number
}

export interface AreaValueLabel {
  display?: boolean
  valueStyle?: AreaValueStyle
  linePosition?: {
    position: 'top' | 'left' | 'right' | 'bottom' | 'inside'
    xOffset: number
    yOffset: number
  }
  format?: GeneralNumberFormat
}

export interface AreaStyle {
  display?: boolean
  areaSyncColor: boolean
  color: any
  startOrigin: 'start' | 'end'
  shadowBlur: number
  shadowColor: string
  shadowOffsetX: number
  shadowOffsetY: number
  opacity: number
}
export interface AreaDataSeries {
  map?: { fieldName: string; displayName: string } //映射
  areaStyle?: AreaStyle //区域样式
  brokenLine?: BrokenLine //折线
  dataMarker?: DataMarker //数据标记
  valueLabel?: AreaValueLabel //数值标签
}

export interface AreaSeriesConfig {
  dataSeries?: AreaDataSeries[] //数据系列
  emphasis?: boolean //高亮聚焦
  markSeries?: GeneralMarkingSeries[] //标线
  markPointSeries?: GeneralMarkPointSeries[] //标注
  stackSeries?: GenStrackSeries[]
}

export interface BasicAreaProps {
  w?: number
  h?: number
  chartType?: 'area' | 'stackArea'
  globalConfig?: AreaGlobalConfig
  axisConfig?: GeneralAxis
  seriesConfig?: AreaSeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralLineDataMap[]
  onClick?: (param: GeneralLineDataMap) => void
}
