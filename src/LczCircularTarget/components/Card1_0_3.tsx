import React, { CSSProperties, memo, useMemo } from 'react'
import { colorFunc, formatNumber, getColorObj } from '../../common/util'
import {
  defaultCurrentStyle,
  defaultHoverStyle,
  defaultIconConfig,
  defaultNameConfig,
  defaultNormalCard,
  defaultNumberConfig,
  defaultSuffixConfig
} from '../common/defaultValue'
import { CardWrapper1_0_3 } from '../style'
import { CardItemProps } from '../type'
import Icon from './Icon'

export default memo(function CardItem1_0_3(props: CardItemProps) {
  const {
    currentIndex,
    index,
    item,
    normalCard = defaultNormalCard,
    animate,
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

  const {
    textStyle: numberTextStyle,
    numbFormat = defaultNumberConfig.numbFormat,
    suffixConfig = defaultSuffixConfig
  } = numberConfig

  const { display: suffixDis, suffixVal = '/单位', interval = 2, color: suffixColor, ...suffixStyle } = suffixConfig

  const {
    number: currentNumber = defaultCurrentStyle.number,
    name: currentName = defaultCurrentStyle.name
  } = currentStyle

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
    if (!item?.value) return null

    let _val = formatNumber(
      item?.value,
      numbFormat?.decimal,
      ',',
      numbFormat?.splitDigit,
      undefined,
      numbFormat?.rounding
    )

    if (item.value < 0) {
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

  const activeContainStyle = useMemo(() => {
    const _obj: any = {
      num: null,
      suffix: null,
      name: null
    }

    if (index !== currentIndex) return _obj

    if (currentNumber?.display) {
      _obj.num = { color: colorFunc(currentNumber.color), fontWeight: currentNumber.fontWeight }
      if (currentNumber.suffix.display) {
        _obj.suffix = { color: colorFunc(currentNumber.suffix.color), fontWeight: currentNumber.suffix.fontWeight }
      }
    }

    if (currentName?.display) {
      _obj.name = { color: colorFunc(currentName.color), fontWeight: currentName.fontWeight }
    }

    return _obj
  }, [JSON.stringify(currentNumber), JSON.stringify(currentName), index, currentIndex])

  function handlerClick(e) {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick(item, index)
  }

  return (
    <CardWrapper1_0_3
      item={item}
      index={index}
      currentIndex={currentIndex}
      animate={animate}
      normalCard={normalCard}
      key={index}
      numberColorMemo={colorFunc(numberTextStyle?.color)}
      suffixColor={colorFunc(suffixColor)}
      nameColor={colorFunc(nameConfig.textStyle?.color)}
      numberConfig={numberConfig}
      nameConfig={nameConfig}
      hoverStyle={hoverStyle}
      currentStyle={currentStyle}
      activeContainStyle={activeContainStyle}
      className={`lcz-circular-target-items ${currentIndex === index ? ' lcz-circular-active' : ''}`}
      data-index={index}>
      <div className='lcz-circular-wrapper' onClick={handlerClick} style={normalStyleMemo}>
        {numberConfig?.display && numbValue && (
          <div className='lcz-circular-number' style={numberTextStyle}>
            <span
              className={[
                'numb-value',
                currentIndex !== index || !activeContainStyle.num
                  ? colorFunc(numberTextStyle?.color).colorType
                  : 'current-' + activeContainStyle.num.color.colorType
              ].join(' ')}>
              {numbValue}
            </span>
            {suffixDis && (
              <span
                className={[
                  'numb-suffix',
                  currentIndex !== index || !activeContainStyle.suffix
                    ? colorFunc(suffixColor).colorType
                    : 'current-' + activeContainStyle.suffix.color.colorType
                ].join(' ')}
                style={{ ...suffixStyle, paddingLeft: interval }}>
                {suffixVal}
              </span>
            )}
          </div>
        )}

        {nameConfig.display && item?.name && (
          <span
            className={[
              'lcz-circular-name',
              currentIndex !== index || !activeContainStyle.name
                ? colorFunc(nameConfig.textStyle?.color).colorType
                : 'current-' + activeContainStyle.name.color.colorType
            ].join(' ')}
            style={{ ...nameConfig.textStyle }}>
            {item.name}
          </span>
        )}

        {iconConfig.display && <Icon iconConfig={iconConfig} item={item} />}
      </div>
    </CardWrapper1_0_3>
  )
})
