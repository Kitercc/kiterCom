import { Border } from '../LczCalendar/type'
import { ScrollConfig } from '../LczColumnTable/type'
import { Shadow } from '../LczSearch/type'
import { TextStyle } from '../LczTimer/type'

export type EventType = 'click' | 'enter' | 'leave' | 'move'

export type MenuData = {
  id: string
  content: string
  parentid?: string
  children?: { id: string; content: string }[]
}

interface GlobalConfig {
  currentVal: 'first' | 'id'
  defaultId?: { value: string }
  targetType: 'hover' | 'click'
  submenuLayout: 'horizontal' | 'vertical'
  submenuPosition: 'top' | 'bottom'
}

interface MianGloabalConfig {
  itemGap: number
  padding?: { x: number; y: number }
}

interface BackgroundConfig {
  display: boolean
  normalBgType?: 'color' | 'custom'
  hoverBgType?: 'color' | 'custom'
  activeBgType?: 'color' | 'custom'
  subPanelBgType?: 'color' | 'custom'
  optionLineNormalBgType?: 'color' | 'custom'
  optionLineHoverBgType?: 'color' | 'custom'
  optionLineActiveBgType?: 'color' | 'custom'
  color: any
  imageUrl: string
}

export interface NormalStyle {
  background?: BackgroundConfig
  textStyle?: TextStyle
  border?: Border
  inShadow?: Shadow
  outShadow?: Shadow
}

export interface HoverStyle extends NormalStyle {
  mainHoverDisplay: boolean
}

export interface ActiveStyle extends NormalStyle {
  mainActiveDisplay: boolean
}

export interface MainPanel {
  mianGloabalConfig?: MianGloabalConfig
  normalStyle?: NormalStyle
  hoverStyle?: HoverStyle
  activeStyle?: ActiveStyle
}

interface SubGlobalConfig {
  width?: any
  height?: any
  lineStyle?: { w: number; h: number }
  itemGap: number
  alignment: 'left' | 'center' | 'right'
  yOffset: number
  xSubPadding: number
  ySubPadding: number
  layout?: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
}

export interface OptionLineNormalStyle {
  optionLineHoverDisplay?: boolean
  optionLineActiveDisplay?: boolean
  background?: BackgroundConfig
  textStyle?: TextStyle
}

export interface OptionLine {
  normalStyle?: OptionLineNormalStyle
  hoverStyle?: OptionLineNormalStyle
  activeStyle?: OptionLineNormalStyle
}

export interface SubPanel {
  subGlobalConfig?: SubGlobalConfig
  border?: Border
  outShadow?: Shadow
  background?: BackgroundConfig
  inShadow?: Shadow
  horcroll?: ScrollConfig
  optionLine?: OptionLine
}

export interface LczHorizontalMenuProps {
  globalConfig?: GlobalConfig
  mainPanel?: MainPanel
  subPanel?: SubPanel
  data?: MenuData[]
  onChange?: (param: MenuData) => void
  onClick?: (param: MenuData) => void
}
