import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { CurrentValue, GlobalConfig, LegendConfig, PieChartProper, RotateAnimation } from '../type'

const defaultLegendConfig: LegendConfig = {
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
    decimal: 0,
    colorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal'
  },
  trueValue: {
    display: false,
    speed: 0,
    numberformat: defaultNumberFormat,
    colorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal',
    prefix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      colorFollow: true,
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
      colorFollow: true,
      fontFamily: 'Microsoft Yahei',
      fontSize: 12,
      color: '#E6F7FF',
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

const defaultGlobal: GlobalConfig = {
  margin: {
    t: 20,
    l: 20
  },
  bgColor: '#E6F7FF',
  cameraSettings: {
    visualAngle: 30,
    sightDistance: 200
  },
  sort: 'normal',
  legendConfig: defaultLegendConfig
}

const defaultCurrentValue: CurrentValue = {
  display: true,
  position: { x: 0, y: 0 },
  spacing: 0,
  currentSeriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal',
    xOffset: 0,
    yOffset: 0
  },
  currentProportion: {
    display: true,
    decimal: 1,
    colorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#E6F7FF',
    fontWeight: 'normal',
    xOffset: 0,
    yOffset: 0
  },
  currentTrueValue: {
    display: true,
    colorFollow: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    numberformat: defaultNumberFormat,
    color: '#E6F7FF',
    fontWeight: 'normal',
    xOffset: 0,
    yOffset: 0,
    currentPrefix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      colorFollow: true,
      fontFamily: 'Microsoft Yahei',
      fontSize: 12,
      color: '#E6F7FF',
      fontWeight: 'normal'
    },
    currentSuffix: {
      display: true,
      content: '',
      xOffset: 0,
      yOffset: 0,
      colorFollow: true,
      fontFamily: 'Microsoft Yahei',
      fontSize: 12,
      color: '#E6F7FF',
      fontWeight: 'normal'
    }
  }
}

const defaultPieChartProper: PieChartProper = {
  pieConfig: {
    innerOutRadiusRatio: 0.75,
    contour: true,
    height: 4.5,
    minHeight: 2,
    maxHeight: 6
  },
  currentValue: defaultCurrentValue
}

const defaultRotateAnimation: RotateAnimation = {
  animateDis: true,
  current: { highGrowth: 2, opacity: 1 },
  interval: 3,
  interactionMode: 'none'
}

export { defaultGlobal, defaultLegendConfig, defaultPieChartProper, defaultCurrentValue, defaultRotateAnimation }
