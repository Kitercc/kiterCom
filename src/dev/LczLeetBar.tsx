import React, { memo } from 'react'
import { LczChart } from '../'
import { LeetBarProps } from '../LczChart/LczChartBar/LczLeetBar/type'

const LczLeetBar = LczChart.LczChartBar.LczLeetBar

const c = {
  selected: 'gradient',
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
  single: '#136d4b',
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

export const T_LczLeetBar = memo(function T_LczLeetBar() {
  const config: LeetBarProps = {
    globalConfig: {
      margin: {
        t: 45,
        b: 25,
        l: 25,
        r: 25
      },
      bgColor: 'rgba(0,0,0,0)',
      globalBarStyle: {
        bargap: 24,
        barCategoryGap: 41,
        GlobalBarType: 'custom', //'system' | 'custom' | 'svg'
        systemStyle: 'circle', //'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
        customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        svgPath: '',

        symbolRepeat: true,
        symbolClip: true,
        symbolRotate: 0,
        barSize: {
          width: 20,
          height: null
        },
        barPosition: {
          xOffset: 0,
          yOffset: 0
        },
        opacity: 100
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
          fontFamily: 'Microsoft Yahei',
          fontSize: 18,
          color: '#FFFFFF',
          fontWeight: 'normal',
          showWidth: 30,
          overflow: 'breakAll'
        },
        iconConfig: {
          legendType: 'normal', // 'normal' | 'custom'
          iconType: 'system', //'system' | 'custom'
          systemStyle: 'star', //'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          svgPath: ''
        },
        size: { w: 20, h: 20 },
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
      dataSeries: [
        {
          map: {
            fieldName: '系列一',
            displayName: ''
          },
          color: c3,
          barStyle: {
            display: true,
            barType: 'system', //'system' | 'custom' | 'svg'
            systemStyle: 'star', //'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
            customUrl: '',
            svgPath: '',
            symbolRepeat: true,
            symbolClip: true,
            symbolRotate: 0,
            barSize: {
              width: null,
              height: 20
            },
            barPosition: {
              xOffset: 0,
              yOffset: 0
            },
            opacity: 100
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c2,
          barStyle: {
            display: false,
            barType: 'system', //'system' | 'custom' | 'svg'
            systemStyle: 'star', //'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none' | 'ring' | 'star'
            customUrl: '',
            svgPath: '',
            symbolRepeat: true,
            symbolClip: true,
            symbolRotate: 0,
            barSize: {
              width: null,
              height: 20
            },
            barPosition: {
              xOffset: 0,
              yOffset: 0
            },
            opacity: 100
          }
        }
      ],
      markSeries: [],
      markPointSeries: []
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
        type: 'shadow',
        snap: false
      }
    }
  }

  const data = [
    {
      category: '2021-01',
      categoryTitle: '',
      value: 180,
      series: '系列一',
      seriesTitle: '我真是是1'
    },
    {
      category: '2021-01',
      categoryTitle: 'sss',
      value: 320,
      series: '系列二',
      seriesTitle: '我是2'
    },
    {
      category: '2021-02',
      categoryTitle: '这是2',
      value: 200,
      series: '系列一',
      seriesTitle: '我是1'
    },
    {
      category: '2021-02',
      categoryTitle: '这是2',
      value: 120,
      series: '系列二',
      seriesTitle: '我是2'
    },
    {
      category: '2021-03',
      categoryTitle: '这是3',
      value: 160,
      series: '系列一',
      seriesTitle: '我是1'
    },
    {
      category: '2021-03',
      categoryTitle: '这是3',
      value: 180,
      series: '系列二',
      seriesTitle: '我是2'
    }
  ]

  return (
    <div style={{ width: 800, height: 600, margin: ' 0 auto' }}>
      <LczLeetBar w={800} h={600} {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
