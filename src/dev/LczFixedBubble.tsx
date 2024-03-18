import React, { memo } from 'react'
import { LczChart } from '../'
import { FixedBubbleProps } from '../LczChart/LczChartScatter/LczFixedBubble/type'

const LczFixedBubble = LczChart.LczChartScatter.LczFixedBubble

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
  selected: 'gradient',
  single: '#efff16',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#35a718'
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
export const T_LczFixedBubble = memo(function T_LczFixedBubble() {
  const config: FixedBubbleProps = {
    globalConfig: {
      margin: {
        t: 10,
        b: 10,
        l: 10,
        r: 10
      },
      bgColor: 'rgba(0,0,0,1)',
      titleConfig: {
        display: true,
        content: {
          value: 'TITLE'
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: '#2420f1',
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
        xPosition: 'left', //"left" | "right" | "center" | "auto"
        yPosition: 'top', //"center" | "auto" | "top" | "bottom"
        xOffset: 0,
        yOffset: 0
      },
      bubbleSize: {
        max: 100,
        min: 50
      },
      bubbleValueLabel: {
        display: true,
        distribution: 'vertical', //'vertical' | 'horizontal'
        position: 'inside', //'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
        normalSeriesName: {
          display: true,
          xOffset: 0,
          yOffset: 0,
          textStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: {
              max: 16,
              min: 12
            },
            color: '#fcf8fa',
            fontWeight: 'normal'
          }
        },
        normalValue: {
          display: true,
          xOffset: 0,
          yOffset: 0,
          valueDisplay: 'true', // 'proportion' | 'true'
          textStyle: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: {
              max: 16,
              min: 12
            },
            color: '#1d11cc',
            fontWeight: 'normal'
          },
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false
          },
          suffix: {
            display: true,
            content: 'ww',
            xOffset: 0,
            yOffset: 0,
            suffixNoramlStyleFollow: true,
            suffixStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: {
                max: 16,
                min: 12
              },
              color: '#20f166',
              fontWeight: 'normal'
            }
          }
        }
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
          showWidth: 20,
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
        display: true,
        layOut: {
          orient: 'horizontal', //"horizontal" | "vertical"
          toolBoxPosition: {
            toolxPosition: 'right', //"left" | "right" | "center" | "auto"
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
      focusAnimate: {
        focusA: false,
        interval: 2
      },
      dataAnimate: true
    },
    seriesConfig: {
      dataSeries: [
        {
          map: {
            fieldName: '系列一',
            displayName: 'aa'
          },
          bubbleStyle: {
            color: c2,
            border: {
              display: true,
              borderColor: '#b96708',
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
            fieldName: '系列一',
            displayName: 'cc'
          },
          bubbleStyle: {
            color: c3,
            border: {
              display: true,
              borderColor: '#d31212',
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
        display: true,
        scale: true,
        focus: 'none', //"none" | "self" | "series"
        highlightStyle: {
          color: c,
          border: {
            display: false,
            borderColor: '#df2333',
            borderWidth: 3,
            borderType: 'solid'
          },
          shadow: {
            shadowColor: 'rgba(0,0,0,0)',
            shadowBlur: 0,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        highlightValueLabel: {
          display: true,
          styleSync: false,
          distribution: 'horizontal', //'vertical' | 'horizontal'
          position: 'inside', //'top' | 'left' | 'right' | 'bottom' | 'inside' | 'middle'
          highlightSeriesName: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            textStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: 18,
              color: '#20f166',
              fontWeight: 'normal'
            }
          },
          highlightValue: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            textStyle: {
              fontFamily: 'PingFangSC-Regular',
              fontSize: 18,
              color: '#e71717',
              fontWeight: 'normal'
            },
            numberformat: {
              display: true,
              decollate: true,
              decimal: 2,
              round: false,
              percentage: false
            },
            suffix: {
              display: false,
              content: 'qq',
              xOffset: 0,
              yOffset: 0,
              suffixHighlightStyleFollow: true,
              suffixStyle: {
                fontFamily: 'PingFangSC-Regular',
                fontSize: 18,
                color: '#1815b9',
                fontWeight: 'normal'
              }
            }
          }
        }
      }
    },
    layoutConfig: {
      randomLayout: false,
      customLayout: [
        {
          bubbleName: '餐饮',
          bubbleOffset: {
            xOffset: 0,
            yOffset: 0
          }
        },
        {
          bubbleName: '餐饮',
          bubbleOffset: {
            xOffset: 71,
            yOffset: 81
          }
        },
        {
          bubbleName: '教育',
          bubbleOffset: {
            xOffset: 71,
            yOffset: 31
          }
        },
        {
          bubbleName: '金融',
          bubbleOffset: {
            xOffset: 57,
            yOffset: 49
          }
        }
      ]
    },
    tooltipConfig: {
      hoverTrigger: {
        display: true,
        alwaysShowContent: true
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
            fontSize: 18,
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
      tipSuffixConfig: {
        display: true,
        content: '你真帅',
        gap: 20,
        yOffset: 0,
        tipTextStyle: {
          tipSuffixStyleAsync: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 13,
          color: '#D5E9FF',
          fontWeight: 'normal',
          fontStyle: 'normal' //italic normal
        },
        tipSuffixSeries: [{ fieldName: '', content: '这是系列一' }]
      }
    }
  }

  const data = [
    {
      category: '餐饮',
      categoryTitle: '1',
      value: 6.27,
      series: '',
      seriesTitle: ''
    },
    {
      category: '教育',
      categoryTitle: '',
      value: 5.76,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: '金融',
      categoryTitle: '',
      value: 7.84,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '地产',
      categoryTitle: '',
      value: 4.76,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: '娱乐',
      categoryTitle: '',
      value: 5.03,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '互联网',
      categoryTitle: '',
      value: 9.59,
      series: '系列二',
      seriesTitle: ''
    },
    {
      category: '医疗',
      categoryTitle: '',
      value: 6.03,
      series: '系列一',
      seriesTitle: ''
    },
    {
      category: '制造业',
      categoryTitle: '',
      value: 5.84,
      series: '系列二',
      seriesTitle: ''
    }
  ]

  const a = [900, 500]
  return (
    <div style={{ width: a[0], height: a[1], margin: ' 0 auto' }}>
      <LczFixedBubble {...config} w={a[0]} h={a[1]} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
