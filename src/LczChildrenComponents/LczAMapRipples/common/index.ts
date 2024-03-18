const baseurl = process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..'

export const systemRipples = (type: string) => {
  return `${baseurl}/lczCommon/matrix/images/component/lcz-amap/${type}-ripples.png`
}
