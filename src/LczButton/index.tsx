import React, { memo, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { ButtonWrapper } from './style'

import { alignType, conversionData } from '../common/util'
import { ButtonProps, IconConfig } from './type'
import {
  defaultBgConfig,
  defaultCommonStyle,
  defaultHoverBg,
  defaultHoverIconConfig,
  defaultHoverStyle,
  defaultIconConfig,
  defaultTextconfig
} from './common/default'
import IconCon from '../common/IconCon'

interface IconProps {
  iconConfig: IconConfig
  style: any
}

const IconBox = (props: IconProps) => {
  const {
    size = 16,
    width = 16,
    height = 16,
    iconType = 'system', //system 系统  custom 自定义
    imageUrl = '',
    iconValue = '',
    fillColor = '#FFFFFF'
  } = props.iconConfig

  return (
    <div className='icon-box' style={{ ...props.style }}>
      {iconType === 'system' ? (
        <IconCon
          className='icon-con'
          oldFamily='lcz-system-icon'
          style={{ color: fillColor, fontSize: size }}
          iconValue={iconValue}
        />
      ) : (
        imageUrl && <div className='bg-image' style={{ width, height, backgroundImage: `url(${imageUrl})` }} />
      )}
    </div>
  )
}

export default memo(function LczButton(props: ButtonProps = {}) {
  const {
    align = 'center',
    horiOffset = 0,
    vertOffset = 0,
    radius = 2,
    commonStyle = defaultCommonStyle,
    hoverStyle = defaultHoverStyle,
    data = [],
    onClick
  } = props

  const {
    borderWidth,
    borderColor,
    bgConfig = defaultBgConfig,
    textConfig = defaultTextconfig,
    iconConfig = defaultIconConfig
  } = commonStyle

  const { display: textDis, defaultValue = '按钮', ...textStyle } = textConfig

  const { iconPosition = 'left', horiOffset: iconHori = 0, vertOffset: iconVert = 0 } = iconConfig

  const {
    display: hoverDis,
    borderColor: hoverBorderColor,
    borderWidth: hoverBorderWidth,
    hoverBgConfig = defaultHoverBg,
    hoverTextConfig = defaultTextconfig,
    hoverIconConfig = defaultHoverIconConfig
  } = hoverStyle

  const wrapperStyleMemo = useMemo(() => {
    return {
      borderRadius: `${radius}px`,
      borderColor,
      borderWidth
    }
  }, [horiOffset, vertOffset, radius, borderWidth, borderColor])

  // 图标的位置
  const positionStyle = useMemo(() => {
    const wrapperStyle: any = {}
    const valueStyle: any = {}
    const iconStyle: any = {}
    switch (iconPosition) {
      case 'top':
        wrapperStyle.flexDirection = 'column'
        wrapperStyle.justifyContent = 'center'
        wrapperStyle.alignItems = alignType[align]
        valueStyle.order = 2
        iconStyle.order = 1
        iconStyle.marginBottom = iconVert
        iconStyle.marginLeft = iconHori
        break
      case 'bottom':
        wrapperStyle.flexDirection = 'column'
        wrapperStyle.justifyContent = 'center'
        wrapperStyle.alignItems = alignType[align]
        valueStyle.order = 1
        iconStyle.order = 2
        iconStyle.marginTop = iconVert
        iconStyle.marginLeft = iconHori
        break
      case 'left':
        wrapperStyle.flexDirection = 'row'
        wrapperStyle.alignItems = 'center'
        wrapperStyle.justifyContent = alignType[align]
        valueStyle.order = 2
        iconStyle.order = 1
        iconStyle.marginTop = iconVert
        iconStyle.marginRight = -iconHori
        break
      case 'right':
        wrapperStyle.flexDirection = 'row'
        wrapperStyle.alignItems = 'center'
        wrapperStyle.justifyContent = alignType[align]
        valueStyle.order = 1
        iconStyle.order = 2
        iconStyle.marginTop = iconVert
        iconStyle.marginLeft = iconHori
        break
    }
    return { wrapperStyle, iconStyle, valueStyle }
  }, [align, iconPosition, iconVert, iconHori])

  const valueMemo = useMemo(() => {
    if (data && data[0] && data[0].value) {
      const _conversionData = conversionData(data, {
        value: 'string'
      })

      return _conversionData[0].value
    }
    return defaultValue
  }, [data, defaultValue])

  const handleClick = (e: any) => {
    e.stopPropagation()
    onClick && onClick({ value: valueMemo })
  }

  return (
    <LczComCon>
      <ButtonWrapper
        bgConfig={bgConfig}
        hoverDis={hoverDis}
        hoverBorderColor={hoverBorderColor}
        hoverBorderWidth={hoverBorderWidth}
        hoverBgConfig={hoverBgConfig}
        hoverTextConfig={hoverTextConfig}
        hoverIconConfig={hoverIconConfig}
        iconPosition={iconPosition}
        className='lcz-button-wrapper'
        style={wrapperStyleMemo}
        onClick={handleClick}>
        <div
          className='lcz-btn-container'
          style={{ ...positionStyle.wrapperStyle, transform: `translate(${horiOffset}px ,${vertOffset}px )` }}>
          {iconConfig?.display && <IconBox iconConfig={iconConfig} style={positionStyle.iconStyle} />}
          {textDis && (
            <span className='value' style={{ ...textStyle, ...positionStyle.valueStyle }}>
              {valueMemo}
            </span>
          )}
        </div>
      </ButtonWrapper>
    </LczComCon>
  )
})
