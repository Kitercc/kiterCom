import React, { memo, useRef, forwardRef, useImperativeHandle } from 'react'
import useColumnBodyAnimate from '../common/hooks/useColumnBodyAnimate'
import useColumnBodyStyles from '../common/hooks/useColumnBodyStyles'
import { ColumnTableProps } from '../type'
import ColumnLine from './ColumnLine'
import FieldCom from './FieldCom'

interface ColumnTableBodyProps extends ColumnTableProps {
  tableBodyHeight: number
  dataMemo: any[][]
}

const ColumnTableBody = forwardRef((props: ColumnTableBodyProps, ref: any) => {
  const {
      w = 0,
      h = 0,
      globalConfig,
      animateConfig,
      tableBodyHeight,
      lineconfig,
      customCol = [],
      dataMemo = [],
      onClick
    } = props,
    isPortrait = globalConfig?.arrangementMode === 'portrait',
    lineNum = isPortrait ? dataMemo.length : globalConfig?.columnNumber || 0,
    itemWidth = customCol.reduce((total, col) => total + col.colWidth, 0),
    dataMaxLen = dataMemo.length ? Math.max(...dataMemo.map(v => v.length)) : 0

  const listRef = useRef<HTMLDivElement>(null)

  const { styles, getLineStyle } = useColumnBodyStyles({ tableBodyHeight, lineconfig, globalConfig })

  const { dataList, onMouseEnter, onMouseLeave } = useColumnBodyAnimate(
    dataMemo,
    listRef as React.RefObject<HTMLDivElement>,
    {
      globalConfig,
      animateConfig,
      itemWidth,
      lineSpeed: lineconfig?.lineSpeed || 0,
      tableBodyHeight,
      w,
      h
    }
  )

  useImperativeHandle(ref, () => ({ onMouseEnter, onMouseLeave }))

  function handlerClick(dataItem: any) {
    onClick && onClick(dataItem)
  }

  return (
    <div className='lcz-column-table-body' style={{ height: tableBodyHeight }}>
      <div className='lcz-column-table-container'>
        <div ref={listRef} className='lcz-column-table-list' style={styles.listStyle}>
          {dataList.current.map((item, index) => (
            <ul
              className='lcz-column-table-ul'
              key={item[0].__code}
              style={{ ...styles.ulStyle, ...getLineStyle(item[0].__index, 'list') }}>
              {Array(dataMaxLen)
                .fill(0)
                .map((_, i) => (
                  <li
                    key={i}
                    style={{
                      ...styles.filedStyle,
                      width: itemWidth,
                      ...getLineStyle(i, 'li', { index, maxLen: dataList.current.length })
                    }}
                    className='filed-con'
                    onClick={handlerClick.bind(null, item[i])}>
                    <FieldCom dataItem={item[i]} customCol={customCol} id={props.id} />
                  </li>
                ))}
            </ul>
          ))}
          <ColumnLine num={lineNum - 1} border={globalConfig?.columnLine || {}} itemWidth={itemWidth} />
        </div>
      </div>
    </div>
  )
})

ColumnTableBody.displayName = 'ColumnTableBody'
export default memo(ColumnTableBody)
