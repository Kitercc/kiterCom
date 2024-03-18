import { memo, useEffect, useRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutAreaHeat } from '../../Lcz3dAreaMap/type/child'
import AreaHeat from './common/AreaHeat'

interface HeatProps {
  stretchHeight: number
  threeMap: CreateThreeMap
  areaHeat: OutAreaHeat
  mapPath: MapPath[]
}

export default memo(function Lcz3dAreaMapAreaHeat({ stretchHeight, threeMap, areaHeat, mapPath }: HeatProps) {
  const heatInstance = useRef<AreaHeat | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    heatInstance.current = new AreaHeat({ threeMap, areaHeat })

    return () => {
      heatInstance.current?.destroy()
      heatInstance.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (heatInstance.current) {
        heatInstance.current.updataView({ threeMap, areaHeat, mapPath })
      }
    }, 10)
  }, [stretchHeight, threeMap, JSON.stringify(areaHeat), JSON.stringify(mapPath)])

  return null
})
