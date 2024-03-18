import React, { CSSProperties, memo } from 'react'
import { usemMemo } from '../../common/hooks'
import { Border } from '../../LczCalendar/type'
import { ColumnArr, HeaderConfig } from '../type'
import ColumnLine from './ColumnLine'

interface HeaderProps {
  header: HeaderConfig
  dataLen: number
  isPortrait: boolean
  columnNumber: number
  columnLine: Border
  scrollBarWidth: number
  customCol: ColumnArr[]
}

const Header = memo((props: HeaderProps) => {
  const { header, dataLen, isPortrait, columnNumber, columnLine, customCol = [], scrollBarWidth = 0 } = props

  const headNum = isPortrait ? dataLen : columnNumber
  const itemWidth = customCol.reduce((pre, item) => pre + item.colWidth, 0)
  const styleds = usemMemo(() => {
    const { height = 0, align = 'left', bgColor, headerStyle: hStyle } = header || {}

    const wrapper: CSSProperties = { height, width: itemWidth * headNum }
    const headerStyle: CSSProperties = {
      height,
      width: itemWidth * headNum + scrollBarWidth,
      ...hStyle,
      backgroundColor: bgColor,
      textAlign: align,
      paddingRight: scrollBarWidth
    }

    return { wrapper, headerStyle }
  }, [header, itemWidth, headNum, scrollBarWidth])

  return (
    <div className='lcz-column-table-wrapper' style={styleds.wrapper}>
      <ul className='lcz-column-table-header' style={styleds.headerStyle}>
        {Array(headNum)
          .fill(null)
          .map((_, i) => (
            <li key={i}>
              {customCol.map((item, index) => (
                <span key={index} style={{ width: item.colWidth, paddingLeft: item.xOffset }}>
                  {item.colName}
                </span>
              ))}
            </li>
          ))}
      </ul>
      <ColumnLine num={headNum - 1} border={columnLine} itemWidth={itemWidth} />
    </div>
  )
})

Header.displayName = 'Header'
export default Header
