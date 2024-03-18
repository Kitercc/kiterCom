import React, { memo } from 'react'
import LczBasicArea from '../LczBasicArea'
import { BasicAreaProps } from '../LczBasicArea/type'

export default memo(function LczStackArea(props: BasicAreaProps) {
  return <LczBasicArea {...props} chartType='stackArea' />
})
