import React, { memo } from 'react'
import { LczChart } from '../'
import { SortBarProps } from '../LczChart/LczChartBar/LczSortBar/type'
const LczSortBar = LczChart.LczChartBar.LczSortBar
const c = {
  selected: 'single',
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
        value: '#ad6405'
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
  single: '#00ff9d',
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
  single: '#00ff9d',
  gradient: {
    gradualAngle: 1,
    colors: [
      {
        begins: 0,
        value: '#5912dd'
      },
      {
        begins: 100,
        value: '#39eb15'
      }
    ]
  }
}

export const T_LczSortBar = memo(function T_LczSortBar() {
  const config: SortBarProps = {
    globalConfig: {
      margin: {
        t: 45,
        b: 25,
        l: 60,
        r: 25
      },
      bgColor: 'pink',
      barCount: 0,
      barStyle: {
        barType: 'bullet', //"square" | "bullet" | "custom"
        fillet: { lt: 0, rt: 0, lb: 0, rb: 0 },
        barWidth: 30,
        barBgColor: {
          display: true,
          color: 'rgba(180,180,180,1)',
          opacity: 20,
          syncRadius: true,
          fillet: { lt: 0, rt: 0, lb: 0, rb: 0 }
        }
      },
      valueLabel: {
        display: true,
        valueStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#e21111',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0,
          syncValueColor: false,
          rotate: 0,
          format: {
            display: false,
            decollate: true,
            decimal: 3,
            round: true,
            percentage: false
          }
        },
        position: 'top' //"top" | "left" | "right" | "bottom" | "inside"
      },
      titleConfig: {
        mainTitle: {
          display: true,
          mainContentType: 'total', // 'currentTime' | 'total' | 'custom'
          // total
          prefix: 'ss',
          unit: '',
          numberFormat: {
            display: true,
            decollate: true,
            decimal: 2,
            round: true,
            percentage: false,
            negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
          },
          //custom
          content: { value: '' },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 16,
          color: '#131212',
          fontWeight: 'normal',
          shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        subTitle: {
          display: true,
          subContentType: 'currentTime', // 'currentTime' | 'total' | 'custom'
          // currentTime
          prefix: '',
          unit: '',
          numberFormat: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: false,
            negativeing: 'minus' //  负数显示值  负号 minus  括号 brackets  绝对值  abs
          },
          //custom
          content: { value: '' },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 18,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        speed: 10,
        xPosition: 'auto', // "left" | "right" | "center" | "auto"
        yPosition: 'auto', // "top" | "bottom" | "center" | "auto"
        xOffset: 0,
        yOffset: 0
      }
    },
    axisConfig: {
      xAxis: {
        display: true,
        textStyle: {
          display: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#e21111',
          fontWeight: 'normal',
          rotate: 0
        },
        axisTick: {
          display: true,
          borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
          borderColor: 'blue',
          borderWidth: 1
        }
      },
      yAxis: {
        display: true,
        textStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#e70e0e',
          fontWeight: 'normal',
          rotate: 10
        },
        distance: 10
      }
    },
    timerShaft: {
      margin: {
        b: 0,
        l: 25,
        r: 25
      },
      currentActive: { value: '2016' },
      timeLine: {
        borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
        borderColor: 'white',
        borderWidth: 1,
        progressBar: {
          display: true,
          borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
          borderColor: 'blue',
          borderWidth: 1
        }
      },
      timeLabel: {
        position: 'auto', // 'auto' | 'top' | 'bottom'
        splitType: 'auto', // 'auto' | 'showAll' | 'none'
        splitNumber: 2,
        suffix: 'TT',
        textStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: 'rgba(255,255,255,1)',
          fontWeight: 'normal',
          rotate: 20
        },
        highlight: {
          display: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#2412c4',
          fontWeight: 'normal'
        },
        progress: {
          display: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#1ed881',
          fontWeight: 'normal'
        }
      },
      timeGraph: {
        graphType: 'system', //'system' | 'custom' | 'svg'
        // systemtrue
        systemStyle: 'rect', // 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
        // custom
        customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        // svg
        svgPath: '',
        size: { width: 10, height: 10 },
        graphStyle: {
          color: 'yellow',
          contour: {
            display: false,
            borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
            borderColor: 'green',
            borderWidth: 6
          },
          shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        activeGraphStyle: {
          display: true,
          activeGraphSync: false,
          activeGraphType: 'system', //'system' | 'custom' | 'svg'
          // system
          systemStyle: 'circle', // 'circle' | 'rect' | 'roundRect' | 'triangle' | 'diamond' | 'pin' | 'arrow' | 'none'
          // custom
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          // svg
          svgPath: '',
          size: { width: 20, height: 20 },
          graphStyle: {
            color: '#00ff9d',
            contour: {
              display: false,
              borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
              borderColor: 'yellow',
              borderWidth: 6
            },
            shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
          }
        },
        highlightGraphStyle: {
          display: true,
          graphStyle: {
            color: '#00ff9d',
            contour: {
              display: false,
              borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
              borderColor: 'green',
              borderWidth: 4
            },
            shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
          }
        },
        progressGraphStyle: {
          display: true,
          graphStyle: {
            color: '#c7122a',
            contour: {
              display: false,
              borderType: 'solid', // 'solid' | 'dashed' | 'dotted'
              borderColor: 'red',
              borderWidth: 1
            },
            shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
          }
        }
      },
      timecontrol: {
        nextConfig: {
          display: true,
          nextIconType: 'default', //'default' | 'custom'
          nextIcon:
            'M896 96A96 96 0 0 1 992 192v512a96 96 0 0 1-96 96H128A96 96 0 0 1 32 704V192A96 96 0 0 1 128 96z m0 64H128a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM416 384a32 32 0 0 1 31.488 26.24L448 416v192a32 32 0 0 1-63.488 5.76L384 608v-192a32 32 0 0 1 32-32z m-192 96a32 32 0 0 1 31.488 26.24L256 512v96a32 32 0 0 1-63.488 5.76L192 608V512a32 32 0 0 1 32-32z m384-224a32 32 0 0 1 31.488 26.24L640 288v320a32 32 0 0 1-63.488 5.76L576 608v-320a32 32 0 0 1 32-32z m192 128a32 32 0 0 1 31.488 26.24L832 416v192a32 32 0 0 1-63.488 5.76L768 608v-192a32 32 0 0 1 32-32z m-64 512a32 32 0 0 1 5.76 63.488L736 960h-448a32 32 0 0 1-5.76-63.488L288 896h448z'
        },
        prevConfig: {
          display: true,
          prevIconType: 'default', //'default' | 'custom'
          prevIcon:
            'M896 96A96 96 0 0 1 992 192v512a96 96 0 0 1-96 96H128A96 96 0 0 1 32 704V192A96 96 0 0 1 128 96z m0 64H128a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM416 384a32 32 0 0 1 31.488 26.24L448 416v192a32 32 0 0 1-63.488 5.76L384 608v-192a32 32 0 0 1 32-32z m-192 96a32 32 0 0 1 31.488 26.24L256 512v96a32 32 0 0 1-63.488 5.76L192 608V512a32 32 0 0 1 32-32z m384-224a32 32 0 0 1 31.488 26.24L640 288v320a32 32 0 0 1-63.488 5.76L576 608v-320a32 32 0 0 1 32-32z m192 128a32 32 0 0 1 31.488 26.24L832 416v192a32 32 0 0 1-63.488 5.76L768 608v-192a32 32 0 0 1 32-32z m-64 512a32 32 0 0 1 5.76 63.488L736 960h-448a32 32 0 0 1-5.76-63.488L288 896h448z'
        },

        playConfig: {
          display: true,
          playButton: {
            playIconType: 'default', //'default' | 'custom'
            playIcon:
              'M896 96A96 96 0 0 1 992 192v512a96 96 0 0 1-96 96H128A96 96 0 0 1 32 704V192A96 96 0 0 1 128 96z m0 64H128a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM416 384a32 32 0 0 1 31.488 26.24L448 416v192a32 32 0 0 1-63.488 5.76L384 608v-192a32 32 0 0 1 32-32z m-192 96a32 32 0 0 1 31.488 26.24L256 512v96a32 32 0 0 1-63.488 5.76L192 608V512a32 32 0 0 1 32-32z m384-224a32 32 0 0 1 31.488 26.24L640 288v320a32 32 0 0 1-63.488 5.76L576 608v-320a32 32 0 0 1 32-32z m192 128a32 32 0 0 1 31.488 26.24L832 416v192a32 32 0 0 1-63.488 5.76L768 608v-192a32 32 0 0 1 32-32z m-64 512a32 32 0 0 1 5.76 63.488L736 960h-448a32 32 0 0 1-5.76-63.488L288 896h448z'
          },
          stopButton: {
            stopIconType: 'default', //'default' | 'custom'
            stopIcon:
              'M896 96A96 96 0 0 1 992 192v512a96 96 0 0 1-96 96H128A96 96 0 0 1 32 704V192A96 96 0 0 1 128 96z m0 64H128a32 32 0 0 0-32 32v512a32 32 0 0 0 32 32h768a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM416 384a32 32 0 0 1 31.488 26.24L448 416v192a32 32 0 0 1-63.488 5.76L384 608v-192a32 32 0 0 1 32-32z m-192 96a32 32 0 0 1 31.488 26.24L256 512v96a32 32 0 0 1-63.488 5.76L192 608V512a32 32 0 0 1 32-32z m384-224a32 32 0 0 1 31.488 26.24L640 288v320a32 32 0 0 1-63.488 5.76L576 608v-320a32 32 0 0 1 32-32z m192 128a32 32 0 0 1 31.488 26.24L832 416v192a32 32 0 0 1-63.488 5.76L768 608v-192a32 32 0 0 1 32-32z m-64 512a32 32 0 0 1 5.76 63.488L736 960h-448a32 32 0 0 1-5.76-63.488L288 896h448z'
          },
          size: 30,
          gap: 20
        },
        textStyle: {
          color: 'blue',
          contour: {
            display: false,
            borderType: 'dashed', // 'solid' | 'dashed' | 'dotted'
            borderColor: 'blue',
            borderWidth: 1
          },
          shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
        },
        controlHlightStyle: {
          display: true,
          color: 'red',
          contour: {
            display: false,
            borderType: 'dashed', // 'solid' | 'dashed' | 'dotted'
            borderColor: 'yellow',
            borderWidth: 10
          },
          shadow: { shadowBlur: 0, shadowColor: 'rgba(0,0,0,0)', shadowOffsetX: 0, shadowOffsetY: 0 }
        }
      },
      timeAuto: {
        autoPlay: false,
        loop: true,
        playInterval: 1.5
      },
      timeActive: false
    },
    seriesConfig: {
      dataSeries: [
        {
          map: {
            fieldName: '1',
            displayName: '55'
          },
          color: c4,
          decorate: {
            display: true,
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
              place: 'end', //"center" | "start" | "end"
              offset: 24
            }
          }
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c2,
          decorate: {
            display: true,
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
        {
          map: {
            fieldName: '台湾同胞',
            displayName: 'dd'
          },
          color: c3,
          decorate: {
            display: true,
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
        {
          map: {
            fieldName: '台湾同胞',
            displayName: '台湾'
          },
          color: c,
          decorate: {
            display: true,
            decIconConfig: {
              iconType: 'system', // "system" | "custom" | "svg"
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
              offset: 60
            }
          }
        }
      ]
    }
  }
  const data = [
    {
      category: '香港同胞',
      categoryTitle: '香港同胞cc',
      value: 100,
      time: '2016',
      no: 4
    },
    {
      category: '澳门同胞',
      categoryTitle: '',
      value: 110,
      time: '2016',
      no: 1
    },
    {
      category: '台湾同胞',
      categoryTitle: 'dd',
      value: 120,
      time: '2016',
      no: ''
    },
    {
      category: '日本',
      categoryTitle: '',
      value: 130,
      time: '2016',
      no: ''
    },
    {
      category: '香港同胞',
      categoryTitle: '',
      value: 100,
      time: '2017',
      no: 1
    },
    {
      category: '澳门同胞',
      categoryTitle: '',
      value: 120,
      time: '2017',
      no: 1
    },
    {
      category: '台湾同胞',
      categoryTitle: '',
      value: 300,
      time: '2017',
      no: ''
    },
    {
      category: '日本',
      categoryTitle: '',
      value: 200,
      time: '2017',
      no: 2
    },
    {
      category: '香港同胞',
      categoryTitle: '',
      value: 210,
      time: '2018',
      no: 1
    },
    {
      category: '澳门同胞',
      categoryTitle: '',
      value: 170,
      time: '2018',
      no: 1
    },
    {
      category: '台湾同胞',
      categoryTitle: '',
      value: 160,
      time: '2018',
      no: 1
    },

    {
      category: '日本',
      categoryTitle: '',
      value: 90,
      time: '2018',
      no: 1
    }
  ]

  return (
    <div style={{ width: 1000, height: 600, margin: ' 0 auto' }}>
      <LczSortBar w={1000} h={600} {...config} data={data} onClick={a => console.log(a, 'click')} />
    </div>
  )
})
