import IconUtils from '../../../common/util/IconUtil'
import ImageUtil from '../../../common/util/ImageUtil'
import { OutSanDian } from '../../../LczChina2dMap/type/child'

export function getSanDianSize(
  dataRange: { min: number; max: number },
  size: { min: number; max: number },
  value: number
): number {
  if (isNaN(dataRange.min) || isNaN(dataRange.max) || isNaN(size.min) || isNaN(size.max) || isNaN(value)) return 0
  if (+size.min === +size.max || +dataRange.min === +dataRange.max) return size.max
  const step = (+size.max - +size.min) / (+dataRange.max - +dataRange.min)
  return +size.min + step * (+value - +dataRange.min)
}

export async function processImageListInfo(sandian: OutSanDian) {
  const { normalStyle, selectStyle, styleSeries = [] } = sandian || {}
  let imgList: string[] = [normalStyle?.imgUrl || '', selectStyle?.imgUrl || '']
  styleSeries.forEach(v => {
    imgList.push(v.imgUrl, v.seriesSelectStyle?.imgUrl || '')
  })

  imgList = [...new Set(imgList.filter(v => !!v))]
  for await (const url of imgList) {
    await ImageUtil.getImageInfo(url)
  }
}

export async function processIconList(sandian: OutSanDian) {
  const { normalStyle, selectStyle, styleSeries = [] } = sandian || {}
  const iconList: IconValueType[] = []
  if (normalStyle?.styleType === 'icon') {
    iconList.push(normalStyle.iconValue)
  }
  if (selectStyle?.styleType === 'icon') {
    iconList.push(selectStyle.iconValue)
  }

  styleSeries.forEach(v => {
    if (v.styleType === 'icon') {
      iconList.push(v.iconValue)
    }

    if (v.seriesSelectStyle?.styleType === 'icon') {
      iconList.push(v.seriesSelectStyle.iconValue)
    }
  })

  for await (const iconVal of iconList) {
    if (typeof iconVal !== 'string') {
      await IconUtils.getURLFile(iconVal)
    }
  }
}
