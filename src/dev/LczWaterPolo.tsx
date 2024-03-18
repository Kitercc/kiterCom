import React, { memo } from 'react'
import { LczChart } from '../index'
import { WaterPoloProps } from '../LczChart/LczChartOther/LczWaterPolo/type'

const LczWaterPolo = LczChart.LczChartOther.LczWaterPolo

export const T_LczWaterPolo = memo(function T_LczWaterPolo() {
  //#region
  const c = {
    selected: 'gradient',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#3dfc93'
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
          begins: 100,
          value: '#ad6405'
        }
      ]
    }
  }

  const c3 = {
    selected: 'gradient',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: '#fc3d86'
        },
        {
          begins: 100,
          value: '#21ad05'
        }
      ]
    }
  }

  //#endregion

  const config: WaterPoloProps = {
    globalConfig: {
      margin: { x: 50, y: 50 },
      bgColor: 'rgba(0,0,0,0)',
      titleConfig: {
        display: true,
        content: { value: 'TITLE11111' },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: { value: 'SUB' },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#a13e3e',
          fontWeight: 'normal'
        },
        speed: 0,
        xPosition: 'auto',
        yPosition: 'center',
        xOffset: 10,
        yOffset: 0
      },
      dataAnimate: {
        display: true,
        direction: 'right',
        amplitude: 10,
        period: 2000
      }
    },
    indexConfig: {
      display: true,
      textStyle: {
        fontFamily: 'DIN-Medium',
        fontSize: 56,
        color: '#FFFFFF',
        insideColor: '#FFFFFF',
        fontWeight: 'normal',
        xAlign: 'center',
        yAlign: 'middle',
        format: {
          display: true,
          decimal: 2,
          round: false,
          percentage: true,
          negativeing: 'minus'
        }
      },
      position: 'inside'
    },
    waterPoloDiagram: {
      ballStyle: {
        radius: 76,
        shape: 'system',
        // system
        symbol: 'circle',
        // custom
        path:
          'M367.855,428.202c-3.674-1.385-7.452-1.966-11.146-1.794c0.659-2.922,0.844-5.85,0.58-8.719 c-0.937-10.407-7.663-19.864-18.063-23.834c-10.697-4.043-22.298-1.168-29.902,6.403c3.015,0.026,6.074,0.594,9.035,1.728 c13.626,5.151,20.465,20.379,15.32,34.004c-1.905,5.02-5.177,9.115-9.22,12.05c-6.951,4.992-16.19,6.536-24.777,3.271 c-13.625-5.137-20.471-20.371-15.32-34.004c0.673-1.768,1.523-3.423,2.526-4.992h-0.014c0,0,0,0,0,0.014 c4.386-6.853,8.145-14.279,11.146-22.187c23.294-61.505-7.689-130.278-69.215-153.579c-61.532-23.293-130.279,7.69-153.579,69.202 c-6.371,16.785-8.679,34.097-7.426,50.901c0.026,0.554,0.079,1.121,0.132,1.688c4.973,57.107,41.767,109.148,98.945,130.793 c58.162,22.008,121.303,6.529,162.839-34.465c7.103-6.893,17.826-9.444,27.679-5.719c11.858,4.491,18.565,16.6,16.719,28.643 c4.438-3.126,8.033-7.564,10.117-13.045C389.751,449.992,382.411,433.709,367.855,428.202z',
        color: c2,
        opacity: 100,
        shadow: { shadowBlur: 0, shadowColor: 'rgba(255,0,0,1)', shadowOffsetX: 0, shadowOffsetY: 0 }
      },
      waveStyle: {
        waveLength: 80,
        color: c3,
        opacity: 100,
        shadow: { shadowBlur: 100, shadowColor: '#68faff', shadowOffsetX: -100, shadowOffsetY: -40 }
      },
      border: {
        display: false,
        color: 'rgba(0,178,255,1)',
        width: 4
      },
      outlineStyle: {
        display: true,
        borderDistance: 10,
        color: 'rgba(0,178,255,0.4)',
        width: 6,
        shadow: { shadowBlur: 5, shadowColor: 'rgba(255,0,0,1)', shadowOffsetX: 0, shadowOffsetY: 0 }
      }
    }
  }

  const data = [{ value: 0.29999 }]

  return (
    <div style={{ width: 800, height: 600 }}>
      <LczWaterPolo w={800} h={600} {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
