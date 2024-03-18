import { SignConfig } from '../../../LczSubwayLine/type/child'
import { ShadowConfig } from '../../../LczCustomGraphics/type'

const defaultSignConfig: SignConfig = {
  display: true,
  position: { x: 0, y: 0 },
  signStyle: {
    type: 'custom',
    imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
    width: 48,
    height: 48,
    iconValue: '',
    iconSize: 48,
    color: {
      selected: 'single',
      single: '#8EF5FF',
      gradient: {
        gradualAngle: 90,
        colors: [
          {
            begins: 0,
            value: 'rgba(255,255,255,1)'
          },
          {
            begins: 0,
            value: 'rgba(255,0,0,1)'
          }
        ]
      }
    }
  }
}

const defaultShoadow: ShadowConfig = {
  display: true,
  x: 0,
  y: 0,
  vague: 4,
  extend: 0,
  color: 'rgba(0,0,0,.5)'
}

export { defaultSignConfig, defaultShoadow }
