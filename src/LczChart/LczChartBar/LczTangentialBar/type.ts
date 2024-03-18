import { GeneralTitle, GeneralToolBox, GeneralTooltipConfig, PolarAxisConfig, GeneralDataMap } from '../../common/type'
import { BSPieLegendConfig } from '../../LczChartPie/LczBasicPie/type'
import { ValueLabel } from '../LczBasicBar/type'

interface PillarStyle {
  roundCap: boolean
  outRadius: number
  inRadius: number
  bargap: number
  barCategoryGap: number
}
interface PillarBgStyle {
  display: boolean
  color: string
  opacity: number
}
export interface PoleConfig {
  pillarStyle?: PillarStyle
  pillarBgStyle?: PillarBgStyle
}

export interface TangGlobalConfig {
  margin?: { x: number; y: number }
  backgroundColor?: string
  titleConfig?: GeneralTitle
  poleConfig?: PoleConfig
  valueLabel?: ValueLabel
  legendConfig?: BSPieLegendConfig
  toolConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface TangDataSeries {
  map?: { fieldName: string; displayName: string } //映射
  color?: any
  pillarType?: { display: boolean; roundCap: boolean }
}

export interface TangSeriesConfig {
  dataSeries?: TangDataSeries[] //数据系列
}

export interface LczTangentialBarProps {
  w?: number
  h?: number
  globalConfig?: TangGlobalConfig
  polarAxisConfig?: PolarAxisConfig
  seriesConfig?: TangSeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
