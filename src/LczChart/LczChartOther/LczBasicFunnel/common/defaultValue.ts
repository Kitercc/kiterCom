import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { generalShadowStyle, generalTitleConfig } from '../../../common/generalValue'
import { BSPieLegendConfig } from '../../../LczChartPie/LczBasicPie/type'
import { CenterLabel, FunnelConfig, FunnelGlobalConfig, FunnelLabel, FunnelLine } from '../type'

const defaultFunnelLegend: BSPieLegendConfig = {
  display: true,
  size: { w: 12, h: 12 },
  iconConfig: {
    iconType: 'system',
    systemStyle: 'rect',
    customUrl: ''
  },
  seriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal'
  },
  proportion: {
    display: false,
    decimal: 1,
    speed: 8,
    legendProportionColorFollow: true,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  trueValue: {
    display: false,
    speed: 0,
    numberformat: defaultNumberFormat,
    prefix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      legendProportionColorFollow: true,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    },
    suffix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      legendProportionColorFollow: true,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    }
  },
  layout: {
    distributionMode: 'unilateral',
    itemGap: 20,
    orient: 'vertical',
    xPosition: 'center',
    yPosition: 'top',
    xOffset: 0,
    yOffset: 0,
    layoutmode: 'leftright'
  },
  clickInt: { display: true, disableStyles: '#ccc' }
}

const defaultFunnelLine: FunnelLine = {
  display: true,
  syncColor: true,
  color: '#FFFFFF',
  lineLength: 1,
  lineWidth: 1,
  lineStyle: 'solid',
  opacity: 100,
  shadow: generalShadowStyle
}

const defaultFunnelLabel: FunnelLabel = {
  display: true,
  verticalPosition: 'left', //left  | right
  horizontalPosition: 'top', //top | bottom
  funnelLine: defaultFunnelLine,
  seriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal'
  }, // 数据项
  proportion: {
    // 占比值
    display: true,
    decimal: 1,
    speed: 5,
    propColorFollow: true,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  trueValue: {
    // 真实值
    display: false,
    speed: 0,
    trueColorFollow: true,
    numberformat: defaultNumberFormat,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal',
    prefix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      labelPrefixColorFlow: true,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    },
    suffix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      labelSuffixColorFlow: true,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    }
  }
}

const defaultCenterLabel: CenterLabel = {
  display: true,
  seriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 14,
    color: '#088cc9',
    fontWeight: 'normal'
  }, // 系列名
  proportion: {
    // 占比值
    display: true,
    decimal: 1,
    speed: 5,
    centerPropColorFollow: false,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  trueValue: {
    // 真实值
    display: true,
    speed: 10,
    centerTrueColorFollow: false,
    fontFamily: 'PingFangSC-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    fontWeight: 'normal',
    numberformat: {
      display: true,
      decollate: true,
      decimal: 0,
      round: false,
      negativeing: 'minus'
    },

    prefix: {
      display: false,
      content: 'prefix',
      xOffset: 0,
      yOffset: 0,
      centerLabelPrefixColorFlow: false,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    },
    suffix: {
      display: false,
      content: 'suffix',
      xOffset: 0,
      yOffset: 0,
      centerLabelSuffixColorFlow: false,
      fontFamily: 'PingFangSC-Regular',
      fontSize: 13,
      color: '#FFFFFF',
      fontWeight: 'normal'
    }
  }
}

const defaultFunnelGlobal: FunnelGlobalConfig = {
  backgroundColor: 'rgba(0,0,0,0)',
  margin: {
    t: 50,
    r: 50,
    b: 50,
    l: 50
  },
  titleConfig: generalTitleConfig,
  labelConfig: defaultFunnelLabel,
  centerLabel: defaultCenterLabel,
  dataAnimate: true
}

const defaultFunnelConfig: FunnelConfig = {
  graphConfig: {
    funnelOrient: 'vertical', //'vertical' | 'horizontal'
    funnelAlign: 'center', //'left' | 'right' | 'center'
    height: 1,
    width: 1,
    minSize: 0,
    maxSize: 100,
    gapStep: 0
  },
  borderConfig: {
    display: false,
    borderColor: '#0B0C0F',
    borderWidth: 1,
    borderType: 'solid' //solid dashed dotted
  },
  shadowStyle: {
    shadowBlur: 4,
    shadowColor: '#ffe600e4',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }
}
export { defaultFunnelLegend, defaultFunnelLine, defaultFunnelLabel, defaultFunnelGlobal, defaultFunnelConfig }
