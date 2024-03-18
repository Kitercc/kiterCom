import type { Border } from '../../LczCalendar/type'
import type { NumberFormat, ProgressOutline, ProgressText, TextStyle } from '../../LczCarouselTable/type'
import type { FontConfig, SuffixConfig as TargetSuffixConfig, FormatConfig } from '../../LczIndicatorsTrends/type'
import type { PrefixConfig, SuffixConfig } from '../../LczNumberFlop/type'
import type {
  RingTitleConfig,
  ProgressStyle as PropChartRingStyle
} from '../../LczChart/LczChartGauge/LczPercentageRing/type'
import type { GeneralShadowStyle } from '../../LczChart/common/type'

interface TextStyleSeries extends TextStyle {
  condition: any
}

export interface TextConfig {
  content: string
  richText: boolean
  overflow: 'hidden' | 'ellipsis' | 'lineFeed'
  // lineFeed
  newlineLimit: 'none' | 'row'
  maxRow: number
  lineHeight?: { type: 'fixed' | 'multiple'; fixedNum: number; multipleNum: 1 | 1.5 | 2 | 2.5 | 3 }
  fontStyle?: TextStyle
  textStyleSeries?: TextStyleSeries[]
}

interface NumValueConfig {
  fontStyle?: TextStyle
  styleIntervalFlag: boolean
  styleInterval?: { min: number; max: number; color: any; fontWeight: any; fontSize: number }[]
  widthAdaptation: boolean
  animate?: { display: boolean; speed: number; takeRatio: number }
  numberFormat?: NumberFormat
}

export interface NumberConfig {
  prefixDistance: number
  suffixDistance: number
  prefixConfig?: PrefixConfig
  numValueConfig?: NumValueConfig
  suffixConfig?: SuffixConfig
}

interface fontSeriesItem extends FontConfig {
  condition: any
}

export interface TargetConfig {
  baseValue: string
  showValue: boolean
  iconValueSpace: number
  textStyle?: TextStyle
  fontConfig?: FontConfig // 图标
  fontSeries?: fontSeriesItem[]
  numberFormat?: FormatConfig
  suffixConfig?: TargetSuffixConfig
}

export interface ImageSeriesItem extends ImageConfig {
  condition: any
}

export interface ImageConfig {
  imageUrl: string
  width: number
  height: number
  imageSeries?: ImageSeriesItem[]
}

interface TagNormalStyle {
  condition?: any
  bgColor: string
  radius: number
  border?: Border
  fontStyle?: TextStyle
}

export interface TagsConfig {
  separator: string
  xPadding: number
  yPadding: number
  gap: number
  normalStyle?: TagNormalStyle
  styleSeries?: TagNormalStyle[]
}

interface ProgressStyleInterval {
  min: number
  max: number
  progressColor?: { progressStartColor: string; progressEndColor: string }
  progressImage: string
  color: string
  fontWeight: any
  fontSize: number
}

export interface ProgressConfig {
  maxVal: any
  progressStyle?: {
    progressType: 'line' | 'grid'
    gridGap: number
    gridLength: number
    progressWidth: number
    progressHeight: number
    radius: number
    gridColorType: 'system' | 'custom'
    progressStartColor: string // 进度条起始颜色
    progressEndColor: string // 进度条终止颜色
    progressImage: string
  }
  numberFormat?: NumberFormat
  progressText?: ProgressText // 进度条文字配置
  progressStyleIntervalFlag: boolean
  progressStyleInterval?: ProgressStyleInterval[]
  progressOutline?: ProgressOutline
  suffixConfig?: {
    display: boolean
    content: string
    yOffset: number
    fontStyle?: TextStyle
  }
}

export interface PropChartTitleConfig extends RingTitleConfig {
  chartTitleCustom: string
}

export interface ProportionChartStyleSeries {
  condition: any
  titleStyle?: TextStyle
  ringStyle?: {
    color: any
    strokeDisplay: boolean
    strokeColor: string
    strokeWidth: number
    strokeStyle: 'solid' | 'dashed' | 'dotted'

    shadowSize: number
    shadowColor: string
    shadowX: number
    shadowY: number
  }
  backgroundstyle?: {
    color: any
    strokeDisplay: boolean
    strokeColor: string
    strokeWidth: number
    strokeStyle: 'solid' | 'dashed' | 'dotted'

    shadowSize: number
    shadowColor: string
    shadowX: number
    shadowY: number
  }
}

export interface ProportionChartConfig {
  chartWidth: number
  chartHeight: number
  margin?: { x: number; y: number }
  propChartTitleConfig?: PropChartTitleConfig
  extremumConfig?: {
    min: string
    max: string
  }
  ringStyle?: PropChartRingStyle
  backgroundstyle?: {
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
  styleSeries?: ProportionChartStyleSeries[]
  dataAnimate: boolean
}

interface ValueStyle {
  valueType: 'text' | 'number' | 'target' | 'image' | 'tags' | 'progress' | 'proportionChart'
  width: any
  alignment: 'left' | 'center' | 'right'
  textConfig?: TextConfig
  numberConfig?: NumberConfig
  targetConfig?: TargetConfig
  imageConfig?: ImageConfig
  tagsConfig?: TagsConfig
  progressConfig?: ProgressConfig
  proportionChartConfig?: ProportionChartConfig
}

export interface Fields {
  additionalField: boolean
  fieldName: string
  offset: number
  position?: {
    x: 'left' | 'right' | 'center' | 'auto'
    left: number
    top: number
  }
  valueStyle?: ValueStyle
}

export interface CardContainer {
  type: 'lcz-card-list-container'
  id: string
  config: {
    show: boolean
    condition: any
    width: number
    position?: {
      x: 'left' | 'right' | 'center' | 'auto'
      y: 'top' | 'bottom' | 'center' | 'auto'
      left: number
      top: number
    }
    layoutMode: 'absolute' | 'relative'
    contentArrangement: 'level' | 'vertical'
    interval: number
    field?: Fields[]
  }
  data?: any
}

export interface OutCardContainer {
  type: 'lcz-card-list-container'
  id: string
  show: boolean
  condition: any
  width: number
  position?: {
    x: 'left' | 'right' | 'center' | 'auto'
    y?: 'top' | 'bottom' | 'center' | 'auto'
    left: number
    top: number
  }
  layoutMode: 'absolute' | 'relative'
  contentArrangement: 'level' | 'vertical'
  interval: number
  field?: Fields[]
  data?: any
}
