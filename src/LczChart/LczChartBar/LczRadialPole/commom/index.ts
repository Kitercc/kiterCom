import { formatStr } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { AngleAxis, GeneralDataMap, RadialAxis } from '../../../common/type'
import { ValueLabel } from '../../LczBasicBar/type'
import { getTangAxisOptions } from '../../LczTangentialBar/commom'
import { defaultTangValueLabel } from '../../LczTangentialBar/commom/deafultValue'
import { RadialPoleProps, PoleConfig, DataSeries } from '../type'
import { defaultPoleConfig } from './defaultValue'

//获取极柱图的属性
export const getPolar = (config: RadialPoleProps) => {
  const margin = config.globalConfig?.margin || { x: 50, y: 50 }
  const poleConfig = config.globalConfig?.poleConfig || (defaultPoleConfig as PoleConfig) //极柱样式

  const options: any = {
    polar: {
      radius: [`${poleConfig.columnStyle?.inRadius}%`, `${poleConfig.columnStyle?.outRadius}%`],
      center: [`${margin.x}%`, `${margin.y}%`]
    }
  }
  return options
}

//获取极轴的属性
export const getAxis = (
  _radialAxis: AngleAxis,
  _angleAxis: RadialAxis,
  dataMemo: any[],
  { singleSeries, dataSeries }: { singleSeries: boolean; dataSeries: DataSeries[] }
) => {
  const { angleAxis } = getTangAxisOptions(_radialAxis, dataMemo, 'radialRaius')
  const { radiusAxis } = getTangAxisOptions(_angleAxis, dataMemo, 'radialAxis')

  if (radiusAxis.axisLabel) {
    radiusAxis.axisLabel.formatter = val => {
      let name: string | undefined = val
      const data = Object.values(dataMemo).flat() as GeneralDataMap[]
      const titleSeries = data.find((v: GeneralDataMap) => v.category == val && v.categoryTitle)
      if (!singleSeries) {
        titleSeries ? (name = titleSeries.categoryTitle) : (name = val)
      } else {
        const findSeries = dataSeries.find(v => v.map?.displayName && v.map.fieldName === val)
        titleSeries && (name = titleSeries.categoryTitle)
        findSeries && (name = findSeries.map?.displayName)
      }
      return name
    }

    const axisStyle = _angleAxis.axisLabel?.axisStyle,
      showType = axisStyle?.showType || 'actualLength',
      overflow = axisStyle?.overflow || 'none'
    if ((overflow === 'truncate' || overflow === 'breakAll') && showType === 'outOfCharacter') {
      // 按字符数
      const preFormatter = radiusAxis.axisLabel.formatter,
        chartNum = axisStyle?.charNumber || 0
      radiusAxis.axisLabel.formatter = val => {
        let str = preFormatter(val) || ''
        str = formatStr(str, chartNum, '\n', overflow === 'truncate')
        return str
      }
    }
  }

  return {
    radiusAxis: angleAxis,
    angleAxis: radiusAxis
  }
}

const getSeriesData = (data: GeneralDataMap[], colors: any[], singleSeries: boolean) => {
  const _data = data.map((v: any, i) => {
    const _data: any = {
      name: v.category,
      value: [v.value, v.category],
      ids: v._ids
    }
    if (singleSeries) {
      _data.itemStyle = { color: getEchartColor(colors[i]) }
    }

    return _data
  })

  return _data
}

// 获取系列配置
export const getSeries = (config: RadialPoleProps, dataMemo: any[], colors: any[]) => {
  const globalConfig = config.globalConfig,
    poleConfig = globalConfig?.poleConfig || (defaultPoleConfig as PoleConfig),
    valueLabel = globalConfig?.valueLabel || (defaultTangValueLabel as ValueLabel), // 数值标签
    dataAnimate = globalConfig?.dataAnimate || false,
    singleSeries = globalConfig?.singleSeries || false,
    options: any = {
      series: []
    }
  let i = 0

  for (const key in dataMemo) {
    const data = dataMemo[key],
      _data = getSeriesData(data, colors, singleSeries)
    const _series: any = {
      type: 'bar',
      name: key === '_none' ? '' : key,
      coordinateSystem: 'polar',
      barGap: `${poleConfig.columnStyle?.bargap}%`,
      barCategoryGap: `${poleConfig.columnStyle?.barCategoryGap}%`,
      animation: dataAnimate,
      data: _data
    }

    if (poleConfig.columnBg?.display) {
      _series.showBackground = true
      _series.backgroundStyle = {
        color: poleConfig.columnBg?.color,
        opacity: (poleConfig.columnBg?.opacity || 0) / 100
      }
    }

    if (!singleSeries) {
      _series.itemStyle = {
        color: getEchartColor(colors[i])
      }
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
          const val = params.value[0]
          return numberForMat(val, valueLabel.valueStyle?.format)
        }
      }
    } else {
      _series.label = {
        show: false
      }
    }

    options.series.push(_series)
    i++
  }

  return options
}
