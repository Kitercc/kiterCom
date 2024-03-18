import { DropDownProps } from 'antd'
import { ScrollConfig } from '../LczColumnTable/type'
import { OptionBoxConfig } from '../LczSelect/type'

export type DataMap = {
  id: number | string
  parentTitle?: string
  content?: string
  itemGroup?: boolean
  type?: string
}

export type FilterDataMap = {
  id: number | string
  content?: string
  itemGroup?: boolean
  children?: any[]
  level: number
}

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color?: string
  fontWeight: any
  letterSpacing: number | string // 文字间距
}
export interface BorderStyle {
  display: boolean
  color: string
  width: number
  radius: number
}

export interface PlainStyleConfig {
  rowBgColor: string
  rowColor: string
}

export interface HoverStyleConfig {
  hoverType: boolean
  rowHoverBgColor: string
  rowHoverColor: string
}

export interface ActiveStyleConfig {
  activeType: boolean
  rowActiveBgColor: string
  rowActiveColor: string
}

export interface OptionLine {
  lineHeight: number // 行高
  rowSpacing: number // 行距
  downBoxLeftOffset: number // 下拉框内容左偏移
  plainStyle: PlainStyleConfig
  hoverStyle: HoverStyleConfig
}

export interface DropDownConfig {
  dropHeight: any
  dropWidth: number
  placement: DropDownProps['placement']
  xOffset: number
  yOffset: number
  dropBgColor: string
  dropBorderStyle: BorderStyle
  parentStyle: PlainStyleConfig
  optionLine: OptionLine
  horcroll?: ScrollConfig
}

export type IconSeries = {
  type: string | number
  iconType: 'system' | 'custom' | 'more'
  iconValue?: IconValueType
  moreIconValue?: IconValueType
  iconColor?: string
  iconHoverColor?: string
  imgUrl?: string
  hoverImgUrl?: string
}

export interface OptionIcon {
  display: boolean
  occupy: boolean
  width: number
  height: number
  distance: number
  iconSeries?: IconSeries[]
}

type HanglerClick = (parmas: DataMap) => void

export interface DropdownProps {
  trigger?: any // 触发方式  // click  hover
  name?: string | { value: any }
  globalStyle?: TextStyle
  optionBoxConfig?: OptionBoxConfig // 选项框配置
  dropdownConfig?: DropDownConfig
  optionIcon?: OptionIcon
  onClick?: HanglerClick
  data?: DataMap[]
}
