import React, { memo, useMemo, useRef } from 'react'
import * as d3 from 'd3'
import { randomChar } from '../../common/util'
import { AnimateConfig, dataMap, GridConfig } from '../type'
import usemMemo from '../../common/hooks/usemMemo'
interface innerBar {
  barWidth: number
  grildNumMemo: number
  gridConfig: GridConfig
  value: number | string
  barRadius: number
  animat: boolean
  proportion: number
  animateConfig: AnimateConfig
  globalWidth: number
  data: dataMap[]
}
export default memo(function ProgressInnerBar(props: innerBar) {
  const {
    globalWidth,
    gridConfig,
    grildNumMemo,
    value,
    barRadius,
    animat,
    proportion,
    animateConfig,
    data = []
  } = props
  const {
    width,
    height,
    space,
    radius,
    gradientRange = 'global',
    colorType = 'bicolor',
    startColor = 'rgba(61, 153, 252, 1)',
    endColor = 'rgba(142, 245, 255, 1)',
    noneColor = 'rgba(61, 153, 252, 1)',
    multiColor,
    progressSection = false,
    progressStyleSection = []
  } = gridConfig
  const { display: animateDis } = animateConfig

  const innerSvgId = useRef<string>(randomChar('gradientsvg-path'))
  const innerRectId = useRef<string>(randomChar('svg-path'))

  const bgWidth = useMemo(() => {
    const w = (width + space) * grildNumMemo - space
    return globalWidth < w ? globalWidth : w
  }, [width, space, grildNumMemo, space, globalWidth])

  const progressColors = usemMemo(() => {
    let colors: { offset: string; stopColor: string }[] = []
    const val = data[0].value
    let _startColor = startColor
    let _endColor = endColor
    let _noneColor = noneColor
    let _multiColor = multiColor

    if (progressSection && progressStyleSection.length) {
      const findSeries = [...progressStyleSection].reverse().find(item => val >= item.min && val <= item.max)
      if (findSeries) {
        _startColor = findSeries.startColor || ''
        _endColor = findSeries.endColor || ''
        _noneColor = findSeries.noneColor || ''
        _multiColor = findSeries.multiColor
      }
    }

    function fillColor([c1, c2], endOffset = '100%') {
      colors = [
        { offset: '0%', stopColor: c1 },
        { offset: endOffset, stopColor: c2 }
      ]
    }

    function fillGradient(_colors: any) {
      _colors.forEach(col => colors.push({ offset: `${col.begins}%`, stopColor: col.value }))
    }

    switch (gradientRange) {
      case 'global': {
        if (colorType === 'bicolor') {
          fillColor([_startColor, _endColor])
        } else {
          const { selected = 'single', single = '#3D99FC', gradient = { colors: [] } } = _multiColor
          if (selected === 'single' || gradient.colors.length === 1) {
            const _color = selected === 'single' ? single : gradient.colors[0].value
            fillColor([_color, _color])
          } else {
            const isZero = gradient.colors.every(color => color.begins == 0),
              speed = isZero ? (1 / (gradient.colors.length - 1)) * 100 : 0,
              colorLen = gradient.colors.length

            if (!isZero && gradient.colors[colorLen - 1].begins !== 100) {
              gradient.colors.push({ begins: 100, value: gradient.colors[colorLen - 1].value })
            }

            const colors = !isZero ? gradient.colors : gradient.colors.map((v, i) => ({ ...v, begins: i * speed }))

            fillGradient(colors)
          }
        }
        break
      }
      case 'local': {
        if (colorType === 'bicolor') {
          fillColor([_startColor, _endColor], String(value))
        } else {
          const { selected = 'single', single = '#3D99FC', gradient = { colors: [] } } = _multiColor
          if (selected === 'single' || gradient.colors.length === 1) {
            const _color = selected === 'single' ? single : gradient.colors[0].value
            fillColor([_color, _color], String(value))
          } else {
            const vals = +String(value).slice(0, -1)
            const linear = d3.scale.linear().domain([0, 100]).range([0, vals])

            const isZero = gradient.colors.every(color => color.begins == 0),
              speed = isZero ? (1 / (gradient.colors.length - 1)) * 100 : 0,
              colorLen = gradient.colors.length

            if (!isZero && gradient.colors[colorLen - 1].begins !== 100) {
              gradient.colors.push({ begins: vals, value: gradient.colors[colorLen - 1].value })
            }
            const colors = (!isZero
              ? gradient.colors
              : gradient.colors.map((v, i) => ({ ...v, begins: i * speed }))
            ).map(v => ({ ...v, begins: linear(v.begins) }))

            fillGradient(colors)
          }
        }
        break
      }
      case 'none': {
        fillColor([_noneColor, _noneColor])
        break
      }
    }
    return colors
  }, [data, gridConfig, value, progressSection, progressStyleSection])

  const startWidth = animat ? value : !animateDis ? value : proportion + '%'

  return (
    <svg className='dotted-line' style={{ width: bgWidth, height, display: 'inherit' }}>
      <defs>
        <linearGradient id={innerSvgId.current} x1='0' y1='0' x2='100%' y2='0'>
          {progressColors.map((item, i) => (
            <stop key={i} offset={item.offset} stopColor={item.stopColor} />
          ))}
        </linearGradient>
        <clipPath id={innerRectId.current}>
          {new Array(grildNumMemo).fill(null).map((v, i) => {
            return <rect x={i * (width + space)} y='0' key={i} width={width} height={height} rx={radius} ry={radius} />
          })}
        </clipPath>
      </defs>
      {(animat || animateConfig.display) && (
        <rect
          className='progress-inner'
          x='0'
          y='0'
          rx={barRadius}
          ry={barRadius}
          height={height}
          fill={`url(#${innerSvgId.current})`}
          clipPath={`url(#${innerRectId.current})`}
          style={{ width: startWidth }}
        />
      )}
    </svg>
  )
})
