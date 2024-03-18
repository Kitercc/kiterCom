import { GlobalConfig, BarLineLegendConfig } from '../type'
import { generalTitleConfig, generalToolConfig } from '../../../common/generalValue'

const defatultLineBarLegendConfig: BarLineLegendConfig = {
  display: true,
  seriesName: {
    display: true,
    fontFamily: 'Microsoft Yahei',
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'normal'
  },
  iconConfig: {
    legendType: 'normal',
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

const defaultGlobal: GlobalConfig = {
  margin: { t: 45, r: 25, b: 20, l: 25 },
  bgColor: 'rgba(0,0,0,0)',
  barStyle: {
    barType: 'square',
    radius: {
      lt: 0,
      rt: 0,
      lb: 0,
      rb: 0
    },
    bargap: 20,
    barCategoryGap: 30,
    barBgConfig: {
      display: false,
      color: '#B4B4B4',
      opacity: 20,
      syncRadius: true,
      radius: {
        lt: 0,
        rt: 0,
        lb: 0,
        rb: 0
      }
    }
  },
  titleConfig: generalTitleConfig,
  legendConfig: defatultLineBarLegendConfig,
  toolbarConfig: generalToolConfig,
  dataAnimate: true
}

export { defaultGlobal, defatultLineBarLegendConfig }
