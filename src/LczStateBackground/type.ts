type dataMap = {
  value: string
}

export interface RadiusConfig {
  display: boolean
  top: number
  right: number
  bottom: number
  left: number
}

export interface BgConfig {
  colorObj: any
  imgUrl: string
}

export interface BorderConfig {
  display: boolean
  style: string
  color: string
  width: number
}

export interface DefaultStyle {
  bgConfig: BgConfig
  borderConfig: BorderConfig
}

export interface StateStyle {
  stateValue: string
  stateBgConfig: BgConfig
  stateBorderConfig: BorderConfig
}

type HandlerChange = (param: dataMap) => void

export interface StartBgProps {
  radiusConfig?: RadiusConfig
  defaultStyle?: DefaultStyle
  stateStyle?: StateStyle[]
  onClick?: HandlerChange
  onDataChange?: HandlerChange
  data?: dataMap[]
}
