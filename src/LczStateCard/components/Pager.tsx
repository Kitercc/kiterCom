import React, { memo, useMemo, CSSProperties } from 'react'
import { PagerConfig } from '../../LczScrollPage/type'

type PagerType = {
  len: number
  pager: PagerConfig
  currentIndex: number
  arrangementMode: 'horizontal' | 'portrait'
  positiveRotation?: boolean
  onClick: (index: number) => void
}

const Pager = memo(({ len, pager, currentIndex, arrangementMode, positiveRotation = true, onClick }: PagerType) => {
  const {
    vertPosition = 'right',
    horiPosition = 'bottom',
    xOffset = 0,
    yOffset = 0,
    wdith = 18,
    height = 18,
    radios = 4,
    speed = 4,
    defaultColor = '#16f7ff4b'
  } = pager

  const pagerStyle = useMemo(() => {
    const wrapper: CSSProperties = { gap: speed },
      item: CSSProperties = {
        width: wdith,
        height: height,
        borderRadius: radios,
        backgroundColor: defaultColor
      },
      reverse = !positiveRotation ? '-reverse' : ''

    switch (arrangementMode) {
      case 'portrait': {
        wrapper.left = '50%'
        wrapper[horiPosition] = 0
        // @ts-ignore
        wrapper.flexDirection = 'row' + reverse
        wrapper.transform = `translate(calc(-50% + ${xOffset}px), ${yOffset}px)`
        break
      }
      case 'horizontal': {
        wrapper[vertPosition] = 0
        wrapper.top = '50%'
        // @ts-ignore
        wrapper.flexDirection = 'column' + reverse
        wrapper.transform = `translate(${xOffset}px, calc(-50% + ${yOffset}px))`
        break
      }
    }

    return { wrapper, item }
  }, [JSON.stringify(pager), arrangementMode, positiveRotation])

  return (
    <ul className='pager-wrapper' style={pagerStyle.wrapper}>
      {new Array(len).fill(0).map((_, i) => (
        <li
          key={i}
          style={{
            ...pagerStyle.item,
            backgroundColor: currentIndex === i ? pager.activeColor : pagerStyle.item.backgroundColor
          }}
          onClick={() => onClick(i)}
        />
      ))}
    </ul>
  )
})

Pager.displayName = 'Pager'

export default Pager
