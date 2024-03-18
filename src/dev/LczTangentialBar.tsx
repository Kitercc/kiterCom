import React, { memo, useState } from 'react'
import { LczChart } from '../'
import { LczTangentialBarProps } from '../LczChart/LczChartBar/LczTangentialBar/type'

const LczTangentialBar = LczChart.LczChartBar.LczTangentialBar

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
  single: 'rgba(61, 13, 252,1)',
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

export const T_LczTangentialBar = memo(function T_Lcz3dTorus() {
  const config: LczTangentialBarProps = {
    globalConfig: {
      margin: {
        x: 40,
        y: 50
      },
      backgroundColor: 'black',
      titleConfig: {
        display: false,
        content: {
          value: '你真帅'
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: {
            value: '你想干啥'
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
      poleConfig: {
        pillarStyle: {
          roundCap: true,
          outRadius: 69,
          inRadius: 10,
          bargap: 50,
          barCategoryGap: 40
        },
        pillarBgStyle: {
          display: false,
          color: 'rgba(180,180,180,1)',
          opacity: 20
        }
      },
      valueLabel: {
        display: true,
        valueStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'black',
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
        clickInt: {
          clicked: true,
          disableStyles: 'yellow'
        },
        size: { w: 20, h: 20 },
        iconConfig: {
          iconType: 'system', // "system" | "custom"
          systemStyle: 'roundRect', // "none" | "circle" | "rect" | "roundRect" | "triangle" | "diamond" | "pin" | "arrow"
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        seriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          color: '#189cda',
          fontWeight: 'normal',
          charNums: null
        },
        proportion: {
          display: true,
          decimal: 0,
          legendProportionColorFollow: false,
          speed: 2,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#ff5709',
          fontWeight: 'normal',
          charNums: null
        },
        trueValue: {
          display: true,
          speed: 8,
          legendTrueColorFollow: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 13,
          color: '#15ff00',
          fontWeight: 'normal',
          charNums: null,
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false,
            percentage: false,
            negativeing: 'minus'
          },
          prefix: {
            display: true,
            content: 'prefix',
            xOffset: 9,
            yOffset: 0,
            prefixColorFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#086f9e',
            fontWeight: 'normal'
          },
          suffix: {
            display: true,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            suffixColorFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#71e624',
            fontWeight: 'normal'
          }
        },
        layout: {
          distributionMode: 'unilateral', //"unilateral" | "bothSides"
          itemGap: 20,
          orient: 'vertical', //"horizontal" | "vertical"
          xPosition: 'left',
          yPosition: 'bottom',
          xOffset: 20,
          yOffset: 0,
          layoutmode: 'topbottom'
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
    polarAxisConfig: {
      radialAxis: {
        display: true,
        axisLabel: {
          display: true,
          spaceType: 'auto', //"auto" | "showAll" | "none"
          space: 0,
          textRotate: 0,

          axisStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'yellow',
            fontWeight: 'normal',
            width: null,
            overflow: 'breakAll',
            showType: 'actualLength',
            charNumber: 2,
            padding: 12
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
          content: 'zhe',
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
          display: true,
          lineStyle: {
            symbol: 'none', //"none" | "unilateral" | "bothEnds"
            symbolW: 10,
            symbolH: 15,
            color: '#D8E0E9',
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
            width: 4,
            length: 10
          },
          tickShadow: {
            shadowBlur: 2,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        axisSplitLine: {
          display: true,
          splitLineStyle: {
            lineType: 'solid',
            color: 'rgba(0,0,0,1)',
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
            colorSeries: [{ value: 'rgba(250,250,250,1)' }, { value: 'rgba(200,200,200,1)' }],
            opacity: 30
          },
          splitAreaShadow: { shadowBlur: 2, shadowColor: 'rgba(255,0,0,1)', shadowOffsetX: 0, shadowOffsetY: 0 }
        }
      },
      angleAxis: {
        display: true,
        yaxisLabel: {
          display: true,
          startAngle: 90,
          clockwise: true,
          min: null,
          max: null,
          splitAuto: true,
          splitNumber: 10,
          suffixConfig: {
            content: ''
          },
          yLabelStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: 'rgba(255,255,255,1)',
            fontWeight: 'normal',
            showWidth: 1,
            overflow: 'breakAll',
            showType: 'outOfCharacter',
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
            decimal: 0,
            round: true,
            percentage: false
          }
        },
        axisLine: {
          display: true,
          lineStyle: {
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
            width: 3,
            length: 10,
            inside: 'out' // in out
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
            color: 'yellow',
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
            colorSeries: [{ value: 'rgba(250,250,250,1)' }, { value: 'rgba(200,200,200,1)' }],
            opacity: 30
          },
          splitAreaShadow: { shadowBlur: 2, shadowColor: 'blue', shadowOffsetX: 0, shadowOffsetY: 0 }
        }
      }
    },
    seriesConfig: {
      dataSeries: [
        {
          map: {
            fieldName: '系列一',
            displayName: 'dd'
          },
          color: c3,
          pillarType: { display: true, roundCap: true }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c2,
          pillarType: { display: false, roundCap: true }
        }
      ]
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
        type: 'shadow' //"line" | "shadow" | "none" | "cross"
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
      category: 'aaa',
      categoryTitle: '',
      value: 10,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: 'bbb',
      categoryTitle: '',
      value: 20,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: 'aaa',
      categoryTitle: '',
      value: 30,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: 'bbb',
      categoryTitle: '',
      value: 40,
      series: '系列二',
      seriesTitle: ''
    }
    // {
    //   category: 'e',
    //   categoryTitle: '',
    //   value: 64,
    //   series: '系列三',
    //   seriesTitle: ''
    // },
    // {
    //   category: 'f',
    //   categoryTitle: '',
    //   value: 82,
    //   series: '系列三',
    //   seriesTitle: ''
    // },
    // {
    //   category: 'g',
    //   categoryTitle: '',
    //   value: 95,
    //   series: '系列四',
    //   seriesTitle: ''
    // },
    // {
    //   category: 'h',
    //   categoryTitle: '',
    //   value: 190,
    //   series: '系列四',
    //   seriesTitle: ''
    // }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 900, height: 600, margin: ' 0 auto' }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && <LczTangentialBar w={800} h={600} {...config} data={data} onClick={a => console.log(a)} />}
    </div>
  )
})
