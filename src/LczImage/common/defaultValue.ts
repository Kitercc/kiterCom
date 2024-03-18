import { FilterConfig, Shadow } from '../../LczVideo/type'
import { AnimationConfig, FillColor } from '../type'

const defaultFillColor: FillColor = {
  display: true,
  color: {
    selected: 'single',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 0,
      colors: [
        {
          begins: 0,
          value: 'rgba(61, 153, 252,1)'
        }
      ]
    }
  }
}

const defaultAnimation: AnimationConfig = {
  display: false,
  delayed: 0,
  loop: true,
  interval: 0,
  animationType: 'opacity',
  duration: 3,
  speed: 'linear',
  keyFrame: []
}

const defaultShadow: Shadow = {
  display: false,
  color: 'rgba(0,0,0,0.5)',
  xOffset: 0,
  yOffset: 0,
  vague: 4
}

const defaultFilter: FilterConfig = {
  blur: { display: false, value: 5 },
  brightness: { display: false, value: 100 },
  contrastRatio: { display: false, value: 100 },
  grayscale: { display: false, value: 50 },
  hue: { display: false, value: 180 },
  antiColor: { display: false, value: 50 },
  saturation: { display: false, value: 100 },
  brown: { display: false, value: 50 },
  shadow: defaultShadow
}

export { defaultFillColor, defaultAnimation, defaultFilter }
