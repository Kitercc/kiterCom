import React, { memo, useMemo, CSSProperties } from 'react'
import { getColorObj } from '../../../common/util'
import { LightBarDataMap, TextConfig } from '../../../Lcz3dAreaMap/type/child'
import { numberForMat } from '../../../LczCarouselTable/common'

interface PlaneProps {
  planeStyle: TextConfig
  scale: number
  index: number
  itemData: LightBarDataMap
  id: string
  chindEvent?: (id: any, type: string, param: any) => void
}

export default memo(function Plane({ planeStyle, scale, index, itemData, id, chindEvent }: PlaneProps) {
  const { mainSection, suffix, serialSection, valueSection, addressSection } = planeStyle

  const wrapperStyle = useMemo(() => {
    const { width, height, bgColor, offset } = mainSection || {}

    const style: CSSProperties = {
      transformOrigin: 'center bottom',
      transform: `translate(-50%, -100%) scale(${scale})`,
      position: 'absolute',
      width,
      height
    }
    const wrapper: CSSProperties = { position: 'absolute', left: offset?.x, top: offset?.y }

    const { color, colorType } = getColorObj(bgColor)
    if (colorType === 'single') {
      style.backgroundColor = color
    } else {
      style.backgroundImage = `linear-gradient(${color} )`
    }

    return { box: style, wrapper }
  }, [JSON.stringify(mainSection), scale])

  // 序号样式
  const serialStyle = useMemo(() => {
    const {
      display = true,
      size = 0,
      offset,
      fontStyle = {},
      customBackground,
      bgImageUrl,
      radius = 0,
      inshadow,
      outshadow,
      border
    } = serialSection || {}

    if (!display) return {}
    const style: CSSProperties = {
      ...fontStyle,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius,
      width: size,
      height: size,
      left: offset?.x,
      top: offset?.y
    }

    if (customBackground) {
      style.backgroundImage = `url(${bgImageUrl})`
      style.backgroundSize = '100% 100%'
    } else {
      border?.display && (style.border = `${border.width}px solid ${border.color}`)
      const { display: outDis, x: outX, y: outY, vague: outV, extend: outE, color: outC } = outshadow || {}
      const { display: inDis, x: inX, y: inY, vague: inV, extend: inE, color: inC } = inshadow || {}
      style.boxShadow = `${outDis ? outX : 0}px ${outDis ? outY : 0}px ${outDis ? outV : 0}px ${
        outDis ? outE : 0
      }px ${outC}, ${inDis ? inX : 0}px ${inDis ? inY : 0}px ${inDis ? inV : 0}px ${inDis ? inE : 0}px ${inC} inset`
    }

    !chindEvent && (style.pointerEvents = 'none')

    return style
  }, [JSON.stringify(serialSection)])

  //数值样式
  const valueStyle = useMemo(() => {
    const { offset, bgColor, radius = 0, border, padding, fontStyle = {}, format } = valueSection || {}

    const val = numberForMat(+itemData.value, format),
      style: CSSProperties = {
        ...fontStyle,
        position: 'absolute',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        left: offset?.x || 0,
        top: offset?.y || 0,
        borderRadius: radius,
        padding: `${padding?.t || 0}px ${padding?.r || 0}px ${padding?.b || 0}px ${padding?.l || 0}px`
      }

    const { color, colorType } = getColorObj(bgColor)
    if (colorType === 'single') {
      style.backgroundColor = color
    } else {
      style.backgroundImage = `linear-gradient(${color} )`
    }

    border?.display && (style.border = `${border.width}px solid ${border.color}`)

    !chindEvent && (style.pointerEvents = 'none')

    return { val, style }
  }, [itemData.value, JSON.stringify(valueSection)])

  // 后缀样式
  const suffixStyle = useMemo(() => {
    const { offset, fontStyle = {} } = suffix || {}
    const style: CSSProperties = {
      ...fontStyle,
      marginLeft: offset || 0
    }

    return style
  }, [JSON.stringify(suffix)])

  // 区域样式
  const addressStyle = useMemo(() => {
    const { display, offset, fontStyle = {} } = addressSection || {}
    if (!display) return {}
    const style: CSSProperties = {
      ...fontStyle,
      whiteSpace: 'nowrap',
      position: 'absolute',
      left: offset?.x || 0,
      top: offset?.y || 0
    }

    return style
  }, [JSON.stringify(addressSection)])

  function handlerClick() {
    chindEvent && chindEvent(id, 'onClick', itemData)
  }

  return (
    <div style={wrapperStyle.box}>
      <div style={wrapperStyle.wrapper}>
        {serialSection?.display && (
          <div className='lcz-area-map-lightbar-plane-serial' onClick={handlerClick} style={serialStyle}>
            {index}
          </div>
        )}
        <div className='lcz-area-map-lightbar-plane-number' onClick={handlerClick} style={valueStyle.style}>
          {valueStyle.val}
          <span style={suffixStyle}>{suffix?.content}</span>
        </div>
        {addressSection?.display && <div style={addressStyle}>{itemData.area}</div>}
      </div>
    </div>
  )
})
