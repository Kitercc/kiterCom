import { memo, useRef, useEffect } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutRipples } from '../../Lcz3dAreaMap/type/child'
import Ripples from './common/ripples'

interface Lcz3dAreaMapRipples {
  stretchHeight: number
  ripples: OutRipples
  threeMap: CreateThreeMap
  mapPath: MapPath[]
}

export default memo(function Lcz3dAreaMapRipples(props: Lcz3dAreaMapRipples) {
  const { ripples, stretchHeight, threeMap, mapPath } = props,
    level = mapPath.length <= 1 ? 0 : mapPath.length - 1

  const instanceRef = useRef<Ripples | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const ripple = new Ripples({
      level,
      mapInstance: threeMap,
      ripples
    })
    instanceRef.current = ripple

    return () => {
      instanceRef.current?.destroy()
      instanceRef.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (instanceRef.current) {
        instanceRef.current.updataView({
          level,
          mapInstance: threeMap,
          ripples,
          stretchHeight
        })
      }
    }, 10)
  }, [JSON.stringify(mapPath), stretchHeight, threeMap, JSON.stringify(ripples)])

  return null
})
