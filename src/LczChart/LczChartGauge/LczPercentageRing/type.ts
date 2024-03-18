import { GeneralNumberFormat, GeneralShadowStyle, GeneralTitle, GeneralToolBox } from '../../common/type'

export interface RingSubTitle {
  display: boolean
  subContentType?: 'seriesName' | 'value' | 'custom'
  //value
  subValueReal: boolean
  subValueUnit: any
  subValueFormat: GeneralNumberFormat
  //custom
  subCustom: { value: any }
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  subShadow?: GeneralShadowStyle
}

export interface RingTitleConfig {
  display: boolean
  mainContentType?: 'seriesName' | 'value' | 'custom'
  //value
  mainValueReal: boolean
  mainValueUnit: any
  mainValueFormat: GeneralNumberFormat
  //custom
  mainCustom?: { value: any }
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  mainShadow?: GeneralShadowStyle
  //
  subTitle?: RingSubTitle
  speed?: number
  xPosition: 'left' | 'right' | 'center' | 'auto'
  yPosition: 'top' | 'bottom' | 'center' | 'auto'
  xOffset: number
  yOffset: number
}

export interface RingGlobalConfig {
  margin?: { x: number; y: number }
  backgroundColor: string
  ringtitleConfig?: RingTitleConfig
  toolbarConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface ProgressStyle {
  inRadius: number
  outRadius: number
  color: any
  opacity: number
  startAngle?: number
  roundCap: boolean
  clockwise: boolean
  ProgressContour?: {
    display: boolean
    color: string
    width: number
    lineType: 'solid' | 'dashed' | 'dotted'
  }
  ProgressShadow?: GeneralShadowStyle
}

export type TubeVal = {
  value: any
}

export interface GaugeConfig {
  gaugeName?: any
  extremumConfig: {
    min: TubeVal
    max: TubeVal
  }
  angleConfig?: {
    angleStart: number
    angleCenter: number
  }
  progressStyle: ProgressStyle
  backgroundstyle: {
    display: boolean
    color: any
    opacity: number
    backgroundContour?: {
      display: boolean
      color: string
      width: number
      lineType: 'solid' | 'dashed' | 'dotted'
    }
    backgroundShadow?: GeneralShadowStyle
  }
}

export interface OutGarden {
  display: boolean
  outSyncColor: boolean
  color: any
  opacity: number
  symbolSize: number
  outGardenShadow: GeneralShadowStyle
}

export interface InGarden {
  display: boolean
  inSyncColor: boolean
  color: any
  opacity: number
  symbolSize: number
}

export interface IndicatorConfig {
  outGarden: OutGarden
  inGarden: InGarden
}

export interface ringDataMap {
  item: string
  itemTitle: string
  value: number
  nullData?: boolean
}

export interface PercentageRingProps {
  w?: number
  h?: number
  chartType?: 'ring' | 'trough'
  globalConfig: RingGlobalConfig
  gaugeConfig: GaugeConfig
  indicatorConfig?: IndicatorConfig
  data?: ringDataMap[]
  onClick?: (param: ringDataMap) => void
}
