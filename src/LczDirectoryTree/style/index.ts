/* eslint-disable indent */
import styled from 'styled-components'
import { getColorObj, getComStyle } from '../../common/util'
import { TreeProps, ConnectLine, TextBox, BorderConfig, LineStyle } from '../type'

import { setScroll } from '../../LczColumnTable/style/styled'
import { ScrollConfig } from '../../LczColumnTable/type'

interface WrapperProps extends TreeProps {
  connectLine: ConnectLine
  horcroll: ScrollConfig
}

export const DirectoryTreeWrapper = styled.div<WrapperProps>`
  .lcz-directory-tree-container {
    ${({ horcroll }) =>
      horcroll?.display
        ? setScroll(horcroll, 'y')
        : `overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
            background-color: transparent
          }`}
  }
  .ant-tree {
    .iconfont,
    .ant-tree-iconEle {
      letter-spacing: 0;
    }

    .ant-tree-treenode {
      height: ${({ lineStyle }) => getComStyle(lineStyle, 'lineHeight')}px;
      margin-bottom: ${({ lineStyle }) => getComStyle(lineStyle, 'lineSpeed')}px;
      .ant-tree-title {
        font-size: ${({ styleConfig }) => getComStyle(styleConfig, 'fontSize')}px;
        color: ${({ styleConfig }) => getComStyle(styleConfig, 'color')};
        font-weight: ${({ styleConfig }) => getComStyle(styleConfig, 'fontWeight')};
      }
      .lcz-icon-iconEle-stowed {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.stowed.color')};
      }
      .lcz-icon-iconEle-expand {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.expand.color')};
      }
      .lcz-icon-iconEle-child {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'childNode.color')};
      }

      .lcz-img-iconEle-stowed {
        display: ${({ iconConfig }) => (getComStyle(iconConfig, 'parentNode.stowed.imgUrl') ? 'block' : 'none')};
        background-image: ${({ iconConfig }) => `url(${getComStyle(iconConfig, 'parentNode.stowed.imgUrl')})`};
      }
      .lcz-img-iconEle-expand {
        display: ${({ iconConfig }) => (getComStyle(iconConfig, 'parentNode.expand.imgUrl') ? 'block' : 'none')};
        background-image: ${({ iconConfig }) => `url(${getComStyle(iconConfig, 'parentNode.expand.imgUrl')})`};
      }
      .lcz-img-iconEle-child {
        display: ${({ iconConfig }) => (getComStyle(iconConfig, 'childNode.imgUrl') ? 'block' : 'none')};
        background-image: ${({ iconConfig }) => `url(${getComStyle(iconConfig, 'childNode.imgUrl')})`};
      }

      &:hover {
        .lcz-icon-iconEle-stowed {
          color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.stowed.hoverColor')};
        }
        .lcz-icon-iconEle-expand {
          color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.expand.hoverColor')};
        }
        .lcz-icon-iconEle-child {
          color: ${({ iconConfig }) => getComStyle(iconConfig, 'childNode.hoverColor')};
        }

        .lcz-img-iconEle-stowed {
          background-image: ${({ iconConfig }) =>
            getComStyle(iconConfig, 'parentNode.stowed.hoverImgUrl') &&
            `url(${getComStyle(iconConfig, 'parentNode.stowed.hoverImgUrl')})`};
        }
        .lcz-img-iconEle-expand {
          background-image: ${({ iconConfig }) =>
            getComStyle(iconConfig, 'parentNode.expand.hoverImgUrl') &&
            `url(${getComStyle(iconConfig, 'parentNode.expand.hoverImgUrl')})`};
        }
        .lcz-img-iconEle-child {
          background-image: ${({ iconConfig }) =>
            getComStyle(iconConfig, 'childNode.hoverImgUrl') &&
            `url(${getComStyle(iconConfig, 'childNode.hoverImgUrl')})`};
        }

        ${({ styleConfig }) =>
          getComStyle(styleConfig, 'hoverStyle.display')
            ? `
              .ant-tree-title{
                font-size: ${getComStyle(styleConfig, 'hoverStyle.fontSize')}px;
                color: ${getComStyle(styleConfig, 'hoverStyle.color')};
                font-weight: ${getComStyle(styleConfig, 'hoverStyle.fontWeight')};
              }
              `
            : ''}

        .ant-tree-switcher:not(.ant-tree-switcher-noop) {
          .lcz-switcher-icon {
            color: ${({ arrowConfig }) => getComStyle(arrowConfig, 'hoverColor')};
          }
        }
        &::before {
          background: ${({ lineStyle }) => getStyle(lineStyle, 'hoverBgColor')};
        }
      }
    }

    &.ant-tree-directory .ant-tree-treenode-selected:hover,
    &.ant-tree-directory .ant-tree-treenode-selected {
      .lcz-switcher-icon {
        color: ${({ arrowConfig }) => getComStyle(arrowConfig, 'focusColor')}!important;
      }

      .lcz-icon-iconEle-stowed {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.stowed.focusColor')};
      }
      .lcz-icon-iconEle-expand {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'parentNode.expand.focusColor')};
      }
      .lcz-icon-iconEle-child {
        color: ${({ iconConfig }) => getComStyle(iconConfig, 'childNode.focusColor')};
      }

      .lcz-img-iconEle-stowed {
        background-image: ${({ iconConfig }) =>
          getComStyle(iconConfig, 'parentNode.stowed.focusImgUrl') &&
          `url(${getComStyle(iconConfig, 'parentNode.stowed.focusImgUrl')})`};
      }
      .lcz-img-iconEle-expand {
        background-image: ${({ iconConfig }) =>
          getComStyle(iconConfig, 'parentNode.expand.focusImgUrl') &&
          `url(${getComStyle(iconConfig, 'parentNode.expand.focusImgUrl')})`};
      }
      .lcz-img-iconEle-child {
        background-image: ${({ iconConfig }) =>
          getComStyle(iconConfig, 'childNode.focusImgUrl') &&
          `url(${getComStyle(iconConfig, 'childNode.focusImgUrl')})`};
      }

      ${({ styleConfig }) =>
        getComStyle(styleConfig, 'focusStyle.display')
          ? `
              .ant-tree-title{
                font-size: ${getComStyle(styleConfig, 'focusStyle.fontSize')}px;
                color: ${getComStyle(styleConfig, 'focusStyle.color')};
                font-weight: ${getComStyle(styleConfig, 'focusStyle.fontWeight')};
              }
              `
          : ''}

      &::before {
        background: ${({ lineStyle }) => getStyle(lineStyle, 'focusBgColor')};
      }
    }

    .ant-tree-treenode-leaf-last .ant-tree-switcher-leaf-line::before {
      height: ${({ lineStyle }) => getComStyle(lineStyle, 'lineHeight')}px !important;
      bottom: 50% !important;
    }

    .ant-tree-switcher-leaf-line::after {
      width: ${({ lineStyle }) => getComStyle(lineStyle, 'indent')}px;
      height: ${({ lineStyle }) => getComStyle(lineStyle, 'lineHeight')}px;
      margin-left: 0;
      bottom: 50%;
    }

    .ant-tree-node-content-wrapper {
      min-height: ${({ lineStyle }) => getComStyle(lineStyle, 'lineHeight')}px;
      line-height: 1;
    }
    .ant-tree-switcher {
      height: ${({ lineStyle }) => getComStyle(lineStyle, 'lineHeight')}px;
      line-height: 1;
      margin-right: ${({ arrowConfig }) => getComStyle(arrowConfig, 'speed')}px;
      .lcz-switcher-icon {
        transform: rotate(-90deg);
        transition: transform 0.3s;
        font-size: ${({ arrowConfig }) => getComStyle(arrowConfig, 'size')}px;
        color: ${({ arrowConfig }) => getComStyle(arrowConfig, 'color')};
      }

      &.ant-tree-switcher_open {
        .lcz-switcher-icon {
          transform: rotate(0deg);
        }
      }
    }

    .ant-tree-indent-unit {
      width: ${({ lineStyle }) => getComStyle(lineStyle, 'indent')}px;
    }

    .ant-tree-switcher {
      width: ${({ connectLine, lineStyle }) =>
        getComStyle(connectLine, 'display') ? `${getComStyle(lineStyle, 'indent')}px` : 'unset'};
    }

    .ant-tree-indent-unit-start,
    .ant-tree-switcher-leaf-line,
    .ant-tree-indent-unit {
      &::before,
      &::after {
        border-width: ${({ connectLine }) => connectLine.width}px;
        border-color: ${({ connectLine }) => connectLine.color};
      }
    }
  }
`

interface SearchWrapperProps {
  textBox: TextBox
}

export const SelectWrapper = styled.div<SearchWrapperProps>`
  .ant-input-affix-wrapper {
    background-color: ${({ textBox }) => getComStyle(textBox, 'bgColor')};
    border: ${({ textBox }) => getStyle(textBox.borderConfig, 'border')};
    .ant-input-prefix {
      color: ${({ textBox }) => textBox.btnColor};
    }

    .ant-input {
      background-color: transparent;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      letter-spacing: inherit;
      color: ${({ textBox }) => getComStyle(textBox, 'searchTextStyle.textColor')};
      line-height: 1;

      &::-webkit-input-placeholder {
        color: ${({ textBox }) => getComStyle(textBox, 'searchTextStyle.placeholderColor')};
      }
    }

    &.ant-input-affix-wrapper:hover {
      border-color: ${({ textBox }) => getComStyle(textBox, 'borderConfig.hoverColor')};
      border-right-width: ${({ textBox }) => getComStyle(textBox, 'borderConfig.width')}px;
    }

    &.ant-input-affix-wrapper.ant-input-affix-wrapper-focused,
    &.ant-input-affix-wrapper.ant-input-affix-wrapper:focus {
      border-color: ${({ textBox }) => getComStyle(textBox, 'borderConfig.focusColor')};
      border-right-width: ${({ textBox }) => getComStyle(textBox, 'borderConfig.width')}px;
      box-shadow: none;
    }
  }
`

function getStyle(
  target: BorderConfig | LineStyle | undefined,
  type: 'border' | 'hoverBgColor' | 'focusBgColor' = 'border'
) {
  if (type === 'border') {
    const { display, width, color } = (target || {}) as BorderConfig
    if (!target || !display) return 'none'
    return `${width}px solid ${color}`
  }

  if (type === 'hoverBgColor' || type === 'focusBgColor') {
    if (!target || !target?.[type]) return 'none'
    const { color, colorType } = getColorObj(target[type])
    if (colorType == 'single') {
      return color
    }
    return `linear-gradient( ${color} )`
  }
}
