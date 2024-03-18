import React, { memo, useState, useEffect, useRef } from 'react'
import LczComCon from '../../common/LczComCon'
import { BorderRadioWrapper } from './style'

import { LczBorderRadiuProps } from './type'

const LczBorderRadiu = memo((props: LczBorderRadiuProps = {}) => {
  const {
    w,
    h,
    borderColor2 = '#08466D',
    borderRadiu2 = 6,
    hornColor2 = '#4DAAE7',
    backgroundColor2 = 'rgba(20, 55, 104,.3)'
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = useState<number>(0)

  useEffect(() => {
    setRatio((wrapperRef.current?.offsetWidth || 1) / (wrapperRef.current?.offsetHeight || 1))
  }, [w, h])

  const radiuBoxStyle = { borderRadius: borderRadiu2 }
  const wrapperStyle = { backgroundColor: backgroundColor2 }

  return (
    <LczComCon id='lcz-border-radiu'>
      <BorderRadioWrapper
        ratio={ratio}
        borderColor={borderColor2}
        borderRadiu={borderRadiu2}
        hornColor={hornColor2}
        ref={wrapperRef}
        className='border-radiu-box'
        style={radiuBoxStyle}>
        <div className='border-radiu-wrapper' style={wrapperStyle}></div>
        <div className='line-1' />
        <div className='line-2' />
        <div className='line-3' />
      </BorderRadioWrapper>
    </LczComCon>
  )
})

LczBorderRadiu.displayName = 'LczBorderRadiu'
export default LczBorderRadiu
