import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react'
import moment from 'moment'
import 'moment/locale/zh-cn'
import LczComCon from '../common/LczComCon'

import { TimerProps, TextStyle, TimerForMat } from './type'
import { configDisplayCompatible, dayName, getColorObj } from '../common/util'

function getHorizontalAlign(type?: string): string {
  let code = ''
  switch (type) {
    case 'center':
      code = 'center'
      break
    case 'left':
      code = 'flex-start'
      break
    case 'right':
      code = 'flex-end'
      break
    default:
      code = 'flex-start'
      break
  }
  return code
}

export default memo(function LczTimer(props: TimerProps = {}) {
  const defalutTextStyle: TextStyle = {
    fontFamily: 'DIN',
    fontSize: 20,
    color: '#fff',
    fontWeight: 0
  }

  const defaultForMat: TimerForMat = {
    date: { display: true, forMat: 'YYYY-MM-dd' },
    time: { display: true, forMat: 'HH:mm:ss' }
  }

  const { distance = 4, horizon = 'left', iconConfig = {}, timerConfig = {} } = props
  const { iconSize = 18, iconStyle = 'linearrect', yOffset = 0, iconColor = '#3D99FC' } = iconConfig
  const { interval = 1, textStyle = defalutTextStyle, format = defaultForMat } = timerConfig
  const { date: dateForMat, time: timeForMat } = format
  const iconStatus = configDisplayCompatible(iconConfig, 'iconStatus')

  const [date, setDate] = useState(Date.now())
  const timer: any = useRef(null)

  useEffect(() => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setDate(Date.now())
    }, interval * 1000)
    return () => {
      clearTimeout(timer.current)
    }
  }, [date, interval])

  const dates = useMemo(() => {
    let dateValue
    if (typeof format === 'string') {
      return moment(date).format(format).split(' ')
    }

    if (dateForMat.forMat === 'Monday' || dateForMat.forMat === 'Mon') {
      dateValue = dateForMat.forMat === 'Monday' ? dayName[moment().day()] : dayName[moment().day()].slice(0, 3)
      dateValue = dateForMat.display ? dateValue : ''
    } else {
      dateValue = dateForMat.display ? moment(date).format(dateForMat.forMat) : ''
    }
    const timeValue = timeForMat.display ? moment(date).format(timeForMat.forMat) : ''
    return [dateValue, timeValue].filter(v => v)
  }, [date, format])

  const iconStyleMemo = useMemo(() => {
    const _obj: CSSProperties = { fontSize: iconSize, transform: `translateY(${yOffset}px)`, display: 'inline-block' }
    let className = ''
    if (typeof iconColor === 'string') {
      _obj.color = iconColor
    } else {
      const { color, colorType } = getColorObj(iconColor)
      if (colorType === 'single') {
        _obj.color = color
      } else {
        _obj.background = `linear-gradient( ${color} )`
        className = 'gradient'
      }
    }
    return { style: _obj, className }
  }, [iconSize, yOffset, iconColor])

  return (
    <LczComCon className='lcz-timer-Wrapper'>
      <div className='timer-box' style={{ justifyContent: getHorizontalAlign(horizon), ...textStyle }}>
        {iconStatus && (
          <div className='lcz-timer-icon' style={{ marginRight: `${distance}px` }}>
            <span
              style={iconStyleMemo.style}
              className={`iconfont lcz-com-icon-shizhong-${iconStyle} ${iconStyleMemo.className}`}
            />
          </div>
        )}
        <span className='date-box'>
          {dates.map((time, i) => (
            <span key={i} style={{ marginRight: dateForMat?.display && timeForMat?.display ? '10px' : 0 }}>
              {time}
            </span>
          ))}
        </span>
      </div>
    </LczComCon>
  )
})
