/* eslint-disable indent */
import styled, { createGlobalStyle } from 'styled-components'
import { configDisplayCompatible, getColorObj, getComStyle } from '../../common/util'
import { tagConfigDefault } from '../common/defaultValue'
import {
  BoxBorderStyle,
  PlainStyleConfig,
  HoverStyleConfig,
  ActiveStyleConfig,
  TextStyle,
  TagConfig,
  OptionLine,
  DownBoxConfig,
  IconSeries,
  OptionBoxConfig
} from '../type'

import { setScroll } from '../../LczColumnTable/style/styled'

interface DropDownBoxWrapperProps {
  contentOffset: { left: number; top: number; bottom: number }
  optionBoxConfig?: OptionBoxConfig
  itemLineHeight?: number | string
  itemRowSpacing?: number | string
  downBoxLeftOffset?: number | string
  plainStyle: PlainStyleConfig
  hoverStyle: HoverStyleConfig
  activeStyle: ActiveStyleConfig
  mode: any
  checkType?: string
  selectH: number
  textStyle: TextStyle
  tagConfig: TagConfig
  selectOptionHeight: number
  activeCheckColor?: string
  device: string
  xOffset: number
  downBoxConfig: DownBoxConfig
}

function getSearchBorder(downBoxConfig: DownBoxConfig, obj?: BoxBorderStyle): any {
  const borderDis = configDisplayCompatible(obj, 'bordered'),
    searchBorderDis = configDisplayCompatible(downBoxConfig?.searchConfig?.borderStyle, 'bordered')
  if (obj) {
    if (!borderDis) return 'none'
    return `${obj.boxBorderW}px solid ${obj.boxBorderC}`
  }

  if (downBoxConfig.searchConfig && searchBorderDis) {
    return {
      color: downBoxConfig.searchConfig.borderStyle?.boxBorderC,
      width: downBoxConfig.searchConfig.borderStyle?.boxBorderW
    }
  }
  return { color: 'none', width: 0 }
}

function getDropDownRadius({ downBoxConfig, device }: DropDownBoxWrapperProps) {
  const borderDis = configDisplayCompatible(downBoxConfig?.downBoxBorderStyle, 'bordered')
  if (device === 'pc') {
    if (downBoxConfig.downBoxBorderStyle && borderDis) {
      return downBoxConfig.downBoxBorderStyle.boxRadius + 'px'
    }
    return 0
  } else {
    if (downBoxConfig.downBoxBorderStyle && borderDis) {
      return `0 0 ${downBoxConfig.downBoxBorderStyle.boxRadius}px ${downBoxConfig.downBoxBorderStyle.boxRadius}px`
    }
    return 0
  }
}

function getContainStyle(props: DropDownBoxWrapperProps) {
  const { contentOffset, textStyle, mode = 'single', optionBoxConfig, tagConfig = tagConfigDefault } = props
  const { left = 12, top = 8, bottom = 8 } = contentOffset
  const { display: iconDis = true, rightOffset = 12, type = 'system', imgWidth = 20, iconSize = 16 } =
    optionBoxConfig?.iconConfig || {}
  const { boxBorderW = 0 } = optionBoxConfig?.boxBorderStyle || {}
  const borderDis = configDisplayCompatible(optionBoxConfig?.boxBorderStyle, 'bordered')

  const right = iconDis ? rightOffset + (type === 'custom' ? imgWidth : iconSize) : left
  return {
    padding: `${top}px ${right}px ${bottom}px ${left}px`,
    height:
      textStyle.fontSize * 1.5 +
      top +
      bottom +
      (mode !== 'single' ? (tagConfig.tagBorderWidth || 0) * 2 : 0) +
      (borderDis ? boxBorderW * 2 : 0)
  }
}

function getOptionBoxOver(props: DropDownBoxWrapperProps) {
  const mode = props.mode || 'single'
  if (mode === 'single') {
    const over = props.optionBoxConfig?.boxColor?.signOverflow || 'hidden'
    if (over === 'linefeed') return ''

    return `.ant-select-selection-overflow-item {
      white-space: nowrap;
      overflow: hidden;
      ${
        over === 'ellipsis'
          ? `
              .lcz-select-option-box span{
                width:100%;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            `
          : ''
      }
    }`
  } else {
    const over = props.optionBoxConfig?.boxColor?.multipleOverflow || 'hidden'

    if (over === 'linefeed') {
      return `
         flex-wrap: wrap;
         row-gap:4px;
      `
    }
  }
  return ''
}

export const DropDownBoxWrapper = styled.div<DropDownBoxWrapperProps>`
  position: relative;
  .ant-select {
    width: inherit;
    border-radius: ${({ optionBoxConfig }) =>
      configDisplayCompatible(optionBoxConfig?.boxBorderStyle, 'bordered')
        ? optionBoxConfig?.boxBorderStyle?.boxRadius || 0
        : 0}px !important;
    overflow: hidden;

    ${({ optionBoxConfig }) => {
      const { display = true, rightOffset = 0, iconSize = 12, iconColor, animate = true } =
        optionBoxConfig?.iconConfig || {}
      if (!display) return ''
      return `
          .ant-select-arrow {
            top: 50%;
            right: ${rightOffset}px;
            transform: translateY(-50%);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0;

            .select-icon {
              font-size: ${iconSize}px;
              color: ${iconColor}!important;
              transition: all 0.3s;
            }

            .select-icon-image {
              transition: all 0.3s;
            }
        }

        &.ant-select-open .select-icon,
        &.ant-select-open .select-icon-image {
          transform: ${animate ? 'rotate(180deg)' : 'rotate(0)'};
        }
      `
    }}

    .ant-select-clear {
      right: ${props => props.optionBoxConfig?.clearIcon?.right}px;
      background-color: transparent;
      color: ${props => props.optionBoxConfig?.clearIcon?.color};
      font-size: ${props => props.optionBoxConfig?.clearIcon?.size}px;
      width: ${props => props.optionBoxConfig?.clearIcon?.size}px;
      height: ${props => props.optionBoxConfig?.clearIcon?.size}px;
      margin-top: -${props => (props.optionBoxConfig?.clearIcon?.size || 0) / 2}px;
    }

    &.ant-select-focused,
    &.ant-select-open {
      .ant-select-selector {
        border-color: ${({ optionBoxConfig }) =>
          configDisplayCompatible(optionBoxConfig?.boxBorderStyle, 'bordered')
            ? optionBoxConfig?.boxBorderStyle?.boxFocusBorderC
            : 'transparent'};
      }
    }
  }

  .ant-select .ant-select-selector {
    padding: ${props => getContainStyle(props).padding} !important;
    min-height: ${props => getContainStyle(props).height}px;

    ${({ optionBoxConfig }) =>
      configDisplayCompatible(optionBoxConfig?.boxBorderStyle, 'bordered')
        ? `
          border-style: solid;
          border-width: ${optionBoxConfig?.boxBorderStyle?.boxBorderW}px;
          border-color: ${optionBoxConfig?.boxBorderStyle?.boxBorderC};
          border-radius: ${optionBoxConfig?.boxBorderStyle?.boxRadius}px;

          &:hover {
            border-color: ${optionBoxConfig?.boxBorderStyle?.boxHoverBorderC};
            box-shadow: 0 0px 5px ${optionBoxConfig?.boxBorderStyle?.boxHoverBorderC};
            border-width: ${optionBoxConfig?.boxBorderStyle?.boxBorderW}px;
          }
    `
        : 'border:none;'}

    .ant-select-selection-overflow {
      flex-wrap: nowrap;
      flex: 1 0 0;
      overflow: hidden;

      ${props => getOptionBoxOver(props)}
    }
  }

  .dropdownClassName {
    width: ${({ device, downBoxConfig }) => (device === 'pc' ? downBoxConfig.downBoxWidth + 'px' : '100vw')} !important;
    left: ${({ device, downBoxConfig, xOffset }) =>
      device === 'pc' ? downBoxConfig.leftOffset : -xOffset}px !important;
    top: ${({ selectH, downBoxConfig }) => selectH + (downBoxConfig?.topOffset || 0)}px!important;
    border-width: ${({ device, downBoxConfig }) =>
      device === 'pc' && configDisplayCompatible(downBoxConfig.downBoxBorderStyle, 'bordered')
        ? downBoxConfig.downBoxBorderStyle?.boxBorderW
        : 0}px;
    border-style: solid;
    border-color: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxBorderC};
    border-radius: ${props => getDropDownRadius(props)};
    max-height: ${({ downBoxConfig }) => downBoxConfig.downBoxHeight}px;
    min-height: ${({ downBoxConfig }) => downBoxConfig.downBoxHeight}px;
    overflow: hidden;

    .rc-virtual-list-holder {
      ${({ downBoxConfig }) => (downBoxConfig.horcroll?.display ? setScroll(downBoxConfig.horcroll, 'y') : '')}
    }

    &::before,
    &::after {
      display: ${({ device, downBoxConfig }) =>
        device !== 'pc' && configDisplayCompatible(downBoxConfig.downBoxBorderStyle, 'bordered') ? 'block' : 'none'};
      background: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxBorderC};
      height: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxBorderW}px;
    }

    .lcz-multiple-enter {
      &::before {
        display: ${({ device, downBoxConfig }) =>
          device !== 'pc' && configDisplayCompatible(downBoxConfig.downBoxBorderStyle, 'bordered') ? 'block' : 'none'};
        background: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxBorderC};
        height: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxBorderW}px;
      }
    }

    &:hover {
      border-color: ${({ downBoxConfig }) => downBoxConfig.downBoxBorderStyle?.boxHoverBorderC};
    }

    .ant-select-item {
      line-height: ${props => props.itemLineHeight}px !important;
      color: ${props => props.plainStyle.rowColor} !important;
      background: ${props => props.plainStyle.rowBgColor} !important;
    }

    .ant-select-item-option-state {
      padding-left: 6px;
      display: ${props => (props.checkType === 'check' ? 'none' : 'block')};
    }
    .ant-empty-description {
      color: ${props => props.plainStyle.rowColor} !important;
    }
    .ant-select-item-option-active {
      color: ${props =>
        props.device === 'pc' && props.hoverStyle.hoverType && props.hoverStyle.rowHoverColor} !important;
      background: ${props =>
        props.device === 'pc' && props.hoverStyle.hoverType && props.hoverStyle.rowHoverBgColor} !important;
    }

    .ant-select-item-option-selected {
      color: ${props => props.activeStyle.activeType && props.activeStyle.rowActiveColor} !important;
      background: ${props => props.activeStyle.activeType && props.activeStyle.rowActiveBgColor} !important;
    }
  }

  /* tag */
  .ant-select-selection-placeholder,
  .lcz-select-option-label {
    display: ${({ optionBoxConfig }) =>
      configDisplayCompatible(optionBoxConfig?.boxColor, 'textStatus') ? 'inherit' : 'none'};
  }
  .ant-select-selection-item {
    display: ${({ optionBoxConfig }) =>
      configDisplayCompatible(optionBoxConfig?.boxColor, 'textStatus') ? 'flex' : 'none'};
    transition: all 0.3s;
    margin: 0;
  }

  ${props => (props.mode === 'multiple' ? '.ant-select-selection-item' : null)} {
    background-color: ${props => props.mode === 'multiple' && props.tagConfig.tagBgColor};
    border-color: ${props => props.mode === 'multiple' && props.tagConfig.tagBorderColor};
    border-width: ${props => props.mode === 'multiple' && props.tagConfig.tagBorderWidth}px;
    border-radius: ${props => props.mode === 'multiple' && props.tagConfig.tagRadius}px;
    margin-right: ${props => props.mode === 'multiple' && props.tagConfig.speed}px;
  }

  .ant-select-selection-item-content {
    display: flex;
    margin: 0 ${props => props.textStyle.fontSize / 5}px;
    align-items: center;
  }
  .ant-select-selection-item-remove {
    font-size: ${props => props.textStyle.fontSize / 1.5}px;
    color: ${props => props.tagConfig.iconColor};
  }

  .ant-select-item-option {
    margin-bottom: ${props => props.itemRowSpacing}px;
    padding-left: ${props => props.downBoxLeftOffset}px;
    padding-right: ${props => props.downBoxLeftOffset}px;
  }

  .lcz-option-item {
    position: relative;
    flex: 1;

    .lcz-system-icon,
    .lcz-img-icon,
    .lcz-occupy-icon {
      flex-shrink: 0;
    }

    .ant-checkbox-checked {
      .ant-checkbox-inner {
        border-color: ${props => props.activeStyle.activeType && props.activeCheckColor};
        background-color: transparent;

        &::after {
          border-color: ${props => props.activeStyle.activeType && props.activeCheckColor};
        }
      }
    }

    .ant-checkbox-inner {
      border-color: ${props => props.plainStyle.checkColor};
      background-color: transparent;
    }
  }

  .drop-down-render {
    .lcz-select-mobile-search {
      padding: ${({ downBoxConfig }) =>
        `${downBoxConfig.searchConfig?.topBottomMargin}px ${downBoxConfig.searchConfig?.topBottomMargin}px`};

      .ant-input-affix-wrapper {
        background-color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.bgColor};
        border-color: ${props => getSearchBorder(props.downBoxConfig).color};
        border-width: ${props => getSearchBorder(props.downBoxConfig).width}px !important;
        height: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.height}px;
        border-radius: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.borderStyle?.boxRadius}px;

        .ant-input-prefix {
          color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.iconColor};
        }
      }
    }
    .ant-input-group-wrapper {
      padding-top: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.topBottomMargin}px;
      padding-bottom: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.topBottomMargin}px;
      width: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.width}px;
      margin-left: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.leftMargin}px;
      .ant-input,
      .ant-btn {
        border-color: ${props => getSearchBorder(props.downBoxConfig).color} !important;
        border-width: ${props => getSearchBorder(props.downBoxConfig).width}px !important;
        height: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.height}px;
        background-color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.bgColor};
      }

      .ant-input {
        border-top-left-radius: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.borderStyle?.boxRadius}px;
        border-bottom-left-radius: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.borderStyle?.boxRadius}px;
      }
      .ant-btn {
        border-top-right-radius: ${({ downBoxConfig }) =>
          downBoxConfig.searchConfig?.borderStyle?.boxRadius}px !important;
        border-bottom-right-radius: ${({ downBoxConfig }) =>
          downBoxConfig.searchConfig?.borderStyle?.boxRadius}px !important;
        color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.iconColor} !important;
      }

      input::-webkit-input-placeholder {
        color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.textColor} !important;
      }
      input:-moz-placeholder {
        color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.textColor} !important;
      }
      input::-moz-placeholder {
        color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.textColor} !important;
      }
      input:-ms-input-placeholder {
        color: ${({ downBoxConfig }) => downBoxConfig.searchConfig?.textColor} !important;
      }
    }
  }

  .ant-select-item-option-state {
    .anticon.anticon-check {
      color: ${props => (props.activeStyle.activeType ? props.activeCheckColor : '#ccc')};
    }
  }
`

interface PushUpwrapperprops {
  downBoxConfig?: DownBoxConfig
  drewerclass: string
  downBoxBorderStyle?: BoxBorderStyle
  optionLine?: OptionLine
}

export const PushUpwrapper = createGlobalStyle<PushUpwrapperprops>`
  .${props => props.drewerclass}{ 

    .ant-drawer-body{
      padding: 0; 
      overflow: hidden;

      > *{
        touch-action: pan-y;
      }
    }

    .ant-drawer-content{ 
      background: ${props => props.downBoxConfig?.downBoxBgColor};
      border: ${props => getSearchBorder(props, props.downBoxBorderStyle)};
      border-radius: ${({ downBoxBorderStyle }) => {
        const borderDis = configDisplayCompatible(downBoxBorderStyle, 'bordered')
        return `${borderDis ? downBoxBorderStyle?.boxRadius : 0}px  ${
          borderDis ? downBoxBorderStyle?.boxRadius : 0
        }px 0 0`
      }}
    }

    .pushShop-operation{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12px;
      font-size: 14px;
      border-bottom: ${props => getSearchBorder(props, props.downBoxBorderStyle)};
      color: ${props => props.optionLine?.activeStyle?.rowActiveColor};
    }
  }
`

interface IconGlobalProps {
  _id: string
  occupy: boolean
  iconConfig?: IconSeries
}

function getIconColor(colorobj: any) {
  const { color, colorType } = getColorObj(colorobj)
  if (colorType === 'single') return `color:${color};background:${color};`
  return `background:linear-gradient(${color});`
}

export const IconGlobalStyle = createGlobalStyle<IconGlobalProps>`

  #${props => props._id}{ 
    .ant-select-item {
      ${({ iconConfig, occupy }) => `
        .lcz-select-system-${iconConfig?.type}{
           ${getIconColor(iconConfig?.normalColor)}
        }

        .lcz-select-custom-${iconConfig?.type}{ 
          display:${getComStyle(iconConfig, 'normalImgUrl') || occupy ? 'block' : 'none'};
          background-image: url(${getComStyle(iconConfig, 'normalImgUrl')});
        }
      `}

      ${({ iconConfig }) =>
        getComStyle(iconConfig, 'hoverColor.display')
          ? `
        &.ant-select-item-option-active{
          .lcz-select-system-${iconConfig?.type}{
            ${getIconColor(iconConfig?.hoverColor?.value)}
          }
        }
      
      `
          : ''}

     
      ${({ iconConfig }) =>
        getComStyle(iconConfig, 'focusColor.display')
          ? `
        &.ant-select-item-option-selected{
          .lcz-select-system-${iconConfig?.type}{
           ${getIconColor(iconConfig?.focusColor?.value)}
          } 
        }
        `
          : ''}


      ${({ iconConfig }) =>
        getComStyle(iconConfig, 'hoverImgUrl.display') && getComStyle(iconConfig, 'hoverImgUrl.value')
          ? `
        &.ant-select-item-option-active{
          .lcz-select-custom-${iconConfig?.type}{
            display: block;
            background-image: url(${getComStyle(iconConfig, 'hoverImgUrl.value')});
          }
        }
            `
          : ''}


      ${({ iconConfig }) =>
        getComStyle(iconConfig, 'focusImgUrl.display') && getComStyle(iconConfig, 'focusImgUrl.value')
          ? `
        &.ant-select-item-option-selected{
          .lcz-select-custom-${iconConfig?.type}{
            display: block;
            background-image: url(${getComStyle(iconConfig, 'focusImgUrl.value')});
          }
        }
        `
          : ''}    
    }
  }
`

export const OptionSelect = styled.div``
