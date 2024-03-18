export interface VideoConfig {
  controls?: boolean
  loop?: boolean
  muted?: boolean
  volume?: number
}

export interface GlobalConfig {
  type?: 'index' | 'id' // index  id
  index?: { value: number }
  defaultId?: { value: string | number }
  videoConfig?: VideoConfig
}

export interface CarouselConfig {
  display: boolean // 是否轮播
  autoplaySpeed: number // 自动播放间隔
  position: 'before' | 'after' // 轮播方向
  moveStay: boolean // 移入暂停
}

export interface AnimationConfig {
  carouseEffect: 'scroll' | 'fade' | 'flip' | 'cube' | 'coverflow' // scrollx普通  fade 淡入 flip翻转 cube 方块 coverflow 折叠
  switchSpeed: number // 切换时间
  mode: 'horizontal' | 'vertical'
  carouselConfig: CarouselConfig
}

export interface PagerConfig {
  display: boolean
  horiPosition?: 'top' | 'bottom'
  vertPosition?: 'left' | 'right'
  width: number
  height: number
  xOffset: number
  yOffset: number
  radius: number
  speed: number
  bgColor: string
  activeBgColor: string
}

export type DataMap = {
  id: number | string
  url: string
  title: string
}

export interface CarouselVideoSteamProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  animationConfig?: AnimationConfig
  pagerConfig?: PagerConfig
  data?: DataMap[]
  onChange?: (item: DataMap) => void
}
