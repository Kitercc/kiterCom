import React, { CSSProperties, memo, useMemo } from 'react'
import { formatNumber, getColorObj } from '../../common/util'
import { getCardContainStyle } from '../common'
import {
  defaultCurrentStyle,
  defaultHoverStyle,
  defaultIconConfig,
  defaultNameConfig,
  defaultNormalCard,
  defaultNumberConfig,
  defaultSuffixConfig
} from '../common/defaultValue'
import { CardWrapper } from '../style'
import { CardItemProps, currentNumberConfig, NameConfig, NumberConfig } from '../type'
import Icon from './Icon'

export default memo(function CardItem(props: CardItemProps) {
  const {
    currentIndex = 0,
    index,
    item,
    normalCard = defaultNormalCard,
    hoverStyle = defaultHoverStyle,
    currentStyle = defaultCurrentStyle,
    onClick
  } = props
  const {
    bgConfig = defaultNormalCard.bgConfig,
    border = defaultNormalCard.border,
    outShadow = defaultNormalCard.outShadow,
    inShadow = defaultNormalCard.inShadow,
    numberConfig = defaultNumberConfig,
    nameConfig = defaultNameConfig,
    iconConfig = defaultIconConfig
  } = normalCard

  const { numbFormat = defaultNumberConfig.numbFormat, suffixConfig = defaultSuffixConfig } = numberConfig

  const {
    display: currentDisplay = true,
    number: currentNumber = defaultCurrentStyle.number,
    name: currentName = defaultCurrentStyle.name
  } = currentStyle

  const isActive = index === currentIndex

  const normalStyleMemo = useMemo(() => {
    const _style: CSSProperties = {}
    let shoadowStr = ''
    const { color: bgColor, colorType } = getColorObj(bgConfig?.color)

    if (bgConfig?.display) {
      if (colorType === 'single') {
        _style.backgroundColor = bgColor
      } else {
        _style.backgroundImage = `linear-gradient(${bgColor})`
      }

      if (bgConfig?.imgUrl && bgConfig?.imgUrl.trim()) {
        _style.backgroundImage = `url(${bgConfig?.imgUrl})`
      }
    }

    if (border?.display) {
      _style.border = `${border.width}px solid ${border.color}`
    }

    if (outShadow?.display) {
      shoadowStr = `${outShadow.x}px ${outShadow.y}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
    }

    if (inShadow?.display) {
      shoadowStr && (shoadowStr += ',')
      shoadowStr += `${inShadow.x}px ${inShadow.y}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
    }

    if (shoadowStr) _style.boxShadow = shoadowStr

    return _style
  }, [JSON.stringify(normalCard)])

  const numbValue = useMemo(() => {
    if (isNaN(Number(item?.value))) return item?.value

    let _val = formatNumber(
      item?.value,
      numbFormat?.decimal,
      ',',
      numbFormat?.splitDigit,
      undefined,
      numbFormat?.rounding
    )

    if (Number(item.value) < 0) {
      switch (numbFormat?.negativeing) {
        case 'abs':
          break
        case 'brackets':
          _val = `(${_val})`
          break
        case 'minus':
          _val = `-${_val}`
          break
        default:
          break
      }
    }

    return _val
  }, [JSON.stringify(item), JSON.stringify(numbFormat)])

  const containStyle = useMemo(() => {
    const cssNames = {
      normalNum: 'numb-value ',
      normalSuffix: 'numb-suffix ',
      normalName: 'lcz-circular-name ',
      currentNum: 'numb-value ',
      currentSuffix: 'numb-suffix ',
      currentName: 'lcz-circular-name '
    }
    const show = {
      normalNum: true,
      normalSuffix: true,
      normalName: true,
      currentNum: true,
      currentSuffix: true,
      currentName: true
    }

    const css: { [key: string]: CSSProperties } = {
      normalNumWrapper: {},
      normalNum: {},
      normalSuffix: {},
      normalName: {},
      currentNumWrapper: {},
      currentNum: {},
      currentSuffix: {},
      currentName: {}
    }

    getCardContainStyle(css, currentNumber || ({} as currentNumberConfig), cssNames, show, 'current-num')
    getCardContainStyle(css, currentName || ({} as NameConfig), cssNames, show, 'current-name')
    getCardContainStyle(css, numberConfig || ({} as NumberConfig), cssNames, show, 'normal-num')
    getCardContainStyle(css, nameConfig || ({} as NameConfig), cssNames, show, 'normal-name')

    return { css, cssNames, show }
  }, [
    JSON.stringify(currentNumber),
    JSON.stringify(currentName),
    JSON.stringify(numberConfig),
    JSON.stringify(nameConfig)
  ])

  const displayStyle = useMemo(() => {
    const styles: { [key: string]: CSSProperties } = {
      numWrapper: containStyle.css.normalNumWrapper,
      name: containStyle.css.normalName,
      suffix: containStyle.css.normalSuffix,
      num: containStyle.css.normalNum
    }
    const show = {
      num: containStyle.show.normalNum,
      suffix: containStyle.show.normalSuffix,
      name: containStyle.show.normalName
    }
    const cssNames = {
      num: containStyle.cssNames.normalNum,
      suffix: containStyle.cssNames.normalSuffix,
      name: containStyle.cssNames.normalName
    }

    if (isActive && currentDisplay) {
      show.num = containStyle.show.currentNum
      show.name = containStyle.show.currentName
      if (!currentNumber?.currentSyncStyle) {
        show.suffix = containStyle.show.currentSuffix
        styles.numWrapper = containStyle.css.currentNumWrapper
        styles.num = containStyle.css.currentNum
        styles.suffix = containStyle.css.currentSuffix
        cssNames.num = containStyle.cssNames.currentNum
        cssNames.suffix = containStyle.cssNames.currentSuffix
      }

      if (!currentName?.nameSyncStyle) {
        styles.name = containStyle.css.currentName
        cssNames.name = containStyle.cssNames.currentName
      }
    }

    return { styles, show, cssNames }
  }, [isActive, containStyle, currentDisplay])

  function handlerClick(e) {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick(item, index)
  }

  return (
    <CardWrapper
      normalCard={normalCard}
      hoverStyle={hoverStyle}
      currentStyle={currentStyle}
      className={`lcz-circular-target-items ${currentIndex === index ? ' lcz-circular-active' : ''}`}
      data-index={index}>
      <div className='lcz-circular-wrapper' onClick={handlerClick} style={normalStyleMemo}>
        {displayStyle.show.num && (
          <div className='lcz-circular-number' style={displayStyle.styles.numWrapper}>
            <span className={displayStyle.cssNames.num} style={displayStyle.styles.num}>
              {numbValue}
            </span>
            {displayStyle.show.suffix && suffixConfig.suffixVal && (
              <span className={displayStyle.cssNames.suffix} style={displayStyle.styles.suffix}>
                {displayStyle.styles.suffix.content}
              </span>
            )}
          </div>
        )}

        {displayStyle.show.name && item?.name && (
          <span className={displayStyle.cssNames.name} style={displayStyle.styles.name}>
            {item.name}
          </span>
        )}

        {iconConfig.display && <Icon iconConfig={iconConfig} item={item} />}
      </div>
    </CardWrapper>
  )
})
