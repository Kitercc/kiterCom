import React, { memo, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import LczComCon from '../common/LczComCon'
import mAMap from './common/AMap'
import LczAMapPoint from '../LczChildrenComponents/LczAMapPoint'
import LczAMapCenterPoint from '../LczChildrenComponents/LczAMapCenterPoint'
import { loadAmapScript } from './common'
import { AmapProps } from './type'
import {
  OutCenterPoint,
  OutClusterLayer,
  OutFlyLine,
  OutHeatmapLayer,
  OutPoint,
  OutPolyline,
  OutPolymerizationHeat,
  OutRipples,
  OutTextLabel,
  OutToolTip
} from './type/child'
import { conversionData, findChildCom, getChildComItem, getChildCompArr } from '../common/util'
import LczAMapPolyLine from '../LczChildrenComponents/LczAMapPolyLine'
import LczAMapTextLabel from '../LczChildrenComponents/LczAMapTextLabel'
import LczAMapTooltip from '../LczChildrenComponents/LczAMapTooltip'
import LczAMapRipples from '../LczChildrenComponents/LczAMapRipples'
import LczAMapFlyline from '../LczChildrenComponents/LczAMapFlyline'
import LczAMapClusterLayer from '../LczChildrenComponents/LczAMapClusterLayer'
import LczAMapHeatLayer from '../LczChildrenComponents/LczAMapHeatLayer'
import LczAmapPolymerizationHeat from '../LczChildrenComponents/LczAmapPolymerizationHeat'

let amap_load = false

export default memo(function LczAMap(props: AmapProps) {
  const {
    design = false,
    mapStyleId = '',
    mapsettings,
    cameraSettings,
    w = 1920,
    h = 1080,
    childComponents = [],
    onChildComEvent,
    onClick,
    onChange,
    onMoveend
  } = props

  const [load, setLoad] = useState(false)
  const [mAmap, setmAmap] = useState<mAMap | null>(null)
  const mapWrapper = useRef<HTMLDivElement>(null)
  const curentMap = useRef<mAMap | null>(null)

  const mapkey = props.mapkey || 'a2a4f81150bb865e1633d87fa8cc0fa2',
    securityJsCode = props.securityJsCode || '9b387975dd4d2d75e8a4da97414676f3'

  useEffect(() => {
    setLoad(false)

    if (!amap_load) {
      amap_load = true
      mapkey &&
        loadAmapScript(mapkey, securityJsCode)
          .then(() => {
            setLoad(true)
          })
          .catch(err => {
            console.log(err)
            setLoad(false)
          })
    } else {
      let num = 0
      const timer = setInterval(() => {
        // @ts-ignore
        if (window.AMap && window.Loca) {
          setLoad(true)
          clearInterval(timer)
        }

        if (num > 100) {
          setLoad(false)
          clearInterval(timer)
        }
        num++
      }, 200)
    }
  }, [mapkey, securityJsCode])

  const pointMemo = useMemo(() => {
    let points = getChildCompArr(childComponents, 'lcz-amap-point', {
      type: 'lcz-amap',
      filter: true,
      dataTypes: {
        lng: 'num',
        lat: 'num',
        type: 'string',
        id: 'string'
      }
    }) as OutPoint[]
    points = points.filter(item => item.data?.length)

    return points
  }, [findChildCom(childComponents, 'lcz-amap-point')])

  const centerPointMemo = useMemo(() => {
    const point = getChildComItem(childComponents, 'lcz-amap-center-point') as OutCenterPoint
    if (!point?.data?.length) return null
    const itemData = point.data[0] || {}
    if (itemData.lat === null || itemData.lng === null || isNaN(+itemData.lat) || isNaN(+itemData.lng)) return null
    return point
  }, [findChildCom(childComponents, 'lcz-amap-center-point')])

  const polylineMemo = useMemo(() => {
    let polyline = getChildCompArr(childComponents, 'lcz-amap-polyline', {
      type: 'lcz-amap',
      filter: true,
      dataTypes: {
        lng: 'num',
        lat: 'num',
        id: 'string'
      }
    }) as OutPolyline[]
    polyline = polyline.filter(item => item.data?.length)

    return polyline
  }, [findChildCom(childComponents, 'lcz-amap-polyline')])

  const textLabelMemo = useMemo(() => {
    let textLabel = getChildCompArr(childComponents, 'lcz-amap-text-label', {
      type: 'lcz-amap',
      filter: true,
      dataTypes: {
        lng: 'num',
        lat: 'num',
        value: 'string',
        rotate: 'num'
      }
    }) as OutTextLabel[]
    textLabel = textLabel.filter(item => item.data?.length)

    textLabel.forEach(item => {
      item.data = item.data?.filter(v => v.value !== '' && v.value !== null && v.value !== undefined)
    })

    return textLabel
  }, [findChildCom(childComponents, 'lcz-amap-text-label')])

  const tooltipMemo = useMemo(() => {
    let tooltip = getChildCompArr(childComponents, 'lcz-amap-tooltip', { type: 'lcz-amap' }) as OutToolTip[]
    tooltip.forEach((item: OutToolTip) => {
      const data = item.data || [],
        fixed = item.positionConfig?.fixed || false
      if (fixed) {
        item.data = [data[0]]
      } else {
        item.data = data.filter(v => !isNaN(v.lat) && !isNaN(v.lng))
        item.data = conversionData(data, { lng: 'num', lat: 'num' })
      }
    })

    tooltip = tooltip.filter(item => item.data?.length)

    return tooltip
  }, [findChildCom(childComponents, 'lcz-amap-tooltip')])

  const ripplesMemo = useMemo(() => {
    const ripples = getChildCompArr(childComponents, 'lcz-amap-ripples', { type: 'lcz-amap' }) as OutRipples[]
    ripples.forEach(item => {
      item.data = item.data?.filter(item => !isNaN(item.value))
    })

    return ripples
  }, [findChildCom(childComponents, 'lcz-amap-ripples')])

  const flyLineMemo = useMemo(() => {
    const flyline = getChildCompArr(childComponents, 'lcz-amap-flyline', { type: 'lcz-amap' }) as OutFlyLine[]
    flyline.forEach(item => {
      item.data = item.data?.filter(
        item => !isNaN(+item.fromLat) && !isNaN(+item.fromLng) && !isNaN(+item.toLat) && !isNaN(+item.toLng)
      )
    })

    return flyline
  }, [findChildCom(childComponents, 'lcz-amap-flyline')])

  const clusterMemo = useMemo(() => {
    const cluster = getChildCompArr(childComponents, 'lcz-amap-cluster-layer', {
      type: 'lcz-amap',
      dataTypes: {
        lat: 'number',
        lng: 'number',
        id: 'string',
        name: 'string'
      }
    }) as OutClusterLayer[]
    cluster.forEach(item => {
      item.data = item.data?.filter(item => !isNaN(+item.lat) && !isNaN(+item.lng))
    })

    return cluster
  }, [findChildCom(childComponents, 'lcz-amap-cluster-layer')])

  const heatmapMemo = useMemo(() => {
    const heat = getChildCompArr(childComponents, 'lcz-amap-heatmap-layer', {
      type: 'lcz-amap'
    }) as OutHeatmapLayer[]
    return heat
  }, [findChildCom(childComponents, 'lcz-amap-heatmap-layer')])

  const polymerizationHeatMemo = useMemo(() => {
    let polymerizationHeat = getChildCompArr(childComponents, 'lcz-amap-polymerization-heat', {
      type: 'lcz-amap',
      filter: true,
      dataTypes: {
        lng: 'number',
        lat: 'number',
        value: 'number'
      }
    }) as OutPolymerizationHeat[]
    polymerizationHeat = polymerizationHeat.filter(item => item.data?.length)

    polymerizationHeat.forEach(item => {
      item.data = item.data?.filter(v => v.value !== null && v.value !== undefined)
    })

    return polymerizationHeat
  }, [findChildCom(childComponents, 'lcz-amap-polymerization-heat')])

  useEffect(() => {
    if (mAmap?.map) {
      mAmap.resize(w, h)
    }
  }, [mAmap, w, h])

  useEffect(() => {
    if (load && mapWrapper.current) {
      const mAmap = new mAMap({
        w,
        h,
        el: mapWrapper.current,
        config: props,
        callback: {
          click: handlerEvents.bind(null, 'click'),
          zoomEnd: handlerEvents.bind(null, 'zoomEnd'),
          moveEnd: handlerEvents.bind(null, 'moveEnd')
        }
      })

      mAmap.map.on('complete', function () {
        setmAmap(mAmap)
        curentMap.current = mAmap
      })
    } else {
      curentMap.current?.destroy()
      curentMap.current = null
      setmAmap(null)
    }

    return () => {
      curentMap.current?.destroy()
      curentMap.current = null
      setmAmap(null)
    }
  }, [load, mapsettings?.showLabel, cameraSettings?.viewMode, cameraSettings?.skyColor])

  useEffect(() => {
    if (mAmap?.map) {
      if (!mAmap.firstUpdata) {
        mAmap.updataView(props)
      }
      mAmap.firstUpdata = false
    }
  }, [mAmap, JSON.stringify(mapStyleId), JSON.stringify(mapsettings), JSON.stringify(cameraSettings)])

  function handlerEvents(type: 'click' | 'zoomEnd' | 'moveEnd', e?: any) {
    switch (type) {
      case 'click': {
        if (e?.lnglat) {
          const { lng, lat } = e.lnglat
          !isNaN(lng) && !isNaN(lat) && onClick && onClick({ lng, lat })
        }
        break
      }
      case 'zoomEnd': {
        if (e?.target) {
          const zVal = e.target.getZoom()
          !isNaN(zVal) && onChange && onChange({ value: zVal })
        }
        break
      }
      case 'moveEnd': {
        onMoveend && onMoveend({})
        break
      }
    }
  }

  const childEvent = useCallback((id, type, param) => {
    onChildComEvent && onChildComEvent(id, type, param)
  }, [])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div className={`lcz-amap-wrapper ${design ? 'design' : ''}`}>
        <div ref={mapWrapper} style={{ width: w, height: h, backgroundColor: 'rgba(21,24,28,1)' }}></div>

        {mAmap?.map && (
          <>
            {pointMemo.length > 0 &&
              pointMemo.map(point => (
                <LczAMapPoint key={point.id} point={point} mAmap={mAmap} onChildComEvent={childEvent} />
              ))}

            {centerPointMemo && (
              <LczAMapCenterPoint centerPoint={centerPointMemo} mAmap={mAmap} onChildComEvent={childEvent} />
            )}

            {polylineMemo.length > 0 &&
              polylineMemo.map(polyline => (
                <LczAMapPolyLine key={polyline.id} polyline={polyline} mAmap={mAmap} onChildComEvent={childEvent} />
              ))}

            {textLabelMemo.length > 0 &&
              textLabelMemo.map(label => (
                <LczAMapTextLabel key={label.id} textLabel={label} mAmap={mAmap} onChildComEvent={childEvent} />
              ))}

            {tooltipMemo.length > 0 &&
              tooltipMemo.map(tooltip => <LczAMapTooltip key={tooltip.id} tooltip={tooltip} mAmap={mAmap} />)}

            {ripplesMemo.length > 0 &&
              ripplesMemo.map(ripples => <LczAMapRipples key={ripples.id} ripples={ripples} mAmap={mAmap} />)}

            {flyLineMemo.length > 0 &&
              flyLineMemo.map(flyline => <LczAMapFlyline key={flyline.id} mAmap={mAmap} flyline={flyline} />)}

            {clusterMemo.length > 0 &&
              clusterMemo.map(cluster => (
                <LczAMapClusterLayer key={cluster.id} mAmap={mAmap} cluster={cluster} onChildComEvent={childEvent} />
              ))}

            {heatmapMemo.length > 0 &&
              heatmapMemo.map(heatmap => <LczAMapHeatLayer key={heatmap.id} mAmap={mAmap} heatmap={heatmap} />)}

            {polymerizationHeatMemo.length > 0 &&
              polymerizationHeatMemo.map(polymerizationHeat => (
                <LczAmapPolymerizationHeat
                  key={polymerizationHeat.id}
                  mAmap={mAmap}
                  polymerizationHeat={polymerizationHeat}
                />
              ))}
          </>
        )}
      </div>
    </LczComCon>
  )
})
