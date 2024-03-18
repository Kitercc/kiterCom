import React, { memo, useMemo, useCallback, useRef, useEffect } from 'react'
import CountUp from 'react-countup'
import { configDisplayCompatible, conversionData, formatNumber } from '../../common/util'
import { NumberProps } from './type'

export default memo(function CountUpCom(props: NumberProps) {
  const { numColor, refresh = false, scrollCountConfig = {}, data = [] } = props

  const { numberConfig = {} } = scrollCountConfig

  const { numberAnimate = {}, numberFormat = {}, symbolCustom = {}, widthAdaptation = false } = numberConfig

  const { speed = 1000, takeRatio = 0 } = numberAnimate
  const { numberbits = 0, numDo = 2, digit = 3, rounding = true } = numberFormat
  let { divider = ',', decimal = '.' } = symbolCustom

  const symbolDis = configDisplayCompatible(symbolCustom, 'symbolStatus'),
    animateDis = configDisplayCompatible(numberAnimate, 'animation', true)

  divider = symbolDis && isNaN(+divider) ? divider : ','
  decimal = symbolDis && isNaN(+decimal) ? decimal : '.'

  const dataMemo = useMemo(() => {
    const _data = conversionData(data, { value: 'number', name: 'string', prefix: 'string', suffix: 'string' })
    if (_data.length == 0) return [{ value: 0 }]
    return _data
  }, [data])

  const countupRef = useRef<any>({})
  const valueCurrent = useRef<number>(dataMemo[0].value)

  // 数据更新
  useEffect(() => {
    countupRef.current.updateTimer && clearTimeout(countupRef.current.updateTimer)
    countupRef.current.updateTimer = setTimeout(() => {
      const value = dataMemo[0].value
      countupRef.current?.update(value)
      // data改变更新 翻牌器的end值
      valueCurrent.current = value
    }, 200)
  }, [JSON.stringify(dataMemo)])

  const countUpFormatChange = useCallback(
    (val: number): string => {
      const str = formatNumber(val, numDo, divider, digit, numberbits, rounding).replace(/\./g, decimal || '.')
      const type = numColor?.colorType
      const htmlStr = str
        .split('')
        .map(v => {
          if (v === divider || v === (decimal || '.')) {
            return `<span class="count-item count-divider"><i class="${type}">${v}</i></span>`
          }
          return `<span class="count-item"><i class="${type}">${v}</i></span>`
        })
        .join('')
      return htmlStr
    },
    [refresh, numberbits, digit, numDo, rounding, divider, decimal, numColor]
  )

  const countUp = useMemo(() => {
    return {
      start: isNaN(dataMemo[0].value * takeRatio) ? 0 : dataMemo[0].value * takeRatio,
      end: isNaN(valueCurrent.current) ? 0 : valueCurrent.current,
      duration: animateDis ? speed / 1000 : 0.001,
      decimal: decimal || '.',
      decimals: rounding ? numDo : numDo + 1,
      useEasing: true,
      redraw: false,
      useGrouping: true,
      separator: divider,
      formattingFn: countUpFormatChange,
      suffix: numColor?.colorType
    }
  }, [
    animateDis,
    refresh,
    takeRatio,
    speed,
    decimal,
    rounding,
    numDo,
    divider,
    numberbits,
    digit,
    widthAdaptation,
    JSON.stringify(numColor)
  ])

  return <CountUp className='count-up' ref={countupRef} {...countUp} />
})
