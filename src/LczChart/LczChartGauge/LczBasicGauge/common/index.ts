/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { GeneralPieDataMap } from '../../../common/type'
import { getUsableSvgPath } from '../../../common/utils'
import { BasicGaugeConfig, BasicGaugeProps, GaugeAxis, GaugeDataSeries } from '../type'

//检查图片是否存在
const checkImgExists = async (imgurl: any) => {
  return new Promise(function (resolve, reject) {
    const ImgObj = new Image()
    ImgObj.src = imgurl
    ImgObj.onload = function (res) {
      resolve(res)
    }
    ImgObj.onerror = function (err) {
      reject(err)
    }
  })
}

function _isEmpty(val) {
  return val !== null && !isNaN(val)
}

//坐标
const getGaugeAxisOptions = (axisConfig: GaugeAxis) => {
  const options: any = {},
    { axisLabel, axisLine, axisTick, splitLine } = axisConfig

  if (axisLabel.display) {
    const { gaugeAxisLabelTextStyle, gaugeAxisLabaelBgStyle, gaugeAxisLabelShadow, gaugeAxisLabaelFormat } = axisLabel,
      { width } = gaugeAxisLabelTextStyle
    options.axisLabel = {
      show: true,
      distance: axisLabel.distance,
      formatter: val => {
        const _val = numberForMat(val, gaugeAxisLabaelFormat)
        return _val + axisLabel.suffix.content
      },
      fontFamily: gaugeAxisLabelTextStyle.fontFamily,
      fontSize: gaugeAxisLabelTextStyle.fontSize,
      color: gaugeAxisLabelTextStyle.color,
      fontWeight: gaugeAxisLabelTextStyle.fontWeight,
      overflow: gaugeAxisLabelTextStyle.overflow,
      backgroundColor: gaugeAxisLabaelBgStyle.backgroundColor,
      borderColor: gaugeAxisLabaelBgStyle.borderColor,
      borderWidth: gaugeAxisLabaelBgStyle.borderWidth,
      borderRadius: gaugeAxisLabaelBgStyle.borderRadius,
      textShadowBlur: gaugeAxisLabelShadow.shadowBlur,
      textShadowColor: gaugeAxisLabelShadow.shadowColor,
      textShadowOffsetX: gaugeAxisLabelShadow.shadowOffsetX,
      textShadowOffsetY: gaugeAxisLabelShadow.shadowOffsetY
    }
    _isEmpty(width) && (options.axisLabel.width = width)
  } else {
    options.axisLabel = {
      show: false
    }
  }

  if (axisLine.display) {
    const { gaugeAxisLineStyle, guageAxisLineShadow } = axisLine
    const axisLineColorArr: any = []
    if (gaugeAxisLineStyle.colorType === 'unify') {
      axisLineColorArr.push([1, getEchartColor(gaugeAxisLineStyle.unifyColor)])
    } else {
      const c = {
          selected: 'single',
          single: 'rgba(0,178,255,1)',
          gradient: {
            gradualAngle: 90,
            colors: [
              {
                begins: 0,
                value: 'rgba(0,178,255,1)'
              }
            ]
          }
        },
        colorArr = gaugeAxisLineStyle.subsectionConfig || [],
        _colorArr = colorArr.length ? colorArr : [{ subsectionColor: c }]
      _colorArr.forEach((v, i) => {
        axisLineColorArr.push([(1 / (_colorArr.length || 1)) * (i + 1), getEchartColor(v.subsectionColor)])
      })
    }
    options.axisLine = {
      show: true,
      roundCap: gaugeAxisLineStyle.roundCap,
      lineStyle: {
        color: axisLineColorArr,
        opacity: gaugeAxisLineStyle.opacity / 100,
        width: gaugeAxisLineStyle.width,
        shadowBlur: guageAxisLineShadow.shadowBlur,
        shadowColor: guageAxisLineShadow.shadowColor,
        shadowOffsetX: guageAxisLineShadow.shadowOffsetX,
        shadowOffsetY: guageAxisLineShadow.shadowOffsetY
      }
    }
  } else {
    options.axisLine = {
      show: false
    }
  }

  if (axisTick.display) {
    const { gaugeAxisTickStyle, gaugeAxisTickShadow } = axisTick,
      _splitNumber = axisTick.splitNumber
    options.axisTick = {
      show: true,
      distance: axisTick.distance,
      length: gaugeAxisTickStyle.length,
      lineStyle: {
        color: gaugeAxisTickStyle.color,
        opacity: (gaugeAxisTickStyle.opacity || 1) / 100,
        type: gaugeAxisTickStyle.lineType,
        width: gaugeAxisTickStyle.width,
        shadowBlur: gaugeAxisTickShadow.shadowBlur,
        shadowColor: gaugeAxisTickShadow.shadowColor,
        shadowOffsetX: gaugeAxisTickShadow.shadowOffsetX,
        shadowOffsetY: gaugeAxisTickShadow.shadowOffsetY
      }
    }
    _isEmpty(_splitNumber) && (options.axisTick.splitNumber = _splitNumber)
  } else {
    options.axisTick = {
      show: false
    }
  }
  if (splitLine.display) {
    const { gaugeSplitLineStyle, gaugeSplitLineShadow } = splitLine

    options.splitLine = {
      show: true,
      distance: splitLine.distance,
      length: gaugeSplitLineStyle.length,
      lineStyle: {
        color: gaugeSplitLineStyle.color,
        opacity: (gaugeSplitLineStyle.opacity || 1) / 100,
        type: gaugeSplitLineStyle.lineType,
        width: gaugeSplitLineStyle.width,
        shadowBlur: gaugeSplitLineShadow.shadowBlur,
        shadowColor: gaugeSplitLineShadow.shadowColor,
        shadowOffsetX: gaugeSplitLineShadow.shadowOffsetX,
        shadowOffsetY: gaugeSplitLineShadow.shadowOffsetY
      }
    }
  } else {
    options.splitLine = {
      show: false
    }
  }
  return options
}

//仪表盘
const getBasicGaugeOptions = async (gaugeConfig: BasicGaugeConfig) => {
  const options: any = {},
    { pointerConfig, fixedPointConfig, progressConfig } = gaugeConfig

  if (pointerConfig.display) {
    const { pointerStyle, pointerContour, pointerShadow } = pointerConfig

    const _icon =
      pointerStyle.pointerType === 'system'
        ? pointerStyle.systemType === 'Default'
          ? ''
          : pointerStyle.systemType
        : getUsableSvgPath(pointerStyle.customPath)
    options.pointer = {
      show: true,
      icon: _icon,
      showAbove: pointerStyle.showAbove,
      offsetCenter: [pointerStyle.xOffset, pointerStyle.yOffset],
      length: `${pointerStyle.length}%`,
      width: pointerStyle.width,
      itemStyle: {
        opacity: (pointerStyle.opacity || 1) / 100,
        borderColor: pointerContour.color,
        borderWidth: pointerContour.display ? pointerContour.width : 0,
        borderType: pointerContour.lineType,
        shadowBlur: pointerShadow.shadowBlur,
        shadowColor: pointerShadow.shadowColor,
        shadowOffsetX: pointerShadow.shadowOffsetX,
        shadowOffsetY: pointerShadow.shadowOffsetY
      }
    }
    !pointerStyle.pointerSyncColor && (options.pointer.itemStyle.color = getEchartColor(pointerStyle.color))
  } else {
    options.pointer = {
      show: false
    }
  }

  if (fixedPointConfig.display) {
    const { fixedPointerStyle, fixedPointerContour, fixedPointerShadow } = fixedPointConfig
    let _icon = ''
    if (fixedPointerStyle.fixedPointerType === 'system') {
      _icon = fixedPointerStyle.systemType
    } else if (fixedPointerStyle.fixedPointerType === 'svg') {
      _icon = getUsableSvgPath(fixedPointerStyle.svgPath)
    } else {
      await checkImgExists(fixedPointerStyle.customImg)
        .then(() => {
          _icon = `image://${fixedPointerStyle.customImg}`
        })
        .catch(() => {
          _icon = 'circle'
        })
    }

    options.anchor = {
      show: true,
      icon: _icon,
      size: fixedPointerStyle.size,
      showAbove: fixedPointerStyle.showAbove,
      offsetCenter: [fixedPointerStyle.xOffset, fixedPointerStyle.yOffset],
      length: `${fixedPointerStyle.length}%`,
      width: fixedPointerStyle.width,
      itemStyle: {
        color: getEchartColor(fixedPointerStyle.color),
        opacity: (fixedPointerStyle.opacity || 1) / 100
      }
    }
    if (fixedPointerStyle.fixedPointerType == 'system') {
      options.anchor.itemStyle.borderColor = fixedPointerContour.color
      options.anchor.itemStyle.borderWidth = fixedPointerContour.display ? fixedPointerContour.width : 0
      options.anchor.itemStyle.borderType = fixedPointerContour.lineType
      options.anchor.itemStyle.shadowBlur = fixedPointerShadow.shadowBlur
      options.anchor.itemStyle.shadowBlur = fixedPointerShadow.shadowBlur
      options.anchor.itemStyle.shadowColor = fixedPointerShadow.shadowColor
      options.anchor.itemStyle.shadowOffsetX = fixedPointerShadow.shadowOffsetX
      options.anchor.itemStyle.shadowOffsetY = fixedPointerShadow.shadowOffsetY
    }
  } else {
    options.anchor = {
      show: false
    }
  }

  if (progressConfig.display) {
    const { progressStyle, progressContour, progressShadow } = progressConfig
    options.progress = {
      show: true,
      width: progressStyle.width,
      roundCap: progressStyle.roundCap,
      overlap: progressStyle.overlap,
      clip: progressStyle.clip,
      itemStyle: {
        opacity: (progressStyle.opacity || 1) / 100,
        borderColor: progressContour.color,
        borderWidth: progressContour.display ? progressContour.width : 0,
        borderType: progressContour.lineType,
        shadowBlur: progressShadow.shadowBlur,
        shadowColor: progressShadow.shadowColor,
        shadowOffsetX: progressShadow.shadowOffsetX,
        shadowOffsetY: progressShadow.shadowOffsetY
      }
    }
    !progressStyle.syncColor && (options.progress.itemStyle.color = getEchartColor(progressStyle.color))
  } else {
    options.progress = {
      show: false
    }
  }
  return options
}

function getValue(value, { max, min }) {
  const data = value
  if (min === max && data < min) return 0
  if (min === max && data >= max) return 100
  if (data >= max) return 100
  if (data <= min) return 0
  if (min < 0) return ((data - min) / (max - min)) * 100
  return (data / (max - min)) * 100
}

function getGaugeSection(extremum) {
  const { min, max } = extremum
  const minVal = isNaN(min?.value) ? 0 : +min.value
  const maxVal = isNaN(max?.value) ? 100 : +max.value

  return minVal > maxVal ? { min: maxVal, max: minVal } : { min: minVal, max: maxVal }
}

const getDataSerirsOptions = (
  dataMemo: GeneralPieDataMap[],
  stylesMemo: GaugeDataSeries[],
  dataAnimate: { processAn: boolean; numberAn: boolean },
  { min, max }
) => {
  const options: any = []
  dataMemo.forEach((v, i) => {
    let _name = v.item
    const findDataSeries = [...stylesMemo].find(v => v.map?.fieldName === _name)
    if (findDataSeries && findDataSeries.map?.displayName) {
      _name = findDataSeries.map?.displayName
    } else {
      const findData = dataMemo.find((v: any) => v?.item === _name && v?.itemTitle)
      findData && (_name = findData?.itemTitle)
    }

    const { color, gaugeTitleConfig, gaugeDetailConfig } = stylesMemo[i],
      dataItem: any = {
        name: _name,
        value: v.value,
        itemTitle: v.item,
        itemStyle: {
          color: getEchartColor(color)
        }
      }
    if (gaugeTitleConfig.display) {
      const { gaugeTitleStyle, gaugeTitleContour, gaugeTitleShadow } = gaugeTitleConfig
      dataItem.title = {
        show: true,
        color: gaugeTitleStyle.syncColor && color.selected === 'single' ? getEchartColor(color) : gaugeTitleStyle.color,
        backgroundColor: gaugeTitleStyle.backgroundColor,
        fontFamily: gaugeTitleStyle.fontFamily,
        fontSize: gaugeTitleStyle.fontSize,
        fontWeight: gaugeTitleStyle.fontWeight,
        overflow: gaugeTitleStyle.overflow,
        offsetCenter: [gaugeTitleStyle.xOffset, gaugeTitleStyle.yOffset],
        borderColor: gaugeTitleContour.color,
        borderWidth: gaugeTitleContour.display ? gaugeTitleContour.width : 0,
        borderType: gaugeTitleContour.lineType,
        borderRadius: gaugeTitleContour.radius,
        textShadowBlur: gaugeTitleShadow.shadowBlur,
        textShadowColor: gaugeTitleShadow.shadowColor,
        textShadowOffsetX: gaugeTitleShadow.shadowOffsetX,
        textShadowOffsetY: gaugeTitleShadow.shadowOffsetY
      }
      _isEmpty(gaugeTitleStyle.width) && (dataItem.title.width = gaugeTitleStyle.width)
      _isEmpty(gaugeTitleStyle.height) && (dataItem.title.height = gaugeTitleStyle.height)
    } else {
      dataItem.title = {
        show: false
      }
    }

    if (gaugeDetailConfig.display) {
      const {
        gaugeTitleStyle: gaugeDetailStyle,
        gaugeTitleContour: gaugeDetailContour,
        gaugeTitleShadow: gaugeDetailShadow,
        format
      } = gaugeDetailConfig
      dataItem.detail = {
        show: true,
        valueAnimation: dataAnimate.numberAn,
        color:
          gaugeDetailStyle.syncColor && color.selected === 'single' ? getEchartColor(color) : gaugeDetailStyle.color,
        backgroundColor: gaugeDetailStyle.backgroundColor,
        fontFamily: gaugeDetailStyle.fontFamily,
        fontSize: gaugeDetailStyle.fontSize,
        fontWeight: gaugeDetailStyle.fontWeight,
        overflow: gaugeDetailStyle.overflow,
        offsetCenter: [gaugeDetailStyle.xOffset, gaugeDetailStyle.yOffset],
        borderColor: gaugeDetailContour.color,
        borderWidth: gaugeDetailContour.display ? gaugeDetailContour.width : 0,
        borderType: gaugeDetailContour.lineType,
        borderRadius: gaugeDetailContour.radius,
        textShadowBlur: gaugeDetailShadow.shadowBlur,
        textShadowColor: gaugeDetailShadow.shadowColor,
        textShadowOffsetX: gaugeDetailShadow.shadowOffsetX,
        textShadowOffsetY: gaugeDetailShadow.shadowOffsetY,
        formatter: val => {
          let _val = gaugeDetailStyle.isReal ? val : getValue(val, { max, min })
          _val = numberForMat(_val, format)
          return `${_val}${gaugeDetailStyle.isReal ? gaugeDetailStyle.unitContent : '%'}`
        }
      }
      _isEmpty(gaugeDetailStyle.width) && (dataItem.detail.width = gaugeDetailStyle.width)
      _isEmpty(gaugeDetailStyle.height) && (dataItem.detail.height = gaugeDetailStyle.height)
    } else {
      dataItem.detail = {
        show: false
      }
    }
    options.push(dataItem)
  })
  return options
}

export const getGaugeSeries = async (
  props: BasicGaugeProps,
  dataMemo: GeneralPieDataMap[],
  stylesMemo: GaugeDataSeries[]
) => {
  const { globalConfig, axisConfig, gaugeConfig } = props,
    { margin, dataAnimate } = globalConfig,
    { extremumConfig, angleConfig } = gaugeConfig,
    { min, max } = getGaugeSection(extremumConfig)

  //坐标轴
  const axisOptions = getGaugeAxisOptions(axisConfig)

  //仪表盘
  const basicGaugeOptions = await getBasicGaugeOptions(gaugeConfig)

  //item标题详情
  const dataSeries = getDataSerirsOptions(dataMemo, stylesMemo, dataAnimate, { min, max })

  const options = {
    series: [
      {
        name: 'LczBasicGauge',
        type: 'gauge',
        radius: `${gaugeConfig.radius}%`,
        max,
        min,
        center: [`${margin.x}%`, `${margin.y}%`],
        startAngle: angleConfig.startAngle,
        endAngle: angleConfig.endAngle,
        animation: dataAnimate.processAn,
        ...axisOptions,
        ...basicGaugeOptions,
        data: [...dataSeries]
      }
    ]
  }

  return options
}
