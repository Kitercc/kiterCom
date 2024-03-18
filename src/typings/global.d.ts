declare const AMap: any
declare const Loca: any
declare const $: any

type SystemIconUrlList = { [key in 'lcz-system-icon' | 'lcz-arrow-icon' | 'lcz-state-card-icon']: string }

type IconValueType =
  | string
  | {
      iconValue: string
      iconType?: 'system' | 'custom'
      systemfontFamily?: 'lcz-system-icon' | 'lcz-arrow-icon' | 'lcz-state-card-icon'
      customUrl?: string
    }

declare interface Window {
  Hls: any
  flvjs: any
  systemIconUrlList: SystemIconUrlList
  AMap: any
  Loca: any
  $: any
  helpFn: any
  handleExpression(expression: any, item: any, id: string, detailType: string): any
  configExpressionFields: any[]
}
