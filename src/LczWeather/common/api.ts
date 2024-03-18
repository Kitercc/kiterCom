interface CityParams {
  city?: string
}
/**
 * 通过高德地图获取城市信息---只针对天气的城市选择树控件
 * @returns params
 */
export function getCityParams(params: CityParams) {
  const { city = '' } = params
  const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=${'1cd0ca86d2e187b6eaa069471633d80a'}&city=${city}&extensions=all`
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then((res: any) => {
        const response = res.json()
        if (response) {
          resolve(response)
        } else {
          reject()
        }
      })
      .catch(() => {
        reject()
      })
  })
}
