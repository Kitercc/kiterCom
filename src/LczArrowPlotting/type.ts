export interface lineConfig {
  leftHeightRatio: number
  rightHeightRatio: number
  LineType: 'LleftRbottom' | 'LtopRright' | 'LleftRright' | 'LtopRbottom'
}

export interface ArrowConfig {
  display: boolean
  startDis: boolean
  endDis: boolean
  width: number
  height: number
  color: string
}

export interface ArrowPlottingProps {
  w?: number
  h?: number
  lineConfig?: lineConfig
  arrowConfig?: ArrowConfig
}
