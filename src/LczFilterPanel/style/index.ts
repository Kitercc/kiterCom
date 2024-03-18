/* eslint-disable indent */
import styled from 'styled-components'
import { getColorObj, getComStyle } from '../../common/util'
import { ActiveStyleConfig, HoverStyleConfig, IconSeries, PlainStyleConfig } from '../../LczSelect/type'
import { ArrowConfig, FilterPanelProps } from '../type'

interface WrapperProps extends FilterPanelProps {
  boxBgColor: string
  arrowConfig: ArrowConfig
  plainStyle?: PlainStyleConfig
  hoverStyle?: HoverStyleConfig
  activeStyle?: ActiveStyleConfig
}

function getArrowStyle(props) {
  const { arrowConfig, boxBgColor, bgConfig, w, h } = props
  const { position, offset, size } = arrowConfig

  let _offsetWidth = 0
  if (position === 'top' || position === 'bottom') {
    _offsetWidth = offset >= w ? w - size * 1.5 : offset
  } else {
    _offsetWidth = offset >= h ? h - size * 1.5 : offset
  }

  _offsetWidth = _offsetWidth - bgConfig.boxBorderW

  switch (position) {
    case 'top':
      return {
        bottomC: boxBgColor,
        topC: 'transparent',
        leftC: 'transparent',
        rightC: 'transparent',
        top: -size - bgConfig.boxBorderW + 'px',
        left: _offsetWidth + 'px',
        right: 'initial',
        bottom: 'initial',
        borderW: `0 ${size * 0.7}px ${size}px ${size * 0.7}px`,
        transform: 'rotateY(30deg)'
      }
    case 'bottom':
      return {
        bottomC: 'transparent',
        topC: boxBgColor,
        leftC: 'transparent',
        rightC: 'transparent',
        top: 'initial',
        left: _offsetWidth + 'px',
        right: 'initial',
        bottom: -size - bgConfig.boxBorderW + 'px',
        borderW: `${size}px ${size * 0.7}px 0  ${size * 0.7}px`,
        transform: 'rotateY(30deg)'
      }
    case 'left':
      return {
        bottomC: 'transparent',
        topC: 'transparent',
        leftC: 'transparent',
        rightC: boxBgColor,
        top: _offsetWidth + 'px',
        left: -size - bgConfig.boxBorderW + 'px',
        right: 'initial',
        bottom: 'initial',
        borderW: `${size * 0.7}px ${size}px ${size * 0.7}px 0`,
        transform: 'rotateX(30deg)'
      }
    case 'right':
      return {
        bottomC: 'transparent',
        topC: 'transparent',
        leftC: boxBgColor,
        rightC: 'transparent',
        top: _offsetWidth + 'px',
        left: 'initial',
        right: -size - bgConfig.boxBorderW + 'px',
        bottom: 'initial',
        borderW: `${size * 0.7}px 0  ${size * 0.7}px ${size}px`,
        transform: 'rotateX(30deg)'
      }
    default:
      return {}
  }
}

function getSearchBorder(props) {
  return { color: props.searchConfig.boxBorderC, width: props.searchConfig.boxBorderW }
}

export const FilterPanelWrapper = styled.div<WrapperProps>`
  &::before {
    display: ${props => (props.arrowConfig.display ? 'inline-block' : 'none')};
    border: solid transparent;
    border-bottom-color: ${props => getArrowStyle(props).bottomC};
    border-top-color: ${props => getArrowStyle(props).topC};
    border-left-color: ${props => getArrowStyle(props).leftC};
    border-right-color: ${props => getArrowStyle(props).rightC};
    top: ${props => getArrowStyle(props).top};
    left: ${props => getArrowStyle(props).left};
    right: ${props => getArrowStyle(props).right};
    bottom: ${props => getArrowStyle(props).bottom};
    border-width: ${props => getArrowStyle(props).borderW} !important;
    transform: ${props => getArrowStyle(props).transform};
  }

  .lcz-drop-dowm-item {
    font-size: inherit;
    line-height: ${props => props.optionLine?.itemLineHeight}px;
    height: ${props => props.optionLine?.itemLineHeight}px;
    margin-bottom: ${props => props.optionLine?.itemRowSpacing}px;
    padding: 0 ${props => props.optionLine?.downBoxLeftOffset}px;
    background: ${props => props.plainStyle?.rowBgColor};
    color: ${props => props.plainStyle?.rowColor};

    .lcz-system-icon,
    .panel-item-img,
    .lcz-occupy-icon {
      flex-shrink: 0;
    }

    &:hover {
      color: ${props => props.hoverStyle?.hoverType && props.hoverStyle?.rowHoverColor};
      background: ${props => props.hoverStyle?.hoverType && props.hoverStyle?.rowHoverBgColor};
    }

    &.active {
      color: ${props => props.activeStyle?.activeType && props.activeStyle.rowActiveColor};
      background: ${props => props.activeStyle?.activeType && props.activeStyle.rowActiveBgColor};

      .tick {
        color: ${props => props.activeStyle?.activeType && props.activeStyle.aTickColor};
      }

      .ant-checkbox-checked {
        .ant-checkbox-inner {
          border-color: ${props => props.activeStyle?.activeType && props.activeStyle.aCheckColor};
          background-color: transparent;

          &::after {
            border-color: ${props => props.activeStyle?.activeType && props.activeStyle.aCheckColor};
          }
        }
      }
    }

    .ant-checkbox-inner {
      border-color: ${props => props.plainStyle?.checkColor};
      background-color: transparent;
    }
  }

  .panel-search {
    .ant-input-group-wrapper {
      width: 100%;
      padding: ${props => ` ${props.searchConfig?.topBottomMargin}px ${props.searchConfig?.leftMargin}px`};
      .ant-input-wrapper {
        background-color: ${props => props.searchConfig?.bgColor};
        border-radius: ${props => props.searchConfig?.radius}px;
      }
      .ant-input,
      .ant-btn {
        border-color: ${props => getSearchBorder(props).color};
        border-width: ${props => getSearchBorder(props).width}px !important;
        height: ${props => props.searchConfig?.height}px;
      }

      .ant-input {
        border-top-left-radius: ${props => props.searchConfig?.radius}px !important;
        border-bottom-left-radius: ${props => props.searchConfig?.radius}px !important;
      }
      .ant-btn,
      .ant-input-group-addon {
        border-top-right-radius: ${props => props.searchConfig?.radius}px !important;
        border-bottom-right-radius: ${props => props.searchConfig?.radius}px !important;
        color: ${props => props.searchConfig?.iconColor} !important;
        border-left: 0;
      }

      .ant-btn {
        display: flex;
        align-items: center;
        justify-content: center;

        > .anticon {
          line-height: 0;
        }
      }

      input::-webkit-input-placeholder {
        color: ${props => props.searchConfig?.textColor};
      }
      input:-moz-placeholder {
        color: ${props => props.searchConfig?.textColor};
      }
      input::-moz-placeholder {
        color: ${props => props.searchConfig?.textColor};
      }
      input:-ms-input-placeholder {
        color: ${props => props.searchConfig?.textColor};
      }
    }
  }
`

interface FilterwrapperProps {
  occupy: boolean
  iconConfig?: IconSeries
}

export const FilterItemWrapper = styled.div<FilterwrapperProps>`
  ${({ iconConfig, occupy }) =>
    iconConfig
      ? `
    .panel-item-system-icon {
      ${getIconStyle(iconConfig?.normalColor)};

      ${
        getComStyle(iconConfig, 'hoverColor.display')
          ? `
          &-hover {
            ${getIconStyle(iconConfig?.hoverColor?.value)}
          }`
          : ''
      };

      ${
        getComStyle(iconConfig, 'focusColor.display')
          ? `
          &-focus {
            ${getIconStyle(iconConfig?.focusColor?.value)}
          }`
          : ''
      }
    }

    .panel-item-img { 
      display: ${iconConfig?.normalImgUrl || occupy ? 'block' : 'none'};
      background-image: url(${iconConfig?.normalImgUrl});


      &.panel-item-custom-icon{
        ${
          getComStyle(iconConfig, 'hoverImgUrl.display') && getComStyle(iconConfig, 'hoverImgUrl.value')
            ? `
            &-hover {
              background-image: url(${getComStyle(iconConfig, 'hoverImgUrl.value')});
            }`
            : ''
        };

        ${
          getComStyle(iconConfig, 'focusImgUrl.display') && getComStyle(iconConfig, 'focusImgUrl.value')
            ? `
            &-focus {
              background-image: url(${getComStyle(iconConfig, 'focusImgUrl.value')});
            }`
            : ''
        };
      }
    }`
      : ''}
`

function getIconStyle(config: any) {
  if (config) {
    const { color, colorType } = getColorObj(config)
    if (colorType === 'single') return `color:${color};background-color:${color};`
    return `background:linear-gradient(${color});`
  }
}
