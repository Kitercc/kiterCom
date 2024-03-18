/* eslint-disable indent */
import styled, { createGlobalStyle } from 'styled-components'
import { getColorObj, getComStyle } from '../../common/util'
import { ShadowConfig } from '../../LczCustomGraphics/type'
import { NavigationMenuProps, ChildPanel, BorderConfig, NavigationConfig, FocusStyle, IconSeries } from '../type'
import { setScroll } from '../../LczColumnTable/style/styled'

interface WrapperProps extends NavigationMenuProps {
  focusStyle: FocusStyle
}

export const MenuWrapper = styled.div<WrapperProps>`
  ${({ globalConfig }) =>
    globalConfig?.horcroll?.display
      ? setScroll(globalConfig?.horcroll, 'y')
      : `overflow-y: auto; 
        &::-webkit-scrollbar {
          display: none; 
        }`}

  .ant-menu-root {
    padding: ${props => getStyle(props, 'margin')};
    background: ${({ globalConfig }) => getStyle(globalConfig, 'rootBg')};
    border: ${({ globalConfig }) => getStyle(globalConfig, 'borderConfig')};
    .ant-menu {
      background: transparent;
    }
    > .ant-menu-submenu > .ant-menu-sub {
      background: ${({ globalConfig }) => getStyle(globalConfig, 'childBg')};
    }

    &.ant-menu > .ant-menu-item,
    .ant-menu-item-group-list > .ant-menu-item {
      margin-top: ${({ rowStyle }) => getComStyle(rowStyle, 'rowSpacing')}px;
      margin-bottom: 0;
    }

    &.ant-menu {
      > li:first-of-type {
        margin-top: 0;
        > *:first-of-type {
          margin-top: 0;
        }
      }
    }

    .ant-menu-item-group-title {
      font-size: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.fontSize')}px;
      color: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.color')};
      font-weight: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.fontWeight')};
      padding-top: 0;
      padding-bottom: 0;
      height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px;
      line-height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px;
      margin-top: ${({ rowStyle }) => getComStyle(rowStyle, 'rowSpacing')}px;
    }

    .ant-menu-item,
    .ant-menu-submenu-title {
      padding-top: 0;
      padding-bottom: 0;
      margin-top: ${({ rowStyle }) => getComStyle(rowStyle, 'rowSpacing')}px;
      margin-bottom: 0px;
      height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px !important;
      line-height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px !important;
      font-family: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.fontFamily')};
      letter-spacing: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.letterSpacing')}px;
      font-size: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontSize')}px;
      color: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')};
      font-weight: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontWeight')};
      overflow: hidden;

      .lcz-memu-expandIcon {
        position: absolute;
        right: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.rightOffset')}px;
        font-size: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.size')}px;
        color: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.color')};

        &.lcz-memu-expand-inline {
          transition: transform 0.3s;
          transform: rotate(0deg);
        }

        &.lcz-memu-expand-vertical {
          transform: rotate(-90deg);
        }
      }
    }

    &.ant-menu-submenu-vertical,
    .ant-menu-submenu-title,
    .ant-menu-item {
      display: flex;
      align-items: center;
    }

    .ant-menu-submenu-open > .ant-menu-submenu-title > .lcz-memu-expand-inline {
      transform: rotate(180deg);
    }

    ${({ rowStyle }) =>
      getComStyle(rowStyle, 'hoverStyle.display')
        ? '.ant-menu-item:hover,.ant-menu-item-active,.ant-menu:not(.ant-menu-line) .antd-menu-submenu-open,.antd-menu-submenu-active,.antd-menu-submenu-title:hover'
        : '.ant-menu-item-active-1212asas'} {
      background-color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.rowBg')} !important;

      ${({ rowStyle }) =>
        getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.display')
          ? `
          font-size: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontSize')}px;
          color: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.color')};
          font-weight:${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontWeight')};
      `
          : ` 
          color:${getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')}; `}

      .lcz-memu-expandIcon {
        color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.arrowColor')};
      }
    }

    ${({ rowStyle }) =>
      getComStyle(rowStyle, 'hoverStyle.display') ? '.ant-menu-submenu-active' : '.ant-menu-item-active-1212asas'} {
      > .ant-menu-submenu-title {
        background-color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.rowBg')};
        ${({ rowStyle }) =>
          getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.display')
            ? `
          font-size: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontSize')}px;
          color: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.color')};
          font-weight:${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontWeight')};
      `
            : ` 
          color:${getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')}; `}

        .lcz-memu-expandIcon {
          color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.arrowColor')};
        }
      }
    }

    /* 选中样式 */
    ${({ focusStyle }) =>
      getComStyle(focusStyle, 'display')
        ? `
      .ant-menu-submenu-selected> .ant-menu-submenu-title,
      .ant-menu-item-selected{ 

        ${
          getComStyle(focusStyle, 'focusFontStyle.display') &&
          `
            color:${getComStyle(focusStyle, 'focusFontStyle.color')} !important;
            font-size:${getComStyle(focusStyle, 'focusFontStyle.fontSize')}px !important;
            font-weight:${getComStyle(focusStyle, 'focusFontStyle.fontWeight')} !important;
          `
        }

        .lcz-memu-expandIcon{
          color:${getComStyle(focusStyle, 'arrowColor')};
        }
      }
 
      
      &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: ${getComStyle(focusStyle, 'rowBg')} !important;
       }
    `
        : ` 
        &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
          background-color: rgba(255,255,255,0);
        }
    
    `}
  }

  /* 选中线条 */
  .ant-menu-vertical .ant-menu-item-selected::after,
  .ant-menu-vertical-left .ant-menu-item-selected::after,
  .ant-menu-vertical-right .ant-menu-item-selected::after,
  .ant-menu-inline .ant-menu-item-selected::after {
    right: ${({ focusStyle }) => (getComStyle(focusStyle, 'tagLine.position') === 'right' ? 0 : 'initial')};
    left: ${({ focusStyle }) => (getComStyle(focusStyle, 'tagLine.position') === 'left' ? 0 : 'initial')};
    border-right: ${({ focusStyle }) => getStyle(focusStyle, 'tagLine')};
    opacity: 1;
    transform: scaleY(1);
  }
`

function getStyle(
  config: WrapperProps | NavigationConfig | FocusStyle | undefined,
  type: 'margin' | 'rootBg' | 'childBg' | 'borderConfig' | 'tagLine'
) {
  if (type === 'margin') {
    const { globalConfig } = config as WrapperProps
    return globalConfig?.margin ? `${globalConfig?.margin.top}px 0px ${globalConfig?.margin.bottom}px 0px` : '0'
  }
  if (type === 'rootBg' || type === 'childBg') {
    const { bgConfig } = config as NavigationConfig
    if (!bgConfig || !bgConfig.display || !bgConfig[type]) return 'rgba(255, 255, 255, 0)'
    const { colorType, color } = getColorObj(bgConfig[type])
    if (colorType === 'gradient') {
      return `linear-gradient( ${color} )`
    } else {
      return color
    }
  }
  if (type === 'borderConfig') {
    const { borderConfig } = config as NavigationConfig
    if (!borderConfig || !borderConfig.display) return 'none'
    const { width = 1, color = '#313337' } = borderConfig as BorderConfig
    return `${width}px solid ${color}`
  }
  if (type === 'tagLine') {
    const _config = config as FocusStyle
    if (!_config[type] || !_config[type]?.display) return 'none'
    return `${_config['tagLine']?.width}px solid ${_config['tagLine']?.color}`
  }
}

interface ClobalStyleProps extends NavigationMenuProps {
  childPanel: ChildPanel
  randomId: string
  focusStyle: FocusStyle
}

export const Globalstyle = createGlobalStyle<ClobalStyleProps>`

  .${props => `lcz-vertical-menu-${props.randomId}`}{
    font-family: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.fontFamily')};
    letter-spacing: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.letterSpacing')}px;
    font-size:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontSize')}px;
    color:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')};
    font-weight:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontWeight')}; 

    .ant-menu ul, .ant-menu ol,.ant-menu li{
      overflow: hidden;
    }

    .ant-menu-submenu-title {
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      letter-spacing: inherit;
      font-weight: inherit;
      display:flex;
      align-items: center;
    }

    .ant-menu-vertical{
      width: ${({ childPanel }) => childPanel.width}px;
      min-width: ${({ childPanel }) => childPanel.width}px;
      border: ${({ childPanel }) => getBorderShadow(childPanel?.borderConfig, 'border')};
      box-shadow: ${({ childPanel }) => getBorderShadow(childPanel?.outShadow, 'shadow')};
      padding: ${({ globalConfig }) => getStyle(globalConfig, 'margin')};
      background: ${({ globalConfig }) => getStyle(globalConfig, 'childBg')};
      font-family: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.fontFamily')};
      letter-spacing: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.letterSpacing')}px;
      font-size:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontSize')}px;
      color:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')};
      font-weight:${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.ordTextStyle.fontWeight')}; 
      .ant-menu-item{
        display: flex;
        align-items: center;
      }

      &.ant-menu-sub{
        >li:first-of-type{
          margin-top:0;

          > *:first-child{
            margin-top:0;
          }
        }
      }
    }

     .ant-menu-item-group-title {
      font-size: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.fontSize')}px;
      color: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.color')};
      font-weight: ${({ globalConfig }) => getComStyle(globalConfig, 'textStyle.groupStyle.fontWeight')};
      margin-top:${({ rowStyle }) => getComStyle(rowStyle, 'rowSpacing')}px;
      margin-bottom: 0;
      padding-top: 0;
      padding-bottom: 0;
      height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px;
      line-height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px;
    }
 

    .ant-menu-item,
    .ant-menu-submenu-title {
      padding-top: 0;
      padding-bottom: 0;
      margin-top:${({ rowStyle }) => getComStyle(rowStyle, 'rowSpacing')}px;
      margin-bottom:0 !important;
      height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px !important;
      line-height: ${({ rowStyle }) => getComStyle(rowStyle, 'rowHeight')}px !important;

      .lcz-memu-expandIcon  {
        position: absolute;
        letter-spacing: 0;
        right: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.rightOffset')}px;
        font-size: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.size')}px;
        color: ${({ rowStyle }) => getComStyle(rowStyle, 'ordStyle.arrow.color')};
         &.lcz-memu-expand-vertical {
          transform: rotate(-90deg);
        }
      }
    }

    .ant-menu-item .ant-menu-item-icon ,
    .ant-menu-submenu-title .ant-menu-item-icon ,
    .ant-menu-item .anticon ,
    .ant-menu-submenu-title .anticon  {
      &+ span,
      &+ i{
        margin-left: ${({ rowStyle }) => getComStyle(rowStyle, 'iconTextSpace')}px;
      } 
    }

     ${({ rowStyle }) =>
       getComStyle(rowStyle, 'hoverStyle.display')
         ? '.ant-menu-item:hover,.ant-menu-item-active,.ant-menu:not(.ant-menu-line) .antd-menu-submenu-open,.antd-menu-submenu-active,.antd-menu-submenu-title:hover'
         : '.ant-menu-item-active-1212asas'} {
      background-color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.rowBg')} !important;

      ${({ rowStyle }) =>
        getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.display')
          ? `
          font-size: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontSize')}px;
          color: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.color')};
          font-weight:${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontWeight')};
      `
          : ` 
          color:${getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')}; `}

      .lcz-memu-expandIcon {
        color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.arrowColor')};
      }
    }

    ${({ rowStyle }) =>
      getComStyle(rowStyle, 'hoverStyle.display') ? '.ant-menu-submenu-active' : '.ant-menu-item-active-1212asas'} {
      > .ant-menu-submenu-title {
        background-color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.rowBg')} !important;
        ${({ rowStyle }) =>
          getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.display')
            ? `
          font-size: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontSize')}px;
          color: ${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.color')};
          font-weight:${getComStyle(rowStyle, 'hoverStyle.hoverFontStyle.fontWeight')};
      `
            : ` 
          color:${getComStyle(rowStyle, 'ordStyle.ordTextStyle.color')}; `}

        .lcz-memu-expandIcon {
          color: ${({ rowStyle }) => getComStyle(rowStyle, 'hoverStyle.arrowColor')};
        }
      }
    }

    /* 选中样式 */
    ${({ focusStyle }) =>
      getComStyle(focusStyle, 'display')
        ? `
      .ant-menu-submenu-selected> .ant-menu-submenu-title,
      .ant-menu-item-selected>.ant-menu-title-content{ 
          ${
            getComStyle(focusStyle, 'focusFontStyle.display') &&
            `
            color:${getComStyle(focusStyle, 'focusFontStyle.color')} !important;
            font-size:${getComStyle(focusStyle, 'focusFontStyle.fontSize')}px !important;
            font-weight:${getComStyle(focusStyle, 'focusFontStyle.fontWeight')} !important;
          `
          }

        .lcz-memu-expandIcon{
          color:${getComStyle(focusStyle, 'arrowColor')} ;
        }
      }
 
      
      &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color: ${getComStyle(focusStyle, 'rowBg')} !important;
       }
    `
        : ` 
      &.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
        background-color:rgba(255,255,255,0);
       }
    
    `}

    .ant-menu-vertical .ant-menu-item-selected::after,
    .ant-menu-vertical-left .ant-menu-item-selected::after,
    .ant-menu-vertical-right .ant-menu-item-selected::after  {
      right: ${({ focusStyle }) => (getComStyle(focusStyle, 'tagLine.position') === 'right' ? 0 : 'initial')};
      left: ${({ focusStyle }) => (getComStyle(focusStyle, 'tagLine.position') === 'left' ? 0 : 'initial')};
      border-right: ${({ focusStyle }) => getStyle(focusStyle, 'tagLine')};
      opacity: 1;
      transform: scaleY(1);
    }
  }

`

function getBorderShadow(config: BorderConfig | ShadowConfig | undefined, type: 'border' | 'shadow' = 'border') {
  if (!config || !config.display) return 'none'
  if (type === 'border') {
    const { width = 1, color = '#313337' } = config as BorderConfig
    return `${width}px solid ${color}`
  }
  if (type === 'shadow') {
    const { x: outX, y: outY, vague: outV, extend: outE, color: outC } = config as ShadowConfig
    return `${outX}px ${outY}px ${outV}px ${outE}px ${outC}`
  }
}

interface IconStyleProps {
  iconId: string
  randomId: string
  Iconfind: IconSeries
}

export const IconGlobal = createGlobalStyle<IconStyleProps>`
  ${props => `
  .lcz-menu-wrapper-${props.randomId},
  .lcz-vertical-menu-${props.randomId}{
    
    .lcz-menu-item-system-icon-${props.iconId}{
      letter-spacing: 0;
        color:${getComStyle(props, 'Iconfind.iconColor')};
    }

    .lcz-menu-item-custom-icon-${props.iconId}{
      background-image: url(${getComStyle(props, 'Iconfind.imgUrl')})
    }

    .ant-menu-item:hover,.ant-menu-item-active,.ant-menu:not(.ant-menu-inline) 
    .ant-menu-submenu-open,.ant-menu-submenu-active,.ant-menu-submenu-title:hover{

      >.ant-menu-submenu-title .lcz-menu-item-system-icon-${props.iconId},
      >.lcz-menu-item-system-icon-${props.iconId}{
        color:${getComStyle(props, 'Iconfind.iconHoverColor')};
      }

      >.ant-menu-submenu-title .lcz-menu-item-custom-icon-${props.iconId},
      >.lcz-menu-item-custom-icon-${props.iconId}{
       ${
         getComStyle(props, 'Iconfind.hoverImgUrl') &&
         `background-image: url(${getComStyle(props, 'Iconfind.hoverImgUrl')})`
       }
      }
    }

    .ant-menu-submenu-selected> .ant-menu-submenu-title,
    .ant-menu-item-selected{

       .lcz-menu-item-system-icon-${props.iconId}{
        color:${getComStyle(props, 'Iconfind.iconFocusColor')} !important;
      }

      .lcz-menu-item-custom-icon-${props.iconId}{
        ${
          getComStyle(props, 'Iconfind.focusImgUrl') &&
          `background-image: url(${getComStyle(props, 'Iconfind.focusImgUrl')}) !important;`
        }
      }
    }
  }`}
   
`
