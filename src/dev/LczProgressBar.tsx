import React, { useState } from 'react'
import { LczProgressBar } from '../index'
import { ProgressBarProps } from '../LczProgressBar/type'

const c = {
  selected: 'gradient',
  single: 'rgba(61, 153, 252,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#3dfc93'
      },
      {
        begins: 50,
        value: '#d6ff1f'
      },
      {
        begins: 100,
        value: '#ad6405'
      }
    ]
  }
}

const c2 = {
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
        value: '#ffe135'
      },
      {
        begins: 100,
        value: '#ad6405'
      }
    ]
  }
}

export const T_ProgressBar = () => {
  const config: ProgressBarProps = {
    progressConfig: {
      barRadius: 4,
      outShadow: {
        display: true,
        shadowColor: 'rgba(0,0,0,.50)',
        extend: 2,
        vague: 4
      },
      inShadow: {
        display: true,
        shadowColor: 'rgba(0,0,0,.50)',
        extend: 2,
        vague: 4
      },
      gridConfig: {
        height: 18,
        width: 20,
        space: 4,
        radius: 0,
        bgColor: 'rgba(255,255,255,0.2)',
        gradientRange: 'global',
        colorType: 'multicolor',
        startColor: '#3D99FC',
        endColor: '#8EF5FF',
        multiColor: c2,
        progressSection: true,
        progressStyleSection: []
      },
      outBorder: {
        outBorderDisplay: true,
        bgColor: 'rgba(199,226,255,.20)',
        borderWidth: 1,
        borderColor: 'rgba(61,153,25,1)',
        radius: 0,
        inMargin: {
          vermargin: 4,
          leftMargin: 4,
          rightMargin: 4
        }
      }
    },
    message: {
      display: true,
      width: 60,
      height: 10,
      position: 'in',
      inArrangement: 'self',
      outArrangement: 'right',
      horiOffset: 0,
      vertOffset: 0,
      messageBg: {
        display: true,
        type: 'color',
        bgColor: 'rgba(61,153,252,0.40)',
        imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
        borderColor: '#3D99FC',
        borderWidth: 1,
        radius: 0
      },
      textConfig: {
        horiOffset: 0,
        vertOffset: 0,
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 14,
          color: 'rgba(255,255,255,1)',
          fontWeight: 400,
          letterSpacing: 0
        },
        trueValue: false,
        unit: '%',
        decimal: 2,
        round: false,
        negativeing: 'brackets'
      },
      messageSection: true,
      messageStyleSection: [
        {
          min: 40,
          max: 90,
          messageBg: {
            display: true,
            type: 'color',
            bgColor: '#ee571166',
            imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
            borderColor: '#89fd04',
            borderWidth: 1
          },
          textConfig: {
            display: true,
            fontSize: 14,
            color: '#cf2d2d',
            fontWeight: 400
          }
        }
      ]
    },
    animateConfig: {
      display: false,
      type: 'linear',
      timer: 3000,
      proportion: 20 // 起始值
    }
  }

  const [data, setData] = useState<any>([
    {
      value: 90,
      max: 100
    }
  ])

  const [flag, change] = useState(true)

  const onDataChange = data => {
    console.log(data, 99999)
  }

  return (
    <div style={{ width: 300, height: 100 }}>
      <button
        onClick={() => {
          setData([{ value: data[0].value + 10, max: data[0].max }])
        }}>
        +10
      </button>
      <button
        onClick={() => {
          setData([{ value: data[0].value - 10, max: data[0].max }])
        }}>
        -10
      </button>
      <button onClick={() => change(!flag)}>change</button>
      {flag && <LczProgressBar onDataChange={onDataChange} {...config} data={data} w={300} />}
    </div>
  )
}
