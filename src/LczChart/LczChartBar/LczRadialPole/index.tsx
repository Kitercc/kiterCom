import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import { useSyncState } from '../../../common/hooks'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, isEmptyData, randomChar } from '../../../common/util'
import { formatData } from '../../common/utils'
import { CreateChart } from './commom/creatChart'
import { RadialPoleProps } from './type'

export default memo(function LczRadialPole(props: RadialPoleProps) {
  const { w = 600, h = 400, data = [], onClick, ...otherProps } = props
  const seriesConfig = otherProps.seriesConfig
  const timer = useRef<NodeJS.Timeout | null>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const [chartCase, setChart] = useSyncState<CreateChart | null>(null)
  const [show, setShow] = useState(true)

  const dataMemo = useMemo(() => {
    const _conversionData = conversionData(data, {
      category: 'string',
      categoryTitle: 'string',
      series: 'string',
      seriesTitle: 'string',
      value: 'num'
    })

    const _isEmptyData = isEmptyData(_conversionData)
    if (_isEmptyData) return { _none: [] }

    const _data = _conversionData.map(v => ({ ...v, _ids: randomChar() }))
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))

    if (otherProps.globalConfig?.singleSeries) {
      const findData = _data.find(v => v.series !== undefined || v.series !== null || v.series !== '')
      let name = findData ? findData.series : ''
      seriesConfig?.signSeries?.name && (name = seriesConfig?.signSeries?.name)
      return { [name || '_none']: [..._data] }
    } else {
      const hasSeriesData = formatData(hasSeries, 'series')
      if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })
      return hasSeriesData
    }
  }, [JSON.stringify(data), otherProps.globalConfig?.singleSeries, seriesConfig?.signSeries?.name])

  const colorMemo = useMemo(() => {
    const dataSeries =
      (otherProps.globalConfig?.singleSeries
        ? seriesConfig?.signSeries?.dataSeries
        : seriesConfig?.multiSeries?.dataSeries) || []

    if (dataSeries.length > 0 && Object.keys(dataMemo).length > 0) {
      setShow(true)
      const datakeys = Object.keys(dataMemo),
        seriseLen = dataSeries.length
      let findSeries: any = null
      if (otherProps.globalConfig?.singleSeries) {
        findSeries = dataSeries.find(ser => data.find(da => ser?.map?.fieldName && da.category === ser?.map?.fieldName))
      } else {
        findSeries = dataSeries.find(ser => datakeys.find(da => da === ser?.map?.fieldName))
      }

      if (!findSeries) {
        const _arr = otherProps.globalConfig?.singleSeries ? data : datakeys
        return _arr.map((_, i) => dataSeries[i % seriseLen].color)
      } else {
        if (otherProps.globalConfig?.singleSeries) {
          return data.map(da => {
            const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName && ser?.map?.fieldName === da.category)
            const _len = _findSeries.length
            return _len ? _findSeries[_len - 1].color : dataSeries[seriseLen - 1].color
          })
        }
        return datakeys.map(v => {
          const _findSeries = dataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1].color : dataSeries[seriseLen - 1].color
        })
      }
    } else {
      setShow(false)
      return []
    }
  }, [JSON.stringify(seriesConfig), otherProps.globalConfig?.singleSeries, JSON.stringify(dataMemo)])

  useEffect(() => {
    if (wrapper.current && show) {
      if (!chartCase.current) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
      }
    } else {
      chartCase.current?.dispose && chartCase.current.dispose()
      setChart(null)
    }
    return () => {
      chartCase.current?.dispose && chartCase.current.dispose()
      setChart(null)
    }
  }, [show])

  // 图表尺寸改变图表自适应
  useEffect(() => {
    chartCase.current && chartCase.current.resize({ w, h })
  }, [w, h, chartCase.current])

  //处理事件
  function handleEvent(type, params) {
    if (type === 'click' && params?.data?.ids) {
      const dataSeries =
          (otherProps.globalConfig?.singleSeries
            ? seriesConfig?.signSeries?.dataSeries
            : seriesConfig?.multiSeries?.dataSeries) || [],
        findData: any = Object.values(dataMemo)
          .flat(1)
          .find((v: any) => v._ids === params?.data?.ids),
        param = { ...findData },
        seriesName = params.seriesName || ''

      param.category = params.data.name
      param.value = params.value[0]

      if (otherProps.globalConfig?.singleSeries) {
        const findDataSeries = [...dataSeries]
          .reverse()
          .find(v => v.map?.displayName && v.map?.fieldName === params.value[1])
        otherProps.seriesConfig?.signSeries?.name && (param.seriesTitle = otherProps.seriesConfig?.signSeries?.name)
        findDataSeries && (param.categoryTitle = findDataSeries?.map?.displayName)
      } else {
        param.series = params.seriesName
        const findDataSeries = [...dataSeries]
          .reverse()
          .find(v => v.map?.displayName && v.map?.fieldName === seriesName)
        findDataSeries && (param.seriesTitle = findDataSeries?.map?.displayName)
      }
      onClick && onClick(param)
    }
  }

  useEffect(() => {
    if (chartCase.current?.myChart) {
      chartCase.current.setEvents('click', handleEvent)
    }
  }, [chartCase.current, JSON.stringify(dataMemo), JSON.stringify(seriesConfig)])

  // 更新全局配置
  useEffect(() => {
    if (chartCase.current?.myChart && show) {
      timer.current && clearTimeout(timer.current)
      timer.current = setTimeout(() => chartCase.current?.setConfig(props, dataMemo, colorMemo), 100)
    }
  }, [chartCase.current, show, JSON.stringify(otherProps), JSON.stringify(colorMemo)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
