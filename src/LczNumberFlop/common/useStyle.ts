import { CSSProperties, useMemo } from 'react'
import { getBgColorMemo, styleConfigBottom, styleConfigLeft, styleConfigRight, styleConfigTop } from '.'
import { usemMemo } from '../../common/hooks'
import { configDisplayCompatible } from '../../common/util'
import { NumberFlopProps } from '../type'
import { defalutTextStyle, fixStyleTextStyle, titleTextStyle } from './defaultVal'

export function useStyle(props: NumberFlopProps, data: any[]) {
  const {
    titleConfig = {},
    scrollCountConfig = {},
    titlePosition = 'top',
    titleDistance = 10,
    alignment = 'start'
  } = props
  const { titleStyle = titleTextStyle } = titleConfig
  const {
    suffixDistance = 0,
    prefixDistance = 0,
    prefixConfig = {},
    suffixConfig = {},
    numberConfig = {}
  } = scrollCountConfig
  const { prefixStyle = fixStyleTextStyle, verticalOffset: prefixOffset = 0 } = prefixConfig
  const { suffixStyle = fixStyleTextStyle, verticalOffset = 0 } = suffixConfig
  const {
    numberFormat = {},
    symbolCustom = {},
    widthAdaptation = false,
    textStyle = defalutTextStyle,
    sectionStyleFlag = false,
    sectionStyle = []
  } = numberConfig
  const { negativeing = 'minus' } = numberFormat
  const { plusSign, minusSign, flat } = symbolCustom
  const symbolStatus = configDisplayCompatible(symbolCustom, 'symbolStatus')

  const styledMemo = usemMemo(() => {
    const bigStyle: CSSProperties = {},
      mytitleStyle: CSSProperties = { ...titleStyle },
      countupStyle: CSSProperties = {},
      countNumberStyle: CSSProperties = {
        ...textStyle,
        flex: `${widthAdaptation ? 1 : 0} 1 0%`,
        marginRight: suffixDistance,
        color: 'transparent',
        letterSpacing: 0
      },
      prefixTextStyle: CSSProperties = { ...prefixStyle, marginRight: prefixDistance, top: prefixOffset },
      suffixTextStyle: CSSProperties = { ...suffixStyle, alignSelf: 'flex-end', top: verticalOffset }
    switch (titlePosition) {
      case 'left':
        bigStyle.flexDirection = 'row'
        bigStyle.alignItems = 'center'
        mytitleStyle.width = 'auto'
        mytitleStyle.overflow = 'visible'
        mytitleStyle.marginRight = ` ${titleDistance}px `
        bigStyle.justifyContent = `${styleConfigLeft[alignment]}`
        mytitleStyle.order = 1
        countupStyle.order = 2
        break
      case 'top':
        bigStyle.flexDirection = 'column'
        mytitleStyle.marginBottom = `${titleDistance}px`
        mytitleStyle.width = '100%'
        mytitleStyle.overflow = 'hidden'
        mytitleStyle.justifyContent = `${styleConfigTop[alignment].title}`
        countupStyle.justifyContent = `${styleConfigTop[alignment].count}`
        mytitleStyle.order = 1
        countupStyle.order = 2
        break
      case 'bottom':
        bigStyle.flexDirection = 'column'
        mytitleStyle.marginTop = titleDistance + 'px'
        mytitleStyle.width = '100%'
        mytitleStyle.overflow = 'hidden'
        mytitleStyle.justifyContent = `${styleConfigBottom[alignment].title}`
        countupStyle.justifyContent = `${styleConfigBottom[alignment].count}`
        mytitleStyle.order = 2
        countupStyle.order = 1
        break
      case 'right':
        bigStyle.flexDirection = 'row'
        bigStyle.alignItems = 'center'
        mytitleStyle.marginLeft = titleDistance + 'px'
        mytitleStyle.width = 'auto'
        mytitleStyle.overflow = 'visible'
        bigStyle.justifyContent = `${styleConfigRight[alignment]}`
        countupStyle.order = 1
        mytitleStyle.order = 2
        break
      default:
        break
    }
    if (titleStyle.italics) mytitleStyle.fontStyle = 'italic'
    if (prefixStyle.italics) prefixTextStyle.fontStyle = 'italic'
    if (suffixStyle.italics) suffixTextStyle.fontStyle = 'italic'
    if (textStyle.italics) countNumberStyle.fontStyle = 'italic'
    return { bigStyle, mytitleStyle, countupStyle, prefixTextStyle, suffixTextStyle, countNumberStyle }
  }, [
    titleDistance,
    alignment,
    titlePosition,
    titleStyle,
    prefixStyle,
    prefixDistance,
    prefixOffset,
    suffixStyle,
    verticalOffset,
    textStyle,
    widthAdaptation,
    suffixDistance
  ])

  const symbolMemo = useMemo(() => {
    const values = data[0].value
    const symbol: any = {}
    if (parseFloat(values) > 0) {
      if (!plusSign) {
        symbol.url = '+'
        symbol.type = 'text'
      } else {
        symbol.url = plusSign
        symbol.type = 'url'
      }
      if (!symbolStatus) symbol.type = null
    } else if (parseFloat(values) < 0) {
      // 符号显示值
      if (negativeing === 'minus') {
        if (!minusSign || !symbolStatus) {
          symbol.url = '-'
          symbol.type = 'text'
        } else {
          symbol.url = minusSign
          symbol.type = 'url'
        }
      } else {
        symbol.url = ''
        symbol.type = null
      }
    } else {
      if (!flat) {
        symbol.url = ''
        symbol.type = null
      } else {
        symbol.url = flat
        symbol.type = 'url'
      }
      if (!symbolStatus) symbol.type = null
    }

    return symbol
  }, [symbolStatus, plusSign, minusSign, flat, data, negativeing])

  // countup 翻牌器配置
  const numColor = useMemo(() => {
    try {
      let styleObj: any = {}
      const val: number = data[0].value
      if (sectionStyleFlag) {
        sectionStyle?.forEach(item => {
          const { min, max, colorConfig, fontSize, fontWeight } = item
          if (val >= min && val <= max) {
            styleObj = { fontSize, fontWeight }
            if (colorConfig.display) {
              styleObj = Object.assign(styleObj, getBgColorMemo(colorConfig.color))
            } else {
              styleObj = Object.assign(styleObj, getBgColorMemo(textStyle.color))
            }
          }
        })
      }
      if (!sectionStyleFlag || Object.keys(styleObj).length <= 0) {
        styleObj = {
          ...getBgColorMemo(textStyle.color),
          fontSize: textStyle.fontSize,
          fontWeight: textStyle.fontWeight
        }
      }
      return styleObj
    } catch (error) {
      console.warn(error)
      return { color: '#3d99fc', colorType: 'single', fontSize: textStyle.fontSize, fontWeight: textStyle.fontWeight }
    }
  }, [textStyle.color, sectionStyle, sectionStyleFlag, data])

  return { styledMemo, symbolMemo, numColor }
}
