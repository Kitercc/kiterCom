import {
  GeneralHoverTrigger,
  GeneralPieDataMap,
  GeneralShadowStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltip
} from '../../common/type'

interface WordsStyle {
  width: number
  height: number
  shape: 'system' | 'custom'

  systemStyle:
    | 'cardioid'
    | 'diamond'
    | 'triangle-forward'
    | 'triangle'
    | 'star'
    | 'circle'
    | 'pentagon'
    | 'triangle-upright'

  customStyle: string
}

export interface Highlight {
  display: boolean
  focus: boolean
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  shadow?: GeneralShadowStyle
}

export interface WordTextStyle {
  fontFamily: string
  maxSize: number
  minSize: number
  gridsize: number
  maxRotat: number
  minRotat: number
  rotationStep: number
  fontWeight: any
  shadow?: GeneralShadowStyle
  highlight?: Highlight
}

export interface GlobalConfig {
  margin?: {
    t: 'top' | 'bottom' | 'center' | 'auto'
    l: 'left' | 'right' | 'center' | 'auto'
    autoT?: number
    autoL?: number
  }
  backgroundColor: string
  wordsStyle?: WordsStyle
  wordTextStyle?: WordTextStyle
  titleConfig?: GeneralTitle
  toolbarConfig?: GeneralToolBox
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
  opacity: number
}

interface SeriesConfig {
  dataSeries?: DataSeries[]
}

interface TooltipConfig {
  autoPlay?: { display: boolean; interval: number }
  hoverTrigger?: GeneralHoverTrigger
  tooltip?: GeneralTooltip
}

export interface WordCloudProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  seriesConfig?: SeriesConfig
  tooltipConfig?: TooltipConfig
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
}
