import React, { memo, useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'
import Sign from './components/Sign'
import Tip from './components/Tip'
import CurrentName from './components/CurrentName'
import CurrentArea from './components/CurrentArea'
import { TipWrapper } from './style'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutTip, TipSign } from '../../LczChina2dMap/type/child'
import { defaultCurrentArea, defaultPromptBoxStyle } from './common/deaultValue'
import { findGeoJson, setProjectionPath } from './common'
import { conversionData } from '../../common/util'
import { usemMemo } from '../../common/hooks'

interface LczChina2dMapTipProps {
  w: number
  h: number
  tipConfig: OutTip
  myMap: ChinaMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

const LczChina2dMapTip = forwardRef(function LczChina2dMapTip(props: LczChina2dMapTipProps, ref) {
  const { tipConfig, myMap, w, h, onChildComEvent } = props
  const {
    reversion = false,
    currentArea = defaultCurrentArea,
    size,
    promptBox = defaultPromptBoxStyle,
    lineContent = [],
    data = [],
    id,
    onChange,
    onMouseenter,
    onMouseleave
  } = tipConfig
  const {
    manualTrigger = true,
    targetType = 'click',
    autoCarousel = true,
    residenceTime = 5,
    movePause = true,
    sign = defaultCurrentArea.sign as TipSign,
    area = defaultCurrentArea.area,
    areaName
  } = currentArea
  const { wrapper: mapWrapper, mapData, level, multistageData } = myMap
  const wrapReversion = reversion || areaName?.reversion || false

  const [itemData, setItemData] = useState<any>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const moveStatusRef = useRef<boolean>(false)
  const currentIndex = useRef<number>(-1)
  const timer = useRef<any>(null)

  useEffect(() => {
    if (data[0]) {
      setItemData(data[0])
      currentIndex.current = 0
    }
  }, [JSON.stringify(data)])

  useImperativeHandle(ref, () => ({
    activeEvent: (param, type: 'click' | 'mouseenter' | 'mouseleave') => {
      if (manualTrigger && type === targetType) {
        const index = data.findIndex(item => item.adcode == (param.adcode || param.code))

        if (index >= 0) {
          if (!itemData || currentIndex.current !== index) {
            currentIndex.current = index
            const _itemData = data[index]
            setItemData(_itemData)
            drawMapArea({ setData: false })
          }
        } else {
          itemData && setItemData(null)
          destroyed()
          currentIndex.current = -1
        }
      }
    }
  }))

  const currentMapdata = usemMemo(() => {
    const data: any = {
      features: []
    }

    if (multistageData) {
      for (const key in multistageData) {
        if (Object.prototype.hasOwnProperty.call(multistageData, key)) {
          const itemData: any = multistageData[key]
          data.features.push(...itemData.features)
        }
      }
    } else {
      data.features = mapData.features
    }

    return findGeoJson(data?.features || [], itemData?.adcode)
  }, [mapData, multistageData, itemData])

  const projectionPath = usemMemo(() => {
    setItemData(null)
    return setProjectionPath(myMap.mapData, w, h)
  }, [mapData, w, h])

  useEffect(() => {
    if ((manualTrigger || movePause) && autoCarousel) {
      window.addEventListener('mouseover', mouseEvents)
    } else {
      window.removeEventListener('mouseover', mouseEvents)
    }
    currentIndex.current = 0
    // 绘制区域高亮 轮巡
    autoCarousel && drawMapArea()
    return () => {
      destroyed()
      window.removeEventListener('mouseover', mouseEvents)
    }
  }, [projectionPath, JSON.stringify(currentArea), JSON.stringify(data), mapData, multistageData])

  function drawMapArea(params?: { setData?: boolean; playEvent?: boolean }) {
    const { setData = true, playEvent = true } = params || {}
    try {
      const _data = conversionData(data, {
        lat: 'num',
        lng: 'num',
        adcode: 'string',
        title: 'string'
      })
      const dataItem = _data[currentIndex.current]
      setData && dataItem && setItemData({ ...dataItem })
      playEvent && onChildComEvent && onChange && onChildComEvent(id, 'onChange', dataItem)

      if (_data.length > 1 && autoCarousel && !moveStatusRef.current) {
        const interval = residenceTime > 1 ? residenceTime : 1
        timer.current = setTimeout(() => {
          currentIndex.current >= _data.length - 1 ? (currentIndex.current = 0) : currentIndex.current++
          drawMapArea()
        }, interval * 1000)
      } else {
        destroyed()
      }
    } catch (error) {
      console.log(error)
      setItemData(null)
      destroyed()
    }
  }

  function mouseEvents({ target }) {
    const isinwrapper = wrapper.current?.parentNode?.contains(target)
    if (!moveStatusRef.current && isinwrapper) {
      moveStatusRef.current = true
      autoCarousel && destroyed()
    }

    if (moveStatusRef.current && !isinwrapper) {
      moveStatusRef.current = false
      autoCarousel && drawMapArea({ playEvent: false })
    }
  }

  function destroyed() {
    timer.current && clearTimeout(timer.current)
  }

  function promptBoxHandlerEvent(type: 'mouseenter' | 'mouseleave', param: any) {
    switch (type) {
      case 'mouseenter':
        onMouseenter && onChildComEvent && onChildComEvent(id, 'onMouseenter', param)
        break
      case 'mouseleave':
        onMouseleave && onChildComEvent && onChildComEvent(id, 'onMouseleave', param)
        break
    }
  }

  return (
    <TipWrapper className={`lcz-china-map-tip-wrapper ${wrapReversion ? 'reversion' : ''}`} ref={wrapper}>
      {itemData && (
        <div className={`lcz-china-map-area ${areaName?.reversion ? 'reversion' : ''}`}>
          {area?.display && (
            <CurrentArea w={w} h={h} currentMapdata={currentMapdata} area={area} projectionPath={projectionPath} />
          )}
          {areaName?.display && (
            <CurrentName currentMapdata={currentMapdata} areaName={areaName} projectionPath={projectionPath} />
          )}
          {sign.display && (
            <Sign w={w} h={h} sign={sign} level={level} itemData={itemData} projectionPath={projectionPath} />
          )}
        </div>
      )}
      {itemData && (
        <Tip
          w={w}
          h={h}
          reversion={reversion}
          id={id}
          size={size}
          itemData={itemData}
          projectionPath={projectionPath}
          promptBox={promptBox}
          lineContent={lineContent}
          wrapper={mapWrapper}
          promptBoxHandlerEvent={promptBoxHandlerEvent}
        />
      )}
    </TipWrapper>
  )
})

export default memo(LczChina2dMapTip)
