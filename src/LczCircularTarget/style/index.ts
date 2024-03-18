/* eslint-disable indent */
import styled from 'styled-components'
import { colorFunc } from '../../common/util'
import { IconProps } from '../components/Icon'
import { ArrowConfig, CurrentStyle, HoverStyle, NormalCard } from '../type'

interface WrapperProps {
  arrowConfig: ArrowConfig
}

export const CircularWrapper = styled.div<WrapperProps>`
  width: 100%;
  height: 100%;

  .lcz-circular-pre {
    left: ${props => props.arrowConfig.spacing}px;
    transform: translateY(-50%);
  }
  .lcz-circular-next {
    right: ${props => props.arrowConfig.spacing}px;
    transform: translateY(-50%);
  }
`

interface CardWrapperProps {
  normalCard: NormalCard
  currentStyle: CurrentStyle
  hoverStyle: HoverStyle
}

const colors = {
  single: 'color',
  gradient: 'background-image'
}

function getColorsStyle(colorObj: { color; colorType } = { color: '#fff', colorType: 'single' }) {
  return `&.${colorObj.colorType}{
            ${colors[colorObj.colorType]}:${colorObj.color};
          }`
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

  &.lcz-circular-active {
    opacity: ${props => getActiveStyle(props.currentStyle, 'opacity')} !important;

    .lcz-circular-wrapper {
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

    .lcz-circular-wrapper {
      transform: ${props => (props.hoverStyle?.display ? `scale(${props.hoverStyle.zoom})` : 'normal')};
      top: ${props => (props.hoverStyle?.display ? props.hoverStyle.yOffset : 0)}px !important;
      background-color: ${props => getHoverStyle(props.hoverStyle, 'bg', 'color')} !important;
      background-image: ${props => getHoverStyle(props.hoverStyle, 'bg', 'imgUrl')} !important;
      border: ${props => getHoverStyle(props.hoverStyle, 'border')} !important;
    }
  }

  .lcz-circular-wrapper {
    border-radius: ${props => props.normalCard?.radius}px;
  }
`

export const IconWrapper = styled.div<IconProps>`
  width: ${props => props.iconConfig.width}px;
  height: ${props => props.iconConfig.height}px;
  left: ${props => `calc( 50% + ${props.iconConfig.xOffset}px )`};
  top: ${props => `calc( 50% + ${props.iconConfig.yOffset}px )`};
  line-height: 1;

  .lcz-system-icon {
    font-size: ${props => Math.min(props.iconConfig.width, props.iconConfig.height)}px;

    ${({ iconColor }) => getColorsStyle(iconColor)}
  }
`

export const CardWrapper1_0_3 = styled.div<any>`
  width: ${props => props.normalCard?.width}px;
  height: ${props => props.normalCard?.height}px;
  opacity: ${props => props.normalCard?.opacity};

  &.lcz-circular-active {
    opacity: ${props => getActiveStyle(props.currentStyle, 'opacity')} !important;

    .lcz-circular-wrapper {
      transform: ${props =>
        `translateY(${getActiveStyle(props.currentStyle, 'yOffset')}px)  scale(${getActiveStyle(
          props.currentStyle,
          'zoom'
        )})`};
      background-color: ${props => getActiveStyle(props.currentStyle, 'bg', 'color')} !important;
      background-image: ${props => getActiveStyle(props.currentStyle, 'bg', 'imgUrl')} !important;
      border: ${props => getActiveStyle(props.currentStyle, 'border')} !important;

      .lcz-circular-number {
        .numb-value {
          font-weight: ${props => props.activeContainStyle.num && props.activeContainStyle.num.fontWeight};

          &.current-single {
            color: ${props => props.activeContainStyle.num && props.activeContainStyle.num.color.color};
          }

          &.current-gradient {
            background: ${props => props.activeContainStyle.num && props.activeContainStyle.num.color.color};
          }
        }

        .numb-suffix {
          font-weight: ${props =>
            props.activeContainStyle.suffix && props.activeContainStyle.suffix.fontWeight} !important;

          &.current-single {
            color: ${props => props.activeContainStyle.suffix && props.activeContainStyle.suffix.color.color};
          }

          &.current-gradient {
            background: ${props => props.activeContainStyle.suffix && props.activeContainStyle.suffix.color.color};
          }
        }
      }

      .lcz-circular-name {
        font-weight: ${props => props.activeContainStyle.name && props.activeContainStyle.name.fontWeight}!important;

        &.current-single {
          color: ${props => props.activeContainStyle.name && props.activeContainStyle.name.color.color};
        }

        &.current-gradient {
          background: ${props => props.activeContainStyle.name && props.activeContainStyle.name.color.color};
        }
      }
    }
  }

  &:hover {
    opacity: ${props => (props.hoverStyle?.display ? props.hoverStyle?.opacity : null)} !important;

    .lcz-circular-wrapper {
      transform: ${props => (props.hoverStyle?.display ? `scale(${props.hoverStyle.zoom})` : 'normal')};
      top: ${props => (props.hoverStyle?.display ? props.hoverStyle.yOffset : 0)}px !important;
      background-color: ${props => getHoverStyle(props.hoverStyle, 'bg', 'color')} !important;
      background-image: ${props => getHoverStyle(props.hoverStyle, 'bg', 'imgUrl')} !important;
      border: ${props => getHoverStyle(props.hoverStyle, 'border')} !important;
    }
  }

  .lcz-circular-wrapper {
    border-radius: ${props => props.normalCard?.radius}px;

    .lcz-circular-number {
      left: ${props => `calc( 50% + ${props.numberConfig?.xOffset}px )`};
      top: ${props => `calc( 50% + ${props.numberConfig?.yOffset}px )`};

      .numb-value {
        line-height: 1;
        &.single {
          color: ${props => props.numberColorMemo.color};
        }

        &.gradient {
          background: ${props => props.numberColorMemo.color};
        }
      }

      .numb-suffix {
        transform: ${props => `translateY(${props.numberConfig?.suffixConfig?.yOffset}px)`};

        &.single {
          color: ${props => props.suffixColor.color};
        }

        &.gradient {
          background: ${props => props.suffixColor.color};
        }
      }
    }

    .lcz-circular-name {
      left: ${props => `calc( 50% + ${props.nameConfig.xOffset}px )`};
      top: ${props => `calc( 50% + ${props.nameConfig.yOffset}px )`};

      &.single {
        color: ${props => props.nameColor.color};
      }

      &.gradient {
        background: ${props => props.nameColor.color};
      }
    }
  }
`
