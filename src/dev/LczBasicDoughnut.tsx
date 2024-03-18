import React, { memo } from 'react'
import { LczChart } from '../'
import { LczBasicPieProps } from '../LczChart/LczChartPie/LczBasicPie/type'

const LczBasicDoughnut = LczChart.LczChartPie.LczBasicDoughnut

export const T_LczBasicDoughnut = memo(function T_LczBasicDoughnut() {
  const c = {
    selected: 'single',
    single: '#05ff50',
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
    single: '#ff60f2',
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
    single: '#e6ff04',
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

  const config: LczBasicPieProps = {
    globalConfig: {
      backgroundColor: 'rgba(0,0,0,0)',
      margin: {
        x: 50,
        y: 50
      },
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
          display: false,
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
      numberLabel: {
        display: true,
        distribution: 'horizontal',
        // xOffset: 0,
        // yOffset: 0,
        position: 'outside',

        margin: { t: 0, r: 0, b: 0, l: 0 },
        guideLine: {
          display: true,
          spacing: 10,
          lineStyle: {
            syncColor: true,
            color: '#f00',
            len1: 18,
            len2: 10,
            edgeDistance: 4,
            lineWidth: 1,
            opacity: 50
          },
          alignment: 'none',
          shadow: { shadowBlur: 4, shadowColor: '#2bff00', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        seriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          seriesNameColorFollow: false,
          color: '#088cc9',
          fontWeight: 'normal',
          prefix: {
            display: false,
            content: 'pre',
            offsetConfig: {
              t: 20,
              r: 0,
              l: 20,
              b: 10
            },
            labelSeriesNamePrefixStyleFollow: false,
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular',
            labelSeriesNamePrefixColorFollow: false,
            color: 'yellow',
            fontWeight: 'normal'
          },
          suffix: {
            display: false,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            labelSeriesNameSuffixStyleFollow: true,
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular',
            labelSeriesNameSuffixColorFollow: true,
            color: '#15ff21',
            fontWeight: 'normal'
          }
        }, // 系列名
        proportion: {
          // 占比值
          display: false,
          decimal: 0,
          propStyleFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          speed: 10,
          propColorFollow: false,
          color: '#45a0ca',
          fontWeight: 'normal',
          prefix: {
            display: true,
            content: 'pre',
            xOffset: 0,
            yOffset: 0,
            labelproportionPrefixStyleFollow: false,
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular',
            labelproportionPrefixColorFollow: false,
            color: '#fff',
            fontWeight: 'normal'
          },
          suffix: {
            display: true,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            labelproportionSuffixStyleFollow: false,
            fontSize: 13,
            fontFamily: 'PingFangSC-Regular',
            labelproportionSuffixColorFollow: false,
            color: '#15ff21',
            fontWeight: 'normal'
          }
        },
        trueValue: {
          // 真实值
          display: false,
          speed: 0,
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false,
            negativeing: 'minus'
          },
          trueStyleFollow: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 14,
          trueColorFollow: true,
          color: '#f7ad24',
          fontWeight: 'normal',
          prefix: {
            display: false,
            content: 'prefix',
            xOffset: 0,
            yOffset: 0,
            labelTruePrefixStyleFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            labelTruePrefixColorFollow: true,
            color: '#d8f35f',
            fontWeight: 'normal'
          },
          suffix: {
            display: false,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            labelTrueSuffixStyleFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            labelTrueSuffixColorFollow: true,
            color: '#E6F7FF',
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
          displayWidth: null,
          charNums: 3
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
          displayWidth: null,
          charNums: 3,
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
          orient: 'horizontal',
          width: 400,
          height: 200,
          legendPager: {
            display: false,
            gap: 5,
            itemGap: 5,
            horPosition: 'start',
            verPosition: 'end',

            pagerBtn: {
              buttonWidth: 15,
              buttonHeight: 15,
              pagerIconType: 'system',
              preIconPath:
                'M352 512a160 160 0 1 1 320 0 160 160 0 0 1-320 0zM512 416a96 96 0 1 0 0 192 96 96 0 0 0 0-192z" fill="#000000" p-id="964"></path><path d="M184.448 454.229333c-17.877333 25.770667-24.448 45.952-24.448 57.770667 0 11.818667 6.570667 32 24.448 57.770667 17.322667 24.874667 43.008 51.882667 75.52 76.842666C325.12 696.618667 414.421333 736 512 736s186.88-39.381333 252.032-89.386667c32.512-24.96 58.197333-51.968 75.52-76.842666 17.877333-25.770667 24.448-45.952 24.448-57.770667 0-11.818667-6.570667-32-24.448-57.770667-17.322667-24.874667-43.008-51.882667-75.52-76.842666C698.88 327.381333 609.578667 288 512 288s-186.88 39.381333-252.032 89.386667c-32.512 24.96-58.197333 51.968-75.52 76.842666z m36.522667-127.616C294.826667 269.952 397.482667 224 512 224s217.173333 45.952 290.986667 102.613333c36.992 28.373333 67.541333 60.032 89.130666 91.136 20.992 30.250667 35.882667 63.402667 35.882667 94.250667 0 30.848-14.933333 64-35.882667 94.250667-21.589333 31.104-52.138667 62.72-89.088 91.136-73.813333 56.661333-176.512 102.613333-291.029333 102.613333s-217.173333-45.952-290.986667-102.613333c-36.992-28.373333-67.541333-60.032-89.130666-91.136C110.933333 576 96 542.848 96 512c0-30.848 14.933333-64 35.882667-94.250667 21.589333-31.104 52.138667-62.72 89.088-91.136z',
              preImageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              nextIconPath:
                'M352 512a160 160 0 1 1 320 0 160 160 0 0 1-320 0zM512 416a96 96 0 1 0 0 192 96 96 0 0 0 0-192z" fill="#000000" p-id="964"></path><path d="M184.448 454.229333c-17.877333 25.770667-24.448 45.952-24.448 57.770667 0 11.818667 6.570667 32 24.448 57.770667 17.322667 24.874667 43.008 51.882667 75.52 76.842666C325.12 696.618667 414.421333 736 512 736s186.88-39.381333 252.032-89.386667c32.512-24.96 58.197333-51.968 75.52-76.842666 17.877333-25.770667 24.448-45.952 24.448-57.770667 0-11.818667-6.570667-32-24.448-57.770667-17.322667-24.874667-43.008-51.882667-75.52-76.842666C698.88 327.381333 609.578667 288 512 288s-186.88 39.381333-252.032 89.386667c-32.512 24.96-58.197333 51.968-75.52 76.842666z m36.522667-127.616C294.826667 269.952 397.482667 224 512 224s217.173333 45.952 290.986667 102.613333c36.992 28.373333 67.541333 60.032 89.130666 91.136 20.992 30.250667 35.882667 63.402667 35.882667 94.250667 0 30.848-14.933333 64-35.882667 94.250667-21.589333 31.104-52.138667 62.72-89.088 91.136-73.813333 56.661333-176.512 102.613333-291.029333 102.613333s-217.173333-45.952-290.986667-102.613333c-36.992-28.373333-67.541333-60.032-89.130666-91.136C110.933333 576 96 542.848 96 512c0-30.848 14.933333-64 35.882667-94.250667 21.589333-31.104 52.138667-62.72 89.088-91.136z',
              nextImageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
              pageIconColor: '#4fff49',
              pageIconInactiveColor: '#4fff4961'
            },
            textStyle: {
              fontFamily: 'Microsoft Yahei',
              fontSize: 14,
              color: '#ca0e0e',
              fontWeight: 'normal'
            },
            animation: true
          },
          xPosition: 'left',
          yPosition: 'bottom',
          xOffset: 20,
          yOffset: 0,
          layoutmode: 'topbottom'
        }
      }
    },
    pieChart: {
      graphical: {
        radius: 50,
        outRadius: 70,
        opacity: 100,
        borderRadius: 0,
        clockwise: true,
        showEmptyCircle: true,
        emptyColor: '#D3D3D3'
      },
      angle: {
        startAngle: 30,
        minAngle: 0
      },
      select: {
        display: true,
        mode: 'single',
        initSelect: { value: '' },
        selectStyle: {
          selectedOffset: 10,
          opacity: 100
        }
      },
      highlight: {
        display: true,
        scaleSize: 10,
        focus: false
      },
      border: {
        display: false,
        color: 'rgba(255,0,0,1)',
        width: 3,
        type: 'solid'
      },
      shadow: {
        shadowBlur: 4,
        shadowColor: '#ffe600e4',
        shadowOffsetX: 0,
        shadowOffsetY: 0
      }
    },
    seriesConfig: {
      seriesName: '',
      sort: 'diminishing',
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

  const data = [
    {
      item: '系列一',
      itemTitle: '系列一11',
      value: 800
    },
    {
      item: '系列二',
      itemTitle: '系列二2',
      value: 400
    },
    {
      item: '系列三',
      value: 200
    },
    {
      item: '系列四',
      value: 100
    },
    {
      item: '系列五',
      value: 50
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczBasicDoughnut w={900} h={600} data={data} {...config} onClick={a => console.log(a)} />
    </div>
  )
})
