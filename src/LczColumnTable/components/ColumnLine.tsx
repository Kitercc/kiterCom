import React, { memo } from 'react'
import { Border } from '../../LczCalendar/type'

const ColumnLine = memo(({ num, itemWidth, border }: { num: number; itemWidth: number; border: Border }) => {
  if (!border.display) return null

  const lineNum = num > 0 ? num : 0
  const { width = 0, color } = border

  const style = {
    width: width,
    backgroundColor: color
  }

  return (
    <ul className='column-line'>
      {Array(lineNum)
        .fill(0)
        .map((_, i) => (
          <li
            className='column-line-item'
            key={i}
            style={{ ...style, left: `calc( ${itemWidth * (i + 1)}px - ${width / 2}px )` }}
          />
        ))}
    </ul>
  )
})

ColumnLine.displayName = 'ColumnLine'
export default ColumnLine
