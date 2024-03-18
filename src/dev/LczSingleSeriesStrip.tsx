import React, { memo } from 'react'
import { LczChart } from '..'
import { BasicStripProps } from '../LczChart/LczChartBar/LczBasicStrip/type'

const LczSingleSeriesStrip = LczChart.LczChartBar.LczSingleSeriesStrip

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
  selected: 'gradient',
  single: '#ff510d',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(255, 153, 252,1)'
      },
      {
        begins: 100,
        value: '#ad6405'
      }
    ]
  }
}

export const T_LczSingleSeriesStrip = memo(function T_LczSingleSeriesStrip() {
  const config: BasicStripProps = {
    globalConfig: {
      margin: {
        t: 45,
        b: 25,
        l: 25,
        r: 25
      },
      bgColor: 'rgba(0,0,0,0)',
      barStyle: {
        barType: 'bullet', // "square" | "bullet"
        barWidth: 18,
        fillet: { lt: 10, rt: 20, lb: 0, rb: 0 },

        barBgColor: {
          display: true,
          color: 'rgba(180,180,180,1)',
          opacity: 20,
          syncRadius: false,
          fillet: { lt: 0, rt: 0, lb: 0, rb: 0 }
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
        display: true,
        valueStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0,
          syncValueColor: true,
          rotate: 0,
          format: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: false
          }
        },
        position: 'fixedright'
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
      carouselAnimation: {
        display: false,
        showNumer: 3,
        updateNumber: 1,
        interval: 2,
        interactionMode: 'mouse' //'none' | 'click' | 'mouse'
      },
      dataAnimate: true
    },
    axisConfig: {
      xAxis: {
        display: true,
        axisLabel: {
          display: true,
          labelType: 'category',

          time: 'YYYY年MM月',
          splitType: 'none',
          splitNumber: 4,
          leftMargin: 10,
          rightMargin: 10,
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
            fieldName: '2021-01',
            displayName: '1212'
          },
          color: c2
        },
        {
          map: {
            fieldName: '',
            displayName: '1212'
          },
          color: c
        }
      ],
      markSeries: [],
      markPointSeries: [],
      highlightSeries: {
        display: false,
        extremum: 'min',
        color: c
      },
      decorateDisplay: false,
      decorate: {
        decIconConfig: {
          iconType: 'system',
          // system
          systemStyle: 'rect',
          // custom
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          // svg
          svgPath:
            'M864 256H160a64 64 0 0 1 64-64h139.52l33.28-40.576A64 64 0 0 1 446.272 128h131.456a64 64 0 0 1 49.472 23.424L660.48 192H800a64 64 0 0 1 64 64zM230.4 320l51.84 489.92A95.808 95.808 0 0 0 377.6 896h268.8a95.808 95.808 0 0 0 95.36-86.08L793.28 320z m372.16 333.12a33.344 33.344 0 0 1 9.28 22.72 31.68 31.68 0 0 1-32 32 33.344 33.344 0 0 1-22.72-9.28L512 653.44l-45.12 45.12a33.344 33.344 0 0 1-22.72 9.28 31.68 31.68 0 0 1-32-32 33.344 33.344 0 0 1 9.28-22.72L466.56 608l-45.12-45.12a33.344 33.344 0 0 1-9.28-22.72 32.768 32.768 0 0 1 9.28-22.72 32.256 32.256 0 0 1 45.44 0L512 562.56l45.12-45.12a32.256 32.256 0 0 1 45.44 0 32.768 32.768 0 0 1 9.28 22.72 33.344 33.344 0 0 1-9.28 22.72L557.44 608z'
        },
        iconSize: {
          width: 6,
          height: 18
        },
        position: {
          place: 'end',
          offset: 24
        }
      }
    },
    tooltipConfig: {
      autoPlay: {
        display: true,
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
      value: 18
    },

    {
      category: '2021-02',
      categoryTitle: '',
      value: 200
    },
    {
      category: '2021-03',
      categoryTitle: '',
      value: 180
    },
    {
      category: '2021-04',
      categoryTitle: '',
      value: 320
    },
    {
      category: '2021-05',
      categoryTitle: '',
      value: 120
    },
    {
      category: '2021-06',
      categoryTitle: '',
      value: 160
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczSingleSeriesStrip w={900} h={600} {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
