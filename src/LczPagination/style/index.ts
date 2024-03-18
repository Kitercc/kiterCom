/* eslint-disable indent */
import styled from 'styled-components'
import { GlobalBgColor, GlobalTextStyle, LczPaginationProps, OptionLineNormalStyle } from '../type'
import { getComStyle } from '../../common/util'
import { Shadow } from '../../LczSearch/type'
interface WrapperProps extends LczPaginationProps {
  selectHeight: number
}

export const LczPaginationWrapper = styled.div<WrapperProps>`
  //分页器的主体分页
  .ant-pagination-prev,
  .ant-pagination-next {
    display: ${props => (props.globalConfig.prevBtn ? '' : 'none')};
  }
  .ant-pagination-options,
  .ant-pagination-total-text {
    height: ${props => props.globalConfig.height + 'px'};
    line-height: ${props => props.globalConfig.height + 'px'};
  }
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-prev,
  .ant-pagination-item {
    margin-right: ${props => props.globalConfig.padding + 'px'};
  }
  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev,
  .ant-pagination-item {
    user-select: none;
    width: ${props => props.globalConfig.width + 'px'};
    height: ${props => props.globalConfig.height + 'px'};
    line-height: ${props => props.globalConfig.height + 'px'};
    border-radius: ${props => props.globalConfig.radius + 'px'};
    .ant-pagination-item-ellipsis {
      color: ${props => props.elliptical.color};
    }
  }
  .ant-pagination-item {
    ${props => getBgStyle(props.globalConfig.globalBgColor, 'globalBgType', 'normal')};
    border: ${props => getBoder(props.globalConfig.globalBorder, 'color')};
    a {
      ${props => getTextStyle(props.globalConfig.globalTextStyle)};
    }
    &.ant-pagination-item-active {
      ${props => getBgStyle(props.globalConfig.globalBgColor, 'globalBgType', 'active')};
      border: ${props => getBoder(props.globalConfig.globalBorder, 'activeColor')};
      a {
        color: ${props => getComStyle(props.globalConfig, 'globalTextStyle.activeColor')};
      }
    }
    &:hover {
      ${props => getBgStyle(props.globalConfig.globalBgColor, 'globalBgType', 'hover')};
      border: ${props => getBoder(props.globalConfig.globalBorder, 'hoverColor')};
      a {
        color: ${props => getComStyle(props.globalConfig, 'globalTextStyle.hoverColor')};
      }
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    button {
      ${props => getBgStyle(props.globalConfig.globalBgColor, 'globalBgType', 'normal')};
      border: ${props => getBoder(props.globalConfig.globalBorder, 'color')};
      border-radius: ${props => props.globalConfig.radius + 'px'};
      color: ${props => getComStyle(props.globalConfig, 'globalTextStyle.color')};
      &:hover {
        ${props => getBgStyle(props.globalConfig.globalBgColor, 'globalBgType', 'hover')};
        border: ${props => getBoder(props.globalConfig.globalBorder, 'hoverColor')};
        color: ${props => getComStyle(props.globalConfig, 'globalTextStyle.hoverColor')};
      }
    }
  }

  //总条数
  .ant-pagination-total-text {
    margin-right: ${props => props.totalConfig.padding + 'px'};
    > div {
      ${props => getTextStyle(props.totalConfig.textStyle)};
      span:nth-child(1) {
        margin-right: ${props => getComStyle(props.totalConfig, 'prefix.padding') + 'px'};
      }
      span:nth-child(2) {
        margin-left: ${props => getComStyle(props.totalConfig, 'suffix.padding') + 'px'};
      }
    }
  }

  .ant-pagination-options {
    //选择每页条数
    .ant-select {
      .ant-select-dropdown {
        left: 0 !important;
        top: ${props => props.selectHeight}px !important;
      }
      margin-left: ${props => props.pageSizeConfig?.padding + 'px'};
      .ant-select-selector {
        height: auto;
        background-color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownBgColor.color')};
        border: ${props => getBoder(props.pageSizeConfig?.dropDownConfig.dropDownlBorder, 'color')};
        padding: ${props =>
          `${getComStyle(props.pageSizeConfig, 'dropDownConfig.yPadding')}px ${getComStyle(
            props.pageSizeConfig,
            'dropDownConfig.xPadding'
          )}px`};
        ${props => getTextStyle(props.pageSizeConfig?.dropDownConfig.dropDownTextStyle)};
      }
      .ant-select-arrow {
        color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownTextStyle.color')};
      }
      &:hover {
        .ant-select-selector {
          background-color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownBgColor.hoverColor')};
          border: ${props => getBoder(props.pageSizeConfig?.dropDownConfig.dropDownlBorder, 'hoverColor')};
          color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownTextStyle.hoverColor')};
        }
      }
      &.ant-select-focused {
        .ant-select-selector {
          background-color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownBgColor.activeColor')};
          border: ${props => getBoder(props.pageSizeConfig?.dropDownConfig.dropDownlBorder, 'activeColor')};
          box-shadow: none;
          color: ${props => getComStyle(props.pageSizeConfig, 'dropDownConfig.dropDownTextStyle.activeColor')};
        }
      }

      //下拉子面板
      .ant-select-dropdown {
        padding: ${props =>
          `${getComStyle(props.pageSizeConfig, 'subPanel.subGlobalConfig.ySubPadding')}px ${getComStyle(
            props.pageSizeConfig,
            'subPanel.subGlobalConfig.xSubPadding'
          )}px`};
        background-color: ${props => getComStyle(props.pageSizeConfig, 'subPanel.background.color')};
        border: ${props => getBoder(props.pageSizeConfig?.subPanel.border, 'color')};
        border-radius: ${props => getComStyle(props.pageSizeConfig, 'subPanel.border.radius') + 'px'};
        ${props => getShadowStyle(props.pageSizeConfig?.subPanel.outShadow)};
        .rc-virtual-list-holder-inner {
          .ant-select-item {
            min-height: ${props => getComStyle(props.pageSizeConfig, 'subPanel.subGlobalConfig.height') + 'px'};
            line-height: ${props => getComStyle(props.pageSizeConfig, 'subPanel.subGlobalConfig.height') + 'px'};
            ${props => getSubStyle(props.pageSizeConfig?.subPanel.optionLine, 'normalStyle')};
            &.ant-select-item-option-active {
              ${props => getSubStyle(props.pageSizeConfig?.subPanel.optionLine, 'normalStyle')};
            }
            &:hover {
              ${props =>
                getSubStyle(props.pageSizeConfig?.subPanel.optionLine, 'hoverStyle', 'optionLineHoverDisplay')};
            }
            &.ant-select-item-option-selected {
              ${props =>
                getSubStyle(props.pageSizeConfig?.subPanel.optionLine, 'activeStyle', 'optionLineActiveDisplay')};
            }
          }
        }
      }
    }

    //跳转组件
    .ant-pagination-options-quick-jumper {
      margin-left: ${props => props.skipConfig.padding + 'px'};
      ${props => getTextStyle(props.skipConfig.textStyle)};
      > input {
        margin-left: ${props => getComStyle(props.skipConfig, 'suffix.padding') + 'px'};
        width: ${props => getComStyle(props.skipConfig, 'inputConfig.width') + 'px'};
        height: ${props => getComStyle(props.skipConfig, 'inputConfig.height') + 'px'};
        ${props => getTextStyle(props.skipConfig.inputConfig.inputTextStyle)};
        background-color: ${props => getComStyle(props.skipConfig, 'inputConfig.inputBgColor.color')};
        border: ${props => getBoder(props.skipConfig.inputConfig.inputBorder, 'color')};
        &:hover {
          background-color: ${props => getComStyle(props.skipConfig, 'inputConfig.inputBgColor.hoverColor')};
          border: ${props => getBoder(props.skipConfig.inputConfig.inputBorder, 'hoverColor')};
        }
        &:focus {
          background-color: ${props => getComStyle(props.skipConfig, 'inputConfig.inputBgColor.activeColor')};
          box-shadow: none;
          border: ${props => getBoder(props.skipConfig.inputConfig.inputBorder, 'activeColor')};
        }
      }
      > span {
        margin-left: ${props => getComStyle(props.skipConfig, 'confirmBtnConfig.margin') + 'px'};
        button {
          ${props => getBgStyle(props.skipConfig.confirmBtnConfig.btnBgColor, 'btnBgType', 'normal')};
          padding: ${props =>
            `${getComStyle(props.skipConfig, 'confirmBtnConfig.padding.yPadding')}px ${getComStyle(
              props.skipConfig,
              'confirmBtnConfig.padding.xPadding'
            )}px`};
          border: ${props => getBoder(props.skipConfig.confirmBtnConfig.btnBorder, 'color')};
          ${props => getTextStyle(props.skipConfig.confirmBtnConfig.btnTextStyle)};

          &:hover {
            ${props => getBgStyle(props.skipConfig.confirmBtnConfig.btnBgColor, 'btnBgType', 'hover')};
            border: ${props => getBoder(props.skipConfig.confirmBtnConfig.btnBorder, 'hoverColor')};
          }
        }
      }
    }
  }
`

const getBoder = (data: any, type) => {
  if (!data.display) {
    return 'none'
  } else {
    return `${data.width}px solid ${data[type]}`
  }
}

const getBgStyle = (data: GlobalBgColor, type: string, colorStatus: string) => {
  const bgType = data[type]
  const colorObj = {
    color: {
      normal: 'color',
      hover: 'hoverColor',
      active: 'activeColor'
    },
    custom: {
      normal: 'img',
      hover: 'hoverImg',
      active: 'activeImg'
    }
  }

  if (bgType === 'color') {
    return `background-color: ${data[colorObj[bgType][colorStatus]]};`
  } else {
    return `background-image:url('${data[colorObj[bgType][colorStatus]]}');
    background-size: 100% 100%;
`
  }
}

const getTextStyle = (data: GlobalTextStyle | undefined) => {
  const styleStr = `
    font-family: ${data?.fontFamily};
    color: ${data?.color};
    font-size: ${data?.fontSize || 0}px;
    font-weight: ${data?.fontWeight};
    letter-spacing: ${data?.letterSpacing || 0}px;`
  return styleStr
}

const getShadowStyle = (data: Shadow | undefined) => {
  let shadowVal = ''
  if (data?.display) {
    shadowVal = `${data.xOffset}px ${data.yOffset}px ${data.vague}px ${data.extend}px ${data.color}`
  } else {
    shadowVal = 'none'
  }
  return `box-shadow:${shadowVal};`
}

function getSubStyle(config: any, type: 'normalStyle' | 'hoverStyle' | 'activeStyle', file?: string) {
  let data: OptionLineNormalStyle
  if (file && config[type][file]) {
    data = config[type]
  } else {
    data = config.normalStyle
  }
  const { textStyle, background } = data
  const styleStr = `
    font-family: ${textStyle?.fontFamily};
    color: ${textStyle?.color};
    font-size: ${textStyle?.fontSize || 0}px;
    font-weight: ${textStyle?.fontWeight};
    letter-spacing: ${textStyle?.letterSpacing || 0}px;
    background-color: ${background?.color}
    `

  return styleStr
}
