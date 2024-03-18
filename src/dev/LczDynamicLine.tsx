import React, { memo, useState } from 'react'
import { LczChart } from '../'
import { DynamicLineProps } from '../LczChart/LczChartLine/LczDynamicLine/type'

const LczDynamicLine = LczChart.LczChartLine.LczDynamicLine

export const T_LczDynamicLine = memo(function T_LczDynamicLine() {
  const c2 = {
    selected: 'single',
    single: '#efff16',
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

  const config: DynamicLineProps = {
    globalConfig: {
      margin: { t: 45, r: 25, b: 50, l: 25 },
      bgColor: 'rgba(0,0,0,0)',
      titleConfig: {
        display: false,
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
      legendConfig: {
        display: true,
        seriesName: {
          display: true,
          legendSeriesColorFollow: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          showWidth: 30,
          overflow: 'breakAll'
        },
        size: {
          w: 10,
          h: 10
        },
        iconConfig: {
          iconType: 'svg',
          systemStyle: 'star',
          customUrl: '',
          svgPath:
            'M864 256H160a64 64 0 0 1 64-64h139.52l33.28-40.576A64 64 0 0 1 446.272 128h131.456a64 64 0 0 1 49.472 23.424L660.48 192H800a64 64 0 0 1 64 64zM230.4 320l51.84 489.92A95.808 95.808 0 0 0 377.6 896h268.8a95.808 95.808 0 0 0 95.36-86.08L793.28 320z m372.16 333.12a33.344 33.344 0 0 1 9.28 22.72 31.68 31.68 0 0 1-32 32 33.344 33.344 0 0 1-22.72-9.28L512 653.44l-45.12 45.12a33.344 33.344 0 0 1-22.72 9.28 31.68 31.68 0 0 1-32-32 33.344 33.344 0 0 1 9.28-22.72L466.56 608l-45.12-45.12a33.344 33.344 0 0 1-9.28-22.72 32.768 32.768 0 0 1 9.28-22.72 32.256 32.256 0 0 1 45.44 0L512 562.56l45.12-45.12a32.256 32.256 0 0 1 45.44 0 32.768 32.768 0 0 1 9.28 22.72 33.344 33.344 0 0 1-9.28 22.72L557.44 608z'
        },
        spacing: 5,
        layout: {
          distributionMode: 'unilateral',
          itemGap: 20,
          orient: 'horizontal',
          xPosition: 'center',
          yPosition: 'bottom',
          xOffset: 0,
          yOffset: 0,
          layoutmode: 'leftright'
        },
        clickInt: {
          clicked: true,
          disableStyles: 'rgba(204,204,204,1)'
        }
      },
      toolConfig: {
        display: true,
        layOut: {
          orient: 'horizontal',
          toolBoxPosition: {
            toolxPosition: 'right',
            toolyPosition: 'top',
            xOffset: 0,
            yOffset: 0
          }
        },
        toolStyle: {
          size: 15,
          itemGap: 10,
          showTitle: true
        },
        tool: {
          saveAsImage: true,
          restore: true,
          magicType: true
        }
      },
      displayNum: 20,
      dataAnimate: true
    },
    axisConfig: {
      xAxis: {
        display: true,
        axisLabel: {
          display: true,
          labelType: 'category', // category time

          time: 'MM月',
          splitType: 'none',
          splitNumber: 3,
          leftMargin: 1,
          rightMargin: 1,
          showMaxLabel: false,
          showMinLabel: false,

          spaceType: 'auto',
          space: 0,
          textRotate: 0,
          boundaryGap: true,

          axisStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            width: null,
            overflow: 'breakAll',
            showType: 'actualLength',
            charNumber: 2,

            padding: 0
          },
          axisBgStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderRadius: 0
          },
          axisLabelShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisUnit: {
          display: false,
          content: '',
          nameLocation: 'end',
          unitStyle: {
            nameRotate: 0,
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderRadius: 0
          },
          unitShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisLine: {
          display: true,
          lineStyle: {
            symbol: 'none',
            symbolW: 10,
            symbolH: 15,
            color: 'rgba(255,255,255,1)',
            opacity: 100,
            width: 1
          },
          lineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisTick: {
          display: false,
          tickStyle: {
            color: 'rgba(255,255,255,1)',
            opacity: 100,
            type: 'solid',
            width: 2,
            length: 10,
            inside: 'out'
          },
          tickShadow: {
            shadowBlur: 2,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisSplitLine: {
          display: false,
          splitLineStyle: {
            lineType: 'solid',
            color: 'rgba(204,204,204,1)',
            opacity: 20,
            width: 1
          },
          splitLineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      },
      yAxis: {
        display: true,
        yaxisLabel: {
          display: true,
          min: null,
          max: null,
          minInterval: 1,
          splitAuto: true,
          splitNumber: 10,
          suffixConfig: {
            content: ''
          },
          yLabelStyle: {
            interval: 0,
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            showWidth: 12,
            overflow: 'breakAll',
            showType: 'outOfCharacter',
            charNumber: 2,

            padding: 0
          },
          yLabelBgStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderRadius: 0
          },
          yLabelShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          format: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: false,
            negativeing: 'minus'
          }
        },
        axisUnit: {
          display: true,
          content: '单位',
          nameLocation: 'end',
          unitStyle: {
            nameRotate: 0,
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderRadius: 0
          },
          unitShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisLine: {
          display: true,
          lineStyle: {
            symbol: 'none',
            symbolW: 10,
            symbolH: 15,
            color: 'rgba(255,255,255,1)',
            opacity: 100,
            width: 1
          },
          lineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisTick: {
          display: false,
          tickStyle: {
            color: 'rgba(255,255,255,1)',
            opacity: 30,
            type: 'solid',
            width: 1,
            length: 2,
            inside: 'out'
          },
          tickShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisSplitLine: {
          display: false,
          splitLineStyle: {
            lineType: 'solid',
            color: 'rgba(204,204,204,1)',
            opacity: 20,
            width: 1
          },
          splitLineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      }
    },
    seriesConfig: {
      dataSeries: [
        {
          map: { fieldName: '', displayName: '' },
          brokenLine: {
            type: 'solid', // solid dotted dashed
            color: c2,
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1,
            step: 'none',
            smooth: false,
            connectNulls: false
          },
          dataMarker: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            width: 10,
            height: 10,
            rotate: 0,
            markStyle: 'system', // system 系统 custom 自定义
            // system
            typeStyle: 'circle', //'emptyCircle','circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            syncColor: true,
            borderColor: '#00B2FF',
            lineWidth: 0,
            color: 'rgba(255,255,155,1)',
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            //custom
            img: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          },
          valueLabel: {
            display: true,
            valueStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: 12,
              color: '#FFFFFF',
              fontWeight: 'normal',
              rotate: 0
            },
            linePosition: {
              position: 'top', //left right bottom inside
              xOffset: 0,
              yOffset: 0
            },
            format: {
              display: true,
              decollate: true,
              decimal: 0,
              round: true,
              percentage: false,
              negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
            }
          }
        }
      ],
      markSeries: [
        // {
        //   markType: 'min', //'min' | 'max' | 'average'
        //   lineType: 'dashed', //'solid' | 'dashed' | 'dotted'
        //   startStyle: {
        //     style: 'arrow', // 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
        //     width: 8,
        //     height: 8
        //   },
        //   syncColor: true,
        //   lineColor: c2,
        //   opacity: 60,
        //   width: 4,
        //   labelStyle: {
        //     display: true,
        //     position: 'start',
        //     fontFamily: 'PingFangSC-Regular',
        //     fontSize: 12,
        //     color: '#ff0000',
        //     fontWeight: 'normal',
        //     xOffset: 10,
        //     yOffset: 10,
        //     borderStyle: {
        //       backgroundColor: 'transparent',
        //       borderColor: 'transparent',
        //       borderWidth: 0,
        //       borderRadius: 20
        //     },
        //     shadow: {
        //       shadowBlur: 0,
        //       shadowColor: 'rgba(0,0,0,0)',
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 0
        //     },
        //     format: {
        //       display: false,
        //       decollate: true,
        //       decimal: 2,
        //       round: false,
        //       percentage: false,
        //       negativeing: 'minus'
        //     }
        //   }
        // }
      ],
      markPointSeries: [
        // {
        //   pointType: 'min',
        //   pointstyle: 'system',
        //   // system
        //   pointIcon: 'arrow',
        //   syncColor: false,
        //   color: c,
        //   opacity: 60,
        //   borderStyle: { borderColor: 'red', borderWidth: 1 },
        //   shadow: {
        //     shadowBlur: 10,
        //     shadowColor: 'rgba(250,0,0,1)',
        //     shadowOffsetX: 0,
        //     shadowOffsetY: 0
        //   },
        //   // custom
        //   imgUrl: '',
        //   size: {
        //     width: 50,
        //     height: 50
        //   },
        //   symbolRotate: 10,
        //   pointLabel: {
        //     display: true,
        //     position: 'inside',
        //     fontFamily: 'PingFangSC-Regular',
        //     fontSize: 12,
        //     color: '#ff2020',
        //     fontWeight: 'normal',
        //     xOffset: 0,
        //     yOffset: 0,
        //     borderStyle: {
        //       backgroundColor: 'transparent',
        //       borderColor: 'transparent',
        //       borderWidth: 0,
        //       borderRadius: 20
        //     },
        //     shadow: {
        //       shadowBlur: 0,
        //       shadowColor: 'rgba(0,0,0,0)',
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 0
        //     },
        //     format: {
        //       display: false,
        //       decollate: true,
        //       decimal: 2,
        //       round: false,
        //       percentage: false,
        //       negativeing: 'minus'
        //     }
        //   }
        // },
        // {
        //   pointType: 'max',
        //   pointstyle: 'system',
        //   // system
        //   pointIcon: 'arrow',
        //   syncColor: true,
        //   color: c,
        //   opacity: 100,
        //   borderStyle: { backgroundColor: 'red', borderColor: 'red', borderWidth: 1, borderRadius: 20 },
        //   shadow: {
        //     shadowBlur: 10,
        //     shadowColor: 'rgba(250,0,0,1)',
        //     shadowOffsetX: 0,
        //     shadowOffsetY: 0
        //   },
        //   // custom
        //   imgUrl: '',
        //   size: {
        //     width: 50,
        //     height: 50
        //   },
        //   symbolRotate: 10,
        //   pointLabel: {
        //     display: true,
        //     position: 'inside',
        //     fontFamily: 'PingFangSC-Regular',
        //     fontSize: 12,
        //     color: '#ff2020',
        //     fontWeight: 'normal',
        //     xOffset: 0,
        //     yOffset: 0,
        //     borderStyle: {
        //       backgroundColor: 'transparent',
        //       borderColor: 'transparent',
        //       borderWidth: 0,
        //       borderRadius: 20
        //     },
        //     shadow: {
        //       shadowBlur: 0,
        //       shadowColor: 'rgba(0,0,0,0)',
        //       shadowOffsetX: 0,
        //       shadowOffsetY: 0
        //     },
        //     format: {
        //       display: false,
        //       decollate: true,
        //       decimal: 2,
        //       round: false,
        //       percentage: false,
        //       negativeing: 'minus'
        //     }
        //   }
        // }
      ]
    },
    tooltipConfig: {
      hoverTrigger: {
        display: true,
        alwaysShowContent: false
      },
      tooltip: {
        tipposition: {
          offsetType: 'normal', //custom normal
          xPosition: 0,
          yPosition: 0,
          margin: { t: 5, r: 7, b: 5, l: 7 }
        },
        tipStyle: {
          textStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 'normal',
            fontStyle: 'normal' //italic normal
          },
          bgStyle: {
            backgroundColor: '#cc6262',
            borderColor: '#ff0e0e',
            borderWidth: 1,
            borderRadius: 10,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            className: ''
          }
        }
      },
      indicator: {
        type: 'shadow',
        snap: true
      }
    }
  }

  const oldData = [
    {
      category: '2021-01-03 17:35:11',
      categoryTitle: '',
      value: 180,
      series: '系列一',
      seriesTitle: '我真是是1'
    },
    {
      category: '2021-01-03 17:35:12',
      categoryTitle: '',
      value: 200,
      series: '系列一',
      seriesTitle: '我是1'
    },
    {
      category: '2021-01-03 17:35:13',
      categoryTitle: '',
      value: 160,
      series: '系列一',
      seriesTitle: '我是1'
    },
    {
      category: '2021-01-03 17:35:14',
      categoryTitle: '',
      value: 200,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2021-01-03 17:35:15',
      categoryTitle: '',
      value: 180,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2021-01-03 17:35:16',
      categoryTitle: '',
      value: 180,
      series: '系列一',
      seriesTitle: ''
    }
    // {
    //   category: '2021-01',
    //   categoryTitle: '',
    //   value: 80,
    //   series: '系列二',
    //   seriesTitle: '我真是是1'
    // },
    // {
    //   category: '2021-02',
    //   categoryTitle: '这是2',
    //   value: 500,
    //   series: '系列二',
    //   seriesTitle: '我是1'
    // },
    // {
    //   category: '2021-03',
    //   categoryTitle: '这是3',
    //   value: 260,
    //   series: '系列二',
    //   seriesTitle: '我是1'
    // },
    // {
    //   category: '2021-04',
    //   categoryTitle: '',
    //   value: 100,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   category: '2021-05',
    //   categoryTitle: '',
    //   value: 280,
    //   series: '系列二',
    //   seriesTitle: ''
    // }
  ]

  const [comData, setComData] = useState(oldData)
  const aa = () => {
    const cc: any = []
    // for (let i = 0; i < 5; i++) {
    //   const a = {
    //     category: Math.round(Math.random() * 100),
    //     categoryTitle: '',
    //     value: Math.round(Math.random() * 1000),
    //     series: '系列一',
    //     seriesTitle: ''
    //   }
    //   cc.push(a)
    //   const b = {
    //     category: Math.round(Math.random() * 100),
    //     categoryTitle: '',
    //     value: Math.round(Math.random() * 1000),
    //     series: '系列二',
    //     seriesTitle: ''
    //   }
    //   cc.push(b)
    // }

    setTimeout(() => {
      const aa: any = []
      for (let i = 0; i < 5; i++) {
        const a = {
          category: Math.round(Math.random() * 100),
          categoryTitle: '',
          value: Math.round(Math.random() * 1000),
          series: '系列一',
          seriesTitle: ''
        }
        aa.push(a)
        // const b = {
        //   category: Math.round(Math.random() * 100),
        //   categoryTitle: '',
        //   value: Math.round(Math.random() * 1000),
        //   series: '系列二',
        //   seriesTitle: ''
        // }
        // cc.push(b)
      }

      setComData(aa)
    }, 2000)
    setComData(cc)
  }

  return (
    <div style={{ width: 900, height: 600, margin: ' 0 auto' }}>
      <button onClick={aa}>帅</button>
      <LczDynamicLine
        w={900}
        h={600}
        {...config}
        data={comData}
        design={false}
        onClick={a => console.log('点击', a)}
        onDataChange={a => console.log('改变', a)}
      />
    </div>
  )
})
