import { getSize } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { GeneralPieDataMap } from '../../../common/type'
import { getRingSection } from '../../LczFixedBubble/commom'
import { CustomStyle, DefaultStyle, MechanicalBubblehighlight, MechanicalBubbleProps } from '../type'
import * as d3 from 'd3'
import { getEchartColor } from '../../../common'
import { BubbleValueLabel } from '../../LczFixedBubble/type'
function getRoam(roamMove: boolean, roamScale: boolean) {
  if (roamMove && roamScale) return true
  if (!roamMove && !roamScale) return false
  if (roamMove == true && roamScale == false) return 'move'
  if (roamMove == false && roamScale == true) return 'scale'
}

/**
 *
 * @param arr
 * @returns 初始data去重
 */
export function DifferenceGroup(arr: any[]) {
  return arr.reduce((t, v) => (!t.some(i => i.item == v.item) && v.item && v.value > 0 && t.push(v), t), [])
}

/**
 *
 * @param itemName
 * @param defaultStyle
 * @param customStyle
 * @returns 返回是用默认样式还是自定义样式
 */

function getSeriesStyle(itemName: string, defaultStyle: DefaultStyle, customStyle: CustomStyle[]) {
  const seriesStyle = {
    type: '',
    data: {} as DefaultStyle | CustomStyle
  }
  const findSeriesStyleIndex = customStyle.findIndex(item => item.customName == itemName)
  if (findSeriesStyleIndex !== -1 && customStyle.length) {
    seriesStyle.type = 'custom'
    seriesStyle.data = customStyle[findSeriesStyleIndex]
  } else {
    seriesStyle.type = 'default'
    seriesStyle.data = defaultStyle
  }
  return seriesStyle
}

function getSeriesItemStyle(
  value: number,
  seriesStyle: { type: string; data: DefaultStyle | CustomStyle },
  defaultStyle: DefaultStyle,
  dataRange: any
) {
  //
  const options: any = {},
    { type } = seriesStyle
  if (type == 'default') {
    const data = seriesStyle.data as DefaultStyle,
      { colorFill, defaultBorderStyle, defaultShadowStyle } = data
    options.itemStyle = {
      borderColor: defaultBorderStyle.borderColor,
      borderWidth: !defaultBorderStyle.display ? 0 : defaultBorderStyle.borderWidth,
      borderType: defaultBorderStyle.borderType,
      shadowBlur: defaultShadowStyle.shadowBlur,
      shadowColor: defaultShadowStyle.shadowColor,
      shadowOffsetX: defaultShadowStyle.shadowOffsetX,
      shadowOffsetY: defaultShadowStyle.shadowOffsetY
    }
    if (colorFill.fillStyle == 'forValue') {
      const inst = d3.interpolate(colorFill.minColor, colorFill.maxColor),
        linear = d3.scale.linear().domain([dataRange.min, dataRange.max]),
        t = linear(value || 0)
      options.itemStyle.color = inst(t)
    } else {
      options.itemStyle.color = getEchartColor(colorFill.defaultColor)
    }
  } else {
    const data = seriesStyle.data as CustomStyle,
      { customStyle, customBorderStyle, customShadowStyle } = data,
      { defaultBorderStyle, defaultShadowStyle } = defaultStyle
    if (customStyle.customStyleSync) {
      options.itemStyle = {
        color: getEchartColor(customStyle.color),
        borderColor: defaultBorderStyle.borderColor,
        borderWidth: !defaultBorderStyle.display ? 0 : defaultBorderStyle.borderWidth,
        borderType: defaultBorderStyle.borderType,
        shadowBlur: defaultShadowStyle.shadowBlur,
        shadowColor: defaultShadowStyle.shadowColor,
        shadowOffsetX: defaultShadowStyle.shadowOffsetX,
        shadowOffsetY: defaultShadowStyle.shadowOffsetY
      }
    } else {
      options.itemStyle = {
        color: getEchartColor(customStyle.color),
        borderColor: customBorderStyle.borderColor,
        borderWidth: !customBorderStyle.display ? 0 : customBorderStyle.borderWidth,
        borderType: customBorderStyle.borderType,
        shadowBlur: customShadowStyle.shadowBlur,
        shadowColor: customShadowStyle.shadowColor,
        shadowOffsetX: customShadowStyle.shadowOffsetX,
        shadowOffsetY: customShadowStyle.shadowOffsetY
      }
    }
  }
  return { ...options }
}

/**
 *
 * @param config
 * @param dataMemo
 * @param dataRange
 * @param total
 * @param _size
 * @returns 获取seriesData
 */

function getSeriesData(
  config: MechanicalBubbleProps,
  dataMemo: GeneralPieDataMap[],
  dataRange: any,
  total: number,
  _size: any
) {
  const { globalConfig, bubbleConfig } = config,
    { bubbleValueLabel } = globalConfig,
    { defaultStyle, customStyle = [] } = bubbleConfig
  const seriesData = dataMemo.map((v: any) => {
    const seriesStyle = getSeriesStyle(v.item, defaultStyle, customStyle),
      itemStyleData = getSeriesItemStyle(v.value, seriesStyle, defaultStyle, dataRange)

    const _data: any = {
      name: v.item,
      nameTitle: v.itemTitle,
      value: v.value,
      ids: v._ids,
      label: { show: false },
      itemStyle: itemStyleData.itemStyle,
      symbolSize: 60
    }

    //气泡尺寸

    _data.symbolSize = getSize(dataRange, _size, v.value || 0)
    //数值标签

    if (bubbleValueLabel.display) {
      const { normalSeriesName, normalValue } = bubbleValueLabel,
        { suffix } = normalValue

      _data.label.show = true
      _data.label.position = bubbleValueLabel.position

      const rich: {
        s?: any
        value?: any
        valueSuf?: any
      } = {}

      if (normalSeriesName?.display) {
        const { textStyle } = normalSeriesName,
          size = {
            ...getRingSection(textStyle.fontSize)
          }
        rich.s = {
          color: textStyle?.color,
          fontSize: getSize(dataRange, size, v.value),
          fontWeight: textStyle?.fontWeight,
          fontFamily: textStyle?.fontFamily,
          align: 'center',
          padding: [normalSeriesName.yOffset, 0, 0, normalSeriesName.xOffset]
        }
      }
      if (normalValue?.display) {
        const { textStyle } = normalValue,
          size = {
            ...getRingSection(textStyle.fontSize)
          }
        rich.value = {
          color: textStyle?.color,
          fontSize: getSize(dataRange, size, v.value),
          fontWeight: textStyle?.fontWeight,
          align: 'center',
          fontFamily: textStyle?.fontFamily,
          padding: [normalValue.yOffset, 0, 0, normalValue.xOffset]
        }

        // 占比值后缀
        if (suffix.display) {
          const { suffixStyle } = suffix,
            suffixSize = {
              ...getRingSection(suffixStyle.fontSize)
            }
          rich.valueSuf = {
            color: suffix?.suffixNoramlStyleFollow ? rich.value?.color : suffixStyle?.color,
            fontSize: suffix?.suffixNoramlStyleFollow ? rich.value?.fontSize : getSize(dataRange, suffixSize, v.value),
            fontWeight: suffix?.suffixNoramlStyleFollow ? rich.value?.fontWeight : suffixStyle?.fontWeight,
            fontFamily: suffix?.suffixNoramlStyleFollow ? rich.value?.fontFamily : suffixStyle?.fontFamily,
            padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
          }
        }
      }

      _data.label.rich = rich
      _data.label.formatter = param => {
        const { value, name: _name, nameTitle } = param.data,
          name = nameTitle || _name
        let displaySeriesName = '',
          displayValue = ''
        const labelValue = normalValue.valueDisplay == 'true' ? value : (value / total) * 100,
          _value = numberForMat(labelValue, normalValue.numberformat)
        const divide = name && bubbleValueLabel.distribution === 'vertical' ? '\n' : ' '
        if (normalSeriesName.display && name) {
          displaySeriesName = `{s|${name}}${divide}`
        }
        if (normalValue?.display) {
          let suf = ''
          if (suffix.display && suffix.content && normalValue.valueDisplay == 'true')
            suf = `{valueSuf|${suffix.content}}`
          displayValue = `{value|${_value}${normalValue.valueDisplay == 'true' ? '' : '%'}}${suf}`
        }
        return `${displaySeriesName}${displayValue}`
      }
    }
    return _data
  })

  return seriesData
}

//高亮配置
const getEmphasis = (highlight: MechanicalBubblehighlight, bubbleValueLabel: BubbleValueLabel, total: number) => {
  const { highlightValueLabel } = highlight
  const emphasis: any = {
    disabled: !highlight.display,
    scale: highlight.scale,
    focus: 'none',
    label: { show: true }
  }

  if (highlightValueLabel.display) {
    if (highlightValueLabel.styleSync) {
      return emphasis
    } else {
      const { highlightSeriesName, highlightValue } = highlightValueLabel,
        { suffix } = highlightValue

      emphasis.label.position = highlightValueLabel.position

      const rich: {
        s?: any
        value?: any
        valueSuf?: any
      } = {}

      if (highlightSeriesName?.display) {
        const { textStyle } = highlightSeriesName

        rich.s = {
          color: textStyle?.color,
          fontSize: textStyle.fontSize,
          fontWeight: textStyle?.fontWeight,
          fontFamily: textStyle?.fontFamily,
          align: 'center',
          padding: [highlightSeriesName.yOffset, 0, 0, highlightSeriesName.xOffset]
        }
      }
      if (highlightValue?.display) {
        const { textStyle } = highlightValue

        rich.value = {
          color: textStyle?.color,
          fontSize: textStyle.fontSize,
          fontWeight: textStyle?.fontWeight,
          align: 'center',
          fontFamily: textStyle?.fontFamily,
          padding: [highlightValue.yOffset, 0, 0, highlightValue.xOffset]
        }

        // 占比值后缀
        if (suffix.display) {
          const { suffixStyle } = suffix
          rich.valueSuf = {
            color: suffix?.suffixHighlightStyleFollow ? rich.value?.color : suffixStyle?.color,
            fontSize: suffix?.suffixHighlightStyleFollow ? rich.value?.fontSize : suffixStyle.fontSize,
            fontWeight: suffix?.suffixHighlightStyleFollow ? rich.value?.fontWeight : suffixStyle?.fontWeight,
            fontFamily: suffix?.suffixHighlightStyleFollow ? rich.value?.fontFamily : suffixStyle?.fontFamily,
            padding: [suffix?.yOffset, 0, 0, suffix?.xOffset]
          }
        }
      }

      emphasis.label.rich = rich
      emphasis.label.formatter = param => {
        const { value, name: _name, nameTitle } = param.data,
          name = nameTitle || _name
        let displaySeriesName = '',
          displayValue = ''
        const labelValue = bubbleValueLabel.normalValue.valueDisplay == 'true' ? value : (value / total) * 100,
          _value = numberForMat(labelValue, highlightValue.numberformat)
        const divide = name && highlightValueLabel.distribution === 'vertical' ? '\n' : ' '
        if (highlightSeriesName.display && name) {
          displaySeriesName = `{s|${name}}${divide}`
        }
        if (highlightValue?.display) {
          let suf = ''

          if (suffix.display && suffix.content && bubbleValueLabel.normalValue.valueDisplay == 'true')
            suf = `{valueSuf|${suffix.content}}`
          displayValue = `{value|${_value}${bubbleValueLabel.normalValue.valueDisplay == 'true' ? '' : '%'}}${suf}`
        }

        return `${displaySeriesName}${displayValue}`
      }
    }
  } else {
    emphasis.label.formatter = () => {
      return ''
    }
  }
  return emphasis
}

export const getMechanicalSeries = (config: MechanicalBubbleProps, dataMemo: GeneralPieDataMap[]) => {
  const { globalConfig, bubbleConfig } = config,
    { margin, repulsion, roamMove, roamScale, friction, bubbleValueLabel } = globalConfig,
    { defaultStyle, highlightStyle } = bubbleConfig,
    { defaultSize } = defaultStyle

  const valArr = dataMemo.map(v => v.value),
    dataRange = {
      min: Math.min(...valArr),
      max: Math.max(...valArr)
    },
    size = {
      ...getRingSection(defaultSize)
    },
    total = dataMemo.reduce((pre, item) => pre + item.value, 0),
    _emphasis = getEmphasis(highlightStyle, bubbleValueLabel, total)
  const _data = getSeriesData(config, dataMemo, dataRange, total, size)

  const option = {
    series: [
      {
        type: 'graph',
        layout: 'force',
        center: [`${margin.x}%`, `${margin.y}%`],
        force: {
          repulsion: [repulsion.min, repulsion.max],
          friction
        },
        roam: getRoam(roamMove, roamScale),
        emphasis: _emphasis,

        data: _data
      }
    ]
  }
  return option
}
