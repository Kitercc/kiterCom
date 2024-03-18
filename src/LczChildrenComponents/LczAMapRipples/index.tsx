import React, { memo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import Ripples from './common/ripples'
import { OutRipples } from '../../LczAMap/type/child'

interface LczAMapRipplesProps {
  ripples: OutRipples
  mAmap: mAMap
}

export default memo(function LczAMapRipples(props: LczAMapRipplesProps) {
  const { ripples, mAmap } = props

  const ripplesInstance = useRef<Ripples | null>(null)

  useEffect(() => {
    // @ts-ignore
    if (mAmap.map && window.Loca) {
      ripplesInstance.current = new Ripples({ mAmap })
    } else {
      ripplesInstance.current?.destroy()
      ripplesInstance.current = null
    }

    return () => {
      ripplesInstance.current?.destroy()
      ripplesInstance.current = null
    }
  }, [mAmap])

  useEffect(() => {
    if (ripplesInstance.current) {
      ripplesInstance.current.updataView(ripples)
    }
  }, [mAmap, ripplesInstance.current, JSON.stringify(ripples)])

  return <></>
})
