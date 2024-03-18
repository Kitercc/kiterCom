import React, { memo, useState, useMemo, useEffect, useRef } from 'react'
import * as echarts from 'echarts/core'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmptyData } from '../../../common/util'
import { getDataSeriesStyle } from '../../common/utils'
import { DataSeries } from '../Lcz3dTorus/type'
import { CreateChart } from './common/createChart'
import { LczBasicPieProps } from './type'

export default memo(function LczBasicPie(props: LczBasicPieProps) {
  const { w = 480, h = 288, data = [], onClick, seriesConfig, ...otherProps } = props

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)
  const chartCaseRef = useRef<CreateChart | null>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const dataMemo = useMemo(() => {
    let _data = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })

    const _isEmptyData = isEmptyData(data)
    if (_isEmptyData) return []
    _data = _data.map(da => ({ ...da, value: isNaN(da.value) ? 0 : Number(da.value) }))

    switch (seriesConfig?.sort) {
      case 'diminishing': {
        _data = _data.sort((a, b) => b.value - a.value)
        break
      }
      case 'increasing': {
        _data = _data.sort((a, b) => a.value - b.value)
        break
      }
      default:
        break
    }
    return _data
  }, [JSON.stringify(data), seriesConfig?.sort])

  const styledsMemo: DataSeries[] = useMemo(() => {
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
      if (!chartCaseRef.current) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
        chartCaseRef.current = chart
      }
    } else {
      chartCaseRef.current?.dispose()
      chartCaseRef.current = null
      // @ts-ignore
      setChart(null)
    }
    return () => {
      chartCaseRef.current?.dispose()
      chartCaseRef.current = null
      // @ts-ignore
      setChart(null)
    }
  }, [show, otherProps.globalConfig?.numberLabel?.display])

  useEffect(() => {
    if (chartCase && show) {
      chartCase.resize({ w, h })
    }
  }, [w, h, show])

  function handleEvent(this: echarts.EChartsType, param, type: 'click' | 'selectchanged') {
    if (param) {
      const dataSeries = seriesConfig?.dataSeries ? [...seriesConfig?.dataSeries].reverse() : []
      if (type === 'selectchanged') {
        const options: any = this.getOption(),
          data = options?.series[0]?.data,
          seriesIndex: number[] = param?.selected?.[0]?.dataIndex

        if (data?.length && seriesIndex?.length) {
          let eventParam = data.filter((_, i) => seriesIndex.includes(i))
          eventParam = eventParam.map(item => {
            const findSeries = dataSeries.find(s => s.map?.fieldName === item.item)
            findSeries && findSeries.map?.displayName && (item.item = findSeries.map?.displayName)
            return item
          })
          const _eventParam = otherProps.pieChart?.select?.mode === 'multiple' ? eventParam : eventParam[0]

          otherProps.onChange && otherProps.onChange(_eventParam)
        }
      } else {
        const eventParam = param.data
        const findSeries = dataSeries.find(s => s.map?.fieldName === eventParam.item)
        findSeries && findSeries.map?.displayName && (eventParam.item = findSeries.map?.displayName)
        onClick && onClick(eventParam)
      }
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
      chartCase.setEvents('selectchanged', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(seriesConfig), JSON.stringify(styledsMemo), JSON.stringify(otherProps), show])

  return (
    <LczComCon>
      <div style={{ width: w, height: h }} ref={wrapper} />
    </LczComCon>
  )
})
