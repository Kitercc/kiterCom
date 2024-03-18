import {
  GeneralMargin,
  GeneralShadowStyle,
  GeneralTextStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig,
  GeneralBorderStyle,
  GeneralPieDataMap,
  GeneralNumberFormat
} from '../../common/type'
import { BSPieLegendConfig, LabelProportion, LabelTureValue } from '../../LczChartPie/LczBasicPie/type'

export interface FunnelLineStyle {
  syncColor: boolean
  color: string
  lineLength: number
  lineWidth: number
  lineStyle: string
  opacity: number
}
export interface FunnelLine extends FunnelLineStyle {
  display: boolean
  shadow?: GeneralShadowStyle
}

/**
 * 标签
 */
export interface FunnelLabel {
  display: boolean
  verticalPosition?: 'left' | 'right'
  horizontalPosition?: 'top' | 'bottom'
  funnelLine?: FunnelLine
  seriesName?: GeneralTextStyle // 数据项名称
  proportion?: LabelProportion // 占比值
  trueValue?: LabelTureValue // 真实值
}

export interface CenterLabelProportion extends GeneralTextStyle {
  display: boolean
  decimal?: number
  speed?: number
  centerPropColorFollow?: boolean
}

export interface CenterPrefixsuffix extends GeneralTextStyle {
  display: boolean
  content: string
  xOffset: number
  yOffset: number
  centerLabelSuffixColorFlow?: boolean
  centerLabelPrefixColorFlow?: boolean
}
export interface CenterLabelTureValue extends GeneralTextStyle {
  display: boolean
  speed: number
  numberformat?: GeneralNumberFormat
  prefix?: CenterPrefixsuffix
  suffix?: CenterPrefixsuffix
  centerTrueColorFollow?: boolean
}
export interface CenterLabel {
  display: boolean
  seriesName?: GeneralTextStyle // 数据项名称
  proportion?: CenterLabelProportion // 占比值
  trueValue?: CenterLabelTureValue // 真实值
}

/**
 * 漏斗图全局
 */
export interface FunnelGlobalConfig {
  margin?: GeneralMargin
  backgroundColor: string
  sortConfig?: 'descending' | 'ascending' //漏斗 金字塔
  titleConfig?: GeneralTitle
  labelConfig?: FunnelLabel //标签
  centerLabel?: CenterLabel //中央标签
  legendConfig?: BSPieLegendConfig
  toolConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface GraphConfig {
  funnelOrient: 'vertical' | 'horizontal'
  funnelAlign: 'left' | 'right' | 'center'
  height: number | undefined | null
  width: number | undefined | null
  minSize: number
  maxSize: number
  gapStep: number
}

/**
 * 漏斗图配置
 */
export interface FunnelConfig {
  graphConfig?: GraphConfig
  borderConfig?: GeneralBorderStyle
  shadowStyle?: GeneralShadowStyle
}

export interface FunnelDataSeries {
  map?: { fieldName: string; displayName: string } //映射
  color: any
}

export interface FunnelSeriesConfig {
  seriesItemName: string
  dataSeries?: FunnelDataSeries[]
}

export interface LczBasicFunnelProps {
  w?: number
  h?: number
  globalConfig?: FunnelGlobalConfig
  funnelConfig?: FunnelConfig
  seriesConfig?: FunnelSeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
}
