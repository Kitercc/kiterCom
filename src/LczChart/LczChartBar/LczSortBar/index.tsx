import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, randomChar } from '../../../common/util'
import { getSortStyleDemo, sortformatData } from './commom'
import { CreateChart } from './commom/creatChart'
import { SortBarProps, SeriesConfig } from './type'

export default memo(function LczBasicBar(props: SortBarProps) {
  const { w = 600, h = 400, data = [], onClick, ...otherProps } = props
  const { dataSeries = [] } = otherProps.seriesConfig as SeriesConfig

  const wrapper = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)

  const dataMemo = useMemo(() => {
    const _conversionData = conversionData(data, {
      category: 'string',
      categoryTitle: 'string',
      time: 'string',
      no: 'num'
    })

    const _data = _conversionData.map(v => ({ ...v, value: isNaN(v.value) ? 0 : Number(v.value), _ids: randomChar() }))
    const nSeries = _data.filter(v => !isEmpty(v.time))
    const hasSeries = _data.filter(v => isEmpty(v.time))
    const hasSeriesData = sortformatData(hasSeries, 'time')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })

    return hasSeriesData
  }, [JSON.stringify(data)])

  const styledsMemo = useMemo(() => {
    if (dataSeries.length > 0 && Object.keys(dataMemo).length > 0) {
      setShow(true)
      return getSortStyleDemo(dataMemo, dataSeries)
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
    if (type === 'click' && params?.data?._ids) {
      const data = {
        category: params.name,
        categoryTitle: '',
        value: params?.data?.value,
        time: params?.data?._time,
        no: params?.data?._no
      }
      const findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === params.name)
      data.categoryTitle = findSeries && findSeries.map?.displayName ? findSeries.map?.displayName : params.data._name
      onClick && onClick(data)
      //
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
