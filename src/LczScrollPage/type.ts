import { ArrowConfig, GlobalConfig } from '../LczCircularTarget/type'

export type DataMap = {
  id: number | string
  name?: string
  url?: string
}

export interface ScrollGlobal extends GlobalConfig {
  pageNum: 1 | 3 | 5 | 7 | 9 | 11 | 13
  mode: 'horizontal' | 'vertical'
  pageSpeed: number
  unselected?: {
    proportion: number
    offset: number
  }
  animate: {
    switchEffect: 'slide' | 'fade'
    switchSpeed: number
  }
}

export interface CarouselConfig {
  display: boolean
  speed: number
  position: 'before' | 'after'
  moveStay: boolean
}

export interface PagerConfig {
  display: boolean
  horiPosition?: 'top' | 'bottom'
  vertPosition?: 'left' | 'right'
  xOffset: number
  yOffset: number
  wdith: number
  height: number
  radios: number
  speed: number
  defaultColor: string
  activeColor: string
}

export interface CustomPage {
  id: string | number
  contain: {
    link: any
    url: string
  }
}

export type HandlerChange = (data: DataMap, index: number) => void

export interface ScrollProps {
  id?: string
  w?: number
  h?: number
  global?: ScrollGlobal
  carousel?: CarouselConfig
  pagerConfig?: PagerConfig
  arrowConfig?: ArrowConfig
  customPage?: CustomPage[]
  data?: DataMap[]
  onMouseenter?: (data: DataMap) => void
  onMouseleave?: (data: DataMap) => void
  onChange?: HandlerChange
}
