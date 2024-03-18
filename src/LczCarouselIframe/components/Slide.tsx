import React, { memo, useRef } from 'react'
import { DataMap } from '../type'

interface Slideprops {
  w: number
  h: number
  item: DataMap
  i: number
  currentIndex: number
}

export default memo(function Slide(props: Slideprops) {
  const { w, h, item, i, currentIndex } = props

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const show = item.url && (i === currentIndex || iframeRef.current)

  return (
    <>
      {show && <iframe ref={iframeRef} key={item.url} src={item.url} style={{ border: 'none', width: w, height: h }} />}
    </>
  )
})
