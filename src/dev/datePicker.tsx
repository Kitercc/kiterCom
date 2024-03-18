import React from 'react'
import { LczDatePicker } from '../index'
import { DatePickerProps } from '../LczDatePicker/type'

export const T_LczDatePicker = () => {
  const config: DatePickerProps = {
    globalStyle: {
      pickerType: 'data',
      fontFamily: 'Microsoft YaHei',
      letterSpacing: 0,
      dateRange: { startDate: '', endDate: '' }
    },
    textBoxConfig: {
      textBoxBorder: {
        display: true,
        borderColor: '#313337',
        borderWidth: 1,
        borderRadius: 0,
        boxHoverBorderC: '#3d99fc',
        boxFocusBorderC: '#3d99fc'
      },
      dateSymbol: '/',
      boxTextStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 900
      },
      textAlign: 'left',
      boxIcon: {
        display: true,
        boxIconSize: 10,
        boxIconSpac: 10,
        boxIconOffSetLeft: 10
      },
      clearIcon: {
        display: true,
        iconSize: 20,
        color: 'red',
        rightOffSet: 100
      }
    },
    datePickerConfig: {
      pickerTopOffset: 10,
      pickerAlign: 'left',
      pickerLeftOffset: 0,
      pickerBorderColor: 'blue',
      pickerBorderWidth: 1,
      PickerRadius: 10,
      dataYearsStyle: {
        fontSize: 14,
        color: '#2ed11f',
        fontWeight: 600
      },
      dataDateStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#fff',
        divisionColor: '#e41a1a',
        divisionWidth: 1,
        focusTextColor: 'red',
        focusBgcolor: '#3d99fc'
      },
      monthYearsStyle: {
        fontSize: 14,
        color: '#d11f1f',
        fontWeight: 600
      },
      monthDateStyle: {
        fontSize: 14,
        fontWeight: 400,
        color: '#fff',
        divisionColor: '#ccc',
        divisionWidth: 1,
        focusTextColor: 'red',
        focusBgcolor: '#3d99fc'
      }
    }
  }

  const data = [
    {
      date: '',
      startdate: '2018-6-14',
      enddate: '2022-6-16'
    }
  ]

  const onChange = (dateString, date) => {
    console.log(dateString)
  }

  return (
    <div style={{ width: 400 }}>
      <LczDatePicker {...config} data={data} onChange={onChange} />
    </div>
  )
}
