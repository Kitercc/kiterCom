import { BorderStyle, ShadowConfig, VagueConfig, FillColor } from '../type'

export const defaultBorderStyle: BorderStyle = {
  display: true,
  lineType: 'solid', // solid Dotted
  dottedW: 4,
  dottedSpace: 4,
  borderColor: '#3D99FC',
  borderWidth: 1
}

export const defaultBoxShadow: ShadowConfig = {
  display: true,
  color: 'rgba(0,0,0,.50)',
  x: 0,
  y: 2,
  vague: 4,
  extend: 0
}

export const defaultVagueConfig: VagueConfig = {
  display: true,
  gaussianBlur: 0
}

export const defaultFillColor: FillColor = {
  display: true,
  color:
    '{"type":"single","colors":[{"rgb":{ "r": 255, "g": 0, "b": 0, "a": 1 },"hex":"#A83E3EFF","begins":0}],"gradualAngle":0}'
}
