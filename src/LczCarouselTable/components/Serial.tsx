import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react'
import { getSerialStyle } from '../common'
import { SerialStyleList } from '../type'

interface SerialProps {
  serialColStyle: any
  seriesStyleMemo: {
    styleObj: CSSProperties
    fontStyle: CSSProperties
  }
  item: any
  inintNumber: number
  serialStyleList: SerialStyleList[]
}

export default memo(function Serial(props: SerialProps) {
  const { serialColStyle, seriesStyleMemo, item, inintNumber, serialStyleList } = props

  const serialName = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState<number>(0)

  const serialStyle = useMemo(() => {
    return getSerialStyle(item, item._id - inintNumber, serialStyleList)
  }, [item, inintNumber, serialStyleList])
  useEffect(() => {
    const serialNameW = serialName.current?.clientWidth || 0,
      bgWidth = (serialStyle?.bgStyle?.width || 0) as number

    if (bgWidth > serialNameW) {
      setWidth(bgWidth)
    } else {
      setWidth(serialNameW)
    }
  }, [JSON.stringify(props)])

  return (
    <div style={{ ...serialColStyle, ...seriesStyleMemo.fontStyle }} className='col-serial'>
      <div className='serial-con' style={{ width }}>
        <div style={{ ...serialStyle.bgStyle }} className='lcz-serial-bg' />
        <span style={{ ...serialStyle.valStyle }} ref={serialName}>
          {item._id}
        </span>
        <i style={{ ...serialStyle.valStyle, transform: '' }}>{item._id}</i>
      </div>
    </div>
  )
})
