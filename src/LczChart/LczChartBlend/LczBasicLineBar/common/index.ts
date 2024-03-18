/* eslint-disable indent */
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions, getStackArray } from '../../../common'
import { GeneralDataMap } from '../../../common/type'
import { AreaStyle } from '../../../LczChartLine/LczBasicArea/type'
import { BrokenLine } from '../../../LczChartLine/LczBasicLine/type'
import { DataSeries, GlobalConfig, LineBarProps, SeriesConfig, BarStyle, DefaultAreaStyle } from '../type'
import { defaultGlobal } from './defaultValue'

function getSeriesData(data) {
  const _data = data.map((v: any) => {
    const _data: any = {
      name: v.category,
      value: [v.category, v.value],
      ids: v._ids
    }
    return _data
  })
  return _data
}

export const getGlobalOptions = (config: GlobalConfig) => {
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

export const getSeries = (
  config: LineBarProps,
  dataMemo: { [key: string]: GeneralDataMap[] },
  dataSeries: DataSeries[],
  { isStack }: { isStack?: boolean }
) => {
  const { barStyle: barsStyleNormal, lineStyle: lineStyleNormal, areaStyle: areaStyleNormal, dataAnimate = false } =
      config.globalConfig || defaultGlobal,
    { markSeries = [], markPointSeries = [], stackSeries = [] } = (config.seriesConfig || {}) as SeriesConfig,
    chartType = config.chartType || 'linebar'

  const options: any = {
    series: []
  }
  // 标线
  const markLine = getMarkLineOptions(markSeries)
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries)
  //堆叠
  const stackObj = getStackArray(dataMemo, stackSeries)
  let i = 0

  for (const key in dataMemo) {
    const data = dataMemo[key],
      serie = dataSeries[i] || {},
      color = getEchartColor(serie.color)
    let mSeris: any = {}

    switch (serie.chartType) {
      case 'bar': {
        let style: BarStyle = (barsStyleNormal || {}) as BarStyle
        if (serie?.barStyle?.display) style = (serie?.barStyle || {}) as BarStyle
        const { barType, radius, barBgConfig } = style
        const radiuObj = {
          bullet: [9999999, 9999999, 0, 0],
          square: [0, 0, 0, 0],
          custom: [radius?.lt, radius?.rt, radius?.rb, radius?.lb]
        }
        mSeris = {
          name: key === '_none' ? '' : key,
          type: 'bar',
          stack: isStack ? stackObj[key] : '',
          itemStyle: {
            borderRadius: radiuObj[barType],
            color
          },
          barGap: `${barsStyleNormal?.bargap}%`,
          barCategoryGap: `${barsStyleNormal?.barCategoryGap}%`,
          showBackground: false,
          z: 2,
          data: getSeriesData(data),
          label: {
            show: false
          }
        }

        if (barBgConfig?.display) {
          mSeris.showBackground = true
          mSeris.backgroundStyle = {
            color: barBgConfig.color,
            opacity: barBgConfig.opacity / 100
          }
          barBgConfig.syncRadius
            ? (mSeris.backgroundStyle.borderRadius = radiuObj[barType])
            : (mSeris.backgroundStyle.borderRadius = [
                barBgConfig?.radius?.lt,
                barBgConfig?.radius?.rt,
                barBgConfig?.radius?.rb,
                barBgConfig?.radius?.lb
              ])
        }
        break
      }
      case 'line':
      case 'area': {
        let style: BrokenLine = (lineStyleNormal || {}) as BrokenLine,
          areaStyle: DefaultAreaStyle | AreaStyle = (areaStyleNormal || {}) as DefaultAreaStyle
        if (serie?.lineStyle?.display) style = (serie?.lineStyle || {}) as BrokenLine
        if (serie?.areaStyle?.display) areaStyle = (serie.areaStyle || {}) as AreaStyle

        const {
          type = 'solid',
          lineWidth,
          opacity,
          smooth,
          connectNulls,
          shadowBlur = 0,
          shadowColor = 'rgba(0,0,0,0)',
          shadowOffsetX = 0,
          shadowOffsetY = 0
        } = style

        mSeris = {
          name: key === '_none' ? '' : key,
          type: 'line',
          stack: isStack ? stackObj[key] : '',
          smooth,
          connectNulls,
          showSymbol: false,
          lineStyle: {
            type,
            color,
            width: lineWidth,
            opacity: opacity / 100,
            shadowBlur,
            shadowColor,
            shadowOffsetX,
            shadowOffsetY
          },
          z: serie.chartType === 'area' ? 1 : 3,
          itemStyle: {
            color
          },
          data: getSeriesData(data)
        }

        if (serie.dataMarker?.display) {
          const dataMarker = serie.dataMarker
          mSeris.showSymbol = true
          mSeris.symbolOffset = [dataMarker.xOffset, dataMarker.yOffset]
          mSeris.symbolSize = [dataMarker.width, dataMarker.height]
          mSeris.symbolRotate = dataMarker.rotate

          if (dataMarker.markStyle === 'system') {
            mSeris.symbol = dataMarker.typeStyle
            mSeris.itemStyle = {
              borderColor: dataMarker.syncColor ? color : dataMarker.borderColor,
              borderWidth: dataMarker.lineWidth,
              color: dataMarker.syncColor ? color : getEchartColor(dataMarker.color),
              shadowBlur: dataMarker.shadowBlur,
              shadowColor: dataMarker.shadowColor
            }
          } else {
            mSeris.symbol = `image://${dataMarker.img}`
          }
        }

        if ((chartType === 'areabar' || chartType === 'stackAreaBar') && serie.chartType === 'area') {
          mSeris.areaStyle = {
            color,
            origin: areaStyle.startOrigin,
            shadowBlur: areaStyle.shadowBlur,
            shadowColor: areaStyle.shadowColor,
            shadowOffsetX: areaStyle.shadowOffsetX,
            shadowOffsetY: areaStyle.shadowOffsetY,
            opacity: areaStyle.opacity / 100
          }

          if (serie?.areaStyle?.display) {
            const _areaStyle = areaStyle as AreaStyle
            !_areaStyle.areaSyncColor && (mSeris.areaStyle.color = getEchartColor(_areaStyle.color))
          }
        }
        break
      }
    }

    if (serie.valueLabel?.display) {
      const valueLabel = serie.valueLabel
      mSeris.label = {
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
    }

    mSeris.yAxisIndex = serie.valueAxis
    mSeris.animation = dataAnimate
    mSeris.markLine = markLine
    mSeris.markPoint = markPoint

    options.series.push(mSeris)

    i++
  }

  return options
}
