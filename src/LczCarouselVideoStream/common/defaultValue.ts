import { AnimationConfig, CarouselConfig, GlobalConfig, PagerConfig } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  type: 'index',
  index: { value: 0 },
  defaultId: { value: '1' },
  videoConfig: {
    controls: true,
    loop: false,
    muted: true,
    volume: 50
  }
}

const defaultCarouselConfig: CarouselConfig = {
  display: true,
  autoplaySpeed: 3000,
  position: 'after',
  moveStay: true
}

const defaultAnimationConfig: AnimationConfig = {
  carouseEffect: 'scroll',
  switchSpeed: 500,
  mode: 'horizontal',
  carouselConfig: defaultCarouselConfig
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

export { defaultGlobalConfig, defaultCarouselConfig, defaultAnimationConfig, defaultPagerConfig }
