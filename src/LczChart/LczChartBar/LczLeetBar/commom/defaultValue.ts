import { defaultNumberFormat } from '../../../../LczCarouselTable/common/defaultValue'
import { generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { defatultLineBarLegendConfig } from '../../../LczChartBlend/LczBasicLineBar/common/defaultValue'
import { defaultLegendConfig } from '../../../LczChartPie/Lcz3dTorus/common/defaultValue'
import { BarLegendConfig, GlobalConfig, ValueLabel, ShadowStyle, HighlightSeries, GlobalBarStyle } from '../type'

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

const defaultBarLegendConfig: BarLegendConfig = { ...defaultLegendConfig, spacing: 5 }

const defaultGlobalBarStyle: GlobalBarStyle = {
  bargap: 20,
  barCategoryGap: 30,
  GlobalBarType: 'system', //'system' | 'custom' | 'svg'
  systemStyle: 'rect', //'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
  customUrl: '',
  svgPath: '',
  symbolRepeat: false,
  symbolClip: true,
  symbolRotate: 0,
  barSize: {
    width: null,
    height: null
  },
  barPosition: {
    xOffset: 0,
    yOffset: 0
  },
  opacity: 100
}
const defaultGlobal: GlobalConfig = {
  margin: { t: 45, r: 25, b: 20, l: 25 },
  bgColor: 'rgba(0,0,0,0)',
  globalBarStyle: defaultGlobalBarStyle,
  titleConfig: generalTitleConfig,
  valueLabel: defaultValueLabel,
  legendConfig: defatultLineBarLegendConfig,
  toolConfig: generalToolConfig,

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

export { defaultGlobal, defaultBarLegendConfig, defaultShadowStyle, defaultHighlightSeries, defaultGlobalBarStyle }
