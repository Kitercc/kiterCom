import React, { CSSProperties, memo, useMemo } from 'react'
import TipItem from '../../LczChina2dMapTip/components/TipItem'
import LczTipImage from '../../LczAMapTooltip/components/Image'
import { getColorObj } from '../../../common/util'
import { OutToolTip } from '../../../Lcz3dAreaMap/type/child'

export default memo(function ToolTip({
  design,
  currentData,
  tooltip
}: {
  design: boolean
  currentData: any
  tooltip: OutToolTip
}) {
  const { id, size, styleConfig, lineContent = [], imageConfig } = tooltip

  const wrapperStyle = useMemo(() => {
    const { position, padding, bgConfig, border } = styleConfig || {}
    const css: CSSProperties = {
      width: size?.width,
      height: size?.height
    }

    css.left = position?.x
    css.top = position?.y

    css.padding = `${padding?.t}px ${padding?.r}px ${padding?.b}px ${padding?.l}px`

    const { color, colorType } = getColorObj(bgConfig?.color)

    if (colorType === 'single') {
      css.backgroundColor = color
    } else {
      css.backgroundImage = `linear-gradient( ${color} )`
    }

    if (bgConfig?.imgUrl) {
      css.backgroundImage = `url(${bgConfig.imgUrl})`
      css.backgroundSize = '100% 100%'
    }

    css.borderRadius = bgConfig?.radius

    if (border?.display) {
      css.border = `${border.width}px solid ${border.color}`
    }

    return css
  }, [JSON.stringify(size), JSON.stringify(styleConfig)])

  const Container = useMemo(() => {
    if (!lineContent.length) return null
    return lineContent.map((item, i) => (
      <TipItem key={i} id={id} expPathArr={[`lineContent[${i}]`]} itemData={currentData} item={item} />
    ))
  }, [JSON.stringify(currentData), JSON.stringify(lineContent)])

  return (
    <div className='lcz-3d-area-map-tooltip-wrapper' style={wrapperStyle}>
      <ul className='lcz-3d-area-map-tooltip-container'>{Container}</ul>
      <LczTipImage
        design={design}
        id={tooltip.id}
        data={currentData}
        className='lcz-3d-area-map-tooltip-image'
        imageConfig={imageConfig}
      />
    </div>
  )
})
