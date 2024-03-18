import React, { memo, useMemo, CSSProperties, useState, useRef, useEffect } from 'react'
import { TipSign } from '../../../LczChina2dMap/type/child'

interface SignProps {
  w: number
  h: number
  itemData: any
  projectionPath: {
    center: any
    projection: any
    path: any
  }
  sign: TipSign
  level: number
}

export default memo(function Sign(props: SignProps) {
  const { itemData, projectionPath, sign, level } = props
  const { lat, lng } = itemData
  const { width, height, imgUrl, rotate } = sign

  const [load, setLoad] = useState(false)
  const timer = useRef<any>(null)

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    setLoad(true)
    timer.current = setTimeout(() => {
      setLoad(false)
    }, 1000)
    return () => {
      clearTimeout(timer.current)
    }
  }, [level, JSON.stringify(itemData)])

  const signStyle = useMemo(() => {
    const _obj: { _w: CSSProperties; _v: CSSProperties } = { _w: {}, _v: {} }
    const [x, y] = projectionPath.projection([lng, lat])
    _obj._w.width = width
    _obj._w.height = height
    _obj._w.left = x - width / 2
    _obj._w.top = y - height / 2
    _obj._v.backgroundImage = `url(${imgUrl})`
    return _obj
  }, [JSON.stringify(itemData), JSON.stringify(sign), level, projectionPath])

  return (
    <div className={['lcz-china-map-tip-sign', load ? 'scaleing' : ''].join(' ')} style={signStyle._w}>
      <div className={`${rotate ? 'rotateing' : ''}`} style={signStyle._v} />
    </div>
  )
})
