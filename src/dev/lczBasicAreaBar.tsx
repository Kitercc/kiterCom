import React, { memo } from 'react'
import { LczChart } from '../'
import { LineBarProps } from '../LczChart/LczChartBlend/LczBasicLineBar/type'

const LczBasicAreaBar = LczChart.LczChartBlend.LczBasicAreaBar

export const T_lczBasicAreaBar = memo(function T_lczBasicAreaBar() {
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
    single: '#a8ff37',
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
    single: '#ff70f8',
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

  const config: LineBarProps = {
    globalConfig: {
      margin: { t: 45, r: 25, b: 20, l: 25 },
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
      areaStyle: {
        startOrigin: 'start',
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 20
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
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          legendSeriesColorFollow: true,
          color: '#FFFFFF',
          fontWeight: 'normal',
          showWidth: 30,
          overflow: 'breakAll'
        },
        iconConfig: {
          legendType: 'custom',
          iconType: 'system',
          systemStyle: 'ring',
          customUrl: '',
          svgPath:
            'M29.902,23.275c1.86,0,3.368-1.506,3.368-3.365c0-1.859-1.508-3.365-3.368-3.365 c-1.857,0-3.365,1.506-3.365,3.365C26.537,21.769,28.045,23.275,29.902,23.275z M36.867,30.74c-1.666-0.467-3.799-1.6-4.732-4.199 c-0.932-2.6-3.131-2.998-4.797-2.998s-7.098,3.894-7.098,3.894c-1.133,1.001-2.1,6.502-0.967,6.769 c1.133,0.269,1.266-1.533,1.934-3.599c0.666-2.065,3.797-3.466,3.797-3.466s0.201,2.467-0.398,3.866 c-0.599,1.399-1.133,2.866-1.467,6.198s-1.6,3.665-3.799,6.266c-2.199,2.598-0.6,3.797,0.398,3.664 c1.002-0.133,5.865-5.598,6.398-6.998c0.533-1.397,0.668-3.732,0.668-3.732s0,0,2.199,1.867c2.199,1.865,2.332,4.6,2.998,7.73 s2.332,0.934,2.332-0.467c0-1.401,0.269-5.465-1-7.064c-1.265-1.6-3.73-3.465-3.73-5.265s1.199-3.732,1.199-3.732 c0.332,1.667,3.335,3.065,5.599,3.399C38.668,33.206,38.533,31.207,36.867,30.74z'
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
            overflow: 'none',
            showType: 'outOfCharacter',
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
            overflow: 'none',
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
            displayName: '系列一',
            fieldName: ''
          },
          color: c2,
          chartType: 'area',
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
          areaStyle: {
            display: false,
            areaSyncColor: true,
            color: c3,
            startOrigin: 'start',
            shadowBlur: 0,
            shadowColor: 'rgba(255,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 60
          },
          dataMarker: {
            display: false,
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
        },
        {
          map: {
            displayName: '',
            fieldName: ''
          },
          color: c3,
          chartType: 'bar',
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
      category: '2022-01',
      categoryTitle: '',
      value: 60,
      series: '出生率1',
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
      category: '2022-02',
      categoryTitle: '',
      value: 90,
      series: '出生率1',
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
      category: '2022-03',
      categoryTitle: '',
      value: 80,
      series: '出生率1',
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
      category: '2022-04',
      categoryTitle: '',
      value: 64,
      series: '出生率1',
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
      category: '2022-05',
      categoryTitle: '',
      value: 59,
      series: '出生率1',
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
    },
    {
      category: '2022-06',
      categoryTitle: '',
      value: 75,
      series: '出生率1',
      seriesTitle: ''
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczBasicAreaBar w={900} h={600} {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
