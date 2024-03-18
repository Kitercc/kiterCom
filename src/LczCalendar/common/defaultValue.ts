import { CalendarPanelConfig, GlobalConfig, TipConfig, YearToMonthConfig } from '../type'

const defaultGlobalConfig: GlobalConfig = {
  calendarType: '年月日历',
  defaultValue: { value: '2021-11-19' },
  edge: {
    top: 24,
    bottom: 24,
    left: 24,
    right: 24
  },
  interval: 16,
  bgColor: '#161A1E',
  globalBorder: {
    display: true,
    color: '#313337',
    width: 1
  },

  globalTextStyle: {
    fontFamily: 'PingFangSC-Regular',
    letterSpacing: 0
  }
}

const defaultYearToMonthConfig: YearToMonthConfig = {
  height: 32,
  alignment: '右对齐',
  letterSpacing: 7,
  switchButton: {
    location: '在右',
    normalStyle: {
      buttonWidth: 48,
      bgColor: 'rgba(255,255,255,0)',
      border: {
        display: true,
        color: '#3F464E',
        width: 1
      },
      textStyle: {
        fontsize: 14,
        color: '#FFFFFF',
        fontweight: 'normal'
      }
    },
    hoverStyle: {
      Switch: false,
      bgColor: 'rgba(255,255,255,0)',
      border: {
        display: false,
        color: '#3F464E',
        width: 1
      },
      textStyle: {
        display: false,
        fontsize: 14,
        color: '#3D99FC',
        fontweight: 'normal'
      }
    },
    activeStyle: {
      Switch: true,
      bgColor: 'rgba(255,255,255,0)',
      border: {
        display: true,
        color: '#3D99FC',
        width: 1
      },
      textStyle: {
        display: true,
        fontsize: 14,
        color: '#3D99FC',
        fontweight: 'normal'
      }
    }
  },
  choiceYearOrMonth: {
    edge: 8,
    fontSize: 14,
    inputStyle: {
      yearWidth: 96,
      MonthWidth: 80,
      contentLeft: 12,
      normalStyle: {
        bgColor: '#15181C',
        border: {
          display: true,
          color: '#313337',
          width: 1
        },
        textStyle: {
          color: '#FFFFFF',
          fontweight: 'normal'
        }
      },
      hoverStyle: {
        Switch: true,
        bgColor: '#15181C',
        border: {
          display: true,
          color: '#3D99FC',
          width: 1
        }
      },
      activeStyle: {
        Switch: true,
        bgColor: '#15181C',
        border: {
          display: true,
          color: '#3D99FC',
          width: 1
        }
      }
    },
    choicePanel: {
      bgColor: '#15181C',
      border: {
        display: true,
        color: '#313337',
        width: 1
      },
      lingHeight: 30,
      lineMargin: 4,
      normalStyle: {
        bgColor: 'rgba(255,255,255,0)',
        textStyle: {
          color: '#FFFFFF',
          fontweight: 'normal'
        }
      },
      hoverStyle: {
        Switch: true,
        bgColor: '#2B323B',
        textStyle: {
          display: false,
          color: '#FFFFFF',
          fontweight: 'normal'
        }
      },
      activeStyle: {
        Switch: true,
        bgColor: 'rgba(255,255,255,0)',
        textStyle: {
          display: true,
          color: '#3D99FC',
          fontweight: 'normal'
        }
      }
    }
  }
}
const defaultCalendarPanelConfig: CalendarPanelConfig = {
  rowMargin: 8,
  columnMargin: 2,
  cutOffLine: {
    display: true,
    color: '#343D48',
    width: 1,
    today: '#3D99FC'
  },
  week: {
    fontsize: 14,
    color: '#C8D0D8',
    fontweight: 'normal'
  },
  calendarGrid: {
    edge: {
      top: 24,
      bottom: 24,
      left: 24,
      right: 24
    },
    dateLocation: '居右',
    normalStyle: {
      bgColor: 'rgba(32, 37, 43, 0)',
      CalendarGridNormalTextStyle: {
        fontsize: 14,
        color: '#C8D0D8',
        fontWeight: 'normal',
        notToday: 'rgba(200, 208, 216, 0.4)'
      }
    },
    hoverStyle: {
      Switch: true,
      bgColor: '#2B323B',
      textStyle: {
        display: false,
        fontsize: 14,
        color: '#C8D0D8',
        fontweight: 'normal'
      }
    },
    activeStyle: {
      Switch: true,
      bgColor: 'rgba(61, 153, 252, 0.2)',
      textStyle: {
        display: true,
        fontsize: 14,
        color: '#3D99FC',
        fontweight: 'normal'
      }
    }
  }
}
const defaultTipConfig: TipConfig = {
  topOfMargin: 8,
  horAlignment: 'left',
  margin: 8,
  tipTextStyle: {
    fontsize: 13,
    color: '#FFFFFF',
    fontWeight: 'normal',
    lineHeight: 8,
    lineBr: true
  },
  iconConfig: {
    display: true,
    width: 16,
    height: 16,
    styleSeries: [
      {
        iconType: 'system', // system 系统 custom 自定义
        color: 'blue',
        iconValue: '',
        imgSrc: ''
      }
    ],
    iconSeries: [
      {
        typeName: '你真帅',
        iconType: 'system', // system 系统 custom 自定义
        color: '',
        iconValue: '',
        imgSrc: ''
      }
    ]
  }
}
export { defaultGlobalConfig, defaultYearToMonthConfig, defaultCalendarPanelConfig, defaultTipConfig }
