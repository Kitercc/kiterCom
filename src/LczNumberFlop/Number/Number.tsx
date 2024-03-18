import React, { memo, Fragment, useState, useMemo, useEffect } from 'react'
import { NumberProps, TextStyle } from './type'
import { conversionData, formatNumber, getColorObj, configDisplayCompatible } from '../../common/util'
import { usemMemo } from '../../common/hooks'

const Number = (props: NumberProps = {}) => {
  const defalutTextStyle: TextStyle = {
    fontFamily: 'Microsoft YaHei',
    fontSize: 32,
    color: '#3D99FC',
    fontWeight: 400,
    letterSpacing: 0
  }

  const { numColor, refresh = false, scrollCountConfig = {}, data = [] } = props
  const { numberConfig = {} } = scrollCountConfig
  const {
    numberBg = {},
    numberAnimate = {},
    numberFormat = {},
    symbolCustom = {},
    textStyle = defalutTextStyle
  } = numberConfig

  const {
    display: numberDis = false,
    verMargin = 0,
    horMargin = 0,
    numBoxRadius = 0,
    numBgColor = {},
    numBoxBg = '',
    separateBg = false
  } = numberBg
  const { colorString } = numBgColor
  const { speed = 1000, takeRatio = 0 } = numberAnimate
  const { numberbits = 0, numDo = 2, digit = 3, rounding = true } = numberFormat
  let { divider = ',', decimal = '.' } = symbolCustom

  const symbolDis = configDisplayCompatible(symbolCustom, 'symbolStatus')

  divider = symbolDis && isNaN(+divider) && !!divider ? divider : ','
  decimal = symbolDis && isNaN(+decimal) && !!decimal ? decimal : '.'
  const dotArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, divider, decimal]

  const [isLoad, setload] = useState(false)
  const [nodeStyle, setNodeStyle] = useState({})
  const [height, setH] = useState(0)
  const [isRatio, setRatio] = useState(true)

  useEffect(() => {
    if (refresh) {
      if (takeRatio && takeRatio !== 1) {
        setRatio(true)
        setTimeout(() => {
          setRatio(false)
        }, 10)
      } else {
        setRatio(false)
      }
    }
  }, [takeRatio])

  const valueMemo: any = useMemo(() => {
    const _data = conversionData(data, { value: 'number', name: 'string', prefix: 'string', suffix: 'string' })
    let valueStr = '',
      val

    if (_data && _data.length > 0 && _data[0].value !== undefined && _data[0].value !== null) {
      val = _data[0].value
    }

    if (_data.length === 0) {
      val = 0
    }

    if (!isNaN(val)) {
      if (isRatio && takeRatio && takeRatio !== 1) {
        val = val * takeRatio
      }
      valueStr = formatNumber(val, numDo, divider, digit, numberbits, rounding)
    }

    valueStr = valueStr.replace(/,/g, divider)
    valueStr = valueStr.replace(/\./g, decimal || '.')
    return valueStr
  }, [data, divider, decimal, numDo, digit, isRatio, takeRatio])

  const getBgColorMemo = useMemo(() => {
    try {
      const { color: coloarVal, colorType } = getColorObj(colorString)
      if (colorType === 'gradient') {
        return { color: `linear-gradient( ${coloarVal} ) `, colorType }
      }
      return { color: coloarVal, colorType }
    } catch (error) {
      console.warn(error)
    }
    return { color: '#fff0', colorType: 'single' }
  }, [colorString])

  useEffect(() => {
    setload(true)
    const nodeArr: any = {}
    for (let i = 0; i < dotArr.length; i++) {
      const val = dotArr[i]
      const span = document.createElement('span'),
        styleds = getStyleds[val]?.itemStyle || {}

      span.textContent = String(val)
      span.style.display = 'inline-block'
      span.style.fontSize = styleds.fontSize
      span.style.lineHeight = '1'
      span.style.fontWeight = styleds.fontWeight
      numberDis && (span.style.padding = `${verMargin}px ${horMargin}px`)
      document.body.append(span)
      nodeArr[val] = { width: span.offsetWidth, height: span.offsetHeight }
      span.remove()
    }

    const _h = Math.max(...Object.values(nodeArr).map((v: any) => v.height))
    setH(_h)
    setNodeStyle(nodeArr)
  }, [JSON.stringify(dotArr)])

  const getStyleds = usemMemo(() => {
    const resolve = {}

    for (let index = 0; index < dotArr.length; index++) {
      const num = dotArr[index]
      const numDistance = textStyle.letterSpacing

      const textStyles: any = num !== divider || separateBg ? { ...textStyle } : {}
      delete textStyles.color
      delete textStyles.letterSpacing
      if ((num !== divider && num !== (decimal || '.')) || separateBg) {
        if (!numBoxBg) {
          textStyles['background'] = numberDis ? getBgColorMemo.color : 'none'
        } else {
          textStyles['backgroundImage'] = numberDis ? `url(${numBoxBg})` : 'none'
        }
      }

      const minSpeed = num === (decimal || '.') ? 0 : num === divider ? 0 : (speed || 1000) / 1000
      const minTranslateNum = num === (decimal || '.') ? 10 : num === divider ? 11 : +num
      const widthArr = Object.values(nodeStyle).map((v: any) => v.width)

      const getW = nodeStyle[num]?.width || (widthArr.length ? Math.max(...widthArr) : 'auto')

      const animateDonStyle = {
        marginRight: `${numDistance}px`,
        transition: isRatio ? 'none' : `transform ${minSpeed}s`,
        transform: height ? `translateY(${minTranslateNum * -height}px)` : '',
        width: getW
      }

      const styles = {
        domStyle: {
          ...(isLoad ? animateDonStyle : {}),
          opacity: getW === 'auto' ? 0 : 1
        },
        itemStyle: {
          ...textStyles,
          width: getW,
          borderRadius: `${numberDis ? numBoxRadius : 0}px`,
          fontSize: numColor?.fontSize + 'px',
          fontWeight: numColor?.fontWeight
        }
      }
      resolve[num] = styles
    }

    return resolve
  }, [
    dotArr,
    separateBg,
    textStyle,
    numBoxBg,
    numberDis,
    numBoxRadius,
    getBgColorMemo,
    speed,
    nodeStyle,
    numColor,
    isRatio,
    isLoad,
    height
  ])

  return (
    <Fragment>
      {valueMemo !== 'undefined' && valueMemo !== null && (
        <div
          className='number-animate'
          style={{
            height: height ? `${height}px` : 'auto',
            flex: '1 1 0%',
            lineHeight: height ? `${height}px` : 1,
            fontSize: textStyle.fontSize,
            width: 'max-content'
          }}>
          {new Array(valueMemo.length).fill(1).map((_, i) => {
            const dot = valueMemo[i],
              styleds = getStyleds[dot] || {}

            return (
              <div style={styleds.domStyle} key={i} className='number-animate-dom'>
                {new Array(12).fill(null).map((_, j) => {
                  return (
                    <span
                      className={[valueMemo[i] === divider ? 'number-animate-dot' : 'number-animate-span'].join(' ')}
                      key={j}
                      style={styleds.itemStyle}>
                      <i className={[numColor?.colorType, 'num-i'].join(' ')}>
                        {j === 10 ? decimal || '.' : j === 11 ? divider : j}
                      </i>
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </Fragment>
  )
}

export default memo(Number)
