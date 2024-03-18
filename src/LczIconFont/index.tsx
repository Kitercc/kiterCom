import React, { memo, useMemo, useState } from 'react'
import IconCon from '../common/IconCon'
import LczComCon from '../common/LczComCon'

import { getColorObj } from '../common/util'
import { defaultBgConfig, defaultShadow } from './common/defaultValue'
import { IconFontProps } from './type'

export default memo(function LczIconFont(props: IconFontProps = {}) {
  const {
    w = 300,
    h = 300,
    fillColor,
    iconValue = '&#59230;|1',
    padding = 0,
    shadow = defaultShadow,
    animate = false,
    bgConfig = defaultBgConfig,
    onClick
  } = props

  const [colorType, setColorType] = useState('single')

  const getBgConfig = useMemo(() => {
    const { display, bgColor, borderColor, borderWidth, radius } = bgConfig
    return {
      background: display ? bgColor : 'none',
      borderStyle: display ? 'solid' : 'none',
      borderColor: display ? borderColor : 'none',
      borderWidth: display ? borderWidth + 'px' : 0,
      borderRadius: display ? radius + 'px' : 0
    }
  }, [bgConfig])

  const getFillColor = useMemo(() => {
    const { color, colorType } = getColorObj(fillColor)
    if (colorType === 'single') {
      setColorType('single')
      return { color }
    } else {
      setColorType('gradient')
      return { background: `linear-gradient( ${color} )` }
    }
  }, [fillColor])

  const getShoadow = useMemo(() => {
    const { display: shDis, x, y, extend, color: shColor } = shadow
    const textShadow = `${shDis ? shColor : 'transparent'} ${shDis ? x : 0}px ${shDis ? y : 0}px ${
      shDis ? extend : 0
    }px`
    return { textShadow }
  }, [shadow])

  const getFontSizeMemo = useMemo(() => {
    const max = Math.min(w, h)
    return Math.floor(max * (1 - padding / 100))
  }, [w, h, padding])

  const handlerChange = e => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div style={{ width: w, height: h, ...getBgConfig }} className='icon-con' onClick={handlerChange}>
        <IconCon
          className={`${colorType} ${animate ? 'animate' : ''}`}
          style={{ fontSize: getFontSizeMemo, ...getFillColor }}
          iconValue={iconValue}
        />

        {shadow.display && (
          <IconCon
            className={`shadowcon ${colorType} ${animate ? 'animate' : ''}`}
            style={{ fontSize: getFontSizeMemo, ...getFillColor, ...getShoadow }}
            iconValue={iconValue}
          />
        )}
      </div>
    </LczComCon>
  )
})
