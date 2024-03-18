import React, { memo, useState } from 'react'
import { LczChart } from '../'
import { RadialPoleProps } from '../LczChart/LczChartBar/LczRadialPole/type'

const LczRadialPole = LczChart.LczChartBar.LczRadialPole

const c = {
  selected: 'gradient',
  single: 'rgba(61, 153, 252,1)',
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
export const T_LczRadialPole = memo(function T_LczRadialPole() {
  const config: RadialPoleProps = {
    globalConfig: {
      margin: {
        x: 50,
        y: 50
      },
      backgroundColor: 'black',
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
          display: true,
          content: {
            value: ''
          },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'red',
          fontWeight: 'normal'
        },
        speed: 10,
        xPosition: 'left',
        yPosition: 'top',
        xOffset: 0,
        yOffset: 0
      },
      singleSeries: false,
      poleConfig: {
        columnStyle: {
          outRadius: 80,
          inRadius: 20,
          bargap: 50,
          barCategoryGap: 40
        },
        columnBg: {
          display: true,
          color: '#B4B4B4',
          opacity: 20
        }
      },
      valueLabel: {
        display: true,
        valueStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'pink',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0,
          format: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: false
          }
        },
        position: 'middle' //'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
      },
      legendConfig: {
        display: true,
        layout: {
          xPosition: 'right',
          itemGap: 20,
          yOffset: 0,
          xOffset: 298,
          orient: 'vertical',
          layoutmode: 'leftright',
          yPosition: 'center',
          distributionMode: 'unilateral'
        },
        clickInt: {
          disableStyles: 'rgba(191,33,33,1.00)',
          clicked: true
        },
        iconConfig: {
          customUrl: '',
          systemStyle: 'rect',
          iconType: 'system'
        },
        size: {
          w: 12,
          h: 12
        },
        proportion: {
          legendProportionColorFollow: true,
          fontFamily: 'PingFangSC-Regular',
          color: 'rgba(255,255,255,1)',
          display: true,
          fontSize: 13,
          decimal: 1,
          speed: 8,
          fontWeight: 'normal',
          charNums: null
        },
        seriesName: {
          fontFamily: 'PingFangSC-Regular',
          color: 'rgba(255,255,255,1)',
          display: true,
          fontSize: 13,
          fontWeight: 'normal',
          charNums: null
        },
        trueValue: {
          fontFamily: 'PingFangSC-Regular',
          color: 'rgba(255,255,255,1)',
          legendTrueColorFollow: true,
          charNums: null,
          prefix: {
            yOffset: 0,
            xOffset: 0,
            fontFamily: 'PingFangSC-Regular',
            color: 'rgba(255,255,255,1)',
            display: false,
            prefixColorFollow: true,
            fontSize: 13,
            content: '',
            fontWeight: 'normal'
          },
          display: true,
          fontSize: 13,
          suffix: {
            suffixColorFollow: true,
            yOffset: 0,
            xOffset: 0,
            fontFamily: 'PingFangSC-Regular',
            color: 'rgba(255,255,255,1)',
            display: false,
            fontSize: 13,
            content: '',
            fontWeight: 'normal'
          },
          speed: 8,
          fontWeight: 'normal',
          numberformat: {
            round: true,
            display: false,
            negativeing: 'minus',
            decollate: true,
            decimal: 0
          }
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
    radialPolarAxisConfig: {
      radialAxis: {
        display: true,
        yaxisLabel: {
          display: true,
          min: null,
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
            charNumber: 3,
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
            percentage: true
          }
        },
        axisUnit: {
          display: false,
          content: '1',
          nameLocation: 'end',
          unitStyle: {
            nameRotate: 0,
            fontFamily: 'PingFangSC-Regular',
            fontSize: 18,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            backgroundColor: 'pink',
            borderColor: 'rgba(0,0,0,0)',
            borderWidth: 8,
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
            symbol: 'bothEnds',
            symbolW: 10,
            symbolH: 15,
            color: '#ffffff45',
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
            width: 1,
            length: 10,
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
            lineType: 'dashed',
            color: 'rgba(255,0,0,1)',
            opacity: 100,
            width: 3
          },
          splitLineShadow: {
            shadowBlur: 10,
            shadowColor: '#350af5',
            shadowOffsetX: 10,
            shadowOffsetY: 10
          }
        },
        axisSplitArea: {
          display: true,
          splitAreaStyle: {
            colorSeries: [{ value: '#cc1c1c' }, { value: '#83f11c' }],
            opacity: 10
          },
          splitAreaShadow: { shadowBlur: 0, shadowColor: 'blue', shadowOffsetX: 0, shadowOffsetY: 0 }
        }
      },
      angleAxis: {
        display: true,
        axisLabel: {
          display: true,
          startAngle: 90,
          clockwise: false,
          spaceType: 'showAll', //"auto" | "showAll" | "none"
          space: 2,
          axisStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 13,
            color: 'yellow',
            fontWeight: 'normal',
            width: null,
            overflow: 'breakAll',
            showType: 'outOfCharacter',
            charNumber: 3,
            padding: 12
          },
          axisBgStyle: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: '#ff00000',
            borderWidth: 0,
            borderRadius: 2
          },
          axisLabelShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 10,
            shadowOffsetY: 10
          }
        },
        axisLine: {
          display: true,
          lineStyle: {
            symbol: 'bothEnds', //"none" | "unilateral" | "bothEnds"
            symbolW: 10,
            symbolH: 15,
            color: '#ff6c28',
            opacity: 100,
            width: 2
          },
          lineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(255,0,0,0)',
            shadowOffsetX: 10,
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
            inside: 'in'
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
            lineType: 'dashed',
            color: '#d1ff0253',
            opacity: 100,
            width: 1
          },
          splitLineShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisSplitArea: {
          display: true,
          splitAreaStyle: {
            colorSeries: [{ value: '#88f1ff' }, { value: '#bd2121' }],
            opacity: 30
          },
          splitAreaShadow: { shadowBlur: 0, shadowColor: '#ff00000', shadowOffsetX: 0, shadowOffsetY: 0 }
        }
      }
    },
    seriesConfig: {
      signSeries: {
        name: '单系列名字',
        dataSeries: [
          { map: { fieldName: 'a', displayName: 'ff' }, color: c },
          { map: { fieldName: '', displayName: '' }, color: c2 }
        ]
      },
      multiSeries: {
        dataSeries: [
          { map: { fieldName: '', displayName: '' }, color: c },
          { map: { fieldName: '', displayName: '' }, color: c2 }
        ]
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
          offsetType: 'normal', //"normal" | "custom"
          xPosition: 50,
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
            color: 'blue',
            fontFamily: 'PingFangSC-Regular',
            fontSize: 13,
            fontWeight: 'normal',
            fontStyle: 'normal'
          },
          bgStyle: {
            backgroundColor: 'pink',
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
        type: 'cross' //"line" | "shadow" | "none" | "cross"
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
      category: 'aaaaa',
      categoryTitle: '',
      value: 22.8,
      series: '系列一',
      seriesTitle: '系列一1212'
    },
    {
      category: 'eeeee',
      categoryTitle: '',
      value: 24.8,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: 'bbbbb',
      categoryTitle: '',
      value: 42.2,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: 'ccccc',
      categoryTitle: '',
      value: 12.4,
      series: '',
      seriesTitle: ''
    },
    {
      category: 'ddddd',
      categoryTitle: '',
      value: 50.6,
      series: '',
      seriesTitle: ''
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 600, height: 400 }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && <LczRadialPole {...config} w={600} h={400} data={data} onClick={a => console.log(a)} />}
    </div>
  )
})
