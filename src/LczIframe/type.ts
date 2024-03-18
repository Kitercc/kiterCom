interface dataMap {
  url: string
}

export interface CustomPage {
  condition: string
  contain: {
    link: any
    url: string
  }
}

export interface IframeProps {
  id?: string
  close?: boolean // 是否可关闭
  scale?: number // 放大倍数
  scroll?: boolean
  customPage?: CustomPage[]
  data?: dataMap[]
  onLoadEnd?: (param: dataMap) => void
}
