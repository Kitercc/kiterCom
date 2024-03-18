import React, { useState } from 'react'
import { LczStateBackground } from '../index'

export const T_LczStateBackground = () => {
  const sweeppureColorStr = {
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
    radiusConfig: { display: true, top: 10, right: 20, bottom: 30, left: 40 },
    defaultStyle: {
      bgConfig: {
        colorObj: sweeppureColorStr,
        imgUrl: 'https://easyv.assets.dtstack.com/components/static-image/statusBackground/lianghao.png'
      },
      borderConfig: { display: true, style: 'solid', color: '#3D99FC', width: 1 }
    },
    stateStyle: [
      {
        stateValue: '正常',
        stateBgConfig: {
          colorObj: sweeppureColorStr,
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        stateBorderConfig: { display: true, style: 'solid', color: '#3D99FC', width: 2 }
      },
      {
        stateValue: '正常',
        stateBgConfig: {
          colorObj: sweeppureColorStr,
          imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
        },
        stateBorderConfig: { display: true, style: 'solid', color: '#1cda3b', width: 3 }
      },
      {
        stateValue: '故障',
        stateBgConfig: {
          colorObj: sweeppureColorStr,
          imgUrl: ''
        },
        stateBorderConfig: { display: true, style: 'solid', color: '#3D99FC', width: 1 }
      }
    ]
  }

  const [data, setData] = useState([{ value: '正常' }])

  return (
    <div style={{ width: 300, height: 200 }}>
      <button onClick={() => setData([{ value: data[0].value + 1 }])}>change</button>
      <LczStateBackground
        {...config}
        data={data}
        onClick={data => console.log(data)}
        onDataChange={data => console.log(data)}
      />
    </div>
  )
}
