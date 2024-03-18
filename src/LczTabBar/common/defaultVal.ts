import { ShadowConfig } from '../../LczCustomGraphics/type'
import {
  BorderStyle,
  FocusBorderStyle,
  FocusHoverStyle,
  FocusStyleConfog,
  GlideLine,
  HoverTextStyle,
  IconArrowConfig,
  IconConfig,
  IconStyleSeries,
  NormalIcon,
  OrdHoverStyle,
  OrdStyleConfig,
  RemarkConfig,
  TabCarousel,
  TabSize
} from '../type'

const getcolor_obj = (color = 'rgba(255,0,0,1)', type = 'single') => {
  return {
    selected: type,
    single: color,
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#ff0a3f'
        },
        {
          begins: 0,
          value: '#00ff95'
        }
      ]
    }
  }
}

const defaultGlobalTextStyle = {
  fontFamily: 'Microsoft YaHei',
  letterSpacing: 0,
  alignType: 'center',
  verticalType: 'center',
  noSelfDiscountLine: { display: true, noSelfType: 'widthAdaption', strNum: 2 },
  selfDiscountLine: { display: true, selfType: 'widthAdaption', strNum: 2 }
}

const defaultTabSize: TabSize = {
  rollWidthOrHeight: 100,
  multiH: 40,
  selfAdaption: false,
  contentSpacing: 10
}

const defaultOrdTextConfig: HoverTextStyle = {
  display: true,
  fontFamily: 'Microsoft YaHei',
  fontSize: 20,
  newcolor: '#fff',
  fontWeight: 400
}
const defaultFocusBorderStyle: FocusBorderStyle = {
  display: true,
  focusBorderColor: 'rgba(61, 153, 252)',
  focusBorderWidth: 2,
  focusBorderRadius: 0
}
const defaultOrdHoverStyle: OrdHoverStyle = {
  display: true,
  ordTextHover: defaultOrdTextConfig,
  Hoverbackground: 'rgba(255,255,255,0)',
  HoverborderColor: '#3d99fc',
  HoverborderWidth: 2
}
const ordBorderStyleDefault: BorderStyle = { display: true, borderColor: '#3F464E', borderWidth: 1, borderRadius: 0 }
const defaultOrdStyleConfig: OrdStyleConfig = {
  ordTextConfig: defaultOrdTextConfig,
  bgConfig: 'rgba(255,255,255,0)',
  ordBorderStyle: ordBorderStyleDefault,
  ordHoverStyle: defaultOrdHoverStyle
}
const defaultGlideLine: GlideLine = { display: false, bgColor: '#3d99fc', width: 2 }

const defaultFocusHoverStyle: FocusHoverStyle = {
  display: true,
  focusTextHover: defaultOrdTextConfig,
  focusHoverBg: 'rgba(61, 153, 252, .2)',
  focusHoverBorderColor: 'rgba(61, 153, 252)',
  focusHoverBorderWidth: 2
}

const defaultFocusStyleConfig: FocusStyleConfog = {
  focusBg: 'rgba(61, 153, 252, .2)',
  focusTextConfig: defaultOrdTextConfig,
  focusBorderStyle: defaultFocusBorderStyle,
  focusHoverStyle: defaultFocusHoverStyle,
  glideLine: defaultGlideLine
}

const defaultBoxShadow: ShadowConfig = {
  display: false,
  color: 'rgba(0,0,0,.50)',
  x: 0,
  y: 2,
  vague: 4,
  extend: 0
}

const defaultIconStyleSeries: IconStyleSeries = {
  id: '',
  iconType: 'system',
  // system
  systemNormal: { color: getcolor_obj() },
  systemHover: { display: false, color: getcolor_obj() },
  systemFocus: { display: false, color: getcolor_obj() },
  systemFocusHover: { display: false, color: getcolor_obj() },
  //custom
  customNormal: { imgUrl: '' },
  customHover: { display: false, imgUrl: '' },
  customFocus: { display: false, imgUrl: '' },
  customFocusHover: { display: false, imgUrl: '' }
}

const defaultNormalIcon: NormalIcon = {
  display: false,
  iconType: 'system',
  // system
  systemNormal: { color: getcolor_obj() },
  systemHover: { display: false, color: getcolor_obj() },
  systemFocus: { display: false, color: getcolor_obj() },
  systemFocusHover: { display: false, color: getcolor_obj() },
  //custom
  customNormal: { imgUrl: '' },
  customHover: { display: false, imgUrl: '' },
  customFocus: { display: false, imgUrl: '' },
  customFocusHover: { display: false, imgUrl: '' }
}

const defaultIconConfig: IconConfig = {
  display: false,
  iconPosition: 'left',
  valSpeed: 8,
  width: 16,
  height: 16,
  normalIcon: defaultNormalIcon,
  iconStyleSeries: [defaultIconStyleSeries]
}

const defaultIconArrowConfig: IconArrowConfig = {
  display: false,
  scrollWay: 'toDistance', //'toDistance' | 'toNumber'
  scrollDistance: 102,
  scrollNumber: 1,
  spacing: 16,
  offset: 0,
  resources: 'system', // system 系统 custom 自定义
  type: 'top1',
  size: 30,
  colorObj: '',

  imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
  imgWidth: 24,
  imgHeight: 24,
  arrowHoverStyle: {
    display: false,
    arrowHoverColor: '',
    arrowHoverImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
  },
  arrowDisabledStyle: {
    display: false,
    opacity: 1,
    styleSync: false,
    arrowDisabledColor: '',
    arrowDisabledImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
  }
}

const defaultRemarkConfig: RemarkConfig = {
  display: false,
  xPosition: 'top', //'top' 'bottom'
  yPosition: 'left', // 'left' | 'right'
  xoffset: 4,
  yoffset: 4,
  maxHeight: null,
  maxWidth: null,
  bgColor: 'rgba(61,153,252,1)',
  radius: 2,
  textStyle: {
    fontFamily: '微软雅黑',
    fontSize: 16,
    newcolor: 'white',
    fontWeight: 'normal',
    letterSpacing: 0
  }
}

const defaultCarousel: TabCarousel = {
  display: false,
  stopCondition: '',
  interval: 5000,
  clickInterval: 5000
}

export {
  defaultGlobalTextStyle,
  defaultOrdTextConfig,
  defaultFocusBorderStyle,
  defaultOrdHoverStyle,
  ordBorderStyleDefault,
  defaultOrdStyleConfig,
  defaultGlideLine,
  defaultFocusHoverStyle,
  defaultFocusStyleConfig,
  defaultBoxShadow,
  defaultTabSize,
  defaultIconConfig,
  defaultIconStyleSeries,
  defaultIconArrowConfig,
  defaultRemarkConfig,
  defaultNormalIcon,
  defaultCarousel
}
