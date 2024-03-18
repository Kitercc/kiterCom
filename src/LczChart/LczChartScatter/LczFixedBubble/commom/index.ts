/* eslint-disable indent */

import { getSize } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { generalTipSuffixConfig, GeneralToolTip } from '../../../common/generalValue'
import { GeneralDataMap, GeneralTooltip, GeneralTooltipConfig } from '../../../common/type'
import {
  BubbleDataSeries,
  BubbleValueLabel,
  FixedBubbleGlobalConfig,
  FixedBubblehighlight,
  FixedBubbleProps,
  LayoutConfig
} from '../type'

function offsetRandom() {
  const max = 100,
    min = 0
  return Math.floor(Math.random() * (max - min)) + min
}

export function getRingSection(extremum) {
  const { min, max } = extremum
  return min >= max ? { min, max } : { min, max }
}

function getSeriesData(
  data: any[],
  bubbleValueLabel: BubbleValueLabel,
  dataRange: { max: number; min: number },
  total: number,
  layoutConfig: LayoutConfig
) {
  const _data = data.map((v: any) => {
    const { randomLayout, customLayout = [] } = layoutConfig
    const _data: any = {
      name: v.category,
      label: { show: false },
      ids: v._ids
    }

    if (randomLayout) {
      _data.value = [offsetRandom(), offsetRandom(), v.value, v]
    } else {
      const _offset = customLayout.reverse().find(item => item.bubbleName == v.category)
      _offset && (_data.value = [_offset.bubbleOffset.xOffset, _offset.bubbleOffset.yOffset, v.value, v])
    }

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
        const { value } = param.data,
          name = value[3].categoryTitle || value[3].category
        let displaySeriesName = '',
          displayValue = ''

        const labelValue = normalValue.valueDisplay == 'true' ? value[2] : (value[2] / total) * 100,
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
  return _data
}

// 生成全局options
export function getGlobalOptions(config: FixedBubbleGlobalConfig) {
  const { bgColor, margin } = config
  return {
    grid: {
      left: margin.l,
      bottom: margin.b,
      right: margin.r,
      top: margin.t,
      containLabel: true
    },
    backgroundColor: bgColor,
    xAxis: [
      {
        gridIndex: 0,
        type: 'value',
        show: false,
        min: 0,
        max: 100,
        nameLocation: 'middle',
        nameGap: 5
      }
    ],
    yAxis: [
      {
        gridIndex: 0,
        min: 0,
        show: false,
        max: 100,
        nameLocation: 'middle',
        nameGap: 30
      }
    ]
  }
}

//高亮配置
const getEmphasis = (highlight: FixedBubblehighlight, bubbleValueLabel: BubbleValueLabel, total: number) => {
  const { highlightStyle, highlightValueLabel } = highlight
  const { color, border, shadow } = highlightStyle
  const emphasis: any = {
    disabled: !highlight.display,
    scale: highlight.scale,
    focus: highlight.focus,
    itemStyle: {
      color: getEchartColor(color),
      borderColor: border.borderColor,
      borderWidth: !border.display ? 0 : border.borderWidth,
      borderType: border.borderType,
      shadowBlur: shadow.shadowBlur,
      shadowColor: shadow.shadowColor,
      shadowOffsetX: shadow.shadowOffsetX,
      shadowOffsetY: shadow.shadowOffsetY
    },
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
        const { value } = param.data,
          name = value[3].categoryTitle || value[3].category
        let displaySeriesName = '',
          displayValue = ''
        const labelValue = bubbleValueLabel.normalValue.valueDisplay == 'true' ? value[2] : (value[2] / total) * 100,
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

//定点气泡图的series
export const getFixedBubbleSeriesOptions = (
  config: FixedBubbleProps,
  dataMemo: any,
  styledsMemo: BubbleDataSeries[],
  normalDataMemo: GeneralDataMap[]
) => {
  const options: any = {
    series: []
  }
  const { globalConfig, seriesConfig, layoutConfig } = config,
    { dataAnimate = false, bubbleSize, bubbleValueLabel } = globalConfig,
    { highlight } = seriesConfig
  const valArr = normalDataMemo.map(v => v.value),
    dataRange = {
      min: Math.min(...valArr),
      max: Math.max(...valArr)
    },
    size = {
      ...getRingSection(bubbleSize)
    },
    total = normalDataMemo.reduce((pre, item) => item.value > 0 && pre + item.value, 0)

  let i = 0
  for (const key in dataMemo) {
    if (Object.prototype.hasOwnProperty.call(dataMemo, key)) {
      const item = dataMemo[key],
        styled = styledsMemo[i],
        _data = getSeriesData(item, bubbleValueLabel, dataRange, total, layoutConfig),
        color = getEchartColor(styled.bubbleStyle.color),
        _emphasis = getEmphasis(highlight, bubbleValueLabel, total)
      const _series: any = {
        type: 'scatter',
        name: key === '_none' ? '' : key,
        symbol: 'circle',
        itemStyle: {
          color,
          borderColor: styled.bubbleStyle.border.borderColor,
          borderWidth: !styled.bubbleStyle.border.display ? 0 : styled.bubbleStyle.border.borderWidth,
          borderType: styled.bubbleStyle.border.borderType,
          shadowBlur: styled.bubbleStyle.shadow.shadowBlur,
          shadowColor: styled.bubbleStyle.shadow.shadowColor,
          shadowOffsetX: styled.bubbleStyle.shadow.shadowOffsetX,
          shadowOffsetY: styled.bubbleStyle.shadow.shadowOffsetY
        },
        emphasis: _emphasis,
        animation: dataAnimate,
        data: _data
      }
      _series.symbolSize = data => {
        const val = data ? data[2] : 0
        return getSize(dataRange, size, val)
      }

      options.series.push(_series)
    }
    i++
  }

  return options
}

// 生成提示框options
export const getBubbleTooltipOptions = function (
  this: any,
  config: GeneralTooltipConfig,
  dataSeries: BubbleDataSeries[]
) {
  let options: any = {}

  function getTipStr(params: any) {
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
    const _name = value[3].categoryTitle || value[3].category
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
            <span style="margin-left:8px;">${_name}</span>
            <span style="margin-left:8px;">${value[3].value}</span>
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
  }

  if (config?.hoverTrigger?.display) {
    const { hoverTrigger, tooltip = GeneralToolTip.tooltip as GeneralTooltip } = config
    const { tipposition, tipStyle } = tooltip

    options = {
      tooltip: {
        trigger: 'item',
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
