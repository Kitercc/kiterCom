import { GeneralNumberFormat, GeneralShadowStyle, GeneralTitle, GeneralToolBox } from '../../common/type'

export interface GlobalConfig {
  position: 'level' | 'vertical'
  margin?: { t: number; r: number; b: number; l: number }
  bgColor: string
  titleConfig?: GeneralTitle
  toolbarConfig?: GeneralToolBox
  dataAnimate: boolean
}

export interface TubeStyle {
  levelColor: any
  verticalColor: any
  grooveColor: any
  levelBarWidth?: number
  levelBarHeight?: number
  verticalBarWidth?: number
  verticalBarHeight?: number
}

interface LabelStyle {
  display: boolean
  margin: number
  valSpeed: number
  fontFamily: string
  fontSize: number
  color: string
  opacity: number
  fontWeight: any
  shadow?: GeneralShadowStyle
  format?: GeneralNumberFormat
}

export interface ScaleMark {
  display: boolean
  margin: number
  opacity: number
  barWidth: number
  // 'level' | 'vertical'
  levelOrientation: 'top' | 'bottom'
  verticalOrientation: 'left' | 'right'
  suffix: string
  subScaleLine?: {
    space: number
    color: string
    len: number
  }
  mainScaleLine?: {
    space: number
    color: string
    len: number
  }
  labelStyle?: LabelStyle
}

interface IndicatorLabelStyle {
  display: boolean
  suffix: string
  distance: number
  fontFamily: string
  fontSize: number
  color: string
  opacity: number
  fontWeight: any
  shadow?: GeneralShadowStyle
  format?: GeneralNumberFormat
}

export interface Indicator {
  display: boolean
  outGarden?: {
    outSyncColor: boolean
    color: any
    symbolSize: number
  }
  inGarden?: {
    inSyncColor: boolean
    color: any
    symbolSize: number
  }
  labelStyle?: IndicatorLabelStyle
}

export interface Company {
  display: boolean
  content: string
  levelPosition: 'left' | 'right'
  verticalPosition: 'top' | 'bottom'
  xOffset: number
  yOffset: number
  fontFamily: string
  fontSize: number
  color: string
  opacity: number
  fontWeight: any
  shadow?: GeneralShadowStyle
}

export interface SeriesConfig {
  scaleMark?: ScaleMark
  indicator?: Indicator
  company?: Company
  extremum?: {
    min: TubeVal
    max: TubeVal
  }
  tubeStyle?: TubeStyle
}

export type TubeVal = {
  value: number
}

export interface TestTubeProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  seriesConfig?: SeriesConfig
  data?: TubeVal[]
  onClick?: (param: TubeVal) => void
}
