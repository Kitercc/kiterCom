import React, { memo, Fragment, useEffect, useRef } from 'react'
import { usemEffect } from '../../common/hooks'
import Earth from '../../LczEarth/common/earth'
import { OutTitleBubble, TitleBubbleData } from '../../LczEarth/type/child'
import Bubble from './common/bubble'

type Props = {
  earth: Earth
  titleBubble: OutTitleBubble
  chindEvent: onChildComEvent
}

const LczEarthTitleBubble = memo(function LczEarthTitleBubble({ earth, titleBubble, chindEvent }: Props) {
  const bubbleInstance = useRef<Bubble | null>(null)

  usemEffect(() => {
    bubbleInstance.current && bubbleInstance.current.updata(titleBubble)
  }, [titleBubble])

  useEffect(() => {
    bubbleInstance.current = new Bubble({ earth, titleBubble, onClick: handlerClick })
    return () => {
      bubbleInstance.current?.destroy()
    }
  }, [])

  function handlerClick(curData: TitleBubbleData) {
    titleBubble.onClick && chindEvent(titleBubble.id, 'onClick', curData)
  }

  return <Fragment />
})

export default LczEarthTitleBubble
