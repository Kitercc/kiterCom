import React, { memo, useMemo, useRef } from 'react'
import { randomChar } from '../../common/util'
import { GridConfig } from '../type'

interface bgBar {
  barWidth: number
  grildNumMemo: number
  gridConfig: GridConfig
  barRadius: number
  globalWidth: number
}

export default memo(function ProgressBgBar(props: bgBar) {
  const { globalWidth, gridConfig, grildNumMemo, barRadius } = props
  const { width, height, space, radius, bgColor } = gridConfig

  const barBgSvgId = useRef<string>(randomChar('gradientsvg-path-bg'))
  const barBgRectId = useRef<string>(randomChar('svg-path-bg'))

  const bgWidth = useMemo(() => {
    const w = (width + space) * grildNumMemo - space
    return globalWidth < w ? globalWidth : w
  }, [width, space, grildNumMemo, space, globalWidth])

  return (
    <svg className='dotted-line-bg' style={{ width: bgWidth, height, display: 'inherit' }}>
      <defs>
        <linearGradient id={barBgSvgId.current} x1='0' y1='0' x2='100%' y2='0'>
          <stop offset='0%' stopColor={bgColor}></stop>
          <stop offset='100%' stopColor={bgColor}></stop>
        </linearGradient>
        <clipPath id={barBgRectId.current}>
          {new Array(grildNumMemo).fill(null).map((v, i) => {
            return <rect x={i * (width + space)} y='0' key={i} width={width} height={height} rx={radius} ry={radius} />
          })}
        </clipPath>
      </defs>
      <rect
        id='rect-bg'
        x='0'
        y='0'
        rx={barRadius}
        ry={barRadius}
        height={height}
        fill={`url(#${barBgSvgId.current})`}
        clipPath={`url(#${barBgRectId.current})`}
        style={{ width: bgWidth }}></rect>
    </svg>
  )
})
