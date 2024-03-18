import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { generalLegendConfig, generalTitleConfig, generalToolConfig } from '../../../common/generalValue'

import { GlobalConfig, ValueLabel, HighlightSeries } from '../type'

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

const defaultGlobal: GlobalConfig = {
  margin: { t: 45, r: 25, b: 20, l: 25 },
  bgColor: 'rgba(0,0,0,0)',
  barStyle: {
    barType: 'square',
    bargap: 20,
    barCategoryGap: 30,
    barBgColor: {
      display: false,
      color: '#B4B4B4',
      opacity: 20
    }
  },
  titleConfig: generalTitleConfig,
  valueLabel: defaultValueLabel,
  legendConfig: generalLegendConfig,
  toolbarConfig: generalToolConfig,
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

const defaultHighlightSeries: HighlightSeries = {
  display: true,
  extremum: 'max',
  color: ''
}

export { defaultGlobal, defaultHighlightSeries }
