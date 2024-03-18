import {
  globalConfig,
  iconInfo,
  temperatureInfo,
  TextStyle,
  weatherConfig,
  weatherLayou,
  weatherTitleInfo,
  windInfo
} from '../type'

const defaultTextStyle: TextStyle = {
  fontFamily: 'PingFangSC-Regular',
  fontSize: 18,
  color: 'rgba(255,255,255,1)',
  fontWeight: 400,
  letterSpacing: 0,
  italics: false
}
const defaultWeatherLayou: weatherLayou = {
  flexDirection: 'row',
  alignItems: 'center',
  reverseSort: false
}

const defaultWeatherTitleInfo: weatherTitleInfo = {
  display: true,
  horOffset: 0,
  verOffset: 0,
  TextStyle: defaultTextStyle //文本样式
}
const defaultTemperatureInfo: temperatureInfo = {
  display: true,
  horOffset: 0,
  verOffset: 0,
  connectors: '~', //链接符
  TextStyle: defaultTextStyle,
  tempSuffix: {
    display: true,
    content: '℃',
    fontFamily: 'PingFangSC-Regular',
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
    fontWeight: 400,
    letterSpacing: 0,
    italics: false
  } //温度后缀
}

const defaultWindInfo: windInfo = {
  display: true,
  horOffset: 0,
  verOffset: 0,
  TextStyle: defaultTextStyle //文本样式
}
const defaultIconInfo: iconInfo = {
  display: true,
  site: 'row',
  iconSeries: []
}
const defaultGlobalConfig: globalConfig = {
  citySelect: { label: '北京市', value: '110000' },
  iconLetterSpace: 15,
  weatherLayout: defaultWeatherLayou, //天气信息布局
  iconInfo: defaultIconInfo //图标信息
}

const defaultWeatherConfig: weatherConfig = {
  minSpace: 0,
  weatherTitleInfo: defaultWeatherTitleInfo,
  temperatureInfo: defaultTemperatureInfo,
  windInfo: defaultWindInfo
}

export {
  defaultGlobalConfig,
  defaultWeatherConfig,
  defaultIconInfo,
  defaultWeatherTitleInfo,
  defaultTemperatureInfo,
  defaultWindInfo
}
