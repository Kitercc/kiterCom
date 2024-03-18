import styled from 'styled-components'
import { DateIntervalProps, DatePickerConfig, GlobalStyle, TextBoxConfig } from '../type'
import {
  defaultCurrentTime,
  defaultCutdownArea,
  defaultCutoffRule,
  defaultDefaultStyle,
  defaultDisabledArea,
  defaultExtendArea,
  defaultGolbalTextStyle,
  defaultPanelHead,
  defaultPickerBoder,
  defaultRapidOption,
  defaultSelectedArea
} from '../common/defaultValue'

interface DateInervalWrapperProps extends DateIntervalProps {
  datePickerH: number
  dateCurrentTime: any
  dataTypePicker: string
}

function getDropDownPosition(props: DateInervalWrapperProps) {
  const { datePickerH, datePickerConfig } = props,
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

export const DateInervalWrapper = styled.div<DateInervalWrapperProps>`
  /* 文本框 */
  .ant-picker {
    font-family: ${props => getGolbalStyle(props.globalStyle, 'golbalTextStyle', 'fontFamily')};
    background-color: ${props => props.textBoxConfig?.boxBgColor};
    border-radius: ${props => props.textBoxConfig?.borderRadius}px;
    border: ${props => getTextBoxStyle(props.textBoxConfig, 'textBox', 'border')};
    padding: 4px ${props => props.textBoxConfig?.leftAndRightMargin}px;
    border-style: ${props => getTextBoxStyle(props.textBoxConfig, 'textBox', 'dispaly')};
    &:hover {
      border-color: ${props => getTextBoxStyle(props.textBoxConfig, 'textBox', 'hoverBorder')};
    }
    //输入框
    .ant-picker-input {
      > input {
        color: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'color')};
        font-size: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'fontSize')};
        font-weight: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'fontWeight')};
        font-family: inherit;
        letter-spacing: ${props => getGolbalStyle(props.globalStyle, 'golbalTextStyle', 'letterSpacing')};

        &::placeholder {
          color: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'placeholderColor')};
          font-size: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'fontSize')};
          font-weight: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'fontWeight')};
        }
      }
    }

    //中间的连接符
    .ant-picker-range-separator {
      color: ${props => getTextBoxStyle(props.textBoxConfig, 'inputText', 'color')};
    }

    //输入框右侧清除按钮
    .ant-picker-clear {
      color: ${props => getTextBoxStyle(props.textBoxConfig, 'clearIcon', 'color')};
      font-size: ${props => getTextBoxStyle(props.textBoxConfig, 'clearIcon', 'fontSize')};
      display: ${props => getTextBoxStyle(props.textBoxConfig, 'clearIcon', 'dispaly')};
      background-color: ${props => props.textBoxConfig?.boxBgColor};
    }

    //输入框日历图标
    .ant-picker-suffix {
      color: ${props => getTextBoxStyle(props.textBoxConfig, 'suffixIcon', 'color')};
      font-size: ${props => getTextBoxStyle(props.textBoxConfig, 'suffixIcon', 'fontSize')};
      display: ${props => getTextBoxStyle(props.textBoxConfig, 'suffixIcon', 'dispaly')};
      order: ${props => getTextBoxStyle(props.textBoxConfig, 'suffixIcon', 'order')};
    }
  }
  /* 文本框激活颜色 */
  .ant-picker-focused {
    border-color: ${props => getTextBoxStyle(props.textBoxConfig, 'focused', 'borderColor')};
  }

  /* 快捷面板 */
  .dateinterval-panel-container {
    display: flex;
    flex-direction: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'location')};
    .range-quick-selector {
      height: ${props => (props.dataTypePicker == 'date' ? 269 : 305)}px;
      display: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'display')};
      width: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'width')};
      padding: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'areaMargin')};
      .quick-item {
        cursor: pointer;
        font-size: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'fontSize')};
        margin-bottom: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'optionMargin')};
        font-weight: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'fontWeight')};
        color: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'color')};
        &:hover {
          display: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'hoverDisplay')};
          font-size: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'hoverFontSize')};
          font-weight: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'hoverFontWeight')};
          color: ${props => getDatePickStyle(props.datePickerConfig, 'rapidOption', 'hoverColor')};
        }
      }
    }
  }
  /* 展开选择面板 */
  .ant-picker-dropdown {
    ${props => getDropDownPosition(props)};

    font-family: ${props => getGolbalStyle(props.globalStyle, 'golbalTextStyle', 'fontFamily')};
    .ant-picker-range-arrow {
      display: none;
    }

    .ant-picker-panel-container {
      background-color: ${props => props.datePickerConfig.pickerBgColor};
      border-radius: ${props => props.datePickerConfig.PickerRadius}px;
      border: ${props => getDatePickStyle(props.datePickerConfig, 'pickerBoder', 'border')};
      border-style: ${props => getDatePickStyle(props.datePickerConfig, 'pickerBoder', 'display')};

      .ant-picker-panels {
        > .ant-picker-panel:nth-child(1) {
          border-left: ${props => getDatePickStyle(props.datePickerConfig, 'cutoffRule', 'leftBorder')};
          border-bottom: none;
          border-right: none;
          border-top: none;
        }
        > .ant-picker-panel:nth-child(2) {
          border-left: ${props => getDatePickStyle(props.datePickerConfig, 'cutoffRule', 'border')};
          border-bottom: none;
          border-right: ${props => getDatePickStyle(props.datePickerConfig, 'cutoffRule', 'rightBorder')};
          border-top: none;
        }
      }
      .ant-picker-panel {
        .ant-picker-decade-panel,
        .ant-picker-year-panel,
        .ant-picker-month-panel,
        .ant-picker-date-panel {
          .ant-picker-header {
            border-bottom: ${props => getDatePickStyle(props.datePickerConfig, 'cutoffRule', 'border')};
            button {
              font-family: inherit;
            }
            .ant-picker-header-view {
              font-size: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'fontSize')};
              font-weight: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'fontWeight')};
              color: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'color')};
              > button {
                &:hover {
                  color: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'hoverColor')};
                }
              }
            }

            > button:not(.ant-picker-header-view) {
              color: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'buttonColor')};
              &:hover {
                color: ${props => getDatePickStyle(props.datePickerConfig, 'panelHead', 'buttonHoverColor')};
              }
            }
          }

          //选中区间背景颜色
          .ant-picker-cell-in-view.ant-picker-cell-in-range::before {
            background: ${props => getDatePickStyle(props.datePickerConfig, 'selectedArea', 'bgcolor')};
          }

          .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single)::before,
          .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single)::before {
            background-color: ${props => getDatePickStyle(props.datePickerConfig, 'selectedArea', 'bgcolor')};
          }

          //

          //选中区间内经过颜色
          .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-start
            .ant-picker-cell-inner::after,
          .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-end
            .ant-picker-cell-inner::after {
            background-color: ${props => getDatePickStyle(props.datePickerConfig, 'cutdownArea', 'bgcolor')};
          }

          &
            > :not(.ant-picker-date-panel)
            .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-start::before,
          &
            > :not(.ant-picker-date-panel)
            .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-end::before {
            background: ${props => getDatePickStyle(props.datePickerConfig, 'cutdownArea', 'bgcolor')};
          }

          .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover::before,
          .ant-picker-cell-in-view.ant-picker-cell-range-start.ant-picker-cell-range-hover::before,
          .ant-picker-cell-in-view.ant-picker-cell-range-end.ant-picker-cell-range-hover::before,
          .ant-picker-cell-in-view.ant-picker-cell-range-start:not(.ant-picker-cell-range-start-single).ant-picker-cell-range-hover-start::before,
          .ant-picker-cell-in-view.ant-picker-cell-range-end:not(.ant-picker-cell-range-end-single).ant-picker-cell-range-hover-end::before,
          .ant-picker-panel
            > :not(.ant-picker-date-panel)
            .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-start::before,
          .ant-picker-panel
            > :not(.ant-picker-date-panel)
            .ant-picker-cell-in-view.ant-picker-cell-in-range.ant-picker-cell-range-hover-end::before {
            background-color: ${props => getDatePickStyle(props.datePickerConfig, 'cutdownArea', 'bgcolor')};
          }

          .ant-picker-cell-disabled {
            .ant-picker-cell-inner {
              color: ${props => getDatePickStyle(props.datePickerConfig, 'disabledArea', 'color')};
              background-color: ${props => getDatePickStyle(props.datePickerConfig, 'disabledArea', 'bgcolor')};
            }

            &::before {
              background-color: ${props => getDatePickStyle(props.datePickerConfig, 'disabledArea', 'bgcolor')};
            }
          }

          .ant-picker-body {
            .ant-picker-content {
              /* 非本月 */
              .ant-picker-cell {
                color: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'notTodayColor')};
                /* color: blue; */
              }

              thead {
                th {
                  color: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'color')};
                  font-size: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'fontSize')};
                  font-weight: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'fontWeight')};
                }
              }

              tbody {
                /* 当前日期 */
                .ant-picker-cell-in-view {
                  &[title='${props => props.dateCurrentTime}'] {
                    .ant-picker-cell-inner {
                      color: ${props => getDatePickStyle(props.datePickerConfig, 'currentTime', 'color')};
                      background: ${props => getDatePickStyle(props.datePickerConfig, 'currentTime', 'bgcolor')};
                      &::before {
                        display: ${props => getDatePickStyle(props.datePickerConfig, 'currentTime', 'display')};
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: 1;
                        border: ${props => getDatePickStyle(props.datePickerConfig, 'currentTime', 'border')};
                        border: ${props => getDatePickStyle(props.datePickerConfig, 'currentTime', 'borderDisplay')};
                        border-radius: 2px;
                        content: '';
                      }
                    }
                  }
                }

                //日期
                .ant-picker-cell-in-view {
                  color: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'color')};
                  font-size: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'fontSize')};
                  font-weight: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'fontWeight')};
                }

                //选中日期
                .ant-picker-cell-in-view.ant-picker-cell-selected .ant-picker-cell-inner,
                .ant-picker-cell-in-view.ant-picker-cell-range-start .ant-picker-cell-inner,
                .ant-picker-cell-in-view.ant-picker-cell-range-end .ant-picker-cell-inner {
                  background: ${props => getDatePickStyle(props.datePickerConfig, 'selectedArea', 'selectBgColor')};
                  color: ${props => getDatePickStyle(props.datePickerConfig, 'selectedArea', 'color')};
                }

                //除选中外 经过颜色
                .ant-picker-cell:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner,
                .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end)
                  .ant-picker-cell-inner {
                  background: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'bgHoverColor')};
                  color: ${props => getDatePickStyle(props.datePickerConfig, 'defaultStyle', 'hoverColor')};
                }

                /* 选中区间延伸区边框 */

                .ant-picker-cell-in-view.ant-picker-cell-range-hover-start:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-end:not(.ant-picker-cell-in-range):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end)::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-start.ant-picker-cell-range-start-single::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-start.ant-picker-cell-range-start.ant-picker-cell-range-end.ant-picker-cell-range-end-near-hover::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-end.ant-picker-cell-range-start.ant-picker-cell-range-end.ant-picker-cell-range-start-near-hover::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-end.ant-picker-cell-range-end-single::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover:not(.ant-picker-cell-in-range)::after {
                  border-bottom: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'border')};
                  border-top: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'border')};
                  border: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'extendDisplay')};
                }
                tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover:last-child::after,
                tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover-start:last-child::after,
                .ant-picker-cell-in-view.ant-picker-cell-end.ant-picker-cell-range-hover-edge-end.ant-picker-cell-range-hover-edge-end-near-range::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-edge-end:not(.ant-picker-cell-range-hover-edge-end-near-range)::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-end::after {
                  border-right: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'border')};
                  border: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'extendDisplay')};
                }
                tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover:first-child::after,
                tr > .ant-picker-cell-in-view.ant-picker-cell-range-hover-end:first-child::after,
                .ant-picker-cell-in-view.ant-picker-cell-start.ant-picker-cell-range-hover-edge-start.ant-picker-cell-range-hover-edge-start-near-range::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-edge-start:not(.ant-picker-cell-range-hover-edge-start-near-range)::after,
                .ant-picker-cell-in-view.ant-picker-cell-range-hover-start::after {
                  border-left: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'border')};
                  border: ${props => getDatePickStyle(props.datePickerConfig, 'extendArea', 'extendDisplay')};
                }
              }
            }
          }
        }
      }
    }
  }
`

function getGolbalStyle(props: GlobalStyle, func = '', type = '') {
  const { golbalTextStyle = defaultGolbalTextStyle } = props

  if (func == 'golbalTextStyle') {
    if (type == 'fontFamily') {
      return golbalTextStyle.fontFamily
    }

    if (type == 'letterSpacing') {
      return `${golbalTextStyle.letterSpacing}px`
    }
  }
}

function getTextBoxStyle(props: TextBoxConfig, func = '', type = '') {
  const { textBoxBorder, inputTextStyle, boxIcon, clearIcon } = props

  if (func == 'textBox') {
    if (type == 'dispaly') {
      return textBoxBorder?.display ? '' : 'none'
    }
    if (type == 'border') {
      return `${textBoxBorder?.borderWidth}px solid ${textBoxBorder?.borderColor}`
    }
    if (type == 'hoverBorder') {
      return textBoxBorder?.boxHoverBorderC
    }
  }
  if (func == 'inputText') {
    if (type == 'color') {
      return inputTextStyle?.color
    }
    if (type == 'fontSize') {
      return `${inputTextStyle?.fontSize}px`
    }
    if (type == 'fontWeight') {
      return inputTextStyle?.fontWeight
    }
    if (type == 'placeholderColor') {
      return inputTextStyle?.placeholderColor
    }
  }

  if (func == 'clearIcon') {
    if (type == 'color') {
      return clearIcon?.color
    }
    if (type == 'fontSize') {
      return `${clearIcon?.iconSize}px`
    }
    if (type == 'dispaly') {
      return clearIcon?.display ? '' : 'none'
    }
  }
  if (func == 'suffixIcon') {
    if (type == 'color') {
      return boxIcon?.boxIconColor
    }
    if (type == 'fontSize') {
      return `${boxIcon?.boxIconSize}px`
    }
    if (type == 'dispaly') {
      return boxIcon?.display ? '' : 'none'
    }
    if (type == 'order') {
      return boxIcon?.boxIconLocation == 'left' ? -1 : 0
    }
  }
  if (func == 'focused') {
    if (type == 'borderColor') {
      return textBoxBorder?.boxFocusBorderC
    }
  }
}

function getDatePickStyle(props: DatePickerConfig, func = '', type = '') {
  const {
    pickerBoder = defaultPickerBoder,
    cutoffRule = defaultCutoffRule,
    panelHead = defaultPanelHead,
    defaultStyle = defaultDefaultStyle,
    currentTime = defaultCurrentTime,
    selectedArea = defaultSelectedArea,
    extendArea = defaultExtendArea,
    cutdownArea = defaultCutdownArea,
    disabledArea = defaultDisabledArea,
    rapidOption = defaultRapidOption
  } = props

  if (func == 'pickerBoder') {
    if (type == 'display') {
      return pickerBoder.display ? '' : 'none'
    }
    if (type == 'border') {
      return `${pickerBoder.width}px solid ${pickerBoder.color}`
    }
  }
  if (func == 'cutoffRule') {
    if (type == 'leftBorder') {
      if (rapidOption.display && rapidOption.location == 'left') {
        return `${cutoffRule.width}px solid ${cutoffRule.color}`
      } else {
        return 'none'
      }
    }
    if (type == 'border') {
      return `${cutoffRule.width}px solid ${cutoffRule.color}`
    }
    if (type == 'rightBorder') {
      if (rapidOption.display && rapidOption.location == 'right') {
        return `${cutoffRule.width}px solid ${cutoffRule.color}`
      } else {
        return 'none'
      }
    }
  }
  if (func == 'panelHead') {
    if (type == 'color') {
      return panelHead.defaultColor
    }
    if (type == 'fontSize') {
      return `${panelHead.fontSize}px`
    }
    if (type == 'fontWeight') {
      return panelHead.fontWeight
    }
    if (type == 'hoverColor') {
      return panelHead.hoverColor
    }
    if (type == 'buttonColor') {
      return panelHead.toggleButton.color
    }
    if (type == 'buttonHoverColor') {
      return panelHead.toggleButton.hoverColor
    }
  }

  if (func == 'currentTime') {
    if (type == 'display') {
      return currentTime.display ? '' : 'none'
    }
    if (type == 'color' && currentTime.display) {
      return currentTime.color
    }
    if (type == 'bgcolor' && currentTime.display) {
      return currentTime.bgcolor
    }
    if (type == 'borderDisplay') {
      return currentTime.currrentTimeBorder.display ? '' : 'none'
    }
    if (type == 'border') {
      return `${currentTime?.currrentTimeBorder.width}px solid ${currentTime?.currrentTimeBorder.color}`
    }
  }
  if (func == 'defaultStyle') {
    if (type == 'color') {
      return defaultStyle.color
    }
    if (type == 'fontSize') {
      return `${defaultStyle.fontSize}px`
    }
    if (type == 'fontWeight') {
      return defaultStyle.fontWeight
    }
    if (type == 'bgHoverColor') {
      return defaultStyle.bgHoverColor
    }
    if (type == 'notTodayColor') {
      return defaultStyle.notTodayColor
    }
    if (type == 'hoverColor') {
      return defaultStyle.hoverColor
    }
  }
  if (func == 'selectedArea') {
    if (type == 'bgcolor') {
      return selectedArea.bgcolor
    }
    if (type == 'color') {
      return selectedArea.selectTime.color
    }
    if (type == 'selectBgColor') {
      return selectedArea.selectTime.bgcolor
    }
  }

  if (func == 'extendArea') {
    if (type == 'border') {
      return `${extendArea.extendAreaBorder.width}px ${extendArea.extendAreaBorder.borderType} ${extendArea.extendAreaBorder.color}`
    }
    if (type == 'extendDisplay') {
      if (!extendArea.extendAreaBorder.display || !extendArea.display) {
        return 'none'
      } else {
        return ''
      }
    }
  }
  if (func == 'cutdownArea') {
    if (cutdownArea.display) {
      return cutdownArea.bgcolor
    } else {
      return selectedArea.bgcolor
    }
  }
  if (func == 'disabledArea') {
    if (type == 'bgcolor') {
      return disabledArea.bgcolor
    }
    if (type == 'color') {
      return disabledArea.color
    }
  }

  if (func == 'rapidOption') {
    if (type == 'display') {
      return rapidOption.display ? '' : 'none'
    }
    if (type == 'location') {
      return rapidOption.location == 'left' ? 'row' : 'row-reverse'
    }
    if (type == 'width') {
      return `${rapidOption.width}px`
    }
    if (type == 'areaMargin') {
      return `${rapidOption.areaMargin.topMargin}px ${rapidOption.areaMargin.rightMargin}px ${rapidOption.areaMargin.bottomMargin}px ${rapidOption.areaMargin.leftMargin}px`
    }
    if (type == 'optionMargin') {
      return `${rapidOption.optionMargin}px`
    }
    if (type == 'color') {
      return rapidOption.rapidTextStyle.color
    }
    if (type == 'fontSize') {
      return `${rapidOption.rapidTextStyle.fontSize}px`
    }
    if (type == 'fontWeight') {
      return rapidOption.rapidTextStyle.fontWeight
    }
    if (type == 'hoverColor') {
      return rapidOption.rapidTextStyle.rapidTextHoverStyle.display
        ? rapidOption.rapidTextStyle.rapidTextHoverStyle.color
        : null
    }
    if (type == 'hoverFontSize') {
      return `${
        rapidOption.rapidTextStyle.rapidTextHoverStyle.display
          ? rapidOption.rapidTextStyle.rapidTextHoverStyle.fontSize
          : null
      }px`
    }
    if (type == 'hoverFontWeight') {
      return rapidOption.rapidTextStyle.rapidTextHoverStyle.display
        ? rapidOption.rapidTextStyle.rapidTextHoverStyle.fontWeight
        : null
    }
  }
}
