export interface TextStyle {
  fontFamily: string
  fontSize: number
  color?: string
  fontWeight: any
  letterSpacing: number
}

export interface DateDefaultValue {
  display: boolean
  dateStartTime: { value: any }
  dateEndTime: { value: any }
}

export interface DateChoiceSection {
  display: boolean
  dateMinTime: { value: any }
  dateMaxTime: { value: any }
}
export interface GolbalTextStyle {
  fontFamily?: string
  letterSpacing?: number
}
export interface GlobalStyle {
  pickerType: string
  startIsNull: boolean
  endIsNull: boolean
  dateDefaultValue?: DateDefaultValue // 日期可选范围
  dateChoiceSection?: DateChoiceSection
  golbalTextStyle?: GolbalTextStyle
}

export interface TextBoxConfig {
  sectionSymbl: string // 区间分割符
  leftAndRightMargin: number //左右边距
  boxBgColor?: string //背景颜色
  borderRadius?: number | string // 边框圆角
  textBoxBorder?: TextBoxBorder // 边框样式
  inputTextStyle?: InputTextStyle // 文本样式
  boxIcon?: BoxIcon // 日历图标样式
  clearIcon?: ClearIcon // 清空图标设置
}
export interface TextBoxBorder {
  display: boolean
  borderColor?: string // 边框颜色
  borderWidth?: number // 边框宽度
  boxHoverBorderC?: string // 边框悬浮色
  boxFocusBorderC?: string // 边框激活色
}
export interface InputTextStyle {
  fontSize?: number
  color?: string
  fontWeight?: any
  placeholderColor?: any
}

export interface BoxIcon {
  display: boolean
  boxIconLocation?: string | number
  boxIconSize?: number
  boxIconColor?: string
}

export interface ClearIcon {
  display: boolean
  iconSize?: number
  color?: string
}
export interface PickerBoder {
  display: boolean
  color: string
  width: number | string
}
export interface CutoffRule {
  color: string
  width: number | string
}

export interface PanelHead {
  fontSize: number
  fontWeight: any
  defaultColor: string
  hoverColor: string
  toggleButton: ToggleButton
}
export interface ToggleButton {
  color: string
  hoverColor: string
}
export interface DefaultStyle {
  fontSize: number
  fontWeight: any
  color: string
  notTodayColor: string
  bgHoverColor: string
  hoverColor: string
}

export interface CurrentTime {
  display: boolean
  color: string
  bgcolor: string
  currrentTimeBorder: CurrentTimeBorder
}
export interface CurrentTimeBorder {
  display: boolean
  color: string
  width: number | string
}
export interface SelectedArea {
  bgcolor: string
  selectTime: SelectTime
}
export interface SelectTime {
  color: string
  bgcolor: string
}
export interface ExtendArea {
  display: boolean
  extendAreaBorder: ExtendAreaBorder
}
export interface ExtendAreaBorder {
  display: boolean
  borderType: string | number
  color: string
  width: number | string
}
export interface CutdownArea {
  display: boolean
  bgcolor: string
}
export interface DisabledArea {
  color: string
  bgcolor: string
}

export interface RapidSeries {
  rapidDateType: string
  rapidMonthType: string
  rapidYearType: string
  optionDateName: any
  rapidDateStartTime: any
  rapidDateEndTime: any
  optionMonthName: any
  rapidMonthStartTime: any
  rapidMonthEndTime: any
  optionYearName: any
  rapidYearStartTime: any
  rapidYearEndTime: any
}
export interface RapidOption {
  display: boolean
  location: string
  width: number | string
  areaMargin: AreaMargin
  optionMargin: number
  rapidTextStyle: RapidTextStyle
  rapidSeries: RapidSeries[]
}
export interface AreaMargin {
  topMargin: number
  bottomMargin: number
  leftMargin: number
  rightMargin: number
}
export interface RapidTextStyle {
  fontSize: number
  fontWeight: any
  color: string
  rapidTextHoverStyle: RapidTextHoverStyle
}
export interface RapidTextHoverStyle {
  display: boolean
  fontSize: number
  fontWeight: any
  color: string
}
export interface DatePickerConfig {
  pickerTopOffset: number
  pickerAlign: 'left' | 'right'
  pickerLeftOffset: number

  pickerBgColor: string
  PickerRadius: number | string
  pickerBoder?: PickerBoder //选择面板边框
  cutoffRule?: CutoffRule //选择面板分割线
  panelHead?: PanelHead //选择面板面板头
  defaultStyle?: DefaultStyle //默认样式
  currentTime?: CurrentTime //当前时间样式
  selectedArea?: SelectedArea //选中区域样式
  extendArea?: ExtendArea //延伸区域样式
  cutdownArea?: CutdownArea //缩短区域样式
  disabledArea?: DisabledArea //禁用区域
  rapidOption?: RapidOption //快捷选项
}

type dataMap = {
  startdate: string
  enddate: string
  mindate: string
  maxdate: string
}

export interface DateIntervalProps {
  globalStyle: GlobalStyle // 全局样式
  textBoxConfig: TextBoxConfig // 文本框配置
  datePickerConfig: DatePickerConfig // 日历选择面板配置
  data?: dataMap[]
  onChange?: any
}
