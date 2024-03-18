import { AngleAxis, GeneralDataMap, GeneralTooltipConfig, RadialAxis } from '../../common/type'
import { TangGlobalConfig } from '../LczTangentialBar/type'

type Diff<T extends keyof any, U extends keyof any> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = Pick<T, Diff<keyof T, keyof U>> & U

export interface PoleConfig {
  columnStyle?: {
    outRadius: number
    inRadius: number
    bargap: number
    barCategoryGap: number
  }
  columnBg?: {
    display: boolean
    color: string
    opacity: number
  }
}

interface GlobalConfig {
  singleSeries: boolean
  poleConfig: PoleConfig
}

export type RadialGlobalConfig = Overwrite<TangGlobalConfig, GlobalConfig>

export interface RadialPolarAxisConfig {
  radialAxis?: AngleAxis
  angleAxis?: RadialAxis
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
}

interface SignSeries {
  name: string
  dataSeries?: DataSeries[]
}

export interface SeriesConfig {
  signSeries?: SignSeries
  multiSeries?: {
    dataSeries?: DataSeries[]
  }
}

export interface RadialPoleProps {
  w?: number
  h?: number
  globalConfig?: RadialGlobalConfig
  radialPolarAxisConfig?: RadialPolarAxisConfig
  seriesConfig?: SeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
