import React, { Fragment, memo, useEffect, useRef } from 'react'
import { usemEffect } from '../../common/hooks'
import Earth from '../../LczEarth/common/earth'
import { OutRipples } from '../../LczEarth/type/child'
import Ripples from './common/ripples'

type Props = {
  ripples: OutRipples
  earth: Earth
}

const LczEarthRipples = memo(function LczEarthRipples({ ripples, earth }: Props) {
  const ripplesInstance = useRef<Ripples | null>(null)

  usemEffect(() => {
    ripplesInstance.current && ripplesInstance.current.updata(ripples)
  }, [ripples])

  useEffect(() => {
    ripplesInstance.current = new Ripples({ ripples, earth })
    return () => {
      ripplesInstance.current?.destroy()
    }
  }, [])

  return <Fragment />
})

export default LczEarthRipples
