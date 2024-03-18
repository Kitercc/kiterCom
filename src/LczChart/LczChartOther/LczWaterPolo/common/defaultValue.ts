import { generalTitleConfig } from '../../../common/generalValue'
import { BallStyle, GlobalConfig, IndexConfig, OutlineStyle, WaveStyle } from '../type'

const defaultGlobal: GlobalConfig = {
  margin: { x: 50, y: 50 },
  bgColor: 'rgba(0,0,0,0)',
  titleConfig: generalTitleConfig,
  dataAnimate: {
    display: true,
    direction: 'right',
    amplitude: 8,
    period: null
  }
}

const defaultIndexConfig: IndexConfig = {
  display: true,
  textStyle: {
    fontFamily: 'DIN-Medium',
    fontSize: 56,
    color: '#FFFFFF',
    insideColor: '#FFFFFF',
    fontWeight: 'normal',
    xAlign: 'center',
    yAlign: 'middle',
    format: {
      display: false,
      decimal: 0,
      round: true,
      negativeing: 'minus',
      percentage: true
    }
  },
  position: 'inside'
}

const defaultBallStyle: BallStyle = {
  radius: 76,
  shape: 'system',
  symbol: 'circle',
  path: '',
  color: 'rgba(0,0,0,0)',
  opacity: 100,
  shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
}

const defaultWaveStyle: WaveStyle = {
  waveLength: 80,
  color: 'rgba(255,255,255,1)',
  opacity: 100,
  shadow: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
}

const defaultOutlineStyle: OutlineStyle = {
  display: true,
  borderDistance: 10,
  color: 'rgba(0,178,255,0.4)',
  width: 2,
  shadow: { shadowBlur: 0, shadowColor: 'rgba(255,0,0,1)', shadowOffsetX: 0, shadowOffsetY: 0 }
}

export { defaultGlobal, defaultIndexConfig, defaultBallStyle, defaultWaveStyle, defaultOutlineStyle }
