type DataMap = { url: string }

type VideoEnded = () => void

export interface OpeningVideoProps {
  w?: number
  h?: number
  video?: {
    name: any
    src: string
  }
  autoHide?: boolean
  controls?: boolean
  autoPlay?: boolean
  loop?: boolean
  volume?: number
  muted?: boolean
  introduce?: string
  data?: DataMap[]
  onEnded?: VideoEnded
}
