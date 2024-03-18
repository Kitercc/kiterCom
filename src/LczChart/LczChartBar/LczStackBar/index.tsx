import React, { memo } from 'react'
import LczBasicBar from '../LczBasicBar'
import { BasicBarProps } from '../LczBasicBar/type'

export default memo(function LczStackBar(props: BasicBarProps) {
  return <LczBasicBar {...props} chartType='stackBar' />
})
