import React, { memo, useState } from 'react'
import { LczChart } from '..'
import { BasicStripProps } from '../LczChart/LczChartBar/LczBasicStrip/type'

const LczBasicStrip = LczChart.LczChartBar.LczBasicStrip

const c2 = {
  selected: 'single',
  single: '#ff510d',
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
export const T_LczBasicStrip = memo(function T_LczBasicStrip() {
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
        bargap: 40,
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
          syncValueColor: true,
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
          systemStyle: 'ring',
          customUrl: '',
          svgPath:
            'M251.47883 73.145138c16.786214 4.8126 26.563119 22.195649 22.038956 38.993841l-0.141724 0.509005-22.127781 77.162293C324.043103 130.894347 415.213037 97.808967 511.566846 97.808967c228.75122 0 414.191033 185.439813 414.191033 414.191033s-185.439813 414.191033-414.191033 414.191033c-72.684039 0-142.704281-18.773333-204.527532-53.944639l-1.871345-1.070909 31.872748-55.354885C389.688889 846.135392 449.412242 862.315789 511.566846 862.315789c193.474121 0 350.315789-156.841669 350.315789-350.315789s-156.841669-350.315789-350.315789-350.315789c-85.998035 0-167.001825 31.096265-230.125536 86.17469l79.524678 22.80446c16.785216 4.8126 26.562121 22.195649 22.037957 38.99384l-0.141723 0.509006c-4.8126 16.786214-22.195649 26.562121-38.99384 22.038955l-0.509006-0.141723-153.502191-44.016032c-16.786214-4.8126-26.562121-22.195649-22.038955-38.99384l0.141723-0.509006L211.975984 95.04237c4.861505-16.955883 22.547961-26.759735 39.502846-21.897232z m4.706807 678.189412a352.489544 352.489544 0 0 0 47.744749 42.525941l1.517037 1.115821-37.704359 51.559298a416.334846 416.334846 0 0 1-56.857949-50.132086l-1.334394-1.419228 46.634916-43.649746z m-70.123041-110.657872a348.976405 348.976405 0 0 0 28.824702 57.014644l1.004039 1.59189-53.948631 34.200203a412.931493 412.931493 0 0 1-34.564492-67.520125l-0.720592-1.81246 59.404974-23.474152zM161.684211 512c0 21.532943 1.939212 42.802402 5.760748 63.637708l0.352312 1.892304-62.763415 11.869816c-4.670877-24.696764-7.098136-49.89954-7.219899-75.38676L97.808967 512h63.875244z m318.378167-193.621832c17.63855 0 31.937622 14.299072 31.937622 31.937621v160.68616h195.617934c17.63855 0 31.937622 14.299072 31.937622 31.937622 0 17.63855-14.299072 31.937622-31.937622 31.937622H489.044834c-22.59986 0-40.920078-18.320218-40.920078-40.920078V350.315789c0-17.63855 14.299072-31.937622 31.937622-31.937621z'
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
          disableStyles: 'red'
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
      carouselAnimation: {
        display: false,
        showNumer: 2,
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

          time: 'MM月',
          splitType: 'auto',
          splitNumber: 10,
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
            overflow: 'breakAll',
            showType: 'actualLength',
            charNumber: 3,
            width: 20,

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
            overflow: 'breakAll',
            showType: 'outOfCharacter',
            charNumber: 2,
            showWidth: 20,

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
          color: c2,
          barStyle: {
            display: true,
            barType: 'custom', // "square" | "bullet"
            fillet: { lt: 10, rt: 20, lb: 0, rb: 0 },

            barBgColor: {
              display: true,
              color: '#32e23b',
              opacity: 20,
              syncRadius: true,
              fillet: { lt: 0, rt: 0, lb: 0, rb: 0 }
            }
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c3
        }
      ],
      markSeries: [],
      markPointSeries: [],
      highlightSeries: {
        display: false,
        extremum: 'max',
        color: c4
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
      value: 18,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2021-01',
      categoryTitle: '',
      value: 320,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: '2021-02',
      categoryTitle: '',
      value: 200,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2021-02',
      categoryTitle: '',
      value: 120,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: '2021-03',
      categoryTitle: '',
      value: 160,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '2021-03',
      categoryTitle: '',
      value: 180,
      series: '系列二',
      seriesTitle: ''
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 900, height: 600, margin: ' 0 auto' }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && <LczBasicStrip w={900} h={600} {...config} data={data} onClick={a => console.log(a)} />}
    </div>
  )
})
