import { numberIsEmpty } from '../../common/util'

//
export function array2obj(array, key) {
  const resObj = {}
  for (let i = 0; i < array.length; i++) {
    resObj[array[i][key]] = array[i]
  }
  return resObj
}

// 将统一类型key的数据分类
export function formatData(data: any[], key: string) {
  const _obj = Object.create(null)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    if (_obj[item[key]]) {
      _obj[item[key]].push(item)
    } else {
      _obj[item[key]] = [item]
    }
  }
  return _obj
}

// 同步系列名
export const syncSeriesTitle = data => {
  for (const key in data) {
    const item = data[key],
      findSeriesTitle = item.find(v => v.seriesTitle)
    if (findSeriesTitle) {
      data[key] = item.map(v => ({ ...v, seriesTitle: findSeriesTitle.seriesTitle }))
    }
  }
  return data
}

export const mSort = (target: number[], type?: 'in' | 'de') => {
  type = type || 'in'
  return type === 'in' ? target.sort((a, b) => a - b) : target.sort((a, b) => b - a)
}

interface getDataSeriesStyleProps {
  map?: { fieldName: string; displayName: string }
}

/**
 *
 * @param dataMemo 数据
 * @param DataSeries  数据系列配置
 * @returns  配置array
 */
export const getDataSeriesStyle = <T extends any[] | Record<string, unknown>, U extends getDataSeriesStyleProps>(
  dataMemo: T,
  DataSeries: U[],
  other?: { signKey: 'item' | 'category' }
): any => {
  let _index = 0
  const styleMap = new Map(null),
    loopArr: any[] = [],
    signKey = other?.signKey || 'item',
    datakeys = (Array.isArray(dataMemo) ? dataMemo.map(v => v[signKey]) : Object.keys(dataMemo)) || [],
    demoStyle: any[] = []

  const noFileNameSeries = DataSeries.filter(ser => !ser?.map?.fieldName)

  if (noFileNameSeries && noFileNameSeries.length) {
    //有空项
    DataSeries.forEach(v => {
      if (v.map?.fieldName) {
        styleMap.set(v.map?.fieldName, v)
      } else {
        loopArr.push(v)
      }
    })
  } else {
    DataSeries.forEach(v => {
      styleMap.set(v.map?.fieldName, v)
      loopArr.push(v)
    })
  }

  datakeys.forEach(v => {
    const seriesLen = loopArr.length
    if (styleMap.has(v)) {
      demoStyle.push(styleMap.get(v))
    } else {
      demoStyle.push(loopArr[_index % seriesLen])
      _index++
    }
  })

  return demoStyle
}

//检查图片是否存在
export const checkImgExists = async (imgurl: any) => {
  return new Promise(function (resolve, reject) {
    const ImgObj = new Image()
    ImgObj.src = imgurl
    ImgObj.onload = function (res) {
      resolve(res)
    }
    ImgObj.onerror = function (err) {
      reject(err)
    }
  })
}

export const machiningSvgPath = (str = '') => (str.indexOf('path://') === 0 ? str : `path://${str}`)

export const getDecoratePosition = (
  dataLen: number,
  i: number,
  { barWidth, barGap }: { barWidth: number; barGap: number }
) => {
  if (dataLen === 1) return 0

  const midden = Math.ceil(dataLen / 2),
    _i = i + 1

  if (dataLen % 2 === 0) {
    if (_i <= midden) {
      return -(barWidth * barGap + barWidth) / 2 - (midden - _i) * barWidth * (barGap + 1)
    } else {
      return (barWidth * barGap + barWidth) / 2 + (_i - 1 - midden) * barWidth * (barGap + 1)
    }
  } else {
    if (midden === _i) return 0
    if (_i < midden) {
      return barWidth * (_i - midden - barGap) - (midden - _i - 1) * barWidth * barGap
    } else {
      return barWidth * (_i - midden + barGap) + (_i - midden - 1) * barWidth * barGap
    }
  }
}

//判断echarts的svg路径能不能用
export const getUsableSvgPath = (value?: string) => {
  const _value = value || ''
  const nameReg = /(.+(?=[</svg>]$))/
  if (!nameReg.test(_value)) {
    return machiningSvgPath(_value)
  } else {
    return ''
  }
}

/** 处理显示字符数*/
export const getChars = (str: string, charsNum?: any) => {
  str = String(str)
  if (numberIsEmpty(charsNum)) {
    const len = str.length
    str = charsNum < len ? `${str.slice(0, charsNum)}...` : str
  }
  return str
}
