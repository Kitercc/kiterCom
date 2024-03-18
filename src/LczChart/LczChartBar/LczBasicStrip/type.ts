import { NumberFormat } from '../../../LczCarouselTable/type'
import {
  GeneralAxis,
  GeneralDataMap,
  GeneralDecorate,
  GeneralLegend,
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralSignSeriesDataMap,
  GeneralTextStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig,
  GenStrackSeries
} from '../../common/type'
import { BarBgConfig, CarouselAnimation } from '../LczBasicBar/type'

export interface StripStyle {
  display?: boolean
  barType: 'square' | 'bullet' | 'custom'
  fillet?: { lt: number; rt: number; lb: number; rb: number }
  bargap?: number
  barCategoryGap?: number
  barWidth?: number
  barBgColor?: BarBgConfig
}

export interface ValueStyle extends GeneralTextStyle {
  syncValueColor?: boolean
  xOffset: number
  yOffset: number
  rotate: number
  format?: NumberFormat
}

export interface ValueLabel {
  display: boolean
  valueStyle?: ValueStyle
  position: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'fixedright'
}

export interface RotationAnimate {
  display: boolean
  interval: number
  interactionMode: 'none' | 'click' | 'mouseover'
}
export interface GlobalConfig {
  margin?: { t: number; r: number; b: number; l: number }
  bgColor: string
  barStyle?: StripStyle
  titleConfig?: GeneralTitle
  valueLabel?: ValueLabel
  legendConfig?: GeneralLegend
  toolbarConfig?: GeneralToolBox
  rotationAnimate?: RotationAnimate
  carouselAnimation?: CarouselAnimation
  dataAnimate: boolean
}

export interface StripDataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
  barStyle?: StripStyle
}

export interface BorderStyle {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
}

export interface HighlightSeries {
  display: boolean
  extremum: 'max' | 'min'
  color: any
}
export interface SeriesConfig {
  dataSeries?: StripDataSeries[]
  markSeries?: GeneralMarkingSeries[]
  markPointSeries?: GeneralMarkPointSeries[]
  highlightSeries?: HighlightSeries
  stackSeries?: GenStrackSeries[]
  decorateDisplay?: boolean
  decorate?: GeneralDecorate
}

export interface BasicStripProps {
  w?: number
  h?: number
  chartType?: 'strip' | 'stackStrip' | 'signSeries'
  globalConfig?: GlobalConfig
  axisConfig?: GeneralAxis
  seriesConfig?: SeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralDataMap[] | GeneralSignSeriesDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
