import { Radio, Select } from 'antd'
import moment from 'moment'
import React, { useRef, useMemo } from 'react'
const { Option } = Select
interface Params {
  value: any
  type: any
  onChange: any
  onTypeChange: any
}
const CalendarHeader = (props: Params) => {
  const { value = moment(), type = 'month', onChange, onTypeChange } = props
  const yearValue = value.format('YYYY')
  const monthValue = value.format('YYYY-MM')
  const yearSelectRef = useRef<any>()
  const monthSelectRef = useRef<any>()

  const options = [
    { label: '年', value: 'year' },
    { label: '月', value: 'month' }
  ]

  const getYearOption = useMemo(() => {
    const year = +value.format('YYYY') - 10
    return new Array(20).fill(null).map((v, i) => ({ label: `${year + i}年`, value: year + i + '' }))
  }, [value])

  const getMonthOption = useMemo(() => {
    return new Array(12)
      .fill(null)
      .map((v, i) => ({ label: `${i + 1}月`, value: `${yearValue}-${i < 9 ? '0' + (i + 1) : i + 1 + ''}` }))
  }, [value])

  const onRadioChange = (e: any) => {
    onTypeChange(e.target.value)
  }

  const onYearChange = value => {
    onChange(moment(value))
  }
  const onMonthChange = value => {
    onChange(moment(value))
  }
  return (
    <div className='calendar-header'>
      <div className='year-select' ref={yearSelectRef}>
        <Select
          size={'small'}
          value={yearValue}
          onChange={onYearChange}
          getPopupContainer={() => yearSelectRef.current}>
          {getYearOption.map((v, i) => (
            <Option value={v.value} key={i}>
              {v.label}
            </Option>
          ))}
        </Select>
      </div>
      {type == 'month' && (
        <div className='month-select' ref={monthSelectRef}>
          <Select
            size={'small'}
            value={monthValue}
            getPopupContainer={() => monthSelectRef.current}
            onChange={onMonthChange}>
            {getMonthOption.map((v, i) => (
              <Option value={v.value} key={i}>
                {v.label}
              </Option>
            ))}
          </Select>
        </div>
      )}
      <Radio.Group size={'small'} options={options} value={type} onChange={onRadioChange} optionType='button' />
    </div>
  )
}

export default CalendarHeader
