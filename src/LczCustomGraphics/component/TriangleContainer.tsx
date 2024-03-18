import React, { memo } from 'react'
import { defaultBorderStyle, defaultVagueConfig } from '../common/defaultValue'
import { TriangleWtapper } from '../style'
import { GraphicsProps } from '../type'

interface TriangleProps extends GraphicsProps {
  randomId: string
}
export default memo(function TriangleContainer(props: TriangleProps) {
  const { w = 300, h = 300, randomId, borderStyle = defaultBorderStyle, vagueConfig = defaultVagueConfig } = props
  const { lineType, dottedW, dottedSpace, borderWidth, display: borderDisplay } = borderStyle

  return (
    <TriangleWtapper style={{ width: w, height: h }} vagueConfig={vagueConfig}>
      <g filter=''>
        <polygon
          filter={`url(#dropShadow_Blur_${randomId})`}
          points={`
          ${w / 2},
          ${(h / 100) * 12.5 + (borderDisplay ? borderWidth / 2 : 0)} 
          ${w / 10 + (borderDisplay ? borderWidth / 2 : 0)},
          ${(90 * h) / 100 - (borderDisplay ? borderWidth / 2 : 0)}
          ${(90 * w) / 100 - (borderDisplay ? borderWidth / 2 : 0)},
          ${(90 * h) / 100 - (borderDisplay ? borderWidth / 2 : 0)}`}
          style={{
            fill: `url("#fillGradient_${randomId}")`,
            stroke: `url("#strokeGradient_${randomId}")`,
            strokeWidth: borderDisplay ? borderWidth : 0,
            strokeDasharray: `${lineType === 'dotted' ? dottedW + ' ' + dottedSpace : '0'}`
          }}></polygon>
      </g>
    </TriangleWtapper>
  )
})
