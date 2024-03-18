import { Shadow } from '../LczSearch/type'

export interface GlobalTextStyle {
  fontFamily: string
  fontSize: number
  fontWeight: any
  color: string
  hoverColor?: any
  activeColor?: any
  letterSpacing: number // 文字间距
}

export interface GlobalBgColor {
  globalBgType?: 'color' | 'custom'
  btnBgType?: 'color' | 'custom'
  // color
  color: string
  hoverColor: any
  activeColor?: any
  //custom
  img?: string
  hoverImg?: string
  activeImg?: string
}
export interface GlobalBorder {
  display: boolean
  width: number
  color: string
  radius?: number
  hoverColor?: any
  activeColor?: any
}
export interface GlobalConfig {
  prevBtn: boolean
  width: number
  height: number
  radius: number
  padding: number
  linePageSize: number
  globalTextStyle: GlobalTextStyle
  globalBgColor: GlobalBgColor
  globalBorder: GlobalBorder
}

export interface TotalConfig {
  display: boolean
  padding: number
  prefix: {
    content: any
    padding: number
  }
  suffix: {
    content: any
    padding: number
  }
  textStyle: GlobalTextStyle
}

export interface DropDownConfig {
  xPadding: number
  yPadding: number
  dropDownBgColor: GlobalBgColor
  dropDownlBorder: GlobalBorder
  dropDownTextStyle: GlobalTextStyle
}
interface SubGlobalConfig {
  height: number
  xSubPadding: number
  ySubPadding: number
}

interface BackgroundConfig {
  color: any
}
export interface OptionLineNormalStyle {
  optionLineHoverDisplay?: boolean
  optionLineActiveDisplay?: boolean
  background?: BackgroundConfig
  textStyle?: GlobalTextStyle
}
export interface OptionLine {
  normalStyle: OptionLineNormalStyle
  hoverStyle: OptionLineNormalStyle
  activeStyle: OptionLineNormalStyle
}
export interface SubPanel {
  subGlobalConfig: SubGlobalConfig
  background: BackgroundConfig
  border: GlobalBorder
  outShadow: Shadow
  optionLine: OptionLine
}
export interface PageSizeConfig {
  display: boolean
  padding: number
  content: string
  dropDownConfig: DropDownConfig
  subPanel: SubPanel
}

export interface InputConfig {
  width: number
  height: number
  inputBgColor: GlobalBgColor
  inputBorder: GlobalBorder
  inputTextStyle: GlobalTextStyle
}

export interface ConfirmBtnConfig {
  display: boolean
  content: any
  margin: number
  padding: {
    xPadding: number
    yPadding: number
  }
  btnBgColor: GlobalBgColor
  btnBorder: GlobalBorder
  btnTextStyle: GlobalTextStyle
}
export interface SkipConfig {
  display: boolean
  padding: number
  suffix: {
    content: any
    padding: number
  }
  textStyle: GlobalTextStyle
  inputConfig: InputConfig
  confirmBtnConfig: ConfirmBtnConfig
}
interface dataMap {
  count: any
}
interface changeMap {
  currentPage: number
}

export interface LczPaginationProps {
  globalConfig: GlobalConfig
  elliptical: {
    color: any
  }
  totalConfig: TotalConfig
  pageSizeConfig?: PageSizeConfig
  skipConfig: SkipConfig
  data?: dataMap[]
  onClick?: (param: changeMap) => void
}
