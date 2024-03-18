import { generalToolConfig } from '../../../common/generalValue'
import { GaugeConfig, RingGlobalConfig, RingSubTitle, RingTitleConfig } from '../type'

const DefaultRingSubtitleConfig: RingSubTitle = {
  display: true,
  subContentType: 'value', //'seriesName' | 'value' | 'custom'
  //value
  subValueReal: false,
  subValueUnit: '',
  subValueFormat: {
    display: true,
    decollate: true,
    decimal: 0,
    round: true,
    negativeing: 'minus'
  },
  //custom
  subCustom: { value: 'SS' },
  fontFamily: 'DIN',
  fontSize: 18,
  color: '#ffffff',
  fontWeight: 'normal',
  subShadow: {
    shadowBlur: 0,
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }
}
const DefaultRingtitleConfig: RingTitleConfig = {
  display: true,
  mainContentType: 'value', //'seriesName' | 'value' | 'custom'
  //value
  mainValueReal: false,
  mainValueUnit: '',
  mainValueFormat: {
    display: true,
    decollate: true,
    decimal: 0,
    round: true,
    negativeing: 'minus'
  },
  //custom
  mainCustom: { value: 'TITLE' },
  fontFamily: 'DIN',
  fontSize: 18,
  color: '#ffffff',
  fontWeight: 'normal',
  mainShadow: {
    shadowBlur: 0,
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  },
  //
  subTitle: DefaultRingSubtitleConfig,

  speed: 10,
  xPosition: 'left',
  yPosition: 'top',
  xOffset: 0,
  yOffset: 0
}

const DefaultGlobalConfig: RingGlobalConfig = {
  margin: {
    x: 50,
    y: 50
  },
  backgroundColor: 'rgba(0,0,0,0)',
  ringtitleConfig: DefaultRingtitleConfig,
  toolbarConfig: generalToolConfig,
  dataAnimate: true
}

const DefaultGaugeConfig: GaugeConfig = {
  gaugeName: '你真帅',
  extremumConfig: {
    min: { value: 100 },
    max: { value: 120 }
  },
  progressStyle: {
    inRadius: 70,
    outRadius: 80,
    color: '',
    opacity: 100,
    startAngle: 90,
    roundCap: true,
    clockwise: true,
    ProgressContour: {
      display: true,
      color: '#2B323B',
      width: 1,
      lineType: 'solid' //'solid' | 'dashed' | 'dotted'
    },
    ProgressShadow: {
      shadowBlur: 0,
      shadowColor: 'rgba(255,0,0,1)',
      shadowOffsetX: 0,
      shadowOffsetY: 0
    }
  },
  backgroundstyle: {
    display: false,
    color: '',
    opacity: 100,
    backgroundContour: {
      display: true,
      color: '#2B323B',
      width: 1,
      lineType: 'solid' //'solid' | 'dashed' | 'dotted'
    },
    backgroundShadow: {
      shadowBlur: 0,
      shadowColor: 'rgba(255,0,0,1)',
      shadowOffsetX: 0,
      shadowOffsetY: 0
    }
  }
}

const defaultContour = {
  display: false,
  color: '#2B323B',
  width: 1,
  lineType: 'solid' //'solid' | 'dashed' | 'dotted'
}

export { DefaultGlobalConfig, DefaultGaugeConfig, DefaultRingtitleConfig, DefaultRingSubtitleConfig, defaultContour }
