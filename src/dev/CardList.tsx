import React, { memo, useState } from 'react'
import { LczCardList } from '..'
import { CardListProps } from '../LczCardList/type'

export const T_CardList = memo(function T_CardList() {
  const c = {
    selected: 'gradient',
    single: '#000000',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(83, 252, 61,0.3)'
        },
        {
          begins: 30,
          value: 'rgba(61, 153, 252,1)'
        },
        {
          begins: 100,
          value: '#ad6405'
        }
      ]
    }
  }

  const numc = {
    selected: 'gradient',
    single: '#0fefff',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#08e608'
        },
        {
          begins: 100,
          value: '#ad0575'
        }
      ]
    }
  }

  const config: CardListProps = {
    globalConfig: {
      arrangementMode: 'horizontal', // horizontal 横向 portrait 纵向
      horizontalNumber: 3,
      portraitNumber: 3,
      horiSpeed: 20,
      portSpeed: 20,
      overflow: 'animate',
      horiOverflow: 'left',
      portOverflow: 'top',
      animateConfig: {
        animate: {
          display: false,
          stopCondition: false,
          updataNum: 4,
          switchSpeed: 300,
          timeInterval: 3,
          speed: 'ease-in-out',
          animatConnect: 'headTail'
        },
        pager: {
          display: false,
          vertPosition: 'right',
          horiPosition: 'bottom',
          xOffset: 0,
          yOffset: 20,
          wdith: 18,
          height: 18,
          radios: 4,
          speed: 4,
          defaultColor: '#16f7ff4b',
          activeColor: '#fc4a3d'
        },
        arrowConfig: {
          display: false,
          showType: 'all',
          spacing: 100,
          offset: 0,
          size: 30,
          imgWidth: 30,
          imgHeight: 30,
          resources: 'custom', // system 系统 custom 自定义
          type: 'top1',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          colorObj: numc
        }
      }
    },
    cardStyle: {
      background: c,
      backgroundImage: '',
      border: {
        display: false,
        width: 1,
        color: '#ff0000'
      },
      radius: 6
    },
    childComponents: [
      {
        type: 'lcz-card-list-container',
        id: 'lcz-card-list-container_1',
        config: {
          show: true,
          condition: true,
          width: 500,
          position: {
            x: 'auto',
            y: 'auto',
            left: 10,
            top: 20
          },
          layoutMode: 'relative',
          contentArrangement: 'vertical',
          interval: 4,
          field: [
            // proportionChart
            {
              additionalField: false,
              fieldName: 'c7',
              offset: 0,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'proportionChart',
                width: 160,
                alignment: 'left',
                proportionChartConfig: {
                  chartWidth: 80,
                  margin: {
                    x: 50,
                    y: 50
                  },
                  propChartTitleConfig: {
                    display: true,
                    xPosition: 'center',
                    yOffset: 0,
                    xOffset: 0,
                    color: 'rgba(255,255,255,1)',
                    yPosition: 'center',
                    fontFamily: 'DIN',
                    mainValueReal: true,
                    mainValueUnit: '12',
                    mainContentType: 'custom',
                    fontSize: 40,
                    mainShadow: {
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 0,
                      shadowColor: 'rgba(0,0,0,0)'
                    },
                    mainValueFormat: {
                      round: true,
                      display: false,
                      negativeing: 'minus',
                      decollate: true,
                      decimal: 1
                    },
                    chartTitleCustom: 'sd',
                    fontWeight: 'normal'
                  },
                  dataAnimate: true,
                  extremumConfig: {
                    min: '-100',
                    max: '100'
                  },
                  ringStyle: {
                    startAngle: 90,
                    color: {
                      single: 'rgba(0,143,255,1)',
                      gradient: {
                        gradualAngle: 1,
                        colors: [
                          {
                            begins: 0,
                            value: 'rgba(0,143,255,1)'
                          },
                          {
                            begins: 50,
                            value: 'rgba(45,238,255,1)'
                          }
                        ]
                      },
                      selected: 'gradient'
                    },
                    clockwise: true,
                    roundCap: true,
                    ProgressContour: {
                      color: 'rgba(255,255,255,1)',
                      display: false,
                      lineType: 'solid',
                      width: 1
                    },
                    inRadius: 70,
                    outRadius: 80,
                    opacity: 100,
                    ProgressShadow: {
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 0,
                      shadowColor: 'rgba(0,0,0,0)'
                    }
                  },
                  backgroundstyle: {
                    backgroundShadow: {
                      shadowOffsetX: 0,
                      shadowOffsetY: 0,
                      shadowBlur: 0,
                      shadowColor: 'rgba(0,0,0,0)'
                    },
                    color: {
                      single: 'rgba(43,50,59,1)',
                      gradient: {
                        gradualAngle: 1,
                        colors: [
                          {
                            begins: 0,
                            value: 'rgba(43,50,59,1)'
                          }
                        ]
                      },
                      selected: 'single'
                    },
                    display: true,
                    backgroundContour: {
                      color: 'rgba(255,255,255,1)',
                      display: false,
                      lineType: 'solid',
                      width: 1
                    },
                    opacity: 100
                  },
                  styleSeries: [
                    {
                      condition: '',
                      titleStyle: { fontFamily: 'DIN', fontSize: 12, color: '#ff4141', fontWeight: 'bold' },
                      ringStyle: {
                        color: {
                          selected: 'single',
                          single: '#ff4800'
                        },
                        strokeDisplay: true,
                        strokeColor: '#1eddff',
                        strokeWidth: 1,
                        strokeStyle: 'dashed',
                        shadowSize: 0,
                        shadowColor: 'rgba(255,0,0,0)',
                        shadowX: 0,
                        shadowY: 0
                      },
                      backgroundstyle: {
                        color: {
                          selected: 'single',
                          single: '#0fefff88'
                        },
                        strokeDisplay: true,
                        strokeColor: '#ff3939',
                        strokeWidth: 0,
                        strokeStyle: 'solid',
                        shadowSize: 0,
                        shadowColor: 'rgba(0,0,0,0)',
                        shadowX: 0,
                        shadowY: 0
                      }
                    }
                  ],
                  chartHeight: 60
                }
              }
            },
            // text
            {
              additionalField: false,
              fieldName: 'c1',
              offset: 0,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'text',
                width: null,
                alignment: 'left',
                textConfig: {
                  content: '<code style="color:red;">自定义</code>内容<br/>自定义内容',
                  overflow: 'lineFeed',
                  newlineLimit: 'none',
                  maxRow: 1,
                  richText: true,
                  lineHeight: {
                    type: 'multiple',
                    fixedNum: 20,
                    multipleNum: 1
                  },
                  fontStyle: {
                    fontSize: 16,
                    color: '#ff6666',
                    fontWeight: 'bold',
                    fontFamily: 'Microsoft YaHei',
                    letterSpacing: 0
                  },
                  textStyleSeries: [
                    {
                      condition: '1212',
                      fontSize: 16,
                      color: '#00f7ff',
                      fontWeight: 'bold',
                      fontFamily: 'Microsoft YaHei',
                      letterSpacing: 0
                    }
                  ]
                }
              }
            },
            // num
            {
              additionalField: false,
              fieldName: 'c6',
              offset: 10,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'number',
                width: null,
                alignment: 'left',
                numberConfig: {
                  prefixDistance: 4,
                  suffixDistance: 4,
                  prefixConfig: {
                    prefix: '前',
                    prefixStyle: {
                      fontFamily: 'Microsoft YaHei',
                      color: '#5eff00',
                      fontSize: 14,
                      fontWeight: 'normal'
                    },
                    verticalOffset: 0
                  },
                  suffixConfig: {
                    suffix: '后',
                    suffixStyle: {
                      fontFamily: 'Microsoft YaHei',
                      color: '#3D99FC',
                      fontSize: 14,
                      fontWeight: 'normal'
                    },
                    verticalOffset: 0
                  },
                  numValueConfig: {
                    fontStyle: {
                      fontSize: 13,
                      color: numc,
                      fontWeight: 'bold',
                      fontFamily: 'Microsoft YaHei',
                      letterSpacing: 0
                    },
                    styleIntervalFlag: true,
                    styleInterval: [
                      {
                        min: 70,
                        max: 100,
                        color: numc,
                        fontWeight: 'bold',
                        fontSize: 20
                      }
                    ],
                    widthAdaptation: true,
                    animate: {
                      display: true,
                      speed: 1000,
                      takeRatio: 0
                    },
                    numberFormat: {
                      display: true,
                      decollate: true,
                      decimal: 2,
                      round: true,
                      percentage: false,
                      negativeing: 'brackets',
                      zeroFill: false
                    }
                  }
                }
              }
            },
            // target
            {
              additionalField: false,
              fieldName: 'c7',
              offset: 0,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'target',
                width: null,
                alignment: 'left',
                targetConfig: {
                  baseValue: '0',
                  showValue: true,
                  iconValueSpace: 10,
                  fontConfig: {
                    style: 'icon2',
                    size: 24,
                    riseColor: '#D24C4C',
                    declineColor: '#48C18D',
                    flatColor: '#D2944C',
                    syncValueColor: true
                  },
                  fontSeries: [
                    {
                      condition: false,
                      style: 'icon1',
                      size: 24,
                      riseColor: '#48C18D',
                      declineColor: '#D24C4C',
                      flatColor: '#D2944C',
                      syncValueColor: true
                    }
                  ],
                  numberFormat: {
                    display: true,
                    thousandth: true,
                    numDo: 3, // 保留小数 小数点位数
                    rounding: true, // 四舍五入
                    percentage: false,
                    negativeing: 'minus', // 负数显示值  minus 负号  brackets 括号  abs 绝对值
                    zeroFill: true //
                  },
                  textStyle: {
                    fontFamily: 'Microsoft YaHei',
                    fontSize: 14,
                    color: '#17ff78',
                    fontWeight: 400,
                    letterSpacing: 0
                  },
                  suffixConfig: {
                    display: true,
                    leftOffset: 10,
                    topOffset: 0,
                    suffix: '%',
                    textStyle: {
                      fontFamily: 'Microsoft YaHei',
                      fontSize: 14,
                      color: '#ff0000',
                      fontWeight: 400,
                      letterSpacing: 0
                    }
                  }
                }
              }
            },
            // image
            {
              additionalField: true,
              fieldName: 'c5',
              offset: 10,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'image',
                width: null,
                alignment: 'left',
                imageConfig: {
                  imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
                  width: 50,
                  height: 50,
                  imageSeries: [
                    {
                      condition: 'as',
                      imageUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
                      width: 50,
                      height: 50
                    }
                  ]
                }
              }
            },
            // tags
            {
              additionalField: false,
              fieldName: 'tags',
              offset: 10,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'tags',
                width: null,
                alignment: 'left',
                tagsConfig: {
                  separator: ',',
                  xPadding: 4,
                  yPadding: 2,
                  gap: 4,
                  normalStyle: {
                    bgColor: '#00e1ff55',
                    radius: 2,
                    border: {
                      display: true,
                      width: 1,
                      color: '#00e1ff'
                    },
                    fontStyle: {
                      fontSize: 12,
                      color: '#fff',
                      fontWeight: 'normal',
                      fontFamily: 'Microsoft YaHei',
                      letterSpacing: 0
                    }
                  },
                  styleSeries: [
                    {
                      condition: '民事实时',
                      bgColor: '#d0ff0071',
                      radius: 2,
                      border: {
                        display: true,
                        width: 1,
                        color: '#d0ff00'
                      },
                      fontStyle: {
                        fontSize: 20,
                        color: '#06ffde',
                        fontWeight: 'normal',
                        fontFamily: 'Microsoft YaHei',
                        letterSpacing: 0
                      }
                    }
                  ]
                }
              }
            },
            // progress
            {
              additionalField: false,
              fieldName: 'c6',
              offset: 10,
              position: {
                x: 'auto',
                left: 10,
                top: 10
              },
              valueStyle: {
                valueType: 'progress',
                width: null,
                alignment: 'left',
                progressConfig: {
                  maxVal: -1,
                  progressStyle: {
                    progressType: 'line',
                    gridGap: 2,
                    gridLength: 5,
                    progressWidth: 120,
                    progressHeight: 14,
                    radius: 4,
                    gridColorType: 'custom',
                    progressStartColor: '#0d9eff',
                    progressEndColor: '#ff0000',
                    progressImage: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
                  },
                  numberFormat: {
                    display: true,
                    decollate: true,
                    decimal: 2,
                    round: true,
                    percentage: false,
                    negativeing: 'minus'
                  },
                  progressText: {
                    display: true,
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: 'normal',
                    fontFamily: 'Microsoft YaHei',
                    letterSpacing: 0
                  },
                  progressStyleIntervalFlag: true,
                  progressStyleInterval: [
                    {
                      min: 0,
                      max: 80,
                      progressColor: { progressStartColor: '#0d9eff', progressEndColor: '#ff0000' },
                      progressImage:
                        'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
                      color: '#ff2600',
                      fontWeight: 'normal',
                      fontSize: 16
                    }
                  ],
                  progressOutline: {
                    display: true,
                    xPadding: 0,
                    yPadding: 1,
                    bgColor: 'rgba(255,255,255,0.4)',
                    borderColor: 'rgba(61,153,252,0.4)',
                    borderWidth: 1,
                    fillet: 2
                  },
                  suffixConfig: {
                    display: true,
                    content: '后缀',
                    yOffset: 2,
                    fontStyle: {
                      fontSize: 12,
                      color: '#fff',
                      fontWeight: 'normal',
                      fontFamily: 'Microsoft YaHei',
                      letterSpacing: 0
                    }
                  }
                }
              }
            }
          ]
        }
      }
    ]
  }

  const data = [
    {
      c1: '机场专线--<span>1</span>',
      tags: '民事实时,超前1,sasas,dfsdsd,asasas',
      c2: '陈旭峰1',
      c3: '证件版1',
      c4: '李雪峰,告戒命1',
      c5: '机场肯纳开始1',
      c6: 999,
      c7: 'asasas'
    },
    {
      c1: '机场专线2',
      tags: '民事实时,超前2',
      c2: '陈旭峰2',
      c3: '证件版2',
      c4: '李雪峰,告戒命2',
      c5: '机场肯纳开始2',
      c6: 999,
      c7: 6
    },
    {
      c1: '机场专线3',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 45,
      c7: 10
    },
    {
      c1: '机场专线4',
      tags: '民事实时,超前4',
      c2: '陈旭峰4',
      c3: '证件版4',
      c4: '李雪峰,告戒命4',
      c5: '机场肯纳开始4',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线5',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 391,
      c7: 10
    },
    {
      c1: '机场专线6',
      tags: '民事实时,超前4',
      c2: '陈旭峰4',
      c3: '证件版4',
      c4: '李雪峰,告戒命4',
      c5: '机场肯纳开始4',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线7',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线8',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线9',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线10',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线11',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线12',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线13',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    },
    {
      c1: '机场专线14',
      tags: '民事实时,超前3',
      c2: '陈旭峰3',
      c3: '证件版3',
      c4: '李雪峰,告戒命3',
      c5: '机场肯纳开始3',
      c6: 30,
      c7: 10
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div>
      <button onClick={() => setShow(!show)}>按钮</button>
      <div style={{ width: 600, height: 600, margin: 100 }}>
        {show && <LczCardList w={600} h={600} data={data} {...config} onClick={a => console.log(a)} />}
      </div>
    </div>
  )
})
