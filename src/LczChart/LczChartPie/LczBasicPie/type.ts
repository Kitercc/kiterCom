import { NumberFormat } from '../../../LczCarouselTable/type'
import {
  GeneralLayout,
  GeneralPieDataMap,
  GeneralShadowStyle,
  GeneralTitle,
  GeneralTooltipConfig
} from '../../common/type'
import { DataSeries, Proportion, TextStyle } from '../Lcz3dTorus/type'

export interface GuideLineStyle {
  syncColor: boolean
  color: string
  len1: number
  len2: number
  edgeDistance: number
  lineWidth: number
  opacity: number
}
export interface GuideLine {
  display: boolean
  spacing: number
  alignment: 'none' | 'labelLine' | 'edge'
  lineStyle?: GuideLineStyle
  shadow?: GeneralShadowStyle
}

export interface LabelProportion extends Proportion {
  propStyleFollow?: boolean
  propColorFollow?: boolean
  prefix?: BasPiePrefixsuffix
  suffix?: BasPiePrefixsuffix
}

export interface LabelTureValue extends Proportion {
  display: boolean
  speed: number
  numberformat?: NumberFormat
  prefix?: BasPiePrefixsuffix
  suffix?: BasPiePrefixsuffix
  trueStyleFollow?: boolean
  trueColorFollow?: boolean
}

interface SeriesName extends TextStyle {
  seriesNameColorFollow?: boolean
  prefix?: BasPiePrefixsuffix
  suffix?: BasPiePrefixsuffix
}

export interface NumberLabel {
  display: boolean
  distribution: 'vertical' | 'horizontal'
  position: 'outside' | 'inside'
  margin?: { t: number; b: number; l: number; r: number }
  guideLine?: GuideLine
  seriesName?: SeriesName // 系列名
  proportion?: LabelProportion // 占比值
  trueValue?: LabelTureValue // 真实值
}

export interface IconConfig {
  iconType: 'system' | 'custom' | 'svg'
  // system
  systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
  // custom
  customUrl: string

  svgPath?: string
}

export interface BasPieLegendProportion extends TextStyle {
  display: boolean
  decimal?: number
  speed?: number
  legendProportionColorFollow?: boolean
  legendProportionStyleFollow?: boolean
  displayWidth?: number | null | undefined
  charNums?: any
}

export interface BasPiePrefixsuffix extends BasPieLegendProportion {
  display: boolean
  content: string
  xOffset?: number
  yOffset?: number
  offsetConfig?: {
    t: number
    b: number
    l: number
    r: number
  }
  // 图例用的
  suffixStyleFollow?: boolean //样式跟随
  suffixColorFollow?: boolean
  prefixStyleFollow?: boolean //样式跟随
  prefixColorFollow?: boolean

  // label 用的
  // 真实值前缀后缀
  labelTrueSuffixStyleFollow?: boolean //样式跟随
  labelTrueSuffixColorFollow?: boolean // 颜色跟随
  labelTruePrefixStyleFollow?: boolean //样式跟随
  labelTruePrefixColorFollow?: boolean // 颜色跟随

  // 占比值
  labelproportionPrefixStyleFollow?: boolean //样式跟随
  labelproportionPrefixColorFollow?: boolean // 颜色跟随
  labelproportionSuffixStyleFollow?: boolean //样式跟随
  labelproportionSuffixColorFollow?: boolean // 颜色跟随

  //系列名 前后缀样式跟随
  labelSeriesNamePrefixStyleFollow?: boolean
  labelSeriesNameSuffixStyleFollow?: boolean
  //系列名 前后缀颜色跟随
  labelSeriesNamePrefixColorFollow?: boolean
  labelSeriesNameSuffixColorFollow?: boolean

  // xyy要用到的
  labelPrefixColorFlow?: boolean
  labelSuffixColorFlow?: boolean
}

export interface BasPieLegendTureValue extends BasPieLegendProportion {
  display: boolean
  speed: number
  numberformat?: NumberFormat
  prefix?: BasPiePrefixsuffix
  suffix?: BasPiePrefixsuffix
  legendTrueStyleFollow?: boolean
  legendTrueColorFollow?: boolean
  displayWidth?: number | null | undefined
}

export interface PieLegendSeriesName extends TextStyle {
  legendSeriesColorFollow?: boolean
  displayWidth?: number | null | undefined
  charNums?: any
}

export interface BSPieLegendConfig {
  display: boolean
  size?: { w: number; h: number }
  iconConfig?: IconConfig //图例图标
  seriesName?: PieLegendSeriesName // 系列名
  trueValue?: BasPieLegendTureValue // 真实值
  displayAlign?: 'left' | 'right' | 'center'
  proportion?: BasPieLegendProportion // 占比值
  layout?: GeneralLayout
  clickInt?: {
    display?: boolean
    clicked?: boolean
    disableStyles: string
  }
}

export interface GlobalConfig {
  backgroundColor: string
  margin?: {
    x: number
    y: number
  }
  titleConfig?: GeneralTitle
  numberLabel?: NumberLabel
  legendConfig?: BSPieLegendConfig
}

export interface Graphical {
  radius: number
  outRadius?: number
  roseType?: 'radius' | 'area'
  opacity: number
  borderRadius: number
  clockwise: boolean
  showEmptyCircle: boolean
  emptyColor: string
}

export type PieCarousel = {
  display: boolean
  speed: number
  interactionMode: 'none' | 'click' | 'mouseover'
}

export interface pieSelect {
  display: boolean
  mode: 'single' | 'multiple'
  initSelect: { value: string }
  selectStyle?: {
    selectedOffset: number
    opacity: number
  }
  carousel?: PieCarousel
}
export interface PieChart {
  graphical?: Graphical
  angle?: {
    startAngle: number
    minAngle: number
  }
  select?: pieSelect
  highlight?: {
    display: boolean
    scaleSize: number
    focus: boolean
  }
  border?: {
    display: boolean
    color: string
    width: number
    type: 'solid' | 'dashed' | 'dotted'
  }
  shadow?: GeneralShadowStyle
}

export interface VisualMap {
  display: boolean
  max: number
  min: number
  color: { value: string }[]
  colorLightnessMin: number
  colorLightnessMax: number
  colorSaturationMin: number
  colorSaturationMax: number
}

export interface SeriesConfig {
  seriesName: string
  sort?: 'normal' | 'diminishing' | 'increasing'
  dataSeries?: DataSeries[]
  visualMap?: VisualMap
}
export interface LczBasicPieProps {
  w?: number
  h?: number
  chartType?: 'pie' | 'doughnut' | 'nightingale' // 默认饼、 环形图、南丁达尔玫瑰图
  globalConfig?: GlobalConfig
  pieChart?: PieChart
  seriesConfig?: SeriesConfig
  tooltipConfig?: GeneralTooltipConfig
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
  onChange?: (param: GeneralPieDataMap | GeneralPieDataMap[]) => void
}
