import { TextStyle, ColorConfig, Shadow, BgConfig } from '../type'

const defaultTitleStyle: TextStyle = {
  fontFamily: 'Microsoft YaHei',
  fontSize: 24,
  color: {
    colorString: {
      selected: 'single',
      single: '#fff'
    }
  },
  fontWeight: 400,
  letterSpacing: 0,
  italics: true
}

const defaultSweepColor: ColorConfig = {
  colorString: {
    selected: 'single',
    single: '#fff'
  }
}

const defauleShadow: Shadow = { display: false, color: 'rgba(0,0,0,.5)', xOffSet: 0, yOffSet: 2, vague: 4, extend: 0 }

const defaultBgConfig: BgConfig = {
  display: false,
  range: 'full',
  padding: { x: 16, y: 16 },
  bgStyle: {
    display: true,
    color: defaultSweepColor,
    imgUrl: ''
  },
  border: {
    display: false,
    color: '#3D99FC',
    width: 1
  },
  radius: 8
}

export { defaultTitleStyle, defaultSweepColor, defauleShadow, defaultBgConfig }
