import React, { memo } from 'react'
import LczBorderRectangle from './LczBorderRectangle'
import LczBorderRadiu from './LczBorderRadiu'
import LczBorderRadiuRightIcon from './LczBorderRadiuRightIcon'
import LczBorderTopGradient from './LczBorderTopGradient'
import LczBorderColumns from './LczBorderColumns'
import { CompoundedLczBorder, LczBorderProps } from './type'

const border = memo((props: LczBorderProps) => {
  const { borderType = 'lcz-border-rectangle' } = props

  const Border = {
    'lcz-border-rectangle': LczBorderRectangle,
    'lcz-border-columns': LczBorderColumns,
    'lcz-border-radiu': LczBorderRadiu,
    'lcz-border-radiu-right-icon': LczBorderRadiuRightIcon,
    'lcz-border-top-gradient': LczBorderTopGradient
  }[borderType]

  return <Border {...props} />
})
border.displayName = 'LczBorder'

const LczBorder = border as CompoundedLczBorder
LczBorder.LczBorderRectangle = LczBorderRectangle
LczBorder.LczBorderRadiu = LczBorderRadiu
LczBorder.LczBorderRadiuRightIcon = LczBorderRadiuRightIcon
LczBorder.LczBorderTopGradient = LczBorderTopGradient
LczBorder.LczBorderColumns = LczBorderColumns

export default LczBorder
