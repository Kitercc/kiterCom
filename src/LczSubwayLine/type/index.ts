import { ChildComponent } from './child'

export interface TextStyle {
  fontFamily: string
  fontSize: number
  color: string
  fontWeight: any
  letterSpacing: number
}
export interface LineRotation {
  display: boolean
  stopCondition: boolean
  interval: number
  moveStay: boolean
}

export interface LineConfig {
  currentLine: { value: string }
  maskColor: string
  clickSelect: boolean
  selectCenter: boolean
  lineName: boolean
  lineRotation?: LineRotation
}

export interface ManualZoom {
  display: boolean
  position: 'top' | 'left' | 'bottom' | 'right'
  xOffset: number
  yOffset: number
  arrangementMode: 'level' | 'vertical'
  buttonSize: number
  bgColor: string
  symbolColor: string
}

export interface ZoomConfig {
  defaultProportion: number
  manualZoom: ManualZoom
}

export interface GlobalConfig {
  cityId: { value: number }
  centerSite: { value: string }
  zoomConfig?: ZoomConfig
}

export interface TransferPointStyle {
  display: boolean
  transferType?: 'system' | 'custom'
  systemUrl?: string
  customUrl?: string
}

export interface GeneralPoint extends TransferPointStyle {
  generalType: 'system' | 'custom'
}
export interface SideConfig {
  clickSideCenter: boolean
  sideName?: TextStyle
  transferPoint?: TransferPointStyle
  generalPoint?: GeneralPoint
}

export interface Promptpanel {
  display: boolean
  contain: {
    link: any
    url: string
  }
  xOffset: number
  yOffset: number
  width: number
  height: number
  data?: any
}

export type Timer = {
  structureLineTimer: any
  lineCarouselTimer: any
  siteCarouselTimer: any
  siteStopCarouselTimer: any
  InitZoomTimer: any
  zoomTimer: any
}

export type MarkerList = { [key: string]: { class: string; type: 'ripples' | 'sign'; val: string; item: any }[] }[]

export interface SubwayLineProps {
  design?: boolean
  w?: number
  h?: number
  globalConfig?: GlobalConfig
  lineConfig?: LineConfig
  sideConfig?: SideConfig
  data?: any[]
  onSelect?: (params: { line: string }) => void
  onClick?: (params: { station: string; stationId: string | number }) => void
  onChange?: (params: { station: string; stationId: string | number }) => void
  onClickBlank?: () => void
  onChildComEvent?: (id: string, type: string, parpm: any) => void
  childComponents?: Array<ChildComponent>
}
