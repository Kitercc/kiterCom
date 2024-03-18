import { ArrowConfig } from '../LczCircularTarget/type'

export interface ScrollImageGlobal {
  mode: 'horizontal' | 'vertical'
  imgNums: number
  gap: number
}

export type DataMap = {
  id: any
  url: string
}

export interface ScrollImageConfig {
  clickPreview: boolean
  bgColor: string
  fillStyle: 'stretchFill' | 'adaptive' | 'beFill' | 'noStretch' | 'center' //自适应 adaptive 充满 beFill 拉伸充满 stretchFill 不拉伸 noStretch
  imgSeries: DataMap[]
}

export interface CarouselConfig {
  display: boolean // 是否轮播
  autoplaySpeed: number // 自动播放间隔
  position: 'before' | 'after' // 轮播方向
  moveStay: boolean // 移入暂停
}
export interface AnimationConfig {
  clickCenter: boolean
  switchSpeed: number // 切换时间
  scrollNums: 'oneItem' | 'onePage'
  carouselConfig: CarouselConfig
}

export type HandlerChange = (data: DataMap) => void

export interface ScrollImageProps {
  w?: number
  h?: number
  global?: ScrollImageGlobal
  imgConfig?: ScrollImageConfig
  animationConfig?: AnimationConfig
  arrowConfig?: ArrowConfig
  data?: DataMap[]
  onMouseenter?: (data: DataMap) => void
  onMouseleave?: (data: DataMap) => void
  onClick?: HandlerChange
}
