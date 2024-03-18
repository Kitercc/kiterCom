import React, { memo } from 'react'
import { ScatterProps } from '../LczBasicScatter/type'
import LczBasicScatter from '../LczBasicScatter'

export default memo(function LczBasicBubble(props: ScatterProps) {
  return <LczBasicScatter {...props} chartType='bubble'></LczBasicScatter>
})
