import React, { memo, useMemo, ReactNode, CSSProperties } from 'react'
import { Tooltip } from 'antd'
import { TipConfig } from '../type'
import { configDisplayCompatible, numberIsEmpty } from '../../common/util'

export default memo(function TooltipWrapper({
  children,
  value,
  tipConfig
}: {
  children: ReactNode
  value: string
  tipConfig: TipConfig
}) {
  const { position, bgColor, ...otherTipconfig } = tipConfig

  const innerstyle = useMemo(() => {
    const { xPadding, yPadding, maxHeight, maxWidth, radius, border, textStyle } = otherTipconfig
    const style: CSSProperties = {
      ...textStyle,
      minWidth: 'initial',
      minHeight: 'initial',
      padding: `${yPadding}px ${xPadding}px`,
      borderRadius: radius,
      lineHeight: 1.5,
      wordBreak: 'break-all'
    }

    const borderDis = configDisplayCompatible(border, 'borderd')
    if (border && borderDis) {
      style.border = `${border.borderWidth}px solid ${border.borderColor}`
    }

    if (numberIsEmpty(maxWidth)) style.maxWidth = maxWidth

    if (numberIsEmpty(maxHeight)) {
      style.overflow = 'hidden'
      style.maxHeight = maxHeight
    }
    return { style, hasArrow: borderDis }
  }, [JSON.stringify(otherTipconfig)])

  return (
    <Tooltip
      overlayStyle={{ pointerEvents: 'none' }}
      arrowPointAtCenter={true}
      overlayClassName={!innerstyle.hasArrow ? '' : 'antd-tooltip-no-arrow'}
      placement={position}
      color={bgColor}
      overlayInnerStyle={innerstyle.style}
      title={value}>
      {children}
    </Tooltip>
  )
})
