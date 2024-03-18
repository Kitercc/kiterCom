import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { generalShadowStyle, generalTitleConfig } from '../../../common/generalValue'
import { GlobalConfig, NumberLabel, PieChart, Graphical, pieSelect } from '../type'

const defaultNumberLabel: NumberLabel = {
  display: true,
  seriesName: { display: true, fontFamily: 'Microsoft Yahei', fontSize: 12, color: '#E6F7FF', fontWeight: 'normal' }, // 系列名
  proportion: {
    // 占比值
    display: false,
    decimal: 0,
    propColorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal'
  },
  trueValue: {
    // 真实值
    display: false,
    speed: 0,
    numberformat: defaultNumberFormat,
    trueColorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal',
    prefix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      prefixColorFollow: true,
      fontFamily: 'Microsoft Yahei',
      fontSize: 12,
      color: '#E6F7FF',
      fontWeight: 'normal'
    },
    suffix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      suffixColorFollow: true,
      fontFamily: 'Microsoft Yahei',
      fontSize: 12,
      color: '#E6F7FF',
      fontWeight: 'normal'
    }
  }
}

const defaultGlobalConfig: GlobalConfig = {
  backgroundColor: 'rgba(0,0,0,0)',
  margin: {
    x: 0,
    y: 0
  },
  titleConfig: generalTitleConfig,
  numberLabel: defaultNumberLabel
}

const defaultGraphical: Graphical = {
  radius: 8,
  outRadius: 12,
  space: 10,
  opacity: 100,
  borderRadius: 0
}

const defaultPieSelect: pieSelect = {
  display: true,
  initSelect: { value: '' },
  selectedOffset: 10,
  opacity: 100
}

const defaultPieChart: PieChart = {
  graphical: defaultGraphical,
  bgPie: {
    display: true,
    color: 'pink',
    opacity: 100,
    borderRadius: 2,
    endAngle: 0
  },
  select: defaultPieSelect,

  border: {
    display: false,
    color: 'rgba(1,1,1,0)',
    width: 1,
    type: 'solid'
  },
  shadow: generalShadowStyle
}

export { defaultGlobalConfig, defaultNumberLabel, defaultPieChart, defaultGraphical, defaultPieSelect }
