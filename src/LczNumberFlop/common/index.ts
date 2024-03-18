import { getColorObj } from '../../common/util'

export const styleConfigTop = {
  start: { title: 'flex-start', count: 'flex-start' },
  center: { title: 'center', count: 'center' },
  end: { title: 'flex-end', count: 'flex-end' },
  bothEnds: { title: 'flex-start', count: 'flex-end' }
}

export const styleConfigLeft = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  bothEnds: 'space-between'
}

export const styleConfigBottom = {
  start: { title: 'flex-start', count: 'flex-start' },
  center: { title: 'center', count: 'center' },
  end: { title: 'flex-end', count: 'flex-end' },
  bothEnds: { title: 'flex-end', count: 'flex-start' }
}

export const styleConfigRight = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  bothEnds: 'space-between'
}

export const getBgColorMemo = (colorString: any) => {
  try {
    const { color: colorVal, colorType } = getColorObj(colorString)

    if (!colorVal || !colorType) {
      throw new Error('颜色有误')
    }
    if (colorType === 'gradient') {
      return { color: `linear-gradient( ${colorVal} )`, colorType }
    }
    return { color: colorVal, colorType }
  } catch (error) {
    console.warn(error)
    return { color: '#3d99fc', colorType: 'single' }
  }
}
