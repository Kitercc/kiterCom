/* eslint-disable indent */
import styled from 'styled-components'
import { colorFunc } from '../../common/util'
import { setScroll } from '../../LczColumnTable/style/styled'
import { NormalStyle, MainPanel, HoverStyle, ActiveStyle, SubPanel, OptionLineNormalStyle } from '../type'

interface WrapperProps {
  mainPanel: MainPanel
  subPanel: SubPanel
  submenuIshorizontal: boolean
}

export const LczHorizontalMenuWrapper = styled.div<WrapperProps>`
  .lcz-horizontal-menu-list {
    ${props => getStyle(props.mainPanel.normalStyle)}

    .lcz-menu-nav-item:hover,.lcz-menu-nav-item.active:hover {
      ${props => getStyle(props.mainPanel.hoverStyle, 'hover', props.mainPanel.normalStyle)}
    }

    .lcz-menu-nav-item.active {
      ${props => getStyle(props.mainPanel.activeStyle, 'active', props.mainPanel.normalStyle)}
    }

    .lcz-menu-submenu-item {
      ${({ subPanel }) => getSubStyle(subPanel.optionLine?.normalStyle)}
    }

    .lcz-menu-submenu-item.active {
      ${({ subPanel }) => getSubStyle(subPanel.optionLine?.activeStyle, 'active')}
    }

    .lcz-menu-submenu-item:hover,
    .lcz-menu-submenu-item.active:hover {
      ${({ subPanel }) => getSubStyle(subPanel.optionLine?.hoverStyle, 'hover')}
    }

    .lcz-menu-submenu-wrapper:hover {
      & ~ .lcz-menu-nav-item {
        background-color: red !important;
      }
    }
  }

  .lcz-menu-submenu-list {
    ${({ subPanel, submenuIshorizontal }) =>
      subPanel.horcroll?.display
        ? setScroll(subPanel.horcroll, submenuIshorizontal ? 'x' : 'y')
        : `overflow-y:scroll;::-webkit-scrollbar {
          display: none;
          background-color: transparent
        }`}
  }
`

function getStyle(
  config?: NormalStyle | HoverStyle,
  type: 'hover' | 'normal' | 'active' = 'normal',
  normal?: NormalStyle
) {
  if (
    (type === 'hover' && !(config as HoverStyle)?.mainHoverDisplay) ||
    (type === 'active' && !(config as ActiveStyle)?.mainActiveDisplay)
  ) {
    return ''
  }

  const { background, textStyle, border, inShadow, outShadow } = config || {}
  let styleStr = `
    font-family: ${textStyle?.fontFamily};
    color: ${textStyle?.color};
  `,
    itemStr = ''

  if (type === 'normal') {
    styleStr += `
      font-size: ${textStyle?.fontSize || 0}px;
      font-weight: ${textStyle?.fontWeight};
      letter-spacing: ${textStyle?.letterSpacing || 0}px;`
  }

  if (background?.display) {
    const { color, imageUrl } = background
    let _type = 'color'
    switch (type) {
      case 'normal': {
        _type = background.normalBgType || 'color'
        break
      }
      case 'hover': {
        _type = background.hoverBgType || 'color'
        break
      }
      case 'active': {
        _type = background.activeBgType || 'color'
        break
      }
    }
    if (_type === 'color') {
      const { color: c, colorType } = colorFunc(color)
      if (colorType === 'single') {
        itemStr += `background-color: ${c};background-image:none;`
      } else {
        itemStr += `background-image: ${c};`
      }
    } else {
      itemStr += `background-image: url(${imageUrl});`
    }
  }

  if (border?.display) {
    const { color = '#fff', width = 1, radius = 0 } = border || {}
    itemStr += `border:${width}px solid ${color};border-radius: ${radius}px;`
  }

  let shadowVal = ''
  if (outShadow?.display) {
    shadowVal = `${outShadow.xOffset}px ${outShadow.yOffset}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
  } else if (normal?.outShadow?.display) {
    const outShadow = normal?.outShadow
    shadowVal = `${outShadow.xOffset}px ${outShadow.yOffset}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
  }

  if (inShadow?.display) {
    shadowVal = `${shadowVal ? `${shadowVal}, ` : ''}${inShadow.xOffset}px ${inShadow.yOffset}px ${inShadow.vague}px ${
      inShadow.extend
    }px ${inShadow.color} inset`
  } else if (normal?.inShadow?.display) {
    const inShadow = normal?.inShadow
    shadowVal = `${shadowVal ? `${shadowVal}, ` : ''}${inShadow.xOffset}px ${inShadow.yOffset}px ${inShadow.vague}px ${
      inShadow.extend
    }px ${inShadow.color} inset`
  }

  if (shadowVal) {
    itemStr += `box-shadow:${shadowVal};`
  }

  if (type === 'normal') {
    return `${styleStr}
              .lcz-menu-nav-item{${itemStr}}`
  }

  return styleStr + itemStr
}

function getSubStyle(config?: OptionLineNormalStyle, type: 'hover' | 'normal' | 'active' = 'normal') {
  const { textStyle, background } = config || {}

  if ((type === 'hover' && !config?.optionLineHoverDisplay) || (type === 'active' && !config?.optionLineActiveDisplay))
    return ''

  let styleStr = `
    font-family: ${textStyle?.fontFamily};
    color: ${textStyle?.color};
    font-size: ${textStyle?.fontSize || 0}px;
    font-weight: ${textStyle?.fontWeight};
    letter-spacing: ${textStyle?.letterSpacing || 0}px;`

  if (background?.display) {
    const { color, imageUrl } = background
    let _type = 'color'
    switch (type) {
      case 'normal': {
        _type = background.optionLineNormalBgType || 'color'
        break
      }
      case 'hover': {
        _type = background.optionLineHoverBgType || 'color'
        break
      }
      case 'active': {
        _type = background.optionLineActiveBgType || 'color'
        break
      }
    }
    if (_type === 'color') {
      const { color: c, colorType } = colorFunc(color)
      if (colorType === 'single') {
        styleStr += `background-color: ${c};background-image:none;`
      } else {
        styleStr += `background-image: ${c};`
      }
    } else {
      styleStr += `background-image: url(${imageUrl});`
    }
  }
  return styleStr
}
