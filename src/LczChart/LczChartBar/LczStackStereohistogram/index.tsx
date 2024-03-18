import React, { memo } from 'react'
import LczBasicStereohistogram from '../LczBasicStereohistogram'
import { BasicStereohistogram } from '../LczBasicStereohistogram/type'

export default memo(function LczStackStereohistogram(props: BasicStereohistogram) {
  return <LczBasicStereohistogram {...props} chartType='stackStereohistogram' />
})
