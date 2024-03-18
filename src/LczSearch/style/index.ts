/* eslint-disable indent */
import styled from 'styled-components'
import { SearchProps, TextStyle } from '../type'

interface SearchWrapperProps extends SearchProps {
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
