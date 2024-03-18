import React, { memo } from 'react'
import { LczRotateCard } from '..'
import { RotateCardProps } from '../LczRotateCard/type'

export const T_RotateCard = memo(function T_RotateCard() {
  const color1 = {
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
  }
  const color2 = {
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
  }
  const color3 = {
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
  }

  const config: RotateCardProps = {
    global: {
      type: 'index',
      index: { value: 0 },
      defaultId: { value: '1' }
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
        color: color1,
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
      inShadow: { display: true, color: '#04B1F0', x: 0, y: 2, vague: 22, extend: 0 }
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
        display: false,
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
      }
    },
    arrowConfig: {
      display: true,
      spacing: 20,
      yOffset: 0,
      showType: 'all', //"hover" | "all"
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
    },
    cardLineContent: [
      {
        fieldName: 'value',
        title: '标题',
        latout: {
          arrangement: 'row',
          lineHeight: '',
          lineWidth: '90',
          horizontal: 'flex-start',
          vertical: 'center',
          contentOverflow: 'show'
        },
        position: { x: 16, y: 16 },
        titleStyle: {
          fontFamily: '微软雅黑',
          fontSize: 14,
          color: '#f11010',
          fontWeight: 400,
          letterSpacing: 0
        },
        valueStyle: {
          leftOffset: 10,
          valueType: 'text',
          textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 20,
            color: '#eb0000',
            fontWeight: 400,
            letterSpacing: 0
          },
          suffixConfig: {
            display: true,
            leftOffset: 0,
            topOffset: 0,
            suffix: '万人',
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              fontSize: 14,
              color: '#00f7ff',
              fontWeight: 400,
              letterSpacing: 0
            }
          }
        },
        cardCurrentStyle: {
          display: true,
          title: {
            display: false,
            color: '#cfbaba',
            fontWeight: 800
          },
          value: {
            display: true,
            color: '#cfbaba',
            fontWeight: 'normal',
            suffix: {
              display: true,
              color: '#cfbaba',
              fontWeight: 'normal'
            }
          }
        }
      },
      {
        fieldName: 'category',
        title: '类别',
        latout: {
          arrangement: 'row',
          lineHeight: '',
          lineWidth: '90',
          horizontal: 'flex-start',
          vertical: 'center',
          contentOverflow: 'show'
        },
        position: { x: 16, y: 46 },
        titleStyle: {
          fontFamily: '微软雅黑',
          fontSize: 14,
          color: '#fff',
          fontWeight: 400,
          letterSpacing: 0
        },
        valueStyle: {
          leftOffset: 10,
          valueType: 'number',
          textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 20,
            color: '#eb0000',
            fontWeight: 'bolder',
            letterSpacing: 0
          },
          format: {
            display: true,
            thousandth: true,
            numDo: 0, // 保留小数 小数点位数
            rounding: true, // 四舍五入
            percentage: false,
            negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
          },
          intervalStyle: true,
          styleInterval: [
            {
              min: 90,
              max: 200,
              color: 'skyblue',
              fontSize: 16,
              fontWeight: 100
            }
          ],
          suffixConfig: {
            display: true,
            leftOffset: 0,
            topOffset: 0,
            suffix: '万人',
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              fontSize: 14,
              color: '#00f7ff',
              fontWeight: 400,
              letterSpacing: 0
            }
          }
        },
        cardCurrentStyle: {
          display: true,
          title: {
            display: true,
            color: 'red',
            fontWeight: 'normal'
          },
          value: {
            display: true,
            color: 'red',
            fontWeight: 'normal',
            suffix: {
              display: true,
              color: 'red',
              fontWeight: 'normal'
            }
          }
        }
      },
      {
        fieldName: 'value',
        title: '新标题',
        latout: {
          arrangement: 'row',
          lineHeight: '',
          lineWidth: '90',
          horizontal: 'flex-start',
          vertical: 'center',
          contentOverflow: 'show'
        },
        position: { x: 16, y: 66 },
        titleStyle: {
          fontFamily: '微软雅黑',
          fontSize: 14,
          color: '#db1bcb',
          fontWeight: 'normal',
          letterSpacing: 0
        },
        valueStyle: {
          leftOffset: 10,
          valueType: 'index',
          baseValue: '',
          iconValueSpace: 0,
          showValue: true,
          textStyle: {
            fontFamily: '微软雅黑',
            fontSize: 14,
            color: '#e90e0e',
            fontWeight: 'bolder',
            letterSpacing: 0
          },
          fontConfig: {
            style: 'icon1',
            size: 14,
            riseColor: '#D24C4C',
            declineColor: '#48C18D',
            flatColor: '#D2944C',
            syncValueColor: false
          },
          format: {
            display: true,
            thousandth: true,
            numDo: 0, // 保留小数 小数点位数
            rounding: true, // 四舍五入
            percentage: false,
            negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
          },
          suffixConfig: {
            display: true,
            leftOffset: 0,
            topOffset: 0,
            suffix: '后',
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              fontSize: 14,
              color: '#00f7ff',
              fontWeight: 'normal',
              letterSpacing: 0
            }
          }
        },
        cardCurrentStyle: {
          display: true,
          title: {
            display: true,
            color: '#2714d8',
            fontWeight: 'normal'
          },
          value: {
            display: true,
            color: '#2714d8',
            fontWeight: 'normal',
            suffix: {
              display: true,
              color: '#2714d8',
              fontWeight: 'normal'
            }
          }
        }
      }
    ],
    imgSeries: [
      {
        condition: '',
        imgType: 'icon', // 'icon' | 'custom'
        cardImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        cardIcon: '&#59356;|1',
        iconColor: 'red',
        position: { x: 0, y: 0 },
        radius: 0,
        width: 100,
        height: 100,
        rotate: 0,
        // ../lczCommon/matrix/images/component/lcz-rotate-card/normal.png
        imgCurrent: {
          display: true,
          currentImgType: 'icon', // 'icon' | 'custom',
          cardImg: 'https://img2.baidu.com/it/u=3447509712,4006441309&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
          cardIcon: '&#59356;|1',
          iconColor: 'blue'
        }
      }
      // {
      //   condition: '{value}>5000',
      //   imgType: 'icon', // 'icon' | 'custom'
      //   cardImg: 'https://img2.baidu.com/it/u=3447509712,4006441309&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
      //   cardIcon: '&#59230;|1',
      //   iconColor: 'red',
      //   position: { x: 0, y: 0 },
      //   radius: 100,
      //   width: 100,
      //   height: 100,
      //   rotate: 0,

      //   imgCurrent: {
      //     currentImgType: 'custom', // 'icon' | 'custom',
      //     cardImg: 'string',
      //     cardIcon: 'any',
      //     iconColor: 'red'
      //   }
      // }
    ]
  }

  const data = [
    {
      id: 1,
      name: '产品-001',
      value: 3849.04
    },
    {
      id: 2,
      name: '产品-002',
      value: 8574.29
    },
    {
      id: 3,
      name: '产品-003',
      value: 9673.58
    },
    {
      id: 4,
      name: '产品-004',
      value: 9673.58
    },
    {
      id: 5,
      name: '产品-005',
      value: 5937.95
    },
    {
      id: 6,
      name: '产品-006',
      value: 8674.96
    }
  ]

  function handler(data, key) {
    console.log(data, key)
  }

  return (
    <div style={{ width: 900, height: 600, margin: '0 auto' }}>
      <LczRotateCard
        data={data}
        w={375}
        h={400}
        {...config}
        onClick={(a, b) => handler({ a, b }, 'click')}
        // onChange={(a, b) => handler({ a, b }, 'change')}
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
