import React, { useState } from 'react'
import { LczCustomGraphics } from '../index'
const sweeppureColorStr =
  '{"type":"single","colors":[{"rgb":{ "r": 255, "g": 0, "b": 0, "a": 1 },"hex":"#A83E3EFF","begins":0}],"gradualAngle":0}'
const colorStr = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 0,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      },
      {
        begins: 0,
        value: '#1bcf48'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      },
      {
        begins: 0,
        value: '#2f00ff'
      }
    ]
  }
}

const borderStr = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 0,
    colors: [
      {
        begins: 0,
        value: '#27e715'
      },
      {
        begins: 0,
        value: '#ddb91a'
      },
      {
        begins: 0,
        value: '#175cdd'
      },
      {
        begins: 0,
        value: '#dd1721'
      }
    ]
  }
}
export const T_LczCustomGraphics = () => {
  const config = {
    shape: 'triangle', // rect 矩形 circular 圆  triangle 三角形  star 五角星
    radius: 10,
    fillColor: {
      display: true,
      color: colorStr
    },
    borderStyle: {
      display: true,
      lineType: 'solid', // solid dotted
      dottedW: 4,
      dottedSpace: 4,
      borderColor: borderStr,
      borderWidth: 10
    },
    outShadow: { display: false, color: '#2ab889', x: 0, y: 0, vague: 4, extend: 7 },
    inShadow: { display: false, color: '#1e8bca', x: 0, y: 0, vague: 4, extend: 7 },
    vagueConfig: {
      display: false,
      gaussianBlur: 10
    }
  }

  const [data, setData] = useState([{ value: '' }])

  const handler = () => {
    console.log(9999999999)
  }

  return (
    <div style={{ width: 300, height: 300 }}>
      <LczCustomGraphics {...config} w={300} h={300} onClick={handler} />
    </div>
  )
}
