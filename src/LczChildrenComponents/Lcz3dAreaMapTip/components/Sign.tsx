import React, { CSSProperties, memo, useEffect, useMemo, useRef, useState } from 'react'
import { TipSign } from '../../../LczChina2dMap/type/child'
import { SignContain } from '../style'

export default memo(function Sign({ sign, itemData }: { sign: TipSign; itemData: any }) {
  const { width, height, imgUrl, rotate } = sign

  const [load, setLoad] = useState(false)
  const timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    setLoad(true)
    timer.current = setTimeout(() => {
      setLoad(false)
    }, 1000)
    return () => {
      timer.current && clearTimeout(timer.current)
    }
  }, [JSON.stringify(itemData)])

  const signStyle = useMemo(() => {
    const _obj: CSSProperties = {}
    _obj.width = width
    _obj.height = height
    _obj.backgroundImage = `url(${imgUrl})`
    return _obj
  }, [JSON.stringify(itemData), JSON.stringify(sign)])

  return (
    <SignContain className={load ? 'scaleing' : ''}>
      <div className={`${rotate ? 'rotateing' : ''}`} style={signStyle} />
    </SignContain>
  )
})
