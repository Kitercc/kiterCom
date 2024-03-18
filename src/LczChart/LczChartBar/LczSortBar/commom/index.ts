/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getValueColor } from '../../../common'
import { getUsableSvgPath } from '../../../common/utils'
import {
  DataSeries,
  GlobalConfig,
  MainTitle,
  SortBarProps,
  SortlDataMap,
  TimerShaft,
  TitleConfig,
  XAxis
} from '../type'

//svg 图片 图标
function getGraphIcon(type: any, systemValue: any, imgValue: any, svgValue: any) {
  let value = ''
  switch (type) {
    case 'system': {
      value = systemValue
      break
    }
    case 'custom': {
      value = `image://${imgValue}`
      break
    }
    case 'svg': {
      value = getUsableSvgPath(svgValue)
      break
    }
    default:
      break
  }
  return value
}

// 动态排序图表--统一类型key的数据分类排序
export function sortformatData(data: any[], key: string) {
  const noData = data
      .filter(v => v.no !== 0)
      .sort((a: SortlDataMap, b: SortlDataMap) => (a.no === b.no ? b.value - a.value : a.no - b.no))
      .reverse(),
    valueData = data
      .filter(v => v.no === 0)
      .sort((a: SortlDataMap, b: SortlDataMap) => b.value - a.value)
      .reverse()
  const _data: SortlDataMap[] = [...valueData, ...noData]

  const _obj = Object.create(null)
  for (let i = 0; i < _data.length; i++) {
    const item = _data[i]
    if (_obj[item[key]]) {
      _obj[item[key]].push(item)
    } else {
      _obj[item[key]] = [item]
    }
  }
  return _obj
}

// 生成全局
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
    backgroundColor: bgColor,
    animationEasingUpdate: 'quinticInOut',
    calculable: true,
    yAxis: [
      {
        type: 'category',
        data: '',
        show: false,
        axisLabel: {
          show: false
        }
      }
    ]
  }
}

//生成时间轴
export function getTimeConfig(config: TimerShaft, dataMemo: { key: SortlDataMap[] }) {
  const { margin, currentActive, timeLine, timeLabel, timeGraph, timecontrol, timeAuto, timeActive } = config,
    { graphStyle, activeGraphStyle, highlightGraphStyle, progressGraphStyle } = timeGraph,
    { nextConfig, prevConfig, playConfig, textStyle, controlHlightStyle } = timecontrol,
    _currentIndex = Object.keys(dataMemo).findIndex(v => v == currentActive.value) || 0

  const options: any = {
    animationDurationUpdate: timeAuto.playInterval * 1000,
    timeline: {
      left: `${margin.l}%`,
      right: `${margin.r}%`,
      bottom: `${margin.b}%`,
      currentIndex: _currentIndex === -1 ? 0 : _currentIndex,
      autoPlay: timeAuto.autoPlay,
      loop: timeAuto.loop,
      playInterval: timeAuto.playInterval * 1000,
      lineStyle: {
        type: timeLine.borderType,
        width: timeLine.borderWidth,
        color: timeLine.borderColor
      },
      axisType: 'category',
      realtime: timeActive,
      itemStyle: {
        color: graphStyle.color,
        borderColor: graphStyle.contour.borderColor,
        borderWidth: graphStyle.contour.display ? graphStyle.contour.borderWidth : 0,
        borderType: graphStyle.contour.borderType,
        shadowBlur: graphStyle.shadow.shadowBlur,
        shadowColor: graphStyle.shadow.shadowColor,
        shadowOffsetX: graphStyle.shadow.shadowOffsetX,
        shadowOffsetY: graphStyle.shadow.shadowOffsetY
      },
      symbol: getGraphIcon(timeGraph.graphType, timeGraph.systemStyle, timeGraph.customUrl, timeGraph.svgPath),
      symbolSize: [timeGraph.size?.width, timeGraph.size?.height],
      data: Object.keys(dataMemo),
      progress: {},
      checkpointStyle: {
        symbol: getGraphIcon(timeGraph.graphType, timeGraph.systemStyle, timeGraph.customUrl, timeGraph.svgPath),
        symbolSize: [timeGraph.size?.width, timeGraph.size?.height],
        color: graphStyle.color,
        borderColor: graphStyle.contour.borderColor,
        borderWidth: graphStyle.contour.display ? graphStyle.contour.borderWidth : 0,
        borderType: graphStyle.contour.borderType,
        shadowBlur: graphStyle.shadow.shadowBlur,
        shadowColor: graphStyle.shadow.shadowColor,
        shadowOffsetX: graphStyle.shadow.shadowOffsetX,
        shadowOffsetY: graphStyle.shadow.shadowOffsetY
      },
      emphasis: {},
      label: {
        position: timeLabel.position,
        fontFamily: timeLabel.textStyle.fontFamily,
        fontSize: timeLabel.textStyle.fontSize,
        color: timeLabel.textStyle.color,
        fontWeight: timeLabel.textStyle.fontWeight,
        rotate: timeLabel.textStyle.rotate,
        formatter: `{value}${timeLabel.suffix}`
      },
      controlStyle: {
        showNextBtn: nextConfig.display,
        showPrevBtn: prevConfig.display,
        showPlayBtn: playConfig.display,
        color: textStyle.color,
        shadowBlur: textStyle.shadow.shadowBlur,
        shadowColor: textStyle.shadow.shadowColor,
        shadowOffsetX: textStyle.shadow.shadowOffsetX,
        shadowOffsetY: textStyle.shadow.shadowOffsetY
      }
    }
  }

  //轴线高亮
  if (timeLine.progressBar.display) {
    options.timeline.progress.lineStyle = {
      type: timeLine.progressBar.borderType,
      width: timeLine.progressBar.borderWidth,
      color: timeLine.progressBar.borderColor
    }
  } else {
    options.timeline.progress.lineStyle = {
      ...options.timeline.lineStyle
    }
  }

  //轴标签高亮
  if (timeLabel.highlight.display) {
    options.timeline.emphasis.label = {
      fontFamily: timeLabel.highlight.fontFamily,
      fontSize: timeLabel.highlight.fontSize,
      color: timeLabel.highlight.color,
      fontWeight: timeLabel.highlight.fontWeight
    }
  } else {
    options.timeline.emphasis.label = {
      fontFamily: timeLabel.textStyle.fontFamily,
      fontSize: timeLabel.textStyle.fontSize,
      color: timeLabel.textStyle.color,
      fontWeight: timeLabel.textStyle.fontWeight,
      rotate: timeLabel.textStyle.rotate
    }
  }

  //轴标签进度条
  if (timeLabel.progress.display) {
    options.timeline.progress.label = {
      fontFamily: timeLabel.progress.fontFamily,
      fontSize: timeLabel.progress.fontSize,
      color: timeLabel.progress.color,
      fontWeight: timeLabel.progress.fontWeight
    }
  } else {
    options.timeline.progress.label = {
      fontFamily: timeLabel.textStyle.fontFamily,
      fontSize: timeLabel.textStyle.fontSize,
      color: timeLabel.textStyle.color,
      fontWeight: timeLabel.textStyle.fontWeight,
      rotate: timeLabel.textStyle.rotate
    }
  }

  //图形选中
  if (activeGraphStyle.display) {
    options.timeline.checkpointStyle = {
      ...options.timeline.checkpointStyle,
      color: activeGraphStyle.graphStyle.color,
      borderColor: activeGraphStyle.graphStyle.contour.borderColor,
      borderWidth: activeGraphStyle.graphStyle.contour.display ? activeGraphStyle.graphStyle.contour.borderWidth : 0,
      borderType: activeGraphStyle.graphStyle.contour.borderType,
      shadowBlur: activeGraphStyle.graphStyle.shadow.shadowBlur,
      shadowColor: activeGraphStyle.graphStyle.shadow.shadowColor,
      shadowOffsetX: activeGraphStyle.graphStyle.shadow.shadowOffsetX,
      shadowOffsetY: activeGraphStyle.graphStyle.shadow.shadowOffsetY
    }
    if (!activeGraphStyle.activeGraphSync) {
      options.timeline.checkpointStyle.symbol = getGraphIcon(
        activeGraphStyle.activeGraphType,
        activeGraphStyle.systemStyle,
        activeGraphStyle.customUrl,
        activeGraphStyle.svgPath
      )
      options.timeline.checkpointStyle.symbolSize = [activeGraphStyle.size?.width, activeGraphStyle.size?.height]
    }
  }

  //图形高亮
  if (highlightGraphStyle.display) {
    options.timeline.emphasis.itemStyle = {
      color: highlightGraphStyle.graphStyle.color,
      borderColor: highlightGraphStyle.graphStyle.contour.borderColor,
      borderWidth: highlightGraphStyle.graphStyle.contour.display
        ? highlightGraphStyle.graphStyle.contour.borderWidth
        : 0,
      borderType: highlightGraphStyle.graphStyle.contour.borderType,
      shadowBlur: highlightGraphStyle.graphStyle.shadow.shadowBlur,
      shadowColor: highlightGraphStyle.graphStyle.shadow.shadowColor,
      shadowOffsetX: highlightGraphStyle.graphStyle.shadow.shadowOffsetX,
      shadowOffsetY: highlightGraphStyle.graphStyle.shadow.shadowOffsetY
    }
  } else {
    options.timeline.emphasis.itemStyle = {
      ...options.timeline.itemStyle
    }
  }

  //图形进度条
  if (progressGraphStyle.display) {
    options.timeline.progress.itemStyle = {
      color: progressGraphStyle.graphStyle.color,
      borderColor: progressGraphStyle.graphStyle.contour.borderColor,
      borderWidth: progressGraphStyle.graphStyle.contour.display
        ? progressGraphStyle.graphStyle.contour.borderWidth
        : 0,
      borderType: progressGraphStyle.graphStyle.contour.borderType,
      shadowBlur: progressGraphStyle.graphStyle.shadow.shadowBlur,
      shadowColor: progressGraphStyle.graphStyle.shadow.shadowColor,
      shadowOffsetX: progressGraphStyle.graphStyle.shadow.shadowOffsetX,
      shadowOffsetY: progressGraphStyle.graphStyle.shadow.shadowOffsetY
    }
  } else {
    options.timeline.emphasis.itemStyle = {
      ...options.timeline.itemStyle
    }
  }

  //控制按钮描边
  if (textStyle.contour.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      borderColor: textStyle.contour.borderColor,
      borderWidth: textStyle.contour.borderWidth,
      borderType: textStyle.contour.borderType
    }
  } else {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      borderColor: textStyle.color,
      borderWidth: 1,
      borderType: 'solid'
    }
  }

  //控制按钮高亮
  if (controlHlightStyle.display) {
    options.timeline.emphasis.controlStyle = {
      borderColor: controlHlightStyle.contour.borderColor,
      borderWidth: controlHlightStyle.contour.display ? controlHlightStyle.contour.borderWidth : 0,
      borderType: controlHlightStyle.contour.borderType,
      color: controlHlightStyle.color,
      shadowBlur: controlHlightStyle.shadow.shadowBlur,
      shadowColor: controlHlightStyle.shadow.shadowColor,
      shadowOffsetX: controlHlightStyle.shadow.shadowOffsetX,
      shadowOffsetY: controlHlightStyle.shadow.shadowOffsetY
    }
  } else {
    options.timeline.emphasis.controlStyle = {
      borderColor: options.timeline.controlStyle.borderColor,
      borderWidth: options.timeline.controlStyle.borderWidth,
      borderType: options.timeline.controlStyle.borderType,
      color: textStyle.color,
      shadowBlur: textStyle.shadow.shadowBlur,
      shadowColor: textStyle.shadow.shadowColor,
      shadowOffsetX: textStyle.shadow.shadowOffsetX,
      shadowOffsetY: textStyle.shadow.shadowOffsetY
    }
  }

  //一堆按钮
  if (nextConfig.nextIconType === 'custom' && nextConfig.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      nextIcon: getUsableSvgPath(nextConfig.nextIcon) || 'icon'
    }
  }
  if (prevConfig.prevIconType === 'custom' && prevConfig.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      prevIcon: getUsableSvgPath(prevConfig.prevIcon) || 'icon'
    }
  }
  if (playConfig.playButton.playIconType === 'custom' && playConfig.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      playIcon: getUsableSvgPath(playConfig.playButton.playIcon) || 'icon'
    }
  }
  if (playConfig.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      itemSize: playConfig.size,
      itemGap: playConfig.gap
    }
  }
  if (playConfig.stopButton.stopIconType === 'custom' && playConfig.display) {
    options.timeline.controlStyle = {
      ...options.timeline.controlStyle,
      stopIcon: getUsableSvgPath(playConfig.stopButton.stopIcon) || 'icon'
    }
  }

  const _num = {
    auto: () => {},
    showAll: () => {
      options.timeline.label.interval = 0
    },
    none: () => {
      options.timeline.label.interval = timeLabel.splitNumber
    }
  }
  _num[timeLabel.splitType] && _num[timeLabel.splitType]()

  return options
}

//生成x轴
export function getSortXAxis(config: XAxis) {
  const {
    textStyle,
    axisTick = {
      display: true,
      borderType: 'solid',
      borderColor: 'red',
      borderWidth: 1
    }
  } = config
  const options: any = {
    xAxis: [
      {
        type: 'value',
        show: false
      },
      {
        show: config.display,
        type: 'value',
        axisLabel: {
          show: textStyle.display
        },
        splitLine: {
          show: axisTick?.display
        }
      }
    ]
  }
  if (textStyle.display) {
    options.xAxis[1].axisLabel = {
      show: true,
      fontFamily: textStyle.fontFamily,
      fontSize: textStyle.fontSize,
      color: textStyle.color,
      fontWeight: textStyle.fontWeight,
      rotate: textStyle.rotate
    }
  }
  if (axisTick.display) {
    options.xAxis[1].splitLine = {
      show: true,
      lineStyle: {
        type: axisTick.borderType,
        width: axisTick.borderWidth,
        color: axisTick.borderColor
      }
    }
  }

  return options
}

//生成系列series
export function getSortSeries(config: SortBarProps) {
  const { globalConfig, axisConfig, seriesConfig } = config,
    { barStyle, valueLabel } = globalConfig,
    { yAxis } = axisConfig,
    { dataSeries = [] } = seriesConfig
  const radiuObj = {
    bullet: [0, 9999999, 9999999, 0],
    square: [0, 0, 0, 0],
    custom: [barStyle.fillet?.lt, barStyle.fillet?.rt, barStyle.fillet?.rb, barStyle.fillet?.lb]
  }

  const options: any = {
    series: [
      {
        name: '',
        type: 'bar',
        barGap: '-100%',
        itemStyle: { color: 'rgba(0,0,0,0)' },
        barWidth: barStyle.barWidth
      },
      {
        name: '',
        type: 'bar',
        barGap: '-100%',
        showBackground: false,
        itemStyle: {
          borderRadius: radiuObj[barStyle.barType]
        },
        xAxisIndex: 1,
        barWidth: barStyle.barWidth,
        label: {
          show: false
        }
      },
      {
        type: 'pictorialBar',
        name: '',
        z: 3,
        barGap: '-100%',
        silent: true,
        label: {
          show: false
        },
        tooltip: { show: false }
      },
      {
        type: 'pictorialBar',
        name: '',
        z: 4,
        barGap: '-100%',
        silent: true,
        label: {
          show: false
        },
        tooltip: { show: false }
      }
    ]
  }

  if (barStyle.barBgColor?.display) {
    options.series[1].showBackground = true
    options.series[1].backgroundStyle = {
      color: barStyle.barBgColor.color,
      opacity: barStyle.barBgColor.opacity / 100
    }

    if (barStyle.barBgColor?.syncRadius !== undefined) {
      barStyle.barBgColor?.syncRadius
        ? (options.series[1].backgroundStyle.borderRadius = radiuObj[barStyle.barType])
        : (options.series[1].backgroundStyle.borderRadius = [
            barStyle.barBgColor?.fillet?.lt,
            barStyle.barBgColor?.fillet?.rt,
            barStyle.barBgColor?.fillet?.rb,
            barStyle.barBgColor?.fillet?.lb
          ])
    }
  }

  if (valueLabel.display) {
    options.series[0].label = {
      show: true,
      fontFamily: valueLabel.valueStyle?.fontFamily,
      fontSize: valueLabel.valueStyle?.fontSize,
      fontWeight: valueLabel.valueStyle?.fontWeight,
      offset: [valueLabel.valueStyle?.xOffset, valueLabel.valueStyle?.yOffset],
      rotate: valueLabel.valueStyle?.rotate,
      position: valueLabel.position,
      formatter: params => {
        const val = params.value

        return numberForMat(val, valueLabel.valueStyle?.format)
      }
    }
  } else {
    options.series[0].label = {
      show: false
    }
  }

  if (yAxis.display) {
    const { textStyle } = yAxis
    options.series[1].label = {
      show: true,
      fontFamily: textStyle.fontFamily,
      color: textStyle.color,
      fontSize: textStyle.fontSize,
      fontWeight: textStyle.fontWeight,
      rotate: textStyle.rotate,
      distance: yAxis.distance,
      position: 'left',
      formatter: params => {
        let val = ''
        const findSeries = [...dataSeries].reverse().find(v => v.map?.fieldName === params.name)
        val = findSeries && findSeries.map?.displayName ? findSeries.map?.displayName : params.data._name || params.name

        return val
      }
    }
  } else {
    options.series[1].label = {
      show: false
    }
  }
  return options
}

//生成时间轴图表的options
export function getSortOptions(
  config: SortBarProps,
  dataMemo: { key: SortlDataMap[] },
  styledsMemo: { key: DataSeries[] }
) {
  const { globalConfig } = config,
    { valueLabel, barCount = 10, titleConfig } = globalConfig,
    { mainTitle, subTitle } = titleConfig
  const sortData: any = {
    options: []
  }

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const _dataMemo = dataMemo[key].slice(-barCount),
        yAxisData = _dataMemo.map(v => v.category) || [],
        valueData = _dataMemo.map(v => v.value) || [],
        noValue = _dataMemo.map(v => v.no) || [],
        idsValue = _dataMemo.map(v => v._ids) || [],
        styleData = styledsMemo[key].slice(-barCount)

      const _data: any = {
        title: {},
        yAxis: {
          data: yAxisData
        },
        series: []
      }

      if (mainTitle.display) {
        const mainText = getSortTitleText(mainTitle, valueData, key, 'mainContentType')
        _data.title = { text: mainText || '' }
      }
      if (subTitle.display) {
        const subText = getSortTitleText(subTitle, valueData, key, 'subContentType')
        _data.title = {
          ..._data.title,
          subtext: subText || ''
        }
      }
      //第一个series 数值标签
      const valueLabelSeries: any = { data: [] }
      valueData.forEach((v, i) => {
        const color = getEchartColor(styleData[i].name.color),
          useSeriesColors = typeof color === 'string',
          seriesColor = getValueColor(color, useSeriesColors)
        const _valueLabelSeries = {
          value: v,
          label: {
            color: valueLabel.valueStyle?.syncValueColor ? seriesColor : valueLabel.valueStyle?.color
          }
        }
        valueLabelSeries.data.push(_valueLabelSeries)
      })
      _data.series.push(valueLabelSeries)

      //第二个series 文本标签
      const textLabelSeries: any = { data: [] }
      valueData.forEach((v, i) => {
        const _textLabelSeries = {
          value: v,
          _time: key || '',
          _name: _dataMemo[i].categoryTitle,
          _realName: _dataMemo[i].category,
          _no: noValue[i],
          _ids: idsValue[i],
          itemStyle: {
            color: getEchartColor(styleData[i].name.color)
          }
        }
        textLabelSeries.data.push(_textLabelSeries)
      })
      _data.series.push(textLabelSeries)

      //第三个series 装饰条
      const firstDecorateSeries = getDecorateSeries(valueData, styleData, 'name')
      _data.series.push(firstDecorateSeries)
      // //第四个series 装饰条
      const secondDecorateSeries = getDecorateSeries(valueData, styleData, 'no')

      _data.series.push(secondDecorateSeries)
      sortData.options.push(_data)
    }
  }

  return sortData
}

//系列样式循环列表
export const getSortDataSeriesStyle = (dataMemo: SortlDataMap[], DataSeries: DataSeries[]): any => {
  let _index = 0
  const styleMap = new Map(null),
    loopArr: any[] = [],
    datakeys = dataMemo.map(v => {
      return { name: v.category, no: String(v.no) }
    }),
    demoStyle: any[] = []

  const noFileNameSeries = DataSeries.filter(ser => !ser?.map?.fieldName)

  if (noFileNameSeries && noFileNameSeries.length) {
    //有空项
    DataSeries.forEach(v => {
      if (v.map?.fieldName) {
        styleMap.set(v.map?.fieldName, v)
      } else {
        loopArr.push(v)
      }
    })
  } else {
    DataSeries.forEach(v => {
      styleMap.set(v.map?.fieldName, v)
      loopArr.push(v)
    })
  }

  datakeys.forEach(v => {
    const seriesLen = loopArr.length

    if (styleMap.has(v.no) && styleMap.has(v.name)) {
      demoStyle.push({ name: styleMap.get(v.name), no: styleMap.get(v.no) })
    } else if (styleMap.has(v.name)) {
      demoStyle.push({ name: styleMap.get(v.name) })
    } else if (styleMap.has(v.no)) {
      demoStyle.push({ name: styleMap.get(v.no) })
    } else {
      demoStyle.push({ name: loopArr[_index % seriesLen] })
      _index++
    }
  })

  return demoStyle
}

//系列样式封装
export const getSortStyleDemo = (dataMemo: { key: SortlDataMap[] }, DataSeries: DataSeries[]): any => {
  const styleData: any = {}
  Object.keys(dataMemo).forEach(v => {
    styleData[v] = getSortDataSeriesStyle(dataMemo[v] || [], DataSeries)
  })
  return styleData
}

//生成装饰条的series
export const getDecorateSeries = (valueData: any[], styleData: { key: DataSeries[] }, type: string) => {
  //第三个series 装饰条
  const decorateSeries: any = { data: [] }

  valueData.forEach((v, i) => {
    const _decorateSeries: any = {
      value: v,
      itemStyle: {
        color: getEchartColor(styleData[i].name.color)
      },
      symbolSize: [0, 0]
    }

    if (styleData[i][type]?.decorate.display) {
      const { decIconConfig, iconSize, position } = styleData[i][type].decorate
      //
      _decorateSeries.symbolPosition = position.place
      _decorateSeries.symbolSize = [iconSize?.width, iconSize?.height]
      _decorateSeries.symbolOffset = [position?.offset, 0]
      switch (decIconConfig?.iconType) {
        case 'system': {
          _decorateSeries.symbol = decIconConfig?.systemStyle
          break
        }
        case 'custom': {
          _decorateSeries.symbol = `image://${decIconConfig?.customUrl}`
          break
        }
        case 'svg': {
          _decorateSeries.symbol = getUsableSvgPath(decIconConfig?.svgPath)
          break
        }
      }
    }

    decorateSeries.data.push(_decorateSeries)
  })

  return decorateSeries
}

// 生成标题options
export const getSortTitleOptions = (config: TitleConfig) => {
  let option: any = {}
  const { mainTitle, subTitle, speed = 10, xPosition, yPosition, xOffset, yOffset } = config

  option = {
    title: {
      show: true,
      textStyle: {
        fontFamily: mainTitle.fontFamily,
        color: mainTitle.color,
        fontSize: mainTitle.fontSize,
        fontWeight: mainTitle.fontWeight,
        textShadowBlur: mainTitle.shadow.shadowBlur,
        textShadowColor: mainTitle.shadow.shadowColor,
        textShadowOffsetX: mainTitle.shadow.shadowOffsetX,
        textShadowOffsetY: mainTitle.shadow.shadowOffsetY
      },
      subtextStyle: {
        fontFamily: subTitle.fontFamily,
        color: subTitle.color,
        fontSize: subTitle.fontSize,
        fontWeight: subTitle.fontWeight,
        textShadowBlur: subTitle.shadow.shadowBlur,
        textShadowColor: subTitle.shadow.shadowColor,
        textShadowOffsetX: subTitle.shadow.shadowOffsetX,
        textShadowOffsetY: subTitle.shadow.shadowOffsetY
      },
      itemGap: speed
    }
  }

  xPosition !== 'auto' ? (option.title.left = xPosition) : (option.title.left = xOffset)
  yPosition !== 'auto' ? (option.title.top = yPosition) : (option.title.top = yOffset)

  return option
}

//标题
export const getSortTitleText = (config: MainTitle, valueData: any, value: any, type: string) => {
  let text: any = ''
  switch (config[type]) {
    case 'currentTime':
      text = value
      break
    case 'total':
      {
        const total = valueData.reduce((t, v) => v + t, 0) || 0,
          _text = numberForMat(total, config.numberFormat)
        text = `${config.prefix}${_text}${config.unit}`
      }
      break
    case 'custom':
      text = config.content.value
      break
    default:
      break
  }
  return text
}
