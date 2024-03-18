/* eslint-disable indent */
import styled, { createGlobalStyle } from 'styled-components'
import { configDisplayCompatible, getComStyle, numberIsEmpty } from '../../common/util'
import { setScroll } from '../../LczColumnTable/style/styled'
import { DropdownProps, TextStyle, OptionLine, DropDownConfig, IconSeries } from '../type'

interface WrapperProps extends DropdownProps {
  optionLine: OptionLine
  offsetHeight: number
}

function getBorderStyle(props, type) {
  if (type === 'btn') {
    const { boxBorderC, boxBorderW, boxRadius } = props
    const borderDis = configDisplayCompatible(props, 'bordered')
    if (!borderDis) return { b: 'none !important', r: 0 }

    return { b: `${boxBorderW}px solid ${boxBorderC}`, r: boxRadius + 'px' }
  } else {
    const { display, color, width, radius } = props
    if (!display) return { b: 'none !important', r: 0 }

    return { b: `${width}px solid ${color}`, r: radius + 'px' }
  }
}

function getDropDownPosition(dropdownConfig: DropDownConfig, offsetHeight) {
  const { placement = 'bottomLeft', dropWidth = 0 } = dropdownConfig
  let styleStr = ''
  switch (placement) {
    case 'bottomLeft': {
      styleStr = `
        left:0 !important;
        top:${offsetHeight}px !important;
      `
      break
    }
    case 'bottomCenter': {
      styleStr = `
        left:calc(50% - ${dropWidth / 2}px ) !important;
        top:${offsetHeight}px !important;
      `
      break
    }
    case 'bottomRight': {
      styleStr = `
        left:initial !important;
        top:${offsetHeight}px !important;
        right:0;
      `
      break
    }
    case 'topLeft': {
      styleStr = `
        left:0 !important;
        top:initial !important;
        bottom:0;
      `
      break
    }
    case 'topCenter': {
      styleStr = `
        left:calc(50% - ${dropWidth / 2}px ) !important;
        top:initial !important;
        bottom:0;
      `
      break
    }
    case 'topRight': {
      styleStr = `
        left:initial !important;
        top:initial !important;
        bottom:0;
        right:0;
      `
      break
    }
  }
  return styleStr
}

function getTextPadding(props: WrapperProps) {
  const { boxLeftOffset: left = 0, boxRightOffset: right = 0, boxTextAlign = 'left', iconConfig } =
    props.optionBoxConfig || {}
  const { display = true, rightOffset = 0 } = iconConfig || {}

  const pleft = boxTextAlign === 'left' ? left : 0,
    iconOffset = display ? rightOffset : 0,
    pright = boxTextAlign === 'right' ? iconOffset + right : iconOffset

  return `0 ${pright}px 0 ${pleft}px`
}

export const DropdownWrapper = styled.div<WrapperProps>`
  width: 100%;
  position: relative;

  .ant-dropdown {
    min-width: ${props => props.dropdownConfig?.dropWidth}px !important;
    width: ${props => props.dropdownConfig?.dropWidth}px;
    ${({ dropdownConfig, offsetHeight }) => getDropDownPosition(dropdownConfig || ({} as DropDownConfig), offsetHeight)}

    ul.ant-dropdown-menu {
      transform: ${props => `translate(${props.dropdownConfig?.xOffset}px,${props.dropdownConfig?.yOffset}px)`};
      width: 100%;
      height: ${props =>
        numberIsEmpty(props.dropdownConfig?.dropHeight) ? props.dropdownConfig?.dropHeight + 'px' : 'auto'};
      background: ${props => props.dropdownConfig?.dropBgColor};
      border: ${props => getBorderStyle(props.dropdownConfig?.dropBorderStyle, 'drop').b};
      border-radius: ${props => getBorderStyle(props.dropdownConfig?.dropBorderStyle, 'drop').r};
      line-height: ${props => props.optionLine.lineHeight}px;

      ${({ dropdownConfig }) =>
        dropdownConfig?.horcroll?.display
          ? setScroll(dropdownConfig?.horcroll, 'y')
          : `
          overflow-y: scroll;
          overflow-x: hidden;
          &::-webkit-scrollbar {
            display: block;
            width: 0px;
            height: 0px;
            background-color: transparent;
          }

          &::-webkit-scrollbar-thumb {
            background-color: transparent;
            border-radius: 4px;
          }

          &::-webkit-scrollbar-corner {
            display: none;
          }`}

      .ant-dropdown-menu-item-active {
        background: ${props =>
          props.optionLine.hoverStyle.hoverType
            ? props.optionLine.hoverStyle.rowHoverBgColor
            : props.optionLine.plainStyle.rowBgColor} !important;
        color: ${props =>
          props.optionLine.hoverStyle.hoverType
            ? props.optionLine.hoverStyle.rowHoverColor
            : props.optionLine.plainStyle.rowColor} !important;
      }
      > .ant-dropdown-menu-item {
        min-height: ${props => props.optionLine.lineHeight}px;
        padding: ${props => `0 ${props.optionLine.downBoxLeftOffset}px`};
        margin-bottom: ${props => props.optionLine.rowSpacing}px;
        background-color: ${props => props.optionLine.plainStyle.rowBgColor};
        color: ${props => props.optionLine.plainStyle.rowColor};
      }

      .ant-dropdown-menu-item-group {
        .ant-dropdown-menu-item-group-title {
          min-height: ${props => props.optionLine.lineHeight}px;
          background: ${props => props.dropdownConfig?.parentStyle.rowBgColor};
          color: ${props => props.dropdownConfig?.parentStyle.rowColor};
          padding: ${props => `0 ${props.optionLine.downBoxLeftOffset}px`};
          margin-bottom: ${props => props.optionLine.rowSpacing}px;
        }
        .ant-dropdown-menu-item-group-list {
          .ant-dropdown-menu-item {
            min-height: ${props => props.optionLine.lineHeight}px;
            background-color: ${props => props.optionLine.plainStyle.rowBgColor};
            color: ${props => props.optionLine.plainStyle.rowColor};
            padding: ${props => `0 ${props.optionLine.downBoxLeftOffset}px`};
            margin-bottom: ${props => props.optionLine.rowSpacing}px;
          }
        }
      }

      .ant-dropdown-menu-submenu {
        .ant-dropdown-menu-submenu-title {
          min-height: ${props => props.optionLine.lineHeight}px;
          background: ${props => props.dropdownConfig?.parentStyle.rowBgColor};
          color: ${props => props.dropdownConfig?.parentStyle.rowColor};
          padding: ${props => `0 ${props.optionLine.downBoxLeftOffset}px`};
          margin-bottom: ${props => props.optionLine.rowSpacing}px;
        }
      }
    }
  }
  .lcz-drop-down-button {
    width: 100%;
    background: ${props => props.optionBoxConfig?.boxBgColor};
    /* padding-left: ${props => props.optionBoxConfig?.boxLeftOffset}px; */
    border: ${props => getBorderStyle(props.optionBoxConfig?.boxBorderStyle, 'btn').b};
    border-radius: ${props => getBorderStyle(props.optionBoxConfig?.boxBorderStyle, 'btn').r};

    &:hover {
      border-color: ${props => props.optionBoxConfig?.boxBorderStyle?.boxHoverBorderC};
    }

    .lcz-dropdown-icon {
      position: relative;
      right: ${props => props.optionBoxConfig?.iconConfig?.rightOffset}px;
    }

    .text {
      color: ${props => props.optionBoxConfig?.boxColor?.color};
      flex: 1;
      text-align: ${props => props.optionBoxConfig?.boxTextAlign || 'left'};
      padding: ${props => getTextPadding(props)};
    }
  }
`

interface ClobalStyleProps {
  globalStyle: TextStyle
  optionLine: OptionLine
  dropdownConfig: DropDownConfig
  popupid: string
}
export const Globalstyle = createGlobalStyle<ClobalStyleProps>`
 .${props => `lcz-drop-submenu-popup-${props.popupid}`}{
   font-size: ${props => props.globalStyle.fontSize}px;
   font-family: ${props => props.globalStyle.fontFamily};
   letter-spacing: ${props => props.globalStyle.letterSpacing}px;
   font-weight: ${props => props.globalStyle.fontWeight};

    .ant-dropdown-menu-item-active {
        background: ${props =>
          props.optionLine.hoverStyle.hoverType
            ? props.optionLine.hoverStyle.rowHoverBgColor
            : props.optionLine.plainStyle.rowBgColor} !important;
        color: ${props =>
          props.optionLine.hoverStyle.hoverType
            ? props.optionLine.hoverStyle.rowHoverColor
            : props.optionLine.plainStyle.rowColor}!important;
      }

   .ant-dropdown-menu{
      background: ${props => props.dropdownConfig?.dropBgColor};
      border: ${props => getBorderStyle(props.dropdownConfig?.dropBorderStyle, 'drop').b};
      border-radius: ${props => getBorderStyle(props.dropdownConfig?.dropBorderStyle, 'drop').r};
      line-height: ${props => props.optionLine.lineHeight}px;

      .ant-dropdown-menu-item{
        min-height: ${props => props.optionLine.lineHeight}px;
        padding: 0 12px;
        margin-bottom: ${props => props.optionLine.rowSpacing}px;
        background-color: ${props => props.optionLine.plainStyle.rowBgColor};
        color: ${props => props.optionLine.plainStyle.rowColor};
      }
   }
 }
`

interface IconStyleProps {
  occupy: boolean
  iconId: string
  randomId: string
  Iconfind: IconSeries
}
export const IconGlobal = createGlobalStyle<IconStyleProps>`
  ${props => `
    .ant-dropdown-menu-item{

        .lcz-menu-item-system-icon-${props.iconId}{
          color:${getComStyle(props, 'Iconfind.iconColor')};
          flex-shrink:0;
        }

        .lcz-menu-item-custom-icon-${props.iconId}{
          display: ${getComStyle(props, 'Iconfind.imgUrl') || props.occupy ? 'block' : 'none'};
          background-image: url(${getComStyle(props, 'Iconfind.imgUrl')});
          flex-shrink:0;
        }

        &.ant-dropdown-menu-item-active{
          .lcz-menu-item-system-icon-${props.iconId}{
            color:${getComStyle(props, 'Iconfind.iconHoverColor')};
          }
 
          .lcz-menu-item-custom-icon-${props.iconId}{
            ${
              getComStyle(props, 'Iconfind.hoverImgUrl') &&
              `background-image: url(${getComStyle(props, 'Iconfind.hoverImgUrl')})`
            }
          }
        }
      
      
    }`}

`
