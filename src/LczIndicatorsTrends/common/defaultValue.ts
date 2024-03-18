import { FontConfig, FormatConfig, NumberConfig, SuffixConfig, TextStyle, TitleConfig } from '../type'

const defaultTextStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  color: 'rgba(255,255,255,1)',
  fontWeight: 400,
  letterSpacing: 0
}

const defaultTitleConfig: TitleConfig = {
  display: false,
  titleContent: '标题',
  textStyle: defaultTextStyle,
  lineFeed: true
}

const defaultFormat: FormatConfig = {
  display: true,
  thousandth: true,
  numDo: 0, // 保留小数 小数点位数
  rounding: true, // 四舍五入
  percentage: false,
  negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
}

const defaultSuffix: SuffixConfig = {
  display: false,
  leftOffset: 0,
  topOffset: 0,
  suffix: '%',
  textStyle: {
    fontFamily: 'Microsoft YaHei',
    fontSize: 14,
    color: '#fff',
    fontWeight: 400,
    letterSpacing: 0
  }
}

const defaultNumberConfig: NumberConfig = {
  display: true,
  textStyle: defaultTextStyle,
  baseValue: 0,
  formatConfig: defaultFormat,
  suffixConfig: defaultSuffix
}

const defaultFontConfig: FontConfig = {
  style: 'icon1',
  size: 16,
  riseColor: '#D24C4C',
  declineColor: '#48C18D',
  flatColor: '#D2944C',
  syncValueColor: true
}

export { defaultTitleConfig, defaultNumberConfig, defaultFontConfig, defaultFormat, defaultSuffix }
