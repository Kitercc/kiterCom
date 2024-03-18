import React, { memo, useState, useMemo, useEffect, useRef } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmptyData } from '../../../common/util'
import { getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './common/createChart'
import { LczBasicFunnelProps } from './type'

export default memo(function LczBasicPie(props: LczBasicFunnelProps) {
  const { w = 480, h = 288, data = [], onClick, seriesConfig, ...otherProps } = props

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)

  const dataMemo = useMemo(() => {
    let _data = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })
    const _isEmptyData = isEmptyData(data)
    if (_isEmptyData) return []
    _data = _data.map(da => ({ ...da, value: isNaN(da.value) ? 0 : Number(da.value) }))

    return _data
  }, [JSON.stringify(data)])

  const styledsMemo = useMemo(() => {
    if (seriesConfig?.dataSeries && seriesConfig.dataSeries.length > 0) {
      setShow(true)
      return getDataSeriesStyle(dataMemo, seriesConfig?.dataSeries)
    } else {
      setShow(false)
      return []
    }
  }, [JSON.stringify(dataMemo), JSON.stringify(seriesConfig?.dataSeries)])

  useEffect(() => {
    if (wrapper.current && show) {
      if (!chartCase) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
      }
    } else {
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
    return () => {
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
  }, [show])

  useEffect(() => {
    if (chartCase && show) {
      chartCase.resize({ w, h })
    }
  }, [w, h, show])

  function handleEvent(param) {
    if (param) {
      const eventParam = param.data
      const dataSeries = seriesConfig?.dataSeries ? [...seriesConfig?.dataSeries].reverse() : []
      const findSeries = dataSeries.find(s => s.map?.fieldName === eventParam.item)
      findSeries && findSeries.map?.displayName && (eventParam.item = findSeries.map?.displayName)
      onClick && onClick(eventParam)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(seriesConfig?.dataSeries), show])

  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setConfig(props, dataMemo, styledsMemo)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(seriesConfig), JSON.stringify(styledsMemo), JSON.stringify(otherProps), show])

  return (
    <LczComCon>
      <div style={{ width: w, height: h }} ref={wrapper} />
    </LczComCon>
  )
})
