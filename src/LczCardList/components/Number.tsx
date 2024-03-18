import React, { memo, useRef, CSSProperties, useEffect, useState } from 'react'
import CountUp, { CountUpProps } from 'react-countup'
import { usemEffect, usemMemo } from '../../common/hooks'
import { analysisExpression, getColorObj } from '../../common/util'
import { numberForMat } from '../../LczCarouselTable/common'
import { NumberConfig } from '../type/child'

type NumberType = {
  value: number | string
  numberConfig: NumberConfig
  containData: any
  id: string
  expPathArr: string[]
}
const Number = memo(({ value, numberConfig, containData = {}, id, expPathArr }: NumberType) => {
  const { prefixDistance = 0, suffixDistance = 0, prefixConfig, numValueConfig, suffixConfig } = numberConfig,
    animate = numValueConfig?.animate,
    numberFormat = numValueConfig?.numberFormat,
    styleIntervalFlag = numValueConfig?.styleIntervalFlag || false,
    styleInterval = numValueConfig?.styleInterval || []

  const val = value !== '' && value !== null ? +value : NaN
  const preVal = useRef<number>(val),
    countupRef = useRef<any>(null),
    [switchnum, setSWitchnum] = useState(true)

  const customStyle = usemMemo(() => {
    const style: CSSProperties = {}
    let gradient = '',
      isInterval = false,
      colorsType: 'single' | 'gradient' = 'single'

    if (!isNaN(val) && styleIntervalFlag && styleInterval.length > 0) {
      const interval = styleInterval.find(item => val >= item.min && val <= item.max)

      if (interval) {
        isInterval = true
        style.fontWeight = interval.fontWeight
        style.fontSize = interval.fontSize
        const { color, colorType } = getColorObj(interval.color)

        if (colorType !== 'single') {
          gradient = `linear-gradient(${color})`
          colorsType = 'gradient'
        } else {
          style.color = color
        }
      }
    }

    if (!isInterval) {
      const { color, colorType } = getColorObj(numValueConfig?.fontStyle?.color)
      if (colorType === 'single') {
        style.color = color
      } else {
        gradient = `linear-gradient(${color})`
        colorsType = 'gradient'
      }
    }

    return { style, gradient, colorsType }
  }, [val, styleIntervalFlag, styleInterval, numValueConfig?.fontStyle?.color])

  const styles = usemMemo(() => {
    const wrapper: CSSProperties = {}
    const prefix: CSSProperties = {
      marginRight: prefixDistance,
      ...prefixConfig?.prefixStyle,
      transform: `translateY(${prefixConfig?.verticalOffset || 0}px)`
    }
    const suffix: CSSProperties = {
      marginLeft: suffixDistance,
      ...suffixConfig?.suffixStyle,
      transform: `translateY(${suffixConfig?.verticalOffset || 0}px)`
    }
    const val: CSSProperties = { ...numValueConfig?.fontStyle }

    if (numValueConfig?.widthAdaptation) {
      wrapper.width = '100%'
      val.display = 'flex'
      val.flex = 1
      val.justifyContent = 'space-between'
    }

    return { wrapper, prefix, suffix, val }
  }, [
    prefixDistance,
    suffixDistance,
    prefixConfig,
    suffixConfig,
    numValueConfig?.fontStyle,
    numValueConfig?.widthAdaptation
  ])

  const countUpFormatChange = (value: number): string => {
    const str = numberForMat(value, numberFormat).toString(),
      { colorsType, gradient } = customStyle

    const htmlStr = str
      .split('')
      .map(
        v => `<i class='${colorsType}' style='${colorsType === 'gradient' ? `background:${gradient}` : ''}'>${v}</i>`
      )
      .join('')
    return htmlStr
  }

  // 数据更新
  useEffect(() => {
    if (!isNaN(val) && animate?.display && val !== preVal.current && countupRef.current) {
      countupRef.current.update(val)
      preVal.current = val
    }
  }, [val, animate?.display])

  usemEffect(() => {
    if (animate?.display) {
      setSWitchnum(false)

      setTimeout(() => {
        setSWitchnum(true)
      }, 10)
    }
  }, [animate?.display, styles.val, styles, customStyle, numberFormat])

  const countUp: CountUpProps | null = usemMemo(() => {
    const { takeRatio = 1, speed = 1000 } = animate || {}
    const { display, round = false, decimal = 0 } = numberFormat || {}
    const decimals = display ? (round ? decimal : decimal + 1) : 0

    if (!animate?.display || isNaN(val)) return null
    preVal.current = val

    return {
      start: val * takeRatio,
      end: preVal.current,
      duration: speed / 1000,
      decimals,
      useEasing: true,
      useGrouping: true,
      formattingFn: countUpFormatChange
    }
  }, [animate, styles.val, styles, numberFormat, customStyle, value === undefined])

  const numCon = () => {
    let numCon: JSX.Element
    if (isNaN(val) || !animate?.display) {
      const vals = (isNaN(val) ? value || '' : numberForMat(val, numberFormat).toString()).split(''),
        { colorsType, gradient } = customStyle

      numCon =
        vals.length > 0 ? (
          <span style={{ ...styles.val, ...customStyle.style }}>
            {vals.map((s, i) => (
              <i key={i} className={colorsType} style={colorsType === 'gradient' ? { background: gradient } : {}}>
                {s}
              </i>
            ))}
          </span>
        ) : (
          <></>
        )
    } else {
      numCon = switchnum ? (
        // @ts-ignore
        <CountUp ref={countupRef} {...countUp} style={{ ...styles.val, ...customStyle.style }} />
      ) : (
        <></>
      )
    }
    return numCon
  }

  const prefixVal = analysisExpression(prefixConfig?.prefix || '', containData, id, {
    name: 'numberConfig.prefixConfig.prefix',
    pathArr: expPathArr
  })
  const suffixVal = analysisExpression(suffixConfig?.suffix || '', containData, id, {
    name: 'numberConfig.suffixConfig.suffix',
    pathArr: expPathArr
  })

  return (
    <div className='number-field-con' style={styles.wrapper}>
      {prefixVal && <span style={styles.prefix}>{prefixVal}</span>}
      {numCon()}
      {suffixVal && <span style={styles.suffix}>{suffixVal}</span>}
    </div>
  )
})

Number.displayName = 'Number'
export default Number
