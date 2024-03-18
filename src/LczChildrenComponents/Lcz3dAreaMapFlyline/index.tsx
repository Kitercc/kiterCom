import { memo, useEffect, useRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutFlyLine } from '../../Lcz3dAreaMap/type/child'
import FlyLine from './common/flyline'

interface Lcz3dAreaMapFlylineProps {
  flyline: OutFlyLine
  stretchHeight: number
  threeMap: CreateThreeMap
  mapPath: MapPath[]
}

export default memo(function Lcz3dAreaMapFlyline({
  flyline,
  stretchHeight,
  mapPath,
  threeMap
}: Lcz3dAreaMapFlylineProps) {
  const level = mapPath.length <= 1 ? 0 : mapPath.length - 1

  const flylineInstance = useRef<FlyLine | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    flylineInstance.current = new FlyLine({ flyline, stretchHeight, threeMap, level })

    return () => {
      flylineInstance.current?.destroy()
      flylineInstance.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (flylineInstance.current) flylineInstance.current.updataView(flyline, stretchHeight, threeMap, level)
    }, 10)
  }, [JSON.stringify(flyline), threeMap, JSON.stringify(mapPath), stretchHeight])

  return null
})
