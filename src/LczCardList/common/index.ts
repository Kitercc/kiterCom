import * as d3 from 'd3'
import { hexToRgba, randomChar } from '../../common/util'

export const ValidAdditionalFieldTypes = ['text', 'image']

export function getSectionColor(start: string, end: string, value = 0, [min, max] = [0, 100]) {
  if (start.indexOf('#') === 0) {
    start = hexToRgba(start)
  }

  if (end.indexOf('#') === 0) {
    end = hexToRgba(end)
  }

  const computeColor = d3.interpolate(start, end)
  const linear = d3.scale.linear().domain([min, max])
  return computeColor(linear(value))
}

export function formatCardListData<T>(data: T[], isPortrait, horizontalNumber, portraitNumber) {
  const num = isPortrait ? portraitNumber : horizontalNumber,
    len = Math.ceil(data.length / num)
  let resolve: T[][] = []

  resolve = new Array(len).fill(null).map((_, i) => {
    const code = randomChar()
    return data
      .slice(num * i, num * (i + 1))
      .map((item, index) => ({ ...item, __index: i, ___columnIndex: index, __code: code }))
  })

  return resolve
}
