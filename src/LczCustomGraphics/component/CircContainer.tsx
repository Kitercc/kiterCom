import React, { memo, useMemo } from 'react'
import { getColorObj } from '../../common/util'
import { defaultBorderStyle, defaultBoxShadow, defaultFillColor, defaultVagueConfig } from '../common/defaultValue'
import { CircWrapper } from '../style'
import { GraphicsProps } from '../type'
interface CircProps extends GraphicsProps {
  randomId: string
}

export default memo(function CircContainer(props: CircProps) {
  const {
    w = 300,
    h = 300,
    fillColor = defaultFillColor,
    randomId,
    borderStyle = defaultBorderStyle,
    outShadow = defaultBoxShadow,
    inShadow = defaultBoxShadow,
    vagueConfig = defaultVagueConfig
  } = props
  const { lineType, dottedW, dottedSpace, borderWidth, display: borderDisplay } = borderStyle

  const { gaussianBlur } = vagueConfig

  const getFillColorMemo = useMemo(() => {
    if (!fillColor?.display || typeof fillColor === 'string') return { backgroundColor: 'transparent' }
    const { color, colorType } = getColorObj(fillColor.color)
    if (colorType === 'single') {
      return { backgroundColor: color }
    } else {
      return { background: `linear-gradient( ${color} )` }
    }
  }, [fillColor])

  const getShadowAndVague = useMemo(() => {
    const { display: outDis, x: outX, y: outY, vague: outV, extend: outE, color: outC } = outShadow
    const { display: inDis, x: inX, y: inY, vague: inV, extend: inE, color: inC } = inShadow
    return {
      boxShadow: `${outDis ? outX : 0}px ${outDis ? outY : 0}px ${outDis ? outV : 0}px ${
        outDis ? outE : 0
      }px ${outC}, ${inDis ? inX : 0}px ${inDis ? inY : 0}px ${inDis ? inV : 0}px ${inDis ? inE : 0}px ${inC} inset`,
      filter: `blur(${vagueConfig.display ? gaussianBlur : 0}px)`
    }
  }, [outShadow, inShadow, vagueConfig])

  return (
    <CircWrapper
      borderDisplay={borderDisplay}
      borderWidth={borderWidth}
      style={{ width: w, height: h, ...getFillColorMemo, ...getShadowAndVague }}>
      {borderDisplay && (
        <svg
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
          style={{
            width: w,
            height: h,
            position: 'absolute',
            top: borderDisplay ? -borderWidth : 0,
            left: borderDisplay ? -borderWidth : 0
          }}>
          <ellipse
            cx={w / 2}
            cy={h / 2}
            rx={w / 2 - (borderDisplay ? borderWidth / 2 : 0)}
            ry={h / 2 - (borderDisplay ? borderWidth / 2 : 0)}
            style={{
              fill: 'none',
              stroke: `url("#strokeGradient_${randomId}")`,
              strokeWidth: borderWidth,
              strokeDasharray: `${lineType === 'dotted' ? dottedW + ' ' + dottedSpace : '0'}`
            }}></ellipse>
        </svg>
      )}
    </CircWrapper>
  )
})
