import React, { memo } from 'react'
import { LczChart } from '../'
import { LczBasicRadarProps } from '../LczChart/LczChartOther/LczBasicRadar/type'

const LczBasicRadar = LczChart.LczChartOther.LczBasicRadar

export const T_LczBasicRadar = memo(function T_Lcz3dTorus() {
  const c = {
    selected: 'single',
    single: 'rgba(0,178,255,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(0,178,255,1)'
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
    selected: 'single',
    single: 'rgba(252, 61, 134,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgb(252, 61, 134)'
        },
        {
          begins: 100,
          value: '#21ad05'
        }
      ]
    }
  }
  const c4 = {
    selected: 'single',
    single: 'rgba(0,221,219,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgba(0,221,219,1)'
        }
      ]
    }
  }
  const c5 = {
    selected: 'single',
    single: 'rgba(255,242,107,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgba(255,242,107,1)'
        }
      ]
    }
  }

  const config: LczBasicRadarProps = {
    globalConfig: {
      margin: { x: 40, y: 50 },
      backgroundColor: 'pink',
      titleConfig: {
        display: false,
        content: { value: 'TITLE11111' },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#ffffff',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: { value: 'aa' },
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
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal',
          showWidth: 30,
          overflow: 'breakAll'
        },
        size: { w: 30, h: 12 },
        iconConfig: {
          iconType: 'system', //system 系统 custom 自定义
          systemStyle: 'roundRect', //（echarts提供'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'）
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        spacing: 10,
        layout: {
          distributionMode: 'unilateral', //'unilateral' | 'bothSides'
          itemGap: 20,
          orient: 'horizontal', // horizontal   vertical
          xPosition: 'center', //left right center auto
          yPosition: 'top', //top bottom center auto
          xOffset: 20,
          yOffset: 0,
          layoutmode: 'leftright'
        },
        clickInt: {
          clicked: true,
          disableStyles: 'red'
        }
      },
      toolConfig: {
        display: false,
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
          saveAsImage: true
        }
      },
      dataAnimate: true
    },
    radarAxisConfig: {
      radarShape: 'polygon', //'polygon' | 'circle'
      radarAxisLabel: {
        display: true,
        isScale: false,
        splitNumber: 5,
        AxisSuffix: { content: '' },
        axisStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          width: null,
          overflow: 'none',
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
        },
        labelNumberFormat: {
          display: true,
          decollate: true,
          decimal: 0,
          round: true,
          percentage: false,
          negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
        }
      },
      radarAxisName: {
        display: true,
        axisNameStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'yellow',
          fontWeight: 'normal',
          padding: 8
        },
        axisNameBgStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderRadius: 0
        },
        axisNameShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      radarAxisLine: {
        display: true,
        lineStyle: {
          symbol: 'none',
          symbolW: 10,
          symbolH: 15,
          color: 'rgba(255,255,255,1)',
          opacity: 100,
          lineType: 'solid',
          width: 1
        },
        lineShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      radarAxisTick: {
        display: false,
        tickStyle: {
          color: 'rgba(255,255,255,1)',
          opacity: 100,
          type: 'solid',
          width: 2,
          length: 10
        },
        tickShadow: {
          shadowBlur: 2,
          shadowColor: 'rgba(255,0,0,1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      radarAxisSplitLine: {
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
      },
      radarSplitArea: {
        display: true,
        radarSplitAreaStyle: {
          colorSeries: [
            { value: 'rgba(90,98,113,1)' },
            { value: 'rgba(77,84,97,1)' },
            { value: 'rgba(63,69,80,1)' },
            { value: 'rgba(47,52,61,1)' },
            { value: 'rgba(30,33,39,1)' }
          ],
          opacity: 100
        },
        splitAreaShadow: {
          shadowBlur: 2,
          shadowColor: 'rgba(255,0,0,1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      }
    },
    seriesConfig: {
      radarRadius: 77,
      extremumConfig: {
        maxValue: '',
        minValue: ''
      },
      radarDataSeries: [
        {
          map: { fieldName: '系列一', displayName: 'ss' },
          brokenLine: {
            lineType: 'solid', // 'solid' | 'dashed' | 'dotted'
            color: c3,
            width: 1,
            opacity: 100,
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          seriesArea: {
            color: c3,
            opacity: 50,
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          dataMarker: {
            width: 10,
            height: 10,
            rotate: 30,
            markStyle: 'system', // system 系统 custom 自定义
            // system
            typeStyle: 'roundRect', //'emptyCircle','circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            syncColor: true,
            borderColor: '#00B2FF',
            lineWidth: 1,
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
              color: 'yellow',
              fontWeight: 'normal',
              rotate: 0
            },
            linePosition: {
              position: 'left', //left right bottom inside
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
        },
        {
          map: { fieldName: '', displayName: '' },
          brokenLine: {
            lineType: 'solid', // 'solid' | 'dashed' | 'dotted'
            color: c,
            width: 1,
            opacity: 100,
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          seriesArea: {
            color: c,
            opacity: 50,
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          dataMarker: {
            display: false,
            width: 10,
            height: 10,
            rotate: 30,
            markStyle: 'system', // system 系统 custom 自定义
            // system
            typeStyle: 'roundRect', //'emptyCircle','circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
            syncColor: true,
            borderColor: '#00B2FF',
            lineWidth: 1,
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
              color: 'yellow',
              fontWeight: 'normal',
              rotate: 0
            },
            linePosition: {
              position: 'left', //left right bottom inside
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
            fontSize: 20,
            color: '#ffffff',
            fontWeight: 'normal',
            fontStyle: 'normal' //italic normal
          },
          bgStyle: {
            backgroundColor: '#18050537',
            borderColor: '#07c5ff',
            borderWidth: 1,
            borderRadius: 10,
            shadowBlur: 4,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            className: ''
          }
        }
      },
      tipSuffixConfig: {
        display: true,
        content: '你真帅',
        gap: 20,
        yOffset: 0,
        tipTextStyle: {
          tipSuffixStyleAsync: false,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 13,
          color: '#D5E9FF',
          fontWeight: 'normal',
          fontStyle: 'normal' //italic normal
        },
        tipSuffixSeries: [{ fieldName: '系列一', content: '这是系列一' }]
      }
    }
  }

  const data = [
    {
      indicator: '维度一',
      indicatorTitle: '这是维度一',
      value: 30,
      max: 200,
      series: '系列一',
      seriesTitle: 'jj'
    },
    {
      indicator: '维度二',
      indicatorTitle: '',
      value: 40,
      max: 200,
      series: '系列一',
      seriesTitle: ''
    }
    // {
    //   indicator: '纬度三',
    //   indicatorTitle: '',
    //   value: 20,
    //   series: '系列一',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '纬度四',
    //   indicatorTitle: '',
    //   value: 50,
    //   series: '系列一',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '维度一',
    //   indicatorTitle: '',
    //   value: 90,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '维度二',
    //   indicatorTitle: '',
    //   value: 55,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '纬度三',
    //   indicatorTitle: '',
    //   value: 33,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '纬度四',
    //   indicatorTitle: '',
    //   value: 88,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '纬度五',
    //   indicatorTitle: '',
    //   value: 99,
    //   series: '系列二',
    //   seriesTitle: ''
    // },
    // {
    //   indicator: '纬度六',
    //   indicatorTitle: '',
    //   value: 100,
    //   series: '系列二',
    //   seriesTitle: ''
    // }
  ]

  return (
    <div style={{ width: 900, height: 600, margin: ' 0 auto' }}>
      <LczBasicRadar w={900} h={600} {...config} data={data} onClick={a => console.log(1111, a)} />
    </div>
  )
})
