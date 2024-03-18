import React, { memo } from 'react'
import { LczChart } from '../'
import { ScatterProps } from '../LczChart/LczChartScatter/LczBasicScatter/type'

const LczBasicBubble = LczChart.LczChartScatter.LczBasicBubble

const c = {
  selected: 'single',
  single: '#fffd88',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#3dfc93'
      },
      {
        begins: 100,
        value: '#eeff00'
      }
    ]
  }
}

const c2 = {
  selected: 'single',
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
export const T_LczBasicBubble = memo(function T_LczBasicBubble() {
  const config: ScatterProps = {
    globalConfig: {
      margin: {
        t: 15,
        b: 25,
        l: 25,
        r: 25
      },
      bgColor: 'rgba(0,0,0,0)',
      titleConfig: {
        display: true,
        content: {
          value: 'TITLE'
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: '#20f166',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: {
            value: 'SUB'
          },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#36dbf8',
          fontWeight: 'normal'
        },
        speed: 10,
        xPosition: 'center',
        yPosition: 'top',
        xOffset: 0,
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
          fontWeight: 'normal'
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
      toolbarConfig: {
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
      dataAnimate: true,
      dataZoom: {
        display: false,
        x: true,
        y: true
      }
    },
    axisConfig: {
      xAxis: {
        display: true,
        axisLabel: {
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
            showWidth: null,
            overflow: 'breakAll',
            showType: 'actualLength',
            charNumber: 1,
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
            decimal: 2,
            round: true,
            percentage: false
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
            showWidth: null,
            overflow: 'breakAll',
            showType: 'actualLength',
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
            decimal: 2,
            round: true,
            percentage: false
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
          display: false,
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
      bubbleConfig: {
        styleMode: 'continuity',
        continuityConfig: {
          maxValue: 50,
          minValue: 0,
          maxSize: 40,
          minSize: 4,
          color: [{ value: '#f00' }, { value: 'skyblue' }, { value: 'yellow' }],
          colorLightnessMax: NaN,
          colorLightnessMin: NaN,
          colorSaturationMax: NaN,
          colorSaturationMin: NaN
        },
        subsectionConfig: [
          {
            maxValue: 20,
            minValue: 0,
            symbolSize: 10,
            syncColor: true,
            color: 'skyblue',
            colorLightness: NaN,
            colorSaturation: NaN
          },
          {
            maxValue: 40,
            minValue: 20,
            symbolSize: 20,
            syncColor: true,
            color: '#56ff47',
            colorLightness: NaN,
            colorSaturation: NaN
          },
          {
            maxValue: 60,
            minValue: 40,
            symbolSize: 30,
            syncColor: true,
            color: '#ff7f07',
            colorLightness: NaN,
            colorSaturation: NaN
          }
        ]
      },
      dataSeries: [
        {
          map: {
            fieldName: '系列一',
            displayName: '系列一1212'
          },
          scattrsStyle: {
            symbolSize: 13,
            color: c,
            border: {
              display: true,
              borderColor: '#22f72c',
              borderWidth: 2,
              borderType: 'solid'
            },
            shadow: {
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          bubbleStyle: {
            style: {
              maxSize: 40,
              minSize: 4,
              color: c2
            },
            border: {
              display: true,
              borderColor: '#0B0C0F',
              borderWidth: 1,
              borderType: 'solid'
            },
            shadow: {
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          scattrsStyle: {
            symbolSize: 16,
            color: c2,
            border: {
              display: true,
              borderColor: '#0B0C0F',
              borderWidth: 1,
              borderType: 'solid'
            },
            shadow: {
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          },
          bubbleStyle: {
            style: {
              maxSize: 40,
              minSize: 4,
              color: c
            },
            border: {
              display: true,
              borderColor: '#0B0C0F',
              borderWidth: 1,
              borderType: 'solid'
            },
            shadow: {
              shadowColor: 'rgba(0,0,0,0)',
              shadowBlur: 0,
              shadowOffsetX: 0,
              shadowOffsetY: 0
            }
          }
        }
      ],
      highlight: {
        scale: true,
        focus: 'series'
      },
      markSeries: [
        {
          markType: 'max', //'min' | 'max' | 'average'
          lineType: 'solid', //'solid' | 'dashed' | 'dotted'
          startStyle: {
            style: 'arrow', // 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
            width: 8,
            height: 8
          },
          syncColor: true,
          lineColor: c2,
          opacity: 60,
          width: 1,
          labelStyle: {
            display: true,
            position: 'start',
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#ff0000',
            fontWeight: 'normal',
            xOffset: 10,
            yOffset: 10,
            borderStyle: {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 20
            },
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },
            format: {
              display: false,
              decollate: true,
              decimal: 2,
              round: false,
              percentage: false,
              negativeing: 'minus'
            }
          }
        }
      ],
      markPointSeries: [
        {
          pointType: 'max',
          pointstyle: 'system',
          // system
          pointIcon: 'pin',
          syncColor: true,
          color: c,
          opacity: 100,
          borderStyle: { backgroundColor: 'red', borderColor: 'red', borderWidth: 1, borderRadius: 20 },
          shadow: {
            shadowBlur: 10,
            shadowColor: '#00faa7',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          // custom
          imgUrl: '',
          size: {
            width: 50,
            height: 50
          },
          symbolRotate: 0,
          pointLabel: {
            display: true,
            position: 'inside',
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#ff2020',
            fontWeight: 'normal',
            xOffset: 0,
            yOffset: 0,
            borderStyle: {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              borderWidth: 0,
              borderRadius: 20
            },
            shadow: {
              shadowBlur: 0,
              shadowColor: 'rgba(0,0,0,0)',
              shadowOffsetX: 0,
              shadowOffsetY: 0
            },
            format: {
              display: false,
              decollate: true,
              decimal: 2,
              round: false,
              percentage: false,
              negativeing: 'minus'
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
          offsetType: 'normal',
          xPosition: 0,
          yPosition: 0,
          margin: {
            t: 5,
            r: 7,
            b: 5,
            l: 7
          }
        },
        tipStyle: {
          textStyle: {
            color: 'rgba(255,255,255,1)',
            fontFamily: 'PingFangSC-Regular',
            fontSize: 13,
            fontWeight: 'normal',
            fontStyle: 'normal'
          },
          bgStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(204,204,204,1)',
            borderWidth: 0,
            borderRadius: 0,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            className: ''
          }
        }
      },
      tipSuffixConfig: {
        display: false,
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
      x: 12,
      y: 78,
      value: 8,
      series: '系列一'
    },
    {
      x: 8,
      y: 50,
      value: 16,
      series: '系列一'
    },
    {
      x: 10,
      y: 10,
      value: 12,
      series: '系列一'
    },
    {
      x: 35,
      y: 80,
      value: 20,
      series: '系列一'
    },
    {
      x: 37,
      y: 25,
      value: 12,
      series: '系列一'
    },
    {
      x: 52,
      y: 72,
      value: 12,
      series: '系列一'
    },
    {
      x: 62,
      y: 38,
      value: 30,
      series: '系列一'
    },
    {
      x: 70,
      y: 21,
      value: 28,
      series: '系列一'
    },
    {
      x: 82,
      y: 47,
      value: 30,
      series: '系列一'
    },
    {
      x: 91,
      y: 21,
      value: 18,
      series: '系列一'
    },
    {
      x: 14,
      y: 10,
      value: 24,
      series: '系列二'
    },
    {
      x: 16,
      y: 12,
      value: 12,
      series: '系列二'
    },
    {
      x: 20,
      y: 70,
      value: 38,
      series: '系列二'
    },
    {
      x: 30,
      y: 29,
      value: 30,
      series: '系列二'
    },
    {
      x: 37,
      y: 64,
      value: 16,
      series: '系列二'
    },
    {
      x: 48,
      y: 52,
      value: 34,
      series: '系列二'
    },
    {
      x: 51,
      y: 54,
      value: 8,
      series: '系列二'
    },
    {
      x: 57,
      y: 98,
      value: 4,
      series: '系列二'
    },
    {
      x: 65,
      y: 74,
      value: 8,
      series: '系列二'
    },
    {
      x: 78,
      y: 50,
      value: 20,
      series: '系列二'
    }
  ]

  return (
    <div style={{ width: 600, height: 400 }}>
      <LczBasicBubble {...config} w={600} h={400} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
