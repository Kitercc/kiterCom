import React, { memo, useCallback, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import { usemMemo, useTabActIndex } from '../common/hooks'
import { conversionData, arrDuplicateRemove } from '../common/util'
import { DataMap, LczPointTimelineProps } from './type'
import TimelineItem from './components/TimelineItem'
import ArrowWrap from './components/ArrowWrap'
import useTimelineStyle from './common/useTimelineStyle'
import useScroll from './common/useScroll'

const LczPointTimeline = memo(function LczPointTimeline(props: LczPointTimelineProps) {
  const { w, h, globalConfig, timelineConfig, animateConfig, data = [], onClick } = props,
    { valueType = 'index', id, index, itemAxisWidth, axisPadding = 0, direction = 'level', arrowConfig } =
      globalConfig || {},
    { duration = 1 } = animateConfig || {},
    isLevel = direction === 'level'

  const dataMemo = usemMemo(() => {
    const cData = conversionData(data, { id: 'string', text: 'string', content: 'string' }) as DataMap[]
    return arrDuplicateRemove(cData, 'id') as DataMap[]
  }, [data])

  const pointHandlerClick = useCallback(
    (i: number, click = false) => {
      click && onClick && onClick(dataMemo[i])
      setCurrIndex(i)
      pointCenterByIndex(i)
    },
    [dataMemo, isLevel, w, h, itemAxisWidth, axisPadding]
  )
  const [currIndex, setCurrIndex] = useTabActIndex({
    data: dataMemo,
    valueType,
    id,
    index,
    fillIndex: -1,
    callback: pointHandlerClick
  })
  const timelineRef = useRef<HTMLUListElement>(null)
  const { timelineStyle, getBothSideStyle } = useTimelineStyle({ globalConfig, timelineConfig })
  const { pointCenterByIndex, cancelAnimation, startCarousel } = useScroll({
    ...props,
    data: dataMemo,
    currIndex,
    setCurrIndex,
    timelineRef
  })

  function arrowHandler(step = 1) {
    const i = currIndex.current >= 0 ? currIndex.current + step : 0
    setCurrIndex(i)
    pointCenterByIndex(i)
  }

  const contentStyle = {
    padding: isLevel ? `0 ${axisPadding}px` : `${axisPadding}px 0`,
    transition: `transform ${duration}s`
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div
        className='lcz-point-timeline-wrapper'
        onMouseEnter={cancelAnimation.bind(null, 'mouseEnter')}
        onMouseLeave={startCarousel.bind(null, 'mouseLeave')}>
        <div className='lcz-point-timeline-content'>
          <ul ref={timelineRef} className={direction} style={contentStyle}>
            {dataMemo.map((item, i) => (
              <TimelineItem
                key={item.id}
                index={i}
                isActive={i === currIndex.current}
                itemData={item}
                globalConfig={globalConfig}
                timeLineStyle={timelineStyle}
                bothSideStyle={getBothSideStyle(i, i === currIndex.current)}
                onClick={pointHandlerClick}
              />
            ))}
          </ul>
        </div>
        {arrowConfig?.display && (
          <ArrowWrap
            arrowConfig={arrowConfig}
            isLevel={isLevel}
            currIndex={currIndex.current}
            dataLen={dataMemo.length}
            onClick={arrowHandler}
          />
        )}
      </div>
    </LczComCon>
  )
})

export default LczPointTimeline
