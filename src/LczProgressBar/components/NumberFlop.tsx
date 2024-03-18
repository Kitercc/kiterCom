import React, { memo, useRef, useMemo, useEffect, useCallback } from 'react'
import CountUp from 'react-countup'
import { forMatNumber } from '../common'
import { AnimateConfig, dataMap, TextConfig } from '../type'

interface NumberFlopProps {
  timer: number
  proportion: number
  data: dataMap[]
  textConfig: TextConfig
  animateConfig: AnimateConfig
}

export default memo(function NumberFlop(props: NumberFlopProps) {
  const { timer, proportion, data, textConfig, animateConfig } = props
  const { negativeing, unit, round, decimal, trueValue } = textConfig
  const { display: animateDis } = animateConfig
  const countupRef: any = useRef(null)

  const barValue = useCallback(
    (value, max) => {
      if (isNaN(value) || isNaN(max)) return ''
      const forMatTrueValue = forMatNumber(value, round, decimal)
      const forMatValue = forMatNumber(+max === 0 ? 0 : value, round, decimal)
      if (trueValue) {
        if (+forMatTrueValue < 0) {
          switch (negativeing) {
            case 'minus':
              return forMatTrueValue + (trueValue ? unit : '')
              break
            case 'brackets':
              return `(${Math.abs(forMatTrueValue) + (trueValue ? unit : '')})`
              break
            case 'abs':
              return Math.abs(forMatTrueValue) + (trueValue ? unit : '')
              break
            default:
              break
          }
        }
        return forMatTrueValue + (trueValue ? unit : '')
      } else {
        if (+forMatValue >= 0) {
          return forMatValue + '%' + (trueValue ? unit : '')
        } else {
          switch (negativeing) {
            case 'minus':
              return forMatTrueValue + '%' + (trueValue ? unit : '')
              break
            case 'brackets':
              return `(${Math.abs(forMatTrueValue) + '%' + (trueValue ? unit : '')})`
              break
            case 'abs':
              return Math.abs(forMatTrueValue) + '%' + (trueValue ? unit : '')
              break
            default:
              return forMatValue + '%' + (trueValue ? unit : '')
          }
        }
      }
    },
    [data, textConfig]
  )

  useEffect(() => {
    countupRef?.current?.update(
      +data[0].max === 0 ? 0 : trueValue ? data[0].value : (data[0].value / +data[0].max) * 100
    )
  }, [data, trueValue])

  const countUpFormatChange = useCallback(
    value => {
      return barValue(value, data[0].max)
    },
    [data, textConfig]
  )

  const countUp = useMemo(() => {
    return {
      start: proportion,
      end: +data[0].max === 0 ? 0 : trueValue ? data[0].value : (data[0].value / +data[0].max) * 100,
      duration: timer / 1000,
      decimals: round ? decimal + 1 : decimal,
      useEasing: true,
      redraw: false,
      suffix: unit,
      useGrouping: true,
      formattingFn: countUpFormatChange
    }
  }, [proportion, timer, unit, round, decimal, trueValue])

  const _barValue = trueValue ? +data[0]?.value : (+data[0]?.value * 100) / +data[0]?.max

  return (
    <>
      {animateDis ? (
        <CountUp className='count-up' ref={countupRef} {...countUp} />
      ) : (
        <span>{barValue(_barValue, +data[0].max)}</span>
      )}
    </>
  )
})
