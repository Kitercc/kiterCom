import { CarouselConfig, PagerConfig, ScrollGlobal } from '../type'

const defaultGlobal: ScrollGlobal = {
  type: 'index',
  index: { value: 0 },
  defaultId: { value: '1' },
  pageNum: 3,
  pageSpeed: 20,
  mode: 'horizontal',
  unselected: {
    proportion: 0.75,
    offset: 0
  },
  animate: {
    switchEffect: 'slide',
    switchSpeed: 1500
  }
}

const defaultCarousel: CarouselConfig = {
  display: true,
  speed: 1500,
  position: 'after',
  moveStay: true
}

const defaultpager: PagerConfig = {
  display: false,
  horiPosition: 'bottom',
  vertPosition: 'left',
  xOffset: 0,
  yOffset: 0,
  wdith: 8,
  height: 8,
  radios: 4,
  speed: 12,
  defaultColor: 'rgba(255,255,255,0.3)',
  activeColor: '#3D99FC'
}

export { defaultGlobal, defaultCarousel, defaultpager }
