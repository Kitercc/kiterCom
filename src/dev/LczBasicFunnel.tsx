import React, { memo } from 'react'
import { LczChart } from '../'
import { LczBasicFunnelProps } from '../LczChart/LczChartOther/LczBasicFunnel/type'

const LczBasicFunnel = LczChart.LczChartOther.LczBasicFunnel

export const T_LczBasicFunnel = memo(function T_Lcz3dTorus() {
  const c = {
    selected: 'single',
    single: 'rgba(0,178,255,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(0,178,255,1)'
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
  const c4 = {
    selected: 'single',
    single: 'rgba(0,221,219,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgba(0,221,219,1)'
        }
      ]
    }
  }
  const c5 = {
    selected: 'single',
    single: 'rgba(255,242,107,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgba(255,242,107,1)'
        }
      ]
    }
  }

  const config: LczBasicFunnelProps = {
    globalConfig: {
      margin: {
        t: 48,
        r: 44,
        b: 40,
        l: 118
      },
      backgroundColor: 'black',
      sortConfig: 'descending', //descending | ascending //漏斗 金字塔
      titleConfig: {
        display: true,
        content: {
          value: '1212'
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: {
            value: '2323'
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
      labelConfig: {
        display: true,
        verticalPosition: 'left', //left  | right
        horizontalPosition: 'top', //top | bottom
        funnelLine: {
          display: true,
          syncColor: true,
          color: 'pink',
          lineLength: 80,
          lineWidth: 2,
          lineStyle: 'solid', //solid dashed dotted
          opacity: 100,
          shadow: { shadowBlur: 0, shadowColor: 'black', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        seriesName: {
          display: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          color: 'yellow',
          fontWeight: 'normal'
        }, // 系列名
        proportion: {
          // 占比值
          display: false,
          decimal: 1,
          speed: 5,
          propColorFollow: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal'
        },
        trueValue: {
          // 真实值
          display: true,
          speed: 10,
          trueColorFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal',
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false
          },
          prefix: {
            display: false,
            content: 'prefix',
            xOffset: 0,
            yOffset: 0,
            labelPrefixColorFlow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          },
          suffix: {
            display: false,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            labelSuffixColorFlow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          }
        }
      },
      centerLabel: {
        display: true,
        seriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          color: 'yellow',
          fontWeight: 'normal'
        }, // 系列名
        proportion: {
          // 占比值
          display: false,
          decimal: 1,
          speed: 5,
          centerPropColorFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          color: '#088cc9',
          fontWeight: 'normal'
        },
        trueValue: {
          // 真实值
          display: true,
          speed: 20,
          centerTrueColorFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          color: '#088cc9',
          fontWeight: 'normal',
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false
          },
          prefix: {
            display: true,
            content: 'prefix',
            xOffset: 0,
            yOffset: 0,
            centerLabelPrefixColorFlow: true,
            fontFamily: 'Microsoft Yahei',
            fontSize: 14,
            color: '#088cc9',
            fontWeight: 'normal'
          },
          suffix: {
            display: true,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            centerLabelSuffixColorFlow: true,
            fontFamily: 'Microsoft Yahei',
            fontSize: 14,
            color: '#e3ebee',
            fontWeight: 'normal'
          }
        }
      },
      legendConfig: {
        display: true,
        clickInt: {
          clicked: true,
          disableStyles: '#fc1616'
        },
        size: { w: 30, h: 30 },
        iconConfig: {
          iconType: 'system',
          systemStyle: 'star',
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          svgPath:
            'M352 512a160 160 0 1 1 320 0 160 160 0 0 1-320 0zM512 416a96 96 0 1 0 0 192 96 96 0 0 0 0-192z" fill="#000000" p-id="964"></path><path d="M184.448 454.229333c-17.877333 25.770667-24.448 45.952-24.448 57.770667 0 11.818667 6.570667 32 24.448 57.770667 17.322667 24.874667 43.008 51.882667 75.52 76.842666C325.12 696.618667 414.421333 736 512 736s186.88-39.381333 252.032-89.386667c32.512-24.96 58.197333-51.968 75.52-76.842666 17.877333-25.770667 24.448-45.952 24.448-57.770667 0-11.818667-6.570667-32-24.448-57.770667-17.322667-24.874667-43.008-51.882667-75.52-76.842666C698.88 327.381333 609.578667 288 512 288s-186.88 39.381333-252.032 89.386667c-32.512 24.96-58.197333 51.968-75.52 76.842666z m36.522667-127.616C294.826667 269.952 397.482667 224 512 224s217.173333 45.952 290.986667 102.613333c36.992 28.373333 67.541333 60.032 89.130666 91.136 20.992 30.250667 35.882667 63.402667 35.882667 94.250667 0 30.848-14.933333 64-35.882667 94.250667-21.589333 31.104-52.138667 62.72-89.088 91.136-73.813333 56.661333-176.512 102.613333-291.029333 102.613333s-217.173333-45.952-290.986667-102.613333c-36.992-28.373333-67.541333-60.032-89.130666-91.136C110.933333 576 96 542.848 96 512c0-30.848 14.933333-64 35.882667-94.250667 21.589333-31.104 52.138667-62.72 89.088-91.136z'
        },
        seriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          legendSeriesColorFollow: true,
          color: '#189cda',
          fontWeight: 'normal',
          charNums: null
        },
        displayAlign: 'left', //'left' | 'right' | 'center'
        proportion: {
          display: true,
          decimal: 0,
          legendProportionStyleFollow: false,
          speed: 2,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#ff5709',
          legendProportionColorFollow: true,
          fontWeight: 'normal',
          displayWidth: null,
          charNums: null
        },
        trueValue: {
          display: true,
          speed: 2,
          legendTrueStyleFollow: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 13,
          legendTrueColorFollow: true,
          color: '#15ff00',
          fontWeight: 'normal',
          charNums: null,
          displayWidth: null,
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false,
            percentage: false,
            negativeing: 'minus'
          },
          prefix: {
            display: false,
            content: 'prefix',
            xOffset: 0,
            yOffset: 0,
            prefixStyleFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            prefixColorFollow: true,
            color: '#086f9e',
            fontWeight: 'normal'
          },
          suffix: {
            display: false,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            suffixStyleFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            suffixColorFollow: false,
            color: '#71e624',
            fontWeight: 'normal'
          }
        },
        layout: {
          distributionMode: 'unilateral',
          itemGap: 20,
          orient: 'vertical',
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
    funnelConfig: {
      graphConfig: {
        funnelOrient: 'vertical', //'vertical' | 'horizontal'
        funnelAlign: 'center', //'left' | 'right' | 'center'
        height: 75,
        width: 63,
        minSize: 0,
        maxSize: 100,
        gapStep: 4
      },
      borderConfig: {
        display: true,
        borderColor: '#0B0C0F',
        borderWidth: 1,
        borderType: 'solid' //solid dashed dotted
      },
      shadowStyle: {
        shadowBlur: 4,
        shadowColor: 'rgba(0,0,0,0)',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    },
    seriesConfig: {
      seriesItemName: '哈哈哈哈',
      dataSeries: [
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c2
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c3
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c4
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c5
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

  const data: any = [
    {
      item: '系列一',
      itemTitle: '系列一11',
      value: 20
    },
    {
      item: '系列二',
      itemTitle: '系列二2',
      value: 60
    },
    {
      item: '系列三',
      value: 40
    },
    {
      item: '系列四',
      value: 100
    },
    {
      item: '系列五',
      value: 80
    }
  ]

  return (
    <div style={{ width: 900, height: 600, margin: ' 0 auto' }}>
      <LczBasicFunnel w={900} h={600} {...config} data={data} onClick={a => console.log(1111, a)} />
    </div>
  )
})
