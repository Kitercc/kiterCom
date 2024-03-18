import React, { memo } from 'react'
import { defultArrowConfig } from '../common/defaultValue'
import { ArrowConfig } from '../type'

interface ArrowProps {
  id: string
  path: string
  arrowConfig: ArrowConfig
}

export default memo(function Arrow(props: ArrowProps) {
  const { id, path, arrowConfig = defultArrowConfig } = props
  return (
    <marker
      id={id}
      markerWidth={arrowConfig.width}
      markerHeight={arrowConfig.height}
      refX={arrowConfig.width / 2}
      refY={arrowConfig.height / 2}
      orient='auto'
      markerUnits='userSpaceOnUse'>
      <path
        d={path}
        fill={arrowConfig.color}
        stroke={arrowConfig.color}
        style={{ strokeWidth: 0, stroke: arrowConfig.color, strokeLinecap: 'butt', strokeDasharray: '5, 5' }}></path>
    </marker>
  )
})
