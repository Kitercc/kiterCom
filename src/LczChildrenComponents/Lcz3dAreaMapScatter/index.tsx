import { memo, useEffect, useRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutScatter, ScatterData } from '../../Lcz3dAreaMap/type/child'
import Scatter from './common/scatter'

interface Lcz3dAreaMapScatterProps {
  scatter: OutScatter
  stretchHeight: number
  threeMap: CreateThreeMap
  mapPath: MapPath[]
  chindEvent: (id: any, type: string, param: any) => void
}

export default memo(function Lcz3dAreaMapScatter({
  stretchHeight,
  scatter,
  threeMap,
  mapPath,
  chindEvent
}: Lcz3dAreaMapScatterProps) {
  const level = mapPath.length <= 1 ? 0 : mapPath.length - 1

  const scatterInstance = useRef<Scatter | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  function scatterEvent(data: ScatterData) {
    scatter.onClick && chindEvent && chindEvent(scatter.id, 'onClick', data)
  }

  useEffect(() => {
    scatterInstance.current = new Scatter({ scatter, threeMap, level, scatterEvent })

    return () => {
      scatterInstance.current?.destroy()
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (scatterInstance.current) {
        scatterInstance.current.updataView({ scatter, threeMap, level, stretchHeight })
      }
    }, 10)
  }, [JSON.stringify(scatter), threeMap, JSON.stringify(mapPath), stretchHeight])

  return null
})
