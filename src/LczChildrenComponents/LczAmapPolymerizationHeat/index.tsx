import { memo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutPolymerizationHeat } from '../../LczAMap/type/child'
import PolymerizationHeat from './common/heat'

export interface PolymerizationHeatProps {
  mAmap: mAMap
  polymerizationHeat: OutPolymerizationHeat
}

const LczAmapPolymerizationHeat = memo(({ mAmap, polymerizationHeat }: PolymerizationHeatProps) => {
  const heatInstance = useRef<PolymerizationHeat | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (mAmap.map) {
      heatInstance.current = new PolymerizationHeat({ map: mAmap.map, polymerizationHeat })
    }

    return () => {
      heatInstance.current?.destroy()
      heatInstance.current = null
    }
  }, [mAmap])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (heatInstance.current?.heatmap) heatInstance.current.updataView(polymerizationHeat)
    }, 10)
  }, [JSON.stringify(polymerizationHeat), mAmap])

  return null
})

LczAmapPolymerizationHeat.displayName = 'LczAmapPolymerizationHeat'
export default LczAmapPolymerizationHeat
