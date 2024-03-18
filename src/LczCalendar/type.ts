export interface TextStyle {
  display?: boolean
  fontsize?: number
  color?: string
  fontweight?: string
}
export interface Border {
  display?: boolean
  color?: string
  width?: number
  radius?: number
}
export interface GlobalConfig {
  calendarType: string
  defaultValue: any
  edge: Edge
  interval: number
  bgColor: string
  globalBorder: Border
  globalTextStyle: GlobalTextStyle
}
export interface Edge {
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export interface GlobalTextStyle {
  fontFamily?: string
  letterSpacing?: number
}

export interface YearToMonthConfig {
  height: number
  alignment: string
  letterSpacing: number
  switchButton: SwitchButton
  choiceYearOrMonth: ChoiceYearOrMonth
}
export interface SwitchButton {
  location: string
  normalStyle: NormalStyle
  hoverStyle: SwitchStyle
  activeStyle: SwitchStyle
}
export interface NormalStyle {
  buttonWidth?: number
  bgColor?: string
  border?: Border
  textStyle?: TextStyle
}
export interface SwitchStyle {
  Switch?: boolean
  bgColor?: string
  border?: Border
  textStyle?: TextStyle
}
export interface ChoiceYearOrMonth {
  edge: number
  fontSize: number
  inputStyle: InputStyle
  choicePanel: ChoicePanel
}
export interface InputStyle {
  yearWidth: number
  MonthWidth: number
  contentLeft: number
  normalStyle: NormalStyle
  hoverStyle: SwitchStyle
  activeStyle: SwitchStyle
}
export interface ChoicePanel {
  bgColor: string
  border: Border
  lingHeight: number
  lineMargin: number
  normalStyle: NormalStyle
  hoverStyle: SwitchStyle
  activeStyle: SwitchStyle
}
export interface CalendarPanelConfig {
  rowMargin: number
  columnMargin: number
  cutOffLine: CutOffLine
  week: TextStyle
  calendarGrid: CalendarGrid
}
export interface CutOffLine {
  display?: boolean
  color?: string
  width?: number
  today?: string
}
export interface CalendarGrid {
  edge: Edge
  dateLocation: string
  normalStyle: CalendarGridNormalStyle
  hoverStyle: SwitchStyle
  activeStyle: SwitchStyle
}
export interface CalendarGridNormalStyle {
  bgColor: string
  CalendarGridNormalTextStyle: CalendarGridNormalTextStyle
}
export interface CalendarGridNormalTextStyle {
  fontsize?: number
  color?: string
  fontWeight?: string
  notToday?: string
}
export interface TipConfig {
  topOfMargin: number
  horAlignment: string
  margin: number
  tipTextStyle: TipTextStyle
  iconConfig: IconConfig
}
export interface TipTextStyle {
  fontsize: number
  color: string
  fontWeight: string
  lineHeight: number
  lineBr: boolean
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconConfig {
  display: boolean
  height: number
  width: number
  styleSeries: StyleSeries[]
  iconSeries: IconSeries[]
}

export interface StyleSeries {
  iconType?: string // system 系统 custom 自定义
  color?: string
  iconValue?: IconValueType
  imgSrc?: string
}
export interface IconSeries {
  typeName?: string
  iconType?: string // system 系统 custom 自定义
  color?: string
  iconValue?: IconValueType
  imgSrc?: string
}
export interface DataMap {
  date: string
  id: any
  content: any
  type: any
}
export interface CalendarProps {
  globalConfig: GlobalConfig
  yearToMonthConfig: YearToMonthConfig
  calendarPanelConfig: CalendarPanelConfig
  tipConfig: TipConfig
  w?: number
  h?: number
  data?: DataMap[]
  onChange?: any
  onClick?: any
  onDoubleClick?: any
}
