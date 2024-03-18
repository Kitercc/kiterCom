import React, { memo, useMemo, useRef, useEffect, useState } from 'react'
import { BarrageWrapper } from '../style'
import { BarrageProps } from '../type'
import { defaultBarrageStyle, getFormatBarrageData } from '../common'
import LczComCon from '../../common/LczComCon'
import DesignBarrageItem from './DesignBarrageItem'

export default memo(function DesignBarrage(props: BarrageProps) {
  const {
    h = 400,
    data = [],
    maxBarrageNums = 1000,
    rowNums = 5,
    speed = 0.2,
    timeInterval = 200,
    loop = true,
    barrageStyle = defaultBarrageStyle,
    onClick
  } = props

  const { fontSize } = barrageStyle
  const barrageItemRef = useRef<any>({})

  const [dataMemo, setDataMemo] = useState<{ text: string; id: string }[]>([])

  useEffect(() => {
    const formatData = getFormatBarrageData(data)
    setDataMemo(formatData.slice(-maxBarrageNums))
  }, [JSON.stringify(props)])

  const barrageItemHeight = useMemo(() => {
    const div = document.createElement('div')
    div.innerHTML = 'div'
    div.style.fontSize = fontSize + 'px'
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(div)
    const rows = Math.min(data.length, rowNums)
    const containerHeight = div.offsetHeight
    body.removeChild(div)
    if (rows * containerHeight < h) {
      return (1 / rows) * h
    } else {
      return containerHeight
    }
  }, [data.length, rowNums, h, fontSize])

  function rowLastStart(rowIndex, rowSortNums, { callback }: any) {
    for (const key in barrageItemRef.current) {
      const itemRef = barrageItemRef.current[key]
      if (!itemRef) continue
      if (itemRef.rowIndex === rowIndex && itemRef.rowSortNums === rowSortNums + 1) {
        setTimeout(() => {
          itemRef.barrageStart()
        }, timeInterval)
        callback && callback()
      }
    }
  }

  function barrageClick(text: string) {
    onClick && onClick({ text })
  }

  function rowLoopStart(rowIndex: number) {
    if (loop) {
      const loopBarrage: any = Object.values(barrageItemRef.current).find(
        (v: any) => v && v.rowIndex == rowIndex && v.rowSortNums == 1
      )
      loopBarrage && loopBarrage.barrageStart()
    }
  }

  function getRowInfo(index, dataLength) {
    const _rowNums = Math.min(dataLength, rowNums)
    const rowIndex = index % _rowNums
    const rowSortNums = Math.floor(index / _rowNums) + 1
    const isRowLast = index + 1 > dataLength - _rowNums
    return {
      rowIndex,
      rowSortNums,
      isRowLast
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <BarrageWrapper className='barrage-warp'>
        {dataMemo.length > 0 &&
          dataMemo.map((v, index) => (
            <DesignBarrageItem
              ref={ref => {
                barrageItemRef.current[v.id] = ref
              }}
              key={v.id}
              speed={speed}
              data={v}
              barrageStyle={barrageStyle}
              barrageItemHeight={barrageItemHeight}
              {...getRowInfo(index, dataMemo.length)}
              rowLastStart={rowLastStart}
              rowLoopStart={rowLoopStart}
              barrageClick={barrageClick}
            />
          ))}
      </BarrageWrapper>
    </LczComCon>
  )
})
