/* eslint-disable indent */
import moment from 'moment'
import { abridgeDayName, dayName, formatStr } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions, getStackArray, getValueColor } from '../../../common'
import { mLegendIcon } from '../../../common/material'
import { GeneralSignSeriesDataMap, GeneralXAxis } from '../../../common/type'
import { getDecoratePosition, getUsableSvgPath, machiningSvgPath } from '../../../common/utils'
import { CarouselAnimation } from '../../LczBasicBar/type'
import {
  GlobalConfig,
  HighlightSeries,
  SeriesConfig,
  ValueLabel,
  BasicStripProps,
  StripStyle,
  StripDataSeries
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

function getSeriesData(
  data,
  highlightSeries: HighlightSeries,
  {
    styledsMemo,
    chartType = 'strip',
    valueLabel,
    decorate = false
  }: { styledsMemo: StripDataSeries[]; chartType: string; valueLabel: ValueLabel; decorate?: boolean }
) {
  const values = data.map(v => v.value)
  const min = Math.min(...values)
  const max = Math.max(...values)

  const _data = data.map((v: any, i: number) => {
    const _data: any = {
      name: v.category,
      value: [v.value, v.category],
      ids: v._ids,
      itemStyle: {}
    }

    if (chartType === 'signSeries') {
      const color = styledsMemo[i].color
      _data.itemStyle.color = getEchartColor(color)

      if (valueLabel.display && valueLabel.position !== 'fixedright' && !decorate) {
        const _labelColor = valueLabel.valueStyle?.syncValueColor
            ? getEchartColor(color)
            : valueLabel.valueStyle?.color,
          labelColor = getValueColor(_labelColor, typeof _labelColor === 'string')

        _data.label = {
          show: true,
          fontFamily: valueLabel.valueStyle?.fontFamily,
          color: labelColor,
          fontSize: valueLabel.valueStyle?.fontSize,
          fontWeight: valueLabel.valueStyle?.fontWeight,
          offset: [valueLabel.valueStyle?.xOffset, valueLabel.valueStyle?.yOffset],
          rotate: valueLabel.valueStyle?.rotate,
          position: valueLabel.position,
          formatter: params => {
            const val = params.value[0]
            return numberForMat(val, valueLabel.valueStyle?.format)
          }
        }
      }
    }

    if (highlightSeries.display) {
      const c = getEchartColor(highlightSeries.color)
      // _labelColor = valueLabel.valueStyle?.syncValueColor ? c : _data.label.color,
      // labelColor = getValueColor(_labelColor, typeof _labelColor === 'string')

      if (highlightSeries.extremum === 'min' && v.value === min) {
        _data.itemStyle.color = c
        // _data.label && (_data.label.color = labelColor)
      }

      if (highlightSeries.extremum === 'max' && v.value === max) {
        _data.itemStyle.color = c
        // _data.label && (_data.label.color = labelColor)
      }
    }

    return _data
  })
  return _data
}

export const getStripSeriesOptions = (
  config: BasicStripProps,
  dataMemo: any,
  styledsMemo: StripDataSeries[],
  { isStack }: { isStack?: boolean }
) => {
  const options: any = {
    series: []
  }
  let i = 0

  const normalBarStyle = config.globalConfig?.barStyle || (defaultGlobal.barStyle as StripStyle), //柱状样式
    valueLabel = config.globalConfig?.valueLabel || (defaultGlobal.valueLabel as ValueLabel), // 数值标签
    dataAnimate = config.globalConfig?.dataAnimate || false,
    chartType = config.chartType || 'strip',
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
  const markLine = getMarkLineOptions(markSeries, { chartType })
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries, { chartType })
  //堆叠
  const stackObj = getStackArray(dataMemo, stackSeries)

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        styled = styledsMemo[i] || {},
        _data = getSeriesData(item, highlightSeries, { styledsMemo, chartType, valueLabel }),
        color = getEchartColor(styled.color),
        useSeriesColors = typeof color === 'string',
        seriesColor = getValueColor(color, useSeriesColors)
      let barStyle = normalBarStyle

      if (chartType !== 'signSeries' && styled?.barStyle?.display) {
        barStyle = styled?.barStyle
      }

      const radiuObj = {
        bullet: [0, 9999999, 9999999, 0],
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
        barGap: `${isStack ? '50' : normalBarStyle.bargap || 0}%`,
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

      if (valueLabel.display && valueLabel.position !== 'fixedright') {
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
            const val = params.value[0]
            return numberForMat(val, valueLabel.valueStyle?.format)
          }
        }
      } else {
        _series.label = {
          show: false
        }
      }

      if (decorateDisplay) {
        const { decIconConfig, iconSize, position } = decorate || {},
          decorateData = getSeriesData(item, highlightSeries, { styledsMemo, chartType, valueLabel, decorate: true }),
          y = getDecoratePosition(dataLen, i, {
            barWidth: normalBarStyle.barWidth || 0,
            barGap: (normalBarStyle.bargap || 0) / 100
          })

        const decorateSeries: any = {
          type: 'pictorialBar',
          name: key === '_none' ? '' : key,
          z: 3,
          data: decorateData,
          itemStyle: {
            color
          },
          barGap: '-100%',
          silent: true,
          symbolPosition: position?.place,
          symbolSize: [iconSize?.width, iconSize?.height],
          symbolOffset: [position?.offset, y],

          label: {
            show: false
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

export function getStripDataZommOptions(carouselAnimation: CarouselAnimation, chartType: string) {
  if (chartType == 'stackStrip' || !carouselAnimation.display) return {}

  const options = {
    dataZoom: [
      {
        id: 'dataZoomY',
        disabled: true,
        type: 'inside',
        orient: 'vertical',
        show: false,
        startValue: 0,
        endValue: (carouselAnimation.showNumer || 6) - 1
      }
    ]
  }
  return options
}

export function machinYAxis(
  yAxis0: any,
  valueLabel: ValueLabel,
  data: GeneralSignSeriesDataMap[] = [],
  styledsMemo: StripDataSeries[],
  xAxis: GeneralXAxis
) {
  const type = yAxis0.type,
    timeTyle = yAxis0.timeTyle,
    colors = styledsMemo.map(v => v.color)

  yAxis0.axisLabel.formatter = (val, index) => {
    let name: string | undefined = val
    switch (type) {
      case 'time': {
        const _momont = moment(val)
        if (_momont.isValid()) {
          if (timeTyle !== 'Monday' && timeTyle !== 'Mon' && timeTyle !== 'asData') {
            name = _momont.format(timeTyle)
          } else if (timeTyle === 'Monday' || timeTyle === 'Mon') {
            const day = _momont.format('d')
            const target = timeTyle === 'Monday' ? dayName : abridgeDayName
            name = target[day]
          }
        }
        break
      }
      case 'category': {
        const _data = data.flat(),
          map = styledsMemo[index].map,
          titleSeries = _data.find((v: GeneralSignSeriesDataMap) => v.category == val && v.categoryTitle)
        titleSeries ? (name = titleSeries.categoryTitle) : (name = val)
        map?.fieldName && map.fieldName == val && map.displayName && (name = map.displayName)
        break
      }
    }
    return name
  }

  const labelStyle = xAxis.axisLabel?.axisStyle,
    showType = labelStyle?.showType || 'actualLength',
    overflow = labelStyle?.overflow || 'none'

  if ((overflow === 'truncate' || overflow === 'breakAll') && showType === 'outOfCharacter') {
    // 按字符数
    const preFormatter = yAxis0.axisLabel.formatter,
      chartNum = labelStyle?.charNumber || 0
    yAxis0.axisLabel.formatter = (val, index) => {
      let str = preFormatter(val, index) || ''
      str = formatStr(str, chartNum, '\n', overflow === 'truncate')
      return str
    }
  }

  if (valueLabel?.display && valueLabel?.position === 'fixedright') {
    const yAxis = [yAxis0],
      valueStyle = valueLabel.valueStyle,
      secondYAxis = {
        show: true,
        type: 'category',
        position: 'right',
        axisLine: { show: false },
        axisTick: { show: false },
        data: [],
        axisLabel: {
          show: true,
          rotate: valueStyle?.rotate,
          padding: [valueStyle?.yOffset, valueStyle?.xOffset],
          textStyle: {
            color: valueStyle?.color,
            fontWeight: valueStyle?.fontWeight,
            fontFamily: valueStyle?.fontFamily,
            fontSize: valueStyle?.fontSize
          },
          formatter: val => {
            return numberForMat(val, valueStyle?.format)
          }
        }
      },
      yData: any = []

    data.forEach((item, i) => {
      const _data: any = {
        value: item.value,
        textStyle: {}
      }

      if (valueStyle?.syncValueColor) {
        const _labelColor = valueLabel.valueStyle?.syncValueColor
            ? getEchartColor(colors[i])
            : valueLabel.valueStyle?.color,
          labelColor = getValueColor(_labelColor, typeof _labelColor === 'string')
        _data.textStyle.color = labelColor
      }

      yData.push(_data)
    })

    secondYAxis.data = yData

    yAxis.push(secondYAxis)

    return { yAxis }
  }
  return {
    yAxis: yAxis0
  }
}
