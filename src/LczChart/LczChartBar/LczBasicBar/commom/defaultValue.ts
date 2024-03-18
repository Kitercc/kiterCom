import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { GeneralLegend } from '../../../common/type'
import { defaultLegendConfig } from '../../../LczChartPie/Lcz3dTorus/common/defaultValue'
import { GlobalConfig, TitleConfig, ValueLabel, ToolbarConfig, ShadowStyle, HighlightSeries } from '../type'

const defaultTitleConfig: TitleConfig = {
  display: true,
  content: { value: '' },
  fontFamily: 'PingFangSC-Regular',
  fontSize: 12,
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

const defaultValueLabel: ValueLabel = {
  display: false,
  valueStyle: {
    fontFamily: 'PingFangSC-Regular',
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'normal',
    xOffset: 0,
    yOffset: 0,
    rotate: 0,
    format: defaultNumberFormat
  },
  position: 'top'
}

const defaultBarLegendConfig: GeneralLegend = { ...defaultLegendConfig, spacing: 5 }

const defaultToolbarConfig: ToolbarConfig = {
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

const defaultGlobal: GlobalConfig = {
  margin: { t: 45, r: 25, b: 20, l: 25 },
  bgColor: 'rgba(0,0,0,0)',
  barStyle: {
    barType: 'square',
    bargap: 20,
    fillet: { lt: 0, rt: 0, lb: 0, rb: 0 },
    barBgColor: {
      display: false,
      color: '#B4B4B4',
      opacity: 20,
      syncRadius: false,
      fillet: { lt: 0, rt: 0, lb: 0, rb: 0 }
    }
  },
  titleConfig: defaultTitleConfig,
  valueLabel: defaultValueLabel,
  legendConfig: defaultBarLegendConfig,
  toolbarConfig: defaultToolbarConfig,
  rotationAnimate: {
    display: false,
    interval: 3,
    interactionMode: 'none'
  },
  carouselAnimation: {
    display: true,
    showNumer: 3,
    updateNumber: 1,
    interval: 2,
    interactionMode: 'none' //'none' | 'click' | 'mouse'
  },
  dataAnimate: true
}

const defaultShadowStyle: ShadowStyle = {
  shadowBlur: 0,
  shadowColor: 'rgba(0,0,0,0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0
}

const defaultHighlightSeries: HighlightSeries = {
  display: true,
  extremum: 'max',
  color: ''
}

export {
  defaultGlobal,
  defaultTitleConfig,
  defaultBarLegendConfig,
  defaultToolbarConfig,
  defaultShadowStyle,
  defaultHighlightSeries
}
