import React, { memo, Fragment, useEffect, useRef } from 'react'
import { usemEffect } from '../../common/hooks'
import Earth from '../../LczEarth/common/earth'
import { OutAreaHeat } from '../../LczEarth/type/child'
import Heat from './common/heat'

type Props = {
  areaHeat: OutAreaHeat
  earth: Earth
}

const LczEarthAreaHeat = memo(function LczEarthAreaHeat({ areaHeat, earth }: Props) {
  const heatInstance = useRef<Heat | null>(null)

  usemEffect(() => {
    if (heatInstance.current) heatInstance.current.updata(areaHeat)
  }, [areaHeat])

  useEffect(() => {
    heatInstance.current = new Heat({ earth, areaHeat })
    return () => {
      heatInstance.current && heatInstance.current.destroy()
    }
  }, [])

  return <Fragment />
})

export default LczEarthAreaHeat
