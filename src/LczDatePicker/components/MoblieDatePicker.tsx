import React, { memo, useEffect, useState, useMemo, CSSProperties } from 'react'
import { DatePickerProps, DateStyle } from '../type'
import { MobilePickerWrapper } from '../style'
import 'antd-mobile/lib/date-picker/style/css'

interface MobileDatePickerProps extends DatePickerProps {
  popupStyle: CSSProperties
  datePickerOnChange: (data: any, dataString: string) => void
  pickerType?: string
  children: JSX.Element
  dateStyle: DateStyle
}

export default memo(function MoblieDatePicker(props: MobileDatePickerProps) {
  const {
    data = [],
    datePickerOnChange,
    popupStyle,
    datePickerConfig,
    pickerType = 'data',
    dateStyle,
    children
  } = props

  const [dateValue, setDateValue] = useState<Date>(new Date())

  useEffect(() => {
    const _data = data[0]?.date ? String(data[0]?.date).replace(/-/g, '/') : ''
    const dateStr = new Date(_data).toString()

    if (dateStr === 'Invalid Date') {
      setDateValue(new Date())
    } else {
      setDateValue(new Date(data[0]?.date))
    }
  }, [JSON.stringify(data)])

  const range = useMemo(() => {
    const _obj: { start?: Date | undefined; end?: Date | undefined } = { start: undefined, end: undefined }
    if (data[0] && data[0].startdate && data[0].enddate) {
      const startDate = data[0].startdate.replace(/-/g, '/')
      const endData = data[0].enddate.replace(/-/g, '/')
      if (+new Date(startDate) < +new Date(endData)) {
        if (data[0] && data[0].startdate) {
          _obj.start = new Date(startDate)
        } else {
          _obj.start = undefined
        }

        if (data[0] && data[0].enddate) {
          _obj.end = new Date(endData)
        } else {
          _obj.end = undefined
        }
      }
    }

    return _obj
  }, [JSON.stringify(data)])

  return (
    <MobilePickerWrapper
      popupStyle={popupStyle}
      mode={pickerType === 'data' ? 'date' : 'month'}
      minDate={range.start}
      maxDate={range.end}
      datePickerConfig={datePickerConfig}
      dateStyle={dateStyle}
      extra='Optional'
      value={dateValue}
      onChange={date => {
        datePickerOnChange(date, date.toString())
        setDateValue(date)
      }}>
      {children}
    </MobilePickerWrapper>
  )
})
