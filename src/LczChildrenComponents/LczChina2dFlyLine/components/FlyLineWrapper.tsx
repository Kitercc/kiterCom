import React, { memo, useEffect, useRef } from 'react'
import ChinaMap from '../../../LczChina2dMap/common/chinaMap'
import { OutFlyLine } from '../../../LczChina2dMap/type/child'
import FlyLine from '../common/FlyLine'

interface LczFlyLineProps {
  w: number
  h: number
  flyLine: OutFlyLine
  myMap: ChinaMap
}

export default memo(function FlyLineWrapper(props: LczFlyLineProps) {
  const { w, h, flyLine, myMap } = props

  const wrapper = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const flyLineRef = useRef<FlyLine>({})

  useEffect(() => {
    flyLineRef.current = new FlyLine({ Map: myMap, wrapper: wrapper.current as HTMLDivElement })
    return () => {
      flyLineRef.current?.destroy && flyLineRef.current?.destroy()
      // @ts-ignore
      flyLineRef.current = null
    }
  }, [])

  useEffect(() => {
    try {
      flyLineRef.current.drawTrajectory(wrapper.current, myMap, flyLine, { w, h })
    } catch (error) {
      console.warn(error)
    }
  }, [JSON.stringify(myMap.mapData), JSON.stringify(flyLine), w, h])

  return <div ref={wrapper}></div>
})
