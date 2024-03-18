import React, { Fragment, memo, useEffect, useRef } from 'react'
import { usemEffect } from '../../common/hooks'
import Earth from '../../LczEarth/common/earth'
import { OutScatterPoint, ScatterPointData } from '../../LczEarth/type/child'
import Scatter from './common/scatter'

const LczEarthScatterPoint = memo(function LczEarthScatterPoint({
  scatterPoint,
  earth,
  chindEvent
}: {
  scatterPoint: OutScatterPoint
  earth: Earth
  chindEvent: onChildComEvent
}) {
  const scatterInstance = useRef<Scatter | null>(null)

  usemEffect(() => {
    scatterInstance.current && scatterInstance.current.updata(scatterPoint)
  }, [scatterPoint])

  useEffect(() => {
    scatterInstance.current = new Scatter({ scatterPoint, earth, onClick: handlerClick })

    return () => {
      scatterInstance.current?.destroy()
    }
  }, [])

  function handlerClick(param: ScatterPointData) {
    scatterPoint.onClick && chindEvent(scatterPoint.id, 'onClick', param)
  }

  return <Fragment />
})

export default LczEarthScatterPoint
