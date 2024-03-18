import React, { useEffect, useMemo, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import { configDisplayCompatible, conversionData, getColorObj } from '../common/util'
import { SlideTitleProps, TextStyle } from './type'
import { usemEffect } from '../common/hooks'

const SlideTitle = (props: SlideTitleProps = {}) => {
  const defalutTextStyle: TextStyle = {
    fontFamily: 'Microsoft YaHei',
    fontSize: 18,
    color: {
      colorString:
        '{"type":"single","colors":[{"rgb":{"r":255,"g":255,"b":255,"a":1},"hex":"#FFFFFF","begins":0}],"gradualAngle":0}'
    },
    fontWeight: 400,
    letterSpacing: 0
  }
  const { textStyle = defalutTextStyle, animateConfig = {}, children, w = 0, style, data = [], value } = props

  const {
    duration = 8000,
    constanDuration = 1000,
    alwayAnimate = false,
    earlyStay = 1000,
    lateStay = 0,
    constantPlay = false
  } = animateConfig

  const animateDis = configDisplayCompatible(animateConfig, 'carousel')

  const wrapperRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const copeTextRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const timer: any = useRef(null)
  const step = useRef(w)

  const getValue = useMemo(() => {
    const _data = conversionData(data, { value: 'string' })
    let setValue: any = ''
    if (_data && _data.length > 0 && _data[0].value) {
      setValue = _data[0].value
    } else if (value) {
      setValue = value
    } else {
      setValue = ''
    }

    return setValue
  }, [data, value])

  let isFirst = true

  const aniamteStep = useMemo(() => {
    const obj = {
      pWidth: 0,
      noConstantPlayStep: 0,
      constantPlayStep: 0,
      wrapperWidth: 0,
      firstNoConstantPlayStep: 0
    }
    setTimeout(() => {
      const $text = $(textRef.current),
        tWidth = $text.width()
      const $p = $(textRef.current?.outerHTML)
      $p.css({ width: 'max-content' })
      $(wrapperRef.current).append($p)

      const pWidth = $p.width() || 0
      $p.remove()

      obj.pWidth = Math.max(tWidth, pWidth)
      obj.wrapperWidth = w || $(wrapperRef.current).width()
      obj.noConstantPlayStep = ((obj.pWidth + obj.wrapperWidth) * 16) / duration
      obj.firstNoConstantPlayStep = (obj.pWidth * 16) / duration
      obj.constantPlayStep = 1600 / constanDuration
    }, 50)

    return obj
  }, [getValue, duration, constanDuration])

  const scrollChange = () => {
    clearTimeout(timer.current)

    const {
      pWidth: pNodeWidth,
      wrapperWidth,
      constantPlayStep,
      firstNoConstantPlayStep,
      noConstantPlayStep
    } = aniamteStep

    try {
      if (step.current < pNodeWidth + wrapperWidth) {
        const len =
          step.current + (constantPlay ? constantPlayStep : isFirst ? firstNoConstantPlayStep : noConstantPlayStep)
        updataStep(len)

        timer.current = setTimeout(scrollChange, 16)
      } else {
        updataStep(0)
        isFirst = false
        setTimeout(scrollChange, +lateStay)
      }
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const onload = () => {
    clearTimeout(timer.current)
    try {
      if (w > aniamteStep.pWidth && !alwayAnimate) return false

      copeTextRef.current && textRef.current && (copeTextRef.current.innerHTML = textRef.current?.innerHTML)
      setTimeout(scrollChange, lateStay)
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    const canReplace = getValue && typeof getValue === 'string' && getValue.search(/<i|<span|style=/) >= 0
    if (textRef.current && !children && canReplace) {
      textRef.current.innerHTML = getValue
    }
  }, [getValue, children])

  usemEffect(() => {
    clearTimeout(timer.current)

    updataStep(w)
    textRef.current?.style && (textRef.current.style.marginLeft = `${w}px`)
    copeTextRef.current?.style && (copeTextRef.current.style.marginLeft = `${w}px`)

    setTimeout(() => {
      if (animateDis) {
        onload()
      } else {
        clearTimeout(timer.current)
        copeTextRef.current && (copeTextRef.current.innerHTML = '')
      }
    }, earlyStay)

    return () => {
      clearTimeout(timer.current)
    }
  }, [animateConfig, getValue, textStyle.fontSize, w])

  function updataStep(val: number) {
    step.current = val
    innerRef.current && (innerRef.current.style.transform = `translateX(-${step.current}px)`)
  }

  const getColor = useMemo(() => {
    try {
      const { color: coloarVal, colorType } = getColorObj(textStyle.color.colorString)
      if (!coloarVal || !colorType) {
        throw new Error('颜色设置错误')
      }
      return { color: coloarVal, colorType }
    } catch (error) {
      return { color: '#fff', colorType: 'single' }
    }
  }, [textStyle.color])

  const slideStyle = {}
  switch (getColor.colorType) {
    case 'single':
      slideStyle['color'] = getColor.color
      break
    case 'gradient':
      slideStyle['background'] = `#fff linear-gradient(${getColor.color} ) no-repeat 0 0`
  }

  return (
    <LczComCon style={style}>
      <div className='lcz-slide-title-wrapper' ref={wrapperRef}>
        <div className='inner' ref={innerRef}>
          <div
            className={['text', getColor.colorType].join(' ')}
            ref={textRef}
            style={{ ...textStyle, color: 'initial', ...slideStyle }}>
            {children ? children : getValue}
          </div>

          <div
            ref={copeTextRef}
            className={['text', getColor.colorType].join(' ')}
            style={{ ...textStyle, color: 'initial', ...slideStyle }}
          />
        </div>
      </div>
    </LczComCon>
  )
}

export default SlideTitle
