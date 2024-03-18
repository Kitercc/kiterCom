import React, { memo, useState } from 'react'
import { LczChart } from '../'
import { LineBarProps } from '../LczChart/LczChartBlend/LczBasicLineBar/type'

const LczBasicLineBar = LczChart.LczChartBlend.LczBasicLineBar

export const T_LczBasicLineBar = memo(function T_Lcz3dTorus() {
  const c = {
    selected: 'single',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: '#3dfc93'
        }
      ]
    }
  }

  const c2 = {
    selected: 'single',
    single: '#3dfcc3',
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

  const config: LineBarProps = {
    globalConfig: {
      margin: { t: 42, r: 25, b: 20, l: 25 },
      bgColor: 'rgba(0,0,0,0)',
      lineStyle: {
        type: 'solid', // solid dotted dashed
        lineWidth: 2,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 100,
        smooth: true,
        connectNulls: false
      },
      barStyle: {
        barType: 'bullet',
        radius: {
          lt: 10,
          rt: 15,
          lb: 20,
          rb: 30
        },
        bargap: 60,
        barCategoryGap: 60,
        barBgConfig: {
          display: true,
          color: '#B4B4B4',
          opacity: 20,
          syncRadius: true,
          radius: {
            lt: 0,
            rt: 0,
            lb: 0,
            rb: 0
          }
        }
      },
      titleConfig: {
        display: true,
        content: { value: 'TITLE' },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: { value: 'SUB' },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        },
        speed: 10,
        xPosition: 'left',
        yPosition: 'top',
        xOffset: 0,
        yOffset: 0
      },
      legendConfig: {
        display: true,
        seriesName: {
          display: true,
          legendSeriesColorFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#FFFFFF',
          fontWeight: 'normal',
          showWidth: 30,
          overflow: 'breakAll'
        },
        iconConfig: {
          legendType: 'custom', //"custom" | "normal"
          iconType: 'svg', // "svg" | "custom" | "system"
          systemStyle: 'rect', //"circle" | "rect" | "roundRect" | "triangle" | "diamond" | "pin" | "arrow" | "none" | "ring" | "star"
          customUrl: '',
          svgPath:
            'M864 256H160a64 64 0 0 1 64-64h139.52l33.28-40.576A64 64 0 0 1 446.272 128h131.456a64 64 0 0 1 49.472 23.424L660.48 192H800a64 64 0 0 1 64 64zM230.4 320l51.84 489.92A95.808 95.808 0 0 0 377.6 896h268.8a95.808 95.808 0 0 0 95.36-86.08L793.28 320z m372.16 333.12a33.344 33.344 0 0 1 9.28 22.72 31.68 31.68 0 0 1-32 32 33.344 33.344 0 0 1-22.72-9.28L512 653.44l-45.12 45.12a33.344 33.344 0 0 1-22.72 9.28 31.68 31.68 0 0 1-32-32 33.344 33.344 0 0 1 9.28-22.72L466.56 608l-45.12-45.12a33.344 33.344 0 0 1-9.28-22.72 32.768 32.768 0 0 1 9.28-22.72 32.256 32.256 0 0 1 45.44 0L512 562.56l45.12-45.12a32.256 32.256 0 0 1 45.44 0 32.768 32.768 0 0 1 9.28 22.72 33.344 33.344 0 0 1-9.28 22.72L557.44 608z'
        },
        size: { w: 10, h: 10 },
        spacing: 5,
        layout: {
          distributionMode: 'unilateral',
          itemGap: 20,
          layoutmode: 'leftright',
          orient: 'horizontal',
          xPosition: 'center',
          yPosition: 'top',
          xOffset: 0,
          yOffset: 0
        },
        clickInt: { clicked: true, disableStyles: '#ccc' }
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
      dataAnimate: true
    },
    axisConfig: {
      xAxis: {
        display: true,
        axisLabel: {
          display: true,
          labelType: 'category', // category time

          time: 'YYYY年MM月',
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
          display: true,
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
      secondYAxis: {
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
            overflow: 'none',

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
          content: '%',
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
          display: true,
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
            displayName: '',
            fieldName: ''
          },
          color: c,
          chartType: 'bar',
          valueAxis: '0',
          lineStyle: {
            display: true,
            type: 'solid', // solid dotted dashed
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 100,
            smooth: false,
            connectNulls: false
          },
          barStyle: {
            display: true,
            barType: 'bullet',
            radius: {
              lt: 0,
              rt: 0,
              lb: 0,
              rb: 0
            },
            bargap: 20,
            barCategoryGap: 70,
            barBgConfig: {
              display: true,
              color: '#B4B4B4',
              opacity: 20,
              syncRadius: true,
              radius: {
                lt: 0,
                rt: 0,
                lb: 0,
                rb: 0
              }
            }
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
          }
        },
        {
          map: {
            displayName: '',
            fieldName: ''
          },
          color: c2,
          chartType: 'line',
          valueAxis: '1',
          lineStyle: {
            display: true,
            type: 'solid', // solid dotted dashed
            lineWidth: 2,
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 100,
            smooth: false,
            connectNulls: true
          },
          barStyle: {
            display: true,
            barType: 'square',
            radius: {
              lt: 0,
              rt: 0,
              lb: 0,
              rb: 0
            },
            bargap: 20,
            barCategoryGap: 30,
            barBgConfig: {
              display: false,
              color: '#B4B4B4',
              opacity: 20,
              syncRadius: true,
              radius: {
                lt: 0,
                rt: 0,
                lb: 0,
                rb: 0
              }
            }
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
            syncColor: false,
            borderColor: '#00B2FF',
            lineWidth: 0,
            color: 'rgba(255,255,155,1)',
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            //custom
            img: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
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
          }
        }
      ],
      markSeries: [],
      markPointSeries: []
    },
    tooltipConfig: {
      autoPlay: { display: false, interval: 3 },
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
      indicator: {
        type: 'shadow',
        snap: true
      }
    }
  }

  const data = [
    {
      category: '2022-01',
      categoryTitle: '',
      value: 40,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-01',
      categoryTitle: '',
      value: 60,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-01',
      categoryTitle: '',
      value: 60,
      series: '出生率',
      seriesTitle: ''
    },
    {
      category: '2022-02',
      categoryTitle: '',
      value: 78,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-02',
      categoryTitle: '',
      value: 90,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-02',
      categoryTitle: '',
      value: 90,
      series: '出生率',
      seriesTitle: ''
    },
    {
      category: '2022-03',
      categoryTitle: '',
      value: 60,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-03',
      categoryTitle: '',
      value: 80,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-03',
      categoryTitle: '',
      value: 80,
      series: '出生率',
      seriesTitle: ''
    },
    {
      category: '2022-04',
      categoryTitle: '',
      value: 80,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-04',
      categoryTitle: '',
      value: 64,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-04',
      categoryTitle: '',
      value: 64,
      series: '出生率',
      seriesTitle: ''
    },
    {
      category: '2022-05',
      categoryTitle: '',
      value: 85,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-05',
      categoryTitle: '',
      value: 59,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-05',
      categoryTitle: '',
      value: 59,
      series: '出生率',
      seriesTitle: ''
    },
    {
      category: '2022-06',
      categoryTitle: '',
      value: 50,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2022-06',
      categoryTitle: '',
      value: 75,
      series: '增长率',
      seriesTitle: ''
    },
    {
      category: '2022-06',
      categoryTitle: '',
      value: 75,
      series: '出生率',
      seriesTitle: ''
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 900, height: 600 }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && <LczBasicLineBar w={900} h={600} {...config} data={data} onClick={a => console.log(1111, a)} />}
    </div>
  )
})
