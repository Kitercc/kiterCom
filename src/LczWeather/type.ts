import { CSSProperties } from 'react'

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number // 文字间距
  italics: boolean
}

/**天气信息布局 */
export interface weatherLayou {
  flexDirection: string //天气排序方式
  alignItems: string //天气水平对齐
  reverseSort: boolean //天气反向排序
}

/**天气名称 */
export interface weatherTitleInfo {
  display: boolean
  horOffset: number
  verOffset: number
  TextStyle: TextStyle //文本样式
}

/**温度 */
export interface temperatureInfo {
  display: boolean
  horOffset: number
  verOffset: number
  connectors: string //链接符
  TextStyle: TextStyle
  tempSuffix: tempSuffix //温度后缀
}

/**温度后缀 */
export interface tempSuffix {
  display: boolean
  content: string
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number // 文字间距
  italics: boolean
}

/**风 */
export interface windInfo {
  display: boolean
  horOffset: number
  verOffset: number
  TextStyle: TextStyle //文本样式
}

export interface globalConfig {
  citySelect: { label: string; value: string }
  iconLetterSpace: number
  weatherLayout: weatherLayou //天气信息布局
  iconInfo: iconInfo //图标信息
}

export interface iconInfo {
  display: boolean
  site: string
  iconSeries: any[]
}

/**天气信息 */
export interface weatherConfig {
  minSpace: number
  weatherTitleInfo?: weatherTitleInfo
  temperatureInfo?: temperatureInfo
  windInfo?: windInfo
}

/**数据配置信息 */
export interface dataMap {
  weather: string //天气状态
  mintemperature: number | string //最低温度
  maxtemperature: number | string //最高温度
  winddirection: string //风向
  windlevel: string //风力
}
/**天气组件配置 */
export interface lczWeatherConfig {
  globalConfig: globalConfig
  weatherConfig: weatherConfig
  data?: dataMap[] // 标题的内容，配置后会覆盖标题名配置项的内容。
}
