import React, { memo, useMemo, CSSProperties } from 'react'
import { Pager } from '../type'

export default memo(function Pager({
  len,
  pager,
  currentIndex,
  onClick
}: {
  len: number
  pager: Pager
  currentIndex: number
  onClick: (index: number) => void
}) {
  const pagerStyle = useMemo(() => {
    const wrapper: CSSProperties = { gap: pager.speed },
      item: CSSProperties = {
        width: pager.wdith,
        height: pager.height,
        borderRadius: pager.radios,
        backgroundColor: pager.defaultColor
      }
    switch (pager.position) {
      case 'bottom': {
        wrapper.left = '50%'
        wrapper.bottom = 0
        wrapper.flexDirection = 'row'
        wrapper.transform = `translate(calc(-50% + ${pager.xOffset}px), ${pager.yOffset + pager.wdith}px)`
        break
      }
      case 'right': {
        wrapper.right = 0
        wrapper.top = '50%'
        wrapper.flexDirection = 'column'
        wrapper.transform = `translate(${pager.wdith + pager.xOffset}px, calc(-50% + ${pager.yOffset}px))`
        break
      }
    }

    return { wrapper, item }
  }, [JSON.stringify(pager)])
  return (
    <ul className='pager-wrapper' style={pagerStyle.wrapper}>
      {new Array(len).fill(0).map((_, i) => (
        <li
          onClick={() => onClick(i)}
          key={i}
          style={{
            ...pagerStyle.item,
            backgroundColor: currentIndex === i ? pager.activeColor : pagerStyle.item.backgroundColor
          }}
        />
      ))}
    </ul>
  )
})
