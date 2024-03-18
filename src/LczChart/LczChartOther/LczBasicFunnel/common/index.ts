import { numberForMat } from '../../../../LczCarouselTable/common'
import { GeneralPieDataMap } from '../../../common/type'
import { LabelTureValue } from '../../../LczChartPie/LczBasicPie/type'
import { CenterLabelTureValue, FunnelLine, FunnelSeriesConfig, LczBasicFunnelProps } from '../type'
import { defaultFunnelConfig, defaultFunnelGlobal, defaultFunnelLabel } from './defaultValue'
import { cloneDeep } from 'lodash'
import { getEchartColor } from '../../../common'

function getFunnelData(data: GeneralPieDataMap[], colors: any[]) {
  return data.map((v, i) => {
    const color = getEchartColor(colors[i])
    return { ...v, name: v.item, itemStyle: { color } }
  })
}

export function getFunnelSeries(props: LczBasicFunnelProps, data: GeneralPieDataMap[], { colors }: { colors: any[] }) {
  const series: any = []
  const {
    globalConfig = defaultFunnelGlobal,
    funnelConfig = defaultFunnelConfig,
    seriesConfig = {} as FunnelSeriesConfig
  } = props

  const { margin, sortConfig, centerLabel, dataAnimate = true } = globalConfig
  const { graphConfig, borderConfig, shadowStyle } = funnelConfig
  const { seriesItemName = '', dataSeries = [] } = seriesConfig

  const _data = getFunnelData(data, colors)
  const total = data.reduce((pre, item) => pre + item.value, 0)
  series[0] = {
    name: seriesItemName,
    type: 'funnel',
    selectedMode: false,
    left: margin?.l,
    right: margin?.r,
    top: margin?.t,
    bottom: margin?.b,
    data: _data,
    sort: sortConfig,
    orient: graphConfig?.funnelOrient,
    funnelAlign: graphConfig?.funnelOrient === 'horizontal' ? 'center' : graphConfig?.funnelAlign,
    gap: graphConfig?.gapStep,
    height: graphConfig?.height ? `${graphConfig?.height}%` : 'auto',
    width: graphConfig?.width ? `${graphConfig?.width}%` : 'auto',
    minSize: `${graphConfig?.minSize}%`,
    maxSize: `${graphConfig?.maxSize}%`,
    label: { show: false },
    labelLine: { show: false },
    itemStyle: {
      borderWidth: borderConfig?.display ? borderConfig.borderWidth : 0,
      borderColor: borderConfig?.borderColor,
      borderType: borderConfig?.borderType,
      shadowBlur: shadowStyle?.shadowBlur,
      shadowColor: shadowStyle?.shadowColor,
      shadowOffsetX: shadowStyle?.shadowOffsetX,
      shadowOffsetY: shadowStyle?.shadowOffsetY
    },
    emphasis: {
      scale: false
    },
    animation: dataAnimate
  }
  if (centerLabel?.display) {
    const { seriesName, proportion, trueValue = {} as CenterLabelTureValue } = centerLabel
    const { prefix, suffix } = trueValue
    series[0].label.show = true
    series[0].label.position = 'inside'
    series[0].label.rich = {
      s: {
        color: seriesName?.color,
        fontSize: seriesName?.fontSize,
        fontWeight: seriesName?.fontWeight,
        fontFamily: seriesName?.fontFamily
      },
      prop: {
        color: proportion?.centerPropColorFollow && seriesName?.display ? seriesName?.color : proportion?.color,
        fontSize:
          proportion?.centerPropColorFollow && seriesName?.display ? seriesName?.fontSize : proportion?.fontSize,
        fontWeight:
          proportion?.centerPropColorFollow && seriesName?.display ? seriesName?.fontWeight : proportion?.fontWeight,
        fontFamily:
          proportion?.centerPropColorFollow && seriesName?.display ? seriesName?.fontFamily : proportion?.fontFamily,
        padding: [0, 0, 0, proportion?.speed]
      },
      trueV: {
        color: trueValue.centerTrueColorFollow && seriesName?.display ? seriesName?.color : trueValue?.color,
        fontSize: trueValue.centerTrueColorFollow && seriesName?.display ? seriesName?.fontSize : trueValue?.fontSize,
        fontWeight:
          trueValue.centerTrueColorFollow && seriesName?.display ? seriesName?.fontWeight : trueValue?.fontWeight,
        fontFamily:
          trueValue.centerTrueColorFollow && seriesName?.display ? seriesName?.fontFamily : trueValue?.fontFamily,
        padding: [0, 0, 0, !prefix?.display ? trueValue?.speed : prefix?.xOffset]
      },
      pre: {
        color: prefix?.color,
        fontSize: prefix?.fontSize,
        fontWeight: prefix?.fontWeight,
        fontFamily: prefix?.fontFamily,
        padding: [prefix?.yOffset, 0, 0, trueValue?.speed]
      },
      suf: {
        color: suffix?.color,
        fontSize: suffix?.fontSize,
        fontWeight: suffix?.fontWeight,
        fontFamily: suffix?.fontFamily,
        padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
      }
    }

    if (trueValue?.centerTrueColorFollow && prefix?.centerLabelPrefixColorFlow && seriesName?.display) {
      series[0].label.rich.pre.color = seriesName?.color
      series[0].label.rich.pre.fontSize = seriesName?.fontSize
      series[0].label.rich.pre.fontWeight = seriesName?.fontWeight
      series[0].label.rich.pre.fontFamily = seriesName?.fontFamily
    } else if (prefix?.centerLabelPrefixColorFlow) {
      series[0].label.rich.pre.color = trueValue?.color
      series[0].label.rich.pre.fontSize = trueValue?.fontSize
      series[0].label.rich.pre.fontWeight = trueValue?.fontWeight
      series[0].label.rich.pre.fontFamily = trueValue?.fontFamily
    }
    if (trueValue?.centerTrueColorFollow && suffix?.centerLabelSuffixColorFlow && seriesName?.display) {
      series[0].label.rich.suf.color = seriesName?.color
      series[0].label.rich.suf.fontSize = seriesName?.fontSize
      series[0].label.rich.suf.fontWeight = seriesName?.fontWeight
      series[0].label.rich.suf.fontFamily = seriesName?.fontFamily
    } else if (suffix?.centerLabelSuffixColorFlow) {
      series[0].label.rich.suf.color = trueValue?.color
      series[0].label.rich.suf.fontSize = trueValue?.fontSize
      series[0].label.rich.suf.fontWeight = trueValue?.fontWeight
      series[0].label.rich.suf.fontFamily = trueValue?.fontFamily
    }

    series[0].label.formatter = param => {
      const { data } = param
      const _proportion = ((data.value / total) * 100).toFixed(proportion?.decimal)
      const _formattruevalue = numberForMat(data.value, trueValue?.numberformat)

      let name = data.name
      const findSeries = [...dataSeries].reverse().find(v => name && v.map?.displayName && v.map?.fieldName === name)
      data.itemTitle && (name = data.itemTitle)
      findSeries && (name = findSeries.map?.displayName)

      return `${
        seriesName?.display && name ? `{s|${name}${proportion?.display || trueValue?.display ? ':' : ''}}` : ''
      }${prefix?.display && trueValue?.display ? `{pre|${prefix.content}}` : ''}${
        trueValue?.display ? `{trueV|${_formattruevalue}}` : ''
      }${suffix?.display && trueValue?.display ? `{suf|${suffix.content}}` : ''}${
        proportion?.display ? `{prop|${_proportion}%}` : ''
      }`
    }
  }
  return { series }
}

export function getSecondSeries(props: LczBasicFunnelProps, _series: any, data: GeneralPieDataMap[]) {
  const {
    globalConfig = defaultFunnelGlobal,
    funnelConfig = defaultFunnelConfig,
    seriesConfig = {} as FunnelSeriesConfig
  } = props
  const { labelConfig = defaultFunnelLabel } = globalConfig
  const { dataSeries = [] } = seriesConfig
  const total = data.reduce((pre, item) => pre + item.value, 0)
  const series: any[] = []
  const _copySeries = cloneDeep(_series.series[0])
  series[0] = cloneDeep(_series.series[0])

  series[1] = _copySeries
  series[1].z = -10
  series[0].emphasis.label = { show: globalConfig.centerLabel?.display }
  if (labelConfig?.display) {
    const {
      verticalPosition,
      horizontalPosition,
      funnelLine,
      seriesName,
      proportion,
      trueValue = {} as LabelTureValue
    } = labelConfig
    const { prefix, suffix } = trueValue
    series[1].label.show = true
    series[1].label.position =
      funnelConfig.graphConfig?.funnelOrient == 'horizontal' ? horizontalPosition : verticalPosition

    series[1].label.rich = {
      s: {
        color: seriesName?.color,
        fontSize: seriesName?.fontSize,
        fontWeight: seriesName?.fontWeight,
        fontFamily: seriesName?.fontFamily
      },
      prop: {
        color: proportion?.propColorFollow && seriesName?.display ? seriesName?.color : proportion?.color,
        fontSize: proportion?.propColorFollow && seriesName?.display ? seriesName?.fontSize : proportion?.fontSize,
        fontWeight:
          proportion?.propColorFollow && seriesName?.display ? seriesName?.fontWeight : proportion?.fontWeight,
        fontFamily:
          proportion?.propColorFollow && seriesName?.display ? seriesName?.fontFamily : proportion?.fontFamily,
        padding: [0, 0, 0, proportion?.speed]
      },
      trueV: {
        color: trueValue.trueColorFollow && seriesName?.display ? seriesName?.color : trueValue?.color,
        fontSize: trueValue.trueColorFollow && seriesName?.display ? seriesName?.fontSize : trueValue?.fontSize,
        fontWeight: trueValue.trueColorFollow && seriesName?.display ? seriesName?.fontWeight : trueValue?.fontWeight,
        fontFamily: trueValue.trueColorFollow && seriesName?.display ? seriesName?.fontFamily : trueValue?.fontFamily,
        padding: [0, 0, 0, !prefix?.display ? trueValue?.speed : prefix?.xOffset]
        // !prefix?.display ? trueValue?.speed : prefix?.xOffset
        //  trueValue?.speed
      },
      pre: {
        color: prefix?.color,
        fontSize: prefix?.fontSize,
        fontWeight: prefix?.fontWeight,
        fontFamily: prefix?.fontFamily,
        padding: [prefix?.yOffset, 0, 0, trueValue?.speed]
      },
      suf: {
        color: suffix?.color,
        fontSize: suffix?.fontSize,
        fontWeight: suffix?.fontWeight,
        fontFamily: suffix?.fontFamily,
        padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
      }
    }

    if (trueValue?.trueColorFollow && prefix?.labelPrefixColorFlow && seriesName?.display) {
      series[1].label.rich.pre.color = seriesName?.color
      series[1].label.rich.pre.fontSize = seriesName?.fontSize
      series[1].label.rich.pre.fontWeight = seriesName?.fontWeight
      series[1].label.rich.pre.fontFamily = seriesName?.fontFamily
    } else if (prefix?.labelPrefixColorFlow) {
      series[1].label.rich.pre.color = trueValue?.color
      series[1].label.rich.pre.fontSize = trueValue?.fontSize
      series[1].label.rich.pre.fontWeight = trueValue?.fontWeight
      series[1].label.rich.pre.fontFamily = trueValue?.fontFamily
    }
    if (trueValue?.trueColorFollow && suffix?.labelSuffixColorFlow && seriesName?.display) {
      series[1].label.rich.suf.color = seriesName?.color
      series[1].label.rich.suf.fontSize = seriesName?.fontSize
      series[1].label.rich.suf.fontWeight = seriesName?.fontWeight
      series[1].label.rich.suf.fontFamily = seriesName?.fontFamily
    } else if (suffix?.labelSuffixColorFlow) {
      series[1].label.rich.suf.color = trueValue?.color
      series[1].label.rich.suf.fontSize = trueValue?.fontSize
      series[1].label.rich.suf.fontWeight = trueValue?.fontWeight
      series[1].label.rich.suf.fontFamily = trueValue?.fontFamily
    }

    series[1].label.formatter = param => {
      const { data } = param
      const _proportion = ((data.value / total) * 100).toFixed(proportion?.decimal)
      const _formattruevalue = numberForMat(data.value, trueValue?.numberformat)

      let name = data.name
      const findSeries = [...dataSeries].reverse().find(v => name && v.map?.displayName && v.map?.fieldName === name)
      data.itemTitle && (name = data.itemTitle)
      findSeries && (name = findSeries.map?.displayName)

      return `${
        seriesName?.display && name ? `{s|${name}${proportion?.display || trueValue?.display ? ':' : ''}} ` : ''
      }${prefix?.display && trueValue?.display ? `{pre|${prefix.content}}` : ''}${
        trueValue?.display ? `{trueV|${_formattruevalue}}` : ''
      }${suffix?.display && trueValue?.display ? `{suf|${suffix.content}}` : ''}${
        proportion?.display ? `{prop|${_proportion}%}` : ''
      }`
    }

    if (funnelLine?.display) {
      const { shadow } = funnelLine as FunnelLine
      series[1].labelLine.show = true
      series[1].labelLine.length = funnelLine.lineLength
      series[1].labelLine.lineStyle = {
        ...(series[1].labelLine.lineStyle || {}),
        type: funnelLine?.lineStyle,
        width: funnelLine?.lineWidth,
        opacity: (funnelLine?.opacity || 0) / 100,
        shadowBlur: shadow?.shadowBlur,
        shadowColor: shadow?.shadowColor,
        shadowOffsetX: shadow?.shadowOffsetX,
        shadowOffsetY: shadow?.shadowOffsetY
      }

      if (!funnelLine?.syncColor) {
        series[1].labelLine.lineStyle.color = funnelLine?.color
      }
    }
  }
  return { series: series }
}
