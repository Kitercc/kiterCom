import {
  GeneralBorderStyle,
  GeneralShadowStyle,
  GeneralTitle,
  GeneralToolBox,
  GeneralPieDataMap
} from '../../common/type'
import { BubbleValueLabel, HighlightValueLabel } from '../LczFixedBubble/type'

export interface MechanicalBubbleGlobalConfig {
  margin: {
    x: number
    y: number
  }
  bgColor: string
  titleConfig: GeneralTitle
  repulsion: {
    max: number
    min: number
  }
  bubbleValueLabel: BubbleValueLabel
  toolbarConfig: GeneralToolBox
  roamMove: boolean
  roamScale: boolean
  friction: number
}

export interface ColorFill {
  fillStyle: 'forValue' | 'forColor'
  //forValue
  maxColor: any
  minColor: any
  //forColor
  defaultColor: any
}

export interface DefaultStyle {
  defaultSize: {
    max: number
    min: number
  }
  colorFill: ColorFill
  defaultBorderStyle: GeneralBorderStyle
  defaultShadowStyle: GeneralShadowStyle
}
export interface CustomStyle {
  customName: string
  customStyle: {
    color: any
    customStyleSync: boolean
  }
  //customStyleSync false
  customBorderStyle: GeneralBorderStyle
  customShadowStyle: GeneralShadowStyle
}

export interface MechanicalBubblehighlight {
  display: boolean
  scale: boolean
  highlightValueLabel: HighlightValueLabel
}
export interface BubbleConfig {
  defaultStyle: DefaultStyle
  customStyle: CustomStyle[]
  highlightStyle: MechanicalBubblehighlight
}

export interface MechanicalBubbleProps {
  w?: number
  h?: number
  globalConfig: MechanicalBubbleGlobalConfig
  bubbleConfig: BubbleConfig
  data?: GeneralPieDataMap[]
  onClick?: (param: GeneralPieDataMap) => void
}
