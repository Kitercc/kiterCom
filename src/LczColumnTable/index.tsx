import React, { CSSProperties, memo, useRef } from 'react'
import { usemMemo } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { Border } from '../LczCalendar/type'
import { formatCardListData } from '../LczCardList/common'
import ColumnTableBody from './components/ColumnTableBody'
import Header from './components/Header'
import { LczColumnTableWrapper } from './style/styled'
import { ColumnTableProps, ScrollConfig } from './type'

const LczColumnTable = memo((props: ColumnTableProps) => {
  const { h = 0, globalConfig, header, customCol = [], data = [] } = props,
    { arrangementMode = 'portrait', rowNumber = 4, scrollConfig, columnNumber = 3, columnLine, border } =
      globalConfig || {},
    { display: wBorderDis = false, width: wBorderWid = 1, color: wBorderColor } = border || {}

  const tableBody = useRef<any>(null)

  const dataMemo = usemMemo(() => {
    return formatCardListData(data, arrangementMode === 'portrait', columnNumber, rowNumber)
  }, [data, arrangementMode === 'portrait', columnNumber, rowNumber])

  const wrapperStyle: CSSProperties = {}

  if (wBorderDis) {
    wrapperStyle.border = `${wBorderWid}px solid ${wBorderColor}`
  }

  const scrollBarWidth =
    scrollConfig?.display && scrollConfig.trackConfig?.display ? scrollConfig.trackConfig.thickness || 0 : 0

  const tableBodyHeight = h - (header?.display ? header.height : 0) - scrollBarWidth - (wBorderDis ? wBorderWid * 2 : 0)

  function wrapperHandler(type: 'enter' | 'leave', e) {
    switch (type) {
      case 'enter': {
        tableBody.current && tableBody.current.onMouseEnter()
        break
      }
      case 'leave': {
        tableBody.current && tableBody.current.onMouseLeave(e)
        break
      }
    }
  }

  return (
    <LczComCon>
      <LczColumnTableWrapper
        scrollConfig={scrollConfig || ({} as ScrollConfig)}
        isPortrait={arrangementMode === 'portrait'}
        className='lcz-column-table-wrapper'
        style={wrapperStyle}
        onMouseEnter={wrapperHandler.bind(null, 'enter')}
        onMouseLeave={wrapperHandler.bind(null, 'leave')}>
        {header?.display && (
          <Header
            header={header}
            dataLen={dataMemo.length}
            isPortrait={arrangementMode === 'portrait'}
            columnLine={columnLine || ({} as Border)}
            customCol={customCol}
            columnNumber={columnNumber}
            scrollBarWidth={scrollBarWidth}
          />
        )}
        <ColumnTableBody ref={tableBody} dataMemo={dataMemo} tableBodyHeight={tableBodyHeight} {...props} />
      </LczColumnTableWrapper>
    </LczComCon>
  )
})

LczColumnTable.displayName = 'LczColumnTable'
export default LczColumnTable
