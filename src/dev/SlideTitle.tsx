import React, { useState } from 'react'
import { LczSlideTitle } from '../index'

export const T_SlideTitle = () => {
  const colorStr =
    '{"type":"single","colors":[{"rgb":{"r":236,"g":25,"b":25,"a":1},"hex":"#EC1919FF","begins":0}],"gradualAngle":0}'
  const gradualStr = {
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
  const config = {
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 12,
      color: {
        colorString: gradualStr
      },
      fontWeight: 400,
      letterSpacing: 0
    },
    animateConfig: {
      constantPlay: false,
      carousel: true,
      alwayAnimate: false,
      duration: 1000,
      constanDuration: 2000,
      lateStay: 100
    }
  }

  const _data = [
    {
      value: '发生了点击发生了点击发生了生'
    }
  ]

  const [hide, setHide] = useState(true),
    [data, setData] = useState(_data)

  return (
    <div style={{ width: 200, height: 80, border: '1px solid' }}>
      <button onClick={e => setHide(!hide)}>change</button>
      <button
        onClick={e =>
          setData([
            {
              value: '发生了点击发生了点击发生了生发生了点击发生了点击发生了生'
            }
          ])
        }>
        changeData
      </button>
      <LczSlideTitle style={{ display: hide ? 'block' : 'none' }} {...config} data={data} w={200} />
    </div>
  )
}
