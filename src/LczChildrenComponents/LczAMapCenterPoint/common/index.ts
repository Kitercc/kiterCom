import { conversionData } from '../../../common/util'
import { CenterPointDataMap, CenterPointStyle } from '../../../LczAMap/type/child'

export function loadCenterPoint(
  map: any,
  data: CenterPointDataMap[],
  {
    pointsId,
    fn,
    centerStyle,
    defaultUse,
    level,
    viewRange
  }: {
    pointsId: string
    fn: (param: any, type: 'click' | 'mouseover' | 'mouseout') => void
    centerStyle?: CenterPointStyle
    defaultUse: boolean
    level: number
    viewRange: { min: number; max: number }
  }
) {
  let marker: any = null

  const _data = conversionData(data, { lng: 'num', lat: 'num', zoom: 'num', id: 'string' }).filter(
      v => !isNaN(v.lat + v.lng)
    ),
    centerData = _data[0]

  if (centerData) {
    const width = centerStyle?.width || 0,
      height = centerStyle?.height || 0,
      { lng, lat, zoom } = centerData

    marker = new AMap.Marker({
      position: new AMap.LngLat(lng, lat),
      content: `<div class="${pointsId}"></div>`,
      zIndex: level,
      zooms: [viewRange?.min || 2, viewRange?.max || 30],
      extData: centerData,
      offset: new AMap.Pixel(-width / 2, -height / 2)
    })
    map.add(marker)

    marker.on('click', fn.bind(null, 'click'))

    defaultUse &&
      setTimeout(() => {
        if (Number(zoom) > 0 && !isNaN(zoom)) {
          map.setZoomAndCenter(zoom, [lng, lat])
        } else {
          map.setCenter([lng, lat])
        }
      })
  }

  return marker
}
