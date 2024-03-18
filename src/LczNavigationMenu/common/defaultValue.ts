import { defaultBoxShadow } from '../../LczCustomGraphics/common/defaultValue'
import {
  ChildPanel,
  FocusStyle,
  GlobalTextStyle,
  HoverStyle,
  IconConfig,
  NavigationConfig,
  OrdStyle,
  RowStyle
} from '../type'

const defaultChildPanel: ChildPanel = {
  space: 5,
  width: 190,
  borderConfig: {
    display: true,
    color: '#313337',
    width: 1
  },
  outShadow: defaultBoxShadow
}

const defaultGlobalConfig: NavigationConfig = {
  currentVal: 'first',
  defaultId: { value: '' },
  submenuShow: 'inline',
  expandCurrent: false,
  contentLeftOffset: 0,
  childPanel: defaultChildPanel
}

const defaultGlobalStyle: GlobalTextStyle = {
  fontFamily: 'PingFangSC-Regular',
  letterSpacing: 0,
  groupStyle: {
    fontSize: 14,
    color: '#D8E0E9',
    fontWeight: 'normal'
  }
}

const defaultOrdStyle: OrdStyle = {
  arrow: {
    rightOffset: 16,
    type: 'linear',
    size: 16,
    color: '#ccc'
  },
  ordTextStyle: {
    fontSize: 14,
    color: '#D8E0E9',
    fontWeight: 'normal'
  }
}

const defaultHoverStyle: HoverStyle = {
  display: true,
  rowBg: 'rgba(255,255,255,0)',
  arrowColor: '#3D99FC',
  hoverFontStyle: {
    display: true,
    fontSize: 14,
    color: '#3d99fc',
    fontWeight: 'normal'
  }
}

const defaultFocusStyle: FocusStyle = {
  display: true,
  rowBg: 'rgba(61, 153, 252, 0.2)',
  arrowColor: '#3D99FC',
  tagLine: {
    display: true,
    position: 'left',
    color: '#3D99FC',
    width: 4
  },
  focusFontStyle: {
    display: true,
    fontSize: 14,
    color: '#3d99fc',
    fontWeight: 'normal'
  }
}

const defaultRowStyle: RowStyle = {
  rowHeight: 48,
  rowSpacing: 0,
  indent: 20,
  iconTextSpace: 8,
  ordStyle: defaultOrdStyle,
  hoverStyle: defaultHoverStyle,
  focusStyle: defaultFocusStyle
}

const defaultIconConfig: IconConfig = {
  display: true,
  occupy: false,
  width: 16,
  height: 16,
  iconSeries: []
}

export {
  defaultGlobalConfig,
  defaultChildPanel,
  defaultGlobalStyle,
  defaultRowStyle,
  defaultOrdStyle,
  defaultHoverStyle,
  defaultFocusStyle,
  defaultIconConfig
}
