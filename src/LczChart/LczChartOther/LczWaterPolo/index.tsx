import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { numberForMat } from '../../../LczCarouselTable/common'
import { CreateChart } from './common/createChart'
import { WaterPoloProps } from './type'

export default memo(function LczWaterPolo(props: WaterPoloProps) {
  const { w = 480, h = 288, data = [], onClick, ...otherProps } = props

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const preChartCase = useRef<any>(null)

  const valueMemo = useMemo(() => {
    if (data.length) {
      const val = data?.[0]?.value
      return { waterValue: isNaN(val) ? 0 : +val, nullData: false }
    } else {
      return { waterValue: 0, nullData: true }
    }
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (wrapper.current) {
      if (!preChartCase.current) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        preChartCase.current = chart
        setChart(chart)
      }
    } else {
      chartCase?.dispose && chartCase.dispose()
      preChartCase.current = null
      // @ts-ignore
      setChart(null)
    }

    return () => {
      preChartCase.current?.dispose && preChartCase.current.dispose()
      preChartCase.current = null
      // @ts-ignore
      setChart(null)
    }
  }, [JSON.stringify(props.waterPoloDiagram?.waveStyle?.shadow)])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.resize({ w, h })
    }
  }, [w, h])

  function handleEvent(params, type) {
    if (type === 'click' && params.componentType === 'series') {
      const format = otherProps.indexConfig?.textStyle?.format
      const val = numberForMat(valueMemo.waterValue, {
        display: format?.display || false,
        decollate: false,
        decimal: format?.decimal || 0,
        round: format?.round || false,
        percentage: format?.percentage || false,
        negativeing: format?.negativeing || 'minus'
      })
      onClick && onClick({ value: val })
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, valueMemo, JSON.stringify(otherProps.indexConfig?.textStyle?.format)])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setConfig(props, valueMemo)
    }
  }, [chartCase, valueMemo, JSON.stringify(otherProps)])

  return (
    <LczComCon>
      <div style={{ width: w, height: h }} ref={wrapper} />
    </LczComCon>
  )
})
