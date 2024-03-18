import { configDisplayCompatible } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions } from '../../../common'
import { GeneralLegend, GeneralDataMap } from '../../../common/type'
import { BasicLineProps, LineDataSeries, LineGlobalConfig, LineSeriesConfig } from '../type'
import { deafultBrokenLineValue, defaultDataMarkerValue, defaultValueLabelValue } from './deafultValue'

// 生成全局options
export function getLineGlobalOptions(config: LineGlobalConfig) {
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

//生成图例系列options
export const getLineLegendOptions = (config: GeneralLegend, dataMemo: any, dataSeries: LineDataSeries[]) => {
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
          const findData = dataMemo[name]?.find((v: GeneralDataMap) => v.seriesTitle)
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

function getLineSeriesData(data) {
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

//生成series的option

export const getLineSeriesOptions = (config: BasicLineProps, dataMemo: any, colors: any[]) => {
  const options: any = {
    series: []
  }
  let i = 0
  const { markSeries = [], markPointSeries = [], dataSeries = [] } = (config.seriesConfig || {}) as LineSeriesConfig

  const dataAnimate = config.globalConfig?.dataAnimate || false

  // 标线
  const markLine = getMarkLineOptions(markSeries)
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries)

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key]
      const _data = getLineSeriesData(item)
      const brokenLine = dataSeries[i]?.brokenLine || deafultBrokenLineValue //折线
      const dataMarker = dataSeries[i]?.dataMarker || defaultDataMarkerValue //数据标记
      const valueLabel = dataSeries[i]?.valueLabel || defaultValueLabelValue //数值标签

      const color = getEchartColor(colors[i])

      const _series: any = {
        type: 'line',
        name: key === '_none' ? '' : key,
        step: brokenLine.step === 'none' ? false : brokenLine.step, //阶梯图
        smooth: brokenLine.smooth, //平滑展示
        connectNulls: brokenLine.connectNulls, //null值连接
        showSymbol: dataMarker.display,
        symbolOffset: [dataMarker.xOffset, dataMarker.yOffset],
        symbolSize: [dataMarker.width, dataMarker.height],
        symbolRotate: dataMarker.rotate,
        lineStyle: {
          type: brokenLine.type,
          color,
          width: brokenLine.lineWidth,
          shadowBlur: brokenLine.shadowBlur,
          shadowColor: brokenLine.shadowColor,
          shadowOffsetX: brokenLine.shadowOffsetX,
          shadowOffsetY: brokenLine.shadowOffsetY,
          opacity: brokenLine.opacity
        },
        markLine,
        markPoint,
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
            const val = params.value[1]
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
