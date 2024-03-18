/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { generalShadowStyle } from '../../../common/generalValue'
import { Company, GlobalConfig, Indicator, ScaleMark, SeriesConfig, TestTubeProps, TubeStyle } from '../type'

export const getGlobalOptions = (config: GlobalConfig, tubeStyle: TubeStyle, { w, h }) => {
  const { bgColor = 'rgba(0,0,0,0)', position = 'level', margin } = config,
    { levelBarWidth = 288, verticalBarHeight = 288 } = tubeStyle

  const options: any = {
    grid: {
      left: 40,
      bottom: 40,
      right: 40,
      top: 40
    },
    backgroundColor: bgColor
  }

  if (position === 'level') {
    const deep = (w - levelBarWidth) / 2
    options.grid.top = margin?.t
    options.grid.bottom = margin?.b
    options.grid.left = deep
    options.grid.right = deep
  } else {
    const deep = (h - verticalBarHeight) / 2
    options.grid.top = deep
    options.grid.bottom = deep
    options.grid.left = margin?.l
    options.grid.right = margin?.r
  }

  return options
}

function getArrange(config: TestTubeProps, { barWidth, w, h }) {
  type OBJ = {
    speed: number
    valLabelOr: 'left' | 'right' | 'top' | 'bottom'
  }
  const { margin = 10, levelOrientation = 'bottom', verticalOrientation = 'right' } = (config?.seriesConfig
      ?.scaleMark || {}) as ScaleMark,
    position = config.globalConfig?.position || 'level',
    obj: OBJ = { speed: 0, valLabelOr: 'top' },
    { t = 0, b = 0, r = 0, l = 0 } = config.globalConfig?.margin || {}
  obj.speed = margin + barWidth / 2

  switch (position) {
    case 'level': {
      const kd = (200 + 2) / (h - t - b)
      obj.valLabelOr = 'top'
      obj.speed = margin + (barWidth * kd) / 2
      if (levelOrientation === 'top') {
        ;(obj.speed = -obj.speed), (obj.valLabelOr = 'bottom')
      }
      break
    }
    case 'vertical': {
      const kd = (200 + 2) / (w - l - r)
      obj.valLabelOr = 'right'
      obj.speed = margin + (barWidth * kd) / 2
      if (verticalOrientation === 'right') {
        ;(obj.speed = -obj.speed), (obj.valLabelOr = 'left')
      }
      break
    }
  }
  return obj
}

function getSection(extremum, value) {
  const { min, max } = extremum
  let minVal = isNaN(min?.value) ? 0 : +min.value
  let maxVal = isNaN(max?.value) ? value : +max.value
  minVal = Math.floor(minVal)
  maxVal = Math.floor(maxVal)
  return minVal > maxVal ? { min: maxVal, max: minVal } : { min: minVal, max: maxVal }
}

// 获取刻度配置
function getkeduSeries(config: ScaleMark, { min, max, position, dataAnimate }) {
  const kd1: number[] = [],
    {
      display = true,
      opacity = 100,
      barWidth = 1,
      levelOrientation = 'bottom',
      verticalOrientation = 'right',
      suffix = '',
      subScaleLine,
      mainScaleLine,
      labelStyle
    } = config

  if (!display) return {}

  let subLen = subScaleLine?.len || 0
  let mainLen = mainScaleLine?.len || 0
  const subSpace = subScaleLine?.space || 1
  const mainSpace = mainScaleLine?.space || 1

  switch (position) {
    case 'level': {
      subLen = levelOrientation === 'bottom' ? -subLen : subLen
      mainLen = levelOrientation === 'bottom' ? -mainLen : mainLen
      break
    }
    case 'vertical': {
      subLen = verticalOrientation === 'left' ? -subLen : subLen
      mainLen = verticalOrientation === 'left' ? -mainLen : mainLen
      break
    }
  }

  for (let i = min, len = max; i <= len; i++) {
    const _data: any = {
      itemStyle: {}
    }
    if (i > len) {
      _data.value = 0
      kd1.push(_data)
    } else {
      if (i % mainSpace === 0) {
        _data.value = mainLen
        _data.itemStyle.color = mainScaleLine?.color
        kd1.push(_data)
        continue
      }

      if (i % subSpace === 0) {
        _data.value = subLen
        _data.itemStyle.color = subScaleLine?.color
        kd1.push(_data)
        continue
      }

      _data.value = 0
      kd1.push(_data)
    }
  }

  const series: any = {
    name: '刻度',
    type: 'bar',
    silent: true,
    xAxisIndex: 1,
    yAxisIndex: 1,

    label: {
      show: false
    },
    data: kd1,
    barWidth: barWidth,
    itemStyle: {
      opacity: opacity / 100,
      color: '#71767F',
      barBorderRadius: 10
    },
    z: 0,
    animation: dataAnimate
  }

  if (labelStyle?.display) {
    const {
      margin = 10,
      valSpeed = 20,
      fontFamily = 'PingFangSC-Regular',
      fontSize = 12,
      color = '#FFFFFF',
      opacity = 100,
      fontWeight = 'normal',
      shadow = generalShadowStyle,
      format
    } = labelStyle
    series.label = {
      show: true,
      position: position === 'level' ? levelOrientation : verticalOrientation,
      distance: margin,
      color,
      fontFamily,
      fontWeight,
      fontSize,
      opacity: opacity / 100,
      textShadowBlur: shadow.shadowBlur,
      textShadowColor: shadow.shadowColor,
      textShadowOffsetX: shadow.shadowOffsetX,
      textShadowOffsetY: shadow.shadowOffsetY,
      formatter: function (params) {
        let val: number | null = null
        if (params.dataIndex < valSpeed && params.dataIndex % valSpeed === 0) {
          val = params.dataIndex + min
        } else {
          if (params.dataIndex % valSpeed === 0) {
            val = params.dataIndex + min
          } else {
            val = null
          }
        }

        if (val !== null && format?.display) {
          format.percentage && (val = val / 100)
          return numberForMat(val, format) + suffix
        }
        if (val !== null) return val + suffix
        return ''
      }
    }
  } else {
    series.label = {
      show: false
    }
  }

  return series
}

// 获取指示器配置
function getIndicator(config: Indicator, { min, max, value, dataAnimate, color, arrange }) {
  const { display = true, outGarden, inGarden, labelStyle } = config,
    _datamin = value - min,
    _datamax = max - value,
    data = _datamin >= 0 && _datamax >= 0 ? _datamin : _datamin > 0 ? max - min : 0

  if (!display) return []
  const series: any = [
    {
      // 外圆
      name: '圆',
      type: 'scatter',
      hoverAnimation: false,
      data: [data],
      yAxisIndex: 0,
      symbolSize: outGarden?.symbolSize,
      silent: false,
      label: {
        show: false
      },
      itemStyle: {
        color: getEchartColor(outGarden?.color)
      },
      animation: dataAnimate,
      z: 2
    },
    {
      // 内圆
      name: '内圆',
      type: 'scatter',
      hoverAnimation: false,
      data: [data],
      yAxisIndex: 0,
      silent: false,
      symbolSize: inGarden?.symbolSize,
      itemStyle: {
        color: getEchartColor(inGarden?.color)
      },
      animation: dataAnimate,
      z: 3
    }
  ]

  if (outGarden?.outSyncColor) series[0].itemStyle.color = getEchartColor(color)
  if (inGarden?.inSyncColor) series[1].itemStyle.color = getEchartColor(color)

  if (labelStyle?.display) {
    const {
      suffix = '',
      distance = 12,
      fontFamily = 'DIN-Medium',
      fontSize = 20,
      color = '#28E3FF',
      opacity = 100,
      fontWeight = 'normal',
      shadow = generalShadowStyle,
      format
    } = labelStyle
    series[0].label = {
      show: true,
      position: arrange.valLabelOr,
      distance,
      fontFamily,
      color,
      fontWeight,
      fontSize,
      opacity: opacity / 100,
      textShadowBlur: shadow.shadowBlur,
      textShadowColor: shadow.shadowColor,
      textShadowOffsetX: shadow.shadowOffsetX,
      textShadowOffsetY: shadow.shadowOffsetY,
      formatter: () => {
        let val = value
        if (format?.display) {
          format.percentage && (val = val / 100)
          val = numberForMat(val, format)
        }
        return val + suffix
      }
    }
  } else {
    series[0].label = {
      show: false
    }
  }

  return series
}

// 获取底色配置
function getBackgroundSeries(config: Company, tubeStyle: TubeStyle, { min, max, dataAnimate, position }) {
  const {
      display = true,
      content = '',
      levelPosition = 'right',
      verticalPosition = 'top',
      xOffset = 20,
      yOffset = 0,
      fontFamily = 'DIN-Medium',
      fontSize = 14,
      color = '#D8E0E9',
      opacity = 100,
      fontWeight = 'normal',
      shadow = generalShadowStyle
    } = config,
    { levelBarHeight = 16, verticalBarWidth = 16, grooveColor } = tubeStyle,
    barWidth = position === 'level' ? levelBarHeight : verticalBarWidth,
    series: any = {
      name: '底色',
      type: 'bar',
      barWidth,
      silent: true,
      yAxisIndex: 0,
      label: {
        show: false
      },
      itemStyle: {
        normal: {
          color: getEchartColor(grooveColor),
          barBorderRadius: barWidth / 2
        }
      },
      barGap: '-100%',
      data: [max - min],
      animation: dataAnimate
    }

  if (display) {
    series.label = {
      show: true,
      position: position === 'level' ? levelPosition : verticalPosition,
      formatter: content,
      offset: [xOffset, yOffset],
      color,
      fontSize,
      fontFamily,
      fontWeight,
      opacity: opacity / 100,
      textShadowBlur: shadow.shadowBlur,
      textShadowColor: shadow.shadowColor,
      textShadowOffsetX: shadow.shadowOffsetX,
      textShadowOffsetY: shadow.shadowOffsetY
    }
  }

  return series
}

export const getSeries = (config: TestTubeProps, value: { tubeValue: number; nullData: boolean }, { w, h }) => {
  const { scaleMark, indicator, company, extremum, tubeStyle } = (config.seriesConfig || {}) as SeriesConfig,
    { levelBarHeight = 16, verticalBarWidth = 16, levelColor, verticalColor } = (tubeStyle || {}) as TubeStyle,
    dataAnimate = config.globalConfig?.dataAnimate || false,
    { tubeValue, nullData } = value,
    position = config.globalConfig?.position || 'level',
    { min, max } = getSection(extremum, tubeValue),
    barWidth = position === 'level' ? levelBarHeight : verticalBarWidth,
    color = position === 'level' ? levelColor : verticalColor,
    arrange = getArrange(config, { barWidth, w, h }) // 获取刻度 控制垂直或水平的属性

  function getAxis() {
    let obj: any = {}
    switch (position) {
      case 'level': {
        obj = {
          xAxis: [
            {
              show: false,
              min: 0,
              max: max - min
            },
            {
              show: false,
              data: [],
              min: 0,
              max: max - min
            }
          ],
          yAxis: [
            {
              show: false,
              data: [],
              min: -100,
              max: 100
            },
            {
              show: false,
              min: -100 + arrange.speed,
              max: 100 + arrange.speed
            }
          ]
        }

        break
      }
      case 'vertical': {
        obj = {
          xAxis: [
            {
              show: false,
              data: [],
              min: -100,
              max: 100
            },
            {
              show: false,
              min: -100 + arrange.speed,
              max: 100 + arrange.speed
            }
          ],
          yAxis: [
            {
              show: false,
              min: 0,
              max: max - min
            },
            {
              show: false,
              data: [],
              min: 0,
              max: max - min
            }
          ]
        }
        break
      }
    }
    return obj
  }

  // 刻度
  const keduSeries = getkeduSeries((scaleMark || {}) as ScaleMark, { min, max, position, dataAnimate })

  // 指示器
  const indicatorSeries = getIndicator((indicator || {}) as Indicator, {
    min,
    max,
    value: tubeValue,
    dataAnimate,
    color,
    arrange
  })

  // 底色
  const bgSeries = getBackgroundSeries((company || {}) as Company, (tubeStyle || {}) as TubeStyle, {
    min,
    max,
    dataAnimate,
    position
  })

  const val = tubeValue <= min ? min : tubeValue >= max ? max : tubeValue

  const options = {
    ...getAxis(),
    series: [
      //温度计底色
      { ...bgSeries },
      //温度计
      {
        name: 'main',
        type: 'bar',
        barWidth: barWidth,
        silent: false,
        yAxisIndex: 0,
        tooltip: {
          show: true
        },
        data: [
          {
            value: val - min,
            itemStyle: {
              normal: {
                barBorderRadius: barWidth / 2,
                color: getEchartColor(color)
              }
            }
          }
        ],
        animation: dataAnimate
      },
      // 指示器
      ...indicatorSeries,
      // 刻度
      { ...keduSeries }
    ]
  }

  if (nullData) {
    options.series.splice(1, 3)
  }

  return options
}
