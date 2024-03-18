import React, { CSSProperties, Fragment, memo, useMemo } from 'react'
import { getColorObj } from '../../common/util'
import { MapPath, CallbackBtn } from '../type'

interface UpDrillProps {
  callbackBtn?: CallbackBtn
  mapPath: MapPath[]
  onClick: (type: 'back' | 'path', params?: MapPath) => void
}

export default memo(function UpperDrill({ callbackBtn, mapPath, onClick }: UpDrillProps) {
  const buttonStyle = useMemo(() => {
    const { position, fontStyle, bgConfig, border } = callbackBtn || {},
      style: CSSProperties = {
        left: position?.x,
        top: position?.y,
        ...(fontStyle || {}),
        width: bgConfig?.width,
        height: bgConfig?.height,
        borderRadius: bgConfig?.radius,
        whiteSpace: 'nowrap',
        overflow: 'hidden'
      }

    const { color, colorType } = getColorObj(bgConfig?.color)

    if (colorType === 'single') {
      style.backgroundColor = color
    } else {
      style.background = `linear-gradient(${color})`
    }

    if (bgConfig?.imgUrl) style.backgroundImage = `url(${bgConfig.imgUrl})`

    if (border?.display) {
      style.border = `${border.width}px solid ${border.color}`
    }

    return style
  }, [JSON.stringify(callbackBtn)])

  function handlerClick(e) {
    e.stopPropagation()
    e.preventDefault()
    onClick('back')
  }

  return (
    <Fragment>
      {mapPath.length > 1 && (
        <div className='lcz-upper-drill-wrapper' style={buttonStyle} onClick={handlerClick}>
          {callbackBtn?.content || ''}
        </div>
      )}
    </Fragment>
  )
})
