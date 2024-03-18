import React from 'react'
import { LczTimeShaft } from '../index'
import { TimeShaftProps } from '../LczTimeShaft/type'

export const T_LczTimeShaft = () => {
  const colorStr = {
    selected: 'gradient', //gradient single
    single: 'rgba(255,0,0,1)',
    gradient: {
      gradualAngle: 20,
      colors: [
        {
          begins: 0,
          value: 'rgb(19, 98, 184)'
        },
        {
          begins: 100,
          value: 'rgb(6, 208, 202)'
        }
      ]
    }
  }

  const config: TimeShaftProps = {
    shaftGlobalConfig: {
      mode: 'horizontal', //'horizontal' | 'vertical'
      labelSpace: 60,
      timeShaftMain: {
        height: 6,
        backgroundColor: 'rgb(28, 45, 76)',
        lineColor: colorStr
      },
      shaftTextLabel: {
        display: true,
        offset: {
          xOffset: 0,
          yOffset: 0
        },
        textStyle: {
          fontFamily: 'Microsoft Yahei',
          fontSize: 16,
          color: 'rgba(68,106,255,1)',
          fontWeight: 'normal',
          letterSpacing: 0,
          angle: 0
        }
      },
      shaftMoveLabel: {
        display: true,
        yOffset: 0,
        textStyle: {
          fontFamily: 'Microsoft Yahei',
          fontSize: 16,
          color: '#ec1111',
          fontWeight: 'normal',
          letterSpacing: 0
        },
        backgroundFrame: {
          display: true,
          size: {
            top: 10,
            bottom: 10,
            left: 10,
            right: 10
          },
          backgroundColor: colorStr,
          backgroundImg:
            'https://img2.baidu.com/it/u=3501073385,2187239768&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1673974800&t=024793de233398f14f3214176058724d',
          radius: 0
        }
      }
    },
    controllerConfig: {
      active: { value: '2' },
      loopPlay: false,
      autoPlay: false,
      duration: 5,
      progressCursor: {
        image: 'https://easyv.assets.dtstack.com//components/static-image/timeLineV2/cursorOval.png',
        size: {
          width: 20,
          height: 20
        }
      },
      playBtn: {
        gap: 30,
        playConfig: {
          image: 'https://easyv.assets.dtstack.com/components/static-image/timeLineV2/play.png',
          size: {
            width: 30,
            height: 30
          }
        },
        stopConfig: {
          image: 'https://easyv.assets.dtstack.com/components/static-image/timeLineV2/stop.png',
          size: {
            width: 30,
            height: 30
          }
        }
      }
    }
  }

  const data = [
    {
      id: '1',
      text: 'A'
    },
    {
      id: '2',
      text: 'AB'
    },
    {
      id: '3',
      text: 'ABC'
    },
    {
      id: '4',
      text: '节点11'
    },
    {
      id: '5',
      text: '你真帅啊'
    },
    {
      id: '6',
      text: '20:00'
    },
    {
      id: '7',
      text: '真刷的大苏打实打实'
    }
  ]

  return (
    <>
      <button>change</button>
      <div
        style={{
          width: 600,
          height: 600,
          margin: '0 auto',
          border: '1px solid pink'
          // transform: 'scale(0.610417, 0.867593)'
        }}>
        <LczTimeShaft
          {...config}
          data={data}
          // onClick={params => {
          //   console.log(params, 'click')
          // }}
          // onChange={params => {
          //   console.log(params, 'change')
          // }}
        />
      </div>
    </>
  )
}
