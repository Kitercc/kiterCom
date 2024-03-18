import React, { memo } from 'react'
import { BasicStripProps } from '../LczBasicStrip/type'
import LczBasicStrip from '../LczBasicStrip'

export default memo(function LczSingleSeriesStrip(props: BasicStripProps) {
  return <LczBasicStrip {...props} chartType='signSeries' />
})
