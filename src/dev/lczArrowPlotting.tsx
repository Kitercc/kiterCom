import React, { memo } from 'react'
import { LczArrowPlotting } from '../'
import { ArrowPlottingProps } from '../LczArrowPlotting/type'

export const T_lczArrowPlotting = memo(function T_lczArrowPlotting() {
  const config: ArrowPlottingProps = {
    lineConfig: { leftHeightRatio: 0.2, rightHeightRatio: 0.8, LineType: 'LleftRright' },
    arrowConfig: {
      display: true,
      startDis: false,
      endDis: true,
      width: 20,
      height: 20,
      color: '#3d99fc'
    }
  }

  return (
    <div style={{ width: 600, height: 400, border: '1px solid skyblue' }}>
      <LczArrowPlotting {...config} w={600} h={400} />
    </div>
  )
})
