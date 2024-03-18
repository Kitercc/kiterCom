import React, { memo } from 'react'
import { LczChart } from '../'
import { BasicGaugeProps } from '../LczChart/LczChartGauge/LczBasicGauge/type'

const LczBasicGauge = LczChart.LczChartGauge.LczBasicGauge

export const T_LczBasicGauge = memo(function T_LczBasicGauge() {
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

  const config: BasicGaugeProps = {
    globalConfig: {
      margin: {
        x: 50,
        y: 50
      },
      backgroundColor: 'pink',
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
          saveAsImage: true
        }
      },
      dataAnimate: {
        processAn: true,
        numberAn: true
      }
    },
    axisConfig: {
      axisLabel: {
        display: true,
        distance: 30,
        suffix: {
          content: 'd'
        },
        gaugeAxisLabelTextStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'yellow',
          fontWeight: 'normal',
          width: null,
          overflow: 'breakAll' // 'truncate' | 'breakAll' | 'none'
        },
        gaugeAxisLabaelBgStyle: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 0,
          borderRadius: 0
        },
        gaugeAxisLabelShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        gaugeAxisLabaelFormat: {
          display: false,
          decollate: true,
          decimal: 9,
          round: true,
          percentage: false,
          negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
        }
      },
      axisLine: {
        display: true,
        gaugeAxisLineStyle: {
          colorType: 'unify', // 'unify' | 'subsection'
          //unify
          unifyColor: c,
          //subsection
          subsectionConfig: [{ subsectionColor: c2 }, { subsectionColor: c }, { subsectionColor: c4 }],
          //
          opacity: 100,
          width: 30,
          roundCap: false
        },
        guageAxisLineShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      axisTick: {
        display: true,
        splitNumber: null,
        distance: 60,
        gaugeAxisTickStyle: {
          color: 'white',
          opacity: 100,
          lineType: 'dashed', //'solid' | 'dashed' | 'dotted'
          width: 2,
          length: 10
        },
        gaugeAxisTickShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      splitLine: {
        display: true,
        distance: 2,
        gaugeSplitLineStyle: {
          color: 'black',
          opacity: 100,
          lineType: 'solid', //'solid' | 'dashed' | 'dotted'
          width: 2,
          length: 5
        },
        gaugeSplitLineShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      }
    },
    gaugeConfig: {
      radius: 70,
      extremumConfig: {
        max: { value: 100 },
        min: { value: 0 }
      },
      angleConfig: {
        startAngle: 225,
        endAngle: -45
      },
      pointerConfig: {
        display: true,
        pointerStyle: {
          pointerType: 'system', // 'system' | 'custom'
          //system
          systemType: 'Default', //circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none', Default
          //custom
          customPath:
            'M512 1024a512 512 0 1 1 512-512 512.590769 512.590769 0 0 1-512 512z m0-787.692308a275.692308 275.692308 0 1 0 275.692308 275.692308 276.007385 276.007385 0 0 0-275.692308-275.692308z',
          //
          pointerSyncColor: true,
          color: c,
          opacity: 100,
          width: 5,
          length: 60,
          showAbove: true,
          xOffset: 1,
          yOffset: 1
        },
        pointerContour: {
          display: false,
          color: 'yellow',
          width: 2,
          lineType: 'dashed' //'solid' | 'dashed' | 'dotted'
        },
        pointerShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      fixedPointConfig: {
        display: true,
        fixedPointerStyle: {
          fixedPointerType: 'system', //'system' | 'custom' | 'svg'
          //system
          systemType: 'none', //circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none',
          //custom
          customImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          //svg
          svgPath:
            'M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
          color: c,
          opacity: 100,
          size: 20,
          showAbove: true,
          xOffset: 0,
          yOffset: 0
        },
        fixedPointerContour: {
          display: false,
          color: 'yellow',
          width: 0,
          lineType: 'solid' //'solid' | 'dashed' | 'dotted'
        },
        fixedPointerShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      progressConfig: {
        display: true,
        progressStyle: {
          syncColor: true,
          color: c4,
          opacity: 100,
          width: 20,
          roundCap: true,
          overlap: false,
          clip: false
        },
        progressContour: {
          display: false,
          color: 'red',
          width: 1,
          lineType: 'solid' //'solid' | 'dashed' | 'dotted'
        },
        progressShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      }
    },
    seriesConfig: {
      gaugeDataSeries: [
        {
          map: { fieldName: '这是一', displayName: '' },
          color: c2,
          gaugeTitleConfig: {
            display: true,
            gaugeTitleStyle: {
              syncColor: true,
              color: 'red',
              backgroundColor: 'white',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 12,
              fontWeight: 'normal',
              width: null,
              height: null,
              overflow: 'truncate', // 'truncate' | 'breakAll' | 'none'
              xOffset: 1,
              yOffset: 100
            },
            gaugeTitleContour: {
              display: true,
              color: 'white',
              width: 1,
              lineType: 'solid', //'solid' | 'dashed' | 'dotted'
              radius: 0
            },
            gaugeTitleShadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          gaugeDetailConfig: {
            display: false,
            gaugeTitleStyle: {
              isReal: false,
              unitContent: '',
              syncColor: false,
              color: 'red',
              backgroundColor: 'white',
              fontFamily: 'PingFangSC-Regular',
              fontSize: 18,
              fontWeight: 'normal',
              width: null,
              height: null,
              overflow: 'truncate', // 'truncate' | 'breakAll' | 'none'
              xOffset: 0,
              yOffset: 100
            },
            gaugeTitleContour: {
              display: true,
              color: 'white',
              width: 1,
              lineType: 'solid', //'solid' | 'dashed' | 'dotted'
              radius: 0
            },
            gaugeTitleShadow: {
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
              negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
            }
          }
        }
      ]
    }
  }

  const data: any = [
    {
      item: '这是一',
      itemTitle: 'sss',
      value: 30
    }

    // {
    //   item: '这是三',
    //   itemTitle: 'ww',
    //   value: 30
    // }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczBasicGauge w={900} h={600} data={data} {...config} onClick={a => console.log(a)} />
    </div>
  )
})
