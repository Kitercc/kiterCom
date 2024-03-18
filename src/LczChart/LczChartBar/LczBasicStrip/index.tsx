import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, objectIsEmpty, randomChar } from '../../../common/util'
import { chartEventFun } from '../../common'
import { generalxAxis } from '../../common/generalValue'
import { GeneralDataMap } from '../../common/type'
import { formatData, getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { BasicStripProps, SeriesConfig, StripDataSeries } from './type'

export default memo(function LczBasicBar(props: BasicStripProps) {
  const { w = 600, h = 400, data = [], onClick, chartType = 'strip', ...otherProps } = props
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

  const styledsMemo: StripDataSeries[] = useMemo(() => {
    if (dataSeries.length > 0 && data.length > 0) {
      if (chartType === 'signSeries') {
        const _data = chartData['_none'] || []
        return getDataSeriesStyle(_data, dataSeries, { signKey: 'category' })
      }
      return getDataSeriesStyle(chartData, dataSeries)
    } else {
      !objectIsEmpty(chartData) && setChartData({})
      return []
    }
  }, [chartType, JSON.stringify(dataSeries), JSON.stringify(chartData)])

  useEffect(() => {
    if (wrapper.current) {
      const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
      setChart(chart)
    }

    return () => {
      chartCase.current?.dispose && chartCase.current.dispose()
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
      if (chartType === 'signSeries' && xAxisConfig.axisLabel?.labelType !== 'time') {
        const findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === param.category)
        findSeries?.map?.displayName && (param.categoryTitle = findSeries?.map?.displayName)
      }
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
  }, [chartCase, JSON.stringify(otherProps), styledsMemo])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
