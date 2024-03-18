import React, { memo, useEffect, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { alignType } from '../common/util'
import { defaultFontConfig, defaultNumberConfig, defaultTitleConfig } from './common/defaultValue'
import { IndicatorsTrendsProps } from './type'
import { iconJson } from './common/common'
import { numberForMat } from '../LczCarouselTable/common'
import { isNumber } from 'lodash'

export default memo(function LczIndicatorsTrends(props: IndicatorsTrendsProps = {}) {
  const {
    data = [],
    horiAlign = 'left',
    vertAlign = 'top',
    titlePosition = 'top',
    titleIconSpac = 4,
    iconValSpac = 4,
    titleConfig = defaultTitleConfig,
    numberConfig = defaultNumberConfig,
    fontConfig = defaultFontConfig,
    onClick,
    onDataChange
  } = props

  const { display: numberDis = true, textStyle: numberTextStyle, formatConfig, suffixConfig } = numberConfig
  const { display: showSuffix = true } = suffixConfig || {}

  const baseValue = !isNaN(data[0]?.base) && data[0].base !== '' ? Number(data[0].base) : +numberConfig.baseValue,
    title = data[0]?.text || titleConfig.titleContent

  // hooks
  const valueMemo = useMemo(() => {
    let value = Number(data[0]?.value)
    if (isNaN(value)) value = 0

    const {
      display: formatDis = true,
      thousandth = numberConfig.thousandth || false,
      negativeing = numberConfig.negativeing || 'minus',
      numDo = 0,
      rounding = true,
      percentage = false,
      zeroFill = true
    } = formatConfig || {}

    return numberForMat(value, {
      display: formatDis,
      decollate: thousandth,
      decimal: numDo,
      round: rounding,
      percentage,
      negativeing,
      zeroFill
    })
  }, [JSON.stringify(data), JSON.stringify(formatConfig)])

  useEffect(() => {
    const param = {
      text: title,
      value: isNumber(data?.[0]?.value) || data?.[0]?.value ? data[0].value : '',
      base: baseValue
    }
    onDataChange && onDataChange(param)
  }, [JSON.stringify(data)])

  const styleMemo = useMemo(() => {
    const val = !isNaN(data[0]?.value) ? Number(data[0].value) : 0
    const { style, riseColor, declineColor, flatColor } = fontConfig
    const iconStyle = {
      color: '',
      icon: ''
    }

    if (val > baseValue) {
      iconStyle.color = riseColor
      iconStyle.icon = iconJson[style].up
    } else if (val === baseValue) {
      iconStyle.color = flatColor
      iconStyle.icon = iconJson.flat
    } else {
      iconStyle.color = declineColor
      iconStyle.icon = iconJson[style].down
    }
    return iconStyle
  }, [fontConfig, JSON.stringify(data), baseValue])

  const globalStyleMemo = useMemo(() => {
    const containerStyle: any = {}
    const titleStyle: any = {}
    const valueStyle: any = {}
    switch (titlePosition) {
      case 'top':
        containerStyle.flexDirection = 'column'
        containerStyle.alignItems = alignType[horiAlign]
        titleStyle.order = 1
        titleStyle.marginBottom = titleIconSpac + 'px'
        valueStyle.order = 2
        break
      case 'bottom':
        containerStyle.flexDirection = 'column'
        containerStyle.alignItems = alignType[horiAlign]
        titleStyle.order = 2
        titleStyle.marginTop = titleIconSpac + 'px'
        valueStyle.order = 1
        break
      case 'left':
        containerStyle.flexDirection = 'row'
        containerStyle.alignItems = 'center'
        containerStyle.justifyContent = alignType[horiAlign]
        titleStyle.order = 1
        titleStyle.marginRight = titleIconSpac + 'px'
        valueStyle.order = 2
        break
      case 'right':
        containerStyle.flexDirection = 'row'
        containerStyle.alignItems = 'center'
        containerStyle.justifyContent = alignType[horiAlign]
        titleStyle.order = 2
        titleStyle.marginLeft = titleIconSpac + 'px'
        valueStyle.order = 1
        break
    }
    return {
      containerStyle,
      titleStyle,
      valueStyle
    }
  }, [titlePosition, titleIconSpac, horiAlign, vertAlign])

  const onClickHandler = e => {
    e.stopPropagation()
    onClick &&
      onClick({
        text: title,
        value: isNumber(data?.[0]?.value) || data?.[0]?.value ? data[0].value : '',
        base: baseValue
      })
  }

  const suffixStyle = (() => {
    const { textStyle, leftOffset = 0, topOffset = 0 } = suffixConfig || {}
    const offset = `translate(${leftOffset}px,${topOffset}px)`
    return {
      ...textStyle,
      color: fontConfig.syncValueColor ? styleMemo.color : textStyle?.color,
      transform: offset
    }
  })()

  return (
    <div className='trends-wrapper'>
      <LczComCon style={{ alignItems: alignType[vertAlign] }}>
        <div className='container' style={{ ...globalStyleMemo.containerStyle }} onClick={onClickHandler}>
          {titleConfig.display && (
            <div
              className='trends-title'
              style={{
                ...titleConfig.textStyle,
                ...globalStyleMemo.titleStyle,
                whiteSpace: titleConfig.lineFeed ? 'initial' : 'nowrap'
              }}>
              {data[0]?.text || titleConfig.titleContent}
            </div>
          )}
          <div className='value-con' style={{ ...globalStyleMemo.valueStyle }}>
            <i
              className={['iconfont', `lcz-com-icon-${styleMemo.icon}`].join(' ')}
              style={{ color: styleMemo.color, fontSize: fontConfig.size }}></i>
            {numberDis && (
              <div
                className='number-con'
                style={{
                  ...numberTextStyle,
                  color: fontConfig.syncValueColor ? styleMemo.color : numberTextStyle.color,
                  marginLeft: iconValSpac
                }}>
                {valueMemo}
                {showSuffix && <span style={suffixStyle}>{suffixConfig?.suffix || numberConfig.suffix}</span>}
              </div>
            )}
          </div>
        </div>
      </LczComCon>
    </div>
  )
})
