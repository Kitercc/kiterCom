/* eslint-disable indent */
import * as echarts from 'echarts/core'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getValueColor } from '../../../common'
import { GeneralPieDataMap } from '../../../common/type'
import { GuideLine, LabelTureValue, LczBasicPieProps, SeriesConfig, VisualMap } from '../type'
import { defaultGlobalConfig, defaultGraphical, defaultPieChart, defaultPieSelect } from './defaultValue'

function getPieData(data: GeneralPieDataMap[], props: LczBasicPieProps, colors: any[]) {
  let sVal: string[] = []
  const {
      chartType = 'pie',
      globalConfig = defaultGlobalConfig,
      pieChart = defaultPieChart,
      seriesConfig = {} as SeriesConfig
    } = props,
    { numberLabel } = globalConfig,
    { select = defaultPieSelect } = pieChart,
    { dataSeries = [] } = seriesConfig,
    selecteval = String(select.initSelect.value).trim(),
    _total = data.reduce((pre, item) => pre + item.value, 0),
    total = _total === 0 ? 1 : _total

  if (select.display && selecteval && selecteval !== 'Execute Expression Error') {
    const arr = selecteval.split(',')
    if (select.mode === 'single') {
      sVal[0] = arr[0]
    } else {
      sVal = arr
    }
  }

  return data.map((v, i) => {
    const selected = sVal.includes(v.item),
      color = getEchartColor(colors[i]),
      useSeriesColors = typeof color === 'string',
      seriesColor = getValueColor(color, useSeriesColors),
      _data: any = {
        ...v,
        name: v.item,
        label: { show: false },
        selected
      }

    if (chartType !== 'nightingale' || !seriesConfig.visualMap?.display) _data.itemStyle = { color }

    if (numberLabel?.display) {
      const {
          distribution = 'horizontal',
          position,
          guideLine = {},
          seriesName,
          proportion,
          margin: labelMargin,
          trueValue = {} as LabelTureValue
        } = numberLabel,
        { prefix, suffix } = trueValue,
        namePrefixStyle = seriesName?.prefix,
        nameSuffixStyle = seriesName?.suffix,
        proportionPrefixStyle = proportion?.prefix,
        proportionSuffixStyle = proportion?.suffix

      if (position === 'outside') {
        if (labelMargin !== undefined) {
          _data.label.padding = [labelMargin.t, labelMargin.r, labelMargin.b, labelMargin.l]
        }

        const { display, spacing = 0, alignment = 'none', lineStyle } = guideLine as GuideLine
        if (display) {
          _data.label.alignTo = alignment
          _data.label.distanceToLabelLine = spacing

          if (alignment === 'edge') {
            _data.label.edgeDistance = `${lineStyle?.edgeDistance}%`
          }
        }
      }

      _data.label.show = true
      _data.label.position = position

      const rich: {
        s?: any
        spre?: any
        ssuf?: any
        prop?: any
        trueV?: any
        truePre?: any
        trueSuf?: any
        ppre?: any
        psuf?: any
      } = {}

      // 系列名
      if (seriesName?.display) {
        rich.s = {
          color: seriesName?.color,
          fontSize: seriesName?.fontSize,
          fontWeight: seriesName?.fontWeight,
          fontFamily: seriesName?.fontFamily
        }

        if (seriesName?.seriesNameColorFollow) {
          rich.s.color = seriesColor
        }
        if (namePrefixStyle) {
          rich.spre = {
            color: namePrefixStyle?.labelSeriesNamePrefixStyleFollow ? rich.s?.color : namePrefixStyle?.color,
            fontSize: namePrefixStyle?.labelSeriesNamePrefixStyleFollow ? rich.s?.fontSize : namePrefixStyle?.fontSize,
            fontWeight: namePrefixStyle?.labelSeriesNamePrefixStyleFollow
              ? rich.s?.fontWeight
              : namePrefixStyle?.fontWeight,
            fontFamily: namePrefixStyle?.labelSeriesNamePrefixStyleFollow
              ? rich.s?.fontFamily
              : namePrefixStyle?.fontFamily,
            padding: [
              namePrefixStyle?.offsetConfig?.t,
              namePrefixStyle?.offsetConfig?.r,
              namePrefixStyle?.offsetConfig?.b,
              namePrefixStyle?.offsetConfig?.l
            ]
          }

          if (!namePrefixStyle?.labelSeriesNamePrefixStyleFollow && namePrefixStyle.labelSeriesNamePrefixColorFollow) {
            rich.spre.color = seriesColor
          }
        }

        if (nameSuffixStyle) {
          rich.ssuf = {
            color: nameSuffixStyle.labelSeriesNameSuffixStyleFollow ? rich.s.color : nameSuffixStyle?.color,
            fontSize: nameSuffixStyle?.labelSeriesNameSuffixStyleFollow ? rich.s?.fontSize : nameSuffixStyle?.fontSize,
            fontWeight: nameSuffixStyle?.labelSeriesNameSuffixStyleFollow
              ? rich.s?.fontWeight
              : nameSuffixStyle?.fontWeight,
            fontFamily: nameSuffixStyle?.labelSeriesNameSuffixStyleFollow
              ? rich.s?.fontFamily
              : nameSuffixStyle?.fontFamily,
            padding: [nameSuffixStyle?.yOffset, 0, 0, nameSuffixStyle?.xOffset]
          }

          if (!nameSuffixStyle.labelSeriesNameSuffixStyleFollow && nameSuffixStyle.labelSeriesNameSuffixColorFollow) {
            rich.ssuf.color = seriesColor
          }
        }
      }

      // 占比值
      if (proportion?.display) {
        rich.prop = {
          color: proportion?.color,
          fontSize: proportion?.fontSize,
          fontWeight: proportion?.fontWeight,
          fontFamily: proportion?.fontFamily,
          padding: [0, 0, 0, proportion?.speed]
        }

        if (proportion?.propStyleFollow && rich.s) {
          rich.prop.color = rich.s.color
          rich.prop.fontSize = rich.s.fontSize
          rich.prop.fontWeight = rich.s.fontWeight
          rich.prop.fontFamily = rich.s.fontFamily
        }

        if (!proportion?.propStyleFollow && proportion?.propColorFollow) {
          rich.prop.color = seriesColor
        }

        // 占比值前缀
        if (proportionPrefixStyle) {
          rich.ppre = {
            color: proportionPrefixStyle?.labelproportionPrefixStyleFollow
              ? rich.prop?.color
              : proportionPrefixStyle?.color,
            fontSize: proportionPrefixStyle?.labelproportionPrefixStyleFollow
              ? rich.prop?.fontSize
              : proportionPrefixStyle?.fontSize,
            fontWeight: proportionPrefixStyle?.labelproportionPrefixStyleFollow
              ? rich.prop?.fontWeight
              : proportionPrefixStyle?.fontWeight,
            fontFamily: proportionPrefixStyle?.labelproportionPrefixStyleFollow
              ? rich.prop?.fontFamily
              : proportionPrefixStyle?.fontFamily,
            padding: [proportionPrefixStyle?.yOffset, 0, 0, proportionPrefixStyle?.xOffset]
          }

          if (
            !proportionPrefixStyle?.labelproportionPrefixStyleFollow &&
            proportionPrefixStyle.labelproportionPrefixColorFollow
          ) {
            rich.ppre.color = seriesColor
          }
        }
        // 占比值后缀
        if (proportionSuffixStyle) {
          rich.psuf = {
            color: proportionSuffixStyle?.labelproportionSuffixStyleFollow
              ? rich.prop?.color
              : proportionSuffixStyle?.color,
            fontSize: proportionSuffixStyle?.labelproportionSuffixStyleFollow
              ? rich.prop?.fontSize
              : proportionSuffixStyle?.fontSize,
            fontWeight: proportionSuffixStyle?.labelproportionSuffixStyleFollow
              ? rich.prop?.fontWeight
              : proportionSuffixStyle?.fontWeight,
            fontFamily: proportionSuffixStyle?.labelproportionSuffixStyleFollow
              ? rich.prop?.fontFamily
              : proportionSuffixStyle?.fontFamily,
            padding: [proportionSuffixStyle?.yOffset, 0, 0, proportionSuffixStyle?.xOffset]
          }

          if (
            !proportionSuffixStyle?.labelproportionSuffixStyleFollow &&
            proportionSuffixStyle.labelproportionSuffixColorFollow
          ) {
            rich.psuf.color = seriesColor
          }
        }
      }

      // 真实值
      if (trueValue?.display) {
        rich.trueV = {
          color: trueValue?.color,
          fontSize: trueValue?.fontSize,
          fontWeight: trueValue?.fontWeight,
          fontFamily: trueValue?.fontFamily,
          padding: [0, 0, 0, trueValue?.speed]
        }

        if (trueValue.trueStyleFollow && rich.s) {
          rich.trueV.color = rich.s.color
          rich.trueV.fontSize = rich.s.fontSize
          rich.trueV.fontWeight = rich.s.fontWeight
          rich.trueV.fontFamily = rich.s.fontFamily
        }

        if (!trueValue.trueStyleFollow && trueValue.trueColorFollow) {
          rich.trueV.color = seriesColor
        }

        // 真实值前缀
        if (prefix?.display) {
          rich.truePre = {
            color: prefix?.color,
            fontSize: prefix?.fontSize,
            fontWeight: prefix?.fontWeight,
            fontFamily: prefix?.fontFamily,
            padding: [prefix?.yOffset, 0, 0, prefix?.xOffset]
          }

          if (prefix.labelTruePrefixStyleFollow) {
            rich.truePre.color = rich.trueV?.color
            rich.truePre.fontSize = rich.trueV?.fontSize
            rich.truePre.fontWeight = rich.trueV?.fontWeight
            rich.truePre.fontFamily = rich.trueV?.fontFamily
          }

          if (!prefix.labelTruePrefixStyleFollow && prefix.labelTruePrefixColorFollow) {
            rich.truePre.color = seriesColor
          }
        }

        // 真实值后缀
        if (suffix?.display) {
          rich.trueSuf = {
            color: suffix?.color,
            fontSize: suffix?.fontSize,
            fontWeight: suffix?.fontWeight,
            fontFamily: suffix?.fontFamily,
            padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
          }

          if (suffix?.labelTrueSuffixStyleFollow) {
            rich.trueSuf.color = rich.trueV?.color
            rich.trueSuf.fontSize = rich.trueV?.fontSize
            rich.trueSuf.fontWeight = rich.trueV?.fontWeight
            rich.trueSuf.fontFamily = rich.trueV?.fontFamily
          }

          if (!suffix?.labelTrueSuffixStyleFollow && suffix.labelTrueSuffixColorFollow) {
            rich.trueSuf.color = seriesColor
          }
        }
      }

      _data.label.rich = rich

      _data.label.formatter = param => {
        const { data } = param

        const _proportion = ((data.value / total) * 100).toFixed(proportion?.decimal)
        const _formattruevalue = numberForMat(data.value, trueValue?.numberformat)

        let name = data.name,
          displaySeriesName = '',
          displayTrueValue = '',
          displayProportion = ''

        const findSeries = [...dataSeries].reverse().find(v => name && v.map?.displayName && v.map?.fieldName === name)
        data.itemTitle && (name = data.itemTitle)
        findSeries && (name = findSeries.map?.displayName)
        const divide = name && (proportion?.display || trueValue?.display) && distribution === 'vertical' ? '\n' : ' '

        if (seriesName?.display && name) {
          let pre = '',
            suf = ''
          if (namePrefixStyle?.display && namePrefixStyle.content) pre = `{spre|${namePrefixStyle.content}}`
          if (nameSuffixStyle?.display && nameSuffixStyle.content) suf = `{ssuf|${nameSuffixStyle.content}}`
          displaySeriesName = `${pre}{s|${name}}${suf}${divide}`
        }

        if (trueValue?.display) {
          let pre = '',
            suf = ''
          if (prefix?.display && prefix?.content) pre = `{truePre|${prefix.content}}`
          if (suffix?.display && suffix?.content) suf = `{trueSuf|${suffix.content}}`
          displayTrueValue = `${pre}{trueV|${_formattruevalue}}${suf}`
        }

        if (proportion?.display) {
          let pre = '',
            suf = ''
          if (proportionPrefixStyle?.display && proportionPrefixStyle?.content)
            pre = `{ppre|${proportionPrefixStyle.content}}`
          if (proportionSuffixStyle?.display && proportionSuffixStyle?.content)
            suf = `{psuf|${proportionSuffixStyle.content}}`
          displayProportion = `${pre}{prop|${_proportion}%}${suf}`
        }

        return `${displaySeriesName}${displayTrueValue}${displayProportion}`
      }
    }

    return _data
  })
}

export function getSeries(
  this: echarts.ECharts,
  props: LczBasicPieProps,
  data: GeneralPieDataMap[],
  { colors }: { colors: any[] }
) {
  const series: any = [],
    {
      chartType = 'pie',
      globalConfig = defaultGlobalConfig,
      pieChart = defaultPieChart,
      seriesConfig = {} as SeriesConfig,
      onChange
    } = props,
    { margin, numberLabel } = globalConfig,
    { graphical = defaultGraphical, angle, select = defaultPieSelect, highlight, border, shadow } = pieChart,
    _data = getPieData(data, props, colors)

  series[0] = {
    name: seriesConfig.seriesName,
    type: 'pie',
    selectedMode: false,
    center: [`${margin?.x}%`, `${margin?.y}%`],
    data: _data,

    clockwise: graphical.clockwise,
    showEmptyCircle: graphical.showEmptyCircle,
    startAngle: angle?.startAngle,
    minAngle: angle?.minAngle,

    labelLine: { show: false },
    itemStyle: {
      opacity: graphical.opacity / 100,
      borderRadius: graphical.borderRadius,
      shadowBlur: shadow?.shadowBlur,
      shadowColor: shadow?.shadowColor,
      shadowOffsetX: shadow?.shadowOffsetX,
      shadowOffsetY: shadow?.shadowOffsetY
    },
    select: {},
    emphasis: {
      scale: false
    }
  }

  switch (chartType) {
    case 'pie':
      series[0].radius = `${graphical.radius}%`
      break
    case 'doughnut':
      series[0].radius = [`${graphical.radius}%`, `${graphical.outRadius}%`]
      break
    case 'nightingale':
      series[0].radius = [`${graphical.radius}%`, `${graphical.outRadius}%`]
      series[0].roseType = graphical?.roseType
      break
    default:
      break
  }
  graphical.showEmptyCircle && (series[0].emptyCircleStyle = { color: graphical.emptyColor })

  if (numberLabel?.display) {
    const { position, guideLine = {} } = numberLabel
    if (position === 'outside') {
      const { display, alignment = 'none', lineStyle, shadow } = guideLine as GuideLine
      if (display) {
        series[0].labelLine.show = true

        series[0].labelLine.lineStyle = {
          ...(series[0].labelLine.lineStyle || {}),
          width: lineStyle?.lineWidth,
          opacity: (lineStyle?.opacity || 0) / 100,
          shadowBlur: shadow?.shadowBlur,
          shadowColor: shadow?.shadowColor,
          shadowOffsetX: shadow?.shadowOffsetX,
          shadowOffsetY: shadow?.shadowOffsetY
        }

        if (!lineStyle?.syncColor) {
          series[0].labelLine.lineStyle.color = lineStyle?.color
        }

        if (alignment !== 'edge') {
          series[0].labelLine.length = lineStyle?.len1
          series[0].labelLine.length2 = lineStyle?.len2
        }
      }
    }
  }

  if (select.display) {
    series[0].selectedMode = select.mode
    series[0].selectedOffset = select.selectStyle?.selectedOffset
    series[0].select.itemStyle = { opacity: (select.selectStyle?.opacity || 0) / 100 }

    const dataSeries = seriesConfig?.dataSeries ? [...seriesConfig?.dataSeries].reverse() : []
    let eventParam = _data.filter(item => item.selected)

    if (eventParam.length && dataSeries.length) {
      eventParam = eventParam.map(item => {
        const findSeries = dataSeries.find(s => s.map?.fieldName === item.item)
        findSeries && findSeries.map?.displayName && (item.item = findSeries.map?.displayName)
        return item
      })
      const _eventParam = pieChart?.select?.mode === 'multiple' ? eventParam : eventParam[0]
      onChange && onChange(_eventParam)
    }
  }

  if (highlight?.display) {
    series[0].emphasis = {
      scale: true,
      scaleSize: highlight?.scaleSize,
      focus: highlight?.focus ? 'self' : 'none'
    }
  }

  if (border?.display) {
    series[0].itemStyle.borderColor = border?.color
    series[0].itemStyle.borderWidth = border?.width
    series[0].itemStyle.borderType = border?.type
  } else {
    series[0].itemStyle.borderWidth = 0
  }

  return { series }
}

export function getVisualMap(visualMa: VisualMap) {
  const {
    max = 999,
    min = 0,
    color = [],
    colorLightnessMin = 0,
    colorLightnessMax = 100,
    colorSaturationMin = 0,
    colorSaturationMax = 100
  } = visualMa || {}

  const _obj: any = {
    show: false,
    type: 'continuous',
    min,
    max,
    inRange: {
      color: color.map(v => v.value),
      colorLightness: [colorLightnessMin / 100, colorLightnessMax / 100],
      colorSaturation: [colorSaturationMin / 100, colorSaturationMax / 100]
    }
  }
  return _obj
}
