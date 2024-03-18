import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { numberForMat } from '../../../LczCarouselTable/common'
import { GeneralNumberFormat } from '../../common/type'
import { CreateChart } from './common/createChart'
import { TestTubeProps } from './type'

export default memo(function LczTestTube(props: TestTubeProps) {
  const { w = 0, h = 0, data = [], onClick, ...otherProps } = props
  const labelformat = (otherProps.seriesConfig?.indicator?.labelStyle?.format || {}) as GeneralNumberFormat

  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const wrapper = useRef<HTMLDivElement>(null)

  const valueMemo = useMemo(() => {
    if (data.length) {
      const val = data?.[0]?.value
      return { tubeValue: isNaN(val) ? 0 : +val, nullData: false }
    } else {
      return { tubeValue: 0, nullData: true }
    }
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (wrapper.current) {
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
  }, [])

  useEffect(() => {
    if (chartCase) {
      chartCase.resize({ w, h })
    }
  }, [w, h])

  function handleEvent(params, type) {
    if (
      type === 'click' &&
      params &&
      (params.seriesName === 'main' || params.seriesName === '圆' || params.seriesName === '内圆')
    ) {
      const param = { value: valueMemo.tubeValue }

      if (labelformat.display) {
        labelformat.percentage && (param.value = param.value / 100)
        param.value = numberForMat(param.value, labelformat)
      }
      onClick && onClick(param)
    }
  }

  // 处理事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, valueMemo, JSON.stringify(labelformat)])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setConfig(props, valueMemo, { w, h })
    }
  }, [w, h, chartCase, valueMemo, JSON.stringify(otherProps)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
