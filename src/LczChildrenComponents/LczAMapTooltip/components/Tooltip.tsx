import React, { memo, useMemo, CSSProperties } from 'react'
import { getColorObj } from '../../../common/util'
import { OutToolTip } from '../../../LczAMap/type/child'
import TipItem from '../../LczChina2dMapTip/components/TipItem'
import { ToolTipWrapper } from '../style'
import LczTipImage from './Image'

interface TooltipProps {
  id: string
  design: boolean
  data?: any
  tooltip: OutToolTip
}

export default memo(function Tooltip(props: TooltipProps) {
  const { id, data, tooltip, design = true } = props,
    { globalConfig, size, positionConfig, lineContent = [], imageConfig } = tooltip,
    { fixed = false, fixedPosition, offset, padding, bgConfig, stroke } = positionConfig || {}

  const wrapperStyle = useMemo(() => {
    const css: CSSProperties = {
      width: size?.width,
      height: size?.height
    }

    if (fixed) {
      css.position = 'absolute'
      css.zIndex = globalConfig?.level
      css.left = fixedPosition?.left
      css.top = fixedPosition?.top
    } else {
      css.transform = `translate(${offset?.x}px, ${offset?.y}px)`
    }

    css.padding = `${padding?.top}px ${padding?.right}px ${padding?.bottom}px ${padding?.left}px`

    const { color, colorType } = getColorObj(bgConfig?.color)

    if (colorType === 'single') {
      css.backgroundColor = color
    } else {
      css.background = `linear-gradient( ${color} )`
    }

    if (bgConfig?.imgUrl) {
      css.backgroundImage = `url(${bgConfig.imgUrl})`
      css.backgroundSize = '100% 100%'
    }

    css.borderRadius = bgConfig?.radius

    if (stroke?.display) {
      css.border = `${stroke.width}px solid ${stroke.color}`
    }

    return css
  }, [JSON.stringify(size), JSON.stringify(positionConfig)])

  const Container = useMemo(() => {
    if (!lineContent.length) return null
    return lineContent.map((item, i) => (
      <TipItem key={i} expPathArr={[`lineContent[${i}]`]} id={id} itemData={data} item={item} />
    ))
  }, [JSON.stringify(data), JSON.stringify(lineContent)])

  return (
    <ToolTipWrapper style={wrapperStyle}>
      <ul className='amap-tooltip-container'>{Container}</ul>
      <LczTipImage id={tooltip.id} data={data} design={design} imageConfig={imageConfig} />
    </ToolTipWrapper>
  )
})
