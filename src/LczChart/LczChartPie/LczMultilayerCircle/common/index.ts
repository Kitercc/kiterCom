import { deepClone } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getValueColor } from '../../../common'
import { GeneralPieDataMap } from '../../../common/type'
import { DataSeries } from '../../Lcz3dTorus/type'
import { GlobalConfig, LabelTureValue, MultilayerCircleProps, NumberLabel, PieChart } from '../type'
import { defaultGlobalConfig, defaultGraphical } from './defaultValue'

export function getGlobalOptions(config: GlobalConfig) {
  const {
    labelMargin = {
      t: 24,
      b: 52,
      l: 30,
      r: 0
    }
  } = config.numberLabel as NumberLabel
  return {
    grid: {
      left: `${labelMargin.l}%`,
      bottom: `${labelMargin.b}%`,
      right: `${labelMargin.r}%`,
      top: `${labelMargin.t}%`,
      containLabel: true
    }
  }
}

const getTopSeries = (
  props: MultilayerCircleProps,
  total: number,
  itemData: GeneralPieDataMap,
  itemcColor: any,
  index: number
) => {
  let sVal: string[] = []
  const { globalConfig = defaultGlobalConfig, pieChart = {} as PieChart } = props,
    { margin } = globalConfig,
    { graphical = defaultGraphical, bgPie, select, border, shadow } = pieChart,
    color = getEchartColor(itemcColor),
    selecteval = String(select.initSelect.value).trim()

  if (select.display && selecteval && selecteval !== 'Execute Expression Error') {
    const arr = selecteval.split(',')
    sVal = arr
  }

  const _data: any = {
    name: '_topPie',
    type: 'pie',
    radius: [graphical.radius + index * graphical.space + '%', graphical.outRadius + index * graphical.space + '%'],
    center: [`${margin?.x}%`, `${margin?.y}%`],
    clockwise: false,
    z: 2,
    hoverAnimation: false,
    label: {
      show: false
    },
    itemStyle: {
      opacity: (graphical.opacity || 0) / 100,
      borderRadius: graphical.borderRadius
    },
    select: {},
    data: [
      {
        value: (itemData.value / total) * bgPie.endAngle,
        name: itemData.item,
        item: itemData.item,
        itemTitle: itemData.itemTitle,
        _val: itemData.value,
        selected: sVal.includes(itemData.item),
        itemStyle: {
          color,
          shadowBlur: shadow?.shadowBlur,
          shadowColor: shadow?.shadowColor,
          shadowOffsetX: shadow?.shadowOffsetX,
          shadowOffsetY: shadow?.shadowOffsetY,
          borderColor: border?.color,
          borderWidth: border?.display ? border.width : 0,
          borderType: border?.type
        }
      },
      {
        value: 360 - (itemData.value / total) * bgPie.endAngle,
        name: '_null',
        itemStyle: {
          color: 'rgba(0,0,0,0)'
        }
      }
    ],
    labelLine: { show: false },
    emphasis: {
      labelLine: {
        show: false
      }
    }
  }

  if (select.display) {
    _data.selectedMode = 'single'
    _data.selectedOffset = select.selectedOffset
    _data.select.itemStyle = { opacity: (select.opacity || 0) / 100 }
  }
  return _data
}

const getBottomSeries = (props: MultilayerCircleProps, itemcColor: any, index: number) => {
  const { globalConfig = defaultGlobalConfig, pieChart = {} as PieChart } = props,
    { margin } = globalConfig,
    { graphical = defaultGraphical, bgPie } = pieChart

  const _data = {
    name: '_bottomPie',
    type: 'pie',
    radius: [graphical.radius + index * graphical.space + '%', graphical.outRadius + index * graphical.space + '%'],
    center: [`${margin?.x}%`, `${margin?.y}%`],
    clockWise: false, //顺时加载
    hoverAnimation: false, //鼠标移入变大
    z: 1,
    labelLine: {
      show: false
    },
    label: {
      show: false
    },
    itemStyle: {
      opacity: bgPie.display ? (bgPie.opacity || 0) / 100 : 0,
      borderRadius: bgPie.borderRadius
    },
    data: [
      {
        value: bgPie?.endAngle,
        name: '',
        itemStyle: {
          color: bgPie.color
        }
      },
      {
        value: 360 - bgPie.endAngle,
        name: '',
        itemStyle: {
          color: 'rgba(0,0,0,0)'
        }
      }
    ],
    emphasis: {
      labelLine: {
        show: false
      }
    }
  }
  return _data
}

export const getCircleSeries = (
  props: MultilayerCircleProps,
  data: GeneralPieDataMap[],
  { colors }: { colors: any[] }
) => {
  const series: any = [],
    _total = data.reduce((pre, item) => pre + item.value, 0),
    total = _total === 0 ? 1 : _total,
    _data = deepClone(data).reverse()

  for (let index = 0; index < _data.length; index++) {
    const topSeries = getTopSeries(props, total, _data[index], colors[index], index),
      bottomSeries = getBottomSeries(props, colors[index], index)
    series.push(topSeries, bottomSeries)
  }
  return { series }
}

const getyAxisData = (props: NumberLabel, data: GeneralPieDataMap[], { colors }: { colors: any[] }) => {
  return data.map((v, i) => {
    const color = getEchartColor(colors[i]),
      useSeriesColors = typeof color === 'string',
      seriesColor = getValueColor(color, useSeriesColors),
      _data: any = {
        _value: v.itemTitle || v.item,
        value: i,
        textStyle: {}
      }

    if (props?.display) {
      const { seriesName, proportion, trueValue = {} as LabelTureValue } = props,
        { prefix, suffix } = trueValue,
        namePrefixStyle = seriesName?.prefix,
        nameSuffixStyle = seriesName?.suffix,
        proportionPrefixStyle = proportion?.prefix,
        proportionSuffixStyle = proportion?.suffix

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
            padding: [0, 0, 0, namePrefixStyle?.xOffset]
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
            padding: [0, 0, 0, nameSuffixStyle?.xOffset]
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
            padding: [0, 0, 0, proportionPrefixStyle?.xOffset]
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
            padding: [0, 0, 0, proportionSuffixStyle?.xOffset]
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
            padding: [0, 0, 0, prefix?.xOffset]
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
            padding: [0, 0, 0, suffix?.xOffset]
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

      _data.textStyle.rich = rich
    }

    return _data
  })
}

export const getCircleYaxisOptions = (
  props: NumberLabel,
  dataSeries: DataSeries[],
  data: GeneralPieDataMap[],
  { colors }: { colors: any[] }
) => {
  const _data = getyAxisData(props, data, { colors }),
    _total = data.reduce((pre, item) => pre + item.value, 0),
    total = _total === 0 ? 1 : _total
  const { seriesName, proportion, trueValue = {} as LabelTureValue } = props,
    { prefix, suffix } = trueValue,
    namePrefixStyle = seriesName?.prefix,
    nameSuffixStyle = seriesName?.suffix,
    proportionPrefixStyle = proportion?.prefix,
    proportionSuffixStyle = proportion?.suffix
  const options: any = {
    yAxis: {
      type: 'category',
      show: props.display,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 0,
        inside: true,
        show: true
      },
      data: _data,
      z: 99
    }
  }

  options.yAxis.axisLabel.formatter = param => {
    const _data = deepClone(data).reverse(),
      labelData = _data[param],
      _proportion = ((labelData.value / total) * 100).toFixed(proportion?.decimal),
      _formattruevalue = numberForMat(labelData.value, trueValue?.numberformat)

    let name = labelData.item,
      displaySeriesName = '',
      displayTrueValue = '',
      displayProportion = ''

    const findSeries = [...dataSeries].reverse().find(v => name && v.map?.displayName && v.map?.fieldName === name)
    labelData.itemTitle && (name = labelData.itemTitle)
    findSeries && (name = findSeries.map?.displayName)
    const divide = ' '
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

  return options
}
