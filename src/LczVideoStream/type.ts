type DataMap = {
  url: string
}

export interface VideoStreamProps {
  w?: number
  h?: number
  path?: string
  videoType?: string
  controls?: boolean
  loop?: boolean
  muted?: boolean
  volume?: number
  data?: DataMap[]
}
