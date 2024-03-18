import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { generalShadowStyle, generalTitleConfig } from '../../../common/generalValue'
import { GlobalConfig, NumberLabel, GuideLine, PieChart, Graphical, pieSelect } from '../type'

const defaultGuideLine: GuideLine = {
  display: true,
  spacing: 2,
  lineStyle: {
    syncColor: true,
    color: 'skyblue',
    len1: 6,
    len2: 4,
    edgeDistance: 20,
    lineWidth: 1,
    opacity: 100
  },
  alignment: 'none',
  shadow: generalShadowStyle
}

const defaultNumberLabel: NumberLabel = {
  display: true,
  distribution: 'horizontal',
  // xOffset: 0,
  // yOffset: 0,
  position: 'outside',
  guideLine: defaultGuideLine,
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
  radius: 50,
  opacity: 100,
  borderRadius: 0,
  clockwise: true,
  showEmptyCircle: false,
  emptyColor: '#D3D3D3'
}

const defaultPieSelect: pieSelect = {
  display: true,
  mode: 'single',
  initSelect: { value: '' },
  selectStyle: {
    selectedOffset: 10,
    opacity: 100
  }
}

const defaultPieChart: PieChart = {
  graphical: defaultGraphical,
  angle: {
    startAngle: 90,
    minAngle: 0
  },
  select: defaultPieSelect,
  highlight: {
    display: true,
    scaleSize: 10,
    focus: false
  },
  border: {
    display: false,
    color: 'rgba(1,1,1,0)',
    width: 1,
    type: 'solid'
  },
  shadow: generalShadowStyle
}

export {
  defaultGlobalConfig,
  defaultNumberLabel,
  defaultGuideLine,
  defaultPieChart,
  defaultGraphical,
  defaultPieSelect
}
