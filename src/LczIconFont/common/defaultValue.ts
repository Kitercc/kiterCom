import { BgConfig, Shadow } from '../type'

export const defaultShadow: Shadow = {
  display: true,
  color: 'rgba(0,0,0,.50)',
  x: 0,
  y: 2,
  extend: 0
}

export const defaultBgConfig: BgConfig = {
  display: true,
  bgColor: 'rgba(255,255,255,0)',
  borderColor: '#3D99FC',
  borderWidth: 0,
  radius: 0
}

export const iconSwitch = {
  1: 'system',
  2: 'custom'
}
