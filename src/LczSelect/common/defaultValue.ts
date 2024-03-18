import {
  BoxBorderStyle,
  BoxColorConfig,
  IconConfig,
  OptionIcon,
  OptionLine,
  SelectIcon,
  TagConfig,
  TextStyle
} from '../type'

const defalutTextStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  fontWeight: 400,
  letterSpacing: 0
}

const boxColorDefault: BoxColorConfig = {
  display: true,
  color: 'rgba(255,255,255,1)'
}

const iconConfigDefault: IconConfig = {
  iconColor: '#c8d0d8',
  type: 'system', // system custom
  iconValue: '&#59230;|1',
  imgUrl: '',
  iconSize: 16,
  imgWidth: 20,
  imgHeight: 20,
  rightOffset: 12,
  animate: true
}

const boxBorderDefault: BoxBorderStyle = {
  display: true,
  boxBorderC: '#313337',
  boxBorderW: 1,
  boxRadius: 0,
  boxHoverBorderC: '#3d99fc',
  boxFocusBorderC: '#3d99fc'
}

const tagConfigDefault: TagConfig = {
  tagBgColor: 'rgba(61, 153, 252, 0.3)',
  tagRadius: 2,
  speed: 4,
  tagBorderColor: 'rgba(61, 153, 252, 0.4)',
  tagBorderWidth: 1,
  iconColor: '#fff'
}

const searchConfigDefault = {
  display: true,
  topBottomMargin: 12,
  leftMargin: 12,
  height: 28,
  width: 216,
  bgColor: 'rgba(255,255,255,0)',
  borderStyle: boxBorderDefault,
  iconColor: '#C8D0D8',
  textColor: '#FFFFFF'
}

const optionLineDefault: OptionLine = {
  checkType: 'tick',
  itemLineHeight: 30,
  itemRowSpacing: 4,
  downBoxLeftOffset: 12
}
const defaulePlainStyle = { rowBgColor: '#15181c', rowColor: '#fff', checkColor: 'rgba(103, 115, 130, 1)' }
const defauleHoverStyle = { hoverType: true, rowHoverBgColor: '#3d99fc', rowHoverColor: '#fff' }
const defauleActiveStyle = {
  activeType: true,
  rowActiveBgColor: '#15181c',
  aCheckColor: '#3d99fc',
  aTickColor: '#3d99fc'
}

const defaultOptionIcon: OptionIcon = {
  occupy: false,
  contSpacing: 8,
  width: 16,
  height: 16,
  iconSeries: []
}

const defaultSelectIcon: SelectIcon = {
  display: false,
  width: 16,
  height: 16,
  contSpacing: 8
}

export {
  defalutTextStyle,
  boxColorDefault,
  iconConfigDefault,
  tagConfigDefault,
  searchConfigDefault,
  optionLineDefault,
  defaulePlainStyle,
  defauleHoverStyle,
  defauleActiveStyle,
  boxBorderDefault,
  defaultOptionIcon,
  defaultSelectIcon
}
