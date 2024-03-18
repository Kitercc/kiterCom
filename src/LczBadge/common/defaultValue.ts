import { BadgeNumformat, BadgeSectionStyle, BadgeTextStyle, GlobalConfig, SuperNumber } from '../type'

const defaultGlobal: GlobalConfig = {
  lessThanZeroHidden: true,
  thumbnail: {
    display: true,
    threshold: 99
  }
}

const defaultFormat: BadgeNumformat = {
  display: false,
  splitDigit: 3,
  decimal: 0,
  rounding: true,
  negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
}

const defaultTextConfig: BadgeTextStyle = {
  display: true,
  fontWeight: 'normal',
  fontFamily: 'PingFangSC-Regular',
  fontSize: 15,
  color: '#FFFFFF',
  letterSpacing: 0
}

const defaultSectionStyle: BadgeSectionStyle = {
  min: -9007199254740991,
  max: 9007199254740991,
  bgConfig: {
    display: true,
    xOffset: 5,
    yOffset: 2,
    color: '#D24C4C',
    radius: 9
  },
  text: {
    display: true,
    showVal: true,
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'normal'
  }
}

const defaultSuperNumber: SuperNumber = {
  format: defaultFormat,
  bgConfig: {
    display: true,
    xOffset: 5,
    yOffset: 2,
    color: '#D24C4C',
    radius: 9
  },
  textStyle: defaultTextConfig,
  sectionStyleFlag: false,
  sectionStyle: [defaultSectionStyle]
}

export { defaultGlobal, defaultSuperNumber, defaultFormat, defaultTextConfig, defaultSectionStyle }
