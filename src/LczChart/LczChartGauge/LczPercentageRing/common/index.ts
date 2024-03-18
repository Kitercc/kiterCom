/* eslint-disable indent */

import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { generalShadowStyle } from '../../../common/generalValue'
import { GaugeConfig, IndicatorConfig, PercentageRingProps, ringDataMap, RingSubTitle, RingTitleConfig } from '../type'
import { defaultContour } from './defaultValue'

function getRingSection(extremum, dataMemo) {
  const { min, max } = extremum
  let minVal = isNaN(min?.value) ? 0 : +min.value
  let maxVal = isNaN(max?.value) ? dataMemo.value : +max.value
  minVal = Math.floor(minVal)
  maxVal = Math.floor(maxVal)
  return minVal > maxVal ? { min: maxVal, max: minVal } : { min: minVal, max: maxVal }
}

//生成polar
export const getPolarConfig = (margin: { x: number; y: number }, gaugeConfig: GaugeConfig) => {
  const { progressStyle } = gaugeConfig,
    options: any = { polar: {} }
  options.polar.radius = [`${progressStyle?.inRadius}%`, `${progressStyle?.outRadius}%`]
  options.polar.center = [`${margin?.x}%`, `${margin?.y}%`]

  return options
}

// 生成标题options
export const getRingTitleOptions = (config: RingTitleConfig, gaugeConfig: GaugeConfig, dataMemo: ringDataMap) => {
  const { gaugeName, extremumConfig = { max: { value: 100 }, min: { value: 0 } } } = gaugeConfig,
    { min, max } = getRingSection(extremumConfig, dataMemo)

  let option: any = { title: {} }
  const {
    display = true,
    mainContentType = 'value',
    mainValueReal = false,
    mainValueUnit = '',
    mainValueFormat,
    mainCustom = { value: '' },
    mainShadow = generalShadowStyle,
    subTitle = {} as RingSubTitle,
    speed = 10,
    xPosition = 'left',
    yPosition = 'top',
    xOffset = 0,
    yOffset = 0
  } = config
  if (display) {
    option.title.textStyle = {
      fontFamily: config.fontFamily,
      color: config.color,
      fontSize: config?.fontSize,
      fontWeight: config.fontWeight,
      textShadowBlur: mainShadow.shadowBlur,
      textShadowColor: mainShadow.shadowColor,
      textShadowOffsetX: mainShadow.shadowOffsetX,
      textShadowOffsetY: mainShadow.shadowOffsetY
    }
    option.title.show = true
    option.title.itemGap = speed
    switch (mainContentType) {
      case 'value':
        {
          let val = mainValueReal ? dataMemo.value : getValue(dataMemo.value, { min, max })
          if (mainValueFormat.display) {
            val = numberForMat(val, mainValueFormat)
          }
          option.title.text = mainValueReal ? val + mainValueUnit : val + '%'
        }
        break
      case 'custom':
        option.title.text = mainCustom.value
        break
      case 'seriesName':
        option.title.text = gaugeName || dataMemo.itemTitle || dataMemo.item || ''
        break
    }

    if (subTitle.display) {
      const {
        subContentType = 'value',
        subValueReal = false,
        subValueUnit = '',
        subValueFormat,
        subCustom = { value: '' },
        subShadow = generalShadowStyle
      } = subTitle
      option.title.subtextStyle = {
        fontFamily: subTitle.fontFamily,
        color: subTitle.color,
        fontSize: subTitle?.fontSize,
        fontWeight: subTitle.fontWeight,
        textShadowBlur: subShadow.shadowBlur,
        textShadowColor: subShadow.shadowColor,
        textShadowOffsetX: subShadow.shadowOffsetX,
        textShadowOffsetY: subShadow.shadowOffsetY
      }
      switch (subContentType) {
        case 'value':
          {
            let val = subValueReal ? dataMemo.value : getValue(dataMemo.value, { min, max })
            if (subValueFormat.display) {
              val = numberForMat(val, subValueFormat)
            }
            option.title.subtext = subValueReal ? val + subValueUnit : val + '%'
          }
          break
        case 'custom':
          option.title.subtext = subCustom.value
          break
        case 'seriesName':
          option.title.subtext = gaugeName || dataMemo.itemTitle || dataMemo.item || ''
          break
      }
    }
    xPosition !== 'auto' ? (option.title.left = xPosition) : (option.title.left = xOffset)
    yPosition !== 'auto' ? (option.title.top = yPosition) : (option.title.top = yOffset)
  } else {
    option = {
      title: {
        show: false
      }
    }
  }
  return option
}

//生成angleAxis
export const getRingAngleAxis = (gaugeConfig: GaugeConfig, chartType: 'ring' | 'trough') => {
  const { progressStyle, angleConfig = { angleStart: 225, angleCenter: 270 } } = gaugeConfig

  const options: any = {
    angleAxis: {
      show: false,
      min: 0,
      clockwise: gaugeConfig.progressStyle.clockwise,
      type: 'value'
    }
  }

  if (chartType == 'ring') {
    options.angleAxis.max = 100
    options.angleAxis.startAngle = progressStyle?.startAngle
  } else {
    options.angleAxis.max = (100 * 360) / angleConfig.angleCenter
    options.angleAxis.startAngle = angleConfig.angleStart
  }
  return options
}

function getBackgroundSeries(config: GaugeConfig, chartType: 'ring' | 'trough') {
  const { backgroundstyle } = config,
    { backgroundContour = defaultContour, backgroundShadow = generalShadowStyle } = backgroundstyle
  const series: any = {
    type: 'bar',
    data: [100],
    barGap: '-100%',
    coordinateSystem: 'polar',
    roundCap: true,
    z: 1,
    silent: true,
    animation: false,
    itemStyle: {
      shadowBlur: backgroundShadow.shadowBlur,
      shadowColor: backgroundShadow.shadowColor,
      shadowOffsetX: backgroundShadow.shadowOffsetX,
      shadowOffsetY: backgroundShadow.shadowOffsetY,
      borderColor: backgroundContour.color,
      borderWidth: backgroundContour.display ? backgroundContour.width : 0,
      borderType: backgroundContour.lineType,
      color: getEchartColor(backgroundstyle.color),
      opacity: backgroundstyle.display ? (backgroundstyle.opacity || 1) / 100 : 0
    }
  }

  if (chartType == 'ring') {
    series.showBackground = backgroundstyle.display
    series.backgroundStyle = {
      color: getEchartColor(backgroundstyle.color),
      opacity: backgroundstyle.display ? (backgroundstyle.opacity || 1) / 100 : 0
    }
  } else {
    series.showBackground = false
  }

  return series
}

function getIndicator(config: IndicatorConfig, { min, max, dataAnimate, dataMemo, color }) {
  if (!config) return
  const { outGarden, inGarden } = config

  const series: any = [
    {
      // 外圆
      name: dataMemo.item || '',
      type: 'graph',
      data: [getValue(dataMemo.value, { min, max })],
      symbolSize: outGarden?.symbolSize,
      silent: false,
      emphasis: {
        label: {
          show: false
        }
      },
      roundCap: true,
      showBackground: false,
      coordinateSystem: 'polar',
      itemStyle: {
        color: getEchartColor(outGarden?.color),
        opacity: outGarden.display ? (outGarden.opacity || 1) / 100 : 0,
        shadowBlur: outGarden.outGardenShadow.shadowBlur,
        shadowColor: outGarden.outGardenShadow.shadowColor,
        shadowOffsetX: outGarden.outGardenShadow.shadowOffsetX,
        shadowOffsetY: outGarden.outGardenShadow.shadowOffsetY
      },
      animation: dataAnimate,
      z: 3
    },
    {
      // 内圆
      name: dataMemo.item || '',
      type: 'graph',
      data: [getValue(dataMemo.value, { min, max })],
      silent: false,
      emphasis: {
        label: {
          show: false
        }
      },
      showBackground: false,
      coordinateSystem: 'polar',
      roundCap: true,
      symbolSize: inGarden?.symbolSize,
      itemStyle: {
        color: getEchartColor(inGarden?.color),
        opacity: inGarden.display ? (inGarden.opacity || 1) / 100 : 0
      },
      animation: dataAnimate,
      z: 4
    }
  ]

  if (outGarden?.outSyncColor) series[0].itemStyle.color = getEchartColor(color)
  if (inGarden?.inSyncColor) series[1].itemStyle.color = getEchartColor(color)
  return series
}

function getValue(value, { max, min }) {
  const data = value
  if (min === max && data < min) return 0
  if (min === max && data >= max) return 100
  if (data >= max) return 100
  if (data <= min) return 0
  return ((data - min) / (max - min)) * 100
}

//生成series
export const getRingSeries = (config: PercentageRingProps, dataMemo: ringDataMap, chartType: 'ring' | 'trough') => {
  const { extremumConfig = { max: { value: 100 }, min: { value: 0 } }, progressStyle } = config.gaugeConfig,
    { min, max } = getRingSection(extremumConfig, dataMemo),
    dataAnimate = config.globalConfig?.dataAnimate || false,
    { ProgressContour = defaultContour, ProgressShadow = generalShadowStyle } = progressStyle

  const bgSeries = getBackgroundSeries(config.gaugeConfig as GaugeConfig, chartType)

  // 指示器
  const indicatorSeries = getIndicator(config.indicatorConfig as IndicatorConfig, {
    min,
    max,
    dataAnimate,
    dataMemo,
    color: progressStyle.color
  })

  const options: any = {
    series: [
      { ...bgSeries },
      {
        name: dataMemo.item || '',
        type: 'bar',
        stack: 'percentageRing',
        data: [getValue(dataMemo.value, { min, max })],
        itemStyle: {
          color: getEchartColor(progressStyle.color),
          opacity: (progressStyle.opacity || 1) / 100,
          borderColor: ProgressContour.color,
          borderWidth: ProgressContour.display ? ProgressContour.width : 0,
          borderType: ProgressContour.lineType,
          shadowBlur: ProgressShadow.shadowBlur,
          shadowColor: ProgressShadow.shadowColor,
          shadowOffsetX: ProgressShadow.shadowOffsetX,
          shadowOffsetY: ProgressShadow.shadowOffsetY
        },
        roundCap: progressStyle.roundCap,
        barGap: '-100%', //柱间距离,上下两层圆环重合
        coordinateSystem: 'polar',
        animation: dataAnimate,
        z: 2
      }
    ]
  }

  if (indicatorSeries) {
    options.series.push(...indicatorSeries)
  }

  if (dataMemo.nullData) {
    options.series.splice(1)
  }
  return options
}
