/* eslint-disable indent */
import * as echarts from 'echarts/core'
import { LegendConfig, DataSeries, TureValue, Proportion, Prefixsuffix } from '../LczChartPie/Lcz3dTorus/type'
import { numberForMat } from '../../LczCarouselTable/common'
import { array2obj, getChars, getUsableSvgPath, machiningSvgPath } from './utils'
import moment from 'moment'
import { abridgeDayName, configDisplayCompatible, dayName, formatStr, numberIsEmpty } from '../../common/util'
import {
  GeneralMarkingSeries,
  GeneralMarkPointSeries,
  GeneralSubTitle,
  GeneralTitle,
  GeneralToolBox,
  GeneralTooltip,
  GeneralTooltipConfig,
  GeneralXAxis,
  GeneralYAxis,
  GeneralDataMap,
  GeneralPieDataMap,
  GenStrackSeries,
  GeneralLegend,
  GeneralLegendPager
} from './type'
import { LineDataSeries } from '../LczChartLine/LczBasicLine/type'
import {
  generalYLabelBgStyle,
  generalAxisBgStyle,
  generalAxisLine,
  generalAxisSplitLine,
  generalAxisTick,
  generalAxisUnit,
  generalShadowStyle,
  generalxAxisLabel,
  generalNumberFormat,
  GeneralToolTip,
  generalTipSuffixConfig
} from './generalValue'
import {
  BasPieLegendProportion,
  BasPieLegendTureValue,
  BasPiePrefixsuffix,
  BSPieLegendConfig,
  PieLegendSeriesName
} from '../LczChartPie/LczBasicPie/type'
import { ScatterXAxis } from '../LczChartScatter/LczBasicScatter/type'
import { BarLineLegendConfig } from '../LczChartBlend/LczBasicLineBar/type'
import { mLegendIcon } from './material'
import { AreaDataSeries } from '../LczChartLine/LczBasicArea/type'

export function getEchartColor(color: any, type?: 'linear' | 'radial') {
  type = type || 'linear'

  if (typeof color === 'string') return color

  const echartsColors = {
    linear: (...arg) => {
      //@ts-ignore
      return new echarts.graphic.LinearGradient(...arg)
    },
    radial: (...arg) => {
      // @ts-ignore
      return new echarts.graphic.RadialGradient(...arg)
    }
  }

  const radius = {
    1: [0, 0, 0, 1], // 上往下
    2: [0, 1, 0, 0], // 下往上
    3: [0, 0, 1, 0], // 左往右
    4: [1, 0, 0, 0] // 右往左
  }

  if (Array.isArray(color)) {
    const _radius = radius['3']
    let myColor: any = null
    if (color.length === 1) return color[0]
    if (color.length === 2) {
      myColor = [
        { offset: 0, color: color[0] },
        { offset: 0.5, color: color[0] },
        { offset: 0.5, color: color[1] },
        { offset: 1, color: color[1] }
      ]
    } else if (color.length % 2 === 0) {
      const midden = color.length / 2,
        step = 1 / (color.length - 1)
      myColor = color.map((item, i) => {
        let offset = i * step
        if (i === midden || i === midden - 1) offset = 0.5
        return {
          offset,
          color: item
        }
      })
    } else {
      const midden = Math.ceil(color.length / 2),
        step = 1 / (color.length - 1)
      myColor = color
        .map((item, i) => {
          const offset = i * step
          if (i === midden - 1) {
            return [
              { offset: 0.5, color: item },
              { offset: 0.5, color: item }
            ]
          }
          return {
            offset,
            color: item
          }
        })
        .flat()
    }

    switch (type) {
      case 'linear':
        return echartsColors[type](_radius[0], _radius[1], _radius[2], _radius[3], myColor, false)
      case 'radial':
        return echartsColors[type](0.5, 0.5, 0.5, _radius[3], myColor, false)
    }
  }

  const { selected = 'single', gradient = {}, single = '#fff' } = color || {}
  const _color: any = []
  if (selected === 'single') return single
  const { colors = [], gradualAngle = 1 } = gradient

  colors.forEach(v => {
    if (!_color[v['begins']]) _color.push([[v['begins']], v])
  })

  if (_color.length === 0) return undefined
  if (_color.length === 1) return _color?.[0]?.[1]?.value

  const _radius: number[] = radius[gradualAngle] || radius[1]

  switch (type) {
    case 'linear':
      return echartsColors[type](
        _radius[0],
        _radius[1],
        _radius[2],
        _radius[3],
        _color.map(v => {
          const item = v[1]
          return { offset: item?.begins / 100, color: item?.value }
        }),
        false
      )
      break
    case 'radial':
      return echartsColors[type](
        0.5,
        0.5,
        0.5,
        _color.map(v => {
          const item = v[1]
          return { offset: item?.begins / 100, color: item?.value }
        }),
        false
      )
  }
}

export function getValueColor(color: any, isString: boolean) {
  if (isString) return color
  if (!isString) return color.colorStops[0].color || '#ffff'
}

// 生成图例options
export const getLegendOptions = (
  config: LegendConfig | GeneralLegend | BSPieLegendConfig | BarLineLegendConfig,
  dataMemo: any,
  dataSeries: DataSeries[] | LineDataSeries[] | AreaDataSeries[],
  colors: string[],
  type?: 'pie' | 'bar' | 'basic-pie' | 'stereohistogram' | 'scatter' | 'line' | 'leet'
) => {
  type = type || 'pie'
  let options: any = {}

  if (config.display) {
    const dataArray = ['pie', 'basic-pie'].includes(type),
      dataObj = ['bar', 'line', 'stereohistogram', 'scatter', 'leet'].includes(type),
      _seriesTotal = dataArray ? dataMemo.reduce((pre, item) => pre + item.value, 0) : 0,
      seriesTotal = _seriesTotal === 0 ? 1 : _seriesTotal,
      _series = dataArray ? 'item' : 'series',
      _seriesTitle = dataArray ? 'itemTitle' : 'seriesTitle'

    const {
      size,
      iconConfig,
      displayAlign = 'right',
      seriesName,
      proportion,
      trueValue = {} as TureValue,
      layout,
      clickInt = {}
    } = config as LegendConfig | BSPieLegendConfig
    const { prefix, suffix } = trueValue
    // @ts-ignore
    const { disableStyles = '#ccc' } = clickInt
    const objData = dataArray ? array2obj(dataMemo, _series) : dataMemo
    const clicked = configDisplayCompatible(clickInt, 'clicked')

    //#region
    const _textStyle: any = {
      rich: {}
    }
    seriesName?.display &&
      ((_textStyle.rich.s = {
        color: seriesName?.color,
        fontSize: seriesName?.fontSize,
        fontWeight: seriesName?.fontWeight,
        fontFamily: seriesName?.fontFamily,
        width: seriesName?.displayWidth
      }),
      // @ts-ignore
      config?.spacing ? (_textStyle.rich.s.padding = [0, config?.spacing]) : null)

    proportion?.display &&
      (_textStyle.rich.proportion = {
        color: proportion?.color,
        fontSize: proportion?.fontSize,
        fontWeight: proportion?.fontWeight,
        fontFamily: proportion?.fontFamily,
        width: proportion?.displayWidth,
        align: displayAlign,
        padding: [0, 0, 0, proportion?.speed]
      })
    trueValue?.display &&
      (_textStyle.rich.trueValue = {
        color: trueValue?.color,
        fontSize: trueValue?.fontSize,
        fontWeight: trueValue?.fontWeight,
        fontFamily: trueValue?.fontFamily,
        width: trueValue?.displayWidth,
        align: displayAlign,
        padding: [0, 0, 0, !prefix?.display ? trueValue?.speed : prefix?.xOffset]
      })
    prefix?.display &&
      (_textStyle.rich.prefix = {
        color: prefix?.color,
        fontSize: prefix?.fontSize,
        fontWeight: prefix?.fontWeight,
        fontFamily: prefix?.fontFamily,
        padding: [prefix?.yOffset, 0, 0, trueValue?.speed]
      })

    suffix?.display &&
      (_textStyle.rich.suffix = {
        color: suffix?.color,
        fontSize: suffix?.fontSize,
        fontWeight: suffix?.fontWeight,
        fontFamily: suffix?.fontFamily,
        padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
      })
    //#endregion

    const _data = dataObj ? Object.keys(dataMemo).filter(v => v !== '_none') : dataMemo

    const legendData: any = _data.map((v, i) => {
      const textStyle = JSON.parse(JSON.stringify(_textStyle)),
        color = getEchartColor(colors[i]),
        useSeriesColors = typeof color === 'string',
        seriesColor = getValueColor(color, useSeriesColors)

      if (type === 'pie') {
        const _proportion = { ...(proportion || {}) } as Proportion
        const _trueValue = { ...(trueValue || {}) } as TureValue
        const _prefix = { ...(prefix || {}) } as Prefixsuffix
        const _suffix = { ...(suffix || {}) } as Prefixsuffix
        textStyle.rich.proportion &&
          (textStyle.rich.proportion.color = _proportion?.colorFollow ? color : _proportion?.color || '')
        textStyle.rich.trueValue &&
          (textStyle.rich.trueValue.color = _trueValue?.colorFollow ? color : _trueValue?.color || '')
        textStyle.rich.prefix &&
          (textStyle.rich.prefix.color =
            _trueValue?.colorFollow && _prefix?.colorFollow
              ? color
              : _prefix?.colorFollow
              ? trueValue?.color || ''
              : prefix?.color || '')
        textStyle.rich.suffix &&
          (textStyle.rich.suffix.color =
            _trueValue?.colorFollow && _suffix?.colorFollow
              ? color
              : _suffix?.colorFollow
              ? trueValue?.color || ''
              : suffix?.color || '')
      } else if (type === 'basic-pie') {
        const _seriesName = (seriesName || {}) as PieLegendSeriesName
        const _proportion = (proportion || {}) as BasPieLegendProportion
        const _trueValue = (trueValue || {}) as BasPieLegendTureValue
        const _prefix = (prefix || {}) as BasPiePrefixsuffix
        const _suffix = (suffix || {}) as BasPiePrefixsuffix

        if (_seriesName?.display && textStyle.rich.s && _seriesName.legendSeriesColorFollow) {
          textStyle.rich.s.color = seriesColor
        }

        if (_proportion?.display && textStyle.rich.proportion) {
          if (textStyle.rich.s && _proportion.legendProportionStyleFollow) {
            textStyle.rich.proportion.color = textStyle.rich.s?.color
            textStyle.rich.proportion.fontSize = textStyle.rich.s?.fontSize
            textStyle.rich.proportion.fontWeight = textStyle.rich.s?.fontWeight
            textStyle.rich.proportion.fontFamily = textStyle.rich.s?.fontFamily
          }

          if (!_proportion.legendProportionStyleFollow && _proportion.legendProportionColorFollow) {
            textStyle.rich.proportion.color = seriesColor
          }
        }

        if (_trueValue?.display && textStyle.rich.trueValue) {
          if (_trueValue.legendTrueStyleFollow && textStyle.rich.s) {
            textStyle.rich.trueValue.color = textStyle.rich.s?.color
            textStyle.rich.trueValue.fontSize = textStyle.rich.s?.fontSize
            textStyle.rich.trueValue.fontWeight = textStyle.rich.s?.fontWeight
            textStyle.rich.trueValue.fontFamily = textStyle.rich.s?.fontFamily
          }

          if (!_trueValue.legendTrueStyleFollow && _trueValue.legendTrueColorFollow) {
            textStyle.rich.trueValue.color = seriesColor
          }

          if (_prefix?.display && textStyle.rich.prefix) {
            if (_prefix.prefixStyleFollow) {
              textStyle.rich.prefix.color = textStyle.rich.trueValue?.color
              textStyle.rich.prefix.fontSize = textStyle.rich.trueValue?.fontSize
              textStyle.rich.prefix.fontWeight = textStyle.rich.trueValue?.fontWeight
              textStyle.rich.prefix.fontFamily = textStyle.rich.trueValue?.fontFamily
            }

            if (!_prefix.prefixStyleFollow && _prefix.prefixColorFollow) {
              textStyle.rich.prefix.color = seriesColor
            }
          }

          if (_suffix?.display && textStyle.rich.suffix) {
            if (_suffix.suffixStyleFollow) {
              textStyle.rich.suffix.color = textStyle.rich.trueValue?.color
              textStyle.rich.suffix.fontSize = textStyle.rich.trueValue?.fontSize
              textStyle.rich.suffix.fontWeight = textStyle.rich.trueValue?.fontWeight
              textStyle.rich.suffix.fontFamily = textStyle.rich.trueValue?.fontFamily
            }

            if (!_suffix.suffixStyleFollow && _suffix.suffixColorFollow) {
              textStyle.rich.suffix.color = seriesColor
            }
          }
        }
      }

      // @ts-ignore
      if (seriesName?.legendSeriesColorFollow && textStyle.rich.s) {
        textStyle.rich.s.color = seriesColor
      }

      const _icon: any = {
        name: dataArray ? v?.[_series] || '' : v,
        textStyle
      }

      //@ts-ignore   混合图表中特有的属性
      if (iconConfig?.legendType !== 'normal') {
        const _iconConfig = ((config || {}) as BarLineLegendConfig).iconConfig
        _icon.itemWidth = size?.w
        _icon.itemHeight = size?.h

        switch (_iconConfig?.iconType) {
          case 'system': {
            const systemicon = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']

            _icon.icon = systemicon.includes(_iconConfig.systemStyle)
              ? _iconConfig.systemStyle
              : machiningSvgPath(mLegendIcon[_iconConfig.systemStyle])
            break
          }
          case 'custom': {
            _icon.icon = `image://${_iconConfig?.customUrl}`
            break
          }
          case 'svg': {
            _icon.icon = getUsableSvgPath(_iconConfig?.svgPath)
            break
          }
        }
      }

      return _icon
    })

    const orient = layout?.orient || 'horizontal',
      distributionMode = layout?.distributionMode || 'unilateral',
      layoutmode = layout?.layoutmode || 'topbottom'

    const _legend: any = {
      show: true,
      orient,
      itemGap: layout?.itemGap,
      selectedMode: type === 'stereohistogram' ? false : clicked,
      inactiveColor: disableStyles,
      formatter: name => {
        let seriesText = name
        const itemdata = objData[name]
        const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name)

        if (findDataSeries && findDataSeries.map?.displayName) {
          seriesText = findDataSeries.map?.displayName
        } else {
          const findData = Array.isArray(dataMemo)
            ? dataMemo.find((v: any) => v?.[_series] === name && v?.[_seriesTitle])
            : dataMemo[name]?.find((v: any) => v?.[_seriesTitle])
          findData && (seriesText = findData?.[_seriesTitle])
        }

        let trueText = numberForMat(itemdata.value, trueValue?.numberformat)
        let proportionText = proportion ? ((itemdata.value / seriesTotal) * 100).toFixed(proportion?.decimal) : ''
        const prefixText = prefix?.display && trueValue?.display ? `{prefix|${prefix.content}}` : ''
        const suffixText = suffix?.display && trueValue?.display ? `{suffix|${suffix.content}}` : ''

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

    if (distributionMode === 'unilateral') {
      switch (orient) {
        case 'horizontal': {
          numberIsEmpty(layout?.width) && (_legend.width = layout?.width)
          break
        }
        case 'vertical': {
          numberIsEmpty(layout?.height) && (_legend.height = layout?.height)
          break
        }
      }
    } else {
      switch (layoutmode) {
        case 'leftright':
          numberIsEmpty(layout?.height) && (_legend.height = layout?.height)
          break
        case 'topbottom':
          numberIsEmpty(layout?.width) && (_legend.width = layout?.width)
          break
      }
    }

    //@ts-ignore  混合图表中特有的属性
    if (iconConfig?.legendType !== 'normal' || type === 'leet') {
      _legend.itemWidth = size?.w
      _legend.itemHeight = size?.h
    }

    // 非饼图数值显示长度
    if (!dataArray) {
      const seriesName = ((config || {}) as GeneralLegend).seriesName
      if (numberIsEmpty(seriesName?.showWidth)) {
        _legend.textStyle = {
          width: Number(seriesName?.showWidth),
          overflow: seriesName?.overflow || 'initial'
        }
      }
    }

    const position: any = {}
    if (layout?.distributionMode === 'unilateral') {
      layout.xPosition !== 'auto' ? (position.x = layout.xPosition) : (position.left = layout.xOffset)
      layout.yPosition !== 'auto' ? (position.y = layout.yPosition) : (position.top = layout.yOffset)

      // @ts-ignore
      const legendPager = layout?.legendPager as GeneralLegendPager

      if (legendPager && legendPager.display) {
        const {
          gap = 5,
          itemGap = 5,
          horPosition = 'right',
          verPosition = 'bottom',
          animation = true,
          pagerBtn,
          textStyle
        } = legendPager
        const {
          buttonWidth = 15,
          buttonHeight = 15,
          pagerIconType = 'system',
          preIconPath = '',
          preImageUrl = '',
          nextIconPath = '',
          nextImageUrl = '',
          pageIconColor = '#2f4554',
          pageIconInactiveColor = '#aaa'
        } = pagerBtn || {}

        _legend.type = 'scroll'
        _legend.animation = animation
        _legend.pageButtonGap = gap
        _legend.pageButtonItemGap = itemGap
        _legend.pageButtonPosition = orient === 'horizontal' ? horPosition : verPosition
        _legend.pageIconSize = [buttonWidth, buttonHeight]
        _legend.pageIconColor = pageIconColor
        _legend.pageIconInactiveColor = pageIconInactiveColor
        _legend.pageTextStyle = {
          color: textStyle?.color,
          fontWeight: textStyle?.fontWeight,
          fontFamily: textStyle?.fontFamily,
          fontSize: textStyle?.fontSize
        }

        if (pagerIconType === 'custom') {
          _legend.pageIcons = { [orient]: [`image://${preImageUrl}`, `image://${nextImageUrl}`] }
        }

        if (pagerIconType === 'svg') {
          const normalSvg = {
            horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
            vertical: ['M0,0L20,0L10,-20z', 'M0,0L20,0L10,20z']
          }
          const preIcon = preIconPath && preIconPath.startsWith('path://') ? preIconPath : normalSvg[orient][0]
          const nextIcon = nextIconPath && nextIconPath.startsWith('path://') ? nextIconPath : normalSvg[orient][1]
          _legend.pageIcons = { [orient]: [`${preIcon}`, `${nextIcon}`] }
        }
      }

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
      layoutmode === 'leftright'
        ? ((option['0'] = { x: 'left', y: 'center' }), (option['1'] = { x: 'right', y: 'center' }))
        : ((option['0'] = { x: 'center', y: 'top' }), (option['1'] = { x: 'center', y: 'bottom' }))

      _legend.orient = layoutmode === 'leftright' ? 'vertical' : 'horizontal'

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

// 生成标题options
export const getTitleOptions = (config: GeneralTitle) => {
  let option: any = {}
  const {
    display = true,
    content = { value: '' },
    subTitle = {} as GeneralSubTitle,
    speed = 10,
    xPosition = 'left',
    yPosition = 'top',
    xOffset = 0,
    yOffset = 0
  } = config
  if (display) {
    option = {
      title: {
        show: true,
        text: content.value,
        textStyle: {
          fontFamily: config.fontFamily,
          color: config.color,
          fontSize: config?.fontSize,
          fontWeight: config.fontWeight
        },
        subtext: subTitle.display ? subTitle.content?.value : '',
        subtextStyle: {
          fontFamily: subTitle.fontFamily,
          color: subTitle.color,
          fontSize: subTitle.fontSize,
          fontWeight: subTitle.fontWeight
        },
        itemGap: speed
      }
    }

    xPosition !== 'auto' ? (option.title.left = xPosition) : (option.title.left = xOffset)
    yPosition !== 'auto' ? (option.title.top = yPosition) : (option.title.top = yOffset)
  } else {
    option = {
      title: {
        show: false
      }
    }
  }
  return option
}

// 生成工具栏options
export const getToolbarOptions = (
  options: any,
  config: GeneralToolBox,
  other?: { chartType?: 'stereohistogram' | 'scatter' | 'strip' | 'bar' | 'stackBar' }
) => {
  const { display, layOut, toolStyle, tool } = config
  const toolBoxPosition = layOut?.toolBoxPosition
  const { chartType = '' } = other || {}

  if (display) {
    options.toolbox = {
      show: true,
      orient: layOut?.orient,
      left: toolBoxPosition?.toolxPosition !== 'auto' ? toolBoxPosition?.toolxPosition : toolBoxPosition?.xOffset,
      top: toolBoxPosition?.toolyPosition !== 'auto' ? toolBoxPosition?.toolyPosition : toolBoxPosition?.yOffset,
      itemSize: toolStyle?.size,
      itemGap: toolStyle?.itemGap,
      showTitle: toolStyle?.showTitle,
      feature: {
        saveAsImage: {
          show: !!tool?.saveAsImage
        },
        restore: {
          show: false
        },
        magicType: {
          show: false,
          type: ['line', 'bar']
        }
      }
    }
    if (!['stereohistogram', 'scatter', 'strip', 'bar'].includes(chartType)) {
      options.toolbox.feature.magicType.show = !!tool?.magicType
    }

    if (!['strip', 'bar'].includes(chartType)) {
      options.toolbox.feature.restore.show = !!tool?.restore
    }
  } else {
    options.toolbox = {
      show: false
    }
  }
  return options
}

// 生成坐标配置
export const getAxisOptions = (
  config: GeneralXAxis | GeneralYAxis,
  dataMemo: any,
  type: 'x' | 'y',
  other?: { chartType?: 'scatter'; isSymbolRepeat?: boolean }
) => {
  const { chartType, isSymbolRepeat = false } = other || {},
    {
      axisUnit = generalAxisUnit,
      axisLine = generalAxisLine,
      axisTick = generalAxisTick,
      axisSplitLine = generalAxisSplitLine
    } = config,
    mType = chartType === 'scatter' && type === 'x' ? 'xAxis' : { x: 'xAxis', y: 'yAxis' }[type]
  let options: any = {}

  options = {
    [mType]: {
      show: config.display
    }
  }
  // 处理轴单位
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

  if (type === 'y' || chartType === 'scatter') {
    const labelConfig = mType === 'xAxis' ? (config as ScatterXAxis).axisLabel : (config as GeneralYAxis).yaxisLabel

    if (labelConfig?.display) {
      const {
        min,
        max,
        splitAuto = true,
        minInterval = null,
        splitNumber = 6,
        suffixConfig,
        yLabelStyle,
        yLabelBgStyle = generalYLabelBgStyle,
        yLabelShadow = generalShadowStyle,
        format = generalNumberFormat
      } = labelConfig

      const { interval = 0, padding = 8, align = 'right' } = yLabelStyle || {}

      options[mType].axisLabel = {
        show: true,
        rotate: interval,
        fontFamily: yLabelStyle?.fontFamily,
        fontSize: yLabelStyle?.fontSize,
        color: yLabelStyle?.color,
        fontWeight: yLabelStyle?.fontWeight,
        backgroundColor: yLabelBgStyle?.backgroundColor,
        borderColor: yLabelBgStyle?.borderColor,
        borderWidth: yLabelBgStyle?.borderWidth,
        borderRadius: yLabelBgStyle?.borderRadius,
        margin: padding,
        textShadowBlur: yLabelShadow?.shadowBlur,
        textShadowColor: yLabelShadow?.shadowColor,
        textShadowOffsetX: yLabelShadow?.shadowOffsetX,
        textShadowOffsetY: yLabelShadow?.shadowOffsetY,
        align: align,
        formatter: val => {
          const value = numberForMat(val, format)
          return `${value}${suffixConfig?.content}`
        }
      }

      if (minInterval !== null) {
        options[mType].minInterval = minInterval
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

      if (!isSymbolRepeat) {
        !isNaN(Number(min)) && min !== null && (options[mType].min = min)
      }
      !isNaN(Number(max)) && max !== null && (options[mType].max = max)
      !splitAuto && (options[mType].splitNumber = splitNumber)
    } else {
      options[mType].axisLabel = {
        show: false
      }
    }
  } else {
    const { axisLabel = generalxAxisLabel } = config as GeneralXAxis
    const {
      labelType = 'category',
      // time in
      time = 'YYYY年MM月',
      splitType = 'auto',
      splitNumber = 6,
      leftMargin = 0,
      rightMargin = 0,
      showMaxLabel = false,
      showMinLabel = false,

      // category
      spaceType = 'auto',
      space = 0,
      textRotate = 0,
      boundaryGap = true,
      axisStyle,
      axisBgStyle = generalAxisBgStyle,
      axisLabelShadow = generalShadowStyle
    } = axisLabel
    options.xAxis.type = labelType
    options.xAxis.timeTyle = time

    const _data: string[] = [],
      TYPES = {
        default: 'category',
        scatter: 'x'
      },
      TYPE = TYPES[chartType || 'default']

    for (const key in dataMemo) {
      if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
        const item = dataMemo[key]
        item.forEach((v: GeneralDataMap) => {
          if (labelType === 'category') {
            !_data.includes(v[TYPE]) && _data.push(v[TYPE])
          } else {
            const _momont = moment(v[TYPE])
            _momont.isValid() && !_data.includes(v[TYPE]) && _data.push(v[TYPE])
          }
        })
      }
    }

    if (chartType !== 'scatter') options.xAxis.data = _data

    if (axisLabel.display) {
      options.xAxis.axisLabel = {
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
          let name: string | undefined = val
          switch (labelType) {
            case 'time': {
              const _momont = moment(val)
              if (_momont.isValid()) {
                if (time !== 'Monday' && time !== 'Mon' && time !== 'asData') {
                  name = _momont.format(time)
                } else if (time === 'Monday' || time === 'Mon') {
                  const day = _momont.format('d')
                  const target = time === 'Monday' ? dayName : abridgeDayName
                  name = target[day]
                }
              }
              break
            }
            case 'category': {
              if (TYPE === 'category') {
                const data = Object.values(dataMemo).flat() as GeneralDataMap[]
                const titleSeries = data.find((v: GeneralDataMap) => v.category == val && v.categoryTitle)
                titleSeries ? (name = titleSeries.categoryTitle) : (name = val)
              }

              break
            }
          }
          return name
        }
      }
      if (labelType === 'time') {
        const _num = {
          auto: () => {},
          showAll: () => {
            options.xAxis.splitNumber = _data.length
          },
          none: () => {
            options.xAxis.splitNumber = splitNumber
          }
        }
        _num[splitType] && _num[splitType]()

        options.xAxis.axisLabel.showMaxLabel = showMaxLabel
        options.xAxis.axisLabel.showMinLabel = showMinLabel

        options.xAxis.boundaryGap = [`${leftMargin}%`, `${rightMargin}%`]
      } else {
        const _num = {
          auto: () => {},
          showAll: () => {
            options.xAxis.axisLabel.interval = 0
          },
          none: () => {
            options.xAxis.axisLabel.interval = space
          }
        }
        _num[spaceType] && _num[spaceType]()
        options.xAxis.boundaryGap = boundaryGap
        options.xAxis.axisLabel.rotate = textRotate
      }

      let showWidth = NaN
      if (!isNaN(Number(axisStyle?.width)) && axisStyle?.width !== null) {
        showWidth = axisStyle?.width || NaN
      }

      const showType = axisStyle?.showType || 'actualLength',
        overflow = axisStyle?.overflow || 'none'
      if ((overflow === 'truncate' || overflow === 'breakAll') && showType === 'outOfCharacter') {
        // 按字符数
        const preFormatter = options.xAxis.axisLabel.formatter,
          chartNum = axisStyle?.charNumber || 0
        options.xAxis.axisLabel.formatter = val => {
          let str = preFormatter(val) || ''
          str = formatStr(str, chartNum, '\n', overflow === 'truncate')
          return str
        }
      } else {
        if (!isNaN(showWidth)) {
          options.xAxis.axisLabel.width = showWidth
          options.xAxis.axisLabel.overflow = axisStyle?.overflow
        }
      }
    } else {
      options.xAxis.axisLabel = {
        show: false
      }
    }
  }

  return options
}

// 生成多坐标配置
export const getBlendAxisOptions = (config: GeneralXAxis[] | GeneralYAxis[], dataMemo: any, type: 'x' | 'y') => {
  const mType = { x: 'xAxis', y: 'yAxis' }[type],
    options: any = {
      [mType]: []
    }

  for (let i = 0; i < config.length; i++) {
    const item = config[i]
    options[mType].push(getAxisOptions(item, dataMemo, type)[mType])
  }

  return options
}

// 生成标线options
export const getMarkLineOptions = (
  markSeries: GeneralMarkingSeries[],
  other?: { chartType?: 'scatter' | 'signSeries' | 'strip' | 'stackStrip' }
) => {
  const markLineObj: any = {}
  const { chartType } = other || {}
  const _mark: any = {
    silent: chartType !== 'scatter',
    data: []
  }

  markSeries.forEach(mark => {
    markLineObj[mark.markType] = mark
  })

  Object.values(markLineObj).forEach(item => {
    const {
      markType,
      lineType,
      startStyle,
      syncColor,
      lineColor,
      opacity,
      width,
      labelStyle
    } = item as GeneralMarkingSeries
    const _data: any = {
      type: markType,
      symbol: startStyle?.style,
      symbolSize: [startStyle?.width, startStyle?.height],
      lineStyle: {
        type: lineType,
        opacity: opacity / 100,
        width
      }
    }

    ;(!syncColor || chartType === 'signSeries') && (_data.lineStyle.color = getEchartColor(lineColor))

    if (labelStyle?.display) {
      const {
        position = 'end',
        xOffset = 0,
        yOffset = 0,
        fontFamily,
        fontSize,
        fontWeight,
        color,
        borderStyle,
        shadow = generalShadowStyle,
        format = generalNumberFormat
      } = labelStyle || {}

      _data.label = {
        show: true,
        position,
        fontFamily,
        fontSize,
        fontWeight,
        color,
        padding: [yOffset, xOffset],
        backgroundColor: borderStyle?.backgroundColor,
        borderColor: borderStyle?.borderColor,
        borderWidth: borderStyle?.borderWidth,
        borderRadius: borderStyle?.borderRadius,
        textShadowBlur: shadow.shadowBlur,
        textShadowColor: shadow.shadowColor,
        textShadowOffsetX: shadow.shadowOffsetX,
        textShadowOffsetY: shadow.shadowOffsetY,
        formatter: params => {
          return numberForMat(params.value, format)
        }
      }
    } else {
      _data.label = {
        show: false
      }
    }

    _mark.data.push(_data)
  })

  return _mark
}

// 生成标注options
export const getMarkPointIptions = (
  markPoints: GeneralMarkPointSeries[],
  other?: { chartType?: 'scatter' | 'signSeries' | 'strip' | 'stackStrip' }
) => {
  const markPointObj: any = {},
    { chartType } = other || {},
    _point: any = {
      data: []
    }

  markPoints.forEach(point => {
    markPointObj[point.pointType] = point
  })

  Object.values(markPointObj).forEach(item => {
    const {
      pointType,
      pointstyle,
      pointIcon,
      syncColor,
      color,
      opacity,
      borderStyle,
      shadow,
      imgUrl,
      size,
      symbolRotate,
      pointLabel
    } = item as GeneralMarkPointSeries

    const _data: any = {
      type: pointType,
      symbolSize: [size?.width, size?.height],
      symbolRotate,
      itemStyle: {}
    }

    if (pointstyle === 'system') {
      _data.symbol = pointIcon
      _data.itemStyle.opacity = opacity / 100
      ;(!syncColor || chartType === 'signSeries') && (_data.itemStyle.color = getEchartColor(color))
      _data.itemStyle.borderColor = borderStyle?.borderColor
      _data.itemStyle.borderWidth = borderStyle?.borderWidth
      _data.itemStyle.shadowBlur = shadow?.shadowBlur
      _data.itemStyle.shadowColor = shadow?.shadowColor
      _data.itemStyle.shadowOffsetX = shadow?.shadowOffsetX
      _data.itemStyle.shadowOffsetY = shadow?.shadowOffsetY
    } else {
      _data.symbol = `image://${imgUrl}`
    }

    if (pointLabel?.display) {
      const {
        position = 'end',
        xOffset = 0,
        yOffset = 0,
        fontFamily,
        fontSize,
        fontWeight,
        color,
        borderStyle,
        shadow = generalShadowStyle,
        format = generalNumberFormat
      } = pointLabel || {}

      _data.label = {
        show: true,
        position,
        fontFamily,
        fontSize,
        fontWeight,
        color,
        offset: [xOffset, yOffset],
        backgroundColor: borderStyle?.backgroundColor,
        borderColor: borderStyle?.borderColor,
        borderWidth: borderStyle?.borderWidth,
        borderRadius: borderStyle?.borderRadius,
        textShadowBlur: shadow.shadowBlur,
        textShadowColor: shadow.shadowColor,
        textShadowOffsetX: shadow.shadowOffsetX,
        textShadowOffsetY: shadow.shadowOffsetY,
        formatter: params => {
          return numberForMat(params.value, format)
        }
      }
    } else {
      _data.label = {
        show: false
      }
    }

    _point.data.push(_data)
  })

  return _point
}

// 生成提示框options
export const getTooltipOptions = function (
  this: any,
  config: GeneralTooltipConfig,
  dataSeries: (DataSeries | LineDataSeries)[],
  uuid: string,
  {
    dataMemo,
    isReversal,
    chartType
  }: {
    dataMemo?: any
    isReversal?: boolean
    chartType?: 'pie' | 'scatter' | 'bubble' | 'wordcloud' | 'strip' | 'stackStrip' | 'signSeries'
  }
) {
  let options: any = {}
  const labelTyle = this?.[`${uuid}-nametype`]

  const trigger = { pie: 'item', scatter: 'item', bubble: 'item', wordcloud: 'item' }[String(chartType)] || 'axis'

  function getTipStr(params: any) {
    if (chartType === 'pie' || chartType === 'wordcloud') {
      const { marker, name, value, data = {} as GeneralPieDataMap } = params || {},
        tipStyle = config?.tooltip?.tipStyle,
        tipSuffixConfig = config?.tipSuffixConfig || generalTipSuffixConfig,
        suffixTipStyle = tipSuffixConfig.tipTextStyle?.tipSuffixStyleAsync
          ? tipStyle?.textStyle
          : tipSuffixConfig.tipTextStyle,
        findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name),
        itemValue = findSeries && findSeries.map?.displayName ? findSeries.map?.displayName : data.itemTitle || name,
        seriesName = chartType === 'wordcloud' ? undefined : params.seriesName
      let suffixName = name
      const findSuffixSeries = tipSuffixConfig.tipSuffixSeries.filter(v => v.fieldName === suffixName && suffixName)

      if (findSuffixSeries.length) {
        suffixName = findSuffixSeries[findSuffixSeries.length - 1].content
      } else {
        suffixName = tipSuffixConfig.content
      }
      return `
      <div class="lcz-chart-tooltip" 
          style="
          font-family:${tipStyle?.textStyle?.fontFamily};
          font-size: ${tipStyle?.textStyle?.fontSize}px;
          font-weight: ${tipStyle?.textStyle?.fontWeight};
          color:${tipStyle?.textStyle?.color};
          font-style: ${tipStyle?.textStyle?.fontStyle};">
          ${seriesName ? `<div>${seriesName}</div>` : ''}
          <div class="lcz-chart-tooltip-item">
              ${marker}
              <span>${itemValue}</span>
              <span style="margin-left:12px;">${value}</span>
              <span 
                style="
                display:${suffixName && tipSuffixConfig.display ? 'block' : 'none'};
                margin-left:${tipSuffixConfig.gap}px;
                position: relative;
                top:${tipSuffixConfig.yOffset}px;
                font-family:${suffixTipStyle?.fontFamily};
                font-size: ${suffixTipStyle?.fontSize}px;
                font-weight: ${suffixTipStyle?.fontWeight};
                color:${suffixTipStyle?.color};
                font-style: ${suffixTipStyle?.fontStyle};
              ">
                 ${suffixName}
              </span>
              
          </div>
      <div/>`
    } else if (chartType === 'scatter' || chartType === 'bubble') {
      const { marker, seriesName, value } = params || {}
      let suffixName = seriesName
      const tipStyle = config?.tooltip?.tipStyle,
        tipSuffixConfig = config?.tipSuffixConfig || generalTipSuffixConfig,
        suffixTipStyle = tipSuffixConfig.tipTextStyle.tipSuffixStyleAsync
          ? tipStyle?.textStyle
          : tipSuffixConfig.tipTextStyle
      const findSuffixSeries = tipSuffixConfig.tipSuffixSeries.filter(v => v.fieldName === suffixName && suffixName)

      if (findSuffixSeries.length) {
        suffixName = findSuffixSeries[findSuffixSeries.length - 1].content
      } else {
        suffixName = tipSuffixConfig.content
      }
      const findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === seriesName)
      const _seriesTitle =
        findSeries && findSeries.map?.displayName ? findSeries.map?.displayName : value[3].seriesTitle || seriesName
      const showValue = chartType === 'bubble' ? value[2] : value[1]

      return `
        <div class="lcz-chart-tooltip" 
          style="
          font-family:${tipStyle?.textStyle?.fontFamily};
          font-size: ${tipStyle?.textStyle?.fontSize}px;
          font-weight: ${tipStyle?.textStyle?.fontWeight};
          color:${tipStyle?.textStyle?.color};
          font-style: ${tipStyle?.textStyle?.fontStyle};">
          ${_seriesTitle ? `<div>${_seriesTitle}</div>` : ''}
          <div class="lcz-chart-tooltip-item">
            ${marker}
            <span style="margin-left:8px;">${showValue}</span>
            <span 
                style="
                display:${suffixName && tipSuffixConfig.display ? 'block' : 'none'};
                margin-left:${tipSuffixConfig.gap}px;
                position: relative;
                top:${tipSuffixConfig.yOffset}px;
                font-family:${suffixTipStyle?.fontFamily};
                font-size: ${suffixTipStyle?.fontSize}px;
                font-weight: ${suffixTipStyle?.fontWeight};
                color:${suffixTipStyle?.color};
                font-style: ${suffixTipStyle?.fontStyle};
              ">
              ${suffixName}
            </span>
          </div>
        <div/>`
    } else {
      let timeName = params?.[0]?.axisValueLabel
      if (params?.[0]?.axisType.split('.')[1] === 'category') {
        const data = Object.values(dataMemo).flat() as GeneralDataMap[]
        const titleSeries = data.find(
          (v: GeneralDataMap) => v.category == params?.[0]?.axisValueLabel && v.categoryTitle
        )
        titleSeries && (timeName = titleSeries.categoryTitle || titleSeries.category)

        if (chartType === 'signSeries') {
          const findDataSeries = [...dataSeries]
            .reverse()
            .find(v => v.map?.fieldName && v.map?.fieldName === params?.[0]?.axisValueLabel)

          findDataSeries?.map?.displayName && (timeName = findDataSeries?.map?.displayName)
        }
      } else {
        const label = params?.[0]?.axisValueLabel
        const _momont = moment(label)
        timeName = _momont.isValid() && labelTyle ? _momont.format(labelTyle) : label
      }
      const tipStyle = config?.tooltip?.tipStyle,
        tipSuffixConfig = config?.tipSuffixConfig || generalTipSuffixConfig,
        suffixTipStyle = tipSuffixConfig.tipTextStyle.tipSuffixStyleAsync
          ? tipStyle?.textStyle
          : tipSuffixConfig.tipTextStyle
      const str: any = `
      <div class="lcz-chart-tooltip" 
          style="font-family:${tipStyle?.textStyle?.fontFamily};
          font-size: ${tipStyle?.textStyle?.fontSize}px;
          font-weight: ${tipStyle?.textStyle?.fontWeight};
          color:${tipStyle?.textStyle?.color};
          font-style: ${tipStyle?.textStyle?.fontStyle};">
          <div>${timeName}</div>`

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
        const { marker, seriesName, value, name: _itemName } = param || {}
        let name = seriesName,
          suffixName = chartType === 'signSeries' ? _itemName : seriesName
        const findSuffixSeries = tipSuffixConfig.tipSuffixSeries.filter(v => v.fieldName === suffixName && suffixName)

        if (findSuffixSeries.length) {
          suffixName = findSuffixSeries[findSuffixSeries.length - 1].content
        } else {
          suffixName = tipSuffixConfig.content
        }
        const findDataSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === name)
        if (findDataSeries && findDataSeries.map?.displayName) {
          name = findDataSeries.map?.displayName
        } else {
          const findData = dataMemo[name]?.find((v: GeneralDataMap) => v.seriesTitle)
          findData && (name = findData.seriesTitle)
        }
        markStr += `<span>${marker}</span>`
        nameStr += `<span>${name}</span>`
        valueStr += `<span style="width:100%;text-align:right">${
          isReversal ? value[0] : value[1] === null ? '-' : value[1]
        }</span>`
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
  }

  if (config?.hoverTrigger?.display) {
    const { hoverTrigger, tooltip = GeneralToolTip.tooltip as GeneralTooltip, indicator } = config
    const { tipposition, tipStyle } = tooltip

    options = {
      tooltip: {
        trigger,
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
          try {
            if (params?.componentType === 'series' || params?.[0]?.componentType === 'series') {
              const tip = getTipStr(params)
              return tip
            }
          } catch (error) {
            console.log(error)
            return ''
          }
        }
      }
    }

    if (indicator) {
      options.tooltip.axisPointer = {
        type: indicator?.type,
        snap: indicator?.snap,
        label: { show: false }
      }

      indicator.type === 'cross' &&
        (options.tooltip.axisPointer.label = {
          show: true,
          color: '#fff',
          backgroundColor: '#999'
        })
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

//事件交互
export const chartEventFun = (
  xAxisConfig: GeneralXAxis,
  params: any,
  dataMemo: any,
  dataSeries: any,
  stackSeries?: GenStrackSeries[]
) => {
  let param
  const series = params.seriesName
  const dataIndex = params.dataIndex
  const _ids = params.data.ids

  if (dataMemo[series]) {
    param = dataMemo[series][dataIndex] || {}
  } else {
    const _data = Object.values(dataMemo).flat()
    param = _data.find((v: any) => v._ids === _ids)
  }
  const findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === param.series)
  param.series = series

  param.stack = getStackArray(dataMemo, stackSeries)[series] || ''

  if (findSeries && findSeries.map?.displayName) {
    param.seriesTitle = findSeries.map?.displayName
  } else {
    const findData = dataMemo[param.series]?.find((v: GeneralDataMap) => v.seriesTitle)
    findData && (param.seriesTitle = findData.seriesTitle)
  }
  if (xAxisConfig.axisLabel?.labelType == 'time') {
    const label = param?.category
    const _momont = moment(label)
    _momont.isValid() && (param.categoryTitle = _momont.format(xAxisConfig.axisLabel.time))
  } else {
    const data = Object.values(dataMemo).flat() as GeneralDataMap[]
    const titleSeries = data.find((v: GeneralDataMap) => v.category == param?.category && v.categoryTitle)
    titleSeries && (param.categoryTitle = titleSeries.categoryTitle || titleSeries.category)
  }
  return param
}

//是否为数字
export function isRealNum(val) {
  if (val === '' || val == null) {
    return false
  }
  return !isNaN(val)
}

//堆叠数据处理
export function getStackArray(dataMemo: any, stackSeries?: GenStrackSeries[]) {
  const stackOptions: any = {}
  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key]
      stackOptions[key] = item[0].stack || ''
    }
  }

  stackSeries?.forEach(v => {
    const { seriesName = '', stackName = '' } = v
    seriesName.split(',').forEach(v => {
      stackOptions[v] = stackName
    })
  })
  return stackOptions
}
