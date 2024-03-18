import {
  BorderConfig,
  CarouselConfig,
  GlobalConfig,
  HeaderConfig,
  LineConfig,
  LineStyleConfig,
  NumberFormat,
  ProgressOutline,
  SectionStyle,
  SerialCol,
  ShadowConfig,
  StatusBgConfig,
  StatusTextStyle,
  TextStyle,
  TipConfig,
  EmptyDataStyle
} from '../type'

const defaultCarousel: CarouselConfig = {
  interval: 3,
  display: true,
  fixedBg: true,
  duration: 800,
  speed: 'linear',
  animateStep: 50,
  animateMode: 'all',
  animatConnect: 'headTail',
  animationEffect: 'bottomUp',
  direction: 'up'
}

const defaultBorderd: BorderConfig = {
  display: true,
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0)'
}

const defaultTextStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: 20,
  color: '#fff',
  fontWeight: 400,
  letterSpacing: 0
}
const defaultGlobalConfig: GlobalConfig = {
  showType: 'fixedHeight',
  topLine: 2,
  topBgColor: 'rgba(61,153,252,0.40)',
  rowsNumber: 5,
  textSpacing: 0,
  horcroll: {
    display: true,
    trackConfig: { display: true, thickness: 2, color: 'rgba(255,255,255,0)', radius: 0 },
    sliderConfig: { size: 1, color: 'rgba(98,104,111,1)', radius: 0 }
  },
  updated: true
}

const defaultHeader: HeaderConfig = {
  display: true,
  height: 45,
  bgColor: { color: '' },
  headerStyle: defaultTextStyle
}

const defaultLineStyle: LineStyleConfig[] = [{ bgColor: { color: '' }, leftOffSet: 0, opacity: 100, radius: 0 }]

const defaultLineConfig: LineConfig = {
  lineSpeed: 10,
  yPadding: 8,
  borderStyle: defaultBorderd,
  lineStyle: defaultLineStyle
}

const defaultSerialCol: SerialCol = {
  display: true,
  headerTitle: '#',
  inintNumber: 1,
  colWidth: 52,
  colSpac: 0,
  alignType: 'center',
  serialStyle: { fontFamily: 'Microsoft YaHei', fontSize: 20, color: '#fff', fontWeight: 400, letterSpacing: 0 }
}

const defaultColBorderStyle: BorderConfig = {
  display: true,
  borderColor: 'rgba(255,222,99,1)',
  borderWidth: 1
}

const defaultNumberFormat: NumberFormat = {
  display: true,
  decollate: true,
  decimal: 2,
  round: false,
  percentage: false,
  negativeing: 'minus'
}

const defaultSectionStyle: SectionStyle = {
  min: -9007199254740991,
  max: 9007199254740991,
  color: '#FFFFFF',
  fontWeight: 400,
  fontSize: 14
}

const defaultStatusBgconfig: StatusBgConfig = {
  display: true,
  xOffset: 0,
  yOffset: 0,
  width: 24,
  height: 24,
  radius: 12,
  color: 'rgba(255,255,255,0)',
  imgUrl: ''
}

const defaultStatusTextStyle: StatusTextStyle = {
  display: true,
  xOffset: 0,
  yOffset: 0,
  fontFamily: 'PingFangSC-Regular',
  fontSize: 14,
  color: '#fff',
  fontWeight: 400,
  letterSpacing: 0
}

const defaultShadow: ShadowConfig = {
  display: false,
  xOffset: 0,
  yOffset: 0,
  color: '#3d99fc',
  vague: 4
}

const defaultProgressOutline: ProgressOutline = {
  display: false,
  xPadding: 4,
  yPadding: 4,
  bgColor: 'rgba(255,255,255,0)',
  borderColor: 'rgba(61,153,252,0.4)',
  borderWidth: 1,
  fillet: 0
}

const defaultTipConfig: TipConfig = {
  display: false,
  position: 'top',
  xPadding: 4,
  yPadding: 4,
  maxHeight: null,
  maxWidth: null,
  bgColor: '#000000',
  radius: 2,
  border: defaultBorderd,
  textStyle: defaultTextStyle
}

const defaultEmptyDataStyle: EmptyDataStyle = {
  display: false,
  bgColor: 'rgba(32,37,43,0.5)',
  image: {
    display: true,
    xOffset: 0,
    yOffset: -12,
    imgUrl: '',
    width: 96,
    height: 96
  },
  text: {
    display: true,
    content: '暂无数据',
    xOffset: 0,
    yOffset: 51,
    textStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#C8D0D8',
      fontWeight: 'normal',
      letterSpacing: 0
    }
  }
}

export {
  defaultCarousel,
  defaultBorderd,
  defaultTextStyle,
  defaultGlobalConfig,
  defaultHeader,
  defaultLineConfig,
  defaultSerialCol,
  defaultColBorderStyle,
  defaultNumberFormat,
  defaultSectionStyle,
  defaultStatusBgconfig,
  defaultStatusTextStyle,
  defaultShadow,
  defaultProgressOutline,
  defaultTipConfig,
  defaultEmptyDataStyle
}
