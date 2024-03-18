import { generalLegendConfig, generalTitleConfig, generalToolConfig } from '../../../common/generalValue'
import { RadarbrokenLine, RadarGlobalConfig } from '../type'

const c = {
  selected: 'single',
  single: 'rgba(61,153,252,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(0,178,255,1)'
      }
    ]
  }
}

const defaultRadarGlobal: RadarGlobalConfig = {
  backgroundColor: 'rgba(0,0,0,0)',
  margin: { x: 40, y: 50 },
  titleConfig: generalTitleConfig,
  legendConfig: generalLegendConfig,
  toolConfig: generalToolConfig,
  dataAnimate: true
}

const deafultRadarBrokenLine: RadarbrokenLine = {
  lineType: 'solid', // 'solid' | 'dashed' | 'dotted'
  color: c,
  width: 1,
  opacity: 100,
  shadow: {
    shadowBlur: 0,
    shadowColor: 'rgba(0,0,0,0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0
  }
}
export { defaultRadarGlobal, deafultRadarBrokenLine }
