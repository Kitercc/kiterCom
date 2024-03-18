import {
  ActiveStyleConfig,
  ArrowDown,
  BgConfig,
  BorderConfig,
  CascaderStyleConfig,
  ClearIcon,
  HoverStyleConfig,
  OptionLine,
  PanelConfig,
  TextConfig,
  TextStyle
} from '../type'

const defaultGloablTextStyle: TextStyle = {
  fontFamily: 'PingFangSC-Regular',
  letterSpacing: 0
}

const defaultTextStyle: TextStyle = {
  display: false,
  fontSize: 14,
  color: '#fff',
  fontWeight: 'normal'
}

const defaultBgConfig: BgConfig = {
  display: true,
  bgColor: '#15181C',
  radius: 0
}

const defaultBorderConfig: BorderConfig = {
  display: true,
  color: '#313337',
  width: 1,
  hoverColor: '#3D99FC',
  focusColor: '#3D99FC'
}

const defaultTextConfig: TextConfig = {
  display: true,
  placeholder: '请选择',
  onlyLast: false,
  pathDivision: '/',
  contentLeft: 12,
  textAlign: 'left',
  textStyle: defaultTextStyle
}

const defaultArrowDown: ArrowDown = {
  display: true,
  arrowType: 'system', // system custom
  iconValue: '&#59230;|1',
  imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
  iconColor: '#C8D0D8',
  iconSize: 16,
  imgWidth: 20,
  imgHeight: 20,
  rightOffset: 12,
  animate: true
}

const defaultClearIcon: ClearIcon = { display: true, size: 16, color: '#CCCCCC', right: 12 }

const defaultPlanStyle: CascaderStyleConfig = {
  rowBgColor: 'rgba(255,255,255,0)',
  rowColor: '#FFFFFF',
  arrowColor: '#CCCCCC',
  fontWeight: 'normal'
}

const defaultHoverStyle: HoverStyleConfig = {
  hoverType: true,
  bgColor: 'rgba(61,153,252,0.16)',
  arrowColor: '#CCCCCC',
  color: '#FFFFFF',
  fontWeight: 'normal'
}

const defaultActiveStyle: ActiveStyleConfig = {
  activeType: true,
  bgColor: 'rgba(255,255,255,0)',
  arrowColor: '#CCCCCC',
  color: '#FFFFFF',
  fontWeight: 'normal',
  tickColor: '#3D99FC'
}

const defaultOptionLine: OptionLine = {
  rowHeight: 30,
  rowSpacing: 4,
  fontSize: 14,
  lineMargin: 12,
  shownum: false,
  plainStyle: defaultPlanStyle,
  hoverStyle: defaultHoverStyle,
  activeStyle: defaultActiveStyle
}

const defaultPanelConfig: PanelConfig = {
  height: 214,
  width: 160,
  yoffset: 8,
  xOffset: 0,
  panelBgConfig: defaultBgConfig,
  panelBorderConfig: defaultBorderConfig,
  optionLine: defaultOptionLine
}

export {
  defaultGloablTextStyle,
  defaultBgConfig,
  defaultBorderConfig,
  defaultTextConfig,
  defaultTextStyle,
  defaultArrowDown,
  defaultClearIcon,
  defaultPanelConfig,
  defaultOptionLine,
  defaultPlanStyle,
  defaultHoverStyle,
  defaultActiveStyle
}
