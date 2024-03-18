import { CustomPage, PagerConfig, GlobalConfig, AnimationConfig } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  type: 'index',
  index: { value: 0 },
  defaultId: { value: 1 }
}

const defaultAnimationConfig: AnimationConfig = {
  carouseEffect: 'scroll',
  switchSpeed: 500,
  mode: 'horizontal',
  carouselConfig: {
    display: true,
    autoplaySpeed: 3,
    position: 'after',
    moveStay: true
  }
}

const defaultPagerConfig: PagerConfig = {
  display: true,
  width: 8,
  height: 8,
  radius: 4,
  xOffset: 0,
  yOffset: 0,
  speed: 12,
  bgColor: 'rgba(255,255,255,30)',
  activeBgColor: '#3D99FC',
  horiPosition: 'bottom',
  vertPosition: 'left'
}

const defaultCustomPage: CustomPage = {
  fillStyle: 'stretchFill',
  imgSeries: []
}

export { defaultGlobalConfig, defaultAnimationConfig, defaultPagerConfig, defaultCustomPage }
