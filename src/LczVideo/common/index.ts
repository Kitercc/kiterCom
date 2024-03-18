import { FilterConfig, Shadow } from '../type'

const defaultShadow: Shadow = {
  display: false,
  color: 'rgba(0,0,0,0.50)',
  xOffset: 0,
  yOffset: 0,
  vague: 4
}
const defaultFilter: FilterConfig = {
  blur: { display: false, value: 5 },
  brightness: { display: false, value: 50 },
  contrastRatio: { display: false, value: 50 },
  grayscale: { display: false, value: 50 },
  hue: { display: false, value: 0 },
  antiColor: { display: false, value: 0 },
  saturation: { display: false, value: 100 },
  brown: { display: false, value: 0 },
  shadow: defaultShadow
}

const filterMap = {
  blur: { code: 'blur', symbol: 'px' },
  brightness: { code: 'brightness', symbol: '%' },
  contrastRatio: { code: 'contrast', symbol: '%' },
  grayscale: { code: 'grayscale', symbol: '%' },
  hue: { code: 'hue-rotate', symbol: 'deg' },
  antiColor: { code: 'invert', symbol: '%' },
  saturation: { code: 'saturate', symbol: '%' },
  brown: { code: 'sepia', symbol: '%' },
  shadow: function (obj: Shadow) {
    const { color, xOffset, yOffset, vague } = obj
    return `drop-shadow(${xOffset}px ${yOffset}px ${vague}px ${color})`
  }
}

export { defaultFilter, filterMap }
