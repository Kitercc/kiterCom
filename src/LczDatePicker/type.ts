export interface TextStyle {
  fontFamily: string
  fontSize: number
  color?: string
  fontWeight: any
  letterSpacing: number
}

export interface DateRange {
  startType?: string
  startDate?: string
  endType?: string
  endDate?: string
}

export interface GlobalStyle {
  pickerType?: 'data' | 'month'
  fontFamily: string
  letterSpacing: number
  dateRange?: DateRange // 日期可选范围
}

export interface TextBoxBorder {
  display: boolean
  borderColor?: string // 边框颜色
  borderWidth?: number // 边框宽度
  borderRadius?: number | string // 边框圆角
  boxHoverBorderC?: string // 边框悬浮色
  boxFocusBorderC?: string // 边框激活色
}

export interface BoxIcon {
  display: boolean
  boxIconSize?: number
  boxIconColor?: string
  boxIconSpac?: number
  boxIconOffSetLeft?: number
}

export interface BoxTextStyle {
  fontSize?: number
  color?: string
  fontWeight?: any
}

export interface ClearIcon {
  display: boolean
  iconSize?: number
  color?: string
  rightOffSet?: number
}

export interface TextBoxConfig {
  boxBgColor?: string
  textBoxBorder?: TextBoxBorder // 边框样式
  dateSymbol?: string // 日期分割符
  boxTextStyle?: BoxTextStyle // 文本样式
  textAlign?: string
  boxIcon?: BoxIcon // 日历图标样式
  clearIcon?: ClearIcon // 清空图标设置
}

export interface YearsStyle {
  fontSize: number
  color?: string
  fontWeight: any
}

export interface DateStyle {
  fontSize: number
  color?: string
  fontWeight: any
  divisionColor?: string
  divisionWidth?: number | string
  focusTextColor?: string
  focusBgcolor?: string
}
export interface DatePickerConfig {
  pickerTopOffset?: number
  pickerAlign?: 'left' | 'right'
  pickerLeftOffset?: number

  pickerBgColor?: string
  pickerBorderColor?: string
  pickerBorderWidth?: number | string
  PickerRadius?: number | string
  dataYearsStyle?: YearsStyle
  dataDateStyle?: DateStyle
  monthYearsStyle?: YearsStyle
  monthDateStyle?: DateStyle
}

type dataMap = {
  date: string | number
  startdate: string
  enddate: string
}

export interface DatePickerProps {
  defaultValue?: string
  globalStyle?: GlobalStyle // 全局样式
  textBoxConfig?: TextBoxConfig // 文本框配置
  datePickerConfig?: DatePickerConfig // 日历下拉框配置
  placeholder?: string
  data?: dataMap[]
  onChange?: any
}
