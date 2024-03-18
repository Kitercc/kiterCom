import React, { useState } from 'react'
import { LczCustomPath } from '../'
import { CustomPathProps } from '../LczCustomPath/type'
const color2 = {
  selected: 'gradient',
  single: 'rgba(61, 153, 252,1)',
  gradient: {
    gradualAngle: 1,
    colors: [
      {
        begins: 0,
        value: '#60C9FF'
      },
      {
        begins: 100,
        value: '#0458FF'
      }
    ]
  }
}

const T_LczCustomPath = () => {
  const config: CustomPathProps = {
    offset: { display: false, x: 0, y: 0 },
    pathConfig: {
      type: 'system', //"system" | "custom"
      systemUrl: 'curve', //"straight-line" | "band" | 'curve
      customType: 'path', //"file" | "path"
      customFileUrl: 'https://easyv.assets.dtstack.com/components/static-image/customLine/polygon.svg',
      customPath:
        'M52 120.778239 120.272643 120.778239 136.434304 164 152.595966 74.4784689 168.757627 194.114833 184.919289 81.891547 201.080951 164 217.242612 37.9585327 233.404274 228 249.565935 22 265.727597 202.816587 281.889258 93.9681021 298.05092 147.684211 314.212582 125 398 125',
      scale: 1,
      lineWidth: 2,
      lineType: 'solid', //'solid' | 'dashed'
      color: '#00EBFF'
    },
    bodyConfig: {
      bodyType: 'rect', // 'circle' | 'rect' | 'img'
      circleRadius: 10,
      circleColor: color2,
      rectWidth: 16,
      rectHeight: 16,
      rectColor: color2,
      img: 'https://easyv.assets.dtstack.com/components/static-image/customLine/plane.png',
      imgWidth: 50,
      imgHeight: 50,
      autoRotate: false
    },
    animation: {
      reverse: false,
      loop: true,
      delay: 1,
      interval: 3,
      keyframes: [
        {
          easeType: 'Linear', // 'Linear' | 'EaseIn' | 'EaseOut' | 'EaseInOut'
          time: 2,
          opacity: 100,
          translate: 50
        },
        {
          easeType: 'Linear', // 'Linear' | 'EaseIn' | 'EaseOut' | 'EaseInOut'
          time: 2,
          opacity: 100,
          translate: 100
        }
      ]
    }
  }

  const [size, setSize] = useState({ w: 400, h: 250 })

  function changeSize() {
    const w = Math.floor(Math.random() * 400 + 100)
    const h = Math.floor(Math.random() * 400 + 100)
    setSize({ w, h })
  }

  return (
    <>
      <button onClick={changeSize}>change size</button>
      <div
        style={{
          width: size.w,
          height: size.h,
          border: '1px solid red',
          margin: '0 auto',
          transform: 'scaleX(1) scaleY(1)'
        }}>
        <LczCustomPath {...config} w={size.w} h={size.h} />
        {/* <LczCustomPath {...config} w={size.w} h={size.h} /> */}
      </div>
    </>
  )
}

export default T_LczCustomPath
