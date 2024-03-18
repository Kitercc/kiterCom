import React, { memo } from 'react'
import { LczChart } from '../'
import { BasicStereohistogram } from '../LczChart/LczChartBar/LczBasicStereohistogram/type'

const LczStackStereohistogram = LczChart.LczChartBar.LczStackStereohistogram

export const T_LczStackStereohistogram = memo(function T_LczBasicStereohistogram() {
  const config: BasicStereohistogram = {
    globalConfig: {
      margin: {
        t: 45,
        b: 25,
        l: 25,
        r: 25
      },
      bgColor: 'rgba(0,0,0,0)',
      barStyle: {
        barType: 'cylinder', // "prism" | "cylinder"
        bargap: 20,
        barWidth: 24,
        barCategoryGap: 70,
        barBgColor: {
          display: false,
          color: 'rgba(180,180,180,1)',
          opacity: 20
        }
      },
      titleConfig: {
        display: false,
        content: {
          value: ''
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal',
        subTitle: {
          display: false,
          content: {
            value: ''
          },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal'
        },
        speed: 10,
        xPosition: 'left',
        yPosition: 'top',
        xOffset: 0,
        yOffset: 0
      },
      valueLabel: {
        display: false,
        valueStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0,
          rotate: 0,
          format: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: false
          }
        },
        position: 'top'
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
      toolbarConfig: {
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
          saveAsImage: true,
          restore: true,
          magicType: true
        }
      },
      dataAnimate: true
    },
    axisConfig: {
      xAxis: {
        display: true,
        axisLabel: {
          display: true,
          labelType: 'category',

          time: 'MM月',
          splitType: 'none',
          splitNumber: 6,
          leftMargin: 0,
          rightMargin: 0,
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
          display: true,
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
          minInterval: 1,
          max: null,
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
            decimal: 0,
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
          map: {
            fieldName: '',
            displayName: ''
          },
          color: {
            selected: 'single',
            single: '#60ee0e',
            gradient: {
              gradualAngle: 1,
              colors: [
                {
                  begins: 0,
                  value: '#0080B8'
                },
                {
                  begins: 100,
                  value: 'rgba(0, 128, 184,1)'
                }
              ]
            }
          },
          prismColor: [{ value: '#01407c' }, { value: 'rgba(0, 178, 255,1)' }],
          prismOpacity: 100,
          cylinderOpacity: 70,
          topAndBottom: {
            xOffset: -60,
            opacity: 100
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: {
            selected: 'single',
            single: '#df8b0d',
            gradient: {
              gradualAngle: 1,
              colors: [
                {
                  begins: 0,
                  value: '#00A2A0'
                },
                {
                  begins: 100,
                  value: 'rgba(0, 162, 160,0.5)'
                }
              ]
            }
          },
          prismColor: [{ value: '#00A2A0' }, { value: '#024469' }],
          prismOpacity: 100,
          cylinderOpacity: 70,
          topAndBottom: {
            xOffset: -160,
            opacity: 100
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: {
            selected: 'single',
            single: '#1613c7',
            gradient: {
              gradualAngle: 1,
              colors: [
                {
                  begins: 0,
                  value: '#00A2A0'
                },
                {
                  begins: 100,
                  value: 'rgba(0, 162, 160,0.5)'
                }
              ]
            }
          },
          prismColor: [{ value: '#00A2A0' }, { value: '#024469' }],
          prismOpacity: 100,
          cylinderOpacity: 70,
          topAndBottom: {
            xOffset: -260,
            opacity: 100
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: {
            selected: 'single',
            single: '#ff00b3',
            gradient: {
              gradualAngle: 1,
              colors: [
                {
                  begins: 0,
                  value: '#00A2A0'
                },
                {
                  begins: 100,
                  value: 'rgba(0, 162, 160,0.5)'
                }
              ]
            }
          },
          prismColor: [{ value: '#00A2A0' }, { value: '#024469' }],
          prismOpacity: 100,
          cylinderOpacity: 70,
          topAndBottom: {
            xOffset: 60,
            opacity: 100
          }
        }
      ],
      markSeries: [],
      markPointSeries: [],
      highlightSeries: {
        display: false,
        extremum: 'max',
        prismColor: [{ value: 'pink' }, { value: 'hotpink' }],
        color: {
          selected: 'gradient',
          single: 'rgba(255,255,255,1)',
          gradient: {
            gradualAngle: 1,
            colors: [
              {
                begins: 0,
                value: 'rgba(255,255,255,1)'
              },
              {
                begins: 50,
                value: 'rgba(248,231,28,1)'
              },
              {
                begins: 100,
                value: 'rgba(189,16,224,1)'
              }
            ]
          }
        }
      },
      stackSeries: [
        { stackName: 's', seriesName: '系列一,系列二' },
        { stackName: 's', seriesName: '系列二,系列三' },
        { stackName: '', seriesName: '系列四' }
      ]
    },
    tooltipConfig: {
      autoPlay: {
        display: false,
        interval: 3
      },
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
      indicator: {
        type: 'line',
        snap: false
      }
    }
  }

  const data = [
    {
      category: '01月',
      value: -30,
      series: '系列一',
      stack: '堆叠一'
    },
    {
      category: '01月',
      value: 90,
      series: '系列二',
      stack: '堆叠一'
    },
    {
      category: '01月',
      value: -20,
      series: '系列三',
      stack: '堆叠一'
    },
    {
      category: '01月',
      value: -20,
      series: '系列四',
      stack: '堆叠二'
    },
    {
      category: '02月',
      value: 40,
      series: '系列一',
      stack: '堆叠一'
    },
    {
      category: '02月',
      value: 12,
      series: '系列二',
      stack: '堆叠一'
    }
    // {
    //   category: '03月',
    //   value: 20,
    //   series: '系列一',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '03月',
    //   value: 30,
    //   series: '系列二',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '04月',
    //   value: 40,
    //   series: '系列一',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '04月',
    //   value: 23,
    //   series: '系列二',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '05月',
    //   value: 30,
    //   series: '系列一',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '05月',
    //   value: 55,
    //   series: '系列二',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '06月',
    //   value: 30,
    //   series: '系列一',
    //   stack: '堆叠一'
    // },
    // {
    //   category: '06月',
    //   value: 55,
    //   series: '系列二',
    //   stack: '堆叠一'
    // }
  ]

  return (
    <div style={{ width: 800, height: 600 }}>
      <LczStackStereohistogram w={800} h={600} {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
