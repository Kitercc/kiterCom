import React, { memo, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import CreateThreeMap from '../../Lcz3dAreaMap/common/createThreeMap'
import { MapPath } from '../../Lcz3dAreaMap/type'
import { Area3dMapCurrentArea, OutToolTip } from '../../Lcz3dAreaMap/type/child'
import CurrentArea from './common/currentArea'
import ToolTip from './components/ToolTip'
import { Area3dMapTipWrapper } from './style'

export interface Area3dMapTipProps {
  threeMap: CreateThreeMap
  mapPath: MapPath[]
  tooltip: OutToolTip
  stretchHeight: number
  chindEvent: (id: any, type: string, param: any) => void
}

const Lcz3dAreaMapTip = forwardRef(function Lcz3dAreaMapTip(
  { threeMap, mapPath, tooltip, stretchHeight, chindEvent }: Area3dMapTipProps,
  ref
) {
  const level = mapPath.length < 1 ? -1 : mapPath.length - 1

  const [currentData, setCurrentData] = useState<any>(null),
    targetArea = useRef<CurrentArea | null>(null),
    timer = useRef<NodeJS.Timeout | null>(null),
    mouseOutTime = useRef<NodeJS.Timeout | null>(null)

  useImperativeHandle(ref, () => ({
    activeEvent: (param, type: 'click' | 'mouseenter' | 'mouseleave' | 'mouseout') => {
      const {
        manualTrigger = true,
        targetType = 'click',
        autoCarousel = true,
        movePause = true
      } = (tooltip.currentArea || {}) as Area3dMapCurrentArea
      // 当这个变量为真时 说明当前提示框是显示的
      if (targetArea.current?.running) {
        // 移入或点击选中
        if (manualTrigger && type === targetType) {
          const currentAdcode = param.adcode || param.code,
            data = tooltip.data || []

          // 更新轮播状态
          if (targetArea.current.carouselStatus) targetArea.current.carouselStatus = false

          const index = data.findIndex(item => item.adcode == currentAdcode)
          targetArea.current.currentIndex = index
          targetArea.current?.drawCurrenArea(true)
        }

        // 阻止轮播
        if (type === 'mouseenter') {
          if (manualTrigger || (autoCarousel && movePause)) {
            if (targetArea.current.carouselStatus) targetArea.current.carouselStatus = false
          }
        }

        // 鼠标移出重新开始轮播
        if (type === 'mouseout' && autoCarousel) {
          mouseOutTime.current && clearTimeout(mouseOutTime.current)
          mouseOutTime.current = setTimeout(() => {
            if (targetArea.current && !targetArea.current?.carouselStatus) {
              targetArea.current.carouselStatus = true
              targetArea.current.currentIndex = targetArea.current.lastIndex
              targetArea.current?.drawCurrenArea()
            }
          }, targetArea.current.carouselTime)
        }
      }
    }
  }))

  useEffect(() => {
    targetArea.current = new CurrentArea({ threeMap, level, tooltip, setCurrentData })
    return () => {
      targetArea.current?.destroy()
      targetArea.current = null
    }
  }, [])

  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      if (targetArea.current) {
        targetArea.current.updataView(threeMap, level, tooltip, stretchHeight, { chindEvent })
      }
    }, 10)
  }, [
    JSON.stringify(mapPath),
    threeMap,
    JSON.stringify(tooltip.data),
    JSON.stringify(tooltip.currentArea),
    tooltip.globalConfig?.levels,
    stretchHeight
  ])

  return (
    <Area3dMapTipWrapper>
      {currentData && (
        <ToolTip design={threeMap.areaMapProps.design || false} currentData={currentData} tooltip={tooltip} />
      )}
    </Area3dMapTipWrapper>
  )
})

export default memo(Lcz3dAreaMapTip)
