import React from 'react'
import { LczIconFont } from '../index'

const sweeppureColorStr =
  '{"type":"single","colors":[{"rgb":{ "r": 255, "g": 0, "b": 0, "a": 1 },"hex":"#A83E3EFF","begins":0}],"gradualAngle":0}'
const colorStr = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      }
    ]
  }
}
export const T_LczIconFont = () => {
  const config = {
    padding: 0,
    animate: false,
    fillColor: colorStr,
    iconValue: '&#59230;|1',
    shadow: {
      display: true,
      x: 0,
      y: 0,
      extend: 4,
      color: '#070101f8'
    },
    bgConfig: { display: false, bgColor: 'red', borderColor: '#3D99FC', borderWidth: 2, radius: 10 }
  }
  const onclick = () => {
    console.log(99999)
  }
  return (
    <div style={{ width: 200, height: 100 }}>
      <LczIconFont {...config} w={200} h={100} onClick={onclick} />
    </div>
  )
}
