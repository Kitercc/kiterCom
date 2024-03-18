import { SignConfig, SignStyle } from '../../../LczSubwayLine/type/child'
import { ShadowConfig } from '../../../LczCustomGraphics/type'
import { defaultSignConfig } from './defaultValue'
import { CSSProperties } from 'react'
import { getColorObj } from '../../../common/util'
import IconUtils from '../../../common/util/IconUtil'

export const getAttribute = async (signConfig: SignConfig, shadow: ShadowConfig) => {
  let isShadow = false
  const _obj: { style: CSSProperties; className: string; dangerouslySetInnerHTML: any } = {
    style: {},
    className: '',
    dangerouslySetInnerHTML: { __html: '' }
  }
  const { display: shDis, x: shX, y: shY, vague: shV, extend: shE, color: shC } = shadow
  const {
    display = true,
    position = defaultSignConfig.position,
    signStyle = defaultSignConfig.signStyle as SignStyle
  } = signConfig as SignConfig

  if (display) {
    _obj.style.left = `calc(50% + ${position?.x}px)`
    _obj.style.top = `calc(50% + ${position?.y}px)`
    const { type = 'system', iconValue = '', color: iconColor, iconSize, imgUrl, width, height } = signStyle
    switch (type) {
      case 'system': {
        _obj.style.fontSize = iconSize
        if (typeof iconValue === 'string') {
          _obj.className = 'lcz-system-icon '
          _obj.dangerouslySetInnerHTML = { __html: iconValue.split('|')[0] }
        } else {
          const iconData = await IconUtils.getURLFile(iconValue)
          _obj.className = iconData?.family || ''
          _obj.dangerouslySetInnerHTML = { __html: iconValue.iconValue }
        }

        if (shDis) _obj.style.textShadow = `${shX}px ${shY}px ${shV}px ${shC}`
        const { color, colorType } = getColorObj(iconColor)
        if (colorType === 'gradient') {
          if (shDis) isShadow = true
          _obj.className += ' gradient'
          _obj.style.background = `linear-gradient(${color})`
        } else {
          _obj.style.color = color
        }
        break
      }
      case 'custom': {
        _obj.style.width = width
        _obj.style.height = height
        _obj.style.backgroundImage = `url(${imgUrl})`
        if (shDis) _obj.style.boxShadow = `${shX}px ${shY}px ${shV}px ${shE}px ${shC}`
        break
      }
    }
  }
  return { isShadow, obj: _obj }
}
