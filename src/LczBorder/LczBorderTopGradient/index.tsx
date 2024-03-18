import React, { memo } from 'react'
import LczComCon from '../../common/LczComCon'
import { GradientWrapper } from './style'
import { GradientProps } from './type'

const LczBorderTopGradient = memo((props: GradientProps = {}) => {
  const { topBgColor4 = 'rgba(0,128,255,0.50)', bottomBgColor4 = 'rgba(3,51,104,0.50)' } = props

  const borderStyle = {
    borderRadius: 8,
    background: `linear-gradient(to bottom, ${topBgColor4} 0%,  ${bottomBgColor4} 60px, ${bottomBgColor4} 100%)`
  }

  return (
    <LczComCon id='lcz-border-top-gradient'>
      <div className='border-box' style={borderStyle}>
        <GradientWrapper bottomBgColor4={bottomBgColor4} topBgColor4={topBgColor4} className='gradient'>
          <div className='line' />
        </GradientWrapper>
      </div>
    </LczComCon>
  )
})

LczBorderTopGradient.displayName = 'LczBorderTopGradient'

export default LczBorderTopGradient
