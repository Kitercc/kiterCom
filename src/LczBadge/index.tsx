import React, { memo, useMemo, CSSProperties, useEffect } from 'react'
import LczComCon from '../common/LczComCon'
import { formatNumber } from '../common/util'
import {
  defaultFormat,
  defaultGlobal,
  defaultSuperNumber,
  defaultTextConfig,
  defaultSectionStyle
} from './common/defaultValue'
import { BadgeProps } from './type'

export default memo(function LczBadge(props: BadgeProps) {
  const { global = defaultGlobal, superNumber = defaultSuperNumber, data = [], onClick, onDataChange } = props
  const { lessThanZeroHidden = true, thumbnail } = global
  const {
    format = defaultFormat,
    bgConfig,
    textStyle = defaultTextConfig,
    sectionStyleFlag = false,
    sectionStyle = [defaultSectionStyle]
  } = superNumber

  // hooks

  const valueMemo = useMemo(() => {
    const _val: { show: boolean; val: number | string; max: boolean } = { show: true, val: 0, max: false }
    if (!data || data.length === 0) {
      _val.show = false
    } else {
      const value = +data[0].value
      if ((lessThanZeroHidden && value <= 0) || isNaN(Number(value))) {
        _val.show = false
        return _val
      } else {
        if (thumbnail?.display) {
          if (value > thumbnail.threshold) {
            _val.val = thumbnail.threshold
            _val.max = true
          } else {
            _val.val = value
          }
        } else {
          _val.val = value
        }
      }
    }

    // 数字格式化
    if (format.display && _val.show) {
      const { splitDigit = 3, decimal = 0, rounding = true, negativeing = 'minus' } = format
      _val.val = formatNumber(_val.val, decimal, ',', splitDigit, undefined, rounding)

      if (data[0].value < 0) {
        switch (negativeing) {
          case 'abs':
            break
          case 'brackets':
            _val.val = `(${_val.val})`
            break
          case 'minus':
            _val.val = `-${_val.val}`
            break
          default:
            break
        }
      }
    }
    return _val
  }, [JSON.stringify(data), JSON.stringify(global), JSON.stringify(format)])

  const styleMemo = useMemo(() => {
    const _Obj: { show: boolean; style: CSSProperties } = { show: true, style: {} }
    if (bgConfig?.display) {
      const { xOffset = 5, yOffset = 5, color = '#D24C4C', radius = 5 } = bgConfig
      _Obj.style.padding = `${yOffset}px ${xOffset}px`
      _Obj.style.backgroundColor = color
      _Obj.style.borderRadius = `${radius}px`
    }

    if (textStyle.display) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { display: _, ...otherTextStyle } = textStyle
      _Obj.style = { ..._Obj.style, ...otherTextStyle }
    } else {
      _Obj.show = false
    }

    if (sectionStyleFlag && sectionStyle && sectionStyle.length >= 1 && valueMemo.show) {
      const val: number = +data[0].value
      sectionStyle.forEach(item => {
        const { min, max, bgConfig: itemBg, text } = item
        const { display: TEXTdis, showVal, ...otherTEXT } = text
        if (val >= min && val <= max) {
          if (itemBg.display) {
            _Obj.style.backgroundColor = itemBg.color
            _Obj.style.padding = `${itemBg.yOffset}px ${itemBg.xOffset}px`
            _Obj.style.borderRadius = `${itemBg.radius}px`
          }
          if (TEXTdis) {
            _Obj.show = showVal
            _Obj.style = Object.assign(_Obj.style, otherTEXT)
          }
        }
      })
    }
    return _Obj
  }, [
    JSON.stringify(bgConfig),
    JSON.stringify(textStyle),
    JSON.stringify(valueMemo),
    sectionStyleFlag,
    JSON.stringify(sectionStyle)
  ])

  useEffect(() => {
    data?.length && onDataChange && onDataChange(data[0])
  }, [JSON.stringify(data)])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      {valueMemo.show && (
        <div
          className='lcz-badge-box'
          style={{ ...styleMemo.style }}
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            onClick && onClick(data && data[0])
          }}>
          {styleMemo.show && (
            <span className='lcz-badge-value'>
              {valueMemo.val}
              {valueMemo.max && '+'}
            </span>
          )}
        </div>
      )}
    </LczComCon>
  )
})
