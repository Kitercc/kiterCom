import { HandlerChange } from '../LczScrollPage/type'

export type DataMap = {
  id: number | string
  url: string
}

//轮播
export interface CarouselConfig {
  display: boolean // 是否轮播
  autoplaySpeed: number // 自动播放间隔
  position: 'before' | 'after' // 轮播方向
  moveStay: boolean // 移入暂停
}

// 全局
export interface GlobalConfig {
  type?: 'index' | 'id' // index  id
  index?: { value: number }
  defaultId?: { value: string | number }
}
//分页器配置
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

//动画
export interface AnimationConfig {
  carouseEffect: 'scroll' | 'fade' | 'flip' | 'cube' | 'coverflow' // scrollx普通  fade 淡入 flip翻转 cube 方块 coverflow 折叠
  switchSpeed: number // 切换时间
  mode: 'horizontal' | 'vertical'
  carouselConfig: CarouselConfig
}
//自定义图片
export interface CustomPage {
  fillStyle: string
  imgSeries: DataMap[]
}

export interface CarouselImageProps {
  globalConfig?: GlobalConfig
  animationConfig?: AnimationConfig
  pagerConfig?: PagerConfig
  customPage?: CustomPage
  data?: DataMap[]
  w?: number
  h?: number
  onClick?: HandlerChange
  onMouseenter?: HandlerChange
  onMouseleave?: HandlerChange
}
