import { CustomPage, HandlerChange } from '../LczScrollPage/type'

export type DataMap = {
  id: number | string
  name: string
  url: string
}

export interface CarouselConfig {
  display: boolean // 是否轮播
  autoplaySpeed: number // 自动播放间隔
  infinite: boolean // 循环播放
  hoverStop?: boolean // 鼠标置于页面上时是否自动停止轮播
  hoverInterval?: number //鼠标停止动作后继续轮播
  position: 'before' | 'after' // 轮播方向
  moveStay: boolean // 移入暂停
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

export interface ArrowConfig {
  display: boolean
  showType?: 'all' | 'hover'
  spacing: number
  offset: number
  resources: string // system 系统 custom 自定义
  type?: string
  size?: number
  imgWidth?: number
  imgHeight?: number
  imgUrl?: string
  colorObj: any
}

export interface CarouseIframeProps {
  id?: string
  carouseEffect?: 'scroll' | 'fade' // scrollx普通  fade 淡入
  switchSpeed?: number // 切换时间
  mode?: 'horizontal' | 'vertical'
  type?: 'index' | 'id' // index  id
  index?: { value: number }
  defaultId?: { value: string | number }
  carouselConfig?: CarouselConfig
  pagerConfig?: PagerConfig
  arrowsConfig?: ArrowConfig
  customPage?: CustomPage[]
  w?: number
  h?: number
  data?: DataMap[]
  onChange?: HandlerChange
  onMouseenter?: HandlerChange
  onMouseleave?: HandlerChange
}
