import React, { memo } from 'react'

import LczBasicPie from '../LczBasicPie'
import { LczBasicPieProps } from '../LczBasicPie/type'

export default memo(function LczBasicDoughnut(props: LczBasicPieProps) {
  return <LczBasicPie {...props} chartType='doughnut' />
})
