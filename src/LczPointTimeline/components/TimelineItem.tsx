import React, { CSSProperties, memo } from 'react'
import { DataMap, GlobalConfig } from '../type'

type Props = {
  index: number
  isActive: boolean
  itemData: DataMap
  globalConfig?: GlobalConfig
  timeLineStyle: {
    line: CSSProperties
    defaultPoint: CSSProperties
    activePoint: CSSProperties
    defaultLabel: CSSProperties
    activeLabel: CSSProperties
    defaultContent: CSSProperties
    activeContent: CSSProperties
  }
  bothSideStyle: {
    point: CSSProperties
    label: CSSProperties
    content: CSSProperties
  }
  onClick?: (index: number, click?: boolean) => void
}

const TimelineItem = memo(function TimelineItem(props: Props) {
  const { isActive, index, itemData, globalConfig, timeLineStyle, bothSideStyle, onClick } = props,
    { contentList = [] } = globalConfig || {}

  const pointStyle = isActive ? timeLineStyle.activePoint : timeLineStyle.defaultPoint,
    labelStyle = isActive ? timeLineStyle.activeLabel : timeLineStyle.defaultLabel,
    contentStyle = isActive ? timeLineStyle.activeContent : timeLineStyle.defaultContent

  const { point, label, content } = bothSideStyle

  function showField(field: string) {
    return itemData[field] !== undefined && itemData[field] !== ''
  }

  function itemClick() {
    onClick && onClick(index, true)
  }

  return (
    <li className='timeline-item' style={timeLineStyle.line}>
      <div className='point' style={{ ...pointStyle, ...point }} onClick={itemClick} />
      <div className='label' style={{ ...labelStyle, ...label }} onClick={itemClick}>
        {itemData.text}
      </div>
      <ul className='content' style={{ ...contentStyle, ...content }}>
        {contentList.map(
          (item, i) =>
            showField(item.field) && <li key={i} dangerouslySetInnerHTML={{ __html: itemData[item.field] }} />
        )}
      </ul>
    </li>
  )
})

export default TimelineItem
