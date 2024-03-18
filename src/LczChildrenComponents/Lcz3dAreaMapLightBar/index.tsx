import { memo, useEffect, useRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutLightBar } from '../../Lcz3dAreaMap/type/child'
import LightBar from './common/lightbar'

interface Lcz3dAreaMapLightBarProps {
  lightbar: OutLightBar
  stretchHeight: number
  threeMap: CreateThreeMap
  mapPath: MapPath[]

  chindEvent: (id: any, type: string, param: any) => void
}

export default memo(function Lcz3dAreaMapLightBar({
  lightbar,
  stretchHeight,
  threeMap,
  mapPath,
  chindEvent
}: Lcz3dAreaMapLightBarProps) {
  const level = mapPath.length <= 1 ? 0 : mapPath.length - 1

  const lightbarInstance = useRef<LightBar | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    lightbarInstance.current = new LightBar({ lightbar, threeMap, level, chindEvent })

    return () => {
      lightbarInstance.current && lightbarInstance.current.destroy()
      lightbarInstance.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      lightbarInstance.current && lightbarInstance.current.updataView(lightbar, threeMap, level, stretchHeight)
    }, 10)
  }, [JSON.stringify(lightbar), threeMap, JSON.stringify(mapPath), stretchHeight])

  return null
})
