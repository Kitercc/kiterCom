import { configDisplayCompatible } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor, getMarkLineOptions, getMarkPointIptions } from '../../../common'
import { mLegendIcon } from '../../../common/material'
import { GeneralDataMap } from '../../../common/type'
import { checkImgExists, getUsableSvgPath } from '../../../common/utils'
import { BarLineLegendConfig } from '../../../LczChartBlend/LczBasicLineBar/type'
import { GlobalConfig, LeetBarProps, SeriesConfig, ValueLabel, LeetDataSeries, GlobalBarStyle } from '../type'
import { defaultGlobal } from './defaultValue'

// 生成全局options
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
    backgroundColor: bgColor
  }
}

function isEmpty(val) {
  return val !== null && !isNaN(val)
}

//生成图例系列options
export const getLeetLegendOptions = (config: BarLineLegendConfig, dataMemo: any, dataSeries: LeetDataSeries[]) => {
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

      const _icon: any = {
        name: v,
        itemWidth: size?.w,
        itemHeight: size?.h,
        textStyle
      }

      //@ts-ignore   混合图表中特有的属性
      if (iconConfig?.legendType !== 'normal') {
        const _iconConfig = ((config || {}) as BarLineLegendConfig).iconConfig
        switch (_iconConfig?.iconType) {
          case 'system': {
            const systemicon = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']

            _icon.icon = systemicon.includes(_iconConfig.systemStyle)
              ? _iconConfig.systemStyle
              : `path://${mLegendIcon[_iconConfig.systemStyle]}`
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

export const getLeetSeriesOptions = async (
  config: LeetBarProps,
  dataMemo: any,
  styleMemo: LeetDataSeries[],
  globalBarStyle: GlobalBarStyle
) => {
  const options: any = {
    series: []
  }
  let i = 0

  const valueLabel = config.globalConfig?.valueLabel || (defaultGlobal.valueLabel as ValueLabel) // 数值标签
  const dataAnimate = config.globalConfig?.dataAnimate || false

  const { markSeries = [], markPointSeries = [] } = (config.seriesConfig || {}) as SeriesConfig

  // 标线
  const markLine = getMarkLineOptions(markSeries)
  // 标注
  const markPoint = getMarkPointIptions(markPointSeries)

  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        _data = getSeriesData(item),
        color = getEchartColor(styleMemo[i].color),
        barStyle = styleMemo[i].barStyle,
        _barStyle = barStyle.display ? barStyle : globalBarStyle
      const _series: any = {
        type: 'pictorialBar',
        name: key === '_none' ? '' : key,
        itemStyle: {
          color,
          opacity: (_barStyle.opacity || 1) / 100
        },
        barGap: `${globalBarStyle.bargap}%`,
        barCategoryGap: `${globalBarStyle.barCategoryGap}%`,
        symbolRepeat: _barStyle.symbolRepeat,
        symbolClip: _barStyle.symbolClip,
        symbolRotate: _barStyle.symbolRotate,
        symbolOffset: [_barStyle.barPosition.xOffset, _barStyle.barPosition.yOffset],
        markLine,
        markPoint,
        animation: dataAnimate,
        data: _data
      }
      if (barStyle.display) {
        switch (barStyle.barType) {
          case 'system': {
            const systemicon = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']

            _series.symbol = systemicon.includes(barStyle.systemStyle)
              ? barStyle.systemStyle
              : `path://${mLegendIcon[barStyle.systemStyle]}`
            break
          }
          case 'custom': {
            await checkImgExists(barStyle.customUrl)
              .then(() => {
                _series.symbol = `image://${barStyle.customUrl}`
              })
              .catch(() => {
                _series.symbol = 'triangle'
              })

            break
          }
          case 'svg': {
            _series.symbol = getUsableSvgPath(barStyle.svgPath)
            break
          }
        }
      } else {
        switch (globalBarStyle.GlobalBarType) {
          case 'system': {
            const systemicon = ['circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none']

            _series.symbol = systemicon.includes(globalBarStyle.systemStyle)
              ? globalBarStyle.systemStyle
              : `path://${mLegendIcon[globalBarStyle.systemStyle]}`
            break
          }
          case 'custom': {
            await checkImgExists(globalBarStyle.customUrl)
              .then(() => {
                _series.symbol = `image://${globalBarStyle.customUrl}`
              })
              .catch(() => {
                _series.symbol = 'triangle'
              })

            break
          }
          case 'svg': {
            _series.symbol = getUsableSvgPath(globalBarStyle.svgPath)
            break
          }
        }
      }

      if (isEmpty(_barStyle.barSize.height) || isEmpty(_barStyle.barSize.width)) {
        const w = isEmpty(_barStyle.barSize.width) ? _barStyle.barSize.width : _barStyle.barSize.height,
          h = isEmpty(_barStyle.barSize.height) ? _barStyle.barSize.height : _barStyle.barSize.width
        _series.symbolSize = [w, h]
      }
      if (valueLabel.display) {
        _series.label = {
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
