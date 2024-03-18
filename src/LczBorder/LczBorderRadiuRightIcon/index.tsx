import React, { memo } from 'react'

import LczComCon from '../../common/LczComCon'
import { BorderRightIconWrapper } from './style'
import { RaduiRightIcon } from './type'

import { rgbaRegX } from '../../common/util'

const Icon = () => {
  return (
    <div className='icon'>
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}

const LczBorderRadiuRightIcon = memo((props: RaduiRightIcon = {}) => {
  const {
    borderColor3 = 'rgba(17, 137, 239,1)',
    iconColor3 = 'rgba(68, 202, 255,1)',
    lineColor3 = 'rgba(10, 61, 127,1)',
    borderRadiu3 = 8,
    bgColor3 = 'rgba(8, 25, 92,1)'
  } = props

  const borderStyle = {
    border: `1px solid ${borderColor3}`,
    borderRadius: borderRadiu3,
    boxShadow: `inset 0px 0px 24px 4px ${rgbaRegX(borderColor3, 0.7)}`,
    backgroundColor: bgColor3
  }

  return (
    <LczComCon id='lcz-border-radiu-right-icon'>
      <BorderRightIconWrapper
        iconColor={iconColor3}
        lineColor={lineColor3}
        className='lcz-border-box'
        style={borderStyle}>
        <Icon />
      </BorderRightIconWrapper>
    </LczComCon>
  )
})

LczBorderRadiuRightIcon.displayName = 'LczBorderRadiuRightIcon'

export default LczBorderRadiuRightIcon
