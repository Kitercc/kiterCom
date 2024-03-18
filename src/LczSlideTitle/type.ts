export interface ColorConfig {
  colorString: any
}
export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: ColorConfig
  fontWeight: any
  letterSpacing?: number | string // 文字间距
}
interface AnimateConfig {
  display?: boolean
  carousel?: boolean // 是否轮播
  alwayAnimate?: boolean // 溢出动画
  constantPlay?: boolean // 定速播放
  duration?: number // 文字跑一圈需要的时间 // 定数关闭启时 1000
  constanDuration?: number // 文字跑一圈需要的时间 // 定数关闭启时 1000
  earlyStay?: number // 前期停留时间
  lateStay?: number // 后期停留时间
}
export interface SlideTitleProps {
  w?: number
  value?: string // 内容
  textStyle?: TextStyle // 文字样式
  style?: any
  animateConfig?: AnimateConfig //动画配置
  children?: any
  data?: any // 其他数据
  defaultValue?: string // 默认数据
}
