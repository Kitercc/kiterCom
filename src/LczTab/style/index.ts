import styled from 'styled-components'
import { FocusStyleConfog, GlideLine, OrdStyleConfig, TextStyle } from '../type'

interface TabStyleProps {
  tabType: string
  len: number
  rollWidthOrHeight: number
  spacing: number
  arrangement: string
  tabBgColor: string
  alignType: string
  ordTextConfig: TextStyle
  focusTextConfig: TextStyle
  focusTextHover: TextStyle
  glideLine: GlideLine
  ordStyleConfig: OrdStyleConfig
  ordTextHover: TextStyle
  focusStyleConfig: FocusStyleConfog
}

function getWidth(props) {
  if (props.arrangement === 'vertical') return '100%'
  if (props.tabType === 'ord') {
    return `calc(${100 / props.len}% - ${props.spacing}px)`
  }
  return `${props.rollWidthOrHeight}px`
}

function getHeight(props) {
  if (props.arrangement === 'horizontal') return '100%'
  if (props.tabType === 'ord') {
    return `calc(${100 / props.len}% - ${props.spacing}px)`
  }
  return `${props.rollWidthOrHeight}px`
}

const textAlign = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end'
}

export const TabsWrapper = styled.div<TabStyleProps>`
  display: ${props => (props.arrangement === 'horizontal' ? 'flex' : 'inline-block')};
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${props => props.tabBgColor};

  .wrapper-box {
    width: ${props => (props.tabType === 'ord' ? '100%' : 'initial')};
    height: ${props => (props.tabType === 'ord' ? '100%' : 'initial')};
    flex: ${props => (props.tabType === 'ord' ? '1' : '1 0 auto')};
    flex-direction: ${props => (props.arrangement === 'horizontal' ? 'row' : 'column')};
    overflow: ${props => (props.tabType === 'ord' ? 'hidden' : 'initial')};
    justify-content: ${props => (props.tabType === 'ord' ? 'space-between' : 'initial')};
  }
  .tabs-items {
    flex-shrink: ${props => (props.tabType === 'ord' ? '1' : '0')};
    /* flex: ${props => (props.tabType === 'ord' ? '1' : 'none')}; */
    margin: 0 ${props => (props.tabType === 'ord' && props.arrangement === 'vertical' ? 0 : props.spacing)}px
      ${props => (props.tabType === 'ord' && props.arrangement === 'horizontal' ? 0 : props.spacing)}px 0;
    width: ${props => getWidth(props)};
    height: ${props => getHeight(props)};
    justify-content: ${props => textAlign[props.alignType]};
    font-family: ${props => props.ordTextConfig.fontFamily};
    font-size: ${props => props.ordTextConfig.fontSize}px;
    font-weight: ${props => props.ordTextConfig.fontWeight};
    color: ${props => props.ordTextConfig.color};
    background-color: ${props => props.ordStyleConfig.backgroundColor};
    border-color: ${props => props.ordStyleConfig.borderColor};
    border-width: ${props => props.ordStyleConfig.borderWidth}px;
    border-radius: ${props => props.ordStyleConfig.borderRadius}px;
    &:last-of-type {
      margin-right: 0;
      margin-bottom: 0;
    }

    &:hover {
      font-family: ${props => props.ordTextHover.fontFamily} !important;
      font-size: ${props => props.ordTextHover.fontSize}px;
      font-weight: ${props => props.ordTextHover.fontWeight};
      color: ${props => props.ordTextHover.color};
      background-color: ${props => props.ordStyleConfig.HoverbackgroundColor};
      border-color: ${props => props.ordStyleConfig.HoverborderColor};
    }
    &.tabs-action {
      background-color: ${props => props.focusStyleConfig.focusBgColor};
      border-color: ${props => props.focusStyleConfig.focusBorderColor};
      border-width: ${props => props.focusStyleConfig.focusBorderWidth}px;
      border-radius: ${props => props.focusStyleConfig.focusBorderRadius}px;
      font-family: ${props => props.focusTextConfig.fontFamily} !important;
      font-size: ${props => props.focusTextConfig.fontSize}px;
      font-weight: ${props => props.focusTextConfig.fontWeight};
      color: ${props => props.focusTextConfig.color};
      /* border-bottom: 0; */

      &:hover {
        background-color: ${props => props.focusStyleConfig.focusHoverBgColor};
        border-color: ${props => props.focusStyleConfig.focusHoverBorderColor};
        border-width: ${props => props.focusStyleConfig.focusHoverBorderWidth}px;
        font-family: ${props => props.focusTextHover.fontFamily} !important;
        font-size: ${props => props.focusTextHover.fontSize}px;
        font-weight: ${props => props.focusTextHover.fontWeight};
        color: ${props => props.focusTextHover.color};
      }

      &::after {
        display: ${props => (props.glideLine.display ? 'inline-block' : 'none')};
        height: ${props => props.glideLine.width}px;
        background: ${props => props.glideLine.bgColor};
      }
    }
  }
`
