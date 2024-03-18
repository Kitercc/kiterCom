import React, { useState } from 'react'
import { LczImage } from '../index'
import { LczImageProps } from '../LczImage/type'

export const T_LczImage = () => {
  const color2 = {
    selected: 'gradient',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(61, 153, 252,1)'
        }
      ]
    }
  }
  const config: LczImageProps = {
    imgconfig: {
      type: 'bitmap', // vector  bitmap
      url: 'https://img.alicdn.com/tfs/TB1nCWxMbH1gK0jSZFwXXc7aXXa-251-64.svg',
      fillColor: {
        display: true,
        color: color2
      },
      radius: 20,
      mixBlendMode: 'normal',
      opacity: 0.5,
      rotate: {
        display: true,
        rotateX: 10,
        rotateY: 20,
        rotateZ: 30
      }
    },
    animation: {
      display: false,
      delayed: 3,
      loop: true,
      interval: 0,
      animationType: 'scale', // 'opacity' 'scale' 'clockwise' 'anticlockwise' 'backrotation' 'custom'
      duration: 3,
      speed: 'linear',
      keyFrame: [
        {
          duration: 1000,
          opacity: 0,
          rotate: {
            display: true,
            rotateX: 10,
            rotateY: 20,
            rotateZ: 30
          },
          scale: {
            display: true,
            scaleX: 60,
            scaleY: 30
          },
          translate: {
            display: true,
            translateX: 100,
            translateY: 0
          }
        },
        {
          duration: 2000,
          opacity: 1,
          rotate: {
            display: true,
            rotateX: 30,
            rotateY: 10,
            rotateZ: 20
          },
          scale: {
            display: false,
            scaleX: 50,
            scaleY: 80
          },
          translate: {
            display: false,
            translateX: 100,
            translateY: 100
          }
        },
        {
          duration: 2000,
          opacity: 0,
          rotate: {
            display: true,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0
          },
          scale: {
            display: false,
            scaleX: 100,
            scaleY: 100
          },
          translate: {
            display: false,
            translateX: 0,
            translateY: 0
          }
        }
      ]
    },
    filter: {
      blur: { display: false, value: 5 },
      brightness: { display: false, value: 100 },
      contrastRatio: { display: false, value: 100 },
      grayscale: { display: false, value: 50 },
      hue: { display: false, value: 180 },
      antiColor: { display: false, value: 50 },
      saturation: { display: false, value: 100 },
      brown: { display: false, value: 50 },
      shadow: {
        display: false,
        color: 'rgba(0,0,0,0.5)',
        xOffset: 0,
        yOffset: 0,
        vague: 4
      }
    }
  }

  const data = [
    {
      img: 'https://img.alicdn.com/tfs/TB1nCWxMbH1gK0jSZFwXXc7aXXa-251-64.svg'
    }
  ]
  const [hide, setHide] = useState(true)

  function imgClick(v, e) {
    console.log(v, e)
  }

  return (
    <div style={{ width: 320, height: 200 }}>
      <button onClick={() => setHide(!hide)}>change</button>
      {hide && <LczImage {...config} data={data} onClick={imgClick} />}
    </div>
  )
}
