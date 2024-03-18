import { GeneralAxis, GeneralDataMap, GeneralTooltipConfig, GenStrackSeries } from '../../common/type'
import { BarStyle, DataSeries, GlobalConfig, HighlightSeries, SeriesConfig } from '../LczBasicBar/type'

export interface StereohistogramDataSeries extends DataSeries {
  prismOpacity: number
  cylinderOpacity: number
  prismColor?: { value: string }[]
  topAndBottom?: {
    xOffset: number
    opacity: number
  }
}

export interface StereohistogramHighlightSeries extends HighlightSeries {
  prismColor?: { value: string }[]
}
export interface StereohistogramSeries extends SeriesConfig {
  dataSeries?: StereohistogramDataSeries[]
  highlightSeries?: StereohistogramHighlightSeries
  stackSeries?: GenStrackSeries[]
}

export interface StereohistogramBarStyle extends BarStyle {
  barWidth: number
}

export interface StereohistogramGlobal extends GlobalConfig {
  barStyle?: StereohistogramBarStyle
}

export interface BasicStereohistogram {
  w?: number
  h?: number
  chartType?: 'bar' | 'stereohistogram' | 'stackStereohistogram'
  globalConfig?: StereohistogramGlobal
  axisConfig?: GeneralAxis
  seriesConfig?: StereohistogramSeries
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
