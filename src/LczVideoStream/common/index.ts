const hostUrl = process.env.NODE_ENV === 'production' ? '../' : 'HappyServer/'

export const relyOnJSMap = {
  HLS: {
    ['lcz-hls-js']: hostUrl + 'lczCommon/lib/video/hls.min.js'
  },
  HTTPFLV: {
    ['lcz-http-flv-js']: hostUrl + 'lczCommon/lib/video/flv.min.js'
  }
}
