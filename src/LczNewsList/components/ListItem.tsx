/* eslint-disable indent */
import moment from 'moment'
import React, { memo, Fragment, ReactNode, CSSProperties } from 'react'
import { dayName } from '../../common/util'
import { DataMap, Drawing, TitleConfig, Abstract, DateConfig } from '../type'

interface ListItemProps {
  rowHeight: number | string
  item: DataMap
  drawing: Drawing
  titleConfig: TitleConfig
  abstract: Abstract
  dateConfig: DateConfig
  style?: CSSProperties
  handlerClick: (item: DataMap) => void
}

export default memo(function ListItem(props: ListItemProps) {
  const { rowHeight, item, drawing, titleConfig, abstract, dateConfig, style = {}, handlerClick } = props

  // 摘要内容
  const DigestStr = (() => {
    const len = (item.digestArr && item.digestArr.length) || 0
    return len > 0
      ? item.digestArr?.map((digest, i) => (
          <Fragment key={i}>
            {digest}
            {i < len - 1 && <br />}
          </Fragment>
        ))
      : item.digest
  })()

  //  时间内容
  const DateJsx = (() => {
    let contain: ReactNode = null
    if (!dateConfig.display || !item.date) return contain
    const _date = new Date(item.date)
    if (_date.toString() === 'Invalid Date') return contain
    const { date: dateforMat, time: timeforMat } = dateConfig.format || {},
      momentDate = moment(_date)

    let dateValue
    if (dateforMat?.forMat === 'Monday' || dateforMat?.forMat === 'Mon') {
      const day = _date.getDay()
      dateValue = dateforMat?.forMat === 'Monday' ? dayName[day] : dayName[day].slice(0, 3)
      dateValue = dateforMat?.display ? dateValue : ''
    } else {
      dateValue = dateforMat?.display ? momentDate.format(dateforMat?.forMat) : ''
    }

    const timeValue = timeforMat?.display ? momentDate.format(timeforMat.forMat) : '',
      val = `${dateValue}${dateValue && timeValue ? ' ' : ''}${timeValue}`,
      dateStyle: CSSProperties = {
        ...dateConfig.dateStyle,
        backgroundColor: dateConfig.bgColor,
        fontStyle: dateConfig.dateStyle?.italics ? 'italic' : 'initial',
        padding: `${dateConfig.margin?.t}px ${dateConfig.margin?.r}px ${dateConfig.margin?.b}px ${dateConfig.margin?.l}px`
      }

    contain = <span style={dateStyle}>{val}</span>
    return contain
  })()

  const drawPositionStyle =
    drawing.position === 'left' ? { paddingLeft: drawing.leftMargin || 0 } : { paddingRight: drawing.rightMargin || 0 }

  return (
    <li
      className='list-item'
      style={{ width: '100%', height: rowHeight, ...style }}
      key={item.code}
      onClick={() => handlerClick(item)}>
      {drawing.display && (
        <div className='new-thumbnail' style={drawPositionStyle}>
          {item.picture && <img src={item.picture} alt='' />}
        </div>
      )}
      <div className='new-data'>
        <div className='news-title'>
          <h3
            title={item.title}
            className={`${titleConfig.titleShowrownum > 0 ? 'data-show-ellipsis' : ''}`}
            style={{
              ...titleConfig.titleStyle,
              fontStyle: titleConfig.titleStyle.italics ? 'italic' : 'initial',
              background: titleConfig.titleBgColor
            }}>
            {item.title}
          </h3>
        </div>
        <div className='new-split' />
        <p
          style={{
            ...abstract.absStyle,
            fontStyle: abstract.absStyle.italics ? 'italic' : 'initial',
            background: abstract.absBgColor,
            flex: abstract.absShowrownum > 0 ? 'none' : 1
          }}>
          <span title={item.digest || ''} className={`${abstract.absShowrownum > 0 ? 'data-show-ellipsis' : ''}`}>
            {DigestStr}
          </span>
        </p>
        {DateJsx}
      </div>
    </li>
  )
})
