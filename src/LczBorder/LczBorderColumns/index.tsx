import React, { memo } from 'react'

import LczComCon from '../../common/LczComCon'
import { ColumnsWrapper } from './style'

import { ColumnsProps } from './type'
const LczBorderColumns = memo((props: ColumnsProps = {}) => {
  const {
    topBgColor5 = '#0b203d',
    hornColor5 = '#3a82e8',
    borderColor5 = '#162b48',
    bgColor5 = 'rgba(2, 0, 4, 0.6)'
  } = props
  const borderStyle = {
    backgroundColor: bgColor5,
    border: `1px solid ${borderColor5}`
  }
  return (
    <LczComCon id='lcz-border-columns'>
      <ColumnsWrapper topBgColor={topBgColor5} hornColor={hornColor5} className='border-box' style={borderStyle}>
        <div className='line1' />
        <div className='line2' />
      </ColumnsWrapper>
    </LczComCon>
  )
})

LczBorderColumns.displayName = 'LczBorderColumns'
export default LczBorderColumns
