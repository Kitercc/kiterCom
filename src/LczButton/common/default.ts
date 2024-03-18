import { BgConfig, CommonStyle, HoverBgConfig, HoverIconConfig, HoverStyle, IconConfig, TextConfig } from '../type'

const defaultBgConfig: BgConfig = {
  display: true,
  type: 'color',
  color: '#3D99FC',
  imageUrl: ''
}

const defaultTextconfig: TextConfig = {
  display: true,
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  color: 'rgba(255,255,255,1)',
  fontWeight: 400,
  letterSpacing: 1
}

const defaultIconConfig: IconConfig = {
  display: true,
  size: 16,
  width: 16,
  height: 16,
  iconPosition: 'top',
  horiOffset: 0,
  vertOffset: 0,
  iconType: 'system', //system 系统  custom 自定义
  imageUrl: '',
  iconValue: '',
  fillColor: '#FFFFFF'
}

const defaultCommonStyle: CommonStyle = {
  borderColor: 'rgba(255,255,255,0)',
  borderWidth: 0,
  bgConfig: defaultBgConfig,
  textConfig: defaultTextconfig,
  iconConfig: defaultIconConfig
}

const defaultHoverBg: HoverBgConfig = {
  display: true,
  color: '#3D99FC',
  imageUrl: ''
}

const defaultHoverIconConfig: HoverIconConfig = {
  display: true,
  width: 16,
  height: 16,
  size: 16,
  horiOffset: 0,
  vertOffset: 0,
  fillColor: '#fff',
  imageUrl: ''
}

const defaultHoverStyle: HoverStyle = {
  display: true,
  borderColor: 'rgba(255,255,255,0)',
  borderWidth: 0,
  hoverBgConfig: defaultHoverBg,
  hoverTextConfig: defaultTextconfig,
  hoverIconConfig: defaultHoverIconConfig
}

export {
  defaultCommonStyle,
  defaultBgConfig,
  defaultTextconfig,
  defaultIconConfig,
  defaultHoverStyle,
  defaultHoverBg,
  defaultHoverIconConfig
}
