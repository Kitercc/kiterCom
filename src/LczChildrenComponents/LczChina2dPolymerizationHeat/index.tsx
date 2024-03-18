import React, { memo, useState, useRef, useEffect } from 'react'
import Heat from './common/heat'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutPolymerizationHeat } from '../../LczChina2dMap/type/child'
import { HeatWrapper } from './style'

interface HeatProps {
  w: number
  h: number
  heatConfig: OutPolymerizationHeat
  myMap: ChinaMap
}

export default memo(function LczChina2dPolymerizationHeat(props: HeatProps) {
  const { heatConfig, myMap, w, h } = props
  const {
    data = [],
    maxValue,
    minValue,
    maxOpacity,
    minOpacity,
    colorSeries = [],
    fuzzyFactor,
    radius,
    dataAnimate
  } = heatConfig

  const wrapper = useRef<HTMLDivElement>(null)
  const [heatmap, setHeatmap] = useState<Heat | null>(null)

  useEffect(() => {
    if (wrapper.current && !heatmap) {
      const heat = new Heat({ el: wrapper.current, w, h, heatConfig, myMap })
      setHeatmap(heat)
    }
    return () => {
      heatmap && heatmap.destroy()
      setHeatmap(null)
    }
  }, [])

  useEffect(() => {
    if (heatmap && data) {
      heatmap.lastData = [...data]
      heatmap.setDrawData(data)
    }
  }, [JSON.stringify(data), maxValue, minValue])

  useEffect(() => {
    if (heatmap) {
      heatmap.w = w
      heatmap.h = h
      heatmap.drawData.clear()
      heatmap.heatConfig = heatConfig
      heatmap.myMap = myMap
      heatmap.getProjection()
      heatmap.setDrawData()
      // heatmap.heatmapInstance.repaint()
    }
  }, [w, h, JSON.stringify(myMap.mapData), JSON.stringify(dataAnimate)])

  useEffect(() => {
    if (heatmap) {
      heatmap.upDataotherProp(heatConfig)
    }
  }, [maxOpacity, minOpacity, JSON.stringify(colorSeries), fuzzyFactor, radius])

  return (
    <HeatWrapper className='lcz-china2d-polymerizationHeat-wrapper'>
      <div className='heat-wrapper' ref={wrapper}></div>
    </HeatWrapper>
  )
})
