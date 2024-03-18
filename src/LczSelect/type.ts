import { ClearIcon } from '../LczCascader/type'
import { ScrollConfig } from '../LczColumnTable/type'

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color?: string
  fontWeight: any
  letterSpacing: number
}

export interface OptionType {
  id: number | string
  content: string
  type?: string | number
}

export interface BoxBorderStyle {
  display?: boolean
  bordered?: boolean // 是否显示边框
  boxBorderC?: string // 选项框边框颜色
  boxBorderW?: number // 选项框边框宽度
  boxRadius?: number //选项框圆角
  boxHoverBorderC?: string //选项框边框悬浮颜色
  boxFocusBorderC?: string //选项框边框激活颜色
}

export interface IconConfig {
  display?: boolean
  type?: string // system custom
  iconValue?: IconValueType
  iconColor?: string
  iconSize?: number
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number
  rightOffset?: number
  animate?: boolean
}

export interface CloseIcon {
  color?: string
}

export interface TagConfig {
  tagBgColor?: string
  tagRadius?: number
  speed?: number
  tagBorderColor?: string
  tagBorderWidth?: number
  iconColor?: string
  // closeIcon?: CloseIcon
}

export interface BoxColorConfig {
  textStatus?: boolean
  display?: boolean
  color?: string
  signOverflow?: 'hidden' | 'linefeed' | 'ellipsis'
  multipleOverflow?: 'hidden' | 'linefeed'
}

export interface SelectIcon {
  display: boolean
  width: number
  height: number
  contSpacing: number
}
export interface OptionBoxConfig {
  boxBgColor?: string //选项框背景颜色
  boxColor?: BoxColorConfig // 文字颜色
  boxTextAlign?: 'left' | 'right'
  boxLeftOffset?: number // 选项框左偏移
  boxRightOffset?: number //
  boxTopOffset?: number
  boxBottomOffset?: number
  iconConfig?: IconConfig // 图标配置
  selectIcon?: SelectIcon // --- 12/7 add 选中图标
  boxBorderStyle?: BoxBorderStyle // 选相框边框配值
  tagConfig?: TagConfig // 多选时tag 配置
  clearIcon?: ClearIcon
}

export interface PlainStyleConfig {
  rowBgColor?: string
  rowColor?: string
  checkColor?: string
}

export interface HoverStyleConfig {
  hoverType?: boolean
  rowHoverBgColor?: string
  rowHoverColor?: string
}

export interface ActiveStyleConfig {
  activeType?: boolean
  rowActiveBgColor?: string
  rowActiveColor?: string
  aCheckColor?: string
  aTickColor?: string
}

export interface SearchConfig {
  display?: boolean
  searchStatus?: boolean
  topBottomMargin?: number
  leftMargin?: number
  height?: number
  width?: number
  bgColor?: string
  borderStyle: BoxBorderStyle
  iconColor?: string
  textColor?: string
}

export interface OptionLine {
  checkType?: string // 下拉框勾选状态  tick check
  itemLineHeight?: number | string // 行高
  itemRowSpacing?: number | string // 行距
  downBoxLeftOffset?: number | string // 下拉框内容左偏移
  plainStyle?: PlainStyleConfig
  hoverStyle?: HoverStyleConfig
  activeStyle?: ActiveStyleConfig
}
export interface DownBoxConfig {
  pushUp?: boolean
  downBoxHeight?: number // 下拉框的高
  downBoxWidth?: number // 下拉框的宽
  leftOffset?: number // 水平偏移
  topOffset?: number // 顶部偏移
  downBoxBgColor?: string // 下拉框背景颜色
  optionLine?: OptionLine // 选项行配置
  downBoxBorderStyle?: BoxBorderStyle // 下拉框边框
  searchConfig?: SearchConfig // 搜索框配置对象
  horcroll?: ScrollConfig
}

export interface IconSeries {
  type: string
  iconType: 'system' | 'custom'
  iconValue: IconValueType
  normalColor: any
  hoverColor?: { display: boolean; value: any }
  focusColor?: { display: boolean; value: any }
  normalImgUrl: string
  hoverImgUrl?: { display: boolean; value: string }
  focusImgUrl?: { display: boolean; value: string }
}
export interface OptionIcon {
  occupy: boolean
  contSpacing: number
  width: number
  height: number
  iconSeries?: IconSeries[]
}

type Handler = (param: any) => void

export interface DropDownBoxProps {
  xOffset?: number
  mode?: any //  single multiple
  currentType?: 'index' | 'id'
  singleIndex?: { value: number | null }
  singleId?: { value: string | number | null }
  multipleIndex?: { value: string | null }
  multipleId?: { value: string | null }
  optionBoxConfig?: OptionBoxConfig // 选项框配置
  downBoxConfig?: DownBoxConfig // 下拉框的配置
  textStyle?: TextStyle // 文字样式
  optionIcon?: OptionIcon
  data?: OptionType[] // 下拉组件配置项
  onChange?: Handler // 状态改变
  onClick?: Handler // 点击
}
