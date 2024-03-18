import React, { memo, useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react'
import LczComCon from '../../../common/LczComCon'
import { conversionData } from '../../../common/util'
import { getDataSeriesStyle } from '../../common/utils'
import { activePie } from './common'
import { CreateChart } from './common/createChart'
import {
  defaultGlobal,
  defaultLegendConfig,
  defaultPieChartProper,
  defaultCurrentValue,
  defaultRotateAnimation
} from './common/defaultValue'
import Label from './components/Label'
import { Lcz3dTorusprops, PieConfig } from './type'

export default memo(function Lcz3dTorus(props: Lcz3dTorusprops) {
  const {
    w = 600,
    h = 400,
    data = [],
    globalConfig = defaultGlobal,
    pieChartProper = defaultPieChartProper,
    series = {},
    rotateAnimation = defaultRotateAnimation,
    onClick,
    onChange
  } = props
  const { cameraSettings, bgColor, margin, sort = 'normal', legendConfig = defaultLegendConfig } = globalConfig
  const {
    pieConfig = defaultPieChartProper.pieConfig as PieConfig,
    currentValue = defaultCurrentValue
  } = pieChartProper

  const { dataSeries = [] } = series
  const { animateDis = true, current, interval = 3, interactionMode = 'none' } = rotateAnimation

  const wrapper = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const [chartCase, setChart] = useState<CreateChart>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(-1)
  const [legendselect, setLegendSelect] = useState<any>(null)
  const [show, setShow] = useState<boolean>(true)
  const preIndex = useRef<number>(-2)
  const timer = useRef<any>(null)
  const mouseStatus = useRef<boolean>(false)

  const dataMemo = useMemo(() => {
    const _conversionData = conversionData(data, { item: 'string', itemTitle: 'string', value: 'number' })

    setCurrentIndex(-1)
    let _data = [..._conversionData]
      .map(v => ({ ...v, value: isNaN(+v.value) ? 0 : +v.value }))
      .filter(v => v.value > 0)
    switch (sort) {
      case 'normal':
        break
      case 'diminishing': {
        _data = _data.sort((a, b) => Number(b.value) - Number(a.value))
        break
      }
      case 'increasing': {
        _data = _data.sort((a, b) => Number(a.value) - Number(b.value))
        break
      }
      default:
        break
    }

    return _data
  }, [JSON.stringify(data), sort])

  const colors = useMemo(() => {
    if (dataSeries.length > 0 && dataMemo.length > 0) {
      setShow(true)
      return getDataSeriesStyle(dataMemo, dataSeries).map(v => v.color)
    } else {
      setShow(false)
    }
    return ['#5585ec', '#00EA9C', '#F9CE16', '#FF913F', '#00FFF8']
  }, [JSON.stringify(dataSeries), JSON.stringify(dataMemo)])

  // 图表初始化
  useEffect(() => {
    if (wrapper.current && show) {
      const chart = new CreateChart({ wrapper: wrapper.current, width: w, height: h })
      setChart(chart)
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

  // 图表设置全局属性
  useLayoutEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setGlobalConfig(globalConfig, colors)
    }
  }, [chartCase, bgColor, JSON.stringify(cameraSettings), JSON.stringify(margin), JSON.stringify(colors)])

  // 图表设置 3d 饼图属性
  useLayoutEffect(() => {
    if (chartCase?.myChart) {
      chartCase.updataPie(pieConfig, dataMemo)
    }
  }, [chartCase, JSON.stringify(colors), JSON.stringify(dataMemo), JSON.stringify(pieConfig)])

  // 图例
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setLegend(legendConfig, dataMemo, dataSeries, colors)
    }
  }, [chartCase, JSON.stringify(legendConfig), JSON.stringify(colors), JSON.stringify(dataSeries), JSON.stringify(dataMemo)])

  //处理事件 让图标获取激活状态
  function myChartEvent(this, type, params) {
    const seriesIndex = params.seriesIndex
    if (seriesIndex >= data.length) return
    type !== 'none' && timer.current && clearTimeout(timer.current)
    type === 'click' && startRatio()
    mouseStatus.current = type === 'mouseover'

    const eventParam = JSON.parse(JSON.stringify(data[seriesIndex]))
    const findSeries = [...dataSeries].reverse().find(s => s.map?.fieldName === eventParam.item)
    findSeries && findSeries.map?.displayName && (eventParam.item = findSeries.map?.displayName)

    if (type === 'click' || type === 'none') onClick && onClick(eventParam)
    if (seriesIndex >= dataMemo.length || seriesIndex === preIndex.current) return
    if (type === 'click' || type === 'mouseover') {
      seriesIndex >= 0 && seriesIndex !== currentIndex && onChange && onChange(eventParam)
      setCurrentIndex(seriesIndex)
      let options: any = this.getOption()
      options = activePie(dataMemo, options, pieConfig, seriesIndex, current)
      this.setOption(options)
      preIndex.current = seriesIndex
    }
  }

  // 图例切换时通知轮询更新
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents('legendselectchanged', params => setLegendSelect(params))
    }
  }, [chartCase, JSON.stringify(dataMemo), interactionMode, currentIndex, JSON.stringify(current)])

  // 设置图表事件
  useEffect(() => {
    if (chartCase?.myChart) {
      chartCase.setEvents(interactionMode, myChartEvent)
    }
  }, [chartCase, JSON.stringify(dataMemo), currentIndex])

  // 处理轮播
  useEffect(() => {
    timer.current && clearTimeout(timer.current)
    if (chartCase?.myChart && dataMemo.length) {
      if (currentIndex !== preIndex.current && currentIndex >= 0) {
        const eventParam = JSON.parse(JSON.stringify(data[currentIndex]))
        const findSeries = [...dataSeries].reverse().find(s => s.map?.fieldName === eventParam?.item)
        findSeries && findSeries.map?.displayName && (eventParam.item = findSeries.map?.displayName)
        onChange && onChange(eventParam)
      }

      animateDis && startRatio()
    }
    return () => {
      timer.current && clearInterval(timer.current)
    }
  }, [JSON.stringify(props), chartCase, currentIndex, JSON.stringify(legendselect), JSON.stringify(colors)])

  function startRatio() {
    timer.current && clearTimeout(timer.current)
    if (dataMemo.length <= 0 || !animateDis || mouseStatus.current) return
    let options: any = chartCase.myChart.getOption()
    const _interval = interval < 1 ? 1 : interval
    timer.current = setTimeout(() => {
      setCurrentIndex(i => {
        preIndex.current = i
        if (i < dataMemo.length - 1) {
          options = activePie(dataMemo, options, pieConfig, i + 1, current)
          return i + 1
        } else {
          options = activePie(dataMemo, options, pieConfig, 0, current)
          return 0
        }
      })
      chartCase.myChart.setOption(options)
    }, _interval * 1000)
  }

  function wrapperMouseLeave() {
    if (interactionMode !== 'mouseover') return false
    mouseStatus.current = false
    startRatio()
  }

  return (
    <LczComCon>
      <div className='lcz-pie-3d-torus-wrapper' style={{ width: w, height: h }}>
        <div ref={wrapper} style={{ width: w, height: h }} onMouseLeave={wrapperMouseLeave} />
        {show && currentValue.display && currentIndex >= 0 && (
          <Label
            data={dataMemo}
            index={currentIndex}
            currentValue={currentValue}
            colors={colors}
            dataSeries={dataSeries}
          />
        )}
      </div>
    </LczComCon>
  )
})
