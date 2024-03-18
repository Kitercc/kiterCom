import { ActiveStyleConfig, HoverStyleConfig } from '../../LczSelect/type'
import { ArrowConfig, BgConfig, FilterPlainStyle, FilterSearchConfig, OptionLine, TextStyle } from '../type'

const defaultaArrowConfig: ArrowConfig = { display: true, position: 'top', offset: 0, size: 10 }

const defaultTextStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  color: '#ffffff',
  fontWeight: 0,
  letterSpacing: 0
}

const defaultSearchConfig: FilterSearchConfig = {
  display: true,
  topBottomMargin: 10,
  leftMargin: 12,
  height: 28,
  bgColor: 'rgba(255,255,255,0)',
  iconColor: '#C8D0D8',
  textColor: '#ccc',
  boxBorderC: '#313337',
  boxBorderW: 1,
  boxFontSize: 13,
  radius: 10
}

const defaultOptionLine: OptionLine = {
  checkType: 'tick', // check tick
  itemLineHeight: 30,
  itemRowSpacing: 2,
  downBoxLeftOffset: 20
}

const defaultPlainStyle: FilterPlainStyle = {
  rowBgColor: 'rgba(255,255,255,0)',
  rowColor: '#fff',
  fontSize: 14,
  checkColor: '#677382'
}

const defaultHoverStyle: HoverStyleConfig = {
  hoverType: true,
  rowHoverBgColor: 'rgba(61,153,252,0.16)',
  rowHoverColor: '#fff'
}

const defaultActiveStyle: ActiveStyleConfig = {
  activeType: true,
  rowActiveBgColor: 'rgba(255,255,255,0)',
  rowActiveColor: '#3D99FC',
  aCheckColor: '#3D99FC',
  aTickColor: '#3D99FC'
}

const defaultBgConfig: BgConfig = {
  boxBgColor: '#171c15',
  boxImage: '',
  boxBorderW: 1,
  boxBorderC: '#313337',
  boxRadius: 0
}

export {
  defaultaArrowConfig,
  defaultTextStyle,
  defaultSearchConfig,
  defaultOptionLine,
  defaultPlainStyle,
  defaultHoverStyle,
  defaultActiveStyle,
  defaultBgConfig
}
