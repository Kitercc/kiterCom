import React, { memo, useEffect, useRef } from 'react'
import { randomChar } from '../../common/util'
import mAMap from '../../LczAMap/common/AMap'
import { CenterPointStyle, OutCenterPoint } from '../../LczAMap/type/child'
import { loadCenterPoint } from './common'
import { AmapCenterPointStyles } from './style'

interface LczAMapCenterPointProps {
  centerPoint: OutCenterPoint
  mAmap: mAMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

export default memo(function LczAMapCenterPoint(props: LczAMapCenterPointProps) {
  const { centerPoint, mAmap, onChildComEvent } = props
  const {
    id = '',
    level = 6,
    viewRange,
    centerStyle = {} as CenterPointStyle,
    onClick,
    onDataChange,
    data = []
  } = centerPoint

  const pointsId = useRef<string>(randomChar('center-point-')),
    point = useRef<any>(null)

  function pointHandlerClick(type) {
    switch (type) {
      case 'click': {
        const params = data?.[0]
        onClick && params && onChildComEvent && onChildComEvent(id, 'onClick', params)
        break
      }
    }
  }

  useEffect(() => {
    const param = data?.[0]
    onDataChange && param && onChildComEvent && onChildComEvent(id, 'onDataChange', param)
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (mAmap.map) {
      if (point.current) mAmap.map.remove(point.current)

      const points = loadCenterPoint(mAmap.map, data, {
        pointsId: pointsId.current,
        fn: pointHandlerClick,
        defaultUse: centerPoint.defaultUse,
        centerStyle,
        level,
        viewRange
      })
      point.current = points
    }

    return () => {
      point.current?.remove()
      point.current = null
    }
  }, [mAmap, JSON.stringify(centerPoint)])

  return <AmapCenterPointStyles pointsId={pointsId.current} centerStyle={centerStyle} />
})
