import React, { memo } from 'react'

interface TextProps {
  pathId: string
  pathLen: number
}

export default memo(function Text(props: TextProps) {
  const { pathId, pathLen } = props

  return (
    <text
      textAnchor='start'
      style={{
        fill: 'rgb(255, 255, 255)',
        fontSize: 12,
        color: 'rgb(255, 255, 255)',
        fontWeight: 400,
        fontFamily: 'Microsoft Yahei'
      }}>
      <textPath xlinkHref={`#${pathId}`} startOffset='50%' style={{ baselineShift: 8 }}>
        箭头标绘文字
        <animate
          attributeName='startOffset'
          from='0'
          to={pathLen}
          begin='0s'
          dur='10s'
          repeatCount='indefinite'></animate>
      </textPath>
    </text>
  )
})
