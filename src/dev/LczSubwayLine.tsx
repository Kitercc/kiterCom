import React, { memo } from 'react'
import { LczSubwayLine } from '..'
import { SubwayLineProps } from '../LczSubwayLine/type'

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

export const T_LczSubwayLine = memo(function T_LczSubwayLine() {
  const config: SubwayLineProps = {
    globalConfig: {
      cityId: { value: 3301 },
      centerSite: { value: '钱江世纪城' },
      zoomConfig: {
        defaultProportion: 1,
        manualZoom: {
          display: true,
          position: 'left',
          xOffset: 0,
          yOffset: 0,
          arrangementMode: 'level',
          buttonSize: 20,
          bgColor: '#3D99FC',
          symbolColor: '#fff'
        }
      }
    },
    lineConfig: {
      currentLine: {
        value: ''
      },
      maskColor: 'rgba(0,0,0,0.5)',
      lineName: true,
      selectCenter: false,
      clickSelect: true
    },
    sideConfig: {
      clickSideCenter: true,
      transferPoint: {
        display: true,
        transferType: 'system',
        systemUrl: '',
        customUrl: ''
      },
      generalPoint: {
        display: true,
        generalType: 'system',
        systemUrl: '',
        customUrl: ''
      },
      sideName: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal',
        letterSpacing: 0
      }
    },
    childComponents: [
      {
        id: 'xxxxx',
        type: 'lcz-subway-ripples',
        config: {
          show: false,
          condition: true,
          siteName: 'station1',
          proporScaling: true,
          styleInterval: [
            {
              condition: true,
              radius: '1',
              haloRadius: '100',
              haloInterval: 1,
              haloSpeed: 3,
              color: 'rgba(0,0,0,0.2)',
              stroke: {
                color: '#ff0000',
                inShadow: {
                  display: true,
                  x: 0,
                  y: 0,
                  extend: 0,
                  vague: 40,
                  color: '#ff9c1b'
                }
              }
            }
          ],
          sitePolling: {
            display: false,
            condition: true,
            triggerEvent: true,
            interval: 10,
            stopTime: 16,
            showPanle: true,
            moveStop: false
          }
        },
        data: [
          {
            station1: '钱江路',
            value: 1212
          },
          {
            station1: '武林门',
            value: 2200
          }
        ],
        event: {
          onClick: val => {
            console.log(12, val)
          }
        }
      },
      {
        id: 'xxxxx',
        type: 'lcz-subway-panel',
        config: {
          show: true,
          condition: true,
          contain: {
            link: {},
            url: ''
          },
          xOffset: 20,
          yOffset: 0,
          width: 400,
          height: 580
        },
        data: [
          {
            url: 'https://juejin.cn/post/7129814220656345118'
          }
        ]
      },
      {
        type: 'lcz-subway-sign',
        id: '',
        config: {
          show: true,
          condition: true,
          signConfig: {
            display: true,
            position: { x: 0, y: 0 },
            signStyle: {
              type: 'system',
              imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              width: 48,
              height: 48,
              iconValue: '&#59230;|1',
              iconSize: 48,
              color: colorStr
            }
          },
          shadow: {
            display: true,
            x: 0,
            y: 0,
            vague: 4,
            extend: 0,
            color: 'rgba(0,0,0,.5)'
          },
          styleSeries: [
            {
              type: '1',
              signStyle: {
                position: { x: 0, y: 0 },
                signStyle: {
                  type: 'system',
                  imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
                  width: 28,
                  height: 28,
                  iconValue: '&#59230;|1',
                  iconSize: 48,
                  color: colorStr
                }
              }
            }
          ]
        },
        data: [
          {
            station: '钱江路',
            type: 1
          },
          {
            station: '飞虹路',
            type: 2
          }
        ],
        event: {
          onClick: () => {
            console.log(99999)
          }
        }
      }
    ]
  }

  const data = [
    {
      station: '钱江路',
      value: 3500
    },
    {
      station: '武林门',
      value: 2200
    }
  ]

  return (
    <div style={{ width: 1920, height: 1080 }}>
      <LczSubwayLine
        design={false}
        {...config}
        w={1920}
        h={1080}
        data={data}
        onChildComEvent={(a, b, t) => {
          console.log(a, b, t)
        }}
        // onClickBlank={() => console.log('onClickBlank')}
        // onClick={site => console.log(site, 'onClickSite')}
        // onChange={site => console.log(site, 'onChangeSite')}
        // onSelect={line => console.log(line, 'onSelectLine')}
      />
    </div>
  )
})
