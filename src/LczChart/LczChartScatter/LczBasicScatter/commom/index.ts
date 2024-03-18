import { getSize } from '../../../../common/util'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions } from '../../../common'
import { mSort } from '../../../common/utils'
import {
  BubbleConfig,
  BubbleStyle,
  ContinuityConfig,
  DataMap,
  ScatterGlobalConfig,
  ScatterProps,
  ScattrsStyle,
  SeriesConfig
} from '../type'

export const getGlobalOptions = (config: ScatterGlobalConfig) => {
  const { bgColor, margin, dataZoom } = config

  const options: any = {
    grid: {
      left: margin?.l,
      bottom: margin?.b,
      right: margin?.r,
      top: margin?.t,
      containLabel: true
    },
    backgroundColor: bgColor
  }
  if (dataZoom?.display) {
    options.dataZoom = {
      type: 'inside',
      xAxisIndex: dataZoom.x ? [0] : [],
      yAxisIndex: dataZoom.y ? [0] : []
    }
  }
  return options
}

const getSeriesData = (data: DataMap[]) => {
  const _data = data.map((item: DataMap) => [item.x, item.y, item?.value, item])
  return _data
}

export const getSeries = (
  config: ScatterProps,
  dataMemo: any,
  styles: ScattrsStyle[] | BubbleStyle[],
  { chartType }: { chartType: 'bubble' | 'scatter' }
) => {
  const options: any = {
    series: []
  }
  const dataAnimate = config.globalConfig?.dataAnimate || false
  const { highlight, markSeries = [], markPointSeries = [] } = (config.seriesConfig || {}) as SeriesConfig

  let i = 0
  // 标线
  const markLine = getMarkLineOptions(markSeries, { chartType: 'scatter' })
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries)

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        _data = getSeriesData(item),
        style = styles[i]

      const _series: any = {
        type: 'scatter',
        name: key === '_none' ? '' : key,
        itemStyle: {
          shadowBlur: style.shadow?.shadowBlur,
          shadowColor: style.shadow?.shadowColor,
          shadowOffsetX: style.shadow?.shadowOffsetX,
          shadowOffsetY: style.shadow?.shadowOffsetY
        },
        emphasis: {
          scale: highlight?.scale,
          focus: highlight?.focus
        },
        markLine,
        markPoint,
        animation: dataAnimate,
        data: _data
      }

      if (style.border?.display) {
        _series.itemStyle.borderColor = style.border.borderColor
        _series.itemStyle.borderWidth = style.border.borderWidth
        _series.itemStyle.borderType = style.border.borderType
      }

      if (chartType === 'scatter') {
        const _style = style as ScattrsStyle
        _series.symbolSize = _style.symbolSize
        _series.itemStyle.color = getEchartColor(_style.color)
      } else if (chartType === 'bubble') {
        const _style = (style as BubbleStyle).style
        _series.itemStyle.color = getEchartColor(_style?.color)

        if (config.seriesConfig?.bubbleConfig?.styleMode === 'none') {
          const valArr = item.map(v => v.value),
            dataRange = {
              min: Math.min(...valArr),
              max: Math.max(...valArr)
            },
            size = {
              min: _style?.minSize || 0,
              max: _style?.maxSize || 0
            }

          _series.symbolSize = data => {
            const val = data ? data[2] : 0
            return getSize(dataRange, size, val)
          }
        }
      }

      options.series.push(_series)
    }

    i += 1
  }

  return options
}

//处理气泡图 连续映射、分段映射
export const getBubbleVisualMapStyle = (config: BubbleConfig) => {
  const { styleMode, continuityConfig, subsectionConfig = [] } = config,
    options: any = {
      visualMap: {}
    }

  function isNull(value) {
    return isNaN(value) || value === null
  }

  switch (styleMode) {
    case 'continuity': {
      const {
        maxValue = 100,
        minValue = 0,
        maxSize = 40,
        minSize = 4,
        color = [],
        colorLightnessMin = NaN,
        colorLightnessMax = NaN,
        colorSaturationMin = NaN,
        colorSaturationMax = NaN
      } = (continuityConfig || {}) as ContinuityConfig
      options.visualMap = {
        show: false,
        type: 'continuous',
        min: minValue,
        max: maxValue,
        dimension: 2,
        inRange: {
          symbolSize: mSort([minSize, maxSize])
        }
      }

      if (color.length > 0) {
        options.visualMap.inRange.color = color.map(v => v.value)
      }

      if (
        (isNull(colorLightnessMin) && !isNull(colorLightnessMax)) ||
        (!isNull(colorLightnessMin) && isNull(colorLightnessMax))
      ) {
        options.visualMap.inRange.colorLightness = (colorLightnessMin || colorLightnessMax || 0) / 100
      } else if (!isNull(colorLightnessMin) && !isNull(colorLightnessMax)) {
        options.visualMap.inRange.colorLightness = mSort([colorLightnessMin / 100, colorLightnessMax / 100])
      } else {
        delete options.visualMap.inRange['colorLightness']
      }

      if (
        (isNull(colorSaturationMin) && !isNull(colorSaturationMax)) ||
        (!isNull(colorSaturationMin) && isNull(colorSaturationMax))
      ) {
        options.visualMap.inRange.colorSaturation = (colorSaturationMin || colorSaturationMax || 0) / 100
      } else if (!isNull(colorSaturationMax) && !isNull(colorSaturationMin)) {
        options.visualMap.inRange.colorSaturation = mSort([colorSaturationMin / 100, colorSaturationMax / 100])
      } else {
        delete options.visualMap.inRange['colorSaturation']
      }

      break
    }
    case 'subsection': {
      options.visualMap = {
        show: false,
        type: 'piecewise',
        dimension: 2,
        pieces: []
      }

      subsectionConfig.forEach(item => {
        const {
            maxValue = 20,
            minValue = 0,
            symbolSize = 5,
            syncColor = true,
            color = '#3D99FC',
            colorLightness = NaN,
            colorSaturation = NaN
          } = item,
          pieces: any = { min: minValue, max: maxValue, symbolSize: symbolSize }

        if (!syncColor) pieces.color = getEchartColor(color)
        if (!isNull(colorLightness)) pieces.colorLightness = colorLightness / 100
        if (!isNull(colorSaturation)) pieces.colorSaturation = colorSaturation / 100
        options.visualMap.pieces.push(pieces)
      })
      break
    }
    default:
      break
  }
  return options
}
