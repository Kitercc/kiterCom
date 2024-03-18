import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, objectIsEmpty, randomChar } from '../../../common/util'
import { isRealNum } from '../../common'
import { GeneralDataMap } from '../../common/type'
import { formatData } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { LczTangentialBarProps, TangSeriesConfig } from './type'

export default memo(function LczTangentialBar(props: LczTangentialBarProps) {
  const { w = 800, h = 600, data = [], onClick, ...otherProps } = props
  const { dataSeries = [] } = otherProps.seriesConfig as TangSeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)
  const [chartCase, setChart] = useSyncState<CreateChart | null>(null)
  const [chartData, setChartData] = useState<{ [key: string]: GeneralDataMap[] }>({})

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

  const seriesArr = useMemo(() => {
    if (dataSeries.length > 0 && data.length > 0) {
      const datakeys = Object.keys(chartData)
      const seriseLen = dataSeries.length
      const findSeries = dataSeries.find(ser => datakeys.find(da => da === ser?.map?.fieldName))
      if (!findSeries) {
        const colors = datakeys.map((_, i) => dataSeries[i % seriseLen].color)
        const pillarTypeArr = datakeys.map((_, i) => dataSeries[i % seriseLen].pillarType)
        return { colors, pillarTypeArr }
      } else {
        const colors = datakeys.map(v => {
          const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1].color : dataSeries[seriseLen - 1].color
        })
        const pillarTypeArr = datakeys.map(v => {
          const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1].pillarType : dataSeries[seriseLen - 1].pillarType
        })
        return { colors, pillarTypeArr }
      }
    } else {
      !objectIsEmpty(chartData) && setChartData({})
      return { colors: [], pillarTypeArr: [] }
    }
  }, [JSON.stringify(chartData), JSON.stringify(dataSeries)])

  //初始挂载
  useEffect(() => {
    if (wrapper.current) {
      if (!chartCase.current) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
      }
    } else {
      chartCase.current && chartCase.current.dispose()
      setChart(null)
    }

    return () => {
      chartCase.current && chartCase.current.dispose()
      setChart(null)
    }
  }, [otherProps.globalConfig?.poleConfig?.pillarStyle?.roundCap, JSON.stringify(dataSeries)])

  // 图表尺寸改变图表自适应
  useEffect(() => {
    chartCase.current && chartCase.current.resize({ w, h })
  }, [w, h, chartCase.current])

  function handleEvent(type, params) {
    if (type === 'click' && params?.data?.ids) {
      const param = Object.create(null)
      param.category = params.data.name
      param.series = params.seriesName
      param.value = params.value[1]
      let seriesName = params.seriesName || ''
      const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === seriesName)
      if (findDataSeries && findDataSeries.map?.displayName) {
        seriesName = findDataSeries.map?.displayName
      } else {
        const findData = chartData[seriesName]?.find((v: GeneralDataMap) => v.seriesTitle)
        findData && (seriesName = findData.seriesTitle)
      }
      let name: string | undefined = params.data.name || ''
      const data = Object.values(chartData).flat() as GeneralDataMap[]
      const titleSeries = data.find((v: GeneralDataMap) => v.category == name && v.categoryTitle)
      titleSeries && (name = titleSeries.categoryTitle)
      param.seriesTitle = seriesName
      param.categoryTitle = name

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
      chartCase.current.setConfig(props, chartData, seriesArr)
    }
  }, [chartCase.current, JSON.stringify(otherProps), seriesArr])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
