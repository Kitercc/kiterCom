import { randomChar } from '../../common/util'
import { BarrageStyle } from '../type'

export function getFormatBarrageData(data, other?: any) {
  const { totalLen = 0, rowNums = 10, callback } = other || {}
  return data.map((v, i) => {
    const cindex = i + totalLen,
      rowIndex = cindex % Math.min(rowNums, totalLen + data.length),
      rowSortNums = Math.floor(cindex / Math.min(rowNums, totalLen + data.length)) + 1,
      isRowLast = cindex + 1 > totalLen + data.length - rowNums
    const result = { ...v, id: randomChar(), rowIndex, rowSortNums, isRowLast }
    callback && callback(result)
    return result
  })
}

export const defaultBarrageStyle: BarrageStyle = {
  fontSize: 16,
  barrageTextStyle: [
    {
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        color: '#d41818',
        fontWeight: 'normal',
        letterSpacing: 0
      },
      ShadowConfig: {
        display: true,
        color: '#d41818',
        xOffset: 0,
        yOffset: 0,
        vague: 0
      }
    }
  ]
}
