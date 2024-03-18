import React, { memo, useMemo, CSSProperties } from 'react'
import { getColorObj } from '../../../common/util'
import { SignStyle } from '../../../Lcz3dAreaMap/type/child'

export default memo(function SignContain({
  signStyle,
  value,
  type
}: {
  signStyle: SignStyle
  value: any
  type: 'normal' | 'focus'
}) {
  const styleMemo = useMemo(() => {
    const {
        normalBackType = 'color',
        focusBackType = 'color',
        bgColor,
        imageUrl,
        radius,
        border,
        padding,
        decorate,
        offset,
        fontStyle
      } = signStyle,
      styles: { wrapper: CSSProperties; decorate: CSSProperties; value: CSSProperties } = {
        wrapper: {
          position: 'relative',
          transform: `translateX(${offset?.x}px) translateY(${offset?.y}px)`,
          whiteSpace: 'nowrap'
        },
        decorate: {
          width: decorate?.width,
          height: decorate?.height,
          zIndex: -1,
          position: 'absolute',
          left: '50%',
          top: ' 100%',
          transform: `translateX(calc( -50% + ${decorate?.offset?.x || 0}px)) translateY(${decorate?.offset?.y || 0}px)`
        },
        value: {
          ...fontStyle,
          borderRadius: radius,
          padding: `${padding?.top}px ${padding?.right}px ${padding?.bottom}px ${padding?.left}px`
        }
      }

    if ((type === 'normal' && normalBackType === 'color') || (type === 'focus' && focusBackType === 'color')) {
      const { color, colorType } = getColorObj(bgColor)
      if (colorType === 'single') {
        styles.value.backgroundColor = color
      } else {
        styles.value.backgroundImage = `linear-gradient(${color})`
      }
    } else {
      styles.value.backgroundImage = `url(${imageUrl})`
      styles.value.backgroundSize = '100% 100%'
    }

    if (border?.display) {
      styles.value.border = `${border.width}px solid ${border.color}`
    }

    return styles
  }, [JSON.stringify(signStyle), type])

  return (
    <div style={styleMemo.wrapper}>
      <div style={styleMemo.value}>{value}</div>
      {signStyle.decorate?.imgUrl && <img style={styleMemo.decorate} src={signStyle.decorate?.imgUrl} alt='' />}
    </div>
  )
})
