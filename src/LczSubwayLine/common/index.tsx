/* eslint-disable indent */
import React from 'react'
import ReactDOM from 'react-dom'
import { analysisExpression, randomChar } from '../../common/util'
import { GeneralPoint, TransferPointStyle } from '../type'
import { outPanel, outRipples, outSign } from '../type/child'
import { LczSubwayRipples, LczSubwayPanel, LczSubwaySign } from '../../LczChildrenComponents'

export const cityArr = [
  '1100',
  '1200',
  '1301',
  '1401',
  '1501',
  '2101',
  '2102',
  '2201',
  '2301',
  '3100',
  '3201',
  '3202',
  '3203',
  '3204',
  '3205',
  '3301',
  '3302',
  '3303',
  '3401',
  '3501',
  '3502',
  '3601',
  '3701',
  '3702',
  '4101',
  '4103',
  '4201',
  '4301',
  '4401',
  '4403',
  '4406',
  '4419',
  '4501',
  '5000',
  '5101',
  '5201',
  '5301',
  '6101',
  '6201',
  '6501',
  '8100',
  '8200'
]

// @ts-ignore
window.gaodeInitCallback = () => {
  // @ts-ignore
  window.isLoadedGaodeScript = true
}

// 加载高德api
export const rounningGaodeScript = function () {
  // @ts-ignore
  if (!window.isLoadedGaodeScript) {
    return new Promise(resolve => {
      setTimeout(() => {
        loadGaodeScript()
        resolve(rounningGaodeScript())
      }, 50)
    })
  } else {
    return Promise.resolve()
  }
}

// 加载高德script
export const loadGaodeScript = () => {
  let GaodeScript = document.getElementById('gaode-script')
  if (!GaodeScript) {
    GaodeScript = document.createElement('script')
    GaodeScript.setAttribute('id', 'gaode-script')
    GaodeScript.setAttribute('async', 'async')
    GaodeScript.setAttribute('type', 'text/javascript')
    GaodeScript.setAttribute(
      'src',
      'https://webapi.amap.com/subway?v=1.0&key=5d9b009b37b146c4964b76ea85f351f8&callback=gaodeInitCallback'
    )
    document.getElementsByTagName('body')[0].appendChild(GaodeScript)
  }
}

export const centerDisplay = (subwayRef: any, id = '#svg-g') => {
  const _select_obj = document.querySelector(`${id}`)
  if (!_select_obj) return
  subwayRef.setFitView(_select_obj)
  const center = subwayRef.getSelectedLineCenter()
  subwayRef.setCenter(center)
}

// 高亮选中线路
export const showcurrentLine = (subwayRef: any, id: string | number) => {
  return new Promise(res => {
    subwayRef.showLine(id)
    if (subwayRef.selectCenter) {
      centerDisplay(subwayRef, '#g-select')

      subwayRef._scale !== 1 &&
        setTimeout(() => {
          subwayRef.scale(subwayRef._scale)
        }, 600)
    }
    res('ok')
  })
}

// 打点
export const LczShowMarker = async (
  subwayRef: any,
  config: { ripplesMemo: outRipples; signMemo: outSign },
  { setRipplesList, markerList = {}, setMarkerList }
) => {
  try {
    const { ripplesMemo, signMemo } = config

    if (subwayRef._markerArr?.length) {
      const len = subwayRef._markerArr.length
      for (let i = 0; i < len; i++) {
        const container = subwayRef._markerArr.splice(0, 1)[0]
        container && ReactDOM.unmountComponentAtNode(container)
      }
    }

    if (Object.keys(markerList).length > 0) {
      // 数据更新时 清除上一次的marker
      for (const key in markerList) {
        subwayRef.clearMarker(key)
      }
    }

    const { show: ripplesShow, id: ripplesId, siteName, styleInterval, data: ripplesData = [] } = ripplesMemo
    const { show: signShow, id: signId, data: SignData = [] } = signMemo
    const formatRipplesData = ripplesData.map(v => ({ ...v, station: v[siteName] }))
    if (formatRipplesData?.length <= 0 && SignData?.length <= 0) return false

    const _data = mergeData([
      { type: 'ripples', data: formatRipplesData },
      { type: 'sign', data: SignData }
    ])

    if (Object.keys(_data).length <= 0) return false

    const _rippleList: { class: string; val: string; item: any }[] = []

    for (const key in _data) {
      const item = _data[key]
      const _class = randomChar('subway-marker')
      await subwayRef.addMarker(key, {
        customClass: 'subway-marker-site',
        width: 0,
        height: 0,
        cnt: `<div id="${_class}"></div>`
      })
      const JSXOBJ = item
        .map(({ type, data }) => {
          switch (type) {
            case 'ripples': {
              if (!ripplesShow || styleInterval.length <= 0) return null
              let name = ''
              const station = data[siteName]
              const _findArr = styleInterval.filter((v, i) => {
                const _repName = `styleInterval[${i}]`
                if (
                  analysisExpression(v.condition, data, ripplesId, {
                    name: 'styleInterval[].condition',
                    pathArr: [_repName]
                  })
                ) {
                  name = _repName
                  return true
                }
              })

              if (_findArr.length <= 0) return null
              _rippleList.push({ class: _class, val: station, item: data })
              const findItem = _findArr[_findArr.length - 1]

              return (
                <LczSubwayRipples
                  key={type + ripplesId}
                  id={ripplesId}
                  repName={name}
                  styleIntervalItem={findItem}
                  className={_class}
                  dataItem={data}
                />
              )
            }
            case 'sign': {
              if (!signShow) return null
              return <LczSubwaySign key={type + signId} signMemo={signMemo} dataItem={data} />
            }

            default:
              return null
          }
        })
        .filter(v => v)

      const container = document.getElementById(_class)
      if (container) {
        if (!subwayRef._markerArr) subwayRef._markerArr = []
        subwayRef._markerArr.push(container)
        ReactDOM.render(<div>{JSXOBJ}</div>, container)
      }
    }

    setRipplesList([..._rippleList])
    setMarkerList({ ..._data })
  } catch (error) {
    console.warn(error)
  }
}

// 选中站点
export const showCurrentSite = (subwayRef: any, val: string | number, flag = false) => {
  if (!String(val)) return

  subwayRef.currentSide = val

  if (subwayRef.clickSideCenter || flag) {
    const _c = subwayRef.getStCenter(val)
    if (Object.keys(_c).length > 0) subwayRef.setCenter(_c)
  }
}

// 显示数据提示框
export const showInfoWindow = async (subwayRef: any, conId: string, val: string | number, panel: outPanel) => {
  try {
    showCurrentSite(subwayRef, val)
    clearInfoWindow(conId, subwayRef)

    if (Object.keys(panel).length) {
      await subwayRef.addInfoWindow(val, {
        content: `<div id="${conId}"></div>`
      })
      setTimeout(() => {
        const _infoWindow = document.getElementById(`${conId}`) as HTMLDivElement
        _infoWindow && ReactDOM.render(<LczSubwayPanel promptPanel={panel} />, _infoWindow)
      })
    }
  } catch (error) {
    console.warn(error)
  }
}

export const clearInfoWindow = (id: string, subwayRef: any) => {
  try {
    const node = document.getElementById(id)
    if (node) {
      ReactDOM.unmountComponentAtNode(node)
      subwayRef.clearInfoWindow()
    }
  } catch (error) {
    console.warn(error)
  }
}

// 加载事件
export const infoWindowAddEvents = (conId: string, mouseenter, mouseLeave) => {
  const _infoWindow = document.getElementById(`${conId}`) as HTMLDivElement
  if (_infoWindow) {
    _infoWindow.addEventListener('mouseenter', mouseenter)
    _infoWindow.addEventListener('mouseleave', mouseLeave)
  }
}

// 移出事件
export const infoWindowRemoveEvents = (conId: string, mouseenter, mouseLeave) => {
  const _infoWindow = document.getElementById(`${conId}`) as HTMLDivElement
  if (_infoWindow) {
    _infoWindow.removeEventListener('mouseenter', mouseenter)
    _infoWindow.removeEventListener('mouseleave', mouseLeave)
  }
}

// 替换站点图片
export const replaceSiteImg = (transferPoint: TransferPointStyle, generalPoint: GeneralPoint) => {
  const { display: tDis, transferType, systemUrl: TsystemUrl, customUrl: TcustomUrl } = transferPoint
  const { display: Gdis, generalType, systemUrl: GsystemUrl, customUrl: GcustomUrl } = generalPoint

  const normalStation = document.getElementById('normalStation') // 站点
  const transferStation = document.getElementById('transferStation') // 换乘点

  if (tDis) {
    switch (transferType) {
      case 'system': {
        if (TsystemUrl) {
          transferStation?.setAttribute('xlink:href', TsystemUrl)
        }
        break
      }
      case 'custom': {
        if (TcustomUrl) {
          transferStation?.setAttribute('xlink:href', TcustomUrl)
        }
        break
      }
    }
  }

  if (Gdis) {
    switch (generalType) {
      case 'system': {
        if (GsystemUrl) {
          normalStation?.setAttribute('xlink:href', GsystemUrl)
        }
        break
      }
      case 'custom': {
        if (GcustomUrl) {
          normalStation?.setAttribute('xlink:href', GcustomUrl)
        }
        break
      }
    }
  }
}

export const findChildCom = (childComponents, _type) => {
  const _findempty = childComponents.find(
    ({ type, config }) => type === _type && config?.show && config?.condition === ''
  )
  const _find = childComponents.find(({ type, config }) => type === _type && config?.show && config?.condition)
  const find = _find || _findempty
  if (!find) return {}
  return Object.assign({ data: find.data, ...find.event, id: find.id, type: find.type }, find.config)
}

const mergeData = (target: { type: 'ripples' | 'sign'; data: any[] }[]) => {
  try {
    const _obj: { [key: string]: any[] } = {}
    for (let i = 0; i < target.length; i++) {
      const item = target[i]
      item.data.forEach(v => {
        if (v?.station) {
          _obj[v.station]
            ? _obj[v.station].push({ type: item.type, data: v })
            : (_obj[v.station] = [{ type: item.type, data: v }])
        }
      })
    }
    return _obj
  } catch (error) {
    return {}
  }
}
