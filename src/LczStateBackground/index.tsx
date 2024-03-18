import React, { CSSProperties, memo, useEffect, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { conversionData, getColorObj } from '../common/util'
import { defaultBgConfig, defaultBorderConfig, defaultRadius, LczDefaultStyle } from './common/defaultValue'

import { StartBgProps, StateStyle } from './type'

export default memo(function LczStateBackground(props: StartBgProps) {
  const {
    radiusConfig = defaultRadius,
    defaultStyle = LczDefaultStyle,
    stateStyle = [],
    onClick,
    onDataChange,
    data = []
  } = props
  const { bgConfig = defaultBgConfig, borderConfig = defaultBorderConfig } = defaultStyle

  // hooks

  const defaultStyleMemo = useMemo(() => {
    const _style: CSSProperties = {}
    const { display: Rdis, top, right, bottom, left } = radiusConfig
    const { colorObj } = bgConfig
    const { display: Bdis, color: Bcolor, style: Bstyle, width: Bwidth } = borderConfig
    const { color: colorValue, colorType } = getColorObj(colorObj)

    if (Rdis) {
      _style.borderRadius = `${top}px ${right}px ${bottom}px ${left}px`
    }

    if (colorType === 'single') {
      _style.backgroundColor = colorValue
    } else {
      _style.background = `linear-gradient(${colorValue})  50% 50% / 100% 100% no-repeat`
    }

    if (Bdis) {
      _style.border = `${Bwidth}px ${Bstyle} ${Bcolor}`
    }

    return _style
  }, [JSON.stringify(radiusConfig), JSON.stringify(bgConfig), JSON.stringify(borderConfig)])

  const findStateStyle = useMemo(() => {
    const { display: Rdis, top, right, bottom, left } = radiusConfig

    const _value = String(data[0]?.value)
    const _stateStyle: CSSProperties = {}
    const _findState = stateStyle.filter((item: StateStyle) => item.stateValue === _value)
    const findState = _findState.length > 0 ? _findState[_findState.length - 1] : false

    if (!findState) return { find: false }

    const { display: Bdis, color: Bcolor, style: Bstyle, width: Bwidth } = findState.stateBorderConfig
    const { colorObj, imgUrl } = findState.stateBgConfig
    const { color: colorValue, colorType } = getColorObj(colorObj)

    if (Bdis) {
      _stateStyle.border = `${Bwidth}px ${Bstyle} ${Bcolor}`
    }

    if (Rdis) {
      _stateStyle.borderRadius = `${top}px ${right}px ${bottom}px ${left}px`
    }

    if (colorType === 'single') {
      _stateStyle.backgroundColor = colorValue
    } else {
      _stateStyle.background = `linear-gradient(${colorValue})  50% 50% / 100% 100% no-repeat`
    }

    return {
      find: true,
      style: _stateStyle,
      imgUrl
    }
  }, [JSON.stringify(data), JSON.stringify(stateStyle), JSON.stringify(radiusConfig)])

  useEffect(() => {
    const _data = conversionData(data, { url: 'string' })
    _data?.length && onDataChange && onDataChange(_data[0])
  }, [JSON.stringify(data)])

  return (
    <LczComCon>
      <div
        className='lcz-state-background'
        onClick={e => {
          e.stopPropagation()
          onClick && onClick(data[0])
        }}
        style={findStateStyle.find ? findStateStyle.style : defaultStyleMemo}>
        {(bgConfig.imgUrl || findStateStyle?.imgUrl) && (
          <div
            className='lcz-state-bg-image'
            style={{ backgroundImage: `url(${findStateStyle.find ? findStateStyle?.imgUrl : bgConfig.imgUrl})` }}
          />
        )}
      </div>
    </LczComCon>
  )
})
