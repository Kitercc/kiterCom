import React, { memo, useMemo } from 'react'
import { getColorObj } from '../../common/util'
import { defaultBorderStyle, defaultBoxShadow, defaultFillColor } from '../common/defaultValue'
import { GraphicsProps } from '../type'

interface StyleProps extends GraphicsProps {
  randomId: string
}

export default memo(function GraphicsStyle(props: StyleProps) {
  const {
    randomId,
    fillColor = defaultFillColor,
    borderStyle = defaultBorderStyle,
    outShadow = defaultBoxShadow
  } = props
  const { borderColor, display: borderDisplay } = borderStyle

  const getBorderColor = useMemo(() => {
    const { color, colorType } = getColorObj(borderColor)
    if (colorType === 'single') {
      return [
        { color, begins: '0%', gradualAngle: 0 },
        { color, begins: '100%', gradualAngle: 0 }
      ]
    } else {
      try {
        const { gradient } = borderColor
        // gradient.colors.sort((a, b) => a.begins - b.begins)
        const beginsLen = gradient.colors.filter(v => v.begins === 0).length
        if (beginsLen !== gradient.colors.length) {
          return gradient.colors.map(v => {
            return {
              color: v.value,
              begins: v.begins + '%',
              gradualAngle: gradient.gradualAngle
            }
          })
        }
        return gradient.colors.map((v, i) => {
          return {
            color: v.value,
            begins: (100 / (beginsLen - 1)) * i + '%',
            gradualAngle: gradient.gradualAngle
          }
        })
      } catch (error) {
        console.warn(error)
        return [
          { color: 'none', begins: '0%', gradualAngle: 0 },
          { color: 'none', begins: '100%', gradualAngle: 0 }
        ]
      }
    }
  }, [borderColor])

  const getFillColor = useMemo(() => {
    if (!fillColor?.display || typeof fillColor === 'string') {
      return [
        { color: 'none', begins: '0%', gradualAngle: 0 },
        { color: 'none', begins: '100%', gradualAngle: 0 }
      ]
    }
    const { color, colorType } = getColorObj(fillColor.color)
    if (colorType === 'single') {
      return [
        { color, begins: '0%', gradualAngle: 0 },
        { color, begins: '100%', gradualAngle: 0 }
      ]
    } else {
      try {
        const { gradient } = fillColor.color
        // gradient.colors.sort((a, b) => a.begins - b.begins)
        const beginsLen = gradient.colors.filter(v => v.begins === 0).length
        if (beginsLen !== gradient.colors.length) {
          return gradient.colors.map(v => {
            return {
              color: v.value,
              begins: v.begins + '%',
              gradualAngle: gradient.gradualAngle
            }
          })
        }
        return gradient.colors.map((v, i) => {
          return {
            color: v.value,
            begins: (100 / (beginsLen - 1)) * i + '%',
            gradualAngle: gradient.gradualAngle
          }
        })
      } catch (error) {
        console.warn(error)
        return [
          { color: 'none', begins: '0%', gradualAngle: 0 },
          { color: 'none', begins: '100%', gradualAngle: 0 }
        ]
      }
    }
  }, [fillColor])

  return (
    <svg width='0' height='0' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient
          id={`fillGradient_${randomId}`}
          x1='0%'
          y1='50%'
          x2='100%'
          y2='50%'
          gradientTransform={`rotate(${
            (String(getFillColor[0].gradualAngle) ? getFillColor[0].gradualAngle : 90) - 90
          } 0.5 0.5)`}>
          {getFillColor.map((v, i) => (
            <stop key={i} offset={v.begins} stopColor={v.color} />
          ))}
        </linearGradient>

        <linearGradient
          id={`strokeGradient_${randomId}`}
          x1='0%'
          y1='50%'
          x2='100%'
          y2='50%'
          gradientTransform={`rotate(${
            (String(getBorderColor[0].gradualAngle) ? getBorderColor[0].gradualAngle : 90) - 90
          } 0.5 0.5)`}>
          {borderDisplay ? getBorderColor.map((v, i) => <stop key={i} offset={v.begins} stopColor={v.color} />) : null}
        </linearGradient>

        <filter id={`dropShadow_Blur_${randomId}`}>
          <feMorphology
            operator='dilate'
            radius={outShadow.display ? outShadow.extend : 0}
            in='SourceAlpha'
            result='thicken'></feMorphology>
          <feOffset
            dx={outShadow.display ? outShadow.x : 0}
            dy={outShadow.display ? outShadow.y : 0}
            result='offset'
            in='thicken'></feOffset>
          <feGaussianBlur
            in='offset'
            stdDeviation={outShadow.display ? outShadow.vague : 0}
            result='blurred'></feGaussianBlur>
          <feFlood floodColor={outShadow.display ? outShadow.color : 'none'} result='glowColor'></feFlood>
          <feComposite in='glowColor' in2='blurred' operator='in' result='softGlow_colored_0'></feComposite>
          <feMerge>
            <feMergeNode in='softGlow_colored_0'></feMergeNode>
            <feMergeNode in='SourceGraphic'></feMergeNode>
          </feMerge>
        </filter>
        <filter id={`Gaussian_Blur_${randomId}`}>
          <feGaussianBlur in='SourceGraphic' stdDeviation='5'></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  )
})
