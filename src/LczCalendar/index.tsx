import { Calendar } from 'antd'
import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { CalendarWrapper } from './style'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { CalendarProps } from './type'
import {
  defaultCalendarPanelConfig,
  defaultGlobalConfig,
  defaultTipConfig,
  defaultYearToMonthConfig
} from './common/defaultValue'
import moment from 'moment'

import CalendarHeader from './components'
import { conversionData } from '../common/util'
import IconCon from '../common/IconCon'
export default memo(function LczNewsList(props: CalendarProps) {
  const {
    globalConfig = defaultGlobalConfig,
    yearToMonthConfig = defaultYearToMonthConfig,
    calendarPanelConfig = defaultCalendarPanelConfig,
    tipConfig = defaultTipConfig,
    h = 768,
    data = [],
    onChange,
    onClick,
    onDoubleClick
  } = props

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [datePanelPick, setDatePanelPick] = useState('month')
  const [calendarDate, setCalendarDate] = useState<any>(undefined)
  const clickTimer = useRef<NodeJS.Timeout | null>(null)

  const onPanelChange = (value, mode) => {
    setDatePanelPick(mode)
    onChange &&
      onChange({
        calendartype: mode,
        year: value.format('YYYY'),
        month: value.format('MM')
      })
  }
  const getListData = (value: any, type: string) => {
    const listData: any[] = []
    const _data = conversionData(data, {
      date: 'string',
      id: 'string',
      content: 'string',
      type: 'string'
    })
    const newAr = _data.filter((v: any) => {
      return moment(v.date).format(type) == value
    })
    if (newAr.length) {
      newAr.forEach((item: any, i: number) => {
        const typeIndex =
          tipConfig.iconConfig.iconSeries.findIndex(v => {
            return v.typeName == item.type
          }) + 1

        if (typeIndex) {
          const _v = tipConfig.iconConfig.iconSeries[typeIndex - 1]
          _v &&
            listData.push({
              type: _v.iconType,
              date: item.date,
              content: typeof item.content === 'string' ? item.content : String(item.content),
              dateType: item.type,
              id: item.id,
              value: _v.iconType == 'system' ? _v.iconValue : _v.imgSrc,
              color: _v.iconType == 'system' ? _v.color : undefined
            })
        } else {
          const _s = tipConfig.iconConfig.styleSeries
          const styleIndex = i % _s.length
          if (!isNaN(styleIndex)) {
            listData.push({
              type: _s[styleIndex].iconType,
              content: typeof item.content === 'string' ? item.content : String(item.content),
              date: item.date,
              dateType: item.type,
              id: item.id,
              value: _s[styleIndex].iconType == 'system' ? _s[styleIndex].iconValue : _s[styleIndex].imgSrc,
              color: _s[styleIndex].iconType == 'system' ? _s[styleIndex].color : undefined
            })
          } else {
            listData.push({
              type: '',
              content: typeof item.content === 'string' ? item.content : String(item.content),
              date: item.date,
              dateType: item.type,
              id: item.id,
              value: '',
              color: undefined
            })
          }
        }
      })
    }
    return listData
  }
  // 当前的dateType
  const getCalendarType = useMemo(() => {
    if (globalConfig.calendarType == 'yearAndMonth') {
      setDatePanelPick('month')
      return undefined
    }
    setDatePanelPick(globalConfig.calendarType)
    return globalConfig.calendarType
  }, [globalConfig.calendarType])

  //点击事项时
  const metterClick = (item: any) => {
    clickTimer.current && clearTimeout(clickTimer.current)
    clickTimer.current = setTimeout(() => {
      onClick && onClick({ date: item.date, id: item.id, content: item.content, type: item.dateType })
    }, 300)
  }

  //双击日历格
  const gridDoubleClick = () => {
    clickTimer.current && clearTimeout(clickTimer.current)
    const formatType = datePanelPick == 'month' ? 'YYYY-MM-DD' : 'YYYY-MM'
    onDoubleClick && onDoubleClick({ date: moment(calendarDate).format(formatType) })
  }
  // 日格子自定义
  const _dateFullCellRender = (date: any) => {
    const listData = getListData(moment(date).format('YYYY-MM-DD'), 'YYYY-MM-DD')
    const _d = date.format('DD')

    return (
      <div className='calendar-grid' onDoubleClick={gridDoubleClick}>
        <p>{_d}</p>
        <ul>
          {listData.map(item => (
            <li key={item.id} onClick={() => metterClick(item)}>
              {item.type == 'system' ? (
                <IconCon
                  className='icon-con'
                  oldFamily='lcz-system-icon'
                  style={{ color: `${item.color}` }}
                  iconValue={item.value}
                />
              ) : (
                <img src={item.value} alt={''} />
              )}
              <p title={item.content}> {item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }
  // 月格子自定义
  const _monthFullCellRender = (date: any) => {
    const listData = getListData(moment(date).format('YYYY-MM'), 'YYYY-MM')
    const _m = date.format('MM')
    return (
      <div className='calendar-grid' onDoubleClick={gridDoubleClick}>
        <p>{_m}</p>
        <ul>
          {listData.map(item => (
            <li key={item.id} onClick={() => metterClick(item)}>
              {item.type == 'system' ? (
                <IconCon
                  className='icon-con'
                  oldFamily='lcz-system-icon'
                  style={{ color: `${item.color}` }}
                  iconValue={item.value}
                />
              ) : (
                <img src={item.value} alt={''} />
              )}
              <p title={item.content}> {item.content}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  const _onSelect = (value: any) => {
    setCalendarDate(value)
  }
  useEffect(() => {
    const defaultValue = moment(globalConfig.defaultValue.value).isValid()
      ? moment(globalConfig.defaultValue.value)
      : moment()
    setCalendarDate(defaultValue)
    onChange &&
      onChange({
        calendartype: getCalendarType || 'month',
        year: defaultValue?.format('YYYY'),
        month: defaultValue?.format('MM')
      })
  }, [JSON.stringify(globalConfig.defaultValue)])
  // 获取格子高度
  const getCalendarGridH = useMemo(() => {
    const paddingTop = globalConfig.edge.top || 24
    const paddingBottom = globalConfig.edge.bottom || 24
    const caledarGridH = h - paddingTop - paddingBottom - globalConfig.interval - yearToMonthConfig.height
    return caledarGridH / (datePanelPick == 'year' ? 4 : 6)
  }, [datePanelPick, JSON.stringify(globalConfig.edge), globalConfig.interval, h, yearToMonthConfig.height])

  return (
    <LczComCon style={{ overflow: 'initial' }} className='lcz-com-con-calendar'>
      <CalendarWrapper
        ref={wrapperRef}
        tipConfig={tipConfig}
        calendarGridH={getCalendarGridH}
        globalConfig={globalConfig}
        yearToMonthConfig={yearToMonthConfig}
        calendarPanelConfig={calendarPanelConfig}
        className='calendar-wrapper'
        style={{ width: '100%', height: '100%' }}>
        <Calendar
          locale={locale}
          value={calendarDate}
          mode={getCalendarType as 'year' | 'month' | undefined}
          dateFullCellRender={_dateFullCellRender}
          monthFullCellRender={_monthFullCellRender}
          onPanelChange={onPanelChange}
          headerRender={({ value, type, onChange, onTypeChange }) => {
            return <CalendarHeader value={value} type={type} onChange={onChange} onTypeChange={onTypeChange} />
          }}
          onSelect={_onSelect}
          fullscreen={false}
        />
      </CalendarWrapper>
    </LczComCon>
  )
})
