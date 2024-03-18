import { NumberFormat } from '../../../LczCarouselTable/type'
import {
  GeneralBorderStyle,
  GeneralDataMap,
  GeneralLegend,
  GeneralShadowStyle,
  GeneralTextStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig
} from '../../common/type'

export interface BubbletextStyle {
  fontFamily: string
  fontSize: {
    max: number
    min: number
  }
  color: string
  fontWeight: any
}

export interface NormalSeriesName {
  display: boolean
  xOffset: number
  yOffset: number
  textStyle: BubbletextStyle
}
export interface NormalSuffix {
  display: boolean
  content: string
  xOffset: number
  yOffset: number
  suffixNoramlStyleFollow: boolean
  suffixStyle: BubbletextStyle
}

export interface NormalValue {
  display: boolean
  xOffset: number
  yOffset: number
  valueDisplay: 'proportion' | 'true'
  textStyle: BubbletextStyle
  numberformat: NumberFormat
  suffix: NormalSuffix
}

export interface BubbleValueLabel {
  display: boolean
  distribution: 'vertical' | 'horizontal'
  position: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
  normalSeriesName: NormalSeriesName
  normalValue: NormalValue
}

export interface FixedBubbleGlobalConfig {
  margin: { t: number; r: number; b: number; l: number }
  bgColor: string
  titleConfig: GeneralTitle
  bubbleSize: {
    max: number
    min: number
  }
  bubbleValueLabel: BubbleValueLabel
  legendConfig: GeneralLegend
  toolbarConfig: GeneralToolBox
  focusAnimate: {
    focusA: boolean
    interval: number
  }
  dataAnimate: boolean
}

export interface FixedBubbleStyle {
  color: any
  border: GeneralBorderStyle
  shadow: GeneralShadowStyle
}

export interface BubbleDataSeries {
  map: { fieldName: string; displayName: string }
  bubbleStyle: FixedBubbleStyle
}

export interface HighlightSeriesName {
  display: boolean
  xOffset: number
  yOffset: number
  textStyle: GeneralTextStyle
}
export interface HighlightSuffix {
  display: boolean
  content: string
  xOffset: number
  yOffset: number
  suffixHighlightStyleFollow: boolean
  suffixStyle: GeneralTextStyle
}

export interface HighlightValue {
  display: boolean
  xOffset: number
  yOffset: number
  textStyle: GeneralTextStyle
  numberformat: NumberFormat
  suffix: HighlightSuffix
}

export interface HighlightValueLabel {
  display: boolean
  styleSync: boolean
  distribution: 'vertical' | 'horizontal'
  position: 'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
  highlightSeriesName: HighlightSeriesName
  highlightValue: HighlightValue
}

export interface FixedBubblehighlight {
  display: boolean
  scale: boolean
  focus: 'none' | 'self' | 'series'
  highlightStyle: FixedBubbleStyle
  highlightValueLabel: HighlightValueLabel
}

export interface SeriesConfig {
  dataSeries: BubbleDataSeries[]
  highlight: FixedBubblehighlight
}

export interface CustomLayout {
  bubbleName: string
  bubbleOffset: {
    xOffset: number
    yOffset: number
  }
}

export interface LayoutConfig {
  randomLayout: boolean
  customLayout: CustomLayout[]
}
export interface FixedBubbleProps {
  w?: number
  h?: number
  globalConfig: FixedBubbleGlobalConfig
  seriesConfig: SeriesConfig
  layoutConfig: LayoutConfig
  tooltipConfig: GeneralTooltipConfig
  data?: GeneralDataMap[]
  onClick?: (param: GeneralDataMap) => void
}
