import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, isEmptyData, randomChar } from '../../../common/util'
import { GeneralDataMap } from '../../common/type'
import { formatData, getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { BubbleDataSeries, FixedBubbleProps, SeriesConfig } from './type'

export default memo(function LczFixedBubble(props: FixedBubbleProps) {
  const { w = 600, h = 400, data = [], onClick, ...otherProps } = props
  const { dataSeries = [] } = otherProps.seriesConfig as SeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)

  const dataMemo: { seriesData: GeneralDataMap[]; normalData: GeneralDataMap[] } | any = useMemo(() => {
    const _conversionData = conversionData(data, {
      category: 'string',
      categoryTitle: 'string',
      series: 'string',
      seriesTitle: 'string'
    })
    const _isEmptyData = isEmptyData(data)
    if (_isEmptyData) return { seriesData: [], normalData: [] }
    const _data: GeneralDataMap[] = []
    _conversionData.forEach(
      v => v.value > 0 && _data.push({ ...v, value: isNaN(v.value) ? 0 : Number(v.value), _ids: randomChar() })
    )
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))
    const hasSeriesData: GeneralDataMap[] = formatData(hasSeries, 'series')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })

    return { seriesData: hasSeriesData, normalData: _data }
  }, [JSON.stringify(data)])

  const styledsMemo: BubbleDataSeries[] = useMemo(() => {
    if (dataSeries.length > 0 && Object.keys(dataMemo.seriesData).length > 0) {
      setShow(true)
      return getDataSeriesStyle(dataMemo.seriesData, dataSeries)
    } else {
      setShow(false)
      return []
    }
  }, [JSON.stringify(dataMemo), JSON.stringify(dataSeries)])

  useEffect(() => {
    if (wrapper.current && show) {
      if (!chartCase) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
      }
    } else {
      chartCase?.myChart?.dispose && chartCase.myChart.dispose()
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
    return () => {
      chartCase?.myChart?.dispose && chartCase.myChart.dispose()
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
  }, [show])

  // 图表尺寸改变图表自适应
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.resize({ w, h })
    }
  }, [w, h, chartCase])

  function handleEvent(type, params) {
    if (type === 'click' && params?.componentType === 'series') {
      const _data: any = params.data.value[3],
        findSeries = dataSeries.reverse().find(v => v.map?.displayName && v.map?.fieldName === _data.series)

      findSeries?.map?.displayName && (_data.seriesTitle = findSeries?.map?.displayName)
      onClick && onClick(_data)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(dataSeries)])

  // 更新全局配置
  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setConfig(props, dataMemo, styledsMemo)
    }
  }, [chartCase, JSON.stringify(otherProps), styledsMemo])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
