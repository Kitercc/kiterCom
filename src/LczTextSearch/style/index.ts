/* eslint-disable indent */
import styled, { CSSObject } from 'styled-components'
import { OptionsPanel, TextSearchProps, TextStyle } from '../type'

import { setScroll } from '../../LczColumnTable/style/styled'

interface SearchWrapperProps extends TextSearchProps {
  placeTextStyle: TextStyle
  bgColorMemo: string
  style: any
}

function getShadow(props: SearchWrapperProps) {
  const { outShadow, inShadow } = props
  let _out_value = ''
  let _in_value = ''
  if (outShadow?.display) {
    _out_value = `${outShadow.xOffset}px ${outShadow.yOffset}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
  }

  if (inShadow?.display) {
    _in_value = `${inShadow.xOffset}px ${inShadow.yOffset}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
  }
  if (_out_value && _in_value) {
    return `${_out_value},${_in_value}`
  }
  return _out_value || _in_value
}

function getPlaceOffset(props: SearchWrapperProps) {
  const { placeTextStyle, style } = props

  if (placeTextStyle.fontSize === style.fontSize) return 0
  return placeTextStyle.fontSize > style.fontSize
    ? (placeTextStyle.fontSize - style.fontSize) / 4
    : (placeTextStyle.fontSize - style.fontSize) / 2
}

export const SearchWrapper = styled.div<SearchWrapperProps>`
  .ant-input-affix-wrapper {
    border-radius: ${props => props.radius}px;
    padding: ${props =>
      `${props.padding?.top}px ${props.padding?.right}px ${props.padding?.bottom}px ${props.padding?.left}px`};
    background: ${props => props.bgColorMemo};
    border: ${props =>
      props.borderConfig?.display ? `${props.borderConfig.width}px solid ${props.borderConfig.color}` : 'none'};
    flex-direction: ${props => (props.searchIcon?.position == 'left' ? 'row' : 'row-reverse')};
    box-shadow: ${props => getShadow(props)};
    &:hover {
      border: ${props =>
        props.borderConfig?.display ? `${props.borderConfig.width}px solid ${props.borderConfig.color}` : 'none'};
    }

    &.ant-input-affix-wrapper-focused {
      border-color: ${props => props.borderConfig?.focusColor} !important;
    }
    .ant-input-prefix {
      display: ${props => (props.searchIcon?.display ? 'flex' : 'none')};
      margin-right: ${props => (props.searchIcon?.position == 'left' ? props.searchIcon.speed : 0)}px;
      margin-left: ${props => (props.searchIcon?.position == 'right' ? props.searchIcon.speed : 0)}px;
      order: ${props => (props.searchIcon?.position == 'left' ? -1 : -2)};
    }
    .ant-input-suffix {
      order: ${props => (props.searchIcon?.position == 'left' ? 1 : -1)};
      .ant-input-clear-icon {
        display: ${props => (props.emptyIcon?.display ? '' : 'none')};
        /* display: none; */
        color: ${props => props.emptyIcon?.color};
        font-size: ${props => props.emptyIcon?.size + 'px'};
      }
    }

    .ant-input {
      ::-webkit-input-placeholder {
        color: ${props => props.placeTextStyle.color};
        font-size: ${props => props.placeTextStyle.fontSize}px;
        font-family: ${props => props.placeTextStyle.fontFamily};
        letter-spacing: ${props => props.placeTextStyle.letterSpacing}px;
        font-weight: ${props => props.placeTextStyle.fontWeight};
        transform: ${props => `translateY(${getPlaceOffset(props)}px)`};
      }
      :-moz-placeholder {
        color: ${props => props.placeTextStyle.color};
        font-size: ${props => props.placeTextStyle.fontSize}px;
        font-family: ${props => props.placeTextStyle.fontFamily};
        letter-spacing: ${props => props.placeTextStyle.letterSpacing}px;
        font-weight: ${props => props.placeTextStyle.fontWeight};
        transform: ${props => `translateY(${getPlaceOffset(props)}px)`};
      }
      ::-moz-placeholder {
        color: ${props => props.placeTextStyle.color};
        font-size: ${props => props.placeTextStyle.fontSize}px;
        font-family: ${props => props.placeTextStyle.fontFamily};
        letter-spacing: ${props => props.placeTextStyle.letterSpacing}px;
        font-weight: ${props => props.placeTextStyle.fontWeight};
        transform: ${props => `translateY(${getPlaceOffset(props)}px)`};
      }
      :-ms-input-placeholder {
        color: ${props => props.placeTextStyle.color};
        font-size: ${props => props.placeTextStyle.fontSize}px;
        font-family: ${props => props.placeTextStyle.fontFamily};
        letter-spacing: ${props => props.placeTextStyle.letterSpacing}px;
        font-weight: ${props => props.placeTextStyle.fontWeight};
        transform: ${props => `translateY(${getPlaceOffset(props)}px)`};
      }
    }
  }
`

interface SearchUlProps {
  optionsPanel: OptionsPanel
  h: number
}

function getSearchPanelBg(config: OptionsPanel) {
  const { bgConfig } = config,
    style: CSSObject = {}

  if (bgConfig.display) {
    style.backgroundColor = bgConfig.bgColor
    style.backgroundImage = `url(${bgConfig.img})`
    style.backgroundSize = '100% 100%'
    style.backgroundRepeat = 'no-repeat'
  }

  return style
}

function getSearchPanelBorder(config: OptionsPanel) {
  const { borderConfig } = config,
    style: CSSObject = {}

  if (borderConfig.display) {
    style.borderWidth = borderConfig.width
    style.borderColor = borderConfig.color
    style.borderStyle = 'solid'
  }
  return style
}

function getSearchPanelPadding(config: OptionsPanel) {
  const { backGauge } = config,
    style: CSSObject = {}

  if (backGauge.display) {
    style.padding = `${backGauge.top}px 0px ${backGauge.bottom}px`
  }
  return style
}

function getSearchPanelLineStyle(config: OptionsPanel) {
  const { lineOptions } = config,
    { textStyle, normalStyle } = lineOptions,
    style: CSSObject = {
      fontFamily: textStyle.fontFamily,
      fontWeight: textStyle.fontWeight,
      letterSpacing: textStyle.letterSpacing,
      backgroundColor: normalStyle.lineBgColor,
      color: normalStyle.color,
      fontSize: normalStyle.fontSize
    }

  return style
}

function getSearchPanelLineHoverStyle(config: OptionsPanel) {
  const { lineOptions } = config,
    { hoverStyle } = lineOptions,
    style: CSSObject = {}

  if (hoverStyle.display) {
    style.backgroundColor = hoverStyle.lineBgColor
    style.color = hoverStyle.color
    style.fontSize = hoverStyle.fontSize
  }

  return style
}

function getinShadow(props: OptionsPanel) {
  const { outShadow, inShadow } = props
  let _out_value = ''
  let _in_value = ''
  if (outShadow?.display) {
    _out_value = `${outShadow.xOffset}px ${outShadow.yOffset}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
  }

  if (inShadow?.display) {
    _in_value = `${inShadow.xOffset}px ${inShadow.yOffset}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
  }
  if (_out_value && _in_value) {
    return `${_out_value},${_in_value}`
  }
  return _out_value || _in_value
}

export const SearchUl = styled.div<SearchUlProps>`
  .search-ul {
    top: ${props => props.h + 'px'};
    margin-top: ${props => props.optionsPanel.topOffset + 'px'};
    border-radius: ${props => props.optionsPanel.borderRadius + 'px'};
    height: ${props => props.optionsPanel.height + 'px'};
    max-height: ${props => props.optionsPanel.height + 'px'};
    box-shadow: ${props => getinShadow(props.optionsPanel)};
    ${props => getSearchPanelBg(props.optionsPanel)}
    ${props => getSearchPanelBorder(props.optionsPanel)}
    ${props => getSearchPanelPadding(props.optionsPanel)}

    ${({ optionsPanel }) =>
      optionsPanel.horcroll?.display
        ? setScroll(optionsPanel.horcroll, 'y')
        : ` overflow-y: auto;
          &::-webkit-scrollbar {
            display: none;
          }`}

    gap: ${props => props.optionsPanel.lineOptions.lineSpace + 'px'};
    .search-li {
      height: ${props => props.optionsPanel.lineOptions.lineHeight + 'px'};
      line-height: ${props => props.optionsPanel.lineOptions.lineHeight + 'px'};
      padding: ${props => `0px ${props.optionsPanel.lineOptions.margin}px 0px`};
      ${props => getSearchPanelLineStyle(props.optionsPanel)}
      p {
        height: ${props => props.optionsPanel.lineOptions.lineHeight + 'px'};
      }
      &:hover {
        ${props => getSearchPanelLineHoverStyle(props.optionsPanel)}
      }
    }
  }
`
