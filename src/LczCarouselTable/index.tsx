import React, { memo, useMemo, useRef } from 'react'
import LczComCon from '../common/LczComCon'
import { CarouseTableWrapper } from './style'
import { CarouseTableProps } from './type'

import { getColStyle } from './common'
import { alignType, randomChar } from '../common/util'
import {
  defaultCarousel,
  defaultEmptyDataStyle,
  defaultGlobalConfig,
  defaultHeader,
  defaultLineConfig,
  defaultSerialCol
} from './common/defaultValue'

import Hearder from './components/Hearder'
import CarouselBody from './components/CarouselBody'
import EmptyDataCom from './components/EmptyDataCom'

const LczCarouselTable = memo((props: CarouseTableProps = {}) => {
  const {
    w = 300,
    h = 0,
    customCol = [],
    carousel = defaultCarousel,
    header = defaultHeader,
    lineconfig = defaultLineConfig,
    globalConfig = defaultGlobalConfig,
    serialCol = defaultSerialCol,
    emptyDataStyle = defaultEmptyDataStyle,
    data = [],
    onMouseenter,
    onMouseleave
  } = props

  const { colWidth, alignType: serialAlign = 'center', serialStyle } = serialCol
  const horcroll = globalConfig.horcroll,
    headerHeight = header.height || 0

  // // hook
  const boxId = useRef<any>(randomChar('lcz-carousel-table')),
    carouselBodyRef = useRef<any>(null)

  // 行长度
  const itemWidth = useMemo(() => {
    const width =
      (customCol || []).reduce((prev, val) => prev + val.colWidth + val.colSpeed, 0) +
      (serialCol.display ? colWidth : 0) +
      (serialCol.display ? serialCol.colSpac : 0)

    if (w && width > w) {
      return width
    }
    return '100%'
  }, [w, JSON.stringify(customCol), JSON.stringify(serialCol)])

  function containerMouseHandler(type: 'enter' | 'leave') {
    switch (type) {
      case 'enter': {
        carouselBodyRef.current?.mouseEnter()
        onMouseenter && onMouseenter({})
        break
      }
      case 'leave': {
        carouselBodyRef.current?.mouseLeave()
        onMouseleave && onMouseleave({})
        break
      }
    }
  }

  const serialColStyle: any = useMemo(() => {
    return { ...serialStyle, width: colWidth, justifyContent: alignType[serialAlign], textAlign: serialAlign }
  }, [JSON.stringify(serialStyle), colWidth, serialAlign])

  const tablebodyheight =
    h -
    (header.display ? headerHeight : 0) -
    (horcroll?.display && horcroll.trackConfig?.display ? horcroll.trackConfig.thickness || 0 : 0)

  return (
    <CarouseTableWrapper
      interval={carousel.interval}
      lineBorder={lineconfig.borderStyle}
      horcroll={horcroll}
      sliderConfig={horcroll!.sliderConfig}
      itemWidth={itemWidth}
      carousel={carousel}
      className='lcz-carouse-table-wrapper'>
      <LczComCon id={boxId.current}>
        <div
          className='lcz-carouse-table-container'
          onMouseEnter={containerMouseHandler.bind(null, 'enter')}
          onMouseLeave={containerMouseHandler.bind(null, 'leave')}
          style={{ width: itemWidth }}>
          {header.display && (
            <Hearder
              serialColStyle={serialColStyle}
              customCol={customCol}
              serialCol={serialCol}
              header={header}
              itemWidth={itemWidth}
              getColStyle={getColStyle}
            />
          )}

          {!data.length && emptyDataStyle.display ? (
            <EmptyDataCom emptyDataStyle={emptyDataStyle} itemWidth={itemWidth} tablebodyheight={tablebodyheight} />
          ) : (
            <CarouselBody
              ref={carouselBodyRef}
              tableProps={props}
              itemWidth={itemWidth}
              serialColStyle={serialColStyle}
              boxId={boxId.current}
              tablebodyheight={tablebodyheight}
            />
          )}
        </div>
      </LczComCon>
    </CarouseTableWrapper>
  )
})

LczCarouselTable.displayName = 'LczCarouselTable'

export default LczCarouselTable
