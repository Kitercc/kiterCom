import {
  AmbientLight,
  AreaHeat,
  DirectionalLight,
  FlyLine,
  RealEarth,
  Ripples,
  ScatterPoint,
  TitleBubble
} from './child'

type CameraConfig = {
  position: { lng: number; lat: number }
  distance: number
}

export type ChildComponent =
  | RealEarth
  | AmbientLight
  | DirectionalLight
  | AreaHeat
  | ScatterPoint
  | FlyLine
  | TitleBubble
  | Ripples

export interface LczEarthProps {
  w?: number
  h?: number
  design?: boolean
  cameraConfig?: CameraConfig
  rotateConfig?: { earth: number; scene: number }
  controllerConfig?: { enableRotate: boolean; enableZoom: boolean }
  onLoad?(): void
  childComponents?: Array<ChildComponent>
  onChildComEvent?: onChildComEvent
}
