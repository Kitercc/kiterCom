interface PathConfig {
  type: 'system' | 'custom'
  systemUrl: 'straight-line' | 'band' | 'curve'
  customType: 'file' | 'path'
  customFileUrl: string
  customPath: string
  scale: number
  lineWidth: number
  lineType: 'solid' | 'dashed'
  color: string
}

interface BodyConfig {
  bodyType: 'circle' | 'rect' | 'img'
  circleRadius: number
  circleColor: any
  rectWidth: number
  rectHeight: number
  rectColor: any
  img: string
  imgWidth: number
  imgHeight: number
  autoRotate: boolean
}

export interface Keyframes {
  easeType: 'Linear' | 'EaseIn' | 'EaseOut' | 'EaseInOut'
  time: number
  opacity: number
  translate: number
}
export interface AnimationConfig {
  reverse: boolean
  loop: boolean
  delay: number
  interval: number
  keyframes: Keyframes[]
}

export interface CustomPathProps {
  w?: number
  h?: number
  offset?: {
    display: boolean
    x: number
    y: number
  }
  pathConfig?: PathConfig
  bodyConfig?: BodyConfig
  animation?: AnimationConfig
}
