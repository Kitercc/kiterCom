import React, { memo } from 'react'
import Arrow from '../../LczTabBar/components/Arrow'
import { IconArrowConfig } from '../../LczTabBar/type'

type Props = {
  arrowConfig?: IconArrowConfig
  isLevel: boolean
  currIndex: number
  dataLen: number
  onClick: (step?: 1 | -1) => void
}

const ArrowWrap = memo(function ArrowWrap({ arrowConfig, isLevel, currIndex, dataLen, onClick }: Props) {
  return (
    <div className='arrow-box'>
      <Arrow
        {...arrowConfig}
        direction={isLevel ? 'left' : 'top'}
        isDisabled={currIndex <= 0}
        onClick={() => onClick(-1)}
      />
      <Arrow
        {...arrowConfig}
        direction={isLevel ? 'right' : 'bottom'}
        isDisabled={currIndex >= dataLen - 1}
        onClick={() => onClick()}
      />
    </div>
  )
})

export default ArrowWrap
