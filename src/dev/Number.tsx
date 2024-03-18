import React, { useState } from 'react'
import { LczNumberFlop } from '../index'

export const T_NumberFlop = () => {
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
        },
        {
          begins: 0,
          value: 'rgba(255,255,255,1)'
        }
      ]
    }
  }
  const config = {
    titlePosition: 'bottom',
    alignment: 'center',
    titleDistance: 1,
    titleConfig: {
      display: true,
      name: '',
      titleStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 20,
        color: 'red',
        fontWeight: 400,
        letterSpacing: 2
      }
    },
    scrollCountConfig: {
      // 数值配置
      prefixDistance: 1,
      numberConfig: {
        widthAdaptation: false,
        numberAnimate: {
          scrollType: 'turn', // roll turn
          speed: 1000,
          takeRatio: 0.5
        },
        sectionStyleFlag: false,
        sectionStyle: [
          {
            min: 100000,
            max: 200000,
            colorConfig: { display: true, color: sweeppureColorStr },
            fontWeight: 900,
            fontSize: 34
          },
          { min: 30, max: 90, colorConfig: { display: true, color: sweeppureColorStr }, fontWeight: 400, fontSize: 24 }
        ],
        numberFormat: {
          numberbits: 0,
          digit: 3,
          numDo: 2,
          rounding: false,
          negativeing: 'brackets'
        },
        symbolCustom: {
          symbolStatus: true,
          divider: ',',
          decimal: '.',
          plusSign: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          minusSign: '',
          flat: '',
          symbolSpeed: 2,
          symbolSize: 20
        },
        numberBg: {
          display: true,
          numBoxRadius: 4,
          numBoxBg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          numBgColor: { colorString: colorStr },
          separateBg: false
        },
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 30,
          color: gradualStr,
          fontWeight: 900,
          letterSpacing: 10
        }
      },
      prefixConfig: {
        prefix: '',
        prefixStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 20,
          color: 'red',
          fontWeight: 900,
          letterSpacing: 0
        }
      },
      suffixConfig: {
        suffix: '',
        verticalOffset: 0,
        suffixStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 20,
          color: 'red',
          fontWeight: 900,
          letterSpacing: 0
        }
      }
    }
  }

  const [data, setData] = useState([
    {
      value: -1234523.888,
      name: '我是标题',
      prefix: '￥',
      suffix: '&'
    }
  ])

  return (
    <div style={{ width: 500, height: 200 }}>
      <button onClick={() => setData([{ ...data[0], value: data[0].value + 1 }])}>++</button>
      <button onClick={() => setData([{ ...data[0], value: data[0].value - 1 }])}>--</button>
      <LczNumberFlop
        {...config}
        data={data}
        onClick={a => console.log(a, 'click')}
        onDataChange={a => console.log(a, 'onDataChange')}
        onMouseenter={a => console.log(a, 'onMouseenter')}
        onMouseleave={a => console.log(a, 'onMouseleave')}
      />
    </div>
  )
}
