import React, { memo, useEffect, useRef, useState, CSSProperties, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { NormalTitleProps } from './type'
import { TitleWrapper } from './style'
import { alignType, colorFunc, configDisplayCompatible, getColorObj } from '../common/util'
import { defauleShadow, defaultSweepColor, defaultTitleStyle, defaultBgConfig } from './common/defaultValue'
import { usemMemo } from '../common/hooks'

const LczNormalTitle = (props: NormalTitleProps = {}) => {
  const {
    w = 0,
    h = 0,
    textStyle = defaultTitleStyle,
    ellipsis = false,
    data = [],
    value = '',
    writingMode = 'horizontal-tb',
    horizon = 'left',
    vertical = 'top',
    sweepThrough,
    outShadow = defauleShadow,
    bgConfig = defaultBgConfig,
    onClick,
    onDataChange
  } = props

  const { bgColor = defaultSweepColor, isAnimat = true } = sweepThrough || {}
  const colorString = textStyle.color.colorString

  const sweepDis = configDisplayCompatible(sweepThrough, 'sweepStatus')

  const [contType, setContType] = useState('gradient')
  const boxRef = useRef<HTMLDivElement>(null)

  const titleColor = useMemo(() => {
    try {
      const { color, colorType } = getColorObj(colorString)
      if (sweepDis) {
        setContType('gradient')
      } else {
        setContType(colorType)
      }
      return { color, colorType }
    } catch (error) {
      console.warn(error)
      return { color: '#3D99FC', colorType: 'single' }
    }
  }, [JSON.stringify(colorString), sweepDis])

  const sweepColor = useMemo(() => {
    try {
      const { selected, gradient, single } = bgColor.colorString
      let colorStr = ''
      if (selected === 'single' || gradient.colors.length === 1) {
        if (selected === 'single') {
          colorStr = single + ' 50%'
        } else {
          colorStr = gradient.colors[0].value + ' 50%'
        }
      } else {
        const rgbaArr = gradient.colors.map(v => v.value)
        let bai = 0
        rgbaArr.forEach((item, i) => {
          bai = 33 + Number(((34 / rgbaArr.length) * (i + 1)).toFixed(0))
          colorStr += ` ${item} ${bai}%,`
        })
        colorStr = colorStr.substr(0, colorStr.length - 1)
      }
      return colorStr
    } catch (error) {
      console.warn(error)
      return '#f00'
    }
  }, [JSON.stringify(bgColor.colorString)])

  const titleVal = useMemo(() => {
    let val = ''
    if (data[0] && data[0].value) {
      val = String(data[0].value)
    } else {
      val = value
    }

    return val
  }, [JSON.stringify(data), value])

  useEffect(() => {
    onDataChange && onDataChange({ value: titleVal })
  }, [titleVal])

  const styles = usemMemo(() => {
    const verticalAlign = {
      right: 'left',
      center: 'center',
      left: 'right'
    }

    const wrapper: CSSProperties = {
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      fontWeight: textStyle.fontWeight,
      letterSpacing: textStyle.letterSpacing,
      writingMode
    }
    const content: CSSProperties = {}
    const title: CSSProperties = {}
    const shadowTitle: CSSProperties = {}

    if (ellipsis) {
      const style = {
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
      Object.assign(content, style)
      Object.assign(title, style)
    }
    if (textStyle.italics) wrapper.fontStyle = 'italic'

    let aligns: CSSProperties = {}
    switch (writingMode) {
      case 'horizontal-tb': {
        aligns = {
          alignItems: alignType[vertical],
          justifyContent: alignType[horizon]
        }
        ellipsis && (content.maxWidth = '100%')
        break
      }
      case 'vertical-rl': {
        aligns = {
          alignItems: alignType[verticalAlign[horizon]],
          justifyContent: alignType[vertical]
        }
        ellipsis && (content.maxHeight = '100%')
        break
      }
    }
    Object.assign(wrapper, aligns)

    if (bgConfig.display) {
      const { range = 'full', padding, bgStyle, border, radius = 8 } = bgConfig

      let css = wrapper
      if (range === 'self-adaption') {
        css = content
        css.padding = `${padding?.y}px ${padding?.x}px`
        ellipsis &&
          Object.assign(shadowTitle, {
            maxWidth: w - (padding?.x || 0) * 2,
            maxHeight: h - (padding?.y || 0) * 2
          })
      }

      css.borderRadius = radius
      if (bgStyle?.display) {
        const { color, colorType } = colorFunc(bgStyle.color)
        if (colorType === 'single') {
          css.backgroundColor = color
        } else {
          css.backgroundImage = color
        }
        bgStyle.imgUrl && ((css.backgroundImage = `url(${bgStyle.imgUrl})`), (css.backgroundSize = '100% 100%'))
      }

      if (border?.display) {
        css.border = `${border.width}px solid ${border.color}`

        if (range === 'self-adaption') {
          ellipsis &&
            Object.assign(shadowTitle, {
              maxWidth: w - ((padding?.x || 0) + (border.width || 0)) * 2,
              maxHeight: h - ((padding?.y || 0) + (border.width || 0)) * 2
            })
        }
      }
    }

    return { wrapper, title, content, shadowTitle }
  }, [ellipsis, boxRef.current, textStyle, vertical, horizon, writingMode, bgConfig, w, h])

  function clickEvent(e) {
    e.stopPropagation()
    onClick && onClick({ value: titleVal })
  }

  return (
    <LczComCon ref={boxRef}>
      <TitleWrapper
        className='lcz-normal-title'
        titleColor={titleColor}
        sweepColor={sweepColor}
        sweepStatus={sweepDis}
        isAnimat={isAnimat}
        writingMode={writingMode}
        outShadow={outShadow}
        ellipsis={ellipsis}
        style={styles.wrapper}>
        <div className='lcz-normal-content' style={styles.content}>
          <span className={contType} style={styles.title} onClick={clickEvent}>
            {titleVal}
          </span>
          {outShadow.display && (
            <span
              className={[contType, 'shadow-title'].join(' ')}
              style={{ ...styles.title, ...styles.shadowTitle }}
              onClick={clickEvent}>
              {titleVal}
            </span>
          )}
        </div>
      </TitleWrapper>
    </LczComCon>
  )
}

export default memo(LczNormalTitle)
