import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData } from '../../../common/util'
import { GeneralPieDataMap } from '../../common/type'
import { getDataSeriesStyle } from '../../common/utils'
import { CreateChart } from './common/createChart'
import { DataSeries, WordCloudProps } from './type'

export default memo(function LczWordCloud(props: WordCloudProps) {
  const { w = 480, h = 288, data = [], onClick, ...otherProps } = props
  const datSeries = otherProps.seriesConfig?.dataSeries || []

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [show, setShow] = useState(true)
  const wrapper = useRef<HTMLDivElement>(null)

  const dataMemo = useMemo(() => {
    const _data: GeneralPieDataMap[] = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })
    return _data
  }, [JSON.stringify(data)])

  const stylesMemo: DataSeries[] = useMemo(() => {
    if (datSeries.length > 0 && data.length > 0) {
      setShow(true)
      return getDataSeriesStyle(dataMemo, datSeries)
    } else {
      setShow(false)
      return []
    }
  }, [JSON.stringify(data), JSON.stringify(datSeries)])

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

  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setConfig(props, dataMemo, stylesMemo)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(otherProps), show])

  function handleEvent(param) {
    if (param) {
      const eventParam = param.data.other
      onClick && onClick(eventParam)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart && show) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), JSON.stringify(datSeries), show])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
