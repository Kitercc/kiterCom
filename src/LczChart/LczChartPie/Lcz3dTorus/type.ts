import { NumberFormat } from '../../../LczCarouselTable/type'
import { GeneralPieDataMap } from '../../common/type'

export interface TextStyle {
  display?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  letterSpacing?: number
  fontStyle?: string
}

export interface CameraSettings {
  // deviation?: { x: number | null; y: number | null }
  visualAngle: number
  sightDistance: number
}

export interface IconConfig {
  iconType: 'system' | 'custom' | 'svg'
  // system
  systemStyle: 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
  // custom
  customUrl: string
  // svg
  svgPath?: string
}

export interface Proportion extends TextStyle {
  display: boolean
  decimal?: number
  speed?: number
  colorFollow?: boolean
  displayWidth?: any
  charNums?: any
}

export interface TureValue extends Proportion {
  display: boolean
  speed: number
  numberformat?: NumberFormat
  prefix?: Prefixsuffix
  suffix?: Prefixsuffix
}

export interface Prefixsuffix extends Proportion {
  display: boolean
  content: string
  xOffset: number
  yOffset: number
}

export interface Layout {
  distributionMode: 'unilateral' | 'bothSides'
  itemGap: number
  // unilateral
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

export interface SeriesTextStyle extends TextStyle {
  displayWidth?: any
  charNums?: any
}

export interface LegendConfig {
  display: boolean
  size?: { w: number; h: number }
  iconConfig?: IconConfig //图例图标
  seriesName?: SeriesTextStyle
  displayAlign?: 'left' | 'right' | 'center'
  trueValue?: TureValue // 真实值
  proportion?: Proportion // 占比值
  layout?: Layout
  clickInt?: {
    display?: boolean
    clicked?: boolean
    disableStyles: string
  }
}

export interface GlobalConfig {
  margin?: { t: number; l: number }
  bgColor: string
  cameraSettings?: CameraSettings
  sort?: 'normal' | 'diminishing' | 'increasing'
  legendConfig?: LegendConfig
}

export interface PieConfig {
  innerOutRadiusRatio: number
  contour: boolean // 等高
  height: number
  minHeight: number
  maxHeight: number
}

export interface CurrentSeriesName extends TextStyle {
  xOffset: number
  yOffset: number
}

export interface CurrentProportion extends CurrentSeriesName {
  decimal: number
  colorFollow: boolean
}

export interface CurrentTrueValue extends CurrentSeriesName {
  colorFollow: boolean
  numberformat?: NumberFormat
  currentPrefix?: Prefixsuffix
  currentSuffix?: Prefixsuffix
}

export interface CurrentValue {
  display: boolean
  position?: { x: number; y: number }
  spacing: number
  currentSeriesName?: CurrentSeriesName
  currentProportion?: CurrentProportion
  currentTrueValue?: CurrentTrueValue
}
export interface PieChartProper {
  pieConfig?: PieConfig
  currentValue?: CurrentValue
}

export interface DataSeries {
  map?: { fieldName: string; displayName: string }
  color: any
}
export interface Series {
  dataSeries?: DataSeries[]
}

export interface RotateAnimation {
  animateDis: boolean
  current?: { highGrowth: number; opacity: number }
  interval: number
  interactionMode: 'none' | 'click' | 'mouseover'
}

export type DataMap = { item: any; itemTitle?: string; value: number }

export interface Lcz3dTorusprops {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  pieChartProper?: PieChartProper
  rotateAnimation?: RotateAnimation
  series?: Series
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
  onChange?: (param: GeneralPieDataMap) => void
}
