import { numberIsEmpty } from '../../../../common/util'
import { numberForMat } from '../../../../LczCarouselTable/common'
import { getEchartColor } from '../../../common'
import { getUsableSvgPath } from '../../../common/utils'
import { WaterPoloProps } from '../type'
import {
  defaultBallStyle,
  defaultGlobal,
  defaultIndexConfig,
  defaultOutlineStyle,
  defaultWaveStyle
} from './defaultValue'

export const getWaterSeries = (props: WaterPoloProps, value: { waterValue: number; nullData: boolean }) => {
  const { globalConfig = defaultGlobal, indexConfig = defaultIndexConfig, waterPoloDiagram = {} } = props,
    { margin = { x: 50, y: 50 }, dataAnimate } = globalConfig,
    { display: indexDisplay = true, textStyle = defaultIndexConfig.textStyle, position } = indexConfig,
    { waterValue, nullData } = value,
    {
      ballStyle = defaultBallStyle,
      waveStyle = defaultWaveStyle,
      border,
      outlineStyle = defaultOutlineStyle
    } = waterPoloDiagram,
    waveLength = `${waveStyle.waveLength >= 1 ? waveStyle.waveLength : 1}%`

  const options: any = {
    series: [
      {
        type: 'liquidFill',
        radius: `${ballStyle.radius}%`,
        center: [`${margin.x}%`, `${margin.y}%`],
        waveAnimation: false,
        waveLength,
        data: [waterValue],
        itemStyle: {
          color: getEchartColor(waveStyle.color),
          opacity: waveStyle.opacity / 100,
          shadowBlur: waveStyle.shadow?.shadowBlur,
          shadowColor: waveStyle.shadow?.shadowColor,
          shadowOffsetX: waveStyle.shadow?.shadowOffsetX,
          shadowOffsetY: waveStyle.shadow?.shadowOffsetY
        },
        label: {
          show: false
        },
        backgroundStyle: {
          color: getEchartColor(ballStyle.color, 'radial'),
          opacity: ballStyle.opacity / 100,
          borderWidth: 0,
          shadowBlur: ballStyle.shadow?.shadowBlur,
          shadowColor: ballStyle.shadow?.shadowColor,
          shadowOffsetX: ballStyle.shadow?.shadowOffsetX,
          shadowOffsetY: ballStyle.shadow?.shadowOffsetY
        },
        outline: {
          show: false
        }
      }
    ]
  }

  if (ballStyle.shape === 'system') {
    options.series[0].shape = ballStyle.symbol
  } else {
    options.series[0].shape = getUsableSvgPath(ballStyle.path)
  }

  if (dataAnimate?.display) {
    options.series[0].waveAnimation = true
    options.series[0].direction = dataAnimate.direction
    options.series[0].amplitude = dataAnimate.amplitude
    numberIsEmpty(dataAnimate.period) && (options.series[0].period = dataAnimate.period)
  }

  if (indexDisplay && !nullData) {
    options.series[0].label = {
      show: true,
      position,
      fontFamily: textStyle?.fontFamily,
      fontSize: textStyle?.fontSize,
      color: textStyle?.color,
      insideColor: textStyle?.insideColor,
      fontWeight: textStyle?.fontWeight,
      align: textStyle?.xAlign,
      baseline: textStyle?.yAlign,
      formatter: () => {
        const val = numberForMat(waterValue, {
          display: textStyle?.format?.display || false,
          decollate: false,
          decimal: textStyle?.format?.decimal || 0,
          round: textStyle?.format?.round || false,
          percentage: textStyle?.format?.percentage || false,
          negativeing: textStyle?.format?.negativeing || 'minus'
        })
        return val
      }
    }
  }

  if (border?.display) {
    options.series[0].backgroundStyle.borderColor = border.color
    options.series[0].backgroundStyle.borderWidth = border.width
  }

  if (outlineStyle.display) {
    options.series[0].outline = {
      show: true,
      borderDistance: outlineStyle.borderDistance,
      itemStyle: {
        borderColor: outlineStyle.color,
        borderWidth: outlineStyle.width,
        shadowBlur: outlineStyle.shadow?.shadowBlur,
        shadowColor: outlineStyle.shadow?.shadowColor,
        shadowOffsetX: outlineStyle.shadow?.shadowOffsetX,
        shadowOffsetY: outlineStyle.shadow?.shadowOffsetY
      }
    }
  }

  return options
}
