import React, { Fragment, memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../common/LczComCon'
import CreateThreeMap from './common/createThreeMap'
import { AreaMapProps, MapPath, RihConfig } from './type'
import { AreaMapWrapper } from './style'
import UpperDrill from './components/UpperDrill'
import { findChildCom, getChildComItem, getChildCompArr } from '../common/util'
import { OutAreaHeat, OutFlyLine, OutRipples, OutScatter, OutSign, OutToolTip, OutLightBar } from './type/child'
import Lcz3dAreaMapRipples from '../LczChildrenComponents/Lcz3dAreaMapRipples'
import Lcz3dAreaMapTip from '../LczChildrenComponents/Lcz3dAreaMapTip'
import Lcz3dAreaMapSign from '../LczChildrenComponents/Lcz3dAreaMapSign'
import Lcz3dAreaMapAreaHeat from '../LczChildrenComponents/Lcz3dAreaMapAreaHeat'
import Lcz3dAreaMapScatter from '../LczChildrenComponents/Lcz3dAreaMapScatter'
import Lcz3dAreaMapFlyline from '../LczChildrenComponents/Lcz3dAreaMapFlyline'
import Lcz3dAreaMapLightBar from '../LczChildrenComponents/Lcz3dAreaMapLightBar'

export default memo(function Lcz3dAreaMap(props: AreaMapProps) {
  const { w = 300, h = 300, design, onClick, mapConfig = {}, childComponents = [], onChildComEvent } = props,
    { rihConfig = {} as RihConfig, ...otherMapconfig } = mapConfig,
    stretchHeight = mapConfig.baseConfig?.stretchHeight || 1

  const wrapper = useRef<HTMLDivElement>(null),
    mapTipRef = useRef<any>(null),
    [threeMap, setThreeMap] = useState<CreateThreeMap | null>(null),
    [mapPath, setMapPath] = useState<MapPath[]>([]),
    currentMap = useRef<CreateThreeMap | null>(null),
    [load, setLoad] = useState<boolean>(false),
    firstLoad = useRef<boolean>(true)

  const ripplesMemo = useMemo(() => {
    let ripples = getChildCompArr(childComponents, 'lcz-3d-area-map-ripples', {
      type: 'lcz-3d-area-map',
      filter: true,
      dataTypes: {
        lng: 'num',
        lat: 'num',
        type: 'string',
        id: 'string'
      }
    }) as OutRipples[]
    ripples = ripples.filter(item => item.data?.length)

    return ripples
  }, [findChildCom(childComponents, 'lcz-3d-area-map-ripples')])

  const tooltipMemo = useMemo(() => {
    const tooltip = getChildComItem(childComponents, 'lcz-3d-area-map-tooltip') as OutToolTip
    if (!tooltip?.data?.length) return undefined
    return tooltip
  }, [findChildCom(childComponents, 'lcz-3d-area-map-tooltip')])

  const signMemo = useMemo(() => {
    let sign = getChildCompArr(childComponents, 'lcz-3d-area-map-sign', {
      dataTypes: {
        adcode: 'string',
        area: 'string'
      }
    }) as OutSign[]
    sign = sign.filter(item => item.data?.length)
    return sign
  }, [findChildCom(childComponents, 'lcz-3d-area-map-sign')])

  const areaHeatMemo = useMemo(() => {
    const heat = getChildComItem(childComponents, 'lcz-3d-area-map-areaheat') as OutAreaHeat
    if (!heat?.data?.length) return undefined
    return heat
  }, [findChildCom(childComponents, 'lcz-3d-area-map-areaheat')])

  const scatterMemo = useMemo(() => {
    let scatter = getChildCompArr(childComponents, 'lcz-3d-area-map-scatter', {
      type: 'lcz-3d-area-map',
      filter: true,
      dataTypes: {
        lng: 'num',
        lat: 'num',
        type: 'string',
        value: 'num'
      }
    }) as OutScatter[]
    scatter = scatter.filter(item => item.data?.length)

    return scatter
  }, [findChildCom(childComponents, 'lcz-3d-area-map-scatter')])

  const flyLineMemo = useMemo(() => {
    let flyline = getChildCompArr(childComponents, 'lcz-3d-area-map-flyline', {
      type: 'lcz-3d-area-map'
    }) as OutFlyLine[]

    flyline.forEach(item => {
      item.data = item.data?.filter(
        item => !isNaN(+item.fromLat) && !isNaN(+item.fromLng) && !isNaN(+item.toLat) && !isNaN(+item.toLng)
      )
    })
    flyline = flyline.filter(item => item.data?.length)

    return flyline
  }, [findChildCom(childComponents, 'lcz-3d-area-map-flyline')])

  const lightbarMemo = useMemo(() => {
    let lightbar = getChildCompArr(childComponents, 'lcz-3d-area-map-lightbar', {
      type: 'lcz-3d-area-map',
      filter: true,
      dataTypes: {
        value: 'num',
        adcode: 'string'
      }
    }) as OutLightBar[]
    lightbar = lightbar.filter(item => item.data?.length)

    return lightbar
  }, [findChildCom(childComponents, 'lcz-3d-area-map-lightbar')])

  useEffect(() => {
    if (wrapper.current) {
      const map = new CreateThreeMap({
        el: wrapper.current,
        areaMapProps: props,
        otherProp: { setLoadStatus, setMapPath, mapHandleEvents }
      })
      setThreeMap(map)
      currentMap.current = map
      firstLoad.current = false
    } else {
      setThreeMap(null)
      currentMap.current?.destroy()
      currentMap.current = null
    }
    return () => {
      setThreeMap(null)
      currentMap.current?.destroy()
      currentMap.current = null
    }
  }, [])

  useEffect(() => {
    if (!firstLoad.current && threeMap) {
      threeMap.resize(w, h)
    }
  }, [w, h])

  useLayoutEffect(() => {
    if (wrapper.current && !firstLoad.current && currentMap.current) {
      currentMap.current.updataMap(props)
    }
  }, [JSON.stringify(otherMapconfig), rihConfig.display, rihConfig.rootCode?.value])

  function setLoadStatus(state: boolean) {
    setLoad(() => state || false)
  }

  function rihHandlerClick(type: 'back' | 'path') {
    if (type === 'back' && load && threeMap) {
      threeMap.downUpperdrill('up')
    }
  }

  const mapHandleEvents = (param: any, type: 'click' | 'doubleClick' | 'mouseenter' | 'mouseleave' | 'mouseout') => {
    mapTipRef.current && mapTipRef.current.activeEvent(param, type)
    switch (type) {
      case 'click': {
        if (onClick && param) onClick({ adcode: param.adcode || param.code, name: param.name })
        break
      }
      case 'mouseleave': {
        break
      }
      case 'mouseenter': {
        break
      }
      default:
        break
    }
  }

  const chindEvent = useCallback((id, type, param) => {
    onChildComEvent && onChildComEvent(id, type, param)
  }, [])

  const mapLoadOver = (threeMap?.mapObj?.children?.length || 0) > 0 && load

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <AreaMapWrapper
        className={`lcz-3d-area-map-wrapper ${design ? 'design' : ''}`}
        textHightStyle={mapConfig?.areaName?.highlight?.fontStyle}>
        {rihConfig.display && (
          <UpperDrill callbackBtn={rihConfig.callbackBtn} mapPath={mapPath} onClick={rihHandlerClick} />
        )}
        <div ref={wrapper} style={{ width: w, height: h }} className='lcz-3d-area-map'></div>

        {threeMap && mapLoadOver && (
          <Fragment>
            {ripplesMemo.length > 0 &&
              ripplesMemo.map(item => (
                <Lcz3dAreaMapRipples
                  key={item.id}
                  stretchHeight={stretchHeight}
                  threeMap={threeMap}
                  mapPath={mapPath}
                  ripples={item}
                />
              ))}

            {tooltipMemo && (
              <Lcz3dAreaMapTip
                key={tooltipMemo.id}
                ref={mapTipRef}
                stretchHeight={stretchHeight}
                threeMap={threeMap}
                mapPath={mapPath}
                tooltip={tooltipMemo}
                chindEvent={chindEvent}
              />
            )}

            {signMemo.length > 0 &&
              signMemo.map(item => (
                <Lcz3dAreaMapSign
                  key={item.id}
                  stretchHeight={stretchHeight}
                  threeMap={threeMap}
                  mapPath={mapPath}
                  sign={item}
                />
              ))}

            {areaHeatMemo && (
              <Lcz3dAreaMapAreaHeat
                key={areaHeatMemo.id}
                stretchHeight={stretchHeight}
                mapPath={mapPath}
                threeMap={threeMap}
                areaHeat={areaHeatMemo}
              />
            )}

            {scatterMemo.length > 0 &&
              scatterMemo.map(item => (
                <Lcz3dAreaMapScatter
                  key={item.id}
                  stretchHeight={stretchHeight}
                  mapPath={mapPath}
                  threeMap={threeMap}
                  scatter={item}
                  chindEvent={chindEvent}
                />
              ))}

            {flyLineMemo.length > 0 &&
              flyLineMemo.map(item => (
                <Lcz3dAreaMapFlyline
                  key={item.id}
                  flyline={item}
                  stretchHeight={stretchHeight}
                  mapPath={mapPath}
                  threeMap={threeMap}
                />
              ))}

            {lightbarMemo.length > 0 &&
              lightbarMemo.map(item => (
                <Lcz3dAreaMapLightBar
                  key={item.id}
                  lightbar={item}
                  stretchHeight={stretchHeight}
                  mapPath={mapPath}
                  threeMap={threeMap}
                  chindEvent={chindEvent}
                />
              ))}
          </Fragment>
        )}
      </AreaMapWrapper>
    </LczComCon>
  )
})
