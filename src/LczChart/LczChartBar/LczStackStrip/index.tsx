import React, { memo } from 'react'
import LczBasicStrip from '../LczBasicStrip'
import { BasicStripProps } from '../LczBasicStrip/type'

export default memo(function LczStackStrip(props: BasicStripProps) {
  return <LczBasicStrip {...props} chartType='stackStrip' />
})
