export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: any
  fontWeight: any
  letterSpacing?: number
  italics?: boolean
}

export interface PrefixConfig {
  prefixStatus?: boolean // 前缀状态
  prefixStyle?: TextStyle // 前缀文字样式
  prefix?: string // 前缀符号
  verticalOffset?: number // 前缀垂直偏移
}
export interface SuffixConfig {
  suffixStatus?: boolean // 后缀状态
  suffixStyle?: TextStyle // 后缀文字样式
  suffix?: string // 后缀符号
  verticalOffset?: number // 后缀垂直偏移
}
export interface ColorConfig {
  colorString?: any
}
export interface NumberBg {
  display?: boolean
  verMargin?: number
  horMargin?: number
  numBoxRadius?: number | string // 翻牌器圆角
  numBgColor?: ColorConfig // 翻牌器单个背景颜色
  numBoxBg?: string // 翻牌器背景图片
  separateBg?: boolean // 分割位是否展示背景图或背景颜色
}

export interface NumberAnimate {
  display?: boolean
  scrollType?: string // 翻牌器滚动方式 roll  翻动 turn 滚动
  speed?: number // 数字翻动速度
  takeRatio?: number // 动画起跳占比
}

export interface NumberFormat {
  display?: boolean
  numberbits?: number // 数据位数
  numDo?: number // 保留小数 小数点位数
  digit?: number // 分割位数
  rounding?: boolean // 四舍五入
  negativeing?: string // 负数显示值  minus 负号  brackets 括号  abs 绝对值
}

export interface SymbolCustom {
  display?: boolean
  symbolStatus?: boolean
  divider?: string // 千分位分割符
  decimal?: string // 小数点符号
  plusSign?: string // 正号
  minusSign?: string // 负号
  flat?: string // 持平
  symbolSpeed?: number
  symbolSize?: number
}

export interface SectionStyle {
  min: number
  max: number
  colorConfig: { display: boolean; color: any }
  fontWeight: number | string
  fontSize?: number
}

export interface NumberConfig {
  numberBg?: NumberBg // 翻牌器背景
  widthAdaptation?: boolean // 宽度自适应
  numberAnimate?: NumberAnimate // 翻牌器动画
  numberFormat?: NumberFormat // 数字格式化
  symbolCustom?: SymbolCustom // 符号自定义
  textStyle?: TextStyle //翻牌器数字style样式
  sectionStyleFlag?: boolean // 数字区间样式
  sectionStyle?: SectionStyle[]
}

// 翻牌器配置项
export interface NumberFlopConfig {
  prefixDistance?: string | number // 前缀与数字的距离
  suffixDistance?: string | number // 后缀与数字的距离
  prefixConfig?: PrefixConfig // 翻牌器前缀配置
  suffixConfig?: SuffixConfig // 翻牌器后缀
  numberConfig?: NumberConfig // 翻拍器数值
}

export interface TitleConfig {
  display?: boolean // 控制标题的显示隐藏
  name?: string //翻页器标题内容
  defaultName?: string // 默认翻页器标题
  titleStyle?: TextStyle // 标题样式
}

type DataMap = {
  value: number
  name?: string
  prefix?: string
  suffix?: string
}

type handlerChangeType = (param: DataMap) => void
export interface NumberFlopProps {
  titleConfig?: TitleConfig // 标题配置
  scrollCountConfig?: NumberFlopConfig // 翻牌器配置
  defaultValue?: number // 默认值
  titlePosition?: string // 标题位置
  titleDistance?: string | number // 标题与数字的间距
  alignment?: string // 标题与翻牌器 垂直对齐方式
  data?: DataMap[] // 其他数据
  onDataChange?: handlerChangeType //当请求完成或数据变化时触发
  onClick?: handlerChangeType //当鼠标点击时触发
  onMouseenter?: handlerChangeType
  onMouseleave?: handlerChangeType
}
