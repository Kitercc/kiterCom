import React, { memo } from 'react'
import { AreamConfig } from '../type'

export default memo(function LabelText({ areaName, info = {} }: { areaName: AreamConfig; info: any }) {
  const { fontStyle = {} } = areaName

  return <span style={{ ...fontStyle, wordSpacing: 'nowrap' }}>{info.name}</span>
})
