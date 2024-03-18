import React, { memo, useRef, useEffect, useState, useMemo } from 'react'

import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN'
import LczComCon from '../common/LczComCon'
import { DateInervalWrapper } from './style'
import { DatePicker } from 'antd'
import { randomChar } from '../common/util'
import { DateIntervalProps } from './type'
import {
  defaultDateDefaultValue,
  defaultDatePickerConfig,
  defaultGlobalStyle,
  defaultDateChoiceSection,
  defaultTextBoxConfig
} from './common/defaultValue'
import { getRapidOption } from './common'

const { RangePicker } = DatePicker

const DateInterval = memo((props: DateIntervalProps) => {
  const {
    textBoxConfig = defaultTextBoxConfig,
    datePickerConfig = defaultDatePickerConfig,
    globalStyle = defaultGlobalStyle,
    data = [],
    onChange
  } = props

  const { dateDefaultValue = defaultDateDefaultValue, dateChoiceSection = defaultDateChoiceSection } = globalStyle

  const { rapidOption } = datePickerConfig
  const downRef: any = useRef(null)
  const datePickerId = useRef(randomChar('DateIntervalBox'))
  const [dateRange, setDateRange] = useState<any>([])
  const [show, setShow] = useState(false)
  const [datePickerH, setDatePickerH] = useState(0)
  const [rapidList, setRapidList] = useState<any[]>([])
  //日期区间组件日期格式
  const getFormat = useMemo(() => {
    return globalStyle.pickerType
  }, [JSON.stringify(globalStyle)])

  const _onChange = (dates: any) => {
    const params = { ...data[0] }

    setDateRange(dates)
    if (dates) {
      const _a = moment(dates[0])
      const _b = moment(dates[1])
      params.startdate = _a.isValid() ? _a.format(getFormat) : ''
      params.enddate = _b.isValid() ? _b.format(getFormat) : ''
    } else {
      params.startdate = ''
      params.enddate = ''
    }
    onChange && onChange(params, dates)
  }
  const _onOk = (value: any) => {
    _onChange(value)
  }
  // 点击快捷面板选项
  const tagCheck = (startTime: any, endTime: any) => () => {
    setDateRange([startTime, endTime])
    _onChange([startTime, endTime])
    setShow(false)
  }

  //获取起始值是否可以为空
  const getInitial = useMemo(() => {
    const initial = {
      startIsNull: false,
      endIsNull: false
    }
    initial.startIsNull = globalStyle.startIsNull
    initial.endIsNull = globalStyle.endIsNull
    return initial
  }, [globalStyle.startIsNull, globalStyle.endIsNull])

  //快捷面板选项数组
  useEffect(() => {
    const rapidArr: any[] = []
    rapidOption?.rapidSeries.map(item => {
      const a = getCurrentTime.datePicker
      const _a = a == 'date' ? item.rapidDateType : a == 'month' ? item.rapidMonthType : item.rapidYearType
      const _b = a == 'date' ? item.optionDateName : a == 'month' ? item.optionMonthName : item.optionYearName
      const _c =
        a == 'date' ? item.rapidDateStartTime : a == 'month' ? item.rapidMonthStartTime : item.rapidYearStartTime
      const _d = a == 'date' ? item.rapidDateEndTime : a == 'month' ? item.rapidMonthEndTime : item.rapidYearEndTime
      if (getRapidOption(_a)) {
        rapidArr.push(getRapidOption(_a))
      } else {
        const rapidStartTime = moment(_c, getFormat)
        const rapidEndTime = moment(_d, getFormat)
        const _a = {
          title: _b,
          startTime: rapidStartTime.isValid() ? rapidStartTime : '',
          endTime: rapidEndTime.isValid() ? rapidEndTime : ''
        }
        rapidArr.push(_a)
      }
    })
    setRapidList(rapidArr)
  }, [JSON.stringify(rapidOption), JSON.stringify(globalStyle)])
  //默认日期区间日期
  useEffect(() => {
    const _startTime = data?.[0]?.startdate || (dateDefaultValue.display ? dateDefaultValue.dateStartTime.value : '')
    const _endTime = data?.[0]?.enddate || (dateDefaultValue.display ? dateDefaultValue.dateEndTime.value : '')
    const startTime = moment(_startTime, getFormat)
    const endTime = moment(_endTime, getFormat)
    _onChange([startTime.isValid() ? startTime : '', endTime.isValid() ? endTime : ''])
  }, [JSON.stringify(dateDefaultValue), data])

  //日期区间组件 头部文本框高度
  useEffect(() => {
    const dom = document.querySelector(`#${datePickerId.current}`) as HTMLElement
    setDatePickerH(dom?.clientHeight)
  }, [show])

  //日期区间组件格式 年 年月 年月日，当前时间按格式
  const getCurrentTime = useMemo(() => {
    const _A = {
      currentTime: moment().format('YYYY-MM-DD'),
      datePicker: 'date'
    }
    if (globalStyle.pickerType.includes('D')) {
      _A.currentTime = moment().format('YYYY-MM-DD')
      _A.datePicker = 'date'
    } else {
      if (globalStyle.pickerType.includes('M')) {
        _A.currentTime = moment().format('YYYY-MM')
        _A.datePicker = 'month'
      } else {
        _A.currentTime = moment().format('YYYY')
        _A.datePicker = 'year'
      }
    }
    return _A
  }, [JSON.stringify(globalStyle)])

  //快捷面板
  const footRanges = () => (
    <div className='range-quick-selector'>
      <div className='range-quick-selector-box'>
        {rapidList.map((item, i) => (
          <div className='quick-item' key={i} onClick={tagCheck(item.startTime, item.endTime)}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  )
  //日期区间可选范围
  const disabledDate = (current: any) => {
    const _minTime = data?.[0]?.mindate || (dateChoiceSection.display ? dateChoiceSection.dateMinTime.value : '')
    const _maxTime = data?.[0]?.maxdate || (dateChoiceSection.display ? dateChoiceSection.dateMaxTime.value : '')
    const minTime = moment(_minTime, getFormat)
    const maxTime = moment(_maxTime, getFormat).add(1, 'd')
    return (current && (maxTime.isValid() ? current >= maxTime : '')) || current < (minTime.isValid() ? minTime : '')
  }
  const onOpenChange = (status: boolean) => {
    setShow(status)
  }

  return (
    <DateInervalWrapper
      className='DateInterval'
      textBoxConfig={textBoxConfig}
      datePickerConfig={datePickerConfig}
      dateCurrentTime={getCurrentTime.currentTime}
      dataTypePicker={getCurrentTime.datePicker}
      globalStyle={globalStyle}
      datePickerH={datePickerH}>
      <LczComCon id={datePickerId.current} ref={downRef}>
        <RangePicker
          value={dateRange}
          locale={locale}
          getPopupContainer={() => document.getElementById(datePickerId.current) as HTMLElement}
          onChange={_onChange}
          onOk={_onOk}
          allowEmpty={[getInitial.startIsNull, getInitial.endIsNull]}
          disabledDate={disabledDate}
          picker={getCurrentTime.datePicker as 'year' | 'month' | 'date'}
          onOpenChange={onOpenChange}
          dropdownClassName={'dateinterval-dropdown'}
          open={show}
          separator={<span>{textBoxConfig.sectionSymbl}</span>}
          format={getFormat}
          panelRender={data => (
            <div className='dateinterval-panel-container'>
              {footRanges()}
              <div>{data}</div>
            </div>
          )}
        />
      </LczComCon>
    </DateInervalWrapper>
  )
})
DateInterval.displayName = 'DateInterval'
export default memo(DateInterval)
