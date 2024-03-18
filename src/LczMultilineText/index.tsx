import React, { memo, useEffect, useMemo, useRef, useState, useCallback } from 'react'
import LczComCon from '../common/LczComCon'

import { MultilineTextprops } from './type'
import { defaultTextStyle } from './common/defaultValue'
import { conversionData, lineFeedReg, randomChar, resMobile } from '../common/util'

export default memo(function LczMultilineText(props: MultilineTextprops = {}) {
  const {
    w = 300,
    h = 300,
    data = [],
    defaultText = '',
    textStyle = defaultTextStyle,
    alignType = 'left',
    textIndent = 38,
    lineHeight = 16,
    roll = true,
    duration = 10000
  } = props

  // hooks
  const [ing, setIng] = useState(false)
  const [moveStatus, setMoveStatus] = useState<boolean>(false)

  const boxWrapper = useRef<HTMLDivElement>(null)
  const rollWrapper = useRef<HTMLDivElement>(null)
  const firstCon = useRef<HTMLDivElement>(null)
  const secondCon = useRef<HTMLDivElement>(null)

  const scrollY = useRef<number>(0)
  const textHeight = useRef<number>(0)
  const boxId = useRef<any>(randomChar())
  const isMobile = useRef<'pc' | 'mobile'>(resMobile())
  const timer = useRef<any>(0)

  const getValue = useMemo(() => {
    const _data = conversionData(data, { text: 'string' })
    const value = _data[0] && _data[0].text ? _data[0].text : defaultText
    if (typeof value === 'string') return value.split(lineFeedReg)
    return String(value).split(lineFeedReg)
  }, [data])

  const rollOnLoad = useCallback(() => {
    try {
      secondCon.current!.innerHTML = ''
      if (firstCon.current!.offsetHeight < h) return initRoll()
      clearTimeout(timer.current)
      if (!secondCon.current) return
      secondCon.current!.innerHTML = firstCon.current!.innerHTML
      textHeight.current = firstCon.current?.offsetHeight || 0
      setTimeout(() => scrollChange(), 20)
    } catch (error) {
      console.warn(error)
    }
  }, [w, h, duration])

  const scrollChange = useCallback(() => {
    timer.current && clearTimeout(timer.current)
    try {
      if (scrollY.current <= (firstCon.current!.offsetHeight || textHeight.current)) {
        setIng(true)
        scrollY.current += (firstCon.current!.offsetHeight * 20) / duration
        rollWrapper.current!.style.transform = `translate3d(0px,-${scrollY.current}px,0px)`
        timer.current = setTimeout(() => scrollChange(), 20)
      } else {
        initRoll()
        scrollChange()
      }
    } catch (error) {
      console.warn(error)
    }
  }, [w, h, scrollY.current, duration, ing])

  const initRoll = (flag = true) => {
    try {
      clearTimeout(timer.current)
      flag && setIng(false)
      rollWrapper.current!.style.transform = 'translate3d(0px,0px,0px)'
      scrollY.current = 0
    } catch (error) {
      console.warn(error)
    }
  }

  // 处理轮播
  useEffect(() => {
    initRoll()
    roll && rollOnLoad()
    return () => {
      initRoll()
    }
  }, [w, h, roll, getValue, duration, textStyle.fontSize, lineHeight])

  // 处理事件
  useEffect(() => {
    boxWrapper.current?.addEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', mouseenter)
    boxWrapper.current?.addEventListener('mouseleave', mouseleave)

    if (isMobile.current === 'mobile') document.addEventListener('click', otherHandlerClick)

    return () => {
      boxWrapper.current &&
        boxWrapper.current?.removeEventListener(isMobile.current === 'pc' ? 'mouseenter' : 'touchstart', mouseenter)
      boxWrapper.current && boxWrapper.current?.removeEventListener('mouseleave', mouseleave)
      document.removeEventListener('click', otherHandlerClick)
    }
  }, [moveStatus, isMobile.current])

  const mouseenter = function (this: any) {
    setMoveStatus(true)
    boxWrapper.current && boxWrapper.current.parentElement?.classList.add('scrollBar')
    initRoll(false)
    if (secondCon.current) secondCon.current.style.display = 'none'
  }

  const mouseleave = function (this: any) {
    try {
      setMoveStatus(false)
      setIng(false)
      boxWrapper.current && boxWrapper.current.parentElement?.classList.remove('scrollBar')
      const scrollTop = boxWrapper.current!.scrollTop
      scrollY.current = scrollTop
      boxWrapper.current!.scrollTop = 0
      rollWrapper.current!.style.transform = `translate3d(0px,-${scrollY.current}px,0px)`
      if (secondCon.current) secondCon.current.style.display = 'block'
      rollOnLoad()
    } catch (error) {
      console.warn(error)
    }
  }

  function otherHandlerClick(e: any) {
    // @ts-ignore
    const flag = $(e.target).closest(`#${boxId.current}`).length > 0
    if (isMobile.current === 'mobile' && !flag && moveStatus) {
      mouseleave()
    }
  }

  return (
    <LczComCon className='multiline-text' id={boxId.current}>
      <div
        className='multiline-wrapper'
        ref={boxWrapper}
        style={{
          ...textStyle,
          height: h
        }}>
        <div className={['big-con', ing ? 'animate' : ''].join(' ')} ref={rollWrapper}>
          <div
            className='container'
            ref={firstCon}
            style={{
              textAlign: alignType,
              textIndent: textIndent,
              lineHeight: lineHeight + 'px'
            }}>
            {getValue.map((v, i) => (
              <p key={i}>{v}</p>
            ))}
          </div>
          {roll && (
            <div
              className='container'
              ref={secondCon}
              style={{
                display: 'block',
                textAlign: alignType,
                textIndent: textIndent,
                lineHeight: lineHeight + 'px'
              }}
            />
          )}
        </div>
      </div>
    </LczComCon>
  )
})
