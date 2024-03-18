/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions, getStackArray } from '../../../common'
import { GlobalConfig, SeriesConfig, ValueLabel } from '../../LczBasicBar/type'
import {
  StereohistogramBarStyle,
  BasicStereohistogram,
  StereohistogramDataSeries,
  StereohistogramHighlightSeries
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

//获取堆叠的柱子叠加的value
function getStackBarValue(dataMemo: any, data: any[], i: number, name: string) {
  const isPositive = dataMemo[name][i]?.value > 0 ? true : false
  return data.reduce((pre, item) => {
    if (dataMemo[item][i]?.value > 0 == isPositive) {
      return (pre += dataMemo[item][i]?.value)
    } else {
      return pre
    }
  }, 0)
}

//获取堆叠的柱子叠加的数据
function getSeriesData(
  data: any,
  highlightSeries: StereohistogramHighlightSeries,
  barType: string,
  xOffset: any,
  stackData?: any,
  dataMemo?: any,
  position?: string
) {
  const values = data.map(v => v.value)
  const min = Math.min(...values)
  const max = Math.max(...values)

  const _data = data.map((v: any, i: number) => {
    let dataValue = v.value
    let dataSymbolOffset: any = [`${xOffset}%`, `${v.value > 0 ? '50' : '-50'}%`]
    if (position === 'bottom') {
      dataValue = getStackBarValue(dataMemo, stackData.stackValue.slice(0, -1), i, stackData.name)
      dataSymbolOffset = [`${xOffset}%`, `${stackData.stackValue.length == 1 ? '50' : dataValue >= 0 ? '-50' : '50'}%`]
    } else if (position === 'top') {
      dataValue = getStackBarValue(dataMemo, stackData.stackValue, i, stackData.name)
      dataSymbolOffset = [`${xOffset}%`, `${dataValue >= 0 ? '-50' : '50'}%`]
    }

    const _data: any = {
      name: v.category,
      value: [v.category, dataValue],
      symbolOffset: dataSymbolOffset,
      ids: v._ids,
      itemStyle: {}
    }

    if (highlightSeries.display) {
      const color = barType === 'prism' ? highlightSeries.prismColor?.map(v => v.value) : highlightSeries.color
      let c = getEchartColor(color)
      barType === 'top' &&
        (c =
          highlightSeries.prismColor && highlightSeries.prismColor.length > 0
            ? highlightSeries.prismColor[0].value
            : '#000')
      highlightSeries.extremum === 'min' && v.value === min && (_data.itemStyle.color = c)
      highlightSeries.extremum === 'max' && v.value === max && (_data.itemStyle.color = c)
    }

    return _data
  })
  return _data
}

export const getBarSeriesOptions = (
  config: BasicStereohistogram,
  dataMemo: any,
  { colors, seriesStyle, isStack }: { colors: any[]; seriesStyle: StereohistogramDataSeries[]; isStack: boolean }
) => {
  if (seriesStyle.length <= 0) return {}

  let i = 0
  const options: any = { series: [] },
    barStyle = config.globalConfig?.barStyle || (defaultGlobal.barStyle as StereohistogramBarStyle), //柱状样式
    valueLabel = config.globalConfig?.valueLabel || (defaultGlobal.valueLabel as ValueLabel), // 数值标签
    dataAnimate = config.globalConfig?.dataAnimate || false

  const {
    markSeries = [],
    markPointSeries = [],
    highlightSeries = defaultHighlightSeries,
    stackSeries = []
  } = (config.seriesConfig || {}) as SeriesConfig

  // 标线
  const markLine = getMarkLineOptions(markSeries),
    // 标注
    markPoint = getMarkPointIptions(markPointSeries),
    stackObj = getStackArray(dataMemo, stackSeries)

  const stackBarData = Object.entries(stackObj).reduce((pre: any, item: any) => {
    const [name, stack] = item
    const reuseStackName: any = Object.keys(pre)
      .reverse()
      .find(v => stack && pre[v].stack === stack)
    let stackValue = pre[reuseStackName]?.stackValue || []
    stackValue = reuseStackName ? [...stackValue, name] : [name]
    pre[name] = { name, stack, stackValue }
    return pre
  }, {})

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        _seriesStyle = seriesStyle[i],
        _data = getSeriesData(item, highlightSeries, barStyle.barType, _seriesStyle.topAndBottom?.xOffset),
        color = getEchartColor(colors[i]),
        seriesName = key === '_none' ? '' : key,
        barOpacity =
          barStyle.barType === 'prism' ? _seriesStyle?.prismOpacity / 100 : _seriesStyle?.cylinderOpacity / 100

      const _series: any = {
        type: 'bar',
        name: seriesName,
        itemStyle: {
          color,
          opacity: barOpacity
        },
        stack: isStack ? stackBarData[key].stack : '',
        barGap: `${barStyle.bargap}%`,
        barWidth: barStyle.barWidth,
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

      barStyle.barBgColor?.display &&
        ((_series.showBackground = true),
        (_series.backgroundStyle.color = barStyle.barBgColor.color),
        (_series.backgroundStyle.opacity = barStyle.barBgColor.opacity / 100))

      if (valueLabel.display) {
        _series.label = {
          show: true,
          fontFamily: valueLabel.valueStyle?.fontFamily,
          color: valueLabel.valueStyle?.color,
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

      const symbol = barStyle.barType === 'prism' ? 'diamond' : 'circle',
        pictorialBarOpacity = (_seriesStyle.topAndBottom?.opacity || 0) / 100
      let topData: any,
        bottomData: any,
        stackSymbolPosition = ''
      if (isStack) {
        topData =
          barStyle.barType === 'prism'
            ? getSeriesData(
                item,
                highlightSeries,
                'top',
                _seriesStyle.topAndBottom?.xOffset,
                stackBarData[key],
                dataMemo,
                'top'
              )
            : getSeriesData(
                item,
                highlightSeries,
                barStyle.barType,
                _seriesStyle.topAndBottom?.xOffset,
                stackBarData[key],
                dataMemo,
                'top'
              )
        bottomData = getSeriesData(
          item,
          highlightSeries,
          barStyle.barType,
          _seriesStyle.topAndBottom?.xOffset,
          stackBarData[key],
          dataMemo,
          'bottom'
        )
        stackBarData[key].stackValue.length > 1 && (stackSymbolPosition = 'end')
      }

      const pictorialBar = [
        {
          z: 13,
          type: 'pictorialBar',
          name: seriesName,
          symbolPosition: 'end',
          tooltip: { show: false },
          data: topData,
          symbol,

          symbolSize: [barStyle.barWidth, barStyle.barWidth * 0.5],
          itemStyle: {
            opacity: pictorialBarOpacity,
            color: barStyle.barType === 'prism' ? colors[i][0] : color
          }
        },
        {
          z: 13,
          type: 'pictorialBar',
          name: seriesName,
          data: bottomData,
          tooltip: { show: false },
          symbol,
          symbolSize: [barStyle.barWidth, barStyle.barWidth * 0.5],
          itemStyle: {
            opacity: pictorialBarOpacity,
            color: color
          }
        }
      ]
      stackSymbolPosition && (pictorialBar[1].symbolPosition = stackSymbolPosition)

      options.series.push(_series, ...pictorialBar)
    }
    i++
  }

  return options
}
