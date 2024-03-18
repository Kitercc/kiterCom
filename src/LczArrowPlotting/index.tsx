import React, { memo, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import { randomChar } from '../common/util'
import { countPath } from './common'
import { defaultLineConfig, defultArrowConfig } from './common/defaultValue'
import Arrow from './components/Arrow'
import Text from './components/Text'
import { ArrowPlottingProps } from './type'

interface IDS {
  startArrowId: string
  endArrowId: string
  pathId: string
}

export default memo(function LczArrowPlotting(props: ArrowPlottingProps) {
  const { lineConfig = defaultLineConfig, arrowConfig = defultArrowConfig, w = 200, h = 100 } = props

  const svgRef = useRef<SVGSVGElement>(null)
  const ids = useRef<IDS>({
    startArrowId: randomChar('left-arrow-'),
    endArrowId: randomChar('right-arrow-'),
    pathId: randomChar('path-')
  })

  const pathConfig = countPath({ w, h }, lineConfig, arrowConfig)

  return (
    <LczComCon>
      <svg ref={svgRef} style={{ width: w, height: h }}>
        <defs>
          <Arrow arrowConfig={arrowConfig} path={pathConfig.startPath} id={ids.current.startArrowId} />
          <Arrow arrowConfig={arrowConfig} path={pathConfig.endPath} id={ids.current.endArrowId} />
        </defs>
        <path
          id={ids.current.pathId}
          d={pathConfig.mainPath}
          fill='none'
          style={{ strokeWidth: 2, stroke: 'rgb(10, 115, 255)', strokeLinecap: 'butt', strokeDasharray: '100, 5' }}
          markerStart={`url(#${ids.current.startArrowId})`}
          markerEnd={`url(#${ids.current.endArrowId})`}>
          <animate
            attributeName='stroke-dashoffset'
            from='438'
            to='0'
            begin='0s'
            dur='10s'
            repeatCount='indefinite'></animate>
        </path>
        <Text pathLen={pathConfig.textLength} pathId={ids.current.pathId} />
      </svg>
    </LczComCon>
  )
})
