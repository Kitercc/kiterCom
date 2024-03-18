export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing?: number
}
export interface ColorConfig {
  colorString?: string
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
  numberbits?: number // 数据位数
  numDo?: number // 保留小数 小数点位数
  digit?: number // 分割位数
  rounding?: boolean // 四舍五入
}

export interface SymbolCustom {
  divider?: string // 千分位分割符
  decimal?: string // 小数点符号
}

export interface NumberConfig {
  numberBg?: NumberBg // 翻牌器背景
  widthAdaptation?: boolean // 宽度自适应
  numberAnimate?: NumberAnimate // 翻牌器动画
  numberFormat?: NumberFormat // 数字格式化
  symbolCustom?: SymbolCustom // 符号自定义
  textStyle?: TextStyle //翻牌器数字style样式
}

// 翻牌器配置项
export interface ScrollCountConfig {
  numberConfig?: NumberConfig // 翻拍器数值
}

export interface NumberProps {
  len?: number
  refresh?: boolean
  scrollCountConfig?: ScrollCountConfig // 翻牌器配置
  defaultValue?: number // 默认值
  data?: any // 其他数据
  numColor?: { color: string; colorType: string; fontSize: number; fontWeight: any }
  onDataChange?: any //当请求完成或数据变化时触发
  onClick?: any //当鼠标点击时触发
}
