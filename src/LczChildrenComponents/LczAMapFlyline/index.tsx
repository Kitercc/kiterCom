import React, { memo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutFlyLine } from '../../LczAMap/type/child'
import FlyLine from './common/flyline'

interface LczAMapFlylineProps {
  flyline: OutFlyLine
  mAmap: mAMap
}

export default memo(function LczAMapFlyline(props: LczAMapFlylineProps) {
  const { flyline, mAmap } = props

  const flylineRef = useRef<FlyLine | null>(null)

  useEffect(() => {
    if (mAmap.map) {
      flylineRef.current = new FlyLine({ map: mAmap.map })
    } else {
      flylineRef.current?.destroy()
      flylineRef.current = null
    }

    return () => {
      flylineRef.current?.destroy()
      flylineRef.current = null
    }
  }, [mAmap])

  useEffect(() => {
    if (flylineRef.current) {
      flylineRef.current.updataView(flyline)
    }
  }, [mAmap, flylineRef.current, JSON.stringify(flyline)])

  return <></>
})
