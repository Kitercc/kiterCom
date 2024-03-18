/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from 'react'
import { formatMapPosition } from '../../../LczChina2dMap/common'
import { AreaName } from '../../../LczChina2dMap/type'

type Props = {
  currentMapdata: any
  areaName: AreaName
  projectionPath: any
}

const CurrentName = memo(({ currentMapdata = [], areaName, projectionPath }: Props) => {
  const { display: _, reversion = false, textSeries = [], ...textStyle } = areaName
  const mapData = currentMapdata[0]
  const properties = mapData?.properties

  if (!mapData || !properties) return null

  const positionStyle = (function () {
    const css = {
      left: 0,
      top: 0
    }
    let { centroid, center } = properties
    centroid = formatMapPosition(centroid)
    center = formatMapPosition(center)

    let po = centroid || center ? projectionPath.projection(centroid || center) : []
    if (!centroid && typeof center === 'string') {
      po = projectionPath.projection(center.split(','))
    }

    ;[css.left, css.top] = po
    if (textSeries.length > 0) {
      const find = textSeries.find(v => v.value === properties.name)
      if (find) {
        css.left += find.xOffset
        css.top += find.yOffset
      }
    }

    return css
  })()

  return (
    <div className={`tip-area-name ${reversion ? 'reversion' : ''}`} style={{ ...textStyle, ...positionStyle }}>
      {properties.name}
    </div>
  )
})

CurrentName.displayName = 'CurrentName'
export default CurrentName
