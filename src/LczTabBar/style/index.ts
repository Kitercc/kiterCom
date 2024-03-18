/* eslint-disable indent */
import styled, { CSSObject } from 'styled-components'
import { configDisplayCompatible } from '../../common/util'
import { getTextColor } from '../common'
import {
  defaultFocusBorderStyle,
  defaultFocusHoverStyle,
  defaultFocusStyleConfig,
  defaultOrdHoverStyle,
  defaultOrdStyleConfig,
  defaultOrdTextConfig,
  defaultTabSize,
  ordBorderStyleDefault
} from '../common/defaultVal'
import {
  FocusStyleConfog,
  GlideLine,
  OrdStyleConfig,
  TextStyle,
  Color,
  GlobalConfig,
  IconStyleSeries,
  IconConfig,
  DiscountLineConfig
} from '../type'

interface TabStyleProps {
  globalConfig: GlobalConfig
  focusStyleConfig: FocusStyleConfog
  ordStyleConfig: OrdStyleConfig
  focusTextConfig: TextStyle
  len: number
  arrangement: string
  iconConfig: IconConfig
  glideLine: GlideLine
  discountLine: DiscountLineConfig
  itemBgcolorMemo: { ordBgStyle: string; hoverBgStyle: string; focusBgColor: string; focusHoverBgColor: string }
  itemTextColorMemo: {
    ordColor?: Color
    ordHoverColor?: Color
    focusColor?: Color
    focusHoverColor?: Color
  }
  focusShadow: string
}

export const TabsWrapper = styled.div<TabStyleProps>`
  display: ${props => (props.arrangement === 'horizontal' ? 'flex' : 'inline-block')};
  width: 100%;
  height: ${props => (props.globalConfig.tabType === 'multi' ? 'auto' : '100%')};
  overflow: ${props => (props.globalConfig.tabType === 'multi' ? 'initial' : 'hidden')};
  background-color: ${props => props.globalConfig.tabBgColor};

  .lcz-com-con {
    overflow: ${props => (props.globalConfig.tabType === 'multi' ? 'initial' : 'hidden')};
  }

  .wrapper-box {
    width: ${({ globalConfig, arrangement }) =>
      globalConfig.tabType === 'roll' && arrangement === 'horizontal' ? 'fit-content' : '100%'};
    height: ${({ globalConfig, arrangement }) =>
      globalConfig.tabType === 'roll' && arrangement === 'vertical' ? 'initial' : '100%'};
    flex: ${props => getWrapperFlex(props)};
    flex-direction: ${({ arrangement, globalConfig }) =>
      arrangement === 'vertical' && globalConfig.tabType !== 'multi' ? 'column' : 'row'};
    overflow: ${props => (props.globalConfig.tabType === 'ord' ? 'hidden' : 'initial')};
    justify-content: ${props => (props.globalConfig.tabType === 'ord' ? 'space-between' : 'initial')};
    flex-wrap: ${props => (props.globalConfig.tabType === 'multi' ? 'wrap' : 'nowrap')};
  }

  .tabs-items {
    flex-shrink: ${props => (props.globalConfig.tabType === 'ord' ? '1' : '0')};
    margin: ${({ globalConfig, arrangement }) =>
      `0 ${globalConfig.tabType !== 'multi' && arrangement === 'vertical' ? 0 : globalConfig.spacing}px 
        ${globalConfig.tabType !== 'multi' && arrangement === 'horizontal' ? 0 : globalConfig.rowSpacing}px 0`};
    width: ${props => getWidth(props)};
    height: ${props => getHeight(props)};
    font-family: ${props => getStyle(props, 'ord', 'fontFamily')};
    font-size: ${props => getStyle(props, 'ord', 'fontSize')}px;
    font-weight: ${props => getStyle(props, 'ord', 'fontWeight')};
    padding: ${props => getPadding(props)};
    background: ${props => props.itemBgcolorMemo.ordBgStyle};
    border: ${props => getStyle(props, 'ord', 'border')};
    border-radius: ${props => getStyle(props, 'ord', 'radius')}px;
    word-break: ${props => getTabsItemwhite(props)};

    ${props => gettabalignStyle(props)}

    .tabs-value {
      display: flex;
      flex-direction: column;
      align-items: ${props => textAlign[props.globalConfig.textStyle?.alignType || 'center']};
    }
    .wrap-item {
      white-space: ${props => getWrapItemWhiteSpace(props)};
      text-align: center;
      &.single {
        color: ${props => props.itemTextColorMemo.ordColor?.color};
      }

      &.gradient {
        background: ${props => props.itemTextColorMemo.ordColor?.color};
      }
    }

    &:hover {
      font-family: ${props => getStyle(props, 'ordHover', 'fontFamily')} !important;
      font-size: ${props => getStyle(props, 'ordHover', 'fontSize')}px;
      font-weight: ${props => getStyle(props, 'ordHover', 'fontWeight')};

      background: ${({ ordStyleConfig, itemBgcolorMemo }) =>
        configDisplayCompatible(ordStyleConfig.ordHoverStyle, 'ordHoverStatus') && itemBgcolorMemo.hoverBgStyle};
      border: ${props => getStyle(props, 'ordHover', 'border')};

      .wrap-item {
        &.single {
          color: ${props => getStyle(props, 'ordHover', 'color')};
        }

        &.gradient {
          background: ${props => getStyle(props, 'ordHover', 'color')};
        }
      }
    }

    &.tabs-action {
      background: ${props => props.itemBgcolorMemo.focusBgColor};
      border: ${props => getStyle(props, 'focus', 'border')};
      border-radius: ${props => getStyle(props, 'focus', 'radius')}px;
      font-size: ${props => props.focusTextConfig.fontSize}px;
      font-weight: ${props => props.focusTextConfig.fontWeight};
      box-shadow: ${props => props.focusShadow} !important;
      .wrap-item {
        &.single {
          color: ${props => props.itemTextColorMemo.focusColor?.color};
        }

        &.gradient {
          background: ${props => props.itemTextColorMemo.focusColor?.color};
        }
      }

      &:hover {
        background: ${props => getStyle(props, 'focusHover', 'background')};
        border: ${props => getStyle(props, 'focusHover', 'border')};
        font-size: ${props => getStyle(props, 'focusHover', 'fontSize')}px;
        font-weight: ${props => getStyle(props, 'focusHover', 'fontWeight')};

        .wrap-item {
          &.single {
            color: ${props => getStyle(props, 'focusHover', 'color')};
          }

          &.gradient {
            background: ${props => getStyle(props, 'focusHover', 'color')};
          }
        }
      }

      &::after {
        display: ${props => (props.glideLine.display ? 'inline-block' : 'none')};
        height: ${props => props.glideLine.width}px;
        background: ${props => props.glideLine.bgColor};
      }
    }
  }
`

function getWrapItemWhiteSpace(config: TabStyleProps) {
  const discountLine = config.discountLine,
    discountLineDis = configDisplayCompatible(discountLine, 'status'),
    discountLineType = discountLine.selfType || discountLine.noSelfType
  if (!discountLineDis) return 'nowrap'

  if (config.globalConfig.tabType === 'ord' && discountLineType === 'widthAdaption') return 'initial'

  if (
    ['roll', 'multi'].includes(config.globalConfig.tabType || '') &&
    !config.globalConfig.tabSize?.selfAdaption &&
    discountLineType === 'widthAdaption'
  ) {
    return 'initial'
  }
  return 'nowrap'
}

function gettabalignStyle(config: TabStyleProps) {
  const { iconConfig, globalConfig } = config,
    alignType = globalConfig.textStyle?.alignType || 'center',
    verticalType = globalConfig.textStyle?.verticalType || 'center',
    style: CSSObject = {}

  switch (iconConfig.iconPosition) {
    case 'top':
    case 'bottom': {
      style.flexDirection = 'column'
      style.alignItems = textAlign[alignType]
      style.justifyContent = textAlign[verticalType]
      break
    }

    case 'left':
    case 'right': {
      style.flexDirection = 'row'
      style.alignItems = textAlign[verticalType]
      style.justifyContent = textAlign[alignType]
      break
    }
  }

  return style
}

function getStyle(props: TabStyleProps, func = 'ord', type = '') {
  const {
    focusStyleConfig = defaultFocusStyleConfig,
    itemTextColorMemo,
    ordStyleConfig = defaultOrdStyleConfig
  } = props
  const {
    ordTextConfig = defaultOrdTextConfig,
    ordBorderStyle = ordBorderStyleDefault,
    ordHoverStyle = defaultOrdHoverStyle
  } = ordStyleConfig
  const { focusHoverStyle = defaultFocusHoverStyle, focusBorderStyle = defaultFocusBorderStyle } = focusStyleConfig
  const {
    focusTextHover = defaultOrdTextConfig,
    focusHoverBorderColor = 'rgba(61, 153, 252)',
    focusHoverBorderWidth = 2
  } = focusHoverStyle

  if (func === 'focusHover') {
    const focusDis = configDisplayCompatible(focusHoverStyle, 'focusStatus')
    if (!focusDis) return null
    if (type === 'background') return props.itemBgcolorMemo.focusHoverBgColor

    if (type === 'border') return `${focusHoverBorderWidth}px solid ${focusHoverBorderColor}`

    const focusTextHoverDis = configDisplayCompatible(focusTextHover, 'hoverStatus')

    if (type === 'fontSize' || type === 'fontWeight') return focusTextHoverDis ? focusTextHover[type] : null

    if (type === 'color') return focusTextHoverDis ? itemTextColorMemo.focusHoverColor?.color : null
  }

  if (func === 'focus') {
    const { focusBorderColor = 'rgba(61, 153, 252)', focusBorderWidth = 1, focusBorderRadius = 0 } = focusBorderStyle,
      focusBorderDis = configDisplayCompatible(focusBorderStyle, 'borderd')
    if (type === 'border') {
      return focusBorderDis ? `${focusBorderWidth}px solid ${focusBorderColor}` : null
    }

    if (type === 'radius') {
      return focusBorderDis ? focusBorderRadius : null
    }
  }

  if (func === 'ord') {
    const { borderColor = '#3F464E', borderWidth = 1, borderRadius = 0 } = ordBorderStyle,
      hoverBorderDis = configDisplayCompatible(ordBorderStyle, 'borderd')
    if (type === 'fontFamily' || type === 'fontSize' || type === 'fontWeight') {
      return ordTextConfig[type]
    }

    if (type === 'border') {
      return hoverBorderDis ? `${borderWidth}px solid ${borderColor}` : 'none'
    }

    if (type === 'radius') {
      return hoverBorderDis ? borderRadius : 0
    }
  }

  if (func === 'ordHover') {
    const { ordTextHover, HoverborderColor, HoverborderWidth } = ordHoverStyle,
      ordHoverDis = configDisplayCompatible(ordHoverStyle, 'ordHoverStatus'),
      ordTextHoverDis = configDisplayCompatible(ordTextHover, 'hoverStatus')

    if (type === 'fontFamily' || type === 'fontSize' || type === 'fontWeight') {
      return ordHoverDis && ordTextHoverDis ? ordTextHover?.[type] : null
    }
    if (type === 'border') {
      return ordHoverDis ? `${HoverborderWidth}px solid ${HoverborderColor}` : null
    }

    if (type === 'color') {
      return ordHoverDis && ordTextHoverDis ? itemTextColorMemo.ordHoverColor?.color : null
    }
  }
}

function getWidth(props: TabStyleProps) {
  const { globalConfig, arrangement, len } = props
  const { tabSize = defaultTabSize } = globalConfig
  const { rollWidthOrHeight = 100, selfAdaption = false } = tabSize
  if (globalConfig.tabType === 'multi' && selfAdaption) return 'fit-content'
  if (globalConfig.tabType === 'multi' && !selfAdaption) return `${rollWidthOrHeight}px`
  if (arrangement === 'vertical' && globalConfig.tabType === 'ord') return '100%'
  if (globalConfig.tabType === 'ord') {
    return `calc(${100 / len}% - ${globalConfig.spacing}px)`
  }
  if (props.arrangement === 'vertical' && globalConfig.tabType === 'roll') return '100%'

  if (selfAdaption && globalConfig.tabType === 'roll') {
    return 'fit-content'
  }
  return `${rollWidthOrHeight}px`
}

function getHeight(props: TabStyleProps) {
  const { globalConfig } = props
  const { tabSize = defaultTabSize } = globalConfig
  const { rollWidthOrHeight = 100, multiH = 40, selfAdaption = false } = tabSize
  if (globalConfig.tabType === 'multi' && selfAdaption) return `${multiH}px`
  if (globalConfig.tabType === 'multi' && !selfAdaption) return `${multiH}px`
  if (props.arrangement === 'horizontal' && (globalConfig.tabType === 'roll' || globalConfig.tabType === 'ord'))
    return '100%'
  if (selfAdaption && globalConfig.tabType === 'roll') return 'fit-content'
  if (props.arrangement === 'vertical' && globalConfig.tabType === 'roll') return `${rollWidthOrHeight}px`
  if (globalConfig.tabType === 'ord') {
    return `calc(${100 / props.len}% - ${globalConfig.spacing}px)`
  }
  if (!selfAdaption && globalConfig.tabType === 'roll') {
    return `${rollWidthOrHeight}px`
  }
  return selfAdaption ? `${rollWidthOrHeight}px` : 'auto'
}

function getPadding(props: TabStyleProps) {
  const { globalConfig, ordStyleConfig = defaultOrdStyleConfig } = props
  const { ordTextConfig = defaultOrdTextConfig } = ordStyleConfig
  const { tabSize = defaultTabSize } = globalConfig
  const { selfAdaption = false, contentSpacing = 10 } = tabSize
  if (globalConfig.tabType !== 'ord' && selfAdaption) {
    switch (globalConfig.tabType) {
      case 'roll':
        if (props.arrangement === 'horizontal') {
          return `0px ${contentSpacing}px`
        } else {
          return `${contentSpacing}px 0px`
        }
      case 'multi':
        return `0px ${contentSpacing}px`
    }
  }
  return `${(ordTextConfig.fontSize || 0) / 4}px ${(ordTextConfig.fontSize || 0) / 4}px`
}

function getTabsItemwhite({ discountLine, globalConfig }: TabStyleProps) {
  const discountLineDis = configDisplayCompatible(discountLine, 'status')
  if (globalConfig?.tabSize?.selfAdaption || !discountLineDis) {
    return 'keep-all'
  } else {
    return 'break-all'
  }
}

function getWrapperFlex(props: TabStyleProps) {
  const { globalConfig } = props
  if (globalConfig.tabType === 'multi') return 'auto'
  if (globalConfig.tabType === 'ord') {
    return '1'
  }
  return '1 0 auto'
}

const textAlign = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  top: 'flex-start',
  bottom: 'flex-end'
}

interface TabBarItemIconProps {
  findIcon?: IconStyleSeries
  iconType: 'system' | 'custom'
}

export const TabBarItemIconWrapper = styled.div<TabBarItemIconProps>`
  .tabs-icon-custom {
    background-image: ${({ findIcon }) => `url(${findIcon?.customNormal?.imgUrl})`};
    display: ${props => getCustomDis(props, 'customNormal')};
  }

  .tabs-icon-custom-hover {
    background-image: ${props => getItemIconStyle(props, 'customHover')};
    display: ${props => getCustomDis(props, 'customHover')};
  }

  .tabs-icon-custom-focus {
    background-image: ${props => getItemIconStyle(props, 'customFocus')};
    display: ${props => getCustomDis(props, 'customFocus')};
  }

  .tabs-icon-custom-focus-hover {
    background-image: ${props => getItemIconStyle(props, 'customFocusHover')};
    display: ${props => getCustomDis(props, 'customFocusHover')};
  }

  .tabs-icon-system {
    background: ${({ findIcon }) => getTextColor(findIcon?.systemNormal?.color).color};
  }

  .tabs-icon-system-hover {
    background: ${props => getItemIconStyle(props, 'systemHover')};
  }

  .tabs-icon-system-focus {
    background: ${props => getItemIconStyle(props, 'systemFocus')};
  }

  .tabs-icon-system-focus-hover {
    background: ${props => getItemIconStyle(props, 'systemFocusHover')};
  }
`

function getCustomDis(props: TabBarItemIconProps, type) {
  const { findIcon } = props
  return (findIcon?.[type]?.display || type === 'customNormal') && findIcon?.[type]?.imgUrl ? 'block' : 'none'
}

function getItemIconStyle(props: TabBarItemIconProps, type) {
  const { findIcon, iconType } = props
  switch (iconType) {
    case 'system':
      if (type && findIcon?.[type]?.display) return getTextColor(findIcon?.[type]?.color).color
      break
    case 'custom': {
      if (type && findIcon?.[type]?.display && findIcon?.[type]?.imgUrl) return `url(${findIcon?.[type]?.imgUrl})`
      break
    }
  }
}

type ArrowWrapperProps = {
  size: number
  imgWidth: number
  imgHeight: number
}

export const ArrowWrapper = styled.div<ArrowWrapperProps>`
  position: absolute;
  z-index: 99;
  cursor: pointer;
  span {
    font-size: ${props => props.size}px;
  }

  span.gradient {
    z-index: 9;
  }

  img {
    width: ${props => props.imgWidth}px;
    height: ${props => props.imgHeight}px;
  }
`
