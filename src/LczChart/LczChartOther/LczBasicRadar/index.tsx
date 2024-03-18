import React, { memo, useState, useMemo, useEffect, useRef } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmpty, isEmptyData, randomChar } from '../../../common/util'
import { GeneralRadarDataMap } from '../../common/type'
import { formatData } from '../../common/utils'
import { getIsNumber } from './common'
import { CreateChart } from './common/createChart'
import { LczBasicRadarProps, RadarSeriesConfig } from './type'

export default memo(function LczBasicRadar(props: LczBasicRadarProps) {
  const { w = 480, h = 288, data = [], onClick, ...otherProps } = props
  const { radarDataSeries = [] } = otherProps.seriesConfig as RadarSeriesConfig
  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)

  const dataMemo = useMemo(() => {
    const _conversionData = conversionData(data, {
      indicator: 'string',
      indicatorTitle: 'string',
      series: 'string',
      seriesTitle: 'string'
    })
    if (isEmptyData(_conversionData)) return []

    const _data = _conversionData.map(v => ({
      ...v,
      value: isNaN(v.value) ? 0 : Number(v.value),
      min: getIsNumber(v.min) ? Number(v.min) : null,
      max: getIsNumber(v.max) ? Number(v.max) : null,
      _ids: randomChar()
    }))
    const nSeries = _data.filter(v => !isEmpty(v.series))
    const hasSeries = _data.filter(v => isEmpty(v.series))
    const hasSeriesData = formatData(hasSeries, 'series')
    if (nSeries.length > 0) Object.assign(hasSeriesData, { _none: nSeries })

    return hasSeriesData
  }, [JSON.stringify(data)])

  const stylesMemo = useMemo(() => {
    if (radarDataSeries.length > 0 && Object.keys(dataMemo).length > 0) {
      setShow(true)
      const datakeys = Object.keys(dataMemo)
      const seriseLen = radarDataSeries.length
      const findSeries = radarDataSeries.find(ser => datakeys.find(da => da === ser?.map?.fieldName))
      if (!findSeries) {
        return datakeys.map((_, i) => radarDataSeries[i % seriseLen])
      } else {
        return datakeys.map(v => {
          const _findSeries = radarDataSeries.filter(ser => ser?.map?.fieldName === v)
          const _len = _findSeries.length
          return _len ? _findSeries[_len - 1] : radarDataSeries[seriseLen - 1]
        })
      }
    } else {
      setShow(false)
      return []
    }
  }, [JSON.stringify(dataMemo), JSON.stringify(radarDataSeries)])

  useEffect(() => {
    if (wrapper.current && show) {
      if (!chartCase) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        setChart(chart)
      }
    } else {
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
    return () => {
      chartCase?.dispose && chartCase.dispose()
      // @ts-ignore
      setChart(null)
    }
  }, [show])

  useEffect(() => {
    if (chartCase && show) {
      chartCase.resize({ w, h })
    }
  }, [w, h, show])

  function handleEvent(param) {
    if (param) {
      const params = { series: param.seriesName, seriesTitle: param.seriesName, value: (param.value || []).join(',') }
      let _name = param.seriesName || ''
      const findDataSeries = [...radarDataSeries].reverse().find(v => v.map?.fieldName === _name)
      if (findDataSeries && findDataSeries.map?.displayName) {
        _name = findDataSeries.map?.displayName
      } else {
        const findData = dataMemo[_name]?.find((v: GeneralRadarDataMap) => v.seriesTitle)
        findData && (_name = findData.seriesTitle)
      }
      params.seriesTitle = _name
      onClick && onClick(params)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(radarDataSeries)])

  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setConfig(props, dataMemo, stylesMemo)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(otherProps)])

  return (
    <LczComCon>
      <div style={{ width: w, height: h }} ref={wrapper} />
    </LczComCon>
  )
})
