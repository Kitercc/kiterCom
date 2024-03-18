type LineShadow = {
  display: boolean
  color: string
  vague: number
}

interface PathConfig {
  type: 'system' | 'custom'

  systemUrl: 'straight-line' | 'band'

  customType: 'file' | 'path'
  customFileUrl: string
  customPath: string

  scale: number
  lineWidth: number
  color: string
  shadow?: LineShadow
}

interface LineConfig {
  size: number
  length: number
  color: any
  shadow?: LineShadow
}

interface AnimationConfig {
  reverse: boolean
  loop: boolean
  delay: number
  interval: number
  duration: number
  easeType: 'Linear'
}

export interface LightFlowPathProps {
  w?: number
  h?: number
  offset?: {
    display: boolean
    x: number
    y: number
  }

  pathConfig?: PathConfig
  lineConfig?: LineConfig
  animation?: AnimationConfig
}
