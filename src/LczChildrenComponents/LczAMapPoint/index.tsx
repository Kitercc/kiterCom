import React, { memo, useMemo, useEffect, useRef, Fragment } from 'react'
import { AmapPointStyles } from './style'
import { randomChar } from '../../common/util'
import mAMap from '../../LczAMap/common/AMap'
import { OutPoint, PointGlobal } from '../../LczAMap/type/child'
import { loadMarkers, PointCarousel } from './common'

interface PointProps {
  point: OutPoint
  mAmap: mAMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

export default memo(function LczAMapPoint(props: PointProps) {
  const { point, mAmap, onChildComEvent } = props
  const {
    id,
    globalConfig = {} as PointGlobal,
    iconConfig = {},
    customIcon = [],
    data = [],
    focusIcon = {},
    onClick,
    onMouseenter,
    onMouseleave,
    onChange
  } = point

  const carousel = globalConfig.carousel

  const pointsId = useRef<string>(randomChar('point-')),
    pointCarouselCase = useRef<PointCarousel | null>(null),
    markerPoints = useRef<any>([])

  const stylesMemo = useMemo(() => {
    const styles: any[] = [{ type: 'normal', ...iconConfig }]
    const dataStyleds: any[] = []
    styles.push({ type: 'active', ...focusIcon })
    customIcon?.forEach(item => {
      if (item.conditionType) {
        const find = data.find(da => da.type && da.type == item.conditionType?.value)
        find && styles.push({ type: `custom-${find.type}`, ...item })
      }
    })

    data.forEach(v => {
      if (v.type && customIcon.length > 0) {
        const find = customIcon.find(icon => icon.conditionType?.value == v.type)
        find
          ? dataStyleds.push({ type: `custom-${find.conditionType?.value}`, ...find })
          : dataStyleds.push({ type: 'normal', ...iconConfig })
      } else {
        dataStyleds.push({ type: 'normal', ...iconConfig })
      }
    })

    return { dataStyleds, styles }
  }, [JSON.stringify(point)])

  function pointHandlerClick(param, type?: 'click' | 'mouseover' | 'mouseout' | 'change') {
    type = type || 'change'
    if (param?.target) {
      const _data = param.target.getExtData()
      switch (type) {
        case 'click':
          onClick && onChildComEvent && onChildComEvent(id, 'onClick', _data)
          break
        case 'mouseover':
          onMouseenter && onChildComEvent && onChildComEvent(id, 'onMouseenter', _data)
          break
        case 'mouseout':
          onMouseleave && onChildComEvent && onChildComEvent(id, 'onMouseleave', _data)
          break
        case 'change':
          onChange && onChildComEvent && onChildComEvent(id, 'onChange', _data)
          break
      }
    }
  }

  useEffect(() => {
    if (mAmap.map) {
      if (markerPoints.current.length) {
        mAmap.map.remove(markerPoints.current)
        markerPoints.current = []
      }

      const points = loadMarkers(mAmap.map, data, {
        dataStyleds: stylesMemo.dataStyleds,
        pointsId: pointsId.current,
        globalConfig,
        fn: pointHandlerClick
      })

      markerPoints.current = [...points]
    }
    return () => {
      if (markerPoints.current.length) {
        mAmap.map?.remove(markerPoints.current)
        markerPoints.current = []
      }
    }
  }, [mAmap, JSON.stringify(data), JSON.stringify(globalConfig), JSON.stringify(stylesMemo.dataStyleds)])

  useEffect(() => {
    if (carousel?.display) {
      pointCarouselCase.current = new PointCarousel({
        carousel,
        markerPoints: markerPoints.current,
        id: pointsId.current,
        focusIcon,
        callback: pointHandlerClick
      })
    } else {
      pointCarouselCase.current?.destroy()
      pointCarouselCase.current = null
    }
    return () => {
      pointCarouselCase.current?.destroy()
      pointCarouselCase.current = null
    }
  }, [carousel?.display])

  useEffect(() => {
    pointCarouselCase.current && pointCarouselCase.current.clear(false)

    if (mAmap.map && markerPoints.current.length > 1 && carousel?.display) {
      pointCarouselCase.current?.upDataConfig({
        carousel,
        markerPoints: markerPoints.current,
        id: pointsId.current,
        focusIcon,
        callback: pointHandlerClick
      })
    }

    return () => {
      pointCarouselCase.current && pointCarouselCase.current.clear()
    }
  }, [mAmap, JSON.stringify(carousel), markerPoints.current, JSON.stringify(focusIcon)])

  return (
    <Fragment>
      {stylesMemo.styles.map((styled, i) => (
        <AmapPointStyles styled={styled} id={pointsId.current} key={i} />
      ))}
    </Fragment>
  )
})
