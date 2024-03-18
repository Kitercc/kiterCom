import React, { memo, useMemo, CSSProperties } from 'react'
import LczPercentageRing from '../../LczChart/LczChartGauge/LczPercentageRing'
import { analysisExpression, numberIsEmpty } from '../../common/util'
import {
  DefaultRingtitleConfig,
  DefaultGaugeConfig,
  DefaultGlobalConfig
} from '../../LczChart/LczChartGauge/LczPercentageRing/common/defaultValue'
import type { PropChartTitleConfig, ProportionChartConfig } from '../type/child'
import type { PercentageRingProps } from '../../LczChart/LczChartGauge/LczPercentageRing/type'
import { cloneDeep } from 'lodash'

type ProportionChartProps = {
  value: number
  proportionChartConfig: ProportionChartConfig
  containData: any
  id: any
  expPathArr: string[]
}

const ProportionChart = memo((props: ProportionChartProps) => {
  const { value, proportionChartConfig, containData, id, expPathArr } = props,
    {
      chartWidth = 100,
      chartHeight = 100,
      margin = DefaultGlobalConfig.margin,
      propChartTitleConfig = DefaultRingtitleConfig as PropChartTitleConfig,
      extremumConfig,
      ringStyle = DefaultGaugeConfig.progressStyle,
      backgroundstyle = DefaultGaugeConfig.backgroundstyle,
      styleSeries = [],
      dataAnimate = true
    } = proportionChartConfig

  const curStyleSeries = useMemo(() => {
    return styleSeries.find((v, i) =>
      analysisExpression(v.condition, containData, id, {
        name: 'proportionChartConfig.styleSeries[].condition',
        pathArr: [...expPathArr, `styleSeries[${i}]`]
      })
    )
  }, [styleSeries, containData])

  const expVals = useMemo(() => {
    const { chartTitleCustom = '', mainValueUnit } = propChartTitleConfig,
      { min, max } = extremumConfig || {}
    const values = {
      curTitle: '',
      titleUnit: '',
      extremumMin: 0,
      extremumMax: 100
    }

    values.curTitle =
      '' +
      analysisExpression(chartTitleCustom, containData, id, {
        name: 'propChartTitleConfig.chartTitleCustom',
        pathArr: expPathArr
      })

    values.titleUnit =
      '' +
      analysisExpression(mainValueUnit, containData, id, {
        name: 'propChartTitleConfig.mainValueUnit',
        pathArr: expPathArr
      })

    values.extremumMin = analysisExpression(min, containData, id, {
      name: 'extremumConfig.min',
      pathArr: expPathArr
    })

    values.extremumMax = analysisExpression(max, containData, id, {
      name: 'extremumConfig.max',
      pathArr: expPathArr
    })

    return values
  }, [containData, propChartTitleConfig.chartTitleCustom, propChartTitleConfig.mainValueUnit, extremumConfig])

  const chartData = useMemo(() => {
    return [
      {
        item: '',
        itemTitle: '',
        value
      }
    ]
  }, [value])

  const chartProps = (() => {
    if (!numberIsEmpty(value)) return {} as PercentageRingProps
    const { curTitle, titleUnit, extremumMin, extremumMax } = expVals
    const chartProps: PercentageRingProps = {
      globalConfig: {
        backgroundColor: 'transparent',
        margin,
        dataAnimate,
        ringtitleConfig: cloneDeep(propChartTitleConfig)
      },
      gaugeConfig: {
        extremumConfig: {
          min: { value: extremumMin },
          max: { value: extremumMax }
        },
        progressStyle: cloneDeep(ringStyle),
        backgroundstyle: cloneDeep(backgroundstyle)
      }
    }

    if (chartProps.globalConfig.ringtitleConfig) {
      chartProps.globalConfig.ringtitleConfig.mainCustom = { value: curTitle }
      chartProps.globalConfig.ringtitleConfig.mainValueUnit = titleUnit
    }

    if (curStyleSeries) {
      const { titleStyle, ringStyle, backgroundstyle: seriesBgStyle } = curStyleSeries
      chartProps.globalConfig.ringtitleConfig && Object.assign(chartProps.globalConfig.ringtitleConfig, titleStyle)
      ringStyle &&
        Object.assign(chartProps.gaugeConfig.progressStyle, {
          color: ringStyle.color,
          ProgressContour: {
            display: ringStyle.strokeDisplay,
            color: ringStyle.strokeColor,
            lineType: ringStyle.strokeStyle,
            width: ringStyle.strokeWidth
          },
          ProgressShadow: {
            shadowOffsetX: ringStyle.shadowX,
            shadowOffsetY: ringStyle.shadowY,
            shadowBlur: ringStyle.shadowSize,
            shadowColor: ringStyle.shadowColor
          }
        })
      seriesBgStyle &&
        Object.assign(chartProps.gaugeConfig.backgroundstyle, {
          color: seriesBgStyle.color,
          backgroundContour: {
            display: seriesBgStyle.strokeDisplay,
            color: seriesBgStyle.strokeColor,
            lineType: seriesBgStyle.strokeStyle,
            width: seriesBgStyle.strokeWidth
          },
          backgroundShadow: {
            shadowOffsetX: seriesBgStyle.shadowX,
            shadowOffsetY: seriesBgStyle.shadowY,
            shadowBlur: seriesBgStyle.shadowSize,
            shadowColor: seriesBgStyle.shadowColor
          }
        })
    }

    return chartProps
  })()

  if (!numberIsEmpty(value)) {
    const { display, mainContentType = 'value', mainValueReal } = propChartTitleConfig
    if (!display) return null
    const titleStyle = (function () {
      const { fontFamily, fontSize, color, fontWeight, mainShadow } = propChartTitleConfig,
        { shadowBlur = 0, shadowColor = '', shadowOffsetX = 0, shadowOffsetY = 0 } = mainShadow || {}
      let style: CSSProperties = { fontFamily, fontSize, color, fontWeight }
      if (curStyleSeries?.titleStyle) {
        style = curStyleSeries.titleStyle
      }

      style.textShadow = `${shadowOffsetX}px ${shadowOffsetY}px ${shadowBlur}px ${shadowColor}`
      return style
    })()

    const title = mainContentType === 'value' ? value + (mainValueReal ? expVals.titleUnit : '') : expVals.curTitle

    return (
      <span className='proportions-chart-string' style={titleStyle}>
        {title}
      </span>
    )
  }

  return (
    <div className='chart-field' style={{ width: chartWidth, height: chartHeight }}>
      <LczPercentageRing w={chartWidth} h={chartHeight} data={chartData} {...chartProps} />
    </div>
  )
})

ProportionChart.displayName = 'ProportionChart'
export default ProportionChart
