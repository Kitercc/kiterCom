import React, { useState } from 'react'
import { LczCalendar } from '../index'
import { CalendarProps } from '../LczCalendar/type'

export const T_LczCalendar = () => {
  const _styleSeries = [
    {
      iconType: 'system', // system 系统 custom 自定义
      color: 'blue',
      iconValue: '&#59344;|1',
      imgSrc: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
    },
    {
      iconType: 'system', // system 系统 custom 自定义
      color: 'blue',
      iconValue: '&#59344;|1',
      imgSrc: '//www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg'
    }
    // {
    //   iconType: 'custom', // system 系统 custom 自定义
    //   color: 'blue',
    //   iconValue: 'lcz-com-icon-a-3disanji',
    //   imgSrc: 'http://static.runoob.com/images/demo/demo1.jpg'
    // }
  ]
  const _iconSeries = [
    {
      typeName: '优先级1',
      iconType: 'system', // system 系统 custom 自定义
      color: 'red',
      iconValue: '&#59359;|1',
      imgSrc: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
    },
    {
      typeName: '优先级2',
      iconType: 'system', // system 系统 custom 自定义
      color: 'yellow',
      iconValue: '&#59361;|1',
      imgSrc: '//www.runoob.com/wp-content/uploads/2016/04/trolltunga.jpg'
    },
    {
      typeName: '优先级3',
      iconType: 'system', // system 系统 custom 自定义
      color: 'green',
      iconValue: '&#59360;|1',
      imgSrc: 'http://static.runoob.com/images/demo/demo1.jpg'
    }
  ]
  const data = [
    {
      date: '2021-11-24',
      id: '1',
      content: '这里是第一优先级任务',
      type: '优先级1'
    },
    {
      date: '2021-11-24',
      id: '2',
      content: '这里是第一优先级任务',
      type: '优先级2'
    },
    {
      date: '2021-11-24',
      id: '3',
      content: '这里是第二优先级任务',
      type: '优先级3'
    },
    {
      date: '2021-11-24',
      id: '4',
      content: '这里是第三优先级任务',
      type: '优先级'
    }
  ]
  const config: CalendarProps = {
    globalConfig: {
      calendarType: 'yearAndMonth', //yearAndMonth year month
      defaultValue: { value: '' },
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
        fontFamily: 'cursive',
        letterSpacing: 0
      }
    },
    yearToMonthConfig: {
      height: 32,
      alignment: 'right',
      letterSpacing: 7,
      switchButton: {
        location: 'right',
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
          Switch: true,
          bgColor: 'rgba(255,255,255,0)',
          border: {
            display: true,
            color: '#3F464E',
            width: 1
          },
          textStyle: {
            display: true,
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
    },
    calendarPanelConfig: {
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
          top: 8,
          bottom: 8,
          left: 8,
          right: 8
        },
        dateLocation: 'right',
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
    },
    tipConfig: {
      topOfMargin: 0,
      horAlignment: 'left',
      margin: 8,
      tipTextStyle: {
        fontsize: 13,
        color: '#FFFFFF',
        fontWeight: 'normal',
        lineHeight: 8,
        lineBr: false
      },
      iconConfig: {
        display: true,
        width: 16,
        height: 16,
        styleSeries: _styleSeries,
        iconSeries: _iconSeries
      }
    }
  }

  const onChange = (data: any) => {
    console.log(data, 'onChange')
  }
  const onClick = (data: any) => {
    console.log(data, 'onClick')
  }
  const onDoubleClick = (data: any) => {
    console.log(data, 'onClick')
  }
  const a = [1000, 600]

  return (
    <div style={{ width: a[0], height: a[1], margin: ' 0 auto' }}>
      <LczCalendar
        {...config}
        data={data}
        w={a[0]}
        h={a[1]}
        onChange={onChange}
        onClick={onClick}
        onDoubleClick={onDoubleClick}
      />
    </div>
  )
}
