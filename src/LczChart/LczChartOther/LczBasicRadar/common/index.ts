import { trim } from 'lodash'
import { configDisplayCompatible, isEmpty, numberIsEmpty } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import {
  generalNumberFormat,
  generalShadowStyle,
  generalTipSuffixConfig,
  GeneralToolTip,
  generalYLabelBgStyle
} from '../../../common/generalValue'
import { GeneralLegend, GeneralRadarDataMap, GeneralTooltip, GeneralTooltipConfig } from '../../../common/type'
import {
  defaultDataMarkerValue,
  defaultSeriesAreaValue,
  defaultValueLabelValue
} from '../../../LczChartLine/LczBasicLine/commom/deafultValue'
import { LczBasicRadarProps, RadarAxisConfig, RadarDataSeries, RadarGlobalConfig, RadarSeriesConfig } from '../type'
import { deafultRadarBrokenLine } from './defaultValue'

//生成图例系列options
export const getRadarLegendOptions = (config: GeneralLegend, dataMemo: any, dataSeries: RadarDataSeries[]) => {
  let options: any = {}
  if (config.display) {
    const { size, iconConfig, seriesName, layout, clickInt = {} } = config

    // @ts-ignore
    const { disableStyles = '#ccc' } = clickInt
    const clicked = configDisplayCompatible(clickInt, 'clicked')

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

    const _data = Object.keys(dataMemo).filter(v => v !== '_none')

    const legendData: any = _data.map(v => {
      const textStyle = JSON.parse(JSON.stringify(_textStyle))

      if (numberIsEmpty(seriesName?.showWidth)) {
        textStyle.width = seriesName?.showWidth
        textStyle.overflow = seriesName?.overflow || 'initial'
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
        let _name = name
        const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name)

        if (findDataSeries && findDataSeries.map?.displayName) {
          _name = findDataSeries.map?.displayName
        } else {
          const findData = dataMemo[name]?.find((v: GeneralRadarDataMap) => v.seriesTitle)
          findData && (_name = findData.seriesTitle)
        }

        return `${seriesName?.display ? `{s|${_name}}` : ''}`
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

//生成series的option
export const getRadarSeriesOptions = (config: LczBasicRadarProps, dataMemo: any, stylesMemo: any[]) => {
  const options: any = {
    series: []
  }
  let i = 0

  const dataAnimate = config.globalConfig?.dataAnimate || false

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key]
      const _data = getRadarSeriesData(item, key, dataMemo)
      const brokenLine = stylesMemo[i]?.brokenLine || deafultRadarBrokenLine //折线
      const dataMarker = stylesMemo[i]?.dataMarker || defaultDataMarkerValue //数据标记
      const valueLabel = stylesMemo[i]?.valueLabel || defaultValueLabelValue //数值标签
      const seriesArea = stylesMemo[i]?.seriesArea || defaultSeriesAreaValue //区域
      const color = getEchartColor(stylesMemo[i].brokenLine.color)

      const _series: any = {
        type: 'radar',
        name: key === '_none' ? '' : key,
        symbolSize: [dataMarker.width, dataMarker.height],
        symbolRotate: dataMarker.rotate,
        lineStyle: {
          type: brokenLine.lineType,
          color,
          width: brokenLine.width,
          shadowBlur: brokenLine.shadow.shadowBlur,
          shadowColor: brokenLine.shadow.shadowColor,
          shadowOffsetX: brokenLine.shadow.shadowOffsetX,
          shadowOffsetY: brokenLine.shadow.shadowOffsetY,
          opacity: (brokenLine.opacity || 1) / 100
        },
        areaStyle: {
          color: getEchartColor(seriesArea.color),
          opacity: (seriesArea.opacity || 1) / 100,
          shadowBlur: seriesArea.shadow.shadowBlur,
          shadowColor: seriesArea.shadow.shadowColor,
          shadowOffsetX: seriesArea.shadow.shadowOffsetX,
          shadowOffsetY: seriesArea.shadow.shadowOffsetY
        },

        animation: dataAnimate,
        data: _data
      }

      if (dataMarker.markStyle === 'system') {
        _series.symbol = dataMarker.typeStyle
        _series.itemStyle = {
          borderColor: dataMarker.syncColor ? color : dataMarker.borderColor,
          borderWidth: dataMarker.lineWidth,
          color: dataMarker.syncColor ? color : getEchartColor(dataMarker.color),
          shadowBlur: dataMarker.shadowBlur,
          shadowColor: dataMarker.shadowColor
        }
      } else {
        _series.symbol = `image://${dataMarker.img}`
      }

      if (valueLabel.display) {
        _series.label = {
          show: true,
          fontFamily: valueLabel.valueStyle?.fontFamily,
          color: valueLabel.valueStyle?.color,
          fontSize: valueLabel.valueStyle?.fontSize,
          fontWeight: valueLabel.valueStyle?.fontWeight,
          rotate: valueLabel.valueStyle?.rotate,
          offset: [valueLabel.linePosition?.xOffset, valueLabel.linePosition?.yOffset],
          position: valueLabel.linePosition?.position,
          formatter: params => {
            const val = params.value
            if (val === null) return val

            return numberForMat(val, valueLabel.format)
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

//生成radar的options
export const getRadarOptions = (config: LczBasicRadarProps, dataMemo: any) => {
  let options: any = {}
  const {
    radarShape = 'polygon',
    radarAxisLabel,
    radarAxisName,
    radarAxisLine,
    radarAxisTick,
    radarAxisSplitLine,
    radarSplitArea
  } = config.radarAxisConfig as RadarAxisConfig

  const { margin = { x: 40, y: 50 } } = config.globalConfig as RadarGlobalConfig

  const { radarRadius = 66, extremumConfig = { maxValue: '', minValue: '' } } = config.seriesConfig as RadarSeriesConfig
  options = {
    radar: {
      radius: `${radarRadius}%`,
      center: [`${margin.x}%`, `${margin.y}%`],
      shape: radarShape,
      nameGap: radarAxisName.axisNameStyle.padding
    }
  }

  const _data: any[] = []
  let hasMin = false,
    hasMax = false

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key]
      item.forEach((v: GeneralRadarDataMap) => {
        v.min !== null && (hasMin = true)
        v.max !== null && (hasMax = true)
        !_data.some(item => item.name == v.indicator) && _data.push({ name: v.indicator, max: v.max, min: v.min })
      })
    }
  }

  if (extremumConfig.maxValue && !hasMax) {
    const _maxValue: any[] = extremumConfig.maxValue.split(',') || []
    _maxValue.forEach((v, i) => {
      i <= _data.length - 1 && !isNaN(Number(v)) && isEmpty(v) && (_data[i] = { ..._data[i], max: +v })
    })
  }
  if (extremumConfig.minValue && !hasMin) {
    const _minValue: any[] = extremumConfig.minValue.split(',') || []
    _minValue.forEach((v, i) => {
      i <= _data.length - 1 && !isNaN(Number(v)) && isEmpty(v) && (_data[i] = { ..._data[i], min: +v })
    })
  }

  options.radar.indicator = _data
  //处理标签
  if (radarAxisLabel.display) {
    const {
      isScale = true,
      splitNumber = 6,
      AxisSuffix,
      axisStyle,
      axisBgStyle = generalYLabelBgStyle,
      axisLabelShadow = generalShadowStyle,
      labelNumberFormat = generalNumberFormat
    } = radarAxisLabel

    options.radar.axisLabel = {
      show: true,
      fontFamily: axisStyle?.fontFamily,
      fontSize: axisStyle?.fontSize,
      color: axisStyle?.color,
      fontWeight: axisStyle?.fontWeight,
      backgroundColor: axisBgStyle?.backgroundColor,
      borderColor: axisBgStyle?.borderColor,
      borderWidth: axisBgStyle?.borderWidth,
      borderRadius: axisBgStyle?.borderRadius,
      margin: axisStyle?.padding,
      textShadowBlur: axisLabelShadow?.shadowBlur,
      textShadowColor: axisLabelShadow?.shadowColor,
      textShadowOffsetX: axisLabelShadow?.shadowOffsetX,
      textShadowOffsetY: axisLabelShadow?.shadowOffsetY,
      formatter: val => {
        const value = numberForMat(val, labelNumberFormat)
        return `${value}${AxisSuffix?.content}`
      }
    }
    !isNaN(Number(axisStyle?.width)) &&
      axisStyle?.width !== null &&
      ((options.radar.axisLabel.width = axisStyle?.width), (options.radar.axisLabel.overflow = axisStyle?.overflow))

    !isScale && (options.radar.splitNumber = splitNumber)
  } else {
    options.radar.axisLabel = {
      show: false
    }
  }

  //处理轴名称
  if (radarAxisName.display) {
    const { axisNameStyle, axisNameBgStyle, axisNameShadow } = radarAxisName

    options.radar.axisName = {
      show: true,
      fontFamily: axisNameStyle.fontFamily,
      fontSize: axisNameStyle.fontSize,
      color: axisNameStyle.color,
      fontWeight: axisNameStyle.fontWeight,
      backgroundColor: axisNameBgStyle?.backgroundColor,
      borderColor: axisNameBgStyle?.borderColor,
      borderWidth: axisNameBgStyle?.borderWidth,
      borderRadius: axisNameBgStyle?.borderRadius,
      shadowBlur: axisNameShadow?.shadowBlur,
      shadowColor: axisNameShadow?.shadowColor,
      shadowOffsetX: axisNameShadow?.shadowOffsetX,
      shadowOffsetY: axisNameShadow?.shadowOffsetY,
      formatter: val => {
        let name: string | undefined = ''
        const data = Object.values(dataMemo).flat() as GeneralRadarDataMap[]
        const titleSeries = data.find((v: GeneralRadarDataMap) => v.indicator == val && v.indicatorTitle)
        titleSeries ? (name = titleSeries.indicatorTitle) : (name = val)
        return name
      }
    }
  } else {
    options.radar.axisName = {
      show: false
    }
  }

  //处理轴线
  if (radarAxisLine.display) {
    // 处理轴线
    const { lineStyle, lineShadow = generalShadowStyle } = radarAxisLine
    const symbolType = { none: 'none', unilateral: ['none', 'arrow'], bothEnds: 'arrow' }
    options.radar.axisLine = {
      show: true,
      symbol: symbolType[lineStyle?.symbol || 'none'],
      lineStyle: {
        color: lineStyle?.color,
        opacity: (lineStyle?.opacity || 0) / 100,
        width: lineStyle?.width,
        type: lineStyle.lineType,
        shadowBlur: lineShadow.shadowBlur,
        shadowColor: lineShadow.shadowColor,
        shadowOffsetX: lineShadow.shadowOffsetX,
        shadowOffsetY: lineShadow.shadowOffsetY
      }
    }
    lineStyle?.symbol !== 'none' && (options.radar.axisLine.symbolSize = [lineStyle?.symbolW, lineStyle?.symbolH])
  } else {
    options.radar.axisLine = {
      show: false
    }
  }

  // 处理刻度
  if (radarAxisTick.display) {
    const { tickStyle, tickShadow = generalShadowStyle } = radarAxisTick
    options.radar.axisTick = {
      show: true,
      length: tickStyle?.length,
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
    options.radar.axisTick = {
      show: false
    }
  }

  // 处理分割线
  if (radarAxisSplitLine.display) {
    const { splitLineStyle, splitLineShadow = generalShadowStyle } = radarAxisSplitLine
    options.radar.splitLine = {
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
    options.radar.splitLine = {
      show: false
    }
  }

  //处理分割区域
  if (radarSplitArea.display) {
    const {
      radarSplitAreaStyle = { colorSeries: [], opacity: 1 },
      splitAreaShadow = generalShadowStyle
    } = radarSplitArea
    options.radar.splitArea = {
      show: true,
      areaStyle: {
        color: radarSplitAreaStyle?.colorSeries.map(v => v.value),
        opacity: (radarSplitAreaStyle?.opacity || 1) / 100,
        shadowBlur: splitAreaShadow.shadowBlur,
        shadowColor: splitAreaShadow.shadowColor,
        shadowOffsetX: splitAreaShadow.shadowOffsetX,
        shadowOffsetY: splitAreaShadow.shadowOffsetY
      }
    }
  } else {
    options.radar.splitArea = {
      show: false
    }
  }

  return options
}

// 生成提示框options
export const getRadarTooltipOptions = function (
  config: GeneralTooltipConfig,
  dataSeries: RadarDataSeries[],
  dataMemo: any
) {
  let options: any = {}

  function getTipStr(params: any) {
    let timeName = params?.seriesName || ''
    const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === timeName)
    if (findDataSeries && findDataSeries.map?.displayName) {
      timeName = findDataSeries.map?.displayName
    } else {
      const findData = dataMemo[timeName]?.find((v: GeneralRadarDataMap) => v.seriesTitle)
      findData && (timeName = findData.seriesTitle)
    }

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
    const allData = Uniq(Object.values(dataMemo).flat()) || []

    allData.forEach((param, index) => {
      let name: string | undefined = param?.indicator || '',
        suffixName: string | undefined = param?.indicator || ''
      const findSuffixSeries = tipSuffixConfig.tipSuffixSeries.filter(v => v.fieldName === suffixName && suffixName)

      if (findSuffixSeries.length) {
        suffixName = findSuffixSeries[findSuffixSeries.length - 1].content
      } else {
        suffixName = tipSuffixConfig.content
      }
      const { marker, value = [] } = params || {},
        data = Object.values(dataMemo).flat() as GeneralRadarDataMap[],
        titleSeries = data.find((v: GeneralRadarDataMap) => v.indicator == name && v.indicatorTitle),
        _val = value[index]
      titleSeries && (name = titleSeries.indicatorTitle)
      markStr += `<span>${marker}</span>`
      nameStr += `<span>${name}</span>`
      valueStr += `<span style="width:100%;text-align:right">${_val === null ? '-' : _val}</span>`
      suffixStr += `
             <span 
               style="
               visibility:${suffixName && tipSuffixConfig.display ? 'visible' : 'hidden'};
               position: relative;
               top:${tipSuffixConfig.yOffset}px;
               margin-left: ${tipSuffixConfig.gap}px;
               font-family:${suffixTipStyle?.fontFamily};
               font-size: ${suffixTipStyle?.fontSize}px;
               font-weight: ${suffixTipStyle?.fontWeight};
               color:${suffixTipStyle?.color};
               font-style: ${suffixTipStyle?.fontStyle};
             ">
             ${suffixName || '后缀'}
             </span>
        `
    })
    return `${str}<div class='lcz-chart-tooltip-item'>${markStr}</div>${nameStr}</div>${valueStr}</div>${suffixStr}</div></div></div>`
  }

  if (config?.hoverTrigger?.display) {
    const { hoverTrigger, tooltip = GeneralToolTip.tooltip as GeneralTooltip } = config
    const { tipposition, tipStyle } = tooltip

    options = {
      tooltip: {
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

function Uniq(arr: any[]) {
  return arr.reduce((t, v) => (t.some(i => i.indicator == v.indicator) ? t : [...t, v]), [])
}

function getRadarSeriesData(data, name, dataMemo) {
  const _arr: any = []

  const allData = Uniq(Object.values(dataMemo).flat()),
    currentData = Uniq(data)

  allData.forEach(v => {
    const _item = currentData.find(item => item.indicator == v.indicator)

    _arr.push(_item === undefined ? null : _item.value)
  })

  return [{ name, value: _arr }]
}

export function getIsNumber(val: any) {
  return val !== null && trim(val) !== '' && !isNaN(val)
}
