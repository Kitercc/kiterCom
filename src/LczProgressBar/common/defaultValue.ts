import {
  ProgressConfig,
  ShadowConfig,
  GridConfig,
  OutBorder,
  InMargin,
  MessageConfig,
  TextStyle,
  MessageBg,
  TextConfig,
  AnimateConfig
} from '../type'

const defaultTextStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: 14,
  color: 'rgba(255,255,255,1)',
  fontWeight: 400,
  letterSpacing: 0
}

const defaultShadowStyle: ShadowConfig = {
  display: true,
  shadowColor: 'rgba(0,0,0,50)',
  extend: 2,
  vague: 4
}

const defaultInMargin: InMargin = {
  vermargin: 4,
  leftMargin: 4,
  rightMargin: 4
}

const defaultOutBorder: OutBorder = {
  display: true,
  bgColor: 'rgba(255,255,255,0)',
  borderWidth: 1,
  borderColor: 'rgba(61,153,25,1)',
  radius: 0,
  inMargin: defaultInMargin
}

const defaultGridConfig: GridConfig = {
  height: 16,
  width: 4,
  space: 2,
  radius: 0,
  bgColor: 'rgba(255,255,255,0)',
  gradientRange: 'local',
  startColor: '#3D99FC',
  endColor: '#8EF5FF',
  progressSection: false,
  progressStyleSection: []
}

const defaultProgressConfig: ProgressConfig = {
  barRadius: 0,
  outShadow: defaultShadowStyle,
  inShadow: defaultShadowStyle,
  gridConfig: defaultGridConfig,
  outBorder: defaultOutBorder
}

const defaultMessageBg: MessageBg = {
  display: true,
  type: 'color',
  bgColor: 'rgba(61,153,252,0,40)',
  imageUrl: '',
  borderColor: '#3D99FC',
  borderWidth: 1,
  radius: 0
}

const defaultTextConfig: TextConfig = {
  horiOffset: 0,
  vertOffset: 0,
  textStyle: defaultTextStyle,
  trueValue: true,
  unit: '',
  decimal: 0,
  round: true,
  negativeing: 'minus'
}

const defaultMessageConfig: MessageConfig = {
  display: true,
  width: 40,
  height: 20,
  position: 'out',
  inArrangement: 'right',
  outArrangement: 'right',
  horiOffset: 0,
  vertOffset: 0,
  messageBg: defaultMessageBg, // 提示背景
  textConfig: defaultTextConfig, // 文本配置
  messageSection: false,
  messageStyleSection: []
}

const defaultAnimat: AnimateConfig = {
  display: true,
  type: 'linear',
  timer: 500,
  proportion: 0
}

export {
  defaultProgressConfig,
  defaultShadowStyle,
  defaultGridConfig,
  defaultOutBorder,
  defaultMessageConfig,
  defaultAnimat
}
