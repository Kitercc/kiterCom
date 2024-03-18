import React, { memo } from 'react'
import LczComCon from '../../common/LczComCon'
import { LczBorderRectangleWrapper } from './style'

import { RectangleProps } from './type'

const LczBorderRectangle = memo((props: RectangleProps = {}) => {
  const {
    borderColor1 = 'rgba(20,181,252,1)',
    hornColor1 = 'rgba(20,181,252,1)',
    bgColor1 = 'rgba(89,159,233,.16)'
  } = props

  const borderRect = {
    backgroundColor: bgColor1,
    border: `1px solid ${borderColor1}`
  }
  return (
    <LczComCon id='Lcz-border-rectangle'>
      <LczBorderRectangleWrapper
        borderColor={borderColor1}
        hornColor={hornColor1}
        className='border-rectangle-box'
        style={borderRect}>
        <span />
      </LczBorderRectangleWrapper>
    </LczComCon>
  )
})

LczBorderRectangle.displayName = 'LczBorderRectangle'

export default LczBorderRectangle
