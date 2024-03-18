import React, { memo, useMemo, useRef, useEffect, useState } from 'react'
import { cloneDeep } from 'lodash'
import { BarrageDataMap, BarrageProps } from '../type'
import { defaultBarrageStyle, getFormatBarrageData } from '../common'
import LczComCon from '../../common/LczComCon'
import { BarrageWrapper } from '../style'
import PreviewBarrageItem from './PreviewBarrageItem'

export default memo(function PreviewBarrage(props: BarrageProps) {
  const {
    w = 400,
    h = 400,
    data = [],
    maxBarrageNums = 1000,
    rowNums = 5,
    speed = 0.2,
    timeInterval = 200,
    loop = true,
    hoverStop = false,
    barrageStyle = defaultBarrageStyle,
    onClick
  } = props
  const { fontSize } = barrageStyle
  const dataValueRef = useRef<any>([])
  const barrageItemRef = useRef<any>({})
  const dataWidthArrRef = useRef<any>({})
  const isHoverRef = useRef<any>({ status: false, barrageStartFnArr: [] })
  const [dataMemo, setDataMemo] = useState<BarrageDataMap[]>([])
  const time = useRef<any>(null)
  const updateInfo = useRef<any>({ removeIds: [], totalLen: 0 })

  useEffect(() => {
    if (data.length) {
      const sliceData = data.slice(-maxBarrageNums)
      const formatData = getFormatBarrageData(sliceData, {
        ...updateInfo.current,
        rowNums: Math.min(rowNums, [...dataValueRef.current, ...sliceData].length),
        callback: dataChangeCallback
      })
      const clearIsRowLastArr = cloneDeep(dataValueRef.current).map(item => ({ ...item, isRowLast: false }))
      const _data = [...clearIsRowLastArr, ...formatData]
      dataValueRef.current = cloneDeep(_data)
      updateInfo.current.totalLen += sliceData.length
      setDataMemo(_data)
    }
  }, [data])

  function dataChangeCallback({ text }: BarrageDataMap) {
    if (!dataWidthArrRef.current[text]) {
      const span = document.createElement('span')
      span.innerText = text
      span.style.fontSize = fontSize + 'px'
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(span)
      const offsetWidth = span.offsetWidth
      dataWidthArrRef.current[text] = offsetWidth
      span.remove()
    }
  }

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
  }, [data.length, rowNums, fontSize, h])

  function rowLastStart(id, rowIndex, { callback }: any) {
    const rowIndexSameItems = dataValueRef.current.filter(v => v.rowIndex == rowIndex) || []
    if (rowIndexSameItems.length) {
      const currentIndx = rowIndexSameItems.findIndex(v => v.id == id)
      if (currentIndx + 1 <= rowIndexSameItems.length - 1) {
        const nextItem = rowIndexSameItems[currentIndx + 1],
          nextItemRef = barrageItemRef.current[nextItem.id]
        setTimeout(() => {
          if (isHoverRef.current.status) {
            isHoverRef.current.barrageStartFnArr.push(nextItemRef.barrageAnimate)
          } else {
            nextItemRef.barrageAnimate()
          }
        }, timeInterval)
        callback && callback()
      }
    }
  }

  function removeWaitItem(itemData: BarrageDataMap) {
    const ref = barrageItemRef.current[itemData?.id || '']
    if (!itemData || maxBarrageNums >= dataValueRef.current.length || !ref) return
    updateInfo.current.removeIds.push(itemData.id)
    time.current && clearTimeout(time.current)
    time.current = setTimeout(() => {
      const { removeIds } = updateInfo.current
      const newDataMemo = dataValueRef.current.filter(v => !removeIds.includes(v.id))
      dataValueRef.current = newDataMemo
      setDataMemo(newDataMemo)
    }, 100)
  }

  function rowLoopStart(id: string, rowIndex: number) {
    if (loop) {
      const lastIndex: number = dataValueRef.current.findIndex((v: any) => v && v.isRowLast && v.id === id)

      if (lastIndex !== -1) {
        const rowIndexSameItems = dataValueRef.current.filter(v => v.rowIndex == rowIndex) || []
        const ids = rowIndexSameItems[0].id
        barrageItemRef.current[ids].barrageAnimate()
      }
    }
  }

  function barrageClick(text: string) {
    onClick && onClick({ text })
  }

  function barrageOnMouseEnter() {
    if (hoverStop) {
      isHoverRef.current.status = true
      dataValueRef.current.forEach(item => {
        const itemRef = barrageItemRef.current[item.id]
        if (itemRef && itemRef.moveState.current) {
          itemRef.barrageStop()
        }
      })
    }
  }

  function barrageOnMouseLeave() {
    if (hoverStop) {
      dataValueRef.current.forEach(item => {
        const itemRef = barrageItemRef.current[item.id]
        if (itemRef && itemRef.moveState.current) {
          itemRef.barrageStart()
        }
      })
      isHoverRef.current.barrageStartFnArr.forEach(item => item())
      isHoverRef.current = {
        status: false,
        barrageStartFnArr: []
      }
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <BarrageWrapper onMouseEnter={barrageOnMouseEnter} onMouseLeave={barrageOnMouseLeave} className='barrage-warp'>
        {dataMemo.length > 0 &&
          dataMemo.map(v => (
            <PreviewBarrageItem
              ref={ref => {
                barrageItemRef.current[v.id || ''] = ref
              }}
              key={v.id}
              data={v}
              w={w}
              rowIndex={v.rowIndex}
              rowSortNums={v.rowSortNums}
              speed={speed}
              barrageStyle={barrageStyle}
              dataWidthArrRef={dataWidthArrRef.current}
              barrageItemHeight={barrageItemHeight}
              rowLastStart={rowLastStart}
              rowLoopStart={rowLoopStart}
              barrageClick={barrageClick}
              removeWaitItem={removeWaitItem}
            />
          ))}
      </BarrageWrapper>
    </LczComCon>
  )
})
