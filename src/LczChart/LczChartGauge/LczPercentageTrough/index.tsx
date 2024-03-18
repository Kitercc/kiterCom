import React, { memo } from 'react'
import LczPercentageRing from '../LczPercentageRing'
import { PercentageRingProps } from '../LczPercentageRing/type'

export default memo(function LczPercentageTrough(props: PercentageRingProps) {
  return <LczPercentageRing {...props} chartType='trough' />
})
