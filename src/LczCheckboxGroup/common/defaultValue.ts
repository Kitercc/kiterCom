import { CheckConfig, GlobalConfig, NormalStyle } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  mode: 'row',
  rownum: 3,
  rowAdapt: false,
  bisectorWidth: false,
  colnum: 3,
  horizontalSpacing: 18,
  verticalSpacing: 8,
  show: 'initial',
  checkConfig: {
    display: true,
    position: 'before',
    size: 14,
    spacing: 8,
    fillet: 2
  },
  textStyle: {
    fontFamily: 'PingFangSC-Regular',
    letterSpacing: 0
  }
}
const defaultNormalStyle: NormalStyle = {
  checkStyle: { color: '#677382', width: 1, bgColor: 'rgba(255,255,255,0)' },
  textStyle: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'normal'
  },
  hoverStyle: {
    display: true,
    checkStyle: {
      display: true,
      color: '#3d99fc',
      bgColor: 'rgba(255,255,255,0)'
    },
    hoverTextStyle: {
      display: false,
      fontSize: 14,
      color: '#3d99fc',
      fontWeight: 'normal'
    }
  }
}

const defaultFocus: NormalStyle = {
  checkStyle: { color: '#3d99fc', bgColor: 'rgba(255,255,255,0)', tickColor: '#3d99fc' },
  textStyle: {
    display: true,
    fontSize: 14,
    color: '#3d99fc',
    fontWeight: 'normal'
  },
  hoverStyle: {
    display: false,
    checkStyle: {
      display: false,
      color: '#3d99fc',
      bgColor: 'rgba(255,255,255,0)',
      tickColor: '#3d99fc'
    },
    hoverTextStyle: {
      display: false,
      fontSize: 14,
      color: '#3d99fc',
      fontWeight: 'normal'
    }
  }
}

const defaultCheckConfig: CheckConfig = defaultGlobalConfig.checkConfig as CheckConfig

export { defaultGlobalConfig, defaultCheckConfig, defaultNormalStyle, defaultFocus }
