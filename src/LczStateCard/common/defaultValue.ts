import { defaultNumberFormat } from '../../LczCarouselTable/common/defaultValue'
import { FontStyle, GlobalConfig, HoverFontStyle, MarkStyle, NumberHoverStyle, NumberStyle } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  alignmentType: 'lt',
  ArrangementMode: 'portrait',
  horizontalNumber: 3,
  portraitNumber: 3,
  horiSpeed: 24,
  portSpeed: 24,
  overflow: 'initial',
  textNumberSpeed: 0
}

const defaultFontStyle: FontStyle = {
  fontFamily: 'PingFangSC-Regular',
  fontSize: 16,
  color: '#fff',
  fontWeight: 'normal',
  letterSpacing: 0
}

const defaultHoverFontStyle: HoverFontStyle = {
  display: false,
  color: '#fff',
  fontWeight: 'bold'
}

const defaultMaskStyle: MarkStyle = {
  position: 'left',
  speed: 8,
  width: 20,
  height: 20,
  radius: 0,
  rotate: 0,
  normalMaskStyle: {
    markType: 'system',
    iconValue: '',
    iconColor: '#3d99fc',
    imgUrl: ''
  }
}

const defaultNumberStyle: NumberStyle = {
  display: true,
  showWidth: 40,
  textAlign: 'center',
  numberFormat: defaultNumberFormat,
  fontStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 16,
    color: '#ff6c0a',
    fontWeight: 'normal',
    letterSpacing: 0
  },
  sectionStyle: [],
  suffix: {
    display: true,
    content: '我是后缀',
    yOffset: 0,
    fontStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 12,
      color: '#0dffcb',
      fontWeight: 'normal',
      letterSpacing: 0
    }
  }
}

const defaultNumberhoverStyle: NumberHoverStyle = {
  display: true,
  color: '#f00',
  fontWeight: 'bold',
  suffix: {
    display: true,
    color: '#f00',
    fontWeight: 'bold'
  }
}

export {
  defaultGlobalConfig,
  defaultFontStyle,
  defaultHoverFontStyle,
  defaultMaskStyle,
  defaultNumberStyle,
  defaultNumberhoverStyle
}
