import { useMemo } from 'react'
import { findChildCom, getChildComItem, getChildCompArr } from '../../common/util'
import { ChildComponent } from '../type'
import {
  OutAmbientLight,
  OutAreaHeat,
  OutDirectionalLight,
  OutFlyLine,
  OutRealEarth,
  OutRipples,
  OutScatterPoint,
  OutTitleBubble
} from '../type/child'

export default function useChildComponents(childComponents: ChildComponent[]) {
  const realEarthMemo = useMemo(() => {
    const realEarth = getChildComItem(childComponents, 'lcz-earth-real-earth') as OutRealEarth
    return realEarth.id ? realEarth : null
  }, [findChildCom(childComponents, 'lcz-earth-real-earth')])

  // 环境光
  const ambientLightMemo = useMemo(() => {
    const ambientLight = getChildCompArr(childComponents, 'lcz-earth-ambient-light') as OutAmbientLight[]
    return ambientLight
  }, [findChildCom(childComponents, 'lcz-earth-ambient-light')])

  // 方向光
  const directionalLightMemo = useMemo(() => {
    const directionalLight = getChildCompArr(childComponents, 'lcz-earth-directional-light') as OutDirectionalLight[]
    return directionalLight
  }, [findChildCom(childComponents, 'lcz-earth-directional-light')])

  // 区域热力
  const areaHeatMemo = useMemo(() => {
    const areaHeat = getChildCompArr(childComponents, 'lcz-earth-area-heat', {
      dataTypes: { name: 'string', value: 'number' }
    }) as OutAreaHeat[]
    const outAreaHeat: OutAreaHeat[] = []
    areaHeat.forEach(item => {
      item.data = item.data ? item.data.filter(v => v.name) : []
      outAreaHeat.push(item)
    })
    return outAreaHeat
  }, [findChildCom(childComponents, 'lcz-earth-area-heat')])

  // 散点
  const scatterPointMemo = useMemo(() => {
    let scatterPoint = getChildCompArr(childComponents, 'lcz-earth-scatter-point', {
      dataTypes: { lng: 'number', lat: 'number' },
      type: 'lcz-earth',
      filter: true
    }) as OutScatterPoint[]
    scatterPoint = scatterPoint.filter(v => v.data?.length)
    return scatterPoint
  }, [findChildCom(childComponents, 'lcz-earth-scatter-point')])

  // 飞线
  const flyLineMemo = useMemo(() => {
    const scatterPoint = getChildCompArr(childComponents, 'lcz-earth-fly-line', {
      dataTypes: {
        fromlat: 'number',
        fromlng: 'number',
        tolat: 'number',
        tolng: 'number'
      }
    }) as OutFlyLine[]
    let outFlyLine: OutFlyLine[] = []
    scatterPoint.forEach(v => {
      if (v.data?.length) {
        v.data = v.data.filter(item => !isNaN(item.tolng + item.tolat + item.fromlat + item.fromlng))
        outFlyLine.push(v)
      }
    })
    outFlyLine = outFlyLine.filter(v => v.data?.length)
    return outFlyLine
  }, [findChildCom(childComponents, 'lcz-earth-fly-line')])

  // 标牌
  const titleBubbleMemo = useMemo(() => {
    let titleBubble = getChildCompArr(childComponents, 'lcz-earth-title-bubble', {
      dataTypes: {
        lng: 'number',
        lat: 'number',
        name: 'string',
        code: 'string',
        height: 'num'
      },
      type: 'lcz-earth',
      filter: true
    }) as OutTitleBubble[]
    titleBubble = titleBubble.filter(v => v.data?.length)
    return titleBubble
  }, [findChildCom(childComponents, 'lcz-earth-title-bubble')])

  // 涟漪
  const ripplesMemo = useMemo(() => {
    let ripples = getChildCompArr(childComponents, 'lcz-earth-ripples', {
      dataTypes: { lng: 'number', lat: 'number' },
      type: 'lcz-earth',
      filter: true
    }) as OutRipples[]
    ripples = ripples.filter(v => v.data?.length)
    return ripples
  }, [findChildCom(childComponents, 'lcz-earth-ripples')])

  return {
    realEarthMemo,
    ambientLightMemo,
    directionalLightMemo,
    areaHeatMemo,
    scatterPointMemo,
    flyLineMemo,
    titleBubbleMemo,
    ripplesMemo
  }
}
