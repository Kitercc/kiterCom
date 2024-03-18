import { Padding, PlaceholderConfig, TextStyle, BgConfig, BorderConfig, SearchIcon, Shadow } from '../type'

const defaultTextStyle: TextStyle = {
  fontFamily: 'PingFangSC-Regular',
  fontSize: 16,
  color: '#FFFFFF',
  fontWeight: 'normal',
  letterSpacing: 0
}
const defaultPlaceholderConfig: PlaceholderConfig = {
  display: true,
  text: '搜索…',
  placeTextStyle: {
    ...defaultTextStyle,
    color: '#C9CFD7'
  }
}

const defaultPadding: Padding = {
  top: 8,
  bottom: 8,
  left: 16,
  right: 16
}

const defaultBgConfig: BgConfig = {
  display: true,
  color: {
    selected: 'single',
    single: 'rgba(61,153,252,0.2)',
    gradient: {
      gradualAngle: 0,
      colors: [
        {
          begins: 0,
          value: 'rgba(255,255,255,1)'
        }
      ]
    }
  }
}

const defaultBorderConfig: BorderConfig = {
  display: true,
  color: 'rgba(61,153,252,0.6)',
  width: 1,
  focusColor: '#3D99FC'
}

const defaultSearchIcon: SearchIcon = {
  display: true,
  position: 'left',
  speed: 14,
  color: '#3d99fc',
  size: 24
}

const defaultShadow: Shadow = {
  display: false,
  color: 'rgba(0,0,0,0.5)',
  xOffset: 0,
  yOffset: 2,
  vague: 4,
  extend: 0
}

export {
  defaultPlaceholderConfig,
  defaultTextStyle,
  defaultPadding,
  defaultBgConfig,
  defaultBorderConfig,
  defaultSearchIcon,
  defaultShadow
}
