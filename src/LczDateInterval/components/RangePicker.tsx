import React, { forwardRef } from 'react'
import { Tag, DatePicker } from 'antd'
import { useState } from 'react'

const { RangePicker } = DatePicker

const Index = ({ value, ranges = {}, onChange, open, format = 'YYYY-MM-DD', ...props }: any, ref: any) => {
  const [val, setVal] = useState(value)
  const [show, setShow] = useState(open)

  const isDateSame = (key: string) => {
    const [start, end] = ranges[key]
    return val && val.length && start && end ? start.isSame(val[0]) && end.isSame(val[1]) : false
  }
  const tagCheck = (key: string) => () => {
    setVal(ranges[key])
    const [start, end] = ranges[key]
    onChange &&
      onChange(ranges[key], [start ? start.format(format as string) : '', end ? end.format(format as string) : ''])
    setShow(false)
  }

  const footRanges = () => (
    <div className='range-quick-selector'>
      {Object.keys(ranges).map(key => (
        <Tag key={key} onClick={tagCheck(key)} color={isDateSame(key) ? 'blue' : ''}>
          {key}
        </Tag>
      ))}
    </div>
  )

  const onOpenChange = (status: boolean) => {
    setShow(status)
  }

  const onChangeFn = (dates: any, dateStrings: [string, string]) => {
    onChange && onChange(dates, dateStrings)
    setVal(dates)
  }

  return (
    <RangePicker
      renderExtraFooter={footRanges}
      value={val}
      onChange={onChangeFn}
      onOpenChange={onOpenChange}
      open={show}
      format={format}
      {...props}
    />
  )
}

export default forwardRef(Index)
