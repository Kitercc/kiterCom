import React, { useState } from 'react'
import { LczLightFlowPath } from '../'
import { LightFlowPathProps } from '../LczLightFlowPath/type'
const color2 = {
  selected: 'gradient',
  single: 'rgba(61, 153, 252,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(61, 153, 252,1)'
      },
      {
        begins: 60,
        value: '#ff17f3'
      },
      {
        begins: 100,
        value: '#17ff23'
      }
    ]
  }
}
const T_LczLightFlowPath = () => {
  const config: LightFlowPathProps = {
    offset: { display: false, x: 0, y: 0 },
    pathConfig: {
      type: 'system',
      systemUrl: 'straight-line',
      customType: 'file',
      customFileUrl: 'https://pic1.zhimg.com/v2-74c3201a88baadda98612a2006f9e510_l.jpg?source=1940ef5c',
      customPath:
        'M52 120.778239 120.272643 120.778239 136.434304 164 152.595966 74.4784689 168.757627 194.114833 184.919289 81.891547 201.080951 164 217.242612 37.9585327 233.404274 228 249.565935 22 265.727597 202.816587 281.889258 93.9681021 298.05092 147.684211 314.212582 125 398 125',
      scale: 1,
      lineWidth: 1,
      color: '#ff0000',
      shadow: {
        display: false,
        color: '#f00',
        vague: 1
      }
    },
    lineConfig: {
      size: 1,
      length: 100,
      color: color2,
      shadow: {
        display: true,
        color: '#1fffec',
        vague: 3
      }
    },
    animation: {
      reverse: false,
      loop: false,
      delay: 0,
      interval: 0,
      duration: 3,
      easeType: 'Linear'
    }
  }

  const [size, setSize] = useState({ w: 400, h: 250 })

  function changeSize() {
    const w = Math.floor(Math.random() * 400 + 100)
    const h = Math.floor(Math.random() * 400 + 100)
    setSize({ w, h })
  }

  return (
    <div style={{ width: size.w, height: size.h, border: '1px solid red' }}>
      <button onClick={changeSize}>change size</button>
      <LczLightFlowPath {...config} w={size.w} h={size.h} />
    </div>
  )
}

export default T_LczLightFlowPath
