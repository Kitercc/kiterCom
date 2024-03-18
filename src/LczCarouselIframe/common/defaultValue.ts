import { ArrowConfig, CarouselConfig, PagerConfig } from '../type'

const defaultCarouselConfig: CarouselConfig = {
  display: true,
  autoplaySpeed: 3000,
  infinite: true,
  hoverStop: false,
  hoverInterval: 20000,
  position: 'after',
  moveStay: true
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
const defaultArrowsConfig: ArrowConfig = {
  display: false,
  spacing: 20,
  offset: 0,
  size: 40,
  resources: 'system', // system 系统 custom 自定义
  type: 'zuo1',
  imgUrl: '',
  colorObj: {}
}

export { defaultCarouselConfig, defaultPagerConfig, defaultArrowsConfig }
