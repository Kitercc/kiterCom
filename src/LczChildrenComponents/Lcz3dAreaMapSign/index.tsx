import React, { memo, useEffect, useRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { OutSign } from '../../Lcz3dAreaMap/type/child'
import Signs from './common/Sign'

interface SignProps {
  stretchHeight: number
  sign: OutSign
  threeMap: CreateThreeMap
  mapPath: MapPath[]
}

export default memo(function Lcz3dAreaMapSign({ stretchHeight, sign, threeMap, mapPath }: SignProps) {
  const level = mapPath.length <= 1 ? 0 : mapPath.length - 1

  const signInstance = useRef<Signs | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const signs = new Signs({ sign, threeMap, level })
    signInstance.current = signs

    return () => {
      signInstance.current?.destroy()
      signInstance.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (signInstance.current) {
        signInstance.current.updataView(stretchHeight, sign, threeMap, level)
      }
    }, 10)
  }, [stretchHeight, sign, threeMap, JSON.stringify(mapPath)])

  return <></>
})
