import React, { memo, useEffect, useRef } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutToolTip } from '../../LczAMap/type/child'
import Tooltip from './components/Tooltip'
import Amaptooltip from './common/tooltip'

interface LczAMapTooltipProps {
  tooltip: OutToolTip
  mAmap: mAMap
}

export default memo(function LczAMapTooltip(props: LczAMapTooltipProps) {
  const { tooltip, mAmap } = props,
    { positionConfig, data = [] } = tooltip

  const tooltipRef = useRef<Amaptooltip | null>(null)

  useEffect(() => {
    if (mAmap.map && !positionConfig?.fixed) {
      tooltipRef.current = new Amaptooltip({ mAmap })
    }

    return () => {
      tooltipRef.current?.destroy()
      tooltipRef.current = null
    }
  }, [mAmap, positionConfig?.fixed])

  useEffect(() => {
    if (mAmap.map && !positionConfig?.fixed && tooltipRef.current) {
      tooltipRef.current.upDataView(tooltip)
    }
  }, [mAmap, JSON.stringify(tooltip)])

  return (
    <>
      {positionConfig?.fixed ? (
        <Tooltip design={mAmap.config?.design || false} id={tooltip.id} data={data[0]} tooltip={tooltip} />
      ) : null}
    </>
  )
})
