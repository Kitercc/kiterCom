import { conversionData, randomChar } from '../../common/util'

export const alignmentStyle = {
  lt: { top: 0, left: 0 },
  rt: { top: 0, right: 0 },
  rb: { right: 0, bottom: 0 },
  lb: { left: 0, bottom: 0 }
}

export const formatData = <T>(data: T[], isPortrait, portraitNumber, horizontalNumber, dataType?: any) => {
  const _data: T[][] = []
  const newData: T[] = dataType ? conversionData(data, dataType) : [...data]
  if (newData && newData.length > 0) {
    let itemArr: T[] = []
    const row = isPortrait ? portraitNumber : horizontalNumber
    newData.forEach((item, i) => {
      itemArr.push({ ...item, __index: _data.length })
      if ((i + 1) % row === 0 || i === data.length - 1) {
        const code = randomChar()
        itemArr = itemArr.map(item => ({ ...item, __code: code }))
        _data.push(itemArr)
        itemArr = []
      }
    })
  }
  return _data
}
