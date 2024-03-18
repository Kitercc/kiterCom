import styled from 'styled-components'
import { CSSProperties } from 'react'
import { DatePicker as M_DatePicker } from 'antd-mobile'

import { TextBoxBorder, BoxIcon, YearsStyle, DateStyle, ClearIcon, DatePickerConfig } from '../type'
interface StyleProps {
  textBoxBorder?: TextBoxBorder
  textAlign?: string
  boxIcon?: BoxIcon
  boxFontWeight?: any
  yearsStyle?: YearsStyle
  dateStyle?: DateStyle
  clearIcon?: ClearIcon
  focusTextColor?: string
  focusBgcolor?: string
  datePickerH: number
  datePickerConfig: DatePickerConfig
}

function getDropDownPosition(props: StyleProps) {
  const { datePickerH = 0, datePickerConfig } = props,
    { pickerTopOffset = 0, pickerAlign = 'left', pickerLeftOffset = 0 } = datePickerConfig
  const topOffset = datePickerH + pickerTopOffset

  switch (pickerAlign) {
    case 'left': {
      return `
        left:${pickerLeftOffset}px !important;
        top: ${topOffset}px !important;
      `
    }
    case 'right': {
      return `
        left: initial !important;
        top: ${topOffset}px !important;
        right:${-pickerLeftOffset}px;
      `
    }
  }
}

export const DatePickerWrapper = styled.div<StyleProps>`
  /* 文本框 */
  .ant-picker {
    border-width: ${props => (props.textBoxBorder?.display ? props.textBoxBorder?.borderWidth : 0)}px !important;
    border-style: solid;
    border-color: ${props => props.textBoxBorder?.borderColor};
    border-radius: ${props => (props.textBoxBorder?.display ? props.textBoxBorder?.borderRadius : 0)}px;
  }
  .ant-picker:hover {
    border-color: ${props => (props.textBoxBorder?.display ? props.textBoxBorder?.boxHoverBorderC : 'none')};
  }

  .ant-picker-focused {
    border-color: ${props => (props.textBoxBorder?.display ? props.textBoxBorder?.boxFocusBorderC : 'none')};
  }

  .ant-picker-input {
    font-weight: ${props => props.boxFontWeight};

    .ant-picker-clear {
      margin-right: ${props => props.clearIcon?.rightOffSet}px;
      .anticon-close-circle {
        > svg {
          display: ${props => (props.clearIcon?.display ? 'block' : 'none')};
          color: ${props => props.clearIcon?.color};
          font-size: ${props => props.clearIcon?.iconSize}px;
        }
      }
    }
  }
  .ant-picker-input > input {
    text-align: ${props => props.textAlign};
  }

  .ant-picker-suffix {
    display: ${props => (props.boxIcon?.display ? 'block' : 'none')};
    font-size: ${props => props.boxIcon?.boxIconSize}px;
    color: ${props => props.boxIcon?.boxIconColor} !important;
    margin-right: ${props => props.boxIcon?.boxIconSpac}px !important;
    margin-left: ${props => props.boxIcon?.boxIconOffSetLeft}px !important;
  }
  /* 日期下拉框 */
  .dropdownClassName {
    transition: all 0.1s linear;
    overflow: hidden;
    border-style: solid;
    border-width: ${props => props.datePickerConfig.pickerBorderWidth}px;
    border-color: ${props => props.datePickerConfig.pickerBorderColor};
    border-radius: ${props => props.datePickerConfig.PickerRadius}px;
    ${props => getDropDownPosition(props)}
    .ant-picker-panel {
      border-bottom: none;
    }
  }
  .ant-picker-decade-panel {
    .ant-picker-content {
      max-width: ${props => Math.max(props.dateStyle!.fontSize || 0, props.yearsStyle?.fontSize || 0) * 20}px;
      min-width: ${props => Math.max(props.dateStyle!.fontSize || 0, props.yearsStyle?.fontSize || 0) * 20}px;
    }
  }
  .ant-picker-content {
    max-width: ${props => Math.max(props.dateStyle!.fontSize || 0, props.yearsStyle?.fontSize || 0) * 12}px;
    min-width: ${props => Math.max(props.dateStyle!.fontSize || 0, props.yearsStyle?.fontSize || 0) * 12}px;
  }
  .ant-picker-header .ant-picker-header-view {
    font-size: ${props => props.yearsStyle?.fontSize}px;
    color: ${props => props.yearsStyle?.color} !important;
    font-weight: ${props => props.yearsStyle?.fontWeight};
    border-color: ${props => props.dateStyle?.divisionColor};
    border-width: ${props => props.dateStyle?.divisionWidth}px;
  }

  .ant-picker-header,
  .ant-picker-footer {
    line-height: ${props => props.dateStyle!.fontSize + 6}px;
    border-color: ${props => props.dateStyle?.divisionColor};
    border-width: ${props => props.dateStyle?.divisionWidth}px;
  }

  .ant-picker-cell-in-view.ant-picker-cell-selected {
    .ant-picker-cell-inner {
      background: ${props => props.focusBgcolor} !important;
      color: ${props => props.focusTextColor} !important;
    }
  }

  .ant-picker-cell-disabled::before {
    height: ${props => props.dateStyle?.fontSize}px;
  }
`

interface GlobalWraooerOrios {
  popupStyle: CSSProperties
  datePickerConfig?: DatePickerConfig
  dateStyle: DateStyle
  children: React.ReactNode
}

export const MobilePickerWrapper = styled(M_DatePicker)<GlobalWraooerOrios>`
  font-family: ${props => props.popupStyle.fontFamily};
  background: ${props => props.popupStyle.background};
  color: ${props => props.popupStyle.color};
  font-size: ${props => props.popupStyle.fontSize}px;
  font-weight: ${props => props.popupStyle.fontWeight};
  letter-spacing: ${props => props.popupStyle.letterSpacing}px;
  border-radius: ${props => `${props.datePickerConfig?.PickerRadius}px ${props.datePickerConfig?.PickerRadius}px 0 0`};
  overflow: hidden;
  border-top: ${props =>
    `${props.datePickerConfig?.pickerBorderWidth}px solid ${props.datePickerConfig?.pickerBorderColor}`};

  .am-picker-col-item {
    font-size: inherit;
    color: inherit;
    opacity: 1;
  }

  .am-picker-col-item-selected {
    color: ${props => props.dateStyle.focusTextColor};
    transition: color 0.2s;
  }

  .am-picker-col-indicator {
    background: ${props => props.dateStyle.focusBgcolor};
    z-index: 1;
  }

  .am-picker-col-mask {
    background: inherit;
  }

  .am-picker-popup-header {
    color: #3d99fc;

    .am-picker-popup-item {
      color: inherit;
      font-size: inherit;
    }

    .am-picker-popup-item-active {
      background: rgba(0, 0, 0, 0.2);
      user-select: none;
    }

    &::after {
      transform: scale(1) !important;
      background-color: ${props => props.datePickerConfig?.pickerBorderColor} !important;
      height: ${props => props.datePickerConfig?.pickerBorderWidth}px !important;
    }
  }

  .am-picker-col-indicator {
    &::before,
    &::after {
      background-color: ${props => props.datePickerConfig?.pickerBorderColor} !important;
      height: ${props => props.datePickerConfig?.pickerBorderWidth}px !important;
    }
  }
`
