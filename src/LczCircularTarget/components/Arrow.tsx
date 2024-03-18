import React, { memo, useMemo } from 'react'
import { colorFunc } from '../../common/util'
import { ArrowConfig } from '../type'

interface ArrowProps extends ArrowConfig {
  direction: 'left' | 'right' | 'top' | 'bottom'
  onClick?: () => void
}

const position = {
  left: 'scaleX(1)',
  right: 'scaleX(-1)',
  top: 'scaleY(1)',
  bottom: 'scaleY(-1)'
}

export default memo(function Arrow(props: ArrowProps) {
  const {
    direction,
    showType,
    yOffset = 0,
    arrowIconType = 'custom',
    iconValue = 'zuo1',
    iconSize = 56,
    iconColor,
    imgUrl = '',
    imgWidth = 56,
    imgHeight = 56,
    onClick
  } = props

  const systemColorMemo = useMemo(() => {
    const { color, colorType } = colorFunc(iconColor)
    if (colorType === 'single') {
      return {
        color,
        colorType
      }
    }
    return {
      background: color,
      colorType
    }
  }, [iconColor])

  const contain = useMemo(() => {
    switch (arrowIconType) {
      case 'system':
        return (
          <span
            className={['iconfont', `lcz-com-icon-${iconValue}`, systemColorMemo.colorType].join(' ')}
            style={{ ...systemColorMemo, fontSize: iconSize }}
          />
        )
      case 'custom':
        return imgUrl && <img style={{ width: imgWidth, height: imgHeight }} src={imgUrl} />
    }
  }, [arrowIconType, iconValue, systemColorMemo, iconSize, imgUrl, imgWidth, imgHeight])

  const offset = direction === 'left' || direction == 'right' ? 'translateY' : 'translateX'

  return (
    <div
      className={`lcz-circular-arrow-${showType}`}
      style={{
        transform: `${position[direction]} ${offset}(${yOffset}px)`
      }}
      onClick={e => {
        e.preventDefault()
        onClick && onClick()
      }}>
      {contain}
    </div>
  )
})
