import React, { memo } from 'react'
import { defaultBorderStyle, defaultVagueConfig } from '../common/defaultValue'
import { SvgIconWapper } from '../style'
import { GraphicsProps } from '../type'

interface StarProps extends GraphicsProps {
  randomId: string
}

export default memo(function StarContainer(props: StarProps) {
  const { w = 300, h = 300, randomId, borderStyle = defaultBorderStyle, vagueConfig = defaultVagueConfig } = props
  const { lineType, dottedW, dottedSpace, borderWidth, display: borderDisplay } = borderStyle

  return (
    <SvgIconWapper
      vagueConfig={vagueConfig}
      viewBox='0 0 1024 1024'
      style={{
        width: w,
        height: h,
        fill: `url("#fillGradient_${randomId}")`,
        stroke: `url("#strokeGradient_${randomId}")`,
        strokeWidth: borderDisplay ? borderWidth : 0,
        strokeDasharray: `${lineType === 'dotted' ? dottedW + ' ' + dottedSpace : '0'}`
      }}>
      <path
        filter={`url(#dropShadow_Blur_${randomId})`}
        d='M957.297 404.414a14.64 14.64 0 0 0-13.928-10.117H623.967L525.262 90.524a14.643 14.643 0 0 0-13.929-10.117 14.643 14.643 0 0 0-13.927 10.117l-98.698 303.773H79.305a14.645 14.645 0 0 0-13.929 10.117 14.648 14.648 0 0 0 5.32 16.373l258.399 187.736-98.698 303.767a14.647 14.647 0 0 0 13.927 19.168c3.017 0 6.043-0.93 8.61-2.796l258.398-187.743L769.74 928.662a14.633 14.633 0 0 0 17.216 0 14.644 14.644 0 0 0 5.32-16.372L693.57 608.523l258.407-187.736a14.649 14.649 0 0 0 5.32-16.373z'></path>
    </SvgIconWapper>
  )
})
