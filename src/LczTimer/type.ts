export interface TextStyle {
  fontFamily: string
  fontSize?: number
  color: string
  fontWeight?: any
  letterSpacing?: number | string // 文字间距
}

interface IconConfig {
  display?: boolean
  iconStatus?: boolean
  iconStyle?: 'linearrect' | 'fillrect' | 'fillsquare'
  yOffset?: number
  iconSize?: number | string // icon 尺寸
  iconColor?: any
}

export interface TimerForMat {
  date: { display: boolean; forMat: string }
  time: { display: boolean; forMat: string }
}

interface TimerConfig {
  interval?: number // 时间间隔
  format?: TimerForMat // 时间格式
  textStyle?: TextStyle // 文字样式
}
export interface TimerProps {
  horizon?: string // 水平对齐方式
  distance?: number | string // 图标与文本之间的距离
  iconConfig?: IconConfig
  timerConfig?: TimerConfig
  data?: any
}
