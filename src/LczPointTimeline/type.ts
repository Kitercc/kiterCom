import { IconArrowConfig } from '../LczTabBar/type'

export type DataMap = { id: number | string; text: string; content: string }

export interface GlobalConfig {
  valueType: 'index' | 'id'
  index: ExpValue<any>
  id: ExpValue<number | string>
  direction: 'level' | 'vertical'
  itemAxisWidth: number
  axisPadding: number
  distribution: 'unilateral' | 'bothSides'
  lineStyle?: {
    color: string
    size: number
  }
  arrowConfig?: IconArrowConfig
  contentList?: { field: string }[]
}

interface PointStyle {
  imgUrl: string
  width: number
  height: number
  xOffset: number
  yOffset: number

  bothSideSpacing: number // 双侧时的间距
}

interface LabelStyle {
  width: number | undefined
  height: number | undefined
  xAlign: 'left' | 'center' | 'right' | 'justify'
  yAlign: 'top' | 'center' | 'bottom'
  expDirection: 'up' | 'down'
  xOffset: number
  yOffset: number

  bothSideSpacing: number // 双侧时的间距

  textStyle?: TextStyle
}

interface ContentStyle extends LabelStyle {
  itemGap: number
}

interface TimelineStyle {
  point?: PointStyle
  labelStyle?: LabelStyle
  contentStyle?: ContentStyle
}

interface AnimateConfig {
  duration: number
  inRotation: boolean
  interval: number
  showType: 'left' | 'center' | 'right'
}

export interface LczPointTimelineProps {
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  timelineConfig?: {
    defaultStyle?: TimelineStyle
    currentStyle?: TimelineStyle
  }
  animateConfig?: AnimateConfig
  data?: DataMap[]
  onClick?: HandlerEvent<DataMap>
  onChange?: HandlerEvent<DataMap>
}
