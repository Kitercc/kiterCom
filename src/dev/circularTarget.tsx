import React, { memo } from 'react'
import { LczCircularTarget } from '../'
import { CircularTargetProps } from '../LczCircularTarget/type'

export const T_circularTarget = memo(function T_circularTarget() {
  const cc = {
    selected: 'single',
    single: '#ff0000',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#20ff63'
        },
        {
          begins: 0,
          value: '#08D7FC'
        }
      ]
    }
  }

  const nc = {
    selected: 'gradient',
    single: '#08D7FC',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#99F6FF'
        },
        {
          begins: 0,
          value: '#fc1808'
        }
      ]
    }
  }
  const config: CircularTargetProps = {
    global: {
      type: 'index',
      index: { value: 0 },
      defaultId: { value: '1' },
      allAlongpositive: true
    },
    animate: {
      switchSpeed: 1500,
      carousel: {
        display: false,
        stopCondition: false,
        speed: 4, // s
        position: 1, // 1顺时针 -1 逆时针
        movePause: true
      }
    },
    trackConfig: {
      radius: 800,
      rearNot: false,
      proportion: 20
    },
    cameraPosition: {
      x: 0,
      y: 10,
      z: 1000
    },
    normalCard: {
      width: 200,
      height: 200,
      radius: 100,
      opacity: 0.5,
      bgConfig: {
        display: true,
        color: {
          selected: 'single',
          single: 'rgba(2,13,37,1)',
          gradient: {
            gradualAngle: 90,
            colors: [
              {
                begins: 0,
                value: 'rgba(2,13,37,1)'
              },
              {
                begins: 0,
                value: '#10f1a6'
              }
            ]
          }
        },
        imgUrl: ''
      },
      border: {
        display: true,
        color: '#04B1F0',
        width: 1
      },
      outShadow: {
        display: true,
        color: '#ff0e06',
        x: 0,
        y: 2,
        vague: 4,
        extend: 0
      },
      inShadow: { display: true, color: '#04B1F0', x: 0, y: 2, vague: 22, extend: 0 },
      numberConfig: {
        display: true,
        xOffset: 0,
        yOffset: -9,
        textStyle: {
          fontWeight: 'bold',
          fontFamily: 'DIN',
          fontSize: 50,
          color: nc,
          letterSpacing: 0
        },
        numbFormat: {
          splitDigit: 3,
          decimal: 0,
          rounding: true,
          negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
        },
        suffixConfig: {
          display: false,
          suffixVal: '/单位',
          interval: 2,
          yOffset: 0,
          fontFamily: '时尚中黑简',
          fontSize: 14,
          color: nc,
          fontWeight: 'normal',
          letterSpacing: 0
        }
      },
      nameConfig: {
        display: false,
        xOffset: 0,
        yOffset: 30,
        textStyle: {
          fontWeight: 'normal',
          fontFamily: 'DIN',
          fontSize: 30,
          color: nc,
          letterSpacing: 0
        }
      },
      iconConfig: {
        display: true,
        xOffset: 0,
        yOffset: 0,
        width: 100,
        height: 100,
        iconSeries: [
          {
            nameValue: 'ii',
            type: 'system',
            iconVlaue: '&#59230;|1', //"custom" | "system"
            iconColor: {
              selected: 'gradient',
              single: '#fff',
              gradient: {
                gradualAngle: 0,
                colors: [
                  {
                    begins: 0,
                    value: '#ff9900'
                  },
                  {
                    begins: 0,
                    value: '#08D7FC'
                  }
                ]
              }
            },
            imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          },
          {
            nameValue: 'ii',
            type: 'custom',
            iconVlaue: '&#59230;|1',
            iconColor: {
              selected: 'gradient',
              single: '#fff',
              gradient: {
                gradualAngle: 0,
                colors: [
                  {
                    begins: 0,
                    value: '#ff9900'
                  },
                  {
                    begins: 0,
                    value: '#08D7FC'
                  }
                ]
              }
            },
            imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
          }
        ]
      }
    },
    hoverStyle: {
      display: true,
      opacity: 1,
      zoom: 1,
      yOffset: 0,
      bgConfig: {
        display: true,
        color: {
          selected: 'gradient',
          single: '#0A235A',
          gradient: {
            gradualAngle: 90,
            colors: [
              {
                begins: 0,
                value: '#ffaa0d'
              },
              {
                begins: 0,
                value: '#0A235A'
              }
            ]
          }
        },
        imgUrl: ''
      },
      border: {
        display: true,
        color: '#ff0fcb',
        width: 1
      }
    },
    currentStyle: {
      display: true,
      opacity: 1,
      zoom: 1,
      yOffset: 0,
      bgConfig: {
        display: true,
        color: {
          selected: 'gradient',
          single: '#0A235A',
          gradient: {
            gradualAngle: 90,
            colors: [
              {
                begins: 0,
                value: '#ff0000'
              },
              {
                begins: 0,
                value: '#0A235A'
              }
            ]
          }
        },
        imgUrl: 'https://img.alicdn.com/tfs/TB1nCWxMbH1gK0jSZFwXXc7aXXa-251-64.svg'
      },
      border: {
        display: false,
        color: '#f00404',
        width: 1
      },
      number: {
        display: true,
        xOffset: 0,
        yOffset: -20,
        currentSyncStyle: false,
        textStyle: {
          fontWeight: 'bold',
          fontFamily: 'DIN',
          fontSize: 50,
          color: cc,
          letterSpacing: 0
        },
        suffixConfig: {
          display: true,
          interval: 2,
          yOffset: 0,
          fontFamily: '时尚中黑简',
          fontSize: 14,
          color: cc,
          fontWeight: 'normal',
          letterSpacing: 0
        }
      },
      name: {
        display: true,
        nameSyncStyle: false,
        xOffset: 0,
        yOffset: 40,
        textStyle: {
          fontWeight: 'bold',
          fontFamily: 'DIN',
          fontSize: 20,
          color: cc,
          letterSpacing: 0
        }
      }
    },
    arrowConfig: {
      display: true,
      spacing: 20,
      yOffset: 0,
      showType: 'hover',
      arrowIconType: 'system',
      iconValue: 'zuo1',
      iconSize: 56,
      iconColor: {
        selected: 'gradient',
        single: '#99F6FF',
        gradient: {
          gradualAngle: 90,
          colors: [
            {
              begins: 0,
              value: '#99F6FF'
            },
            {
              begins: 0,
              value: '#fc0808'
            }
          ]
        }
      },
      imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgWidth: 56,
      imgHeight: 56
    }
  }

  const data = [
    {
      name: 'aa',
      value: 1,
      icon: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      id: 1,
      link: '',
      t_action_id: '7',
      t_animate: false
    },
    {
      name: 'bb',
      value: 2,
      icon: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
      id: 2,
      link: ''
    },
    {
      name: 'cc',
      value: 3,
      icon: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg',
      id: 3,
      link: ''
    },
    {
      name: 'dd',
      value: 4,
      icon: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
      id: 4,
      link: ''
    },
    {
      name: 'ee',
      value: 5,
      icon: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      id: 5,
      link: ''
    },
    {
      name: 'ff',
      value: 6,
      icon: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c',
      id: 6,
      link: ''
    },
    { name: 'gg', value: 7, icon: '', id: 7, link: '' },
    { name: 'hh', value: 8, icon: '', id: 8, link: '' },
    { name: 'ii', value: 9, icon: '', id: 9, link: '' },
    { name: '1ii', value: 10, icon: '', id: 9, link: '' },
    { name: '1ii', value: 11, icon: '', id: 14, link: '' },
    { name: '1ii', value: 12, icon: '', id: 11, link: '' },
    { name: '1ii', value: 13, icon: '', id: 12, link: '' }
  ]

  return (
    <div style={{ width: 1375, height: 800, margin: '10px auto' }}>
      <LczCircularTarget
        data={data}
        w={375}
        h={400}
        {...config}
        // onClick={a => console.log(a, 'click')}
        // onChange={a => console.log(a, 'change')}
        // onMouseenter={a => {
        //   console.log(a, 'onMouseenter')
        // }}
        // onMouseleave={a => {
        //   console.log(a, 'onMouseleave')
        // }}
      />
    </div>
  )
})
