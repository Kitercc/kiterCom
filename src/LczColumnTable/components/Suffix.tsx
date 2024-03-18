import React, { memo } from 'react'
import { Suffix } from '../../LczCarouselTable/type'

const Suffix = memo(({ suffixConfig }: { suffixConfig?: Suffix }) => {
  const { display, content, textStyle } = suffixConfig || {}

  if (!display) return null

  return <i style={textStyle}>{content}</i>
})

Suffix.displayName = 'Suffix'
export default Suffix
