import { FillStyle, BorderStyle, LogoConfig } from '../type'

const defaultFillStyle: FillStyle = {
  foreground: '#00',
  background: '#fff'
}

const defaultBorderStyle: BorderStyle = { display: false, Bstyle: 'solid', Bcolor: '#FFFFFF', Bwidth: 1 }

const defaultLogoBorderStyle: BorderStyle = {
  display: false,
  Bstyle: 'solid',
  Bcolor: '#FFFFFF',
  Bwidth: 4,
  BRadius: 4
}

const defaultLogoConfig: LogoConfig = {
  display: false,
  logoUrl: '',
  logoWidth: 50,
  logoHeight: 50,
  logoRadius: 8,
  logoBgColor: '#fff',
  logoBorderStyle: defaultLogoBorderStyle
}

export { defaultFillStyle, defaultBorderStyle, defaultLogoConfig, defaultLogoBorderStyle }
