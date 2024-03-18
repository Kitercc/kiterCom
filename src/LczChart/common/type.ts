export interface GeneralTextStyle {
  display?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  fontStyle?: any
  letterSpacing?: number
  showWidth?: any
}

export interface GeneralSubTitle extends GeneralTextStyle {
  display: boolean
  content?: { value: string }
}

export interface GeneralIconConfig {
  iconType: 'system' | 'custom' | 'svg'
  // system
  systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'star' | 'ring'
  // custom
  customUrl: string
  // svg
  svgPath?: string
}

export interface GeneralLegendPager {
  display: boolean
  gap: number
  itemGap: number
  horPosition?: 'start' | 'end'
  verPosition?: 'start' | 'end'

  pagerBtn?: {
    buttonWidth: number
    buttonHeight: number
    pagerIconType: 'system' | 'custom' | 'svg'
    preImageUrl?: string
    preIconPath?: string
    nextImageUrl?: string
    nextIconPath?: string
    pageIconColor: string
    pageIconInactiveColor: string
  }

  textStyle?: GeneralTextStyle
  animation: boolean
}
export interface GeneralLayout {
  distributionMode: 'unilateral' | 'bothSides'
  itemGap: number
  // unilateral
  legendPager?: GeneralLegendPager
  orient: 'horizontal' | 'vertical'
  width?: number | null | undefined
  height?: number | null | undefined
  xPosition: 'left' | 'right' | 'center' | 'auto'
  yPosition: 'top' | 'bottom' | 'center' | 'auto'
  xOffset: number
  yOffset: number
  // bothSides
  layoutmode: 'leftright' | 'topbottom'
}

/*----------------------------------------------------------------*/

export interface GeneralNumberFormat {
  // 数字格式化配置
  display: boolean
  decollate: boolean
  decimal: number
  round: boolean
  percentage?: boolean
  negativeing?: string //  负数显示值  负号 minus  括号 brackets  绝对值  abs
}

export interface GeneralTimerformat {
  time:
    | 'YYYY年MM月DD日 HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY.MM.DD HH:mm:ss'
    | 'YYYY年MM月DD日'
    | 'YYYY年MM月'
    | 'YYYY-MM-DD'
    | 'MM月DD日'
    | 'MM月'
    | 'DD日'
    | 'HH:mm:ss'
    | 'HH:mm'
    | 'dddd'
    | 'Monday'
    | 'Mon'
    | 'asData'
  splitNumber: number
  leftMargin: number
  rightMargin: number
}

export interface GeneralCategoryformat {
  space: number
  textRotate: number
  boundaryGap: boolean
}

export interface GeneralAxisStyle extends GeneralTextStyle {
  overflow?: 'truncate' | 'breakAll' | 'none'
  showType?: 'actualLength' | 'outOfCharacter'
  width?: number | null
  charNumber?: number
  align?: 'left' | 'right' | 'center'
  padding?: number
}
export interface GeneralAxisBgStyle {
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
}
export interface GeneralShadowStyle {
  shadowBlur?: number
  shadowColor?: string
  shadowOffsetX?: number
  shadowOffsetY?: number
}

export interface GeneralAxisLabel {
  display: boolean
  labelType: 'category' | 'time'
  time:
    | 'YYYY年MM月DD日 HH:mm:ss'
    | 'YYYY-MM-DD HH:mm:ss'
    | 'YYYY.MM.DD HH:mm:ss'
    | 'YYYY年MM月DD日'
    | 'YYYY年MM月'
    | 'YYYY-MM-DD'
    | 'MM月DD日'
    | 'MM月'
    | 'DD日'
    | 'HH:mm:ss'
    | 'HH:mm'
    | 'dddd'
    | 'Monday'
    | 'Mon'
    | 'asData'
  splitType: 'auto' | 'showAll' | 'none'
  splitNumber: number
  showMaxLabel: boolean
  showMinLabel: boolean
  leftMargin: number
  rightMargin: number

  spaceType: 'auto' | 'showAll' | 'none'
  space: number
  textRotate: number
  boundaryGap: boolean

  axisStyle?: GeneralAxisStyle
  axisBgStyle?: GeneralAxisBgStyle
  axisLabelShadow?: GeneralShadowStyle
}

export interface GeneralUnitStyle extends GeneralAxisStyle, GeneralAxisBgStyle {
  nameRotate: number
}
export interface GeneralAxisUnit {
  display: boolean
  content: string
  nameLocation: 'start' | 'center' | 'end'
  unitStyle?: GeneralUnitStyle
  unitShadow?: GeneralShadowStyle
}

export interface GeneralLineStyle {
  symbol?: 'none' | 'unilateral' | 'bothEnds'
  symbolW?: number
  symbolH?: number
  color: string
  opacity: number
  width: number
}
export interface GeneralAxisLine {
  display: boolean
  lineStyle?: GeneralLineStyle
  lineShadow?: GeneralShadowStyle
}

export interface GeneralTickStyle {
  color: string
  opacity: number
  type: 'solid' | 'dashed' | 'dotted'
  width: number
  length: number
  inside?: 'in' | 'out'
}

export interface GeneralAxisTick {
  display: boolean
  tickStyle?: GeneralTickStyle
  tickShadow?: GeneralShadowStyle
}

export interface GeneralAxisSplitLine {
  display: boolean
  splitLineStyle?: {
    lineType: 'solid' | 'dashed' | 'dotted'
    color: string
    opacity: number
    width: number
  }
  splitLineShadow?: GeneralShadowStyle
}
export interface GeneralXAxis {
  display: boolean
  axisLabel?: GeneralAxisLabel
  axisUnit?: GeneralAxisUnit
  axisLine?: GeneralAxisLine
  axisTick?: GeneralAxisTick
  axisSplitLine?: GeneralAxisSplitLine
}

export interface GeneralRadialAxisLabel {
  display: boolean
  startAngle?: number
  clockwise?: boolean
  spaceType: 'auto' | 'showAll' | 'none'
  space: number
  textRotate?: number
  axisStyle?: GeneralAxisStyle
  axisBgStyle?: GeneralAxisBgStyle
  axisLabelShadow?: GeneralShadowStyle
}
export interface GeneralAngleAxisLabel {
  display: boolean
  startAngle?: number
  clockwise?: boolean
  min: number | null | undefined
  max: number | null | undefined
  splitAuto: boolean
  splitNumber?: number
  suffixConfig?: { content: string }
  yLabelStyle?: GeneralYlabelStyle
  yLabelBgStyle?: GeneralYlabelBgStyle
  yLabelShadow?: GeneralShadowStyle
  format?: GeneralNumberFormat
}

export interface colorSeries {
  value: string
}

export interface GeneralAxisSplitArea {
  display: boolean
  splitAreaStyle?: { colorSeries: colorSeries[]; opacity: number }
  splitAreaShadow?: GeneralShadowStyle
}
export interface RadialAxis {
  display: boolean
  axisLabel?: GeneralRadialAxisLabel
  axisUnit?: GeneralAxisUnit
  axisLine?: GeneralAxisLine
  axisTick?: GeneralAxisTick
  axisSplitLine?: GeneralAxisSplitLine
  axisSplitArea?: GeneralAxisSplitArea
}

export interface AngleAxis {
  display: boolean
  yaxisLabel?: GeneralAngleAxisLabel
  axisUnit?: GeneralAxisUnit
  axisLine?: GeneralAxisLine
  axisTick?: GeneralAxisTick
  axisSplitLine?: GeneralAxisSplitLine
  axisSplitArea?: GeneralAxisSplitArea
}

export interface GeneralYlabelStyle extends GeneralTextStyle {
  interval?: number
  overflow: 'truncate' | 'breakAll' | 'none'
  showType?: 'actualLength' | 'outOfCharacter'
  charNumber?: number
  align?: 'left' | 'right' | 'center'
  padding: number
}
export interface GeneralYlabelBgStyle {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
}
export interface GeneralYaxisLabel {
  display: boolean
  min?: number | null | undefined
  max?: number | null | undefined
  minInterval?: number | null | undefined
  splitAuto: boolean
  splitNumber?: number
  suffixConfig?: { content: string }
  yLabelStyle?: GeneralYlabelStyle
  yLabelBgStyle?: GeneralYlabelBgStyle
  yLabelShadow?: GeneralShadowStyle
  format?: GeneralNumberFormat
}

export interface GeneralYAxis {
  display: boolean
  yaxisLabel?: GeneralYaxisLabel
  axisUnit?: GeneralAxisUnit
  axisLine?: GeneralAxisLine
  axisTick?: GeneralAxisTick
  axisSplitLine?: GeneralAxisSplitLine
}
/*--------------------------------------------------- */

export interface GeneralBorderStyle {
  display?: boolean
  backgroundColor?: string
  borderColor?: string
  borderWidth: number
  borderRadius?: number
  borderType?: 'solid' | 'dashed' | 'dotted'
}

export interface GeneralLayelStyle extends GeneralTextStyle {
  display: boolean
  position:
    | 'start'
    | 'middle'
    | 'end'
    | 'insideStartTop'
    | 'insideStartBottom'
    | 'insideMiddleTop'
    | 'insideMiddleBottom'
    | 'insideEndTop'
    | 'insideEndBottom'
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'inside'
    | 'insideLeft'
    | 'insideRight'
    | 'insideTop'
    | 'insideBottom'
    | 'insideTopLeft'
    | 'insideBottomLeft'
    | 'insideTopRight'
    | 'insideBottomRight'
  xOffset: number
  yOffset: number
  borderStyle: GeneralBorderStyle
  shadow: GeneralShadowStyle
  format: GeneralNumberFormat
}

export interface GeneralHoverTrigger {
  display: boolean
  alwaysShowContent: boolean
}

export interface GeneralTipposition {
  offsetType: 'normal' | 'custom'
  xPosition: number
  yPosition: number
  margin?: { t: number; r: number; b: number; l: number }
}

export interface GeneralBgStyle extends GeneralBorderStyle, GeneralShadowStyle {
  className: string
}
export interface GeneralTipStyle {
  textStyle?: GeneralTextStyle
  bgStyle?: GeneralBgStyle
}
export interface GeneralTooltip {
  tipposition?: GeneralTipposition
  tipStyle?: GeneralTipStyle
}

/**
 * 通用边距
 */
export interface GeneralMargin {
  t: number
  r: number
  b: number
  l: number
}

/**
 * 通用标题
 */
export interface GeneralTitle extends GeneralTextStyle {
  display: boolean
  content?: { value: string }
  subTitle?: GeneralSubTitle
  speed: number
  xPosition: 'left' | 'right' | 'center' | 'auto'
  yPosition: 'top' | 'bottom' | 'center' | 'auto'
  xOffset: number
  yOffset: number
}

/**
 * 通用图例
 */

interface GeneralLegendSeries extends GeneralTextStyle {
  legendSeriesColorFollow?: boolean
  showWidth?: any
  overflow?: 'truncate' | 'breakAll' | 'initial'
}

export interface GeneralLegend {
  display: boolean
  seriesName?: GeneralLegendSeries // 文本样式
  size?: { w: number; h: number } //图标尺寸
  iconConfig?: GeneralIconConfig //图例图标
  spacing: number //间距
  layout?: GeneralLayout //布局
  clickInt?: {
    display?: boolean
    clicked?: boolean
    disableStyles: string
  }
}

/**
 * 通用工具栏
 */
export interface GeneralToolBox {
  display: boolean
  layOut?: {
    orient: 'horizontal' | 'vertical'
    toolBoxPosition?: {
      toolxPosition: 'left' | 'right' | 'center' | 'auto'
      toolyPosition: 'top' | 'bottom' | 'center' | 'auto'
      xOffset: number
      yOffset: number
    }
  }
  toolStyle?: {
    size: number
    itemGap: number
    showTitle: boolean
  }
  tool?: {
    saveAsImage?: boolean
    restore?: boolean
    magicType?: boolean
  }
}

/**
 * 通用坐标轴
 */
export interface GeneralAxis {
  xAxis?: GeneralXAxis
  yAxis?: GeneralYAxis
}

/**
 * 极柱图极轴
 */
export interface PolarAxisConfig {
  radialAxis?: RadialAxis
  angleAxis?: AngleAxis
}

/**
 * 通用标线（数组）
 */
export interface GeneralMarkingSeries {
  markType: 'min' | 'max' | 'average'
  lineType: 'solid' | 'dashed' | 'dotted'
  syncColor?: boolean
  lineColor: any
  opacity: number
  width: number
  startStyle?: {
    style: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
    width: number
    height: number
  }
  labelStyle?: GeneralLayelStyle
}

/**
 * 通用自定义堆叠
 */

export interface GenStrackSeries {
  stackName: string
  seriesName: string
}

/**
 * 通用标注（数组）
 */
export interface GeneralMarkPointSeries {
  pointType: 'min' | 'max' | 'average'
  pointstyle: 'system' | 'custom'
  // system
  pointIcon: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
  syncColor?: boolean
  color: any
  opacity: number
  borderStyle: GeneralBorderStyle
  shadow: GeneralShadowStyle
  // custom
  imgUrl: string

  size?: { width: number; height: number }
  symbolRotate: number
  pointLabel?: GeneralLayelStyle
}

export interface GeneralTipSuffixSeries {
  fieldName: string
  content: string
}

export interface GeneralTipSuffixTextStyle {
  tipSuffixStyleAsync?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  fontStyle?: any
}

export interface GeneralTipSuffixConfig {
  display: boolean
  content: any
  gap: number
  yOffset: number
  tipTextStyle: GeneralTipSuffixTextStyle
  tipSuffixSeries: GeneralTipSuffixSeries[]
}

/**
 * 提示框
 */
export interface GeneralTooltipConfig {
  autoPlay?: { display: boolean; interval: number }
  hoverTrigger?: GeneralHoverTrigger
  tooltip?: GeneralTooltip
  indicator?: {
    type: 'line' | 'shadow' | 'none' | 'cross'
    snap?: boolean
  }
  tipSuffixConfig?: GeneralTipSuffixConfig
}

export interface GeneralDecorate {
  display?: boolean
  decIconConfig?: GeneralIconConfig
  iconSize?: { width: number; height: number }
  position?: { place: 'start' | 'end' | 'center'; offset: number }
}

export type GeneralDataMap = {
  category: any
  categoryTitle?: any
  value: any
  series?: any
  seriesTitle?: any
  stack?: string
}

export type GeneralSignSeriesDataMap = {
  category: any
  categoryTitle?: any
  value: any
}

export type GeneralLineDataMap = {
  category: any
  categoryTitle?: any
  value: any
  series?: any
  seriesTitle?: any
  stack?: string
}

export type GeneralPieDataMap = {
  item: any
  itemTitle?: any
  value: any
}

export type GeneralRadarDataMap = {
  indicator: string
  indicatorTitle?: string
  value: number
  series?: string
  seriesTitle?: string
  min?: number
  max?: number
}

export type CustomDataMap = {
  value: number
  series?: string
  seriesTitle?: string
}
