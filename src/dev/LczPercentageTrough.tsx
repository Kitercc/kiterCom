import React, { memo } from 'react'
import { LczChart } from '../'
import { PercentageRingProps } from '../LczChart/LczChartGauge/LczPercentageRing/type'

const LczPercentageTrough = LczChart.LczChartGauge.LczPercentageTrough

export const T_LczPercentageTrough = memo(function T_LczPercentageTrough() {
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

  const config: PercentageRingProps = {
    globalConfig: {
      margin: {
        x: 50,
        y: 50
      },
      backgroundColor: 'pink',
      ringtitleConfig: {
        display: true,
        mainContentType: 'value', //'seriesName' | 'value' | 'custom'
        //value
        mainValueReal: true,
        mainValueUnit: 's',
        mainValueFormat: {
          display: true,
          decollate: false, //千分位
          decimal: 0, //小数位数
          round: true, //四舍五入
          negativeing: 'brackets' //负数显示值  负号 minus  括号 brackets  绝对值  abs
        },
        //custom
        mainCustom: { value: 'TITLE' },
        fontFamily: 'DIN',
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'normal',
        mainShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        //
        subTitle: {
          display: false,
          subContentType: 'seriesName', //'seriesName' | 'value' | 'custom'
          //value
          subValueReal: false,
          subValueUnit: '',
          subValueFormat: {
            display: false,
            decollate: true,
            decimal: 0,
            round: true,
            negativeing: 'minus'
          },
          //custom
          subCustom: { value: 'SS' },
          fontFamily: 'DIN',
          fontSize: 18,
          color: '#ffffff',
          fontWeight: 'normal',
          subShadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        },
        speed: 10,
        xPosition: 'center',
        yPosition: 'center',
        xOffset: 0,
        yOffset: 0
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
          saveAsImage: true
        }
      },
      dataAnimate: true
    },
    gaugeConfig: {
      gaugeName: '',
      extremumConfig: {
        max: { value: 200 },
        min: { value: 100 }
      },
      angleConfig: {
        angleStart: 225,
        angleCenter: 270
      },
      progressStyle: {
        inRadius: 70,
        outRadius: 80,
        color: c3,
        opacity: 100,
        roundCap: true,
        clockwise: true,
        ProgressContour: {
          display: false,
          color: '#2B323B',
          width: 3,
          lineType: 'solid' //'solid' | 'dashed' | 'dotted'
        },
        ProgressShadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(255,0,0,1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      backgroundstyle: {
        display: true,
        color: c2,
        opacity: 50,
        backgroundContour: {
          display: false,
          color: '#1cd48e',
          width: 4,
          lineType: 'solid' //'solid' | 'dashed' | 'dotted'
        },
        backgroundShadow: {
          shadowBlur: 0,
          shadowColor: '#3212e7',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      }
    },
    indicatorConfig: {
      outGarden: {
        display: true,
        outSyncColor: true,
        color: c4,
        opacity: 100,
        symbolSize: 24,
        outGardenShadow: {
          shadowBlur: 10,
          shadowColor: 'rgba(255,0,0,1)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      inGarden: {
        display: false,
        inSyncColor: true,
        color: c,
        opacity: 100,
        symbolSize: 16
      }
    }
  }

  const data: any = [
    {
      item: '标题',
      itemTitle: 'sss',
      value: 210
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczPercentageTrough w={900} h={600} data={data} {...config} onClick={a => console.log(a)} />
    </div>
  )
})
