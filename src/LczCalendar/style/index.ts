/* eslint-disable indent */
import styled from 'styled-components'
import { getComStyle } from '../../common/util'
import { CalendarPanelConfig, CalendarProps, GlobalConfig, NormalStyle, SwitchStyle, YearToMonthConfig } from '../type'

interface WrapperProps extends CalendarProps {
  calendarGridH: number
}

export const CalendarWrapper = styled.div<WrapperProps>`
  .ant-picker-calendar {
    font-family: ${props => getComStyle(props.globalConfig, 'globalTextStyle.fontFamily')};
    letter-spacing: ${props => getComStyle(props.globalConfig, 'globalTextStyle.letterSpacing') + 'px'};
    padding: ${props => getGlobalConfig(props.globalConfig, 'edge', '')};
    background: ${props => getComStyle(props.globalConfig, 'bgColor')};
    border: ${props => getGlobalConfig(props.globalConfig, 'globalBorder', '')};
    /* 日历头部 */
    .calendar-header {
      height: ${props => getComStyle(props.yearToMonthConfig, 'height') + 'px'};
      padding: 0;
      display: flex;
      justify-content: ${props => getYearToMonthConfig(props.yearToMonthConfig, 'alignment', '')};
      margin-top: 0px;
      margin-bottom: ${props => getComStyle(props.globalConfig, 'interval') + 'px'};
      /* select下拉选择面板 */
      .ant-select-dropdown {
        padding: 0;
        border: ${props => getYearToMonthConfig(props.yearToMonthConfig, 'choiceYearOrMonth', 'choicePanel', 'border')};
        background-color: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.bgColor')};
        .rc-virtual-list-scrollbar {
          .rc-virtual-list-scrollbar-thumb {
            background-color: #62686f !important;
            width: 4px !important;
            left: 4px !important;
          }
        }

        /* 默认样式 */
        .ant-select-item {
          color: ${props =>
            getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.normalStyle.textStyle.color')};
          font-weight: ${props =>
            getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.normalStyle.textStyle.fontweight')};
          background-color: ${props =>
            getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.normalStyle.bgColor')};
          height: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.lingHeight') + 'px'};
          padding: ${props =>
            `${getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.lineMargin') / 2}px 12px`};
          min-height: 30px;
          .ant-select-item-option-content {
            line-height: ${props =>
              getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.lingHeight') -
              getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.choicePanel.lineMargin') +
              'px'};
          }
        }
        /* 选中样式 */
        .ant-select-item-option-selected {
          background-color: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.choicePanel.activeStyle, 'bgColor')};
          color: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.choicePanel.activeStyle, 'textStyle', 'color')};
          font-weight: ${props =>
            getHoverOrActive(
              props.yearToMonthConfig.choiceYearOrMonth.choicePanel.activeStyle,
              'textStyle',
              'fontweight'
            )};
        }

        /* 经过样式 */
        .ant-select-item-option-active {
          background-color: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.choicePanel.hoverStyle, 'bgColor')};
          color: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.choicePanel.hoverStyle, 'textStyle', 'color')};
          font-weight: ${props =>
            getHoverOrActive(
              props.yearToMonthConfig.choiceYearOrMonth.choicePanel.hoverStyle,
              'textStyle',
              'fontweight'
            )};
        }

        .ant-empty-description {
          color: #ffff;
        }
      }

      /* select选择框 */
      .ant-select-focused {
        /* 选中样式 */
        .ant-select-selector {
          box-shadow: none;
          background-color: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.inputStyle.activeStyle, 'bgColor')}!important;
          border: ${props =>
            getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.inputStyle.activeStyle, 'border')}!important;
        }
      }
      .year-select,
      .month-select {
        height: 100%;
        position: relative;

        .ant-select-dropdown {
          top: ${props => getComStyle(props.yearToMonthConfig, 'height') + 3 + 'px'} !important;
          left: 0 !important;
        }
      }
      .ant-select {
        color: ${props =>
          getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.normalStyle.textStyle.color')};

        font-size: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.fontSize') + 'px'};
        display: flex;
        align-items: center;
        height: 100%;
        justify-content: center;
        .ant-select-selector {
          .ant-select-selection-item {
            font-weight: ${props =>
              getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.normalStyle.textStyle.fontweight')};
          }
        }
        .ant-select-arrow {
          color: #ffffff;
          top: 50%;
        }

        /* 悬浮样式 */
        &:hover {
          .ant-select-selector {
            background-color: ${props =>
              getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.inputStyle.hoverStyle, 'bgColor')}!important;
            border: ${props =>
              getHoverOrActive(props.yearToMonthConfig.choiceYearOrMonth.inputStyle.hoverStyle, 'border')}!important;
          }
        }
        /* 普通样式 */
        &:not(.ant-select-customize-input) .ant-select-selector {
          background-color: ${props =>
            getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.normalStyle.bgColor')};
          border: ${props =>
            getNormalConfig(props.yearToMonthConfig.choiceYearOrMonth.inputStyle.normalStyle, 'border')};
          height: 100%;
          display: flex;
          align-items: center;
        }
      }
      .ant-select-single.ant-select-sm:not(.ant-select-customize-input) .ant-select-selector {
        padding-left: ${props =>
          getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.contentLeft') + 'px'};
        padding-right: 7px;
      }
      .year-select {
        width: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.yearWidth') + 'px'};
      }
      .month-select {
        width: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.inputStyle.MonthWidth') + 'px'};
        margin-left: ${props => getComStyle(props.yearToMonthConfig, 'choiceYearOrMonth.edge') + 'px'};
      }

      /* 年月按钮 */
      .ant-radio-group {
        display: flex;
        margin-left: ${props =>
          getComStyle(props.yearToMonthConfig, 'switchButton.location') == 'right'
            ? getComStyle(props.yearToMonthConfig, 'letterSpacing') + 'px'
            : '0px'};
        margin-right: ${props =>
          getComStyle(props.yearToMonthConfig, 'switchButton.location') == 'left'
            ? getComStyle(props.yearToMonthConfig, 'letterSpacing') + 'px'
            : '0px'};
        order: ${props => (getComStyle(props.yearToMonthConfig, 'switchButton.location') == 'left' ? -1 : 0)};
        justify-content: center;
        align-items: center;
        /* 普通样式 */
        .ant-radio-button-wrapper {
          height: 100%;
          display: ${props => (getComStyle(props.globalConfig, 'calendarType') == 'yearAndMonth' ? '' : 'none')};
          width: ${props => getComStyle(props.yearToMonthConfig, 'switchButton.normalStyle.buttonWidth') + 'px'};
          text-align: center;
          background-color: ${props => getComStyle(props.yearToMonthConfig, 'switchButton.normalStyle.bgColor')};
          border: ${props => getNormalConfig(props.yearToMonthConfig.switchButton.normalStyle, 'border')};
          color: ${props => getNormalConfig(props.yearToMonthConfig.switchButton.normalStyle, 'textStyle', 'color')};
          font-size: ${props =>
            getNormalConfig(props.yearToMonthConfig.switchButton.normalStyle, 'textStyle', 'fontsize')};
          font-weight: ${props =>
            getNormalConfig(props.yearToMonthConfig.switchButton.normalStyle, 'textStyle', 'fontweight')};
          /* 悬浮样式 */
          line-height: ${props => getComStyle(props.yearToMonthConfig, 'height') + 'px'};
          &:hover {
            background-color: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.hoverStyle, 'bgColor')};
            border: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.hoverStyle, 'border')};
            font-size: ${props =>
              getHoverOrActive(props.yearToMonthConfig.switchButton.hoverStyle, 'textStyle', 'fontsize')};
            color: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.hoverStyle, 'textStyle', 'color')};
            font-weight: ${props =>
              getHoverOrActive(props.yearToMonthConfig.switchButton.hoverStyle, 'textStyle', 'fontweight')};
          }
          &:not(:first-child)::before {
            width: 0px;
          }
        }
        /* 选中样式 */
        .ant-radio-button-wrapper-checked {
          &:not(.ant-radio-button-wrapper-disabled) {
            background-color: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.activeStyle, 'bgColor')};
            border: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.activeStyle, 'border')};
            font-size: ${props =>
              getHoverOrActive(props.yearToMonthConfig.switchButton.activeStyle, 'textStyle', 'fontsize')};
            color: ${props => getHoverOrActive(props.yearToMonthConfig.switchButton.activeStyle, 'textStyle', 'color')};
            font-weight: ${props =>
              getHoverOrActive(props.yearToMonthConfig.switchButton.activeStyle, 'textStyle', 'fontweight')};
          }
        }
      }
    }
    /* 日历面板 */
    .ant-picker-panel {
      background: ${props => getComStyle(props.globalConfig, 'bgColor')};
      border-top: none;

      .ant-picker-body {
        padding: 0;
        thead {
          tr {
            th {
              color: ${props => getComStyle(props.calendarPanelConfig, 'week.color')};
              padding: ${props => `0px ${getComStyle(props.calendarPanelConfig, 'rowMargin') / 2}px`};
              font-size: ${props => getComStyle(props.calendarPanelConfig, 'week.fontsize') + 'px'};
              font-weight: ${props => getComStyle(props.calendarPanelConfig, 'week.fontweight')};
            }
          }
        }
        .calendar-grid {
          height: 100%;
          color: inherit;
          border-top: ${props => getCalendarPanelConfig(props.calendarPanelConfig, 'cutOffLine', 'border')};
          margin: ${props =>
            `${getComStyle(props.calendarPanelConfig, 'columnMargin') / 2}px ${
              getComStyle(props.calendarPanelConfig, 'rowMargin') / 2
            }px`};
          padding: ${props => getCalendarPanelConfig(props.calendarPanelConfig, 'calendarGrid', 'edge')};

          > p {
            text-align: ${props => getComStyle(props.calendarPanelConfig, 'calendarGrid.dateLocation')};
            margin: 0;
            height: 21px;
            margin-bottom: ${props => getComStyle(props.tipConfig, 'topOfMargin') + 'px'};
            user-select: none;
          }
          > ul {
            overflow-y: auto;
            height: ${props => getUlH(props) + 'px'};
            z-index: 1;
            box-sizing: border-box;
            li {
              margin-bottom: ${props => getComStyle(props.tipConfig, 'tipTextStyle.lineHeight') + 'px'};
              > p {
                margin: 0;
                width: 100%;
                text-align: ${props => getComStyle(props.tipConfig, 'horAlignment')};
                font-size: ${props => getComStyle(props.tipConfig, 'tipTextStyle.fontsize') + 'px'};
                color: ${props => getComStyle(props.tipConfig, 'tipTextStyle.color')};
                font-weight: ${props => getComStyle(props.tipConfig, 'tipTextStyle.fontWeight')};
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: ${props => (getComStyle(props.tipConfig, 'tipTextStyle.lineBr') ? '' : 'nowrap')};
              }

              i,
              img {
                display: ${props => (getComStyle(props.tipConfig, 'iconConfig.display') ? '' : 'none')};
                width: ${props => getComStyle(props.tipConfig, 'iconConfig.width') + 'px'};
                margin-right: ${props => getComStyle(props.tipConfig, 'margin') + 'px'};
              }
              i {
                font-size: ${props => getComStyle(props.tipConfig, 'iconConfig.width') + 'px'};
              }
              img {
                height: ${props => getComStyle(props.tipConfig, 'iconConfig.height') + 'px'};
              }
            }
            &::-webkit-scrollbar-thumb {
              border-radius: 2px;
              background: #62686f;
            }
            &::-webkit-scrollbar {
              width: 4px;
            }
          }
        }

        /* 非本月日期 */
        .ant-picker-cell {
          padding: 0;
          height: ${props => props.calendarGridH + 'px'};
          color: ${props =>
            getComStyle(props.calendarPanelConfig, 'calendarGrid.normalStyle.CalendarGridNormalTextStyle.notToday')};
          background-color: ${props => getComStyle(props.calendarPanelConfig, 'calendarGrid.normalStyle.bgColor')};
          &:hover:not(.ant-picker-cell-selected) {
            .calendar-grid {
              background-color: ${props =>
                getHoverOrActive(props.calendarPanelConfig.calendarGrid.hoverStyle, 'bgColor')};
              font-size: ${props =>
                getHoverOrActive(props.calendarPanelConfig.calendarGrid.hoverStyle, 'textStyle', 'fontsize')};
              color: ${props =>
                getHoverOrActive(props.calendarPanelConfig.calendarGrid.hoverStyle, 'textStyle', 'color')};
              font-weight: ${props =>
                getHoverOrActive(props.calendarPanelConfig.calendarGrid.hoverStyle, 'textStyle', 'fontweight')};
            }
          }
        }
        /* 本月日期 */
        .ant-picker-cell-in-view {
          font-size: ${props =>
            getComStyle(props.calendarPanelConfig, 'calendarGrid.normalStyle.CalendarGridNormalTextStyle.fontsize') +
            'px'};
          color: ${props =>
            getComStyle(props.calendarPanelConfig, 'calendarGrid.normalStyle.CalendarGridNormalTextStyle.color')};
          font-weight: ${props =>
            getComStyle(props.calendarPanelConfig, 'calendarGrid.normalStyle.CalendarGridNormalTextStyle.fontWeight')};
        }
        /* 选中日期 */
        .ant-picker-cell-selected {
          .calendar-grid {
            background-color: ${props =>
              getHoverOrActive(props.calendarPanelConfig.calendarGrid.activeStyle, 'bgColor')};
            font-size: ${props =>
              getHoverOrActive(props.calendarPanelConfig.calendarGrid.activeStyle, 'textStyle', 'fontsize')};
            color: ${props =>
              getHoverOrActive(props.calendarPanelConfig.calendarGrid.activeStyle, 'textStyle', 'color')};
            font-weight: ${props =>
              getHoverOrActive(props.calendarPanelConfig.calendarGrid.activeStyle, 'textStyle', 'fontweight')};
          }
        }
        .ant-picker-cell-today {
          .calendar-grid {
            border-color: ${props => getCalendarPanelConfig(props.calendarPanelConfig, 'cutOffLine', 'today')};
          }
        }
      }
    }
  }
`

function getGlobalConfig(props: GlobalConfig, func = '', type = '') {
  const { edge, globalBorder, globalTextStyle } = props

  if (func == 'edge') {
    return `${edge.top}px ${edge.right}px ${edge.bottom}px ${edge.left}px`
  }
  if (func == 'globalBorder') {
    return globalBorder.display ? `${globalBorder.width}px solid ${globalBorder.color}` : '0px'
  }
  if (func == 'globalTextStyle') {
    if (type == 'fontFamily') {
      return globalTextStyle.fontFamily
    }
    if (type == 'letterSpacing') {
      return globalTextStyle.letterSpacing
    }
  }
}
function getYearToMonthConfig(props: YearToMonthConfig, func = '', type = '', minType = '') {
  const { choiceYearOrMonth } = props

  if (func == 'alignment') {
    switch (props.alignment) {
      case 'left':
        return 'flex-start'
      case 'center':
        return 'center'
      case 'right':
        return 'flex-end'
      default:
        return
    }
  }

  if (func == 'choiceYearOrMonth') {
    if (type == 'choicePanel') {
      if (minType == 'border') {
        return choiceYearOrMonth.choicePanel.border.display
          ? `${choiceYearOrMonth.choicePanel.border.width}px solid ${choiceYearOrMonth.choicePanel.border.color}`
          : '0px'
      }
    }
  }
}

function getCalendarPanelConfig(props: CalendarPanelConfig, func = '', type = '') {
  const { cutOffLine, calendarGrid } = props

  if (func == 'cutOffLine') {
    if (type == 'border') {
      return cutOffLine.display ? `${cutOffLine.width}px solid ${cutOffLine.color}` : '0px'
    }
    if (type == 'today') {
      return cutOffLine.display ? cutOffLine.today : ''
    }
  }
  if (func == 'calendarGrid') {
    if (type == 'edge') {
      return `${calendarGrid.edge.top}px ${calendarGrid.edge.right}px ${calendarGrid.edge.bottom}px ${calendarGrid.edge.left}px`
    }
  }
}
function getNormalConfig(props: NormalStyle, func = '', type = '') {
  if (func == 'border') {
    return props.border?.display ? `${props.border?.width}px solid ${props.border?.color}` : '0px'
  }
  if (func == 'textStyle') {
    if (type == 'fontsize') {
      return `${props.textStyle?.fontsize}px`
    }
    if (type == 'color') {
      return `${props.textStyle?.color}`
    }
    if (type == 'fontweight') {
      return `${props.textStyle?.fontweight}`
    }
  }
}
function getHoverOrActive(props: SwitchStyle, func = '', type = '') {
  if (props.Switch) {
    if (func == 'bgColor') {
      return props.bgColor
    }
    if (func == 'border') {
      return props.border?.display ? `${props.border?.width}px solid ${props.border?.color}` : '0px'
    }
    if (func == 'textStyle' && props.textStyle?.display) {
      if (type == 'fontsize') {
        return `${props.textStyle?.fontsize}px`
      }
      if (type == 'color') {
        return `${props.textStyle?.color}`
      }
      if (type == 'fontweight') {
        return `${props.textStyle?.fontweight}`
      }
    }
  } else {
    return ''
  }
}

function getUlH(props) {
  const a =
    props.calendarGridH -
    getComStyle(props.calendarPanelConfig, 'columnMargin') -
    getComStyle(props.calendarPanelConfig, 'calendarGrid.edge.top') -
    getComStyle(props.calendarPanelConfig, 'calendarGrid.edge.bottom') -
    getComStyle(props.tipConfig, 'topOfMargin') -
    25
  return a < 0 ? 0 : a
}
