import React, { memo, useEffect, useState, useRef } from 'react'
import {
  cityArr,
  rounningGaodeScript,
  showcurrentLine,
  LczShowMarker,
  showCurrentSite,
  showInfoWindow,
  infoWindowAddEvents,
  infoWindowRemoveEvents,
  replaceSiteImg,
  clearInfoWindow
} from './common'
import { MarkerList, SubwayLineProps, Timer } from './type/'
import { outPanel, outRipples, outSign } from './type/child'
import Zoom from './components/Zoom'
import {
  defalutLineConfig,
  defaultGlobalConfig,
  defaultManualZoom,
  defaultSideConfig,
  defaultZoomConfig,
  defaultTextconfig,
  defaultSitePolling,
  defaultTransferPoint,
  defaultGeneralPoint
} from './common/defaultValue'

import { analysisExpression, getChildComItem, randomChar } from '../common/util'
import LczComCon from '../common/LczComCon'
import { SubwayWrapper } from './style'

declare const subway: any
const LczSubwayLine = memo(function LczSubwayLine(props: SubwayLineProps) {
  const {
    w = 1920,
    h = 1080,
    globalConfig = defaultGlobalConfig,
    lineConfig = defalutLineConfig,
    sideConfig = defaultSideConfig,
    childComponents = [],
    onSelect,
    onClick,
    onChange,
    onClickBlank,
    onChildComEvent
  } = props
  const { cityId = { value: 3301 }, centerSite = { value: '' }, zoomConfig = defaultZoomConfig } = globalConfig
  const {
    currentLine,
    maskColor = 'rgba(0,0,0,0.5)',
    // lineRotation = defaultLineRotation,
    selectCenter = true,
    clickSelect = true,
    lineName = false
  } = lineConfig
  const { defaultProportion, manualZoom = defaultManualZoom } = zoomConfig
  const {
    clickSideCenter = true,
    sideName = defaultTextconfig,
    transferPoint = defaultTransferPoint,
    generalPoint = defaultGeneralPoint
  } = sideConfig

  const [load, setLoad] = useState<boolean>(false)
  const [lineList, setLineList] = useState<any[]>([])
  const [ripplesList, setRipplesList] = useState<{ class: string; val: string; item: any }[]>([])
  const [markerList, setMarkerList] = useState<MarkerList>([])
  const [zoomVal, setZoomVal] = useState<number>(defaultProportion)
  // const [currentLineIndex, setCurrentLineIndex] = useState<number>(-1)
  const [currentSite, setCurrentSite] = useState<number>(-1)
  const [isShow, setShow] = useState<boolean>(true)

  const wrapperId = useRef<string>(randomChar('subway-'))
  const rotationSite = useRef<{ class: string; val: string; item: any }[]>([])
  const subwayRef = useRef<any>(null)
  const Timer = useRef<Timer>({
    structureLineTimer: null,
    lineCarouselTimer: null,
    siteCarouselTimer: null,
    siteStopCarouselTimer: null,
    InitZoomTimer: null,
    zoomTimer: null
  })
  const currentSiteName = useRef<string>('')
  const ripplesRef = useRef<outRipples>({} as outRipples)
  const panelRef = useRef<outPanel>({} as outPanel)
  const signRef = useRef<outSign>({} as outSign)

  // 获取到涟漪对象 配置
  ripplesRef.current = (() => {
    return getChildComItem(childComponents, 'lcz-subway-ripples') as outRipples
  })()

  // 提示面板配置对象
  panelRef.current = (() => {
    return getChildComItem(childComponents, 'lcz-subway-panel') as outPanel
  })()

  // 标记配置对象
  signRef.current = (() => {
    return getChildComItem(childComponents, 'lcz-subway-sign') as outSign
  })()

  // 构造线路
  useEffect(() => {
    clearTimeout(Timer.current.structureLineTimer)
    // 加载js文件
    !load && rounningGaodeScript().then(() => setLoad(true))
    Timer.current.structureLineTimer = setTimeout(() => loadSubwayLine(), 200)
    return () => {
      clearTimeout(Timer.current.structureLineTimer)
    }
  }, [load, JSON.stringify(cityId)])

  // 高亮选中线
  useEffect(() => {
    ;(async function () {
      if (lineList.length > 0) {
        const findIndex = lineList.findIndex(v => v.name === currentLine.value)
        if (findIndex >= 0) {
          await showcurrentLine(subwayRef.current, currentLine.value)
          // setCurrentLineIndex(findIndex)
        } else {
          // setCurrentLineIndex(-1)
          subwayRef.current.clearLine()
          subwayRef.current.selectCenter &&
            showCurrentSite(subwayRef.current, subwayRef.current.currentSide || '', true)
        }
      }
    })()
  }, [JSON.stringify(lineList), JSON.stringify(currentLine)])

  // 选中站点
  useEffect(() => {
    if (lineList.length > 0) showCurrentSite(subwayRef.current, centerSite.value || '', true)
  }, [JSON.stringify(lineList), JSON.stringify(centerSite)])

  //#region
  // 线路轮播   鼠标移入移出事件
  // useEffect(() => {
  //   const _wrapper = document.getElementById(wrapperId.current) as HTMLDivElement

  //   if (_wrapper) {
  //     if (!lineRotation.display) {
  //       _wrapper.removeEventListener('mouseenter', mouseEnter)
  //       _wrapper.removeEventListener('mouseleave', mouseLeave)
  //       return clearInterval(Timer.current.lineCarouselTimer)
  //     }

  //     if (lineList.length > 0 && _wrapper) {
  //       _wrapper.addEventListener('mouseenter', mouseEnter)
  //       _wrapper.addEventListener('mouseleave', mouseLeave)
  //       startRotation()
  //     } else {
  //       clearInterval(Timer.current.lineCarouselTimer)
  //     }
  //   }

  //   return () => {
  //     const _wrapper = document.getElementById(wrapperId.current) as HTMLDivElement
  //     _wrapper && _wrapper.removeEventListener('mouseenter', mouseEnter)
  //     _wrapper && _wrapper.removeEventListener('mouseleave', mouseLeave)
  //     _wrapper && _wrapper.removeEventListener('mousewheel', mousewheelsubway)
  //     clearInterval(Timer.current.lineCarouselTimer)
  //   }
  // }, [JSON.stringify(lineList), JSON.stringify(lineRotation), currentLineIndex])
  //#endregion

  // 线路加载涟漪和标记
  useEffect(() => {
    if (lineList.length > 0 && (Object.keys(ripplesRef.current).length || Object.keys(signRef.current).length)) {
      LczShowMarker(
        subwayRef.current,
        { ripplesMemo: ripplesRef.current, signMemo: signRef.current },
        { setRipplesList, markerList, setMarkerList }
      )

      if (defaultProportion != 1) {
        Timer.current.InitZoomTimer = setTimeout(() => {
          setZoomVal(defaultProportion)
          subwayRef.current.scale(defaultProportion)
        }, 800)
      }
    } else {
      subwayRef.current && subwayRef.current.clearOverlays()
    }
    return () => {
      clearTimeout(Timer.current.InitZoomTimer)
    }
  }, [defaultProportion, JSON.stringify(lineList), JSON.stringify(ripplesRef.current), JSON.stringify(signRef.current)])

  // 涟漪轮询
  useEffect(() => {
    if (Object.keys(ripplesRef.current).length) {
      const { id: ripplesId, sitePolling = defaultSitePolling } = ripplesRef.current as outRipples
      const { display: siteDis = false, condition: siteCondition } = sitePolling

      Timer.current.siteCarouselTimer && clearTimeout(Timer.current.siteCarouselTimer)
      if (ripplesList.length > 0 && siteDis) {
        const filterArr = ripplesList.filter(
          v =>
            !!analysisExpression(siteCondition, v.item, ripplesId, { name: 'sitePolling.condition' }) ||
            siteCondition === ''
        )
        rotationSite.current = filterArr
        startSite()
      }
    }

    return () => {
      clearTimeout(Timer.current.siteCarouselTimer)
      infoWindowRemoveEvents(`${wrapperId.current}-info-window`, infoWindowMoveEnter, infoWindowMoveLeave)
    }
  }, [JSON.stringify(ripplesRef.current), JSON.stringify(ripplesList), currentSite, zoomVal])

  useEffect(() => {
    const _wrapper = document.getElementById(wrapperId.current) as HTMLDivElement
    if (_wrapper) {
      _wrapper.addEventListener('mousewheel', mousewheelsubway)
      _wrapper.setAttribute
    }

    return () => {
      const _wrapper = document.getElementById(wrapperId.current) as HTMLDivElement
      _wrapper && _wrapper.removeEventListener('mousewheel', mousewheelsubway)
    }
  }, [zoomVal, JSON.stringify(lineList)])

  // 容器鼠标滚轮缩放
  function mousewheelsubway(e) {
    e.stopPropagation()
    e.preventDefault()
    if (!lineList) return

    const step = e.deltaY > 0 ? -0.1 : 0.1
    const _scale = subwayRef.current._scale
    const _val = _scale + step <= 0.5 ? 0.5 : _scale + step >= 5 ? 5 : _scale + step
    if (_scale == _val) return

    const _fnode = document.querySelector('#lcz_matrix') as HTMLDivElement
    if (_fnode) {
      _fnode.scrollTop > 0 && (_fnode.scrollTop = 0)
      _fnode.scrollLeft > 0 && (_fnode.scrollLeft = 0)
    }

    // 地铁图缩放停止轮询和鼠标停留
    Timer.current.siteStopCarouselTimer && clearTimeout(Timer.current.siteStopCarouselTimer)
    Timer.current.siteCarouselTimer && clearTimeout(Timer.current.siteCarouselTimer)
    subwayRef.current.clicked = false

    subwayRef.current.scale(_val)
    subwayRef.current._scale = _val

    // 地铁图缩放停止轮询和鼠标停留  用作隐藏子组件
    if (!subwayRef.current.isRoller) {
      subwayRef.current.isRoller = true
      setZoomVal(_val)
    }

    clearTimeout(Timer.current.zoomTimer)
    Timer.current.zoomTimer = setTimeout(() => {
      subwayRef.current.isRoller = false
      subwayRef.current.clicked = false
      setZoomVal(_val)
      startSite()
    }, 500)
  }

  // 站点轮播
  function startSite() {
    const {
      id: ripplesId,
      sitePolling = defaultSitePolling,
      siteName = 'station',
      data: ripplesData = [],
      onClick: RipplesClick
    } = ripplesRef.current as outRipples
    const { display: siteDis = false, triggerEvent, interval: siteIntrval, showPanle } = sitePolling

    Timer.current.siteCarouselTimer && clearTimeout(Timer.current.siteCarouselTimer)
    if (!siteDis || rotationSite.current.length <= 0) return

    // 内容添加事件
    infoWindowAddEvents(`${wrapperId.current}-info-window`, infoWindowMoveEnter, infoWindowMoveLeave)

    Timer.current.siteCarouselTimer = setTimeout(
      () => {
        setCurrentSite(val => {
          if (val < rotationSite.current.length - 1) {
            const _nowsite = rotationSite.current[val + 1]

            showPanle
              ? showInfoWindow(subwayRef.current, `${wrapperId.current}-info-window`, _nowsite.val, panelRef.current)
              : showCurrentSite(subwayRef.current, _nowsite.val)

            const _id = subwayRef.current.getIdByName(_nowsite.val, 'station')
            // 涟漪子组件数据
            const findRipplesIndex = ripplesData?.length ? ripplesData.findIndex(v => v[siteName] === _nowsite.val) : -1
            const param = Object.assign(
              { station: _nowsite.val, stationId: _id },
              findRipplesIndex >= 0 ? ripplesData[findRipplesIndex] : {}
            )
            // triggerEvent && onChange && onChange({ station: _nowsite.val, stationId: _id })
            triggerEvent && onChildComEvent && RipplesClick && onChildComEvent(ripplesId, 'onClick', param)
            return val + 1
          } else {
            if (val === 0) return val
            const _nowsite = rotationSite.current[0]

            showPanle
              ? showInfoWindow(subwayRef.current, `${wrapperId.current}-info-window`, _nowsite.val, panelRef.current)
              : showCurrentSite(subwayRef.current, _nowsite.val)

            const _id = subwayRef.current.getIdByName(_nowsite.val, 'station')
            // 涟漪子组件数据
            const findRipplesIndex = ripplesData?.length ? ripplesData.findIndex(v => v[siteName] === _nowsite.val) : -1
            const param = Object.assign(
              { station: _nowsite.val, stationId: _id },
              findRipplesIndex >= 0 ? ripplesData[findRipplesIndex] : {}
            )
            // triggerEvent && onChange && onChange({ station: _nowsite.val, stationId: _id })
            triggerEvent && onChildComEvent && RipplesClick && onChildComEvent(ripplesId, 'onClick', param)
            return 0
          }
        })
      },
      siteIntrval <= 0 ? 1000 : siteIntrval * 1000
    )
  }

  //#region
  // 线路轮播
  // function startRotation() {
  //   Timer.current.lineCarouselTimer = setTimeout(() => {
  //     if (currentLineIndex < lineList.length - 1) {
  //       setCurrentLineIndex(val => {
  //         const _nowline = lineList[val + 1]
  //         showcurrentLine(subwayRef.current, _nowline.id)
  //         return val + 1
  //       })
  //     } else {
  //       setCurrentLineIndex(() => {
  //         const _nowline = lineList[0]
  //         showcurrentLine(subwayRef.current, _nowline.id)
  //         return 0
  //       })
  //     }
  //   }, lineRotation.interval)
  // }

  // function mouseEnter() {
  //   lineRotation.moveStay && clearInterval(Timer.current.lineCarouselTimer)
  // }

  // function mouseLeave() {
  //   startRotation()
  // }
  //#endregion

  // 加载线路图
  function loadSubwayLine() {
    try {
      const find = cityArr.includes(String(cityId.value))
      if (!find) return setShow(false)

      if (load && document.getElementById(wrapperId.current)) {
        subwayRef.current = subway(wrapperId.current, {
          adcode: cityId.value,
          easy: false,
          maxScale: 5,
          minScale: 0.5,
          width: w,
          height: h
        })

        // 点击线路名是否居中
        subwayRef.current.selectCenter = selectCenter
        // 点击站点居中
        subwayRef.current.clickSideCenter = clickSideCenter
        // 默认比例
        subwayRef.current._scale = defaultProportion

        addEvents()
      }
    } catch (error) {
      console.warn(error)
      setTimeout(() => {
        loadSubwayLine()
      }, 1000)
    }
  }

  // 添加事件
  const addEvents = () => {
    if (!subwayRef.current) return

    subwayRef.current.event.on('subway.complete', () => {
      subwayRef.current.getLineList((data: any[]) => {
        if (data.length > 0) {
          setLineList(data)
          replaceSiteImg(transferPoint, generalPoint)
        }
      })
    })

    subwayRef.current.event.on('station.touch', function (ev: any, info: any) {
      const {
        id: ripplesId,
        sitePolling = defaultSitePolling,
        siteName = 'station',
        data: ripplesData = [],
        onClick: RipplesClick
      } = ripplesRef.current as outRipples
      const { display: sitePollingDis = false, interval: siteIntrval, stopTime: siteStopTime } = sitePolling

      const { id: signId, data: signData = [], onClick: signClick } = signRef.current as outSign

      // 点击停留
      subwayRef.current.clicked = true

      // 涟漪子组件数据
      const findRipplesIndex = ripplesData?.length ? ripplesData.findIndex(v => v[siteName] === info.name) : -1
      const param = Object.assign(
        { station: info.name, stationId: info.id },
        findRipplesIndex >= 0 ? ripplesData[findRipplesIndex] : {}
      )

      // 标记子组件数据
      const findSignIndex = signData?.length ? signData.findIndex(v => v.station === info.name) : -1
      const signParam = Object.assign(
        { station: info.name, stationId: info.id },
        findSignIndex >= 0 ? signData[findSignIndex] : {}
      )

      // 站点点击显示内容
      Timer.current.siteCarouselTimer && clearTimeout(Timer.current.siteCarouselTimer)
      Timer.current.siteStopCarouselTimer && clearTimeout(Timer.current.siteStopCarouselTimer)

      showInfoWindow(subwayRef.current, `${wrapperId.current}-info-window`, info.id, panelRef.current)

      // 站点点击事件
      onClick && onClick({ station: info.name, stationId: info.id })
      findRipplesIndex >= 0 && onChildComEvent && RipplesClick && onChildComEvent(ripplesId, 'onClick', param)
      findSignIndex >= 0 && onChildComEvent && signClick && onChildComEvent(signId, 'onClick', signParam)

      if (info.name !== currentSiteName.current) {
        // 站点切换事件
        onChange && onChange({ station: info.name, stationId: info.id })
      }
      currentSiteName.current = info.name

      // 内容添加事件
      infoWindowAddEvents(`${wrapperId.current}-info-window`, infoWindowMoveEnter, infoWindowMoveLeave)

      // 设置点击停留
      if (sitePollingDis) {
        const _stopTime = siteStopTime > siteIntrval ? (siteStopTime - siteIntrval) * 1000 : 500
        Timer.current.siteStopCarouselTimer = setTimeout(() => {
          startSite()
          subwayRef.current.clicked = false
        }, _stopTime)
      }
    })

    //点击线路名，高亮此线路
    clickSelect &&
      subwayRef.current.event.on('lineName.touch', function (ev: any, info: any) {
        // 线路选中事件
        onSelect && onSelect({ line: info.name })
        showcurrentLine(subwayRef.current, info.id)
      })

    //点击空白, 关闭infowindow
    subwayRef.current.event.on('subway.touch', async function () {
      infoWindowRemoveEvents(`${wrapperId.current}-info-window`, infoWindowMoveEnter, infoWindowMoveLeave)
      clearInfoWindow(`${wrapperId.current}-info-window`, subwayRef.current)
      onClickBlank && onClickBlank()
    })
  }

  function infoWindowMoveEnter() {
    const { sitePolling = defaultSitePolling } = ripplesRef.current as outRipples
    const { moveStop: siteMoveStop } = sitePolling
    if (siteMoveStop && !subwayRef.current.clicked) {
      clearTimeout(Timer.current.siteCarouselTimer)
      clearTimeout(Timer.current.siteStopCarouselTimer)
    }
  }

  function infoWindowMoveLeave() {
    const { sitePolling = defaultSitePolling } = ripplesRef.current as outRipples
    const { moveStop: siteMoveStop } = sitePolling
    if (siteMoveStop && !subwayRef.current.clicked) {
      startSite()
    }
  }

  // 缩放控件
  function handleZoom(val: number) {
    if (subwayRef.current) {
      subwayRef.current.scale(val)
      subwayRef.current._scale = val
    }
    clearTimeout(Timer.current.zoomTimer)
    Timer.current.zoomTimer = setTimeout(() => setZoomVal(val), 100)
  }

  const zoomVar: any = { '--mzoom-scale': ripplesRef.current?.proporScaling ? zoomVal : 1 },
    isRoller = subwayRef.current?.isRoller || false

  return (
    <>
      {isShow && (
        <SubwayWrapper
          style={zoomVar}
          lineName={lineName}
          manualZoom={manualZoom}
          sideName={sideName}
          promptPanel={panelRef.current}
          maskColor={maskColor}
          className={`${isRoller ? 'subway-is-roll' : ''}`}
          infoWindowId={`${wrapperId.current}-info-window`}>
          <div id={wrapperId.current}></div>
          <div className='lcz-subway-zoom'>
            {manualZoom.display && <Zoom zoomVal={zoomVal} manualZoom={manualZoom} handleZoom={handleZoom} />}
          </div>
        </SubwayWrapper>
      )}
    </>
  )
})

export default memo(function SubwayMain(props: SubwayLineProps) {
  const { design = true, w = 1920, h = 1080 } = props
  return (
    <LczComCon className='lcz-subway-line-wrapper'>
      {design ? (
        <iframe
          scrolling='no'
          src={(process.env.NODE_ENV === 'production' ? '..' : 'HappyServer') + '/lczCommon/matrix/iframe/gaode.html'}
          style={{ width: w, height: h, border: 'none' }}
        />
      ) : (
        <LczSubwayLine {...props} />
      )}
    </LczComCon>
  )
})
