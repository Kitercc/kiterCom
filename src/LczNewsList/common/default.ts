import {
  GlobalConfig,
  TextConfig,
  TitleConfig,
  SplitLine,
  Abstract,
  Drawing,
  MaskConfig,
  Carousel,
  DateConfig,
  Pager
} from '../type'

const defaultCarousel: Carousel = {
  display: true,
  timeSpeed: 5,
  speed: 100,
  carouselFactor: 'all'
}

const defaultGlobalConfig: GlobalConfig = {
  showType: 'fixedHeight',
  numbers: 1,
  rowHeight: 88,
  entryInterval: 0,
  speed: 16,
  carousel: defaultCarousel
}

const defaultTitle: TitleConfig = {
  titleShowrownum: 0,
  titleBgColor: 'rgba(255,255,255,0)',
  titleMargin: {
    top: 0,
    right: 0,
    bottom: 4,
    left: 0
  },
  titleStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    letterSpacing: 0,
    italics: false,
    textAlign: 'left'
  }
}

const defaultSplitLine: SplitLine = {
  display: true,
  style: 'solid',
  color: 'rgba(255,255,255,0.3)',
  width: 1
}

const defaultAbstract: Abstract = {
  absShowrownum: 0,
  absBgColor: 'rgba(255,255,255,0)',
  absMargin: {
    top: 4,
    right: 0,
    bottom: 0,
    left: 0
  },
  absStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'normal',
    letterSpacing: 0,
    italics: false
  }
}

const defaultTextConfig: TextConfig = {
  titleConfig: defaultTitle,
  splitLine: defaultSplitLine,
  abstract: defaultAbstract
}

const defaultDrawing: Drawing = {
  display: true,
  position: 'left',
  topMargin: 0,
  leftMargin: 0,
  rightMargin: 0,
  width: 72,
  height: null,
  radius: 0,
  borderColor: '#3D99FC',
  borderWidth: 0,
  bgColor: 'rgba(255,255,255,0)'
}

const defaultMaskConfig: MaskConfig = {
  display: false,
  maskHeight: 88,
  color: {
    selected: 'gradient',
    single: '#3d99fc',
    gradient: {
      gradualAngle: 0,
      colors: [
        {
          begins: 0,
          value: '#3D99FC'
        },
        {
          begins: 100,
          value: 'rgba(255,0,0,0)'
        }
      ]
    }
  }
}

const defaultDateConfig: DateConfig = {
  display: false,
  format: {
    date: { display: true, forMat: 'Monday' },
    time: { display: true, forMat: 'hh:mm:ss A' }
  },
  bgColor: 'rgba(255,255,255,0)',
  margin: {
    t: 10,
    r: 0,
    b: 0,
    l: 0
  },
  dateStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'normal',
    letterSpacing: 0,
    italics: false
  }
}

const defaultpager: Pager = {
  display: false,
  position: 'right',
  xOffset: 0,
  yOffset: 0,
  wdith: 6,
  height: 6,
  radios: 3,
  speed: 6,
  defaultColor: '#D8D8D8',
  activeColor: '#FFFFFF'
}

export {
  defaultGlobalConfig,
  defaultTextConfig,
  defaultTitle,
  defaultSplitLine,
  defaultAbstract,
  defaultDrawing,
  defaultMaskConfig,
  defaultCarousel,
  defaultDateConfig,
  defaultpager
}
