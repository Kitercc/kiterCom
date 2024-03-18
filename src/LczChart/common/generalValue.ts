import {
  AngleAxis,
  GeneralAngleAxisLabel,
  GeneralAxis,
  GeneralAxisBgStyle,
  GeneralAxisLabel,
  GeneralAxisLine,
  GeneralAxisSplitArea,
  GeneralAxisSplitLine,
  GeneralAxisTick,
  GeneralAxisUnit,
  GeneralLegend,
  GeneralNumberFormat,
  GeneralRadialAxisLabel,
  GeneralShadowStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltipConfig,
  GeneralXAxis,
  GeneralYAxis,
  GeneralYaxisLabel,
  GeneralYlabelBgStyle,
  GeneralYlabelStyle,
  PolarAxisConfig,
  RadialAxis,
  GeneralTipSuffixConfig
} from './type'

/**
 * 标题
 */
const generalTitleConfig: GeneralTitle = {
  display: false,
  content: { value: '' },
  fontFamily: 'PingFangSC-Regular',
  fontSize: 18,
  color: '#ffffff',
  fontWeight: 'normal',
  subTitle: {
    display: false,
    content: { value: '' },
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal'
  },
  speed: 10,
  xPosition: 'left',
  yPosition: 'top',
  xOffset: 0,
  yOffset: 0
}

const generalNumberFormat: GeneralNumberFormat = {
  display: true,
  decollate: true,
  decimal: 2,
  round: false,
  percentage: false,
  negativeing: 'minus'
}

/**
 * 图例
 */
const generalLegendConfig: GeneralLegend = {
  display: true,
  seriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  iconConfig: {
    iconType: 'system',
    systemStyle: 'rect',
    customUrl: ''
  },
  size: { w: 10, h: 10 },
  spacing: 5,
  layout: {
    distributionMode: 'unilateral',
    itemGap: 20,
    layoutmode: 'leftright',
    orient: 'vertical',
    xPosition: 'center',
    yPosition: 'top',
    xOffset: 0,
    yOffset: 0
  },
  clickInt: { display: true, disableStyles: '#ccc' }
}

/**
 * 工具栏
 */
const generalToolConfig: GeneralToolBox = {
  display: false,
  layOut: {
    orient: 'horizontal',
    toolBoxPosition: {
      toolxPosition: 'right',
      toolyPosition: 'top',
      xOffset: 0,
      yOffset: 0
    }
  },
  toolStyle: {
    size: 15,
    itemGap: 10,
    showTitle: true
  },
  tool: {
    saveAsImage: true,
    restore: true,
    magicType: true
  }
}

const generalShadowStyle: GeneralShadowStyle = {
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0
}

const generalAxisBgStyle: GeneralAxisBgStyle = {
  backgroundColor: 'rgba(0,0,0,0)',
  borderColor: 'rgba(0,0,0,0)',
  borderWidth: 0,
  borderRadius: 0
}
const generalxAxisLabel: GeneralAxisLabel = {
  display: true,
  labelType: 'category',
  // time in
  time: 'YYYY年MM月',
  splitType: 'auto',
  splitNumber: 6,
  leftMargin: 0,
  rightMargin: 0,
  showMaxLabel: false,
  showMinLabel: false,

  // category
  spaceType: 'auto',
  space: 0,
  textRotate: 0,
  boundaryGap: true,

  axisStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    width: null,
    overflow: 'truncate',

    padding: 0
  },
  axisBgStyle: generalAxisBgStyle,
  axisLabelShadow: generalShadowStyle
}

const generalRadialAxisLabel: GeneralRadialAxisLabel = {
  display: true,
  startAngle: 70,
  clockwise: true,
  spaceType: 'auto',
  space: 0,
  textRotate: 0,
  axisStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    width: null,
    overflow: 'truncate',

    padding: 0
  },
  axisBgStyle: generalAxisBgStyle,
  axisLabelShadow: generalShadowStyle
}

const generalAxisSplitArea: GeneralAxisSplitArea = {
  display: false,
  splitAreaStyle: {
    colorSeries: [{ value: 'rgba(250,250,250,1)' }, { value: 'rgba(200,200,200,1)' }],
    opacity: 30
  },
  splitAreaShadow: { shadowBlur: 2, shadowColor: 'rgba(255,0,0,1)', shadowOffsetX: 0, shadowOffsetY: 0 }
}

const generalAxisUnit: GeneralAxisUnit = {
  display: false,
  content: '',
  nameLocation: 'end',
  unitStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    width: null,
    overflow: 'truncate',
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: 'rgba(0,0,0,0)',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    nameRotate: 0
  },
  unitShadow: generalShadowStyle
}

const generalAxisLine: GeneralAxisLine = {
  display: true,
  lineStyle: {
    symbol: 'none',
    symbolW: 10,
    symbolH: 15,
    color: '#FFFFFF',
    opacity: 100,
    width: 1
  },
  lineShadow: generalShadowStyle
}

const generalAxisTick: GeneralAxisTick = {
  display: false,
  tickStyle: {
    color: '#FFFFFF',
    opacity: 30,
    type: 'solid',
    width: 1,
    length: 2,
    inside: 'out'
  },
  tickShadow: generalShadowStyle
}
const generalAxisSplitLine: GeneralAxisSplitLine = {
  display: false,
  splitLineStyle: {
    lineType: 'solid',
    color: '#ccc',
    opacity: 20,
    width: 1
  },
  splitLineShadow: generalShadowStyle
}
const generalxAxis: GeneralXAxis = {
  display: true,
  axisLabel: generalxAxisLabel,
  axisUnit: generalAxisUnit,
  axisLine: generalAxisLine,
  axisTick: generalAxisTick,
  axisSplitLine: generalAxisSplitLine
}

const generalRadialAxis: RadialAxis = {
  display: true,
  axisLabel: generalRadialAxisLabel,
  axisUnit: generalAxisUnit,
  axisLine: generalAxisLine,
  axisTick: generalAxisTick,
  axisSplitLine: generalAxisSplitLine,
  axisSplitArea: generalAxisSplitArea
}

const generalyYLabelStyle: GeneralYlabelStyle = {
  fontFamily: 'PingFangSC-Regular',
  fontSize: 12,
  color: '#ffffff',
  fontWeight: 'normal',
  interval: 0,
  showWidth: null,
  overflow: 'none',
  padding: 0
}

const generalYLabelBgStyle: GeneralYlabelBgStyle = {
  backgroundColor: 'rgba(0,0,0,0)',
  borderColor: 'rgba(0,0,0,0)',
  borderWidth: 0,
  borderRadius: 0
}
const generalyAxisLabel: GeneralYaxisLabel = {
  display: true,
  min: null,
  max: null,
  splitAuto: true,
  minInterval: null,
  splitNumber: 6,
  suffixConfig: {
    content: ''
  },
  yLabelStyle: generalyYLabelStyle,
  yLabelBgStyle: generalYLabelBgStyle,
  yLabelShadow: generalShadowStyle,
  format: generalNumberFormat
}

const generalAngleAxisLabel: GeneralAngleAxisLabel = {
  display: true,
  startAngle: 70,
  clockwise: true,
  min: null,
  max: null,
  splitAuto: true,
  splitNumber: 6,
  suffixConfig: {
    content: ''
  },
  yLabelStyle: generalyYLabelStyle,
  yLabelBgStyle: generalYLabelBgStyle,
  yLabelShadow: generalShadowStyle,
  format: generalNumberFormat
}

const generalyAxis: GeneralYAxis = {
  display: true,
  yaxisLabel: generalyAxisLabel,
  axisUnit: generalAxisUnit,
  axisLine: generalAxisLine,
  axisTick: generalAxisTick,
  axisSplitLine: generalAxisSplitLine
}
const generalAngleAxis: AngleAxis = {
  display: true,
  yaxisLabel: generalAngleAxisLabel,
  axisLine: generalAxisLine,
  axisTick: generalAxisTick,
  axisSplitLine: generalAxisSplitLine,
  axisSplitArea: generalAxisSplitArea
}
/**
 * 坐标轴
 */
const generalAxis: GeneralAxis = {
  xAxis: generalxAxis,
  yAxis: generalyAxis
}

/**
 * 极轴
 */

const generalPolarAxisConfig: PolarAxisConfig = {
  radialAxis: generalRadialAxis,
  angleAxis: generalAngleAxis
}

const generalTipSuffixConfig: GeneralTipSuffixConfig = {
  display: false,
  content: '',
  gap: 4,
  yOffset: 0,
  tipTextStyle: {
    tipSuffixStyleAsync: true,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#D5E9FF',
    fontWeight: 'normal',
    fontStyle: 'normal'
  },
  tipSuffixSeries: []
}

/**
 * 提示框
 */
const GeneralToolTip: GeneralTooltipConfig = {
  autoPlay: { display: true, interval: 3 },
  hoverTrigger: {
    display: true,
    alwaysShowContent: false
  },
  tooltip: {
    tipposition: {
      offsetType: 'normal',
      xPosition: 0,
      yPosition: 0,
      margin: { t: 5, r: 7, b: 5, l: 7 }
    },
    tipStyle: {
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'normal'
      },
      bgStyle: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 20,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        className: ''
      }
    }
  },
  indicator: {
    type: 'shadow',
    snap: true
  },
  tipSuffixConfig: generalTipSuffixConfig
}

export {
  generalTitleConfig,
  generalLegendConfig,
  generalToolConfig,
  generalAxis,
  generalYLabelBgStyle,
  generalxAxis,
  generalyAxis,
  generalxAxisLabel,
  generalAxisBgStyle,
  generalyAxisLabel,
  GeneralToolTip,
  generalAxisUnit,
  generalAxisLine,
  generalAxisTick,
  generalAxisSplitLine,
  generalShadowStyle,
  generalNumberFormat,
  generalPolarAxisConfig,
  generalRadialAxis,
  generalAngleAxis,
  generalRadialAxisLabel,
  generalAngleAxisLabel,
  generalAxisSplitArea,
  generalTipSuffixConfig
}
