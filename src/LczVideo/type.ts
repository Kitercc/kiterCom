type DataMap = { url: string }

export interface Shadow {
  display: boolean
  color: string
  xOffset: number
  yOffset: number
  vague: number
}

export interface FilterConfig {
  blur: { display: boolean; value: number }
  brightness: { display: boolean; value: number }
  contrastRatio: { display: boolean; value: number }
  grayscale: { display: boolean; value: number }
  hue: { display: boolean; value: number }
  antiColor: { display: boolean; value: number }
  saturation: { display: boolean; value: number }
  brown: { display: boolean; value: number }
  shadow: Shadow
}

export interface VideoProps {
  w?: number
  h?: number
  video?: {
    name: any
    src: string
  }
  radius?: number
  poster?: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  volume?: number
  muted?: boolean
  filter?: FilterConfig
  data?: DataMap[]
}
