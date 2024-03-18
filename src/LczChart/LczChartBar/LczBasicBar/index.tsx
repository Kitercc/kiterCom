import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, objectIsEmpty, randomChar } from '../../../common/util'
import { chartEventFun } from '../../common'
import { generalxAxis } from '../../common/generalValue'
import { GeneralDataMap } from '../../common/type'
import { formatData, getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { BasicBarProps, DataSeries, SeriesConfig } from './type'

export default memo(function LczBasicBar(props: BasicBarProps) {
  const { w = 600, h = 400, data = [], onClick, ...otherProps } = props
  const { dataSeries = [], stackSeries = [] } = otherProps.seriesConfig as SeriesConfig

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

    const _data = _conversionData.map(v => ({ ...v, value: isNaN(v.value) ? 0 : Number(v.value), _ids: randomChar() }))
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))
    const hasSeriesData = formatData(hasSeries, 'series')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })
    setChartData(hasSeriesData)
  }, [JSON.stringify(data), JSON.stringify(dataSeries)])

  const styledsMemo: DataSeries[] = useMemo(() => {
    if (dataSeries.length > 0 && data.length > 0) {
      return getDataSeriesStyle(chartData, dataSeries)
    } else {
      !objectIsEmpty(chartData) && setChartData({})
      return []
    }
  }, [JSON.stringify(chartData), JSON.stringify(dataSeries)])

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
  }, [w, h, chartCase])

  function handleEvent(type, params) {
    if (type === 'click' && params?.data?.ids) {
      const xAxisConfig = otherProps.axisConfig?.xAxis || generalxAxis
      const param = chartEventFun(xAxisConfig, params, chartData, dataSeries, stackSeries)

      onClick && onClick(param)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(chartData), JSON.stringify(dataSeries)])

  // 更新全局配置
  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setConfig(props, chartData, styledsMemo)
    }
  }, [chartCase, JSON.stringify(otherProps), JSON.stringify(chartData), JSON.stringify(styledsMemo)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
