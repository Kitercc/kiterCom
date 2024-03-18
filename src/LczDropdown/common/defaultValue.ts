import { OptionBoxConfig } from '../../LczSelect/type'
import { BorderStyle, DropDownConfig, HoverStyleConfig, OptionLine, PlainStyleConfig, TextStyle } from '../type'

const defaultGlobal: TextStyle = {
  fontFamily: '微软雅黑',
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: 0
}

const defaultOptionBoxConfig: OptionBoxConfig = {
  boxBgColor: '#15181C',
  boxLeftOffset: 12,
  boxColor: {
    textStatus: true,
    color: 'rgba(255,255,255)'
  },
  boxBorderStyle: {
    bordered: true,
    boxBorderC: '#313337',
    boxBorderW: 1,
    boxHoverBorderC: '#3D99FC',
    boxRadius: 4
  },
  iconConfig: {
    type: 'system', // system custom
    iconValue: '&#59230;|1',
    imgUrl: '',
    iconColor: '#C8D0D8',
    iconSize: 16,
    imgWidth: 20,
    imgHeight: 20,
    rightOffset: 12
  }
}

const defaultBorderStyle: BorderStyle = {
  display: true,
  color: '#313337',
  width: 1,
  radius: 0
}
const defaultPlainStyle: PlainStyleConfig = {
  rowBgColor: 'rgba(255,255,255,0)',
  rowColor: '#fff'
}

const defaultHoverStyle: HoverStyleConfig = {
  hoverType: true,
  rowHoverBgColor: 'rgba(61,153,252,0.16)',
  rowHoverColor: '#fff'
}

const defaultOptionLine: OptionLine = {
  lineHeight: 30,
  rowSpacing: 4,
  downBoxLeftOffset: 12,
  plainStyle: defaultPlainStyle,
  hoverStyle: defaultHoverStyle
}

const defaultDropdownConfig: DropDownConfig = {
  dropHeight: 106,
  dropWidth: 240,
  placement: 'bottomLeft',
  xOffset: 0,
  yOffset: 2,
  dropBgColor: '#15181C',
  parentStyle: defaultPlainStyle,
  dropBorderStyle: defaultBorderStyle,
  optionLine: defaultOptionLine
}

export {
  defaultGlobal,
  defaultOptionBoxConfig,
  defaultDropdownConfig,
  defaultBorderStyle,
  defaultOptionLine,
  defaultPlainStyle,
  defaultHoverStyle
}
