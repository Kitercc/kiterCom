import {
  CenterPoint,
  ClusterLayer,
  FlyLine,
  HeatmapLayer,
  Point,
  Polyline,
  PolymerizationHeat,
  Ripples,
  TextLabel,
  ToolTip
} from './child'

export interface MapSettings {
  showLabel: boolean
  showRoad: boolean
  showBuild: boolean
  showPoint: boolean
  showTraffic: boolean
}

export interface CameraSettings {
  Lng: number
  Lat: number
  initZoom: number
  viewMode: '2D' | '3D'
  skyColor: string
  pitch: number
}

export type AMapChildComponent =
  | Point
  | CenterPoint
  | Polyline
  | TextLabel
  | ToolTip
  | Ripples
  | FlyLine
  | ClusterLayer
  | HeatmapLayer
  | PolymerizationHeat

export interface AmapProps {
  w?: number
  h?: number
  mapkey?: string
  securityJsCode?: string
  design?: boolean
  id?: string
  mapStyleId?: string | { value: string }
  mapsettings?: MapSettings
  cameraSettings?: CameraSettings
  childComponents?: Array<AMapChildComponent>
  onChildComEvent?: (id: string, type: string, parpm: any) => void
  onClick?: (param: { lng: string | number; lat: string | number }) => void
  onChange?: (param: { value: number }) => void
  onMoveend?: (param: any) => void
}
