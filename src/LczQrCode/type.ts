export interface FillStyle {
  foreground: string
  background: string
}

export interface BorderStyle {
  display: boolean
  Bstyle: string
  Bcolor: string
  Bwidth: number
  BRadius?: number
}

export interface LogoConfig {
  display: boolean
  logoUrl: string
  logoWidth: number
  logoHeight: number
  logoRadius: number
  logoBgColor: string
  logoBorderStyle: BorderStyle
}

export type dataMap = {
  url: string
}

export interface QrCodeProps {
  w?: number
  h?: number
  url?: string
  radius?: number
  correctLevel?: string
  fillStyle?: FillStyle
  borderStyle?: BorderStyle
  logoConfig?: LogoConfig
  data?: dataMap[]
}
