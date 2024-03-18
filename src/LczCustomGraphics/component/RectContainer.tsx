import React, { memo, useMemo } from 'react'
import { RectWrapper } from '../style'

import { getColorObj } from '../../common/util'
import { defaultBorderStyle, defaultBoxShadow, defaultVagueConfig, defaultFillColor } from '../common/defaultValue'
import { GraphicsProps } from '../type'

interface RectProps extends GraphicsProps {
  randomId: string
}

export default memo(function RectContainer(props: RectProps) {
  const {
    w = 300,
    h = 300,
    radius = 0,
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
    if (!fillColor.display || typeof fillColor === 'string') return { background: 'transparent' }
    const { color, colorType } = getColorObj(fillColor.color)
    if (colorType === 'single') {
      return { backgroundColor: color }
    } else {
      return { background: `linear-gradient( ${color} )` }
    }
  }, [fillColor])

  const svgPathStyle = useMemo(() => {
    return {
      borderWidth_2: borderDisplay ? borderWidth / 2 : 0,
      radiu_borderWidth_2: radius - (borderDisplay ? borderWidth / 2 : 0),
      w_radius: w - radius,
      w_borderWidth_2: w - (borderDisplay ? borderWidth / 2 : 0),
      h_borderWidth_2: h - (borderDisplay ? borderWidth / 2 : 0),
      h_radius: h - radius
    }
  }, [borderWidth, radius, w, h])

  const { borderWidth_2, radiu_borderWidth_2, w_radius, w_borderWidth_2, h_borderWidth_2, h_radius } = svgPathStyle

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
    <RectWrapper
      style={{ width: w, height: h, ...getFillColorMemo, ...getShadowAndVague }}
      borderWidth={borderWidth}
      radius={radius}
      borderDisplay={borderDisplay}>
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
          <path
            d={`M${borderWidth_2} ${radius}
        A ${radiu_borderWidth_2} ${radiu_borderWidth_2} 0 0,1 ${radius} ${borderWidth_2}
        L ${w_radius} ${borderWidth_2}
        A ${radiu_borderWidth_2} ${radiu_borderWidth_2} 0 0,1 ${w_borderWidth_2} ${radius}
        L ${w_borderWidth_2} ${h_radius}
        A ${radiu_borderWidth_2} ${radiu_borderWidth_2} 0 0,1 ${w_radius} ${h_borderWidth_2}
        L ${radius} ${h_borderWidth_2}
        A ${radiu_borderWidth_2} ${radiu_borderWidth_2} 0 0,1 ${borderWidth_2} ${h_radius}
        Z`}
            style={{
              fill: 'none',
              strokeWidth: borderWidth,
              stroke: `url("#strokeGradient_${randomId}")`,
              strokeDasharray: `${lineType === 'dotted' ? dottedW + ' ' + dottedSpace : '0'}`
            }}></path>
        </svg>
      )}
    </RectWrapper>
  )
})
