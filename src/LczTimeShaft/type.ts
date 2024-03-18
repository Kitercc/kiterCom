export interface ShaftTextStyle {
  fontFamily: string
  fontSize: number
  color: any
  fontWeight: any
  letterSpacing: number
  angle?: number
}
interface ShaftOffset {
  xOffset: number
  yOffset: number
}

export interface ShaftSize {
  width: number
  height: number
}
export interface TimeShaftDataMap {
  id: any
  text: string
}

export interface TimeShaftMain {
  height: number
  backgroundColor: any
  lineColor: any
}

export interface ShaftTextLabel {
  display: boolean
  offset: ShaftOffset
  textStyle: ShaftTextStyle
}

interface BackgroundFrame {
  display: boolean
  size: {
    top: number
    bottom: number
    left: number
    right: number
  }
  backgroundColor: any
  backgroundImg: string
  radius: number
}

export interface ShaftMoveLabel {
  display: boolean
  yOffset: number
  textStyle: ShaftTextStyle
  backgroundFrame: BackgroundFrame
}

export interface ShaftGlobalConfig {
  mode: 'horizontal' | 'vertical'
  labelSpace: number
  timeShaftMain: TimeShaftMain
  shaftTextLabel: ShaftTextLabel
  shaftMoveLabel: ShaftMoveLabel
}

export interface ProgressCursor {
  image: string
  size: ShaftSize
}

export interface PlayBtn {
  gap: number
  playConfig: ProgressCursor
  stopConfig: ProgressCursor
}

export interface ControllerConfig {
  active: { value: any }
  loopPlay: boolean
  autoPlay: boolean
  duration: number
  progressCursor: ProgressCursor
  playBtn: PlayBtn
}

export interface TimeShaftProps {
  shaftGlobalConfig?: ShaftGlobalConfig
  controllerConfig?: ControllerConfig
  data?: TimeShaftDataMap[]
  onClick?: (param: TimeShaftDataMap) => void
  onChange?: (param: TimeShaftDataMap) => void
}
