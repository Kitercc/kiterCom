import { ShadowConfig } from '../LczCarouselTable/type'
interface TextStyle {
  fontFamily: string
  color: any
  fontWeight: any
  letterSpacing: number | string
}
export interface BarrageDataMap {
  text: string
  id?: string
  rowIndex?: number
  rowSortNums?: number
  isRowLast?: boolean
}

export interface BarrageTextStyle {
  textStyle?: TextStyle
  ShadowConfig?: ShadowConfig
}
export interface BarrageStyle {
  fontSize: number
  barrageTextStyle: BarrageTextStyle[]
}

export interface BarrageProps {
  w?: number
  h?: number
  design?: boolean
  maxBarrageNums?: number
  rowNums?: number
  timeInterval?: number
  speed?: number
  loop?: boolean
  hoverStop?: boolean
  barrageStyle?: BarrageStyle
  data?: BarrageDataMap[]
  onClick?: (param: BarrageDataMap) => void
}
