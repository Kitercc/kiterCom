import React, { memo, useRef } from 'react'
import { TipArea } from '../../../LczChina2dMap/type/child'
import { usemMemo } from '../../../common/hooks'
import { randomChar } from '../../../common/util'

type Props = {
  currentMapdata: any
  w: number
  h: number
  area: TipArea
  projectionPath: any
}

const CurrentArea = ({ currentMapdata = [], w, h, area, projectionPath }: Props) => {
  const uuid = useRef<string>(randomChar())
  const fillColor = usemMemo(() => {
    const areaColor = area.color
    const colorObj = {
      type: 'single',
      color: '',
      angle: 0,
      stopsList: []
    }
    if (typeof areaColor === 'string') {
      colorObj.color = areaColor
    } else {
      let colors = areaColor?.gradient?.colors || []
      if (areaColor.selected === 'single' || colors.length === 0) {
        colorObj.color = areaColor.selected === 'single' ? areaColor.single : colors[0].value
      } else {
        const isZero = colors.every(item => item.begins == 0)

        colorObj.angle = areaColor.gradient.gradualAngle
        colorObj.color = `url(#linear_gradient_${uuid.current})`
        colorObj.type = 'gradient'

        if (isZero) {
          const speed = isZero ? (1 / (colors.length - 1)) * 100 : 0
          colors = colors.map((item, i) => ({ ...item, begins: i * speed }))
        }
        colorObj.stopsList = colors
      }
    }

    return colorObj
  }, [area.color])

  const pathAttrs = (function () {
    const attrs = {
      fill: fillColor.color,
      stroke: area?.borderColor,
      d: ''
    }

    if (currentMapdata[0]) {
      attrs.d = projectionPath.path(currentMapdata[0])
    }

    return attrs
  })()

  return (
    <svg width={w} height={h} style={{ pointerEvents: 'none' }}>
      <g>
        <path {...pathAttrs} />
        {fillColor.type === 'gradient' && (
          <defs>
            <linearGradient
              id={`linear_gradient_${uuid.current}`}
              gradientTransform={`rotate(${fillColor.angle}, .5, .5)`}>
              {fillColor.stopsList.map((item: any, i) => (
                <stop key={i} offset={`${item.begins}%`} stopColor={item.value} />
              ))}
            </linearGradient>
          </defs>
        )}
      </g>
    </svg>
  )
}

CurrentArea.displayName = 'CurrentArea'
export default memo(CurrentArea)
