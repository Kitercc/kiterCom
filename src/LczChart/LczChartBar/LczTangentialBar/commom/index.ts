import { configDisplayCompatible, formatStr } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import {
  generalAngleAxisLabel,
  generalAxisBgStyle,
  generalAxisLine,
  generalAxisSplitArea,
  generalAxisSplitLine,
  generalAxisTick,
  generalAxisUnit,
  generalNumberFormat,
  generalRadialAxisLabel,
  generalShadowStyle,
  generalTipSuffixConfig,
  GeneralToolTip,
  generalYLabelBgStyle
} from '../../../common/generalValue'
import { AngleAxis, GeneralDataMap, GeneralTooltip, GeneralTooltipConfig, RadialAxis } from '../../../common/type'
import { getChars } from '../../../common/utils'
import { LegendConfig, TureValue } from '../../../LczChartPie/Lcz3dTorus/type'
import {
  BasPieLegendProportion,
  BasPieLegendTureValue,
  BasPiePrefixsuffix,
  BSPieLegendConfig
} from '../../../LczChartPie/LczBasicPie/type'
import { ValueLabel } from '../../LczBasicBar/type'
import { LczTangentialBarProps, PoleConfig, TangDataSeries } from '../type'
import { defaultPoleConfig, defaultTangValueLabel } from './deafultValue'

//极柱图内外半径
export function getPolar(config: LczTangentialBarProps) {
  const margin = config.globalConfig?.margin || { x: 50, y: 50 }
  const poleConfig = config.globalConfig?.poleConfig || (defaultPoleConfig as PoleConfig) //极柱样式

  const options: any = {
    polar: {
      radius: [`${poleConfig.pillarStyle?.inRadius}%`, `${poleConfig.pillarStyle?.outRadius}%`],
      center: [`${margin.x}%`, `${margin.y}%`]
    }
  }
  return options
}

function getSeriesData(data) {
  const _data = data.map((v: any) => {
    const _data: any = {
      name: v.category,
      value: [v.category, v.value],
      ids: v._ids,
      itemStyle: {}
    }

    return _data
  })
  return _data
}
//生成极柱serires
export const getTangSeriesOptions = (
  config: LczTangentialBarProps,
  dataMemo: any,
  colors: any[],
  pillarTypeArr: any[]
) => {
  const options: any = {
    series: []
  }

  let i = 0
  const poleConfig = config.globalConfig?.poleConfig || (defaultPoleConfig as PoleConfig) //极柱样式
  const valueLabel = config.globalConfig?.valueLabel || (defaultTangValueLabel as ValueLabel) // 数值标签
  const dataAnimate = config.globalConfig?.dataAnimate || false

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key]

      const _data = getSeriesData(item)

      const color = getEchartColor(colors[i])

      const _series: any = {
        type: 'bar',
        name: key === '_none' ? '' : key,
        coordinateSystem: 'polar',
        roundCap: pillarTypeArr[i].display ? pillarTypeArr[i].roundCap : poleConfig.pillarStyle?.roundCap,
        barGap: `${poleConfig.pillarStyle?.bargap}%`,
        barCategoryGap: `${poleConfig.pillarStyle?.barCategoryGap}%`,
        itemStyle: {
          color
        },
        showBackground: poleConfig.pillarBgStyle?.display,
        backgroundStyle: {
          color: poleConfig.pillarBgStyle?.color,
          opacity: (poleConfig.pillarBgStyle?.opacity || 0) / 100
        },
        animation: dataAnimate,
        data: _data
      }

      if (valueLabel.display) {
        _series.label = {
          show: true,
          fontFamily: valueLabel.valueStyle?.fontFamily,
          color: valueLabel.valueStyle?.color,
          fontSize: valueLabel.valueStyle?.fontSize,
          fontWeight: valueLabel.valueStyle?.fontWeight,
          offset: [valueLabel.valueStyle?.xOffset, valueLabel.valueStyle?.yOffset],
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

      options.series.push(_series)
    }
    i++
  }

  return options
}

// 生成极轴坐标轴配置
export const getTangAxisOptions = (
  config: RadialAxis | AngleAxis,
  dataMemo: any,
  type: 'raius' | 'angle' | 'radialRaius' | 'radialAxis'
) => {
  const mType = {
    raius: 'radiusAxis',
    angle: 'angleAxis',
    radialRaius: 'angleAxis',
    radialAxis: 'radiusAxis'
  }[type]
  let options: any = {}
  const {
    axisLine = generalAxisLine,
    axisTick = generalAxisTick,
    axisSplitLine = generalAxisSplitLine,
    axisSplitArea = generalAxisSplitArea
  } = config

  options = {
    [mType]: {
      show: config.display
    }
  }
  // 处理轴单位
  switch (type) {
    case 'raius':
    case 'radialRaius':
      {
        const { axisUnit = generalAxisUnit } = config as RadialAxis
        if (axisUnit.display) {
          const { content = '', nameLocation = 'end', unitStyle, unitShadow = generalShadowStyle } = axisUnit
          ;(options[mType].name = content), (options[mType].nameLocation = nameLocation)
          options[mType].nameRotate = unitStyle?.nameRotate
          options[mType].nameTextStyle = {
            fontFamily: unitStyle?.fontFamily,
            fontSize: unitStyle?.fontSize,
            color: unitStyle?.color,
            fontWeight: unitStyle?.fontWeight,
            overflow: unitStyle?.overflow,
            backgroundColor: unitStyle?.backgroundColor,
            borderColor: unitStyle?.borderColor,
            borderWidth: unitStyle?.borderWidth,
            borderRadius: unitStyle?.borderRadius,
            textShadowBlur: unitShadow?.shadowBlur,
            textShadowColor: unitShadow?.shadowColor,
            textShadowOffsetX: unitShadow?.shadowOffsetX,
            textShadowOffsetY: unitShadow?.shadowOffsetY
          }

          !isNaN(Number(unitStyle?.width)) &&
            unitStyle?.width !== null &&
            (options[mType].nameTextStyle.width = unitStyle?.width)
        } else {
          options[mType].name = ''
        }
      }
      break
  }

  // 处理轴线
  if (axisLine.display) {
    const { lineStyle, lineShadow = generalShadowStyle } = axisLine
    const symbolType = { none: 'none', unilateral: ['none', 'arrow'], bothEnds: 'arrow' }
    options[mType].axisLine = {
      show: true,
      symbol: symbolType[lineStyle?.symbol || 'none'],
      lineStyle: {
        color: lineStyle?.color,
        opacity: (lineStyle?.opacity || 0) / 100,
        width: lineStyle?.width,
        shadowBlur: lineShadow.shadowBlur,
        shadowColor: lineShadow.shadowColor,
        shadowOffsetX: lineShadow.shadowOffsetX,
        shadowOffsetY: lineShadow.shadowOffsetY
      }
    }
    lineStyle?.symbol !== 'none' && (options[mType].axisLine.symbolSize = [lineStyle?.symbolW, lineStyle?.symbolH])
  } else {
    options[mType].axisLine = {
      show: false
    }
  }

  // 处理刻度
  if (axisTick.display) {
    const { tickStyle, tickShadow = generalShadowStyle } = axisTick
    options[mType].axisTick = {
      show: true,
      length: tickStyle?.length,
      inside: tickStyle?.inside === 'in',
      lineStyle: {
        color: tickStyle?.color,
        opacity: (tickStyle?.opacity || 0) / 100,
        type: tickStyle?.type,
        width: tickStyle?.width,
        shadowBlur: tickShadow.shadowBlur,
        shadowColor: tickShadow.shadowColor,
        shadowOffsetX: tickShadow.shadowOffsetX,
        shadowOffsetY: tickShadow.shadowOffsetY
      }
    }
  } else {
    options[mType].axisTick = {
      show: false
    }
  }

  // 处理分割线
  if (axisSplitLine.display) {
    const { splitLineStyle, splitLineShadow = generalShadowStyle } = axisSplitLine
    options[mType].splitLine = {
      show: true,
      lineStyle: {
        type: splitLineStyle?.lineType,
        color: splitLineStyle?.color,
        opacity: (splitLineStyle?.opacity || 0) / 100,
        width: splitLineStyle?.width,
        shadowBlur: splitLineShadow.shadowBlur,
        shadowColor: splitLineShadow.shadowColor,
        shadowOffsetX: splitLineShadow.shadowOffsetX,
        shadowOffsetY: splitLineShadow.shadowOffsetY
      }
    }
  } else {
    options[mType].splitLine = {
      show: false
    }
  }

  //处理分割区域
  if (axisSplitArea.display) {
    const { splitAreaStyle = { colorSeries: [], opacity: 1 }, splitAreaShadow = generalShadowStyle } = axisSplitArea
    options[mType].splitArea = {
      show: true,
      areaStyle: {
        color: splitAreaStyle?.colorSeries.map(v => v.value),
        opacity: (splitAreaStyle?.opacity || 1) / 100,
        shadowBlur: splitAreaShadow.shadowBlur,
        shadowColor: splitAreaShadow.shadowColor,
        shadowOffsetX: splitAreaShadow.shadowOffsetX,
        shadowOffsetY: splitAreaShadow.shadowOffsetY
      }
    }
  } else {
    options[mType].splitArea = {
      show: false
    }
  }

  switch (type) {
    case 'raius':
    case 'radialAxis': {
      const { axisLabel = generalRadialAxisLabel } = config as RadialAxis
      const {
        spaceType = 'auto',
        space = 0,
        textRotate = 0,
        axisStyle,
        axisBgStyle = generalAxisBgStyle,
        axisLabelShadow = generalShadowStyle
      } = axisLabel
      options[mType].type = 'category'
      const _data: string[] = []
      for (const key in dataMemo) {
        if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
          const item = dataMemo[key]
          item.forEach((v: GeneralDataMap) => {
            !_data.includes(v.category) && _data.push(v.category)
          })
        }
      }
      options[mType].data = _data
      if (axisLabel.display) {
        axisLabel.startAngle !== undefined && (options[mType].startAngle = axisLabel.startAngle)
        axisLabel.clockwise !== undefined && (options[mType].clockwise = axisLabel.clockwise)

        options[mType].axisLabel = {
          show: true,
          margin: axisStyle?.padding,
          fontFamily: axisStyle?.fontFamily,
          fontSize: axisStyle?.fontSize,
          color: axisStyle?.color,
          fontWeight: axisStyle?.fontWeight,
          backgroundColor: axisBgStyle?.backgroundColor,
          borderColor: axisBgStyle?.borderColor,
          borderWidth: axisBgStyle?.borderWidth,
          borderRadius: axisBgStyle?.borderRadius,
          textShadowBlur: axisLabelShadow?.shadowBlur,
          textShadowColor: axisLabelShadow?.shadowColor,
          textShadowOffsetX: axisLabelShadow?.shadowOffsetX,
          textShadowOffsetY: axisLabelShadow?.shadowOffsetY,
          align: axisStyle?.align || 'center',
          formatter: val => {
            let name: string | undefined = ''
            const data = Object.values(dataMemo).flat() as GeneralDataMap[]
            const titleSeries = data.find((v: GeneralDataMap) => v.category == val && v.categoryTitle)
            titleSeries ? (name = titleSeries.categoryTitle) : (name = val)
            return name
          }
        }
        const _num = {
          auto: () => {},
          showAll: () => {
            options[mType].axisLabel.interval = 0
          },
          none: () => {
            options[mType].axisLabel.interval = space
          }
        }
        _num[spaceType] && _num[spaceType]()
        options.radiusAxis.axisLabel.rotate = textRotate

        let showWidth = NaN
        if (!isNaN(Number(axisStyle?.width)) && axisStyle?.width !== null) {
          showWidth = axisStyle?.width || NaN
        }

        const showType = axisStyle?.showType || 'actualLength',
          overflow = axisStyle?.overflow || 'none'
        if ((overflow === 'truncate' || overflow === 'breakAll') && showType === 'outOfCharacter') {
          // 按字符数
          const preFormatter = options[mType].axisLabel.formatter,
            chartNum = axisStyle?.charNumber || 0
          options[mType].axisLabel.formatter = val => {
            let str = preFormatter(val) || ''
            str = formatStr(str, chartNum, '\n', overflow === 'truncate')
            return str
          }
        } else {
          if (!isNaN(showWidth)) {
            options[mType].axisLabel.width = showWidth
            options[mType].axisLabel.overflow = overflow
          }
        }
      } else {
        options[mType].axisLabel = {
          show: false
        }
      }
      break
    }
    case 'angle':
    case 'radialRaius': {
      const { yaxisLabel = generalAngleAxisLabel } = config as AngleAxis
      if (yaxisLabel.display) {
        const {
          min,
          max,
          splitAuto = true,
          splitNumber = 6,
          suffixConfig,
          yLabelStyle,
          yLabelBgStyle = generalYLabelBgStyle,
          yLabelShadow = generalShadowStyle,
          format = generalNumberFormat
        } = yaxisLabel
        yaxisLabel.startAngle !== undefined && (options[mType].startAngle = yaxisLabel.startAngle)
        yaxisLabel.clockwise !== undefined && (options[mType].clockwise = yaxisLabel.clockwise)
        options[mType].axisLabel = {
          show: true,
          rotate: yLabelStyle?.interval,
          fontFamily: yLabelStyle?.fontFamily,
          fontSize: yLabelStyle?.fontSize,
          color: yLabelStyle?.color,
          fontWeight: yLabelStyle?.fontWeight,
          backgroundColor: yLabelBgStyle?.backgroundColor,
          borderColor: yLabelBgStyle?.borderColor,
          borderWidth: yLabelBgStyle?.borderWidth,
          borderRadius: yLabelBgStyle?.borderRadius,
          margin: yLabelStyle?.padding,
          textShadowBlur: yLabelShadow?.shadowBlur,
          textShadowColor: yLabelShadow?.shadowColor,
          textShadowOffsetX: yLabelShadow?.shadowOffsetX,
          textShadowOffsetY: yLabelShadow?.shadowOffsetY,
          align: yLabelStyle?.align || 'center',
          formatter: val => {
            const value = numberForMat(val, format)
            return `${value}${suffixConfig?.content}`
          }
        }

        let showWidth = NaN
        if (!isNaN(Number(yLabelStyle?.showWidth)) && yLabelStyle?.showWidth !== null) {
          showWidth = yLabelStyle?.showWidth || NaN
        }

        const showType = yLabelStyle?.showType || 'actualLength',
          overflow = yLabelStyle?.overflow || 'none'
        if ((overflow === 'truncate' || overflow === 'breakAll') && showType === 'outOfCharacter') {
          // 按字符数
          const preFormatter = options[mType].axisLabel.formatter,
            chartNum = yLabelStyle?.charNumber || 0
          options[mType].axisLabel.formatter = val => {
            let str = preFormatter(val) || ''
            str = formatStr(str, chartNum, '\n', overflow === 'truncate')
            return str
          }
        } else {
          if (!isNaN(showWidth)) {
            options[mType].axisLabel.width = showWidth
            options[mType].axisLabel.overflow = overflow
          }
        }

        !isNaN(Number(min)) && min !== null && (options[mType].min = min)
        !isNaN(Number(max)) && max !== null && (options[mType].max = max)
        !splitAuto && (options[mType].splitNumber = splitNumber)
      } else {
        options[mType].axisLabel = {
          show: false
        }
      }
      break
    }
  }

  return options
}

// 生成极柱图 图例options
export const getTangLegendOptions = (
  config: BSPieLegendConfig | LegendConfig,
  dataMemo: any,
  dataSeries: TangDataSeries[],
  colors: string[],
  singleSeries = false
) => {
  let options: any = {}
  if (config.display) {
    const seriesTotal: any =
      (Object.values(dataMemo) || []).flat().reduce((pre: number, item: any) => pre + (item.value || 0) * 10, 0) / 10

    const _series = 'series'
    const _seriesTitle = 'seriesTitle'
    const { size, iconConfig, seriesName, proportion, trueValue = {} as TureValue, layout, clickInt = {} } = config
    const { prefix, suffix } = trueValue
    // @ts-ignore
    const { disableStyles = '#ccc' } = clickInt
    const clicked = configDisplayCompatible(clickInt, 'clicked')

    const objData = dataMemo

    //#region
    const _textStyle: any = {
      rich: {}
    }
    seriesName &&
      ((_textStyle.rich.s = {
        color: seriesName?.color,
        fontSize: seriesName?.fontSize,
        fontWeight: seriesName?.fontWeight,
        fontFamily: seriesName?.fontFamily
      }),
      // @ts-ignore
      config?.spacing ? (_textStyle.rich.s.padding = [0, config?.spacing]) : null)

    proportion &&
      (_textStyle.rich.proportion = {
        color: proportion?.color,
        fontSize: proportion?.fontSize,
        fontWeight: proportion?.fontWeight,
        fontFamily: proportion?.fontFamily,
        padding: [0, 0, 0, proportion?.speed]
      })
    trueValue &&
      (_textStyle.rich.trueValue = {
        color: trueValue?.color,
        fontSize: trueValue?.fontSize,
        fontWeight: trueValue?.fontWeight,
        fontFamily: trueValue?.fontFamily,
        padding: [0, 0, 0, trueValue?.speed]
      })
    prefix &&
      (_textStyle.rich.prefix = {
        color: prefix?.color,
        fontSize: prefix?.fontSize,
        fontWeight: prefix?.fontWeight,
        fontFamily: prefix?.fontFamily,
        padding: [prefix?.yOffset, 0, 0, prefix?.xOffset]
      })

    suffix &&
      (_textStyle.rich.suffix = {
        color: suffix?.color,
        fontSize: suffix?.fontSize,
        fontWeight: suffix?.fontWeight,
        fontFamily: suffix?.fontFamily,
        padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
      })
    //#endregion

    const _data = Object.keys(dataMemo).filter(v => v !== '_none')

    const legendData: any = _data.map(v => {
      const textStyle = JSON.parse(JSON.stringify(_textStyle))

      const _proportion = { ...(proportion || {}) } as BasPieLegendProportion
      const _trueValue = { ...(trueValue || {}) } as BasPieLegendTureValue
      const _prefix = { ...(prefix || {}) } as BasPiePrefixsuffix
      const _suffix = { ...(suffix || {}) } as BasPiePrefixsuffix
      if (_proportion?.legendProportionColorFollow) {
        textStyle.rich.proportion.color = seriesName?.color
        textStyle.rich.proportion.fontSize = seriesName?.fontSize
        textStyle.rich.proportion.fontWeight = seriesName?.fontWeight
        textStyle.rich.proportion.fontFamily = seriesName?.fontFamily
      }

      if (_trueValue.legendTrueColorFollow) {
        textStyle.rich.trueValue.color = seriesName?.color
        textStyle.rich.trueValue.fontSize = seriesName?.fontSize
        textStyle.rich.trueValue.fontWeight = seriesName?.fontWeight
        textStyle.rich.trueValue.fontFamily = seriesName?.fontFamily
      }

      if (_prefix.prefixColorFollow && _trueValue.legendTrueColorFollow) {
        textStyle.rich.prefix.color = seriesName?.color
        textStyle.rich.prefix.fontSize = seriesName?.fontSize
        textStyle.rich.prefix.fontWeight = seriesName?.fontWeight
        textStyle.rich.prefix.fontFamily = seriesName?.fontFamily
      } else if (_prefix.prefixColorFollow) {
        textStyle.rich.prefix.color = _trueValue?.color
        textStyle.rich.prefix.fontSize = _trueValue?.fontSize
        textStyle.rich.prefix.fontWeight = _trueValue?.fontWeight
        textStyle.rich.prefix.fontFamily = _trueValue?.fontFamily
      }

      if (_suffix.suffixColorFollow && _trueValue.legendTrueColorFollow) {
        textStyle.rich.suffix.color = seriesName?.color
        textStyle.rich.suffix.fontSize = seriesName?.fontSize
        textStyle.rich.suffix.fontWeight = seriesName?.fontWeight
        textStyle.rich.suffix.fontFamily = seriesName?.fontFamily
      } else if (_suffix.suffixColorFollow) {
        textStyle.rich.suffix.color = _trueValue?.color
        textStyle.rich.suffix.fontSize = _trueValue?.fontSize
        textStyle.rich.suffix.fontWeight = _trueValue?.fontWeight
        textStyle.rich.suffix.fontFamily = _trueValue?.fontFamily
      }

      return {
        name: v,
        icon: iconConfig?.iconType === 'system' ? iconConfig.systemStyle : `image://${iconConfig?.customUrl}`,
        itemWidth: size?.w,
        itemHeight: size?.h,
        textStyle
      }
    })

    const _legend = {
      show: true,
      itemWidth: size?.w,
      itemHeight: size?.h,
      orient: layout?.orient,
      itemGap: layout?.itemGap,
      selectedMode: clicked,
      inactiveColor: disableStyles,
      formatter: name => {
        let seriesText = name
        const itemdata = objData[name] || []

        if (!singleSeries) {
          const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name)

          if (findDataSeries && findDataSeries.map?.displayName) {
            seriesText = findDataSeries.map?.displayName
          } else {
            const findData = Array.isArray(dataMemo)
              ? dataMemo.find((v: any) => v?.[_series] === name && v?.[_seriesTitle])
              : dataMemo[name]?.find((v: any) => v?.[_seriesTitle])
            findData && (seriesText = findData?.[_seriesTitle])
          }
        }

        const value = (itemdata.reduce((t, v) => t + v.value * 10, 0) || 0) / 10

        let trueText = numberForMat(value, trueValue?.numberformat)
        let proportionText: any = proportion ? ((value / seriesTotal) * 100).toFixed(proportion?.decimal) : 0
        const prefixText = prefix?.display && trueValue?.display ? `{prefix|${prefix.content}}` : ''
        const suffixText = suffix?.display && trueValue?.display ? `{suffix|${suffix.content}}` : ''
        proportionText = isNaN(proportionText) ? 0 : proportionText

        /** 处理显示字符数*/
        seriesText = seriesName?.display ? `{s|${getChars(seriesText, seriesName.charNums)}}` : ''
        trueText = trueValue?.display ? `{trueValue|${getChars(trueText, trueValue.charNums)}}` : ''
        proportionText = proportion?.display
          ? `{proportion|${getChars(`${proportionText}%`, proportion.charNums)}}`
          : ''
        /** */

        return `${seriesText}${prefixText}${trueText}${suffixText}${proportionText}`
      }
    }

    const position: any = {}
    if (layout?.distributionMode === 'unilateral') {
      layout.xPosition !== 'auto' ? (position.x = layout.xPosition) : (position.left = layout.xOffset)
      layout.yPosition !== 'auto' ? (position.y = layout.yPosition) : (position.top = layout.yOffset)

      options = {
        legend: [
          {
            ..._legend,
            ...position,
            data: legendData
          },
          {
            data: []
          }
        ]
      }
    } else {
      const middleVal = Math.ceil(legendData.length / 2)
      const option: any = {
        '0': {},
        '1': {}
      }
      layout?.layoutmode === 'leftright'
        ? ((option['0'] = { x: 'left', y: 'center' }), (option['1'] = { x: 'right', y: 'center' }))
        : ((option['0'] = { x: 'center', y: 'top' }), (option['1'] = { x: 'center', y: 'bottom' }))

      _legend.orient = layout?.layoutmode === 'leftright' ? 'vertical' : 'horizontal'

      options = {
        legend: [
          {
            ..._legend,
            ...option['0'],
            data: legendData.slice(0, middleVal)
          },
          {
            ..._legend,
            ...option['1'],
            data: legendData.slice(middleVal)
          }
        ]
      }
    }
  } else {
    options = {
      legend: [
        {
          show: false
        },
        {
          show: false
        }
      ]
    }
  }
  return options
}

// 生成提示框options
export const getTangTooltipOptions = function (
  this: any,
  config: GeneralTooltipConfig,
  dataSeries: TangDataSeries[],
  uuid: string,
  {
    dataMemo,
    chartType = 'tang',
    singleSeries = false
  }: { dataMemo?: any; chartType?: 'tang' | 'radial'; singleSeries?: boolean }
) {
  let options: any = {}

  function getTipStr(params: any) {
    let timeName = params?.[0]?.name || ''

    const data = Object.values(dataMemo).flat() as GeneralDataMap[],
      titleSeries = data.find((v: GeneralDataMap) => v.category == timeName && v.categoryTitle)

    titleSeries && (timeName = titleSeries.categoryTitle)

    const tipStyle = config?.tooltip?.tipStyle,
      tipSuffixConfig = config?.tipSuffixConfig || generalTipSuffixConfig,
      suffixTipStyle = tipSuffixConfig.tipTextStyle.tipSuffixStyleAsync
        ? tipStyle?.textStyle
        : tipSuffixConfig.tipTextStyle
    const str: any = `<div class="lcz-chart-tooltip" style="font-family:${tipStyle?.textStyle?.fontFamily};
          font-size: ${tipStyle?.textStyle?.fontSize}px;
          font-weight: ${tipStyle?.textStyle?.fontWeight};
          color:${tipStyle?.textStyle?.color};
          font-style: ${tipStyle?.textStyle?.fontStyle};"><div>${timeName}</div>`
    let markStr: any = `
        <div class="lcz-tooltip-mark">
        `
    let nameStr: any = `
        <div class="lcz-tooltip-name">
        `
    let valueStr: any = `
        <div class="lcz-tooltip-value">
        `
    let suffixStr: any = `
        <div class="lcz-tooltip-suffix">
        `
    params.forEach(param => {
      let name = param?.seriesName || '',
        suffixName = param?.seriesName || ''
      const { marker, value } = param || {},
        _val = chartType === 'radial' ? value[0] : value[1]
      const findSuffixSeries = tipSuffixConfig.tipSuffixSeries.filter(v => v.fieldName === suffixName && suffixName)

      if (findSuffixSeries.length) {
        suffixName = findSuffixSeries[findSuffixSeries.length - 1].content
      } else {
        suffixName = tipSuffixConfig.content
      }
      if (!singleSeries) {
        const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name)
        if (findDataSeries && findDataSeries.map?.displayName) {
          name = findDataSeries.map?.displayName
        } else {
          const findData = dataMemo[name]?.find((v: GeneralDataMap) => v.seriesTitle)
          findData && (name = findData.seriesTitle)
        }
      }

      markStr += `<span>${marker}</span>`
      nameStr += `<span>${name}</span>`
      valueStr += `<span style="width:100%;text-align:right">${_val === null ? '-' : _val}</span>`
      suffixStr += `
          <div 
             style="
             visibility:${suffixName && tipSuffixConfig.display ? 'visible' : 'hidden'};
             position: relative;
             top:${tipSuffixConfig.yOffset}px;
             margin-left: ${tipSuffixConfig.gap}px;
           ">
             <span 
               style="
               font-family:${suffixTipStyle?.fontFamily};
               font-size: ${suffixTipStyle?.fontSize}px;
               font-weight: ${suffixTipStyle?.fontWeight};
               color:${suffixTipStyle?.color};
               font-style: ${suffixTipStyle?.fontStyle};
             ">
             ${suffixName || '后缀'}
             </span>
           </div>
        `
    })
    return `${str}<div class='lcz-chart-tooltip-item'>${markStr}</div>${nameStr}</div>${valueStr}</div>${suffixStr}</div></div></div>`
  }

  if (config?.hoverTrigger?.display) {
    const { hoverTrigger, tooltip = GeneralToolTip.tooltip as GeneralTooltip, indicator } = config
    const { tipposition, tipStyle } = tooltip

    options = {
      tooltip: {
        trigger: 'axis',
        show: true,
        textStyle: {
          fontFamily: tipStyle?.textStyle?.fontFamily,
          fontSize: tipStyle?.textStyle?.fontSize,
          fontWeight: tipStyle?.textStyle?.fontWeight,
          color: tipStyle?.textStyle?.color,
          fontStyle: tipStyle?.textStyle?.fontStyle
        },
        alwaysShowContent: hoverTrigger?.alwaysShowContent,
        padding: [tipposition?.margin?.t, tipposition?.margin?.r, tipposition?.margin?.b, tipposition?.margin?.l],
        backgroundColor: tipStyle?.bgStyle?.backgroundColor,
        borderColor: tipStyle?.bgStyle?.borderColor,
        borderWidth: tipStyle?.bgStyle?.borderWidth,
        borderRadius: tipStyle?.bgStyle?.borderRadius,
        shadowBlur: tipStyle?.bgStyle?.shadowBlur,
        shadowColor: tipStyle?.bgStyle?.shadowColor,
        shadowOffsetX: tipStyle?.bgStyle?.shadowOffsetX,
        shadowOffsetY: tipStyle?.bgStyle?.shadowOffsetY,
        className: `lcz-chart-tooltip-wrapper ${tipStyle?.bgStyle?.className}`,
        formatter: params => {
          const tip = getTipStr(params)
          return tip
        }
      }
    }

    if (indicator) {
      options.tooltip.axisPointer = {
        type: indicator?.type
      }
    }
    tipposition?.offsetType === 'custom' &&
      (options.tooltip.position = [`${tipposition?.xPosition}%`, `${tipposition?.yPosition}%`])
  } else {
    options = {
      tooltip: {
        show: false
      }
    }
  }
  return options
}
