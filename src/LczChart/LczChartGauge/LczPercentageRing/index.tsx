import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData } from '../../../common/util'
import { CreateChart } from './common/createChart'
import { PercentageRingProps } from './type'

export default memo(function LczTestTube(props: PercentageRingProps) {
  const { w = 0, h = 0, data = [], onClick, ...otherProps } = props
  const { gaugeConfig } = otherProps
  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const preChartCase = useRef<any>(null)

  const valueMemo = useMemo(() => {
    if (!data.length) {
      return { value: 0, nullData: true }
    } else {
      const _conversionData = conversionData(data, {
        item: 'string',
        itemTitle: 'string'
      })
      const val = _conversionData?.[0]?.value
      return isNaN(val)
        ? { ..._conversionData[0], value: 0, nullData: false }
        : { ..._conversionData[0], value: +val, nullData: false }
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
  }, [otherProps.gaugeConfig.progressStyle.clockwise, otherProps.gaugeConfig.progressStyle.roundCap])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.resize({ w, h })
    }
  }, [w, h, chartCase])

  function handleEvent(params, type) {
    if (type === 'click' && params) {
      if (gaugeConfig.gaugeName) {
        onClick && onClick({ ...valueMemo, itemTitle: gaugeConfig.gaugeName })
      } else {
        onClick && onClick(valueMemo)
      }
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, valueMemo, gaugeConfig.gaugeName])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setConfig(props, valueMemo)
    }
  }, [w, h, chartCase, valueMemo, JSON.stringify(otherProps)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
