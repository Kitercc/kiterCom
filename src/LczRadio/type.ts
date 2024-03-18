export interface GlTextStyle {
  fontFamily: string
  letterSpacing: number
}

export interface TextStyle {
  display?: boolean
  fontSize: number
  color: string
  fontWeight: any
}

export interface OptionsType {
  id: number
  content: string
}

export interface RadioStyle {
  display?: boolean
  radioDisplay?: boolean
  radioSize?: number
  textSpacing?: number
}

export interface GlobalStyle {
  arrangement?: string // 排列方式
  itemSpacing?: number | string
  radioStyle?: RadioStyle // 单选框样式
  globalTextStyle?: GlTextStyle // 文本样式
}

export interface CheckBox {
  display?: boolean
  checkBorderColor?: string
}

export interface OrdHoverStyle {
  display?: boolean
  ordHoverTextStyle?: TextStyle // 悬浮文本样式
  ordHoverCheck?: CheckBox // 悬浮选框样式
}

export interface OrdStyle {
  ordTextStyle?: TextStyle // 普通文本样式
  ordCheckBox?: CheckBox // 选框样式
  ordHoverStyle?: OrdHoverStyle // 悬浮样式
}

export interface SelectHoverStyle {
  display?: boolean
  selectHoverTextStyle?: TextStyle // 悬浮文本样式
  selectHoverCheck?: CheckBox // 悬浮选框样式
}

export interface SelectStyle {
  selectTextStyle?: TextStyle
  selectCheckBox?: CheckBox // 选框样式
  selectHoverStyle?: SelectHoverStyle // 悬浮样式
}

export interface RadioProps {
  options?: OptionsType[] // 单选组配置数据
  globalStyle?: GlobalStyle // 全局样式
  ordStyle?: OrdStyle // 普通样式
  selectStyle?: SelectStyle // 选中样式
  type?: 'index' | 'id' // index  id
  index?: { value: number | null }
  defaultId?: { value: string | number | null }
  data?: any
  onChange?: any
  onClick?: any
}
