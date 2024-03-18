import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { isEmpty } from '../../common/util'
import mAMap from '../../LczAMap/common/AMap'
import { OutPolyline, PolyLineGlobal } from '../../LczAMap/type/child'
import PolyLine from './common'

interface polylineProps {
  polyline: OutPolyline
  mAmap: mAMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

export default memo(function LczAMapPolyLine(props: polylineProps) {
  const { polyline, mAmap, onChildComEvent } = props
  const { id = '', globalConfig = {} as PolyLineGlobal, lineConfig, customLine = [], data = [], onClick } = polyline

  const polylineInstance = useRef<PolyLine | null>(null),
    [currentLine, setCurrentLine] = useState<string>('')

  const polylineStyleMemo = useMemo(() => {
    const _obj: { data: any; style: any } = { data: {}, style: {} }

    data.forEach(item => {
      if (isEmpty(item.id)) {
        const id = String(item.id) || ''
        _obj.data[id] ? _obj.data[id].push(item) : (_obj.data[id] = [item])
      } else {
        _obj.data['_none'] ? _obj.data['_none'].push(item) : (_obj.data['_none'] = [item])
      }
    })

    // 有自定义线路
    const _customObj = { _none: lineConfig },
      conditions: (string | number)[] = []

    customLine.forEach(item => {
      const val = String(item.condition?.value)
      if (val && !_customObj[val]) {
        _customObj[val] = item
        conditions.push(val)
      }
    })

    _obj.style = _customObj
    return _obj
  }, [JSON.stringify(data), JSON.stringify(lineConfig), JSON.stringify(customLine)])

  function handlerClick(e) {
    if (e && e.target) {
      const _id = e.target.getExtData()

      if (_id !== '_none') {
        onClick && onChildComEvent && onChildComEvent(id, 'onClick', { id: _id })
        setCurrentLine(_id)
      }
    }
  }

  useEffect(() => {
    if (mAmap.map) {
      polylineInstance.current = new PolyLine({ polyline, mAmap, callback: handlerClick })
    }
    return () => {
      polylineInstance.current?.destroy()
      polylineInstance.current = null
    }
  }, [mAmap])

  useEffect(() => {
    const val = globalConfig.defaultSelect?.value || ''
    setCurrentLine(val)
  }, [JSON.stringify(globalConfig.defaultSelect)])

  useEffect(() => {
    if (polylineInstance.current) {
      polylineInstance.current.updataPolyLine(polylineStyleMemo, globalConfig, currentLine)
    }
  }, [mAmap, polylineInstance.current, currentLine, JSON.stringify(polylineStyleMemo), globalConfig.level])

  return <></>
})
