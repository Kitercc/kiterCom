import { getColorObj } from '../../common/util'

export function getBgColor(target: string | any | undefined, type: string) {
  let val: any = ''
  try {
    if (typeof target === 'string') {
      val = target
    } else {
      if (!target.display) return ''
      if (target[type] === 'image') {
        val = `url(${target.imgUrl})`
      } else {
        const { color, colorType } = getColorObj(target?.color)
        if (colorType === 'gradient') {
          val = `linear-gradient( ${color} )`
        } else {
          val = color
        }
      }
    }
    return val
  } catch (error) {
    return val
  }
}

export function getTextColor(target: string | any) {
  const _obj: { type: 'single' | 'gradient'; color: string } = { type: 'single', color: '#000' }
  try {
    if (typeof target === 'string') {
      _obj.color = target
    } else {
      const { color: colorVal, colorType } = getColorObj(target)
      if (colorType === 'single') {
        _obj.type = 'single'
        _obj.color = colorVal
      } else {
        _obj.type = 'gradient'
        _obj.color = `linear-gradient(${colorVal})`
      }
    }
    return _obj
  } catch (error) {
    return _obj
  }
}

export function getShadow(outShadow, inShadow) {
  try {
    const { display: outDis, x: outX, y: outY, vague: outV, extend: outE, color: outC } = outShadow
    const { display: inDis, x: inX, y: inY, vague: inV, extend: inE, color: inC } = inShadow
    return {
      boxShadow: `${outDis ? outX : 0}px ${outDis ? outY : 0}px ${outDis ? outV : 0}px ${
        outDis ? outE : 0
      }px ${outC}, ${inDis ? inX : 0}px ${inDis ? inY : 0}px ${inDis ? inV : 0}px ${inDis ? inE : 0}px ${inC} inset`
    }
  } catch (error) {
    return {
      boxShadow: 'none'
    }
  }
}
