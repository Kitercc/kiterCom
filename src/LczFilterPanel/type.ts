import { ActiveStyleConfig, HoverStyleConfig, OptionIcon, PlainStyleConfig } from '../LczSelect/type'

export interface TextStyle {
  fontFamily: string
  color?: string
  fontWeight: any
  letterSpacing: number
}

export interface DataMap {
  id: number | string
  content: number | string
  type?: number | string
}

export interface ArrowConfig {
  display: boolean
  position: string
  offset: number // 偏移
  size: number
}

export interface FilterSearchConfig {
  searchStatus?: boolean
  display?: boolean
  topBottomMargin: number
  leftMargin: number
  height: number
  bgColor: string
  iconColor: string
  textColor: string
  boxBorderC: string
  boxBorderW: number
  boxFontSize: number
  radius: number
}

export interface FilterPlainStyle extends PlainStyleConfig {
  fontSize: number | string
}

export interface OptionLine {
  checkType?: string // 下拉框勾选状态  tick check
  itemLineHeight?: number | string // 行高
  itemRowSpacing?: number | string // 行距
  downBoxLeftOffset?: number | string // 下拉框内容左偏移
  plainStyle?: FilterPlainStyle // 普通样式
  hoverStyle?: HoverStyleConfig // 悬浮样式
  activeStyle?: ActiveStyleConfig // 选中样式
}

export interface BgConfig {
  boxBgColor: string
  boxBorderW: number
  boxBorderC: string
  boxImage: string
  boxRadius: number
}
export interface FilterPanelProps {
  w?: number
  h?: number
  mode?: string // 模式 单选single  多选multiple
  loadEvent?: boolean

  type?: 'index' | 'id'
  singleIndex?: { value: number | null }
  singleId?: { value: string | number | null }
  multipleIndex?: { value: string | null }
  multipleId?: { value: string | null }

  bgConfig?: BgConfig
  autoHide?: boolean // 自动关闭
  outHide?: boolean // 点击外区域关闭
  arrowConfig?: ArrowConfig
  textStyle?: TextStyle
  searchConfig?: FilterSearchConfig // 搜索框配置
  optionLine?: OptionLine // 选项行配置
  optionIcon?: OptionIcon // 选项图标
  data?: DataMap[]
  onHided?: () => void
  onChange?: (data: DataMap, ids: any[]) => void
  onClick?: (data: DataMap) => void
}
