import React, { memo, useRef, useEffect, useState, useMemo } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData, isEmptyData, randomChar } from '../../../common/util'
import { DifferenceGroup } from './commom'
import { CreateChart } from './commom/creatChart'
import { MechanicalBubbleProps } from './type'

export default memo(function LczMechanicalBubble(props: MechanicalBubbleProps) {
  const { w = 800, h = 600, data = [], onClick, ...otherProps } = props

  const wrapper = useRef<HTMLDivElement>(null)

  const [chartCase, setChart] = useState<CreateChart | null>(null),
    chartCaseRef = useRef<CreateChart | null>(null)

  const dataMemo = useMemo(() => {
    const _data = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })
    const filterData = DifferenceGroup(_data)
    const _isEmptyData = isEmptyData(filterData)
    if (_isEmptyData) return []
    return filterData.map(da => ({ ...da, value: isNaN(da.value) ? 0 : Number(da.value), _ids: randomChar() }))
  }, [JSON.stringify(data)])

  //初始挂载
  useEffect(() => {
    if (wrapper.current) {
      if (!chartCase) {
        const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
        chartCaseRef.current = chart
        setChart(chart)
      }
    }
    return () => {
      chartCaseRef.current && chartCaseRef.current.dispose()
      chartCaseRef.current = null
    }
  }, [])

  // 图表尺寸改变图表自适应
  useEffect(() => {
    chartCase && chartCase.resize({ w, h })
  }, [w, h, chartCase])

  function handleEvent(type, params) {
    if (type === 'click' && params?.data?.ids) {
      const { data } = params
      const param = {
        item: data.name,
        itemTitle: data.nameTitle,
        value: data.value
      }
      onClick && onClick(param)
    }
  }

  //处理事件

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('click', handleEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo)])

  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setConfig(props, dataMemo)
    }
  }, [chartCase, JSON.stringify(otherProps), JSON.stringify(dataMemo)])

  return (
    <LczComCon>
      <div ref={wrapper} style={{ width: w, height: h }} />
    </LczComCon>
  )
})
