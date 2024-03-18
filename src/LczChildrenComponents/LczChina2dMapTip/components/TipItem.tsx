import React, { memo, useMemo, CSSProperties } from 'react'
import { LczIndicatorsTrends } from '../../..'
import { analysisExpression } from '../../../common/util'
import { numberForMat } from '../../../LczCarouselTable/common'
import { LineContent, Latout, ValueStyle } from '../../../LczChina2dMap/type/child'
import { defaultFormat, defaultSuffix } from '../../../LczIndicatorsTrends/common/defaultValue'
import { IndicatorsTrendsProps, TextStyle } from '../../../LczIndicatorsTrends/type'
import { defaultTextStyle } from '../common/deaultValue'

interface TipItemProps {
  id: string
  expPathArr: string[]
  item: LineContent
  itemData: any
}

type ContainProps = {
  id: string
  style: CSSProperties
  item: LineContent
  itemData: any
  expPathArr: string[]
}

const Contain = memo(({ id, style, item, itemData, expPathArr }: ContainProps) => {
  const { fieldName, valueStyle = {} } = item
  const {
    valueType,
    textStyle = defaultTextStyle,
    format = defaultFormat,
    stateStyles = [],
    suffixConfig = defaultSuffix
  } = valueStyle as ValueStyle

  const tableValue = itemData[fieldName]

  const Suffix = (() => {
    let _wrapper: React.ReactElement = <></>
    if (suffixConfig.display && suffixConfig.suffix) {
      const { leftOffset = 0, topOffset = 0, suffix = '', textStyle } = suffixConfig

      const offset = `translate(${leftOffset}px,${topOffset}px)`
      _wrapper = (
        <span className='lcz-tip-suffix' style={{ ...textStyle, transform: offset }}>
          {suffix}
        </span>
      )
    }
    return _wrapper
  })()

  switch (valueType) {
    case 'text':
      return (
        <span className='lcz-tip-value' style={{ ...style, ...textStyle }}>
          {tableValue}
          {Suffix}
        </span>
      )
    case 'number': {
      if (isNaN(tableValue)) {
        return (
          <span className='lcz-tip-value' style={{ ...style, ...textStyle }}>
            {tableValue}
            {Suffix}
          </span>
        )
      }

      const { intervalStyle = false, styleInterval = [] } = valueStyle as ValueStyle
      const interStyle: CSSProperties = {}
      if (intervalStyle && styleInterval.length > 0) {
        const _style = styleInterval.find(v => v.max >= tableValue && v.min <= tableValue)
        if (_style) {
          interStyle.color = _style.color
          interStyle.fontSize = _style.fontSize
          interStyle.fontWeight = _style.fontWeight
        }
      }
      const {
        display: formatDis = true,
        thousandth = false,
        negativeing = 'minus',
        numDo = 0,
        rounding = true,
        percentage = false
      } = format
      const val = numberForMat(tableValue, {
        display: formatDis,
        decollate: thousandth,
        decimal: numDo,
        round: rounding,
        percentage,
        negativeing
      })

      return (
        <span className='lcz-tip-value' style={{ ...textStyle, ...style, ...interStyle }}>
          {val}
          {Suffix}
        </span>
      )
    }
    case 'index': {
      if (isNaN(tableValue)) {
        return (
          <span className='lcz-tip-value' style={{ ...style, ...textStyle }}>
            {tableValue}
            {Suffix}
          </span>
        )
      }

      const { showValue = true, iconValueSpace, fontConfig, baseValue } = valueStyle as ValueStyle

      const base = analysisExpression(baseValue, itemData, id, { name: 'valueStyle.baseValue', pathArr: expPathArr })

      const _indicatorsTrendsConfig: IndicatorsTrendsProps = {
        iconValSpac: iconValueSpace,
        fontConfig,
        numberConfig: {
          display: showValue,
          baseValue: base,
          textStyle: textStyle as TextStyle,
          formatConfig: format,
          suffixConfig
        }
      }
      const data = [
        {
          value: tableValue,
          base: base
        }
      ]
      return (
        <div style={style}>
          <LczIndicatorsTrends {..._indicatorsTrendsConfig} data={data} />
        </div>
      )
    }
    case 'state': {
      let _style: CSSProperties = textStyle
      const find = stateStyles.find(v => v.stateVal !== '' && v.stateVal == tableValue)
      find && (_style = find?.textStyle || {})
      return (
        <span className='lcz-tip-value' style={{ ...style, ..._style }}>
          {tableValue}
          {Suffix}
        </span>
      )
    }

    default:
      break
  }

  return <span style={{ ...style, ...textStyle }}>{itemData[fieldName]}</span>
})

Contain.displayName = 'Contain'

export default memo(function TipItem({ id, expPathArr, item, itemData }: TipItemProps) {
  const { fieldName, title, latout = {}, position, titleStyle, valueStyle } = item
  const {
    arrangement = 'row',
    lineHeight = '',
    lineWidth = '',
    horizontal = 'flex-start',
    vertical = 'flex-start',
    contentOverflow = 'show'
  } = latout as Latout

  const styleMemo = useMemo(() => {
    const _w: CSSProperties = { left: position?.x, top: position?.y }
    const _v: CSSProperties = {}
    _w.flexDirection = arrangement
    _w.alignItems = arrangement === 'row' ? vertical : horizontal
    _w.justifyContent = arrangement === 'row' ? horizontal : vertical
    _w.width = lineWidth !== null && !isNaN(+lineWidth) ? lineWidth + 'px' : 'initial'
    _w.height = lineHeight !== null && !isNaN(+lineHeight) ? lineHeight + 'px' : 'initial'
    _v.transform =
      arrangement === 'row' && horizontal === 'space-between' ? 'none' : `translateX(${valueStyle?.leftOffset}px)`

    switch (contentOverflow) {
      case 'show': {
        _w.whiteSpace = 'nowrap'
        break
      }
      case 'lineFeed': {
        _w.wordBreak = 'break-all'
        break
      }
    }

    return { _w, _v }
  }, [JSON.stringify(position), JSON.stringify(latout), valueStyle?.leftOffset])

  return (
    <li style={styleMemo._w}>
      {title && <span style={{ ...titleStyle, flexShrink: 0 }}>{title}</span>}
      {fieldName && itemData[fieldName] !== undefined && itemData[fieldName] !== null && (
        <Contain itemData={itemData} id={id} expPathArr={expPathArr} style={styleMemo._v} item={item} />
      )}
    </li>
  )
})
