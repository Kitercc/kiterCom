import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, randomChar } from '../../../common/util'
import { chartEventFun, isRealNum } from '../../common'
import { generalxAxis } from '../../common/generalValue'
import { GeneralDataMap } from '../../common/type'
import { formatData, getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './commom/creatChart'

import { DynamicLineProps, LineSeriesConfig } from './type'

export default memo(function LczBasicLine(props: DynamicLineProps) {
  const { w = 800, h = 600, data = [], design = true, onClick, onDataChange, ...otherProps } = props
  const { dataSeries = [] } = otherProps.seriesConfig as LineSeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)
  const [chartCase, setChart] = useSyncState<CreateChart | null>(null)
  const [chartData, setChartData] = useState<{ [key: string]: Array<GeneralDataMap> }>({ _none: [] })
  const valueRef = useRef<{ [key: string]: Array<GeneralDataMap> } | null>(null)

  useEffect(() => {
    const _conversionData = conversionData(data, {
      category: 'string',
      categoryTitle: 'string',
      series: 'string',
      seriesTitle: 'string'
    })

    const _data = _conversionData.map(v => ({
      ...v,
      value: isRealNum(v.value) ? Number(v.value) : null,
      _ids: randomChar()
    }))
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))
    const hasSeriesData = formatData(hasSeries, 'series')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })
    setChartData(hasSeriesData)
  }, [JSON.stringify(data), JSON.stringify(dataSeries)])

  const styleMemo = useMemo(() => {
    let _data
    if (design) {
      _data = chartData
    } else {
      _data = (Object.keys(chartData).length ? chartData : valueRef.current) || {}
    }

    if (dataSeries.length > 0 && Object.keys(_data).length > 0) {
      return getDataSeriesStyle(_data, dataSeries)
    } else {
      setChartData({})
      return []
    }
  }, [JSON.stringify(chartData), design])

  //初始挂载
  useEffect(() => {
    if (wrapper.current) {
      const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
      setChart(chart)
    }
    return () => {
      chartCase.current?.dispose && chartCase.current.dispose()
      // @ts-ignore
      setChart(null)
    }
  }, [])

  // 图表尺寸改变图表自适应
  useEffect(() => {
    chartCase.current && chartCase.current.resize({ w, h })
  }, [w, h, chartCase.current])

  function handleEvent(type, params) {
    if (type === 'click' && params?.data?.ids) {
      const xAxisConfig = otherProps.axisConfig?.xAxis || generalxAxis
      const param = chartEventFun(xAxisConfig, params, valueRef.current, dataSeries)
      onClick && onClick(param)
    }
  }

  //数据变化时
  function changeEvent() {
    const params = chartCase.current?.getEchartsOptions() as any
    if (params && params.xAxis.length && params.xAxis[0].data.length) {
      const _x = params.xAxis[0].data.pop()
      onDataChange && onDataChange({ category: _x })
    }
  }

  //处理事件
  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setEvents('click', handleEvent)
    }
  }, [chartCase.current, JSON.stringify(chartData), JSON.stringify(dataSeries)])

  useEffect(() => {
    if (chartCase.current?.myChart && design) {
      chartCase.current.setConfig(props, chartData, styleMemo)
    }
  }, [chartCase.current, JSON.stringify(otherProps), styleMemo, design])

  //追加
  useEffect(() => {
    if (chartCase.current?.myChart && !design) {
      chartCase.current.setConfig(props, chartData, styleMemo)
    }
  }, [chartCase, JSON.stringify(otherProps), design])

  useEffect(() => {
    if (chartCase.current?.myChart && !design) {
      chartCase.current.setAddData(props, chartData, styleMemo, valueRef)
      changeEvent()
    }
  }, [chartCase.current, JSON.stringify(otherProps), styleMemo, design])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
