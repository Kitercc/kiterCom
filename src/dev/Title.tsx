import React, { useState } from 'react'
import { LczNormalTitle } from '../index'
import { NormalTitleProps } from '../LczNormalTitle/type'

export const T_NormalTitle = () => {
  const newColor = {
    selected: 'single',
    single: '#ffffff',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(255,255,255,1)'
        },
        {
          begins: 100,
          value: 'rgba(255,0,0,1)'
        }
      ]
    }
  }

  const sweeppureColorStr = {
    selected: 'gradient',
    single: 'rgba(255,0,0,1)',
    gradient: {
      gradualAngle: 0,
      colors: [
        {
          begins: 0,
          value: '#7bbfff'
        },
        {
          begins: 0,
          value: '#a2ff29'
        }
      ]
    }
  }

  const config: NormalTitleProps = {
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 20,
      color: {
        colorString: newColor
      },
      fontWeight: 400,
      letterSpacing: 0,
      italics: true
    },
    value: '我是默认我是默认我是默认我是默认我是默认',
    writingMode: 'horizontal-tb', // vertical-rl  horizontal-tb
    ellipsis: false,
    horizon: 'left', // 水平
    vertical: 'top', // 垂直
    sweepThrough: {
      sweepStatus: true,
      bgColor: {
        colorString: sweeppureColorStr
      },
      isAnimat: true
    },
    outShadow: { display: true, color: '#70faff', xOffSet: 0, yOffSet: 0, vague: 4, extend: 1 },
    bgConfig: {
      display: true,
      range: 'self-adaption',
      padding: { x: 16, y: 16 },
      bgStyle: {
        display: true,
        color: sweeppureColorStr,
        imgUrl: ''
      },
      border: {
        display: false,
        color: '#c92323',
        width: 10
      },
      radius: 2
    }
  }

  const [data, setData] = useState([{ value: '我是默认' }])

  function onClick(data) {
    console.log('hello', data)
  }
  function onDataChange(data) {
    console.log(data, 99999)
  }
  return (
    <div style={{ width: 300, height: 20 }}>
      <button onClick={() => setData([{ value: data[0].value + '我是默认' }])}>change</button>
      <LczNormalTitle w={300} h={20} {...config} data={data} onClick={onClick} onDataChange={onDataChange} />
    </div>
  )
}
