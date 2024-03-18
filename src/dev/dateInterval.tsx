import React from 'react'
import { LczDateInterval } from '../index'
import { DateIntervalProps } from '../LczDateInterval/type'

export const T_LczDateInterval = () => {
  const _rapidSeries = [
    {
      rapidDateType: 'lastWeek',
      rapidMonthType: 'lastMonth',
      rapidYearType: 'lastYear',
      optionDateName: '',
      rapidDateStartTime: '',
      rapidDateEndTime: '',
      optionMonthName: '',
      rapidMonthStartTime: '',
      rapidMonthEndTime: '',
      optionYearName: '',
      rapidYearStartTime: '',
      rapidYearEndTime: ''
    },
    {
      rapidDateType: 'lastMonth',
      rapidMonthType: 'lastThreeMonth',
      rapidYearType: 'thisYear',
      optionDateName: '',
      rapidDateStartTime: '',
      rapidDateEndTime: '',
      optionMonthName: '',
      rapidMonthStartTime: '',
      rapidMonthEndTime: '',
      optionYearName: '',
      rapidYearStartTime: '',
      rapidYearEndTime: ''
    },
    {
      rapidDateType: 'lastThreeMonth',
      rapidMonthType: 'thisMonth',
      rapidYearType: 'nextYear',
      optionDateName: '',
      rapidDateStartTime: '',
      rapidDateEndTime: '',
      optionMonthName: '',
      rapidMonthStartTime: '',
      rapidMonthEndTime: '',
      optionYearName: '',
      rapidYearStartTime: '',
      rapidYearEndTime: ''
    },
    {
      rapidDateType: 'custom',
      rapidMonthType: 'custom',
      rapidYearType: 'lastWeek',
      optionDateName: '自定义',
      rapidDateStartTime: '2010-11-11',
      rapidDateEndTime: '2021-11-11',
      optionMonthName: '',
      rapidMonthStartTime: '',
      rapidMonthEndTime: '',
      optionYearName: '',
      rapidYearStartTime: '',
      rapidYearEndTime: ''
    }
  ]
  const config: DateIntervalProps = {
    globalStyle: {
      // "YYYY年M月D日","YYYY年M月", 'YYYY年',"YYYY-MM-DD", "YYYY/MM/DD","YYYY.MM.DD","YYYY-MM","YYYY/MM","YYYY.MM",'YYYY'
      pickerType: 'YYYY-MM-DD',
      startIsNull: false,
      endIsNull: true,
      dateDefaultValue: {
        display: false,
        dateStartTime: { value: '2021年1月7日' },
        dateEndTime: { value: '' }
      }, // 日期可选范围
      dateChoiceSection: {
        display: true,
        dateMinTime: { value: '2021-11-09' },
        dateMaxTime: { value: '2021-11-22' }
      },
      golbalTextStyle: {
        fontFamily: 'cursive',
        letterSpacing: 5
      }
    },
    textBoxConfig: {
      sectionSymbl: '至', // 区间分割符
      leftAndRightMargin: 14, //左右边距
      boxBgColor: '#15181C', //背景颜色
      borderRadius: 0, // 边框圆角
      // 边框样式
      textBoxBorder: {
        display: true,
        borderColor: '#313337', // 边框颜色
        borderWidth: 1, // 边框宽度
        boxHoverBorderC: '#3D99FC', // 边框悬浮色
        boxFocusBorderC: '#3D99FC' // 边框激活色
      },
      // 文本样式
      inputTextStyle: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'normal',
        placeholderColor: '#5F6975'
      },

      // 日历图标样式
      boxIcon: {
        display: true,
        boxIconLocation: 'left',
        boxIconSize: 16,
        boxIconColor: '#3D99FC'
      },
      // 清空图标设置
      clearIcon: {
        display: true,
        iconSize: 16,
        color: '#C8D0D8'
      }
    },
    datePickerConfig: {
      pickerTopOffset: 0,
      pickerAlign: 'right',
      pickerLeftOffset: 0,

      pickerBgColor: '#15181C',
      PickerRadius: 0,
      //选择面板边框
      pickerBoder: {
        display: false,
        color: 'blue',
        width: 4
      },
      //选择面板分割线
      cutoffRule: {
        color: '#313337',
        width: 1
      },
      //选择面板面板头
      panelHead: {
        fontSize: 15,
        fontWeight: 'bold',
        defaultColor: '#C8D0D8',
        hoverColor: '#fca33d',
        toggleButton: {
          color: '#C8D0D8',
          hoverColor: '#FFFFFF'
        }
      },
      //默认样式
      defaultStyle: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#C8D0D8',
        notTodayColor: 'rgba(200, 208, 216, .4)',
        bgHoverColor: '#2B323B',
        hoverColor: '#C8D0D8'
      },
      //当前时间样式
      currentTime: {
        display: true,
        color: '#3D99FC',
        bgcolor: 'rgba(255,255,255,0)',
        currrentTimeBorder: {
          display: true,
          color: '#3D99FC',
          width: 1
        }
      },
      //选中区域样式
      selectedArea: {
        bgcolor: '#2B323B',
        selectTime: {
          color: '#FFFFFF',
          bgcolor: '#3D99FC'
        }
      },
      //延伸区域样式
      extendArea: {
        display: true,
        extendAreaBorder: {
          display: true,
          borderType: 'dashed',
          color: '#3D99FC',
          width: 1
        }
      },
      //缩短区域样式
      cutdownArea: {
        display: true,
        bgcolor: '#324459'
      },
      //禁用区域
      disabledArea: {
        color: 'rgba(200, 208, 216, .1)',
        bgcolor: '#2B323B'
      },
      //快捷选项
      rapidOption: {
        display: false,
        location: 'left',
        width: 120,
        areaMargin: {
          topMargin: 16,
          bottomMargin: 16,
          leftMargin: 16,
          rightMargin: 16
        },
        optionMargin: 12,
        rapidTextStyle: {
          fontSize: 14,
          fontWeight: 'normal',
          color: '#C8D0D8',
          rapidTextHoverStyle: {
            display: true,
            fontSize: 14,
            fontWeight: 'normal',
            color: 'rgba(61, 153, 252, 1)'
          }
        },
        rapidSeries: _rapidSeries
      }
    }
  }

  const data = [
    {
      // startdate: '2021年11月14日',
      // enddate: '2021-11-17',
      // mindate: '2021年11月6日',
      // maxdate: '2021-11-27'
      startdate: '',
      enddate: '',
      mindate: '',
      maxdate: ''
    }
  ]

  const onChange = (dateString, date) => {
    console.log(dateString, date)
  }
  const a = [500, 40]
  return (
    <div style={{ width: a[0], height: a[1], margin: ' 30px auto' }}>
      <LczDateInterval {...config} data={data} onChange={onChange} />
    </div>
  )
}
