import React, { memo, useMemo } from 'react'
import { CSSProperties } from 'styled-components'
import { getDomSzie } from '../common'

const BottomTextLabel = memo((props: any) => {
  const { mode, data, index, labelSpace, shaftTextLabel, onItemClick } = props,
    { offset, textStyle } = shaftTextLabel

  const styleMemo = useMemo(() => {
    const { containerHeight, containerWidth } = getDomSzie(textStyle, data.text)
    const cssStyle: CSSProperties = {
      ...textStyle
    }
    if (mode == 'horizontal') {
      cssStyle.transform = `rotate(${textStyle.angle || 0}deg) translate(-${containerWidth / 2}px, 0px) translate3d(${
        offset.xOffset
      }px, ${offset.yOffset}px, 0px) `
      cssStyle.left = index * labelSpace + 'px'
    } else {
      cssStyle.transform = `rotate(${textStyle.angle || 0}deg) translate(-${containerWidth}px,-${
        containerHeight / 2
      }px) translate3d(${offset.xOffset}px, ${offset.yOffset}px, 0px) `
      cssStyle.top = index * labelSpace + 'px'
    }

    return cssStyle
  }, [JSON.stringify(shaftTextLabel), data])

  const onTimeTextClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    onItemClick(index, data)
  }

  return (
    <div style={styleMemo} onClick={e => onTimeTextClick(e)}>
      {data.text}
    </div>
  )
})

BottomTextLabel.displayName = 'BottomTextLabel'
export default BottomTextLabel
