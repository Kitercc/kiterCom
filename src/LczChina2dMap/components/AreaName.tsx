import React, { memo, CSSProperties } from 'react'
import { setProjectionPath } from '../../LczChildrenComponents/LczChina2dMapTip/common'
import ChinaMap from '../common/chinaMap'
import { AreaName } from '../type'

interface AreaNameProps {
  w: number
  h: number
  myMap: ChinaMap
  areaName: AreaName
}

export default memo(function AreaName(props: AreaNameProps) {
  const { myMap, w, h, areaName } = props

  const mapData = myMap.mapData || {}

  function getAddressNameStyle(item: any): CSSProperties {
    const offset = { x: 0, y: 0 }
    const { centroid, center, name } = item.properties || {}
    const _obj: CSSProperties = {}
    if (!name) return _obj
    const { projection } = setProjectionPath(mapData, w, h)
    let po = centroid || center ? projection(centroid || center) : []
    if (!centroid && typeof center === 'string') {
      po = projection(center.split(','))
    }
    if (areaName.textSeries && areaName.textSeries.length > 0) {
      const find = areaName.textSeries.find(v => v.value === name)
      if (find) {
        offset.x = find.xOffset
        offset.y = find.yOffset
      }
    }
    _obj.left = po[0] + offset.x
    _obj.top = po[1] + offset.y
    return _obj
  }

  return (
    <div
      className='lcz-china-map-areaname-wrapper'
      style={{
        fontSize: areaName.fontSize,
        fontFamily: areaName.fontFamily,
        color: areaName.color,
        letterSpacing: areaName.letterSpacing,
        fontWeight: areaName.fontWeight
      }}>
      {mapData?.features?.length > 0 &&
        mapData.features.map((item, i) => (
          <span
            className='lcz-china-map-areaname'
            key={item?.properties?.adcode || i}
            style={{ ...getAddressNameStyle(item) }}>
            {item.properties.name}
          </span>
        ))}
    </div>
  )
})
