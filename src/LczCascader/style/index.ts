/* eslint-disable indent */
import styled from 'styled-components'
import { alignType, colorFunc, numberIsEmpty } from '../../common/util'
import { setScroll } from '../../LczColumnTable/style/styled'
import { ArrowDown, BgConfig, BorderConfig, OptionConfig, OptionLine, PanelConfig, TextStyle } from '../type'

interface CascaderWrapperProps {
  gloablTextStyle?: TextStyle
  optionConfig: OptionConfig
  panelConfig: PanelConfig
  optionLine: OptionLine
  height: number
  isSystem: boolean
  design: boolean
}

function getBorderStyle(borderConfig?: BorderConfig) {
  const { display = true, color = '#fff', width = 1 } = borderConfig || {}
  if (!display) return 'none'
  return `${width}px solid ${color}`
}

function getOptionRightOffset(arrowDown?: ArrowDown) {
  const { display, arrowType, iconSize = 0, imgWidth = 0, rightOffset = 0 } = arrowDown || {}
  if (!display) return 0
  if (arrowType === 'system') return iconSize + rightOffset + 6
  return imgWidth + rightOffset + 6
}

function getBgColorObj(bgConfig?: BgConfig, bgCode = 'bgType') {
  const { display = false, bgColor, imgUrl = '', radius = 0 } = bgConfig || {},
    bgType = bgConfig?.[bgCode] || 'color'
  if (!display) return ''
  if (bgType === 'color') {
    const { color, colorType } = colorFunc(bgColor)
    if (colorType === 'single') return `border-radius:${radius}px;background-image:none;background-color: ${color};`
    return `border-radius:${radius}px;background-image: ${color};`
  }
  return `border-radius:${radius}px;background-image: url(${imgUrl});`
}

function getRowBgStyle(obj: any, filed, bgCode = 'bgColor') {
  const type = obj[filed] || 'color',
    colorObj = obj[bgCode],
    imgUrl = obj.imageUrl

  if (type === 'color') {
    const { color, colorType } = colorFunc(colorObj)
    if (colorType === 'single') return `background-image:none;background-color: ${color};`
    return `background-image: ${color};`
  }
  return `background-image: url(${imgUrl});background-size:100% 100%;`
}

export const CascaderWrapper = styled.div<CascaderWrapperProps>`
  .ant-cascader {
    width: 100%;
    ${props =>
      numberIsEmpty(props.optionConfig.height)
        ? `
          .ant-select-selector{
            height: ${props.optionConfig.height}px !important;
            display: flex;
            align-items: center;

            .ant-select-selection-search {
              max-height:100%;
              overflow: hidden;
            }

             .ant-select-selection-item{
                height:${props.optionConfig.height}px;
                 
                .lcz-cascader-custom-val{
                  height: ${props.optionConfig.height}px;
                  overflow: hidden;
                  display: flex;
                  flex:1;
                  align-items: center;
                }
             }
          }
          `
        : `
           
        `}

    .lcz-cascader-custom-bg,
    .ant-select-arrow,
    .ant-select-clear {
      pointer-events: ${props => (props.design ? 'none' : 'auto')};
    }

    &.ant-select-focused {
      .ant-select-selection-item {
        .lcz-cascader-custom-bg {
          border-color: ${({ optionConfig }) => optionConfig.borderConfig?.focusColor};
          box-shadow: none;
          ${({ optionConfig }) =>
            optionConfig.bgConfig?.display ? getBgColorObj(optionConfig.bgConfig?.focusStyle, 'focusBgType') : ''}
        }
      }

      ${({ optionConfig }) =>
        optionConfig.textConfig?.display && optionConfig.textConfig?.focusStyle?.display
          ? `
          .ant-select-selection-item,
          .ant-select-selection-search-input {
            color: ${optionConfig.textConfig?.focusStyle?.color};
            font-weight: ${optionConfig.textConfig?.focusStyle?.fontWeight};
          }
        `
          : ''}
    }

    &:hover {
      ${({ optionConfig }) =>
        optionConfig.textConfig?.display && optionConfig.textConfig?.hoverStyle?.display
          ? `
            .ant-select-selection-item,
            .ant-select-selection-search-input {
              color: ${optionConfig.textConfig?.hoverStyle?.color};
              font-weight: ${optionConfig.textConfig?.hoverStyle?.fontWeight};
            }
          `
          : ''}

      .ant-select-selection-item  .lcz-cascader-custom-bg {
        border-color: ${({ optionConfig }) => optionConfig.borderConfig?.hoverColor};
        ${({ optionConfig }) =>
          optionConfig.bgConfig?.display ? getBgColorObj(optionConfig.bgConfig?.hoverStyle, 'hoverBgType') : ''}
      }
    }

    .ant-select-selection-item {
      padding-left: ${({ optionConfig }) => optionConfig.textConfig?.contentLeft}px !important;
      padding-right: ${({ optionConfig }) => getOptionRightOffset(optionConfig.arrowDown)}px !important;

      .lcz-cascader-custom-bg {
        ${({ optionConfig }) => getBgColorObj(optionConfig.bgConfig)}
        border: ${({ optionConfig }) => getBorderStyle(optionConfig.borderConfig)};
      }

      .lcz-cascader-custom-val {
        justify-content: ${({ optionConfig }) => alignType[optionConfig.textConfig?.textAlign || 'left']};
      }
    }

    .ant-select-arrow {
      display: ${({ optionConfig }) => (optionConfig.arrowDown?.display ? 'block' : 'none')};
      width: ${({ optionConfig }) =>
        optionConfig.arrowDown?.arrowType === 'system' ? 'auto' : optionConfig.arrowDown?.imgWidth + 'px'};
      height: ${({ optionConfig }) =>
        optionConfig.arrowDown?.arrowType === 'system'
          ? optionConfig.arrowDown.iconSize
          : optionConfig.arrowDown?.imgHeight}px;
      right: ${({ optionConfig }) => optionConfig.arrowDown?.rightOffset}px;
      transform: translateY(-50%);
    }

    .ant-select-selection-search {
      padding-left: ${({ optionConfig }) => optionConfig.textConfig?.contentLeft}px;
      padding-right: ${({ optionConfig }) => getOptionRightOffset(optionConfig.arrowDown)}px;
      .ant-select-selection-search-input {
        border: none !important;
        box-shadow: none;

        &::-webkit-input-placeholder {
          color: ${({ optionConfig }) => optionConfig.textConfig?.textStyle.color};
        }
        &::-moz-placeholder {
          color: ${({ optionConfig }) => optionConfig.textConfig?.textStyle.color};
        }
        &::-moz-placeholder {
          color: ${({ optionConfig }) => optionConfig.textConfig?.textStyle.color};
        }
        &::-ms-input-placeholder {
          color: ${({ optionConfig }) => optionConfig.textConfig?.textStyle.color};
        }
      }
    }

    .ant-select-clear {
      color: ${({ optionConfig }) => optionConfig.clearIcon?.color};
      font-size: ${({ optionConfig }) => optionConfig.clearIcon?.size}px;
      width: ${({ optionConfig }) => optionConfig.clearIcon?.size}px;
      height: ${({ optionConfig }) => optionConfig.clearIcon?.size}px;
      right: ${({ optionConfig }) => optionConfig.clearIcon?.right}px;
      margin-top: 0;
      transform: translateY(-50%);
      border-radius: 50%;
    }
  }

  &.lcz-cascader-wrapper-open {
    .ant-select-arrow {
      transform: translateY(-50%)
        rotate(${({ optionConfig }) => (optionConfig.arrowDown?.animate ? '-180deg' : '0deg')});
    }
  }
  .ant-select-dropdown {
    top: ${props => props.height}px!important;
    left: ${props => props.panelConfig?.xOffset || 0}px !important;
    background: ${({ panelConfig }) =>
      panelConfig.panelBgConfig.display ? panelConfig.panelBgConfig.bgColor : 'transparent'};
    border-radius: ${({ panelConfig }) =>
      panelConfig.panelBgConfig.display ? panelConfig.panelBgConfig.radius : '0'}px;
    border: ${({ panelConfig }) => getBorderStyle(panelConfig.panelBorderConfig)};
    padding: 0;

    .ant-cascader-menu {
      min-width: ${props => props.panelConfig?.width || 0}px;
      width: ${props => props.panelConfig?.width || 0}px;
      font-size: ${({ panelConfig }) => panelConfig.optionLine?.fontSize}px;
      padding: ${({ panelConfig }) => `${panelConfig.padding?.y || 0}px ${panelConfig.padding?.x || 0}px`};
      border-right: ${({ panelConfig }) => getBorderStyle(panelConfig.panelBorderConfig)};
      height: ${({ panelConfig }) => (numberIsEmpty(panelConfig?.height) ? `${panelConfig?.height}px` : 'auto')};
      margin: 0;
      border-radius: 0;

      ${props =>
        props.panelConfig.horcroll?.display
          ? setScroll(props.panelConfig.horcroll, 'y')
          : ` &::-webkit-scrollbar {
                display: none;
                background-color: transparent
              }`}

      &:last-of-type {
        border: none;
      }

      .ant-cascader-menu-item {
        padding: 0 ${({ optionLine }) => optionLine?.lineMargin}px;
        height: ${({ optionLine }) => optionLine?.rowHeight}px;
        line-height: ${({ optionLine }) => optionLine?.rowHeight}px;
        font-family: ${props => props.gloablTextStyle?.fontFamily};
        letter-spacing: ${props => props.gloablTextStyle?.letterSpacing}px;
        margin-top: ${({ optionLine }) => optionLine?.rowSpacing}px;
        color: ${({ optionLine }) => optionLine?.plainStyle.rowColor};
        font-weight: ${({ optionLine }) => optionLine?.plainStyle.fontWeight};

        &:first-of-type {
          margin-top: 0;
        }

        ${({ optionLine }) => getRowBgStyle(optionLine.plainStyle, 'rowNormalBgType', 'rowBgColor')}

        ${({ optionLine }) =>
          optionLine.hoverStyle.hoverType
            ? `
              &:hover, 
              &.ant-cascader-menu-item-active:hover {
                color: ${optionLine.hoverStyle.color};
                font-weight: ${optionLine.hoverStyle.fontWeight};
                ${getRowBgStyle(optionLine.hoverStyle, 'rowHoverBgType')}

                .ant-cascader-menu-item-expand-icon {
                  color: ${optionLine.hoverStyle.arrowColor};
                }
              }
              `
            : ''}

        ${({ optionLine }) =>
          optionLine.activeStyle.activeType
            ? `
              &.ant-cascader-menu-item-active {
                ${getRowBgStyle(optionLine.activeStyle, 'rowActiveBgType')}
                color: ${optionLine.activeStyle.color};
                font-weight: ${optionLine.activeStyle.fontWeight};

                .ant-cascader-menu-item-expand-icon {
                  color: ${optionLine.activeStyle.arrowColor};
                }
              }

              .lcz-cascader-filter-item-active {
                color: ${optionLine.activeStyle.color};
                font-weight: ${optionLine.activeStyle.fontWeight};

                .ant-cascader-menu-item-expand-icon {
                  color: ${optionLine.activeStyle.arrowColor};
                }
              }
              `
            : ''}

        &.ant-cascader-menu-item-disabled {
          width: 100%;
          height: 100%;
          > div {
            display: none;
          }

          &:hover {
            background: none;
            color: normal;
          }
        }
        .ant-cascader-menu-item-expand-icon {
          right: ${({ optionLine }) => optionLine.lineMargin}px;
          color: ${({ optionLine }) => optionLine.plainStyle.arrowColor};
        }
      }
    }
  }
`
