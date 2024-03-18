import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN'

import { DatePickerWrapper } from './style'
import LczComCon from '../common/LczComCon'

import {
  DatePickerProps,
  GlobalStyle,
  BoxIcon,
  BoxTextStyle,
  TextBoxBorder,
  YearsStyle,
  DateStyle,
  ClearIcon
} from './type'
import { conversionData, randomChar, replaceStr, resMobile } from '../common/util'
import MoblieDatePicker from './components/MoblieDatePicker'

const DatePickers = memo((props: DatePickerProps = {}) => {
  const defaultGlobalStyle: GlobalStyle = {
    fontFamily: 'Microsoft YaHei',
    letterSpacing: 0
  }

  const defaultBoxIcon: BoxIcon = {
    display: true,
    boxIconSize: 16,
    boxIconColor: '#3d99fc',
    boxIconSpac: 8,
    boxIconOffSetLeft: 16
  }
  const defaultClearIcon: ClearIcon = { display: true, iconSize: 16, color: '#c8D0d8', rightOffSet: 12 }

  const defaultTextBoxBorder: TextBoxBorder = {
    display: true,
    borderColor: '#313337',
    borderWidth: 1,
    borderRadius: 0,
    boxHoverBorderC: '#3d99fc',
    boxFocusBorderC: '#3d99fc'
  }
  const defaultBoxTextStyle: BoxTextStyle = { fontSize: 14, color: '#fff', fontWeight: 400 }

  const defaultYearsStyle: YearsStyle = { fontSize: 15, color: '#c8d0d8', fontWeight: 400 }

  const defaultDateStyle: DateStyle = {
    fontSize: 14,
    color: '#c8d0d8',
    fontWeight: 400,
    divisionColor: '#2b323b',
    divisionWidth: 1,
    focusTextColor: '#3d99fc',
    focusBgcolor: '#15181c'
  }

  const {
    globalStyle = defaultGlobalStyle,
    textBoxConfig = {},
    datePickerConfig = {},
    data = [],
    placeholder,
    onChange
  } = props

  // props 解构
  const { pickerType } = globalStyle

  // 日期可选范围 startType, endType,

  const {
    boxBgColor = '#15181c',
    textBoxBorder = defaultTextBoxBorder,
    dateSymbol = '-',
    boxTextStyle = defaultBoxTextStyle,
    textAlign = 'left',
    boxIcon = defaultBoxIcon,
    clearIcon = defaultClearIcon
  } = textBoxConfig

  const {
    pickerBgColor = '#15181c',
    dataYearsStyle = defaultYearsStyle,
    dataDateStyle = defaultDateStyle,
    monthYearsStyle = defaultYearsStyle,
    monthDateStyle = defaultDateStyle
  } = datePickerConfig

  const dateStyle = (() => {
    if (pickerType === 'data') {
      return dataDateStyle
    }
    return monthDateStyle
  })()

  const yearsStyle = (() => {
    if (pickerType === 'data') {
      return dataYearsStyle
    }
    return monthYearsStyle
  })()

  const { focusTextColor = '#3d99fc', focusBgcolor = '#15181c' } = dateStyle

  const [format, setFormat] = useState('YYYY-MM-DD')
  const [dateValue, setDate] = useState<any>(moment())
  const [device, setDevice] = useState<string>('pc')
  const [datePickerH, setDatePickerH] = useState(0)
  const downRef: any = useRef(null)
  const datePickerId = useRef(randomChar('DatePickersBox'))

  const reg = new RegExp('-', 'g')
  let code = isNaN(+dateSymbol) && dateSymbol ? dateSymbol : '-'
  code = code === '\\' ? '-' : code

  useEffect(() => {
    resMobile(setDevice)
  }, [])

  useEffect(() => {
    if (dateSymbol !== '-') {
      setFormat(format.replace(reg, code))
    }
  }, [dateSymbol, format])

  useEffect(() => {
    const dom = document.querySelector(`#${datePickerId.current}`) as HTMLElement
    setDatePickerH(dom?.clientHeight)
  }, [JSON.stringify(boxTextStyle), textBoxBorder.borderWidth])

  const dataMemo = useMemo(() => {
    return conversionData(data, {
      date: 'string',
      startdate: 'string',
      enddate: 'string'
    })
  }, [data])

  useEffect(() => {
    if (dataMemo.length) {
      const dateStr = new Date(dataMemo[0]?.date).toString()
      if (dateStr === 'Invalid Date') {
        setDate(null)
      } else {
        setDate(moment(dataMemo[0]?.date))
      }
      dateStr !== 'Invalid Date' && onChange && onChange(dataMemo[0])
    }
  }, [JSON.stringify(dataMemo)])

  const pickerTypeMemo = useMemo(() => {
    if (pickerType === 'data') {
      setFormat('YYYY-MM-DD'.replace(reg, code))
      return undefined
    } else if (pickerType === 'month') {
      setFormat('YYYY-MM'.replace(reg, code))
      return 'month'
    }
  }, [pickerType, format, dateSymbol])

  const datePickerOnChange = (date, dateString) => {
    const params = { ...dataMemo[0] }
    if (new Date(dateString).toString() === 'Invalid Date') {
      params.date = ''
    } else {
      params.date = moment(date).format(format)
    }
    onChange && onChange(params, date)
    dateString = replaceStr(dateString, code, '-')

    setDate(dateString ? moment(dateString) : undefined)
  }

  // 日期禁用函数
  const disableDateChange = current => {
    return (
      current && (current < moment(dataMemo[0]?.startdate || null) || current > moment(dataMemo[0]?.enddate || null))
    )
  }

  function GetPicker(): JSX.Element {
    return (
      <DatePicker
        locale={locale}
        value={dateValue}
        picker={pickerTypeMemo}
        style={{
          ...globalStyle,
          background: boxBgColor,
          ...boxTextStyle,
          textAlign: 'inherit'
        }}
        placeholder={placeholder || '请选择日期'}
        inputReadOnly={true}
        className='date-picker'
        dropdownClassName='dropdownClassName'
        getPopupContainer={() => document.getElementById(datePickerId.current) as HTMLElement}
        onChange={datePickerOnChange}
        showTime={false}
        showToday={true}
        disabledDate={disableDateChange}
        format={format}
        popupStyle={{
          fontFamily: globalStyle.fontFamily,
          background: pickerBgColor,
          color: dateStyle.color,
          fontSize: dateStyle.fontSize,
          fontWeight: dateStyle.fontWeight,
          visibility: device === 'pc' ? 'visible' : 'hidden'
        }}
      />
    )
  }

  return (
    <DatePickerWrapper
      id='DatePickers'
      datePickerH={datePickerH}
      textBoxBorder={textBoxBorder}
      textAlign={textAlign}
      boxIcon={boxIcon}
      yearsStyle={yearsStyle}
      boxFontWeight={boxTextStyle.fontWeight}
      dateStyle={dateStyle}
      clearIcon={clearIcon}
      focusTextColor={focusTextColor}
      focusBgcolor={focusBgcolor}
      datePickerConfig={datePickerConfig}>
      <LczComCon id={datePickerId.current} ref={downRef}>
        {device === 'pc' && <GetPicker />}

        {device === 'mobile' && (
          <MoblieDatePicker
            data={dataMemo}
            popupStyle={{
              fontFamily: globalStyle.fontFamily,
              background: pickerBgColor,
              color: dateStyle.color,
              fontSize: dateStyle.fontSize,
              fontWeight: dateStyle.fontWeight,
              letterSpacing: globalStyle.letterSpacing
            }}
            pickerType={pickerType}
            datePickerOnChange={datePickerOnChange}
            datePickerConfig={datePickerConfig}
            dateStyle={dateStyle}>
            {GetPicker()}
          </MoblieDatePicker>
        )}
      </LczComCon>
    </DatePickerWrapper>
  )
})

DatePickers.displayName = 'DatePickers'

export default memo(DatePickers)
