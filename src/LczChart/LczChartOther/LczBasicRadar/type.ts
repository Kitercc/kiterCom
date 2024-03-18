import {
  GeneralShadowStyle,
  GeneralTextStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig,
  GeneralNumberFormat,
  GeneralLegend,
  GeneralAxisStyle,
  GeneralAxisBgStyle,
  GeneralLineStyle,
  GeneralAxisTick,
  GeneralAxisSplitLine,
  GeneralRadarDataMap,
  CustomDataMap
} from '../../common/type'
import { DataMarker, LinelValueLabel } from '../../LczChartLine/LczBasicLine/type'

/**
 * 雷达图全局
 */
export interface RadarGlobalConfig {
  margin?: {
    x: number
    y: number
  }
  backgroundColor: string
  titleConfig?: GeneralTitle
  legendConfig?: GeneralLegend
  toolConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface RadarAxisLabel {
  display: boolean
  isScale: boolean
  splitNumber: number
  AxisSuffix: { content: string }
  axisStyle?: GeneralAxisStyle
  axisBgStyle?: GeneralAxisBgStyle
  axisLabelShadow?: GeneralShadowStyle
  labelNumberFormat?: GeneralNumberFormat
}

interface AxisNameStyle extends GeneralTextStyle {
  padding: number
}

interface AxisNameLineStyle extends GeneralLineStyle {
  lineType: 'solid' | 'dashed' | 'dotted'
}
interface RadarAxisLine {
  display: boolean
  lineStyle: AxisNameLineStyle
  lineShadow: GeneralShadowStyle
}

export interface RadarAxisName {
  display: boolean
  axisNameStyle: AxisNameStyle
  axisNameBgStyle: GeneralAxisBgStyle
  axisNameShadow: GeneralShadowStyle
}
interface ColorSeries {
  value: string
}
interface RadarSplitArea {
  display: boolean
  radarSplitAreaStyle: {
    colorSeries: ColorSeries[]
    opacity: number
  }
  splitAreaShadow: GeneralShadowStyle
}
/**
 * 雷达图坐标轴
 */
export interface RadarAxisConfig {
  radarShape: 'polygon' | 'circle'
  radarAxisLabel: RadarAxisLabel
  radarAxisName: RadarAxisName
  radarAxisLine: RadarAxisLine
  radarAxisTick: GeneralAxisTick
  radarAxisSplitLine: GeneralAxisSplitLine
  radarSplitArea: RadarSplitArea
}

export interface RadarbrokenLine {
  lineType: 'solid' | 'dashed' | 'dotted'
  color: any
  width: number
  opacity: number
  shadow: GeneralShadowStyle
}
export interface SeriesArea {
  color: any
  opacity: number
  shadow: GeneralShadowStyle
}
export interface RadarDataSeries {
  map?: { fieldName: string; displayName: string }
  brokenLine?: RadarbrokenLine
  seriesArea?: SeriesArea
  dataMarker?: DataMarker //数据标记
  valueLabel?: LinelValueLabel //数值标签
}
/**
 * 雷达图系列
 */
export interface RadarSeriesConfig {
  radarRadius: number
  extremumConfig?: { maxValue: string | null | undefined; minValue: string | null | undefined }
  radarDataSeries?: RadarDataSeries[]
}

export interface LczBasicRadarProps {
  w?: number
  h?: number
  globalConfig?: RadarGlobalConfig
  radarAxisConfig?: RadarAxisConfig
  seriesConfig?: RadarSeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralRadarDataMap[]
  onClick?: (param: CustomDataMap) => void
}
