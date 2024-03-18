import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData } from '../../../common/util'
import { getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './common/createChart'
import { BasicGaugeProps, GaugeDataSeries } from './type'

export default memo(function LczBasicGauge(props: BasicGaugeProps) {
  const { w = 0, h = 0, data = [], onClick, ...otherProps } = props

  const datSeries = otherProps.seriesConfig?.gaugeDataSeries || []

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const preChartCase = useRef<any>(null)

  useEffect(() => {
    let _data = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })
    _data = _data.map(da => ({ ...da, value: isNaN(da.value) ? 0 : Number(da.value) }))
    setChartData(_data)
  }, [JSON.stringify(data), JSON.stringify(datSeries)])

  const stylesMemo: GaugeDataSeries[] = useMemo(() => {
    if (datSeries.length > 0 && data.length > 0) {
      return getDataSeriesStyle(chartData, datSeries)
    } else {
      setChartData([])
      return []
    }
  }, [JSON.stringify(chartData), JSON.stringify(datSeries)])

  useEffect(() => {
    if (wrapper.current) {
      if (!preChartCase.current) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        preChartCase.current = chart
        setChart(chart)
      }
    } else {
      chartCase?.myChart?.dispose && chartCase.myChart.dispose()
      chartCase?.dispose && chartCase.dispose()
      preChartCase.current = null
      // @ts-ignore
      setChart(null)
    }
    return () => {
      preChartCase.current?.dispose && preChartCase.current.dispose()
      preChartCase.current = null
      // @ts-ignore
      setChart(null)
    }
  }, [])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.resize({ w, h })
    }
  }, [w, h, chartCase])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setConfig(props, chartData, stylesMemo)
    }
  }, [chartCase, JSON.stringify(chartData), JSON.stringify(otherProps)])

  function handleEvent(params, type) {
    if (type === 'click' && params) {
      const eventParam = {
        itemTitle: params.data.name,
        item: params.data.itemTitle,
        value: params.data.value
      }
      onClick && onClick(eventParam)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(chartData)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
