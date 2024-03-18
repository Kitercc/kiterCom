import React, { memo } from 'react'
import { BarrageProps } from './type'
import DesignBarrage from './component/DesignBarrage'
import PreviewBarrage from './component/PreviewBarrage'

export default memo(function LczBarrage(props: BarrageProps) {
  const { design } = props

  return <>{design ? <DesignBarrage {...props} /> : <PreviewBarrage {...props} />}</>
})
