export const loadAmapScript = (key: string, securityJsCode: string) => {
  // @ts-ignore
  if (window?.AMap) return Promise.resolve('ok')

  return new Promise((resolve, reject) => {
    try {
      const script: any = document.createElement('script')
      // @ts-ignore
      window._AMapSecurityConfig = { securityJsCode }

      // const loaderUrl = 'https://webapi.amap.com/loader.js'

      const loaderUrl =
        (process.env.NODE_ENV !== 'production' ? 'HappyServer' : '..') + '/lczCommon/lib/amap/amap-loader.js'

      script.src = loaderUrl
      document.head.appendChild(script)

      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
          // @ts-ignore
          AMapLoader.load({
            key,
            version: '2.0',
            Loca: { version: '2.0' }
          })
            .then(() => {
              resolve('ok')
            })
            .catch(() => {
              reject('err')
            })
        } else {
          reject('err')
        }
      }

      script.onerror = () => {
        reject('err')
      }

      setTimeout(() => {
        reject('err')
      }, 20000)
    } catch (error) {
      reject(error)
    }
  })
}

export const loadWindwhasAMap = () => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (window?.AMap && window?.Loca) resolve('ok')

    setInterval(() => {
      // @ts-ignore
      if (window?.AMap && window?.Loca) resolve('ok')
    }, 100)

    setTimeout(() => {
      reject('err')
    }, 20000)
  })
}
