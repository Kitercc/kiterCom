import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, objectIsEmpty, randomChar } from '../../../common/util'
import { chartEventFun, isRealNum } from '../../common'
import { generalxAxis } from '../../common/generalValue'
import { GeneralDataMap } from '../../common/type'
import { formatData } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { BasicAreaProps, AreaSeriesConfig } from './type'

export default memo(function LczBasicLine(props: BasicAreaProps) {
  const { w = 800, h = 600, data = [], onClick, ...otherProps } = props
  const { dataSeries = [], stackSeries = [] } = otherProps.seriesConfig as AreaSeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)

  const [chartCase, setChart] = useSyncState<CreateChart | null>(null),
    [chartData, setChartData] = useState<{ [key: string]: GeneralDataMap[] }>({})

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

  const colors = useMemo(() => {
    if (dataSeries.length > 0 && data.length > 0) {
      const datakeys = Object.keys(chartData)
      const seriseLen = dataSeries.length
      const findSeries = dataSeries.find(ser => datakeys.find(da => da === ser?.map?.fieldName))
      if (!findSeries) {
        return datakeys.map((_, i) => dataSeries[i % seriseLen].brokenLine?.color)
      } else {
        return datakeys.map(v => {
          const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1].brokenLine?.color : dataSeries[seriseLen - 1].brokenLine?.color
        })
      }
    } else {
      !objectIsEmpty(chartData) && setChartData({})
      return []
    }
  }, [JSON.stringify(chartData), JSON.stringify(dataSeries)])

  //初始挂载
  useEffect(() => {
    if (wrapper.current) {
      const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
      setChart(chart)
    }

    return () => {
      chartCase.current && chartCase.current.dispose()
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
      const param = chartEventFun(xAxisConfig, params, chartData, dataSeries, stackSeries)
      onClick && onClick(param)
    }
  }

  //处理事件

  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setEvents('click', handleEvent)
    }
  }, [chartCase.current, JSON.stringify(chartData), JSON.stringify(dataSeries)])

  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setConfig(props, chartData, colors)
    }
  }, [chartCase.current, JSON.stringify(otherProps), colors])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
