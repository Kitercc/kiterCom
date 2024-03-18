import { ArrowConfig } from '../../LczCarouselIframe/type'
import { PagerConfig } from '../../LczScrollPage/type'
import { CardContainer } from './child'

interface Animate {
  display: boolean
  stopCondition: boolean
  updataNum: number
  switchSpeed: number
  timeInterval: number
  speed: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' // 匀速 慢快慢 低速开始 低速结束 低速开始和结束
  animatConnect: 'headTail' | 'startAgain' // 动画衔接 headTail首尾衔接  startAgain重头开始
}

interface GlobalConfig {
  arrangementMode: 'horizontal' | 'portrait' // horizontal 横向 portrait 纵向
  horizontalNumber?: number //   横向个数
  portraitNumber?: number //纵向个数
  horiSpeed: number
  portSpeed: number
  overflow: 'initial' | 'hidden' | 'animate'
  horiOverflow: 'left' | 'center' | 'right'
  portOverflow: 'top' | 'center' | 'bottom'
  animateConfig?: {
    animate?: Animate
    pager?: PagerConfig
    arrowConfig?: ArrowConfig
  }
}

interface CardStyle {
  background: any
  backgroundImage: string

  border?: {
    display: boolean
    width: number
    color: string
  }
  radius: number
}

type Component = CardContainer

export interface CardListProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  cardStyle?: CardStyle
  childComponents?: Component[]
  data?: any[]
  onClick?: (param: any) => void
}
