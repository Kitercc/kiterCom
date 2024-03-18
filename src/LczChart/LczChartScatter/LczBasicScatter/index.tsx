import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty } from '../../../common/util'
import { formatData, syncSeriesTitle } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { ScatterProps, SeriesConfig } from './type'

export default memo(function LczScatter(props: ScatterProps) {
  const { chartType = 'scatter', w = 0, h = 0, data = [], onClick, ...otherProps } = props
  const { dataSeries = [], bubbleConfig } = otherProps.seriesConfig as SeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)
  const [chartCase, setChart] = useSyncState<CreateChart | null>(null)
  const [chartData, setChartData] = useState<any>({})

  useEffect(() => {
    const _data = conversionData(data, { x: 'num', y: 'num', series: 'string', seriesTitle: 'string', value: 'num' })
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))
    const hasSeriesData = formatData(hasSeries, 'series')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })
    setChartData(syncSeriesTitle(hasSeriesData))
  }, [JSON.stringify(data), JSON.stringify(dataSeries)])

  const styleMemo = useMemo(() => {
    if (bubbleConfig?.styleMode === 'subsection' && bubbleConfig?.subsectionConfig?.length === 0) {
      setChartData({})
      return []
    }

    if (dataSeries.length && data.length) {
      const fileName = { bubble: 'bubbleStyle', scatter: 'scattrsStyle' }[chartType]
      const datakeys = Object.keys(chartData)
      const seriseLen = dataSeries.length
      const findSeries = dataSeries.find(ser => datakeys.find(da => da === ser?.map?.fieldName))
      if (!findSeries) {
        return datakeys.map((_, i) => dataSeries[i % seriseLen][fileName])
      } else {
        return datakeys.map(v => {
          const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1][fileName] : dataSeries[seriseLen - 1][fileName]
        })
      }
    } else {
      Object.keys(chartData).length && setChartData({})
      return []
    }
  }, [JSON.stringify(chartData), JSON.stringify(dataSeries), chartType, JSON.stringify(bubbleConfig)])

  // 初始化图表
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
    if (type === 'click' && params?.componentType === 'series') {
      const _data: any = params.data[3],
        findSeries = dataSeries.find(v => v.map?.displayName && v.map?.fieldName === _data.series)

      findSeries?.map?.displayName && (_data.seriesTitle = findSeries?.map?.displayName)
      onClick && onClick(_data)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setEvents('click', handleEvent)
    }
  }, [chartCase.current, JSON.stringify(chartData), JSON.stringify(dataSeries)])

  // 更新全局配置
  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setConfig(props, chartData, styleMemo, { chartType })
    }
  }, [chartCase, chartType, JSON.stringify(otherProps), styleMemo])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
