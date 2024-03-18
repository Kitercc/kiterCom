import { useRef } from 'react'
import { usemEffect, usePageHide, useUpdate } from '../../common/hooks'
import { setStyle } from '../../common/util'
import { DataMap, LczPointTimelineProps } from '../type'

interface Props extends LczPointTimelineProps {
  data: DataMap[]
  currIndex: React.MutableRefObject<number>
  setCurrIndex: (index: number) => void
  timelineRef: React.RefObject<HTMLUListElement>
}

export default function useScroll(props: Props) {
  const { w = 0, h = 0, globalConfig, animateConfig, data, currIndex, setCurrIndex, timelineRef, onChange } = props,
    { itemAxisWidth = 10, axisPadding = 0, direction = 'level' } = globalConfig || {},
    { inRotation = false, interval = 1, showType = 'center' } = animateConfig || {},
    isLevel = direction === 'level',
    dataLen = data.length,
    lineTotalSize = dataLen * itemAxisWidth + axisPadding * 2,
    canAnimate = isLevel ? w < lineTotalSize : h < lineTotalSize

  const scrollWidth = useRef<number>(0),
    carouselTimer = useRef<NodeJS.Timer | null>(null),
    lastCurrIndex = useRef<number>(-1),
    isMouseIn = useRef<boolean>(false)

  useUpdate(() => {
    revert()
  }, [lineTotalSize, canAnimate, isLevel, showType, w, h])

  usePageHide(carouselFn, cancelAnimation, [
    lineTotalSize,
    canAnimate,
    isLevel,
    w,
    h,
    animateConfig,
    globalConfig?.id,
    globalConfig?.index
  ])

  usemEffect(() => {
    carouselFn()
    return cancelAnimation
  }, [lineTotalSize, canAnimate, isLevel, w, h, animateConfig, globalConfig?.id, globalConfig?.index])

  function carouselFn(type = '') {
    if (type === 'mouseLeave') isMouseIn.current = false

    if (interval === 0 || !inRotation || isMouseIn.current) return

    carouselTimer.current = setInterval(() => {
      const i = currIndex.current >= dataLen - 1 ? 0 : currIndex.current + 1
      pointCenterByIndex(i)
      setCurrIndex(i)
    }, interval * 1000)
  }

  function pointCenterByIndex(index: number, upData = false) {
    if ((lastCurrIndex.current === index || !timelineRef.current) && !upData) return

    if (canAnimate || upData) {
      let scrollW = 0
      const conScrollW = isLevel ? w : h
      let canScrollWidth = lineTotalSize - conScrollW
      canScrollWidth = canScrollWidth > 0 ? canScrollWidth : 0

      switch (showType) {
        case 'center': {
          const currentOffsetWidth = (index + 0.5) * itemAxisWidth + axisPadding
          scrollW = currentOffsetWidth - conScrollW / 2
          break
        }
        case 'left': {
          scrollW = index * itemAxisWidth + axisPadding
          break
        }
        case 'right': {
          scrollW = (index + 1) * itemAxisWidth + axisPadding - conScrollW
          break
        }
      }
      scrollW = scrollW > canScrollWidth ? canScrollWidth : scrollW < 0 ? 0 : scrollW
      setScroll(scrollW)
    } else {
      setScroll(0)
    }

    onChange && onChange(data[index])
    lastCurrIndex.current = index
  }

  function revert() {
    cancelAnimation()
    pointCenterByIndex(currIndex.current, true)
  }

  function cancelAnimation(type = '') {
    if (type === 'mouseEnter') isMouseIn.current = true
    carouselTimer.current && clearInterval(carouselTimer.current)
  }

  function setScroll(w = 0) {
    if (!timelineRef.current) return
    setStyle(timelineRef.current, { transform: `translate(${isLevel ? `-${w}px, -50%` : `-50%, -${w}px`})` })
    scrollWidth.current = w
  }

  return { pointCenterByIndex, cancelAnimation, startCarousel: carouselFn }
}
