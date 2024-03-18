/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions, getStackArray, getValueColor } from '../../../common'
import { mLegendIcon } from '../../../common/material'
import { getDecoratePosition, getUsableSvgPath, machiningSvgPath } from '../../../common/utils'
import {
  GlobalConfig,
  BarStyle,
  BasicBarProps,
  HighlightSeries,
  SeriesConfig,
  ValueLabel,
  DataSeries,
  CarouselAnimation
} from '../type'
import { defaultGlobal, defaultHighlightSeries } from './defaultValue'

// 生成全局options
export function getGlobalOptions(config: GlobalConfig) {
  const { bgColor, margin } = config
  return {
    grid: {
      left: margin?.l,
      bottom: margin?.b,
      right: margin?.r,
      top: margin?.t,
      containLabel: true
    },
    backgroundColor: bgColor
  }
}

function getSeriesData(data, highlightSeries: HighlightSeries) {
  const values = data.map(v => v.value)
  const min = Math.min(...values)
  const max = Math.max(...values)

  const _data = data.map((v: any) => {
    const _data: any = {
      name: v.category,
      value: [v.category, v.value],
      ids: v._ids,
      itemStyle: {}
    }

    if (highlightSeries.display) {
      const c = getEchartColor(highlightSeries.color)
      highlightSeries.extremum === 'min' && v.value === min && (_data.itemStyle.color = c)
      highlightSeries.extremum === 'max' && v.value === max && (_data.itemStyle.color = c)
    }

    return _data
  })
  return _data
}

export const getBarSeriesOptions = (
  config: BasicBarProps,
  dataMemo: any,
  styledsMemo: DataSeries[],
  { isStack }: { isStack?: boolean }
) => {
  const options: any = {
    series: []
  }
  let i = 0

  const normalBarStyle = config.globalConfig?.barStyle || (defaultGlobal.barStyle as BarStyle), //柱状样式
    valueLabel = config.globalConfig?.valueLabel || (defaultGlobal.valueLabel as ValueLabel), // 数值标签
    dataAnimate = config.globalConfig?.dataAnimate || false,
    {
      markSeries = [],
      markPointSeries = [],
      highlightSeries = defaultHighlightSeries,
      stackSeries = [],
      decorateDisplay = false,
      decorate
    } = (config.seriesConfig || {}) as SeriesConfig,
    dataLen = Object.keys(dataMemo).length

  // 标线
  const markLine = getMarkLineOptions(markSeries)
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries)
  //堆叠
  const stackObj = getStackArray(dataMemo, stackSeries)

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        styled = styledsMemo[i] || {},
        _data = getSeriesData(item, highlightSeries),
        color = getEchartColor(styled.color),
        useSeriesColors = typeof color === 'string',
        seriesColor = getValueColor(color, useSeriesColors),
        barStyle = styled?.barStyle?.display ? styled?.barStyle : normalBarStyle,
        radiuObj = {
          bullet: [9999999, 9999999, 0, 0],
          square: [0, 0, 0, 0],
          custom: [barStyle.fillet?.lt, barStyle.fillet?.rt, barStyle.fillet?.rb, barStyle.fillet?.lb]
        }

      const _series: any = {
        type: 'bar',
        name: key === '_none' ? '' : key,
        stack: isStack ? stackObj[key] : '',
        itemStyle: {
          borderRadius: radiuObj[barStyle.barType],
          color
        },
        barGap: `${isStack ? '50' : normalBarStyle.bargap}%`,
        showBackground: false,
        backgroundStyle: {
          color: 'transparent',
          opacity: 1
        },
        markLine,
        markPoint,
        animation: dataAnimate,
        data: _data
      }

      normalBarStyle.barCategoryGap !== undefined && (_series.barCategoryGap = `${normalBarStyle.barCategoryGap}%`)
      normalBarStyle.barWidth !== undefined && (_series.barWidth = normalBarStyle.barWidth)

      if (barStyle.barBgColor?.display) {
        _series.showBackground = true
        _series.backgroundStyle = {
          color: barStyle.barBgColor.color,
          opacity: barStyle.barBgColor.opacity / 100
        }

        if (barStyle.barBgColor?.syncRadius !== undefined) {
          barStyle.barBgColor?.syncRadius
            ? (_series.backgroundStyle.borderRadius = radiuObj[barStyle.barType])
            : (_series.backgroundStyle.borderRadius = [
                barStyle.barBgColor?.fillet?.lt,
                barStyle.barBgColor?.fillet?.rt,
                barStyle.barBgColor?.fillet?.rb,
                barStyle.barBgColor?.fillet?.lb
              ])
        }
      }

      if (valueLabel.display) {
        _series.label = {
          show: true,
          fontFamily: valueLabel.valueStyle?.fontFamily,
          color: valueLabel.valueStyle?.syncValueColor ? seriesColor : valueLabel.valueStyle?.color,
          fontSize: valueLabel.valueStyle?.fontSize,
          fontWeight: valueLabel.valueStyle?.fontWeight,
          offset: [valueLabel.valueStyle?.xOffset, valueLabel.valueStyle?.yOffset],
          rotate: valueLabel.valueStyle?.rotate,
          position: valueLabel.position,
          formatter: params => {
            const val = params.value[1]
            return numberForMat(val, valueLabel.valueStyle?.format)
          }
        }
      } else {
        _series.label = {
          show: false
        }
      }

      if (decorateDisplay) {
        const { decIconConfig, iconSize, position } = decorate || {}
        const x = getDecoratePosition(dataLen, i, {
          barWidth: normalBarStyle.barWidth || 0,
          barGap: (normalBarStyle.bargap || 0) / 100
        })

        const decorateSeries: any = {
          type: 'pictorialBar',
          name: 'pictorialBar',
          z: 3,
          data: _data,
          barGap: '-100%',
          silent: true,
          symbolPosition: position?.place,
          symbolSize: [iconSize?.width, iconSize?.height],
          symbolOffset: [x, position?.offset],
          itemStyle: {
            color
          },
          tooltip: { show: false }
        }

        switch (decIconConfig?.iconType) {
          case 'system': {
            const systemicon = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']
            decorateSeries.symbol = systemicon.includes(decIconConfig?.systemStyle || 'rect')
              ? decIconConfig?.systemStyle
              : machiningSvgPath(mLegendIcon[decIconConfig?.systemStyle || ''])
            break
          }
          case 'custom': {
            decorateSeries.symbol = `image://${decIconConfig?.customUrl}`
            break
          }
          case 'svg': {
            decorateSeries.symbol = getUsableSvgPath(decIconConfig?.svgPath)
            break
          }
        }

        options.series.push(decorateSeries)

        // symbol
      }

      options.series.push(_series)
    }
    i++
  }

  return options
}

export function getBarDataZommOptions(carouselAnimation: CarouselAnimation, chartType: string) {
  if (chartType == 'stackBar' || !carouselAnimation.display) return {}
  const options = {
    dataZoom: [
      {
        id: 'dataZoomY',
        disabled: true,
        type: 'inside',
        show: false,
        startValue: 0,
        endValue: (carouselAnimation.showNumer || 6) - 1
      }
    ]
  }
  return options
}
