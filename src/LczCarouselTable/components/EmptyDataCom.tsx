import React, { memo, CSSProperties } from 'react'
import { EmptyDataStyle } from '../type'
import { defaultEmptyDataStyle } from '../common/defaultValue'

const EmptyDataCom = memo(
  ({ emptyDataStyle, itemWidth, tablebodyheight }: { emptyDataStyle: EmptyDataStyle; itemWidth; tablebodyheight }) => {
    const { bgColor, image = defaultEmptyDataStyle.image, text = defaultEmptyDataStyle.text } = emptyDataStyle,
      imgWidth = image?.width || 0,
      imgHeight = image?.height || 0

    const wrapperStyle: CSSProperties = { width: itemWidth, height: tablebodyheight, backgroundColor: bgColor },
      imageStyle: CSSProperties = {
        width: imgWidth,
        height: imgHeight,
        backgroundImage: `url(${image?.imgUrl})`,
        transform: `translate(${-imgWidth / 2 + (image?.xOffset || 0)}px,${-imgHeight / 2 + (image?.yOffset || 0)}px)`
      },
      textStyle: CSSProperties = {
        ...(text?.textStyle || {}),
        transform: `translate(calc(-50% + ${text?.xOffset || 0}px), calc(-50% + ${text?.yOffset || 0}px))`
      }

    return (
      <div className='lcz-carousel-table-emptydata-wrapper' style={wrapperStyle}>
        {image?.display && image.imgUrl && <div className='background-image-100' style={imageStyle} />}
        {text?.display && text.content && <span style={textStyle}>{text.content}</span>}
      </div>
    )
  }
)

EmptyDataCom.displayName = 'EmptyDataCom'

export default EmptyDataCom
