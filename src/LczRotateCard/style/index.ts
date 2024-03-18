/* eslint-disable indent */
import styled from 'styled-components'
import { colorFunc } from '../../common/util'
import { CardProps } from '../components/Card'

import { ArrowConfig, CurrentStyle, HoverStyle } from '../type'

interface WrapperProps {
  arrowConfig: ArrowConfig
}

export const CircularWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;

  .lcz-rotate-card-pre {
    left: ${props => props.arrowConfig.spacing}px;
    transform: translateY(-50%);
  }
  .lcz-rotate-card-next {
    right: ${props => props.arrowConfig.spacing}px;
    transform: translateY(-50%);
  }
`

interface CardWrapperProps extends CardProps {
  bgConfig?: { color: any; imgUrl: string }
}

function getHoverStyle(hoverStyle: HoverStyle | undefined, key: string, code?: string) {
  if (!hoverStyle?.display) return null
  if (key === 'bg' && !hoverStyle.bgConfig.display) return null
  if (key === 'border' && !hoverStyle.border.display) return null

  if (key == 'bg') {
    if (code === 'color' && colorFunc(hoverStyle.bgConfig.color).colorType === 'single')
      return colorFunc(hoverStyle.bgConfig.color).color

    if (code === 'imgUrl') {
      if (hoverStyle.bgConfig[code]) return `url(${hoverStyle.bgConfig[code]})`
      return colorFunc(hoverStyle.bgConfig.color).color
    }
  }

  if (key == 'border') {
    return `${hoverStyle.border.width}px solid ${hoverStyle.border.color}`
  }
}

function getActiveStyle(currentStyle?: CurrentStyle, key = '', code = '') {
  if (!currentStyle?.display) return ''
  if (key === 'opacity' || key === 'zoom' || key === 'yOffset') return currentStyle[key]

  if (key === 'bg') {
    if (!currentStyle.bgConfig.display) return
    if (code === 'color' && colorFunc(currentStyle.bgConfig.color).colorType === 'single')
      return colorFunc(currentStyle.bgConfig.color).color

    if (code === 'imgUrl') {
      if (currentStyle.bgConfig[code]) return `url(${currentStyle.bgConfig[code]})`
      return colorFunc(currentStyle.bgConfig.color).color
    }
  }

  if (key == 'border') {
    if (!currentStyle.border.display) return
    return `${currentStyle.border.width}px solid ${currentStyle.border.color}`
  }
}

export const CardWrapper = styled.div<CardWrapperProps>`
  width: ${props => props.normalCard?.width}px;
  height: ${props => props.normalCard?.height}px;
  opacity: ${props => props.normalCard?.opacity};

  &.lcz-rotate-card-active {
    opacity: ${props => getActiveStyle(props.currentStyle, 'opacity')} !important;

    .lcz-rotate-card-wrapper {
      transform: ${props =>
        `translateY(${getActiveStyle(props.currentStyle, 'yOffset')}px)  scale(${getActiveStyle(
          props.currentStyle,
          'zoom'
        )})`};
      background-color: ${props => getActiveStyle(props.currentStyle, 'bg', 'color')} !important;
      background-image: ${props => getActiveStyle(props.currentStyle, 'bg', 'imgUrl')} !important;
      border: ${props => getActiveStyle(props.currentStyle, 'border')} !important;
    }
  }

  &:hover {
    opacity: ${props => (props.hoverStyle?.display ? props.hoverStyle?.opacity : null)} !important;

    .lcz-rotate-card-wrapper {
      transform: ${props => (props.hoverStyle?.display ? `scale(${props.hoverStyle.zoom})` : 'normal')};
      top: ${props => (props.hoverStyle?.display ? props.hoverStyle.yOffset : 0)}px !important;
      background-color: ${props => getHoverStyle(props.hoverStyle, 'bg', 'color')} !important;
      background-image: ${props => getHoverStyle(props.hoverStyle, 'bg', 'imgUrl')} !important;
      border: ${props => getHoverStyle(props.hoverStyle, 'border')} !important;
    }
  }

  .lcz-rotate-card-wrapper {
    border-radius: ${props => props.normalCard?.radius}px;
  }
`

interface CardContentWrapperProps {
  activeContainStyle: any
}

export const CardContentWrapper = styled.div<CardContentWrapperProps>`
  .lcz-tip-value {
    &.current {
      font-weight: ${props => props.activeContainStyle.value && props.activeContainStyle.value.fontWeight}!important;
      color: ${props => props.activeContainStyle.value && props.activeContainStyle.value.color}!important;
      .number-con {
        font-weight: ${props => props.activeContainStyle.value && props.activeContainStyle.value.fontWeight}!important;
        color: ${props => props.activeContainStyle.value && props.activeContainStyle.value.color}!important;
        > span {
          font-weight: ${props =>
            props.activeContainStyle.suffix && props.activeContainStyle.suffix.fontWeight} !important;
          color: ${props => props.activeContainStyle.suffix && props.activeContainStyle.suffix.color}!important;
        }
      }
    }

    .lcz-tip-suffix {
      &.current {
        font-weight: ${props =>
          props.activeContainStyle.suffix && props.activeContainStyle.suffix.fontWeight} !important;
        color: ${props => props.activeContainStyle.suffix && props.activeContainStyle.suffix.color}!important;
      }
    }
  }

  .lcz-tip-title {
    &.current {
      font-weight: ${props => props.activeContainStyle.name && props.activeContainStyle.name.fontWeight}!important;
      color: ${props => props.activeContainStyle.name && props.activeContainStyle.name.color}!important;
    }
  }
`
