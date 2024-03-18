export interface TextStyle {
  fontFamily?: string
  fontSize: number
  color: any
  fontWeight: any
  letterSpacing?: number | string // 文字间距
  textAlign?: any
}

export interface ProgressText extends TextStyle {
  display: any
}

export interface TrackConfig {
  display?: boolean
  thickness: number
  color: string
  radius: number
}

export interface SliderConfig {
  size: number
  color: string
  radius: number
}
export interface Horcroll {
  display: boolean // 是否显示滚动条
  showType?: 'all' | 'hover'
  trackConfig?: TrackConfig // 轨道
  sliderConfig?: SliderConfig //滑块
}

export interface GlobalConfig {
  showType: 'fixedHeight' | 'adaptiveContent'
  topLine: number // 置顶行数
  topBgColor: string // 置顶背景颜色
  rowsNumber: number // 表格显示行数
  textSpacing: number // 字间距
  horcroll?: Horcroll // 水平滚动配置
  updated: boolean // 即可更新
}

export interface BorderConfig {
  display?: boolean
  borderd?: boolean
  borderColor: string
  borderWidth: number
  borderRadius?: number
}
export interface CarouselConfig {
  interval: number // 时间间隔
  display: boolean // 是否轮播
  fixedBg: boolean // 固定背景
  animateMode: 'all' | 'one' // 动画模式  all one

  // one
  animatConnect?: 'headTail' | 'startAgain' // 动画衔接 headTail首尾衔接  startAgain重头开始

  // all
  animationEffect?: 'bottomUp' | 'flop'
  direction?: 'up' | 'down'

  duration: number // 动画时间
  animateStep?: number // 动画步长
  speed: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' // 匀速 慢快慢 低速开始 低速结束 低速开始和结束
}

export interface ColorConfig {
  color: any
}

export interface HeaderConfig {
  display: boolean // 是否显示
  height: number // 行高
  bgColor?: ColorConfig
  headerStyle?: TextStyle
}

export interface SubTitle {
  display: boolean
  field: string
  textStyle: TextStyle
  space?: number
  position: 'onBefore' | 'onAfter'
}

export interface Suffix {
  display: boolean
  content: string | number
  textStyle: TextStyle
}

export interface NumberFormat {
  // 数字格式化配置
  display: boolean
  decollate: boolean
  decimal: number
  round: boolean
  percentage?: boolean
  negativeing?: string //  负数显示值  负号 minus  括号 brackets  绝对值  abs
  zeroFill?: boolean
}

interface ProgressColor {
  display: boolean
  startColor: string
  endColor: string
  multiColor?: any // 进度条多色
}
export interface SectionStyle {
  min?: number
  max?: number
  minDate?: string
  maxDate?: string
  progressMin?: number
  progressMax?: number
  progressColor?: ProgressColor // 区间内进度条颜色
  color: string
  fontWeight: number | string
  fontSize: number
}

export interface DataForMat {
  display: boolean
  date: { display: boolean; forMat: string }
  time: { display: boolean; forMat: string }
}

export interface StatusBgConfig {
  display: boolean
  xOffset: number
  yOffset: number
  width: number
  height: number
  radius: number
  color: string
  imgUrl: string
}

export interface StatusTextStyle extends TextStyle {
  display: boolean
  xOffset: number
  yOffset: number
}
export interface StatusNormalStyle {
  bgConfig: StatusBgConfig
  borderConfig: BorderConfig
  textStyle: StatusTextStyle
}

export interface StatusStyle extends StatusNormalStyle {
  statusVal: number | string
}

export interface ProgressOutline {
  display: boolean
  xPadding: number
  yPadding: number
  bgColor: string
  borderColor: string
  borderWidth: number
  fillet: number
}

export interface TipConfig {
  display: boolean
  position: 'top' | 'bottom' //'top' 'bottom'
  xPadding: number
  yPadding: number
  maxHeight: any
  maxWidth: any
  bgColor: string
  radius: number
  border?: BorderConfig
  textStyle?: TextStyle
}

export interface ColumnArr {
  // 列配置
  field: string
  colName: string
  colWidth: number
  colSpeed: number
  alignType?: string
  horOffset: number
  verOffset: number
  borderStyle: BorderConfig
  contentType: string //内容类型
  // 文字时的配置
  contentOverflow?: 'ellipsis' | 'lineFeed' | 'slidetitle' // 内容溢出 ellipsis 省略号  lineFeed换行 slidetitle 跑马灯
  interval?: number // 跑马灯时的时间
  constantPlay?: boolean // 定速播放
  constanDuration?: number // 定速播放时间

  textStyle?: TextStyle
  subTitle?: SubTitle // 副标题
  suffix?: Suffix // 后缀
  // contentOverflow 为 显示省略号时
  tipConfig?: TipConfig
  // 数字时的配置
  numberFormat?: NumberFormat
  sectionStyleFlag?: boolean // 数字区间样式  日期样式区间  进度条区间
  sectionStyle?: SectionStyle[]
  // 图片时配置
  imageWidth?: number
  imageHeight?: number
  // 日期时的配置
  dataForMat?: DataForMat
  // 进度条时的配置
  progressText?: ProgressText // 进度条文字配置
  progressMaxValType?: 'filedMax' | 'custom' // 最大值
  progressMaxVal?: any // 进度条最大值

  progressType?: any // line 条形  栅格 grid

  progressWidth?: number
  progressHeight?: number
  progressColorType?: 'bicolor' | 'multicolor' // 颜色类型
  progressStartColor?: string // 进度条起始颜色
  progressEndColor?: string // 进度条终止颜色
  multiColor?: any // 进度条多色

  progressOutline?: ProgressOutline
  // 状态时的配置
  statusNormalstyle?: StatusNormalStyle
  statusStyle?: StatusStyle[]
}

export interface LineStyleConfig {
  bgColor?: ColorConfig
  leftOffSet: number
  opacity: number
  radius: number
}
export interface LineConfig {
  lineSpeed: number
  yPadding: number
  borderStyle?: BorderConfig
  lineStyle?: LineStyleConfig[]
}

export interface ShadowConfig {
  display: boolean
  color: string
  xOffset: number
  yOffset: number
  vague: number
}

export interface SerialStyleList {
  serialVal: string | number | null | undefined
  textStyle?: StatusTextStyle
  bgConfig?: StatusBgConfig
  borderConfig?: BorderConfig
  shadowConfig?: ShadowConfig
}
export interface SerialCol {
  display: boolean
  headerTitle: string
  inintNumber: number
  colWidth: number
  colSpac: number
  alignType?: string
  serialStyle?: TextStyle
  serialStyleList?: SerialStyleList[]
}

export interface SeriesBgColor {
  display: boolean
  color: any
  opacity: number
  radius: number
}
export interface LineStyle {
  display: boolean
  border: BorderConfig
  bgConfig: SeriesBgColor
}

export interface SeriesFontStyle extends TextStyle {
  display: boolean
}

export interface SeriesStyle {
  condition: string
  seriesLineStyle: LineStyle
  seriesTextStyle: SeriesFontStyle
}

export interface EmptyDataStyle {
  display: boolean
  bgColor: string
  image?: {
    display: boolean
    xOffset: number
    yOffset: number
    imgUrl: string
    width: number
    height: number
  }
  text?: {
    display: boolean
    content: string
    xOffset: number
    yOffset: number
    textStyle?: TextStyle
  }
}

export type ChangeHandler = (data: any) => void

export type TIMER = { timer: any; timerTwo: any; timerThree: any }

export interface CarouseTableProps {
  w?: number
  h?: number
  id?: string
  globalConfig?: GlobalConfig // 全局
  header?: HeaderConfig //表头
  carousel?: CarouselConfig //动画配置
  serialCol?: SerialCol // 序号列配置
  customCol?: ColumnArr[] // 自定义列
  lineconfig?: LineConfig // 行配置
  seriesStyle?: SeriesStyle[] // 条目样式
  emptyDataStyle?: EmptyDataStyle
  data?: any
  onClick?: ChangeHandler
  onMouseenter?: ChangeHandler
  onMouseleave?: ChangeHandler
}
