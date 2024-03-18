import React, { Fragment, memo, useEffect, useRef } from 'react'
import { usemEffect } from '../../common/hooks'
import Earth from '../../LczEarth/common/earth'
import { OutFlyLine } from '../../LczEarth/type/child'
import FlyLine from './common/flyLine'

type Props = {
  earth: Earth
  flyLine: OutFlyLine
}

const LczEarthFlyLine = memo(function LczEarthFlyLine({ earth, flyLine }: Props) {
  const flyLineInstance = useRef<FlyLine | null>(null)

  usemEffect(() => {
    flyLineInstance.current && flyLineInstance.current.updataFlyLine(flyLine)
  }, [flyLine])

  useEffect(() => {
    flyLineInstance.current = new FlyLine({ earth, flyLine })
    return () => {
      flyLineInstance.current?.destroy()
    }
  }, [])

  return <Fragment />
})

export default LczEarthFlyLine
