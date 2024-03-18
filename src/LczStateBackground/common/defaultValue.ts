import { DefaultStyle, RadiusConfig, BgConfig, BorderConfig } from '../type'

const defaultRadius: RadiusConfig = {
  display: true,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
}

const defaultBgConfig: BgConfig = {
  colorObj: {},
  imgUrl: ''
}

const defaultBorderConfig: BorderConfig = {
  display: true,
  style: 'solid',
  color: '#3D99FC',
  width: 1
}

const LczDefaultStyle: DefaultStyle = {
  bgConfig: defaultBgConfig,
  borderConfig: defaultBorderConfig
}

export { LczDefaultStyle, defaultRadius, defaultBgConfig, defaultBorderConfig }
