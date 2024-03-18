import { ScrollConfig } from '../LczColumnTable/type'

export interface TextStyle {
  display?: boolean
  fontFamily?: string
  fontSize?: number
  color?: string
  fontWeight?: any
  letterSpacing?: number
}

export interface GlobalConfig {
  trigger?: 'click' | 'hover' // 展开选中子集方式
  changeOnSelect?: boolean // 是否可选中父级
  checkCondition?: any
  displayType?: 'system' | 'custom'
  saveState?: boolean
  defaultId?: { value: number | string } // 默认id
  search?: boolean
  gloablTextStyle?: TextStyle
}

export interface BgConfig {
  display: boolean
  bgType?: 'color' | 'custom'
  focusBgType?: 'color' | 'custom'
  hoverBgType?: 'color' | 'custom'
  bgColor: any
  imgUrl?: string
  radius: number
}

export interface OptionBgConfig extends BgConfig {
  focusStyle?: BgConfig
  hoverStyle?: BgConfig
}

export interface BorderConfig {
  display: boolean
  color: string
  width: number
  hoverColor?: string
  focusColor?: string
}

export interface TextConfig {
  display: boolean
  placeholder: string
  onlyLast: boolean
  pathDivision: string
  customContent?: {
    value: any
  }
  contentLeft: number
  textAlign: 'left' | 'center' | 'right'
  textStyle: TextStyle
  focusStyle?: TextStyle
  hoverStyle?: TextStyle
}

export interface ArrowDown {
  display: boolean
  arrowType: string // system 系统 custom 自定义
  // system 系统时
  iconValue?: IconValueType
  iconColor?: string
  iconSize?: number
  // custom 自定义时
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number
  rightOffset: number
  animate: boolean
}

export interface ClearIcon {
  display: boolean
  size: number
  color: string
  right: number
}

export interface OptionConfig {
  height: any
  angle?: number
  bgConfig?: OptionBgConfig
  borderConfig?: BorderConfig
  textConfig?: TextConfig
  arrowDown?: ArrowDown
  clearIcon?: ClearIcon
}

export interface CascaderStyleConfig {
  rowNormalBgType?: 'color' | 'custom'
  rowBgColor: any
  imageUrl?: string
  rowColor: string
  arrowColor: string
  fontWeight: any
}

export interface HoverStyleConfig {
  hoverType: boolean
  rowHoverBgType?: 'color' | 'custom'
  bgColor: any
  imageUrl?: string
  arrowColor: string
  color: string
  fontWeight: any
}

export interface ActiveStyleConfig {
  activeType: boolean
  rowActiveBgType?: 'color' | 'custom'
  bgColor: any
  imageUrl?: string
  arrowColor: string
  color: string
  fontWeight: any
  tickColor?: string
}

export interface OptionLine {
  rowHeight: number
  rowSpacing: number
  lineMargin: number
  fontSize: number
  shownum: boolean
  plainStyle: CascaderStyleConfig
  hoverStyle: HoverStyleConfig
  activeStyle: ActiveStyleConfig // 选中样式
}

export interface PanelConfig {
  height: any
  width: number
  xOffset: number
  yoffset: number
  padding?: {
    x: number
    y: number
  }
  panelBgConfig: BgConfig
  panelBorderConfig: BorderConfig
  optionLine?: OptionLine
  horcroll?: ScrollConfig
}

export type DataMap = {
  id: string
  content: string
  parentid: string
}

export type HandlerChange = (param: DataMap) => void

export interface LczCascaderProps {
  id?: string
  design?: boolean
  gloablConfig?: GlobalConfig // 全局
  optionConfig?: OptionConfig // 选择框配置
  panelConfig?: PanelConfig
  data?: DataMap[]
  onChange?: HandlerChange
  onClick?: HandlerChange
}
