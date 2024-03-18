import React, { memo } from 'react'
import LczBasicLineBar from '../LczBasicLineBar'
import { LineBarProps } from '../LczBasicLineBar/type'

export default memo(function LczStackAreaBar(props: LineBarProps) {
  return <LczBasicLineBar {...props} chartType='stackAreaBar' />
})
