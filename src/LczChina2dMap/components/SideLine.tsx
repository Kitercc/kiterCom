import React, { memo, useMemo, useRef } from 'react'
import ChinaMap from '../common/chinaMap'
import { OverlappingBottom } from '../type'
import { setProjectionPath } from '../../LczChildrenComponents/LczChina2dMapTip/common'
import { randomChar } from '../../common/util'
import ReactDOM from 'react-dom'

interface SideLineProps {
  w: number
  h: number
  myMap: ChinaMap
  overlappingConfig: OverlappingBottom
  index: number
}

export default memo(function SideLine(props: SideLineProps) {
  const { w, h, myMap, overlappingConfig, index } = props,
    { gaussianBlur = 0, xOffset = 0, yOffset = 0, borderConfig, fillColor } = overlappingConfig
  const sideLineGroup = myMap.sideLineGroup.node()

  const uid = useRef<string>(randomChar('side_line_'))

  const projectionPath = useMemo(() => {
    const { projection, path } = setProjectionPath(myMap.mapData, w, h)
    return {
      projection,
      path
    }
  }, [JSON.stringify(myMap.mapData), w, h])

  const pathAttrs = useMemo(() => {
    const attrs = {
      stroke: 'none',
      fill: fillColor,
      strokeWidth: 0,
      filter: `url('#${uid.current}_linearGradient')`
    }

    if (borderConfig?.display) {
      attrs.strokeWidth = borderConfig.width
      attrs.stroke = `url('#${uid.current}_stroke')`
    }

    return attrs
  }, [JSON.stringify(borderConfig), fillColor])

  const Group = (
    <g transform={`translate(${xOffset},${yOffset})`}>
      {myMap.mapData.features.map(v => (
        <path
          style={{ pointerEvents: 'none' }}
          {...pathAttrs}
          key={v.properties.adcode}
          d={projectionPath.path(v)}></path>
      ))}
      {borderConfig?.display && (
        <linearGradient
          id={`${uid.current}_stroke`}
          x1='0'
          y1='0'
          x2='100%'
          y2='0'
          gradientTransform={`rotate(${borderConfig.angle}, .5, .5)`}
          gradientUnits={borderConfig?.range === 'global' ? 'userSpaceOnUse' : 'objectBoundingBox'}>
          <stop offset='0' stopColor={borderConfig?.startColor}></stop>
          <stop offset='1' stopColor={borderConfig?.endColor}></stop>
        </linearGradient>
      )}
      <filter id={`${uid.current}_linearGradient`}>
        <feGaussianBlur in='SourceGraphic' stdDeviation={gaussianBlur} />
      </filter>
    </g>
  )

  if (sideLineGroup) return ReactDOM.createPortal(Group, sideLineGroup)

  return (
    <div className='lcz-side-wrapper' style={{ zIndex: 98 - index }}>
      <svg width={w} height={h}>
        {Group}
      </svg>
    </div>
  )
})
