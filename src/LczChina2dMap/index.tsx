import React, { memo, useEffect, useRef, useMemo, useState } from 'react'
import LczComCon from '../common/LczComCon'
import { getChildComItem, getChildCompArr } from '../common/util'
import { LczChina2dFlyLine, LczChina2dMapTip } from '../LczChildrenComponents'
import LczChina2dPolymerizationHeat from '../LczChildrenComponents/LczChina2dPolymerizationHeat'
import ChinaMap from './common/chinaMap'
import { defaultMapConfig, defaultTransformation } from './common/defaultValue'
import { ChinaMapProps, Timer } from './type'
import { OutSegmentedRegionalHeat, OutSanDian, OutTip, OutFlyLine, OutPolymerizationHeat } from './type/child'
import SideLine from './components/SideLine'
import { CallbackBtn, MapPath } from '../Lcz3dAreaMap/type'
import UpperDrill from '../Lcz3dAreaMap/components/UpperDrill'
import { usemMemo } from '../common/hooks'
import LczChina2dMapSegmentedHeat from '../LczChildrenComponents/LczChina2dMapSegmentedHeat'
import LczChina2dSign from '../LczChildrenComponents/LczChina2dSign'
import TenLenQundaoTip from './components/TenLineQundaoTip'

export default memo(function Lcz2dChinaMap(props: ChinaMapProps) {
  const {
      w = 1200,
      h = 960,
      design = false,
      mapConfig = defaultMapConfig,
      transformation = defaultTransformation,
      childComponents,
      onClick,
      onDoubleClick,
      onDrollDown,
      onDrollUp,
      onChildComEvent
    } = props,
    { overlappingBottom = [], callbackBtn = defaultMapConfig.callbackBtn as CallbackBtn, ...mapOtherConfig } = mapConfig

  const contain = useRef<HTMLDivElement>(null),
    wrapper = useRef<HTMLDivElement>(null),
    mapTipRef = useRef<any>(null),
    TIMER = useRef<Timer>({ updateTimer: null, clickTimer: null }),
    [myMap, setMyMap] = useState<ChinaMap | null>(null),
    [mapPath, setMappath] = useState<MapPath[]>([]),
    myChinaMap = useRef<ChinaMap | null>(null)

  const segmentedRegionalHeatMemo = usemMemo(() => {
    return getChildCompArr(childComponents, 'lcz-china-2dmap-segmentedRegionalHeat') as OutSegmentedRegionalHeat[]
  }, [childComponents])

  const sandianMemo = usemMemo(() => {
    return getChildCompArr(childComponents, 'lcz-china-2dmap-sandian') as OutSanDian[]
  }, [childComponents])

  const tipMemo = usemMemo(() => {
    const _find = getChildComItem(childComponents, 'lcz-china-2dmap-tip') as OutTip
    if (!_find?.data?.length) return undefined
    return _find
  }, [childComponents])

  const flyLineMemo = usemMemo(() => {
    return getChildCompArr(childComponents, 'lcz-china-2dmap-flyline') as OutFlyLine[]
  }, [childComponents])

  const polymerizationHeatMemo = usemMemo(() => {
    const _find = getChildComItem(childComponents, 'lcz-china-2dmap-polymerizationHeat') as OutPolymerizationHeat
    if (!_find?.data?.length) return undefined
    return _find
  }, [childComponents])

  useEffect(() => {
    myChinaMap.current = new ChinaMap({
      el: contain.current as HTMLDivElement,
      wrapper: wrapper.current as HTMLDivElement,
      w,
      h,
      mapConfig
    })
    return () => {
      myChinaMap.current && myChinaMap.current.destroy && myChinaMap.current.destroy()
      myChinaMap.current = null
    }
  }, [])

  function regionEvents(param: any, type: 'click' | 'doubleClick' | 'mouseenter' | 'mouseleave') {
    switch (type) {
      case 'click': {
        onClick && onClick(param)
        mapTipRef.current && mapTipRef.current.activeEvent(param, 'click')
        break
      }
      case 'doubleClick': {
        onDoubleClick && onDoubleClick(param)
        break
      }
      case 'mouseleave': {
        mapTipRef.current && mapTipRef.current.activeEvent(param, 'mouseleave')
        break
      }
      case 'mouseenter': {
        mapTipRef.current && mapTipRef.current.activeEvent(param, 'mouseenter')
        break
      }
      default:
        break
    }
  }

  // 更新地图
  useEffect(() => {
    TIMER.current.updateTimer && clearTimeout(TIMER.current.updateTimer)
    TIMER.current.updateTimer = setTimeout(() => {
      if (myChinaMap.current) {
        myChinaMap.current.updata({
          w,
          h,
          mapConfig,
          events: {
            onClick: regionEvents,
            onDoubleClick: regionEvents,
            onMouseenter: regionEvents,
            onMouseleave: regionEvents
          },
          setState: { setMyMap, setMappath },
          drollEvents: {
            onDrollDown,
            onDrollUp
          }
        })
      }
    }, 100)
    return () => {
      TIMER.current.updateTimer && clearTimeout(TIMER.current.updateTimer)
    }
  }, [w, h, JSON.stringify(mapOtherConfig)])

  //变换
  const wrapperStyle = useMemo(() => {
    const { rotate, perspective } = transformation,
      { x = 0, y = 0, z = 0 } = rotate || {}
    const wrapper: any = {
      '--rotate-x': `${x}deg`,
      '--rotate-y': `${y}deg`,
      '--rotate-z': `${z}deg`,
      '--transform-origin': ''
    }

    wrapper['--transform-origin'] = x === 0 ? 'center ' : x > 0 ? 'bottom ' : 'top '
    wrapper['--transform-origin'] += y === 0 ? 'center' : y > 0 ? 'left' : 'right'
    perspective && (wrapper.perspective = w)
    return wrapper
  }, [JSON.stringify(transformation), w, h])

  function mapPathHandlerUp() {
    myChinaMap.current?.upperDrilling()
  }

  const upperType = mapConfig.upperType || 'operation_blank',
    showUpperDrillBtn =
      mapConfig.drillDown &&
      !mapConfig.showMultistage &&
      mapConfig.range?.source === 'system' &&
      upperType === 'back_button' &&
      mapPath.length > 0

  const reverseOverlappingBottom = [...overlappingBottom].reverse()

  const southChinaSea = mapConfig.southChinaSea || defaultMapConfig.southChinaSea
  const showTenLineQundaoTip =
    myMap?.level == 0 && myMap.RIH[0]?.adcode == '100000' && southChinaSea?.displayType === 'smallPicture'

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div ref={wrapper} className={'lcz-china-map-wrapper' + `${design ? ' design' : ''}`} style={wrapperStyle}>
        <div className='lcz-china-map-transform-box'>
          <div className='lcz-china-map-container'>
            <div className='lcz-china-map' ref={contain}>
              {sandianMemo.length > 0 &&
                myMap?.mapData &&
                sandianMemo.map(v => (
                  <LczChina2dSign key={v.id} sandian={v} myMap={myMap} onChildComEvent={onChildComEvent} />
                ))}

              {tipMemo && myMap?.mapData && (
                <LczChina2dMapTip
                  w={w}
                  h={h}
                  ref={mapTipRef}
                  tipConfig={tipMemo}
                  myMap={myMap}
                  onChildComEvent={onChildComEvent}
                />
              )}
              {flyLineMemo.length > 0 && myMap?.mapData && (
                <LczChina2dFlyLine w={w} h={h} flyLineConfig={flyLineMemo} myMap={myMap} />
              )}
              {polymerizationHeatMemo && myMap?.mapData && (
                <LczChina2dPolymerizationHeat w={w} h={h} heatConfig={polymerizationHeatMemo} myMap={myMap} />
              )}

              {showTenLineQundaoTip && <TenLenQundaoTip w={w} h={h} myMap={myMap} southChinaSea={southChinaSea} />}
            </div>
            {myMap?.mapData &&
              reverseOverlappingBottom.map((item, i) => (
                <SideLine key={i} w={w} h={h} myMap={myMap} overlappingConfig={item} index={i} />
              ))}

            {segmentedRegionalHeatMemo.length > 0 &&
              myMap?.mapData &&
              segmentedRegionalHeatMemo.map(heat => (
                <LczChina2dMapSegmentedHeat key={heat.id} w={w} h={h} myMap={myMap} heatConfig={heat} />
              ))}
          </div>
        </div>

        {showUpperDrillBtn && <UpperDrill callbackBtn={callbackBtn} mapPath={mapPath} onClick={mapPathHandlerUp} />}
      </div>
    </LczComCon>
  )
})
