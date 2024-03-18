import React, { memo } from 'react'
import { LczChart } from '../'
import { TestTubeProps } from '../LczChart/LczChartGauge/LczTestTube/type'

const LczTestTube = LczChart.LczChartGauge.LczTestTube

export const T_LczTestTube = memo(function T_LczTestTube() {
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

  const config: TestTubeProps = {
    globalConfig: {
      position: 'vertical',
      margin: {
        t: 0,
        b: 0,
        l: 10,
        r: 10
      },
      bgColor: 'rgba(0,0,0,0)',
      titleConfig: {
        display: true,
        content: { value: 'TITLE' },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'normal',
        subTitle: {
          display: false,
          content: { value: '' },
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#ffffff',
          fontWeight: 'normal'
        },
        speed: 10,
        xPosition: 'left',
        yPosition: 'top',
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
      dataAnimate: false
    },
    seriesConfig: {
      scaleMark: {
        display: true,
        margin: 3,
        opacity: 100,
        barWidth: 1,
        levelOrientation: 'bottom',
        verticalOrientation: 'left',
        suffix: '',
        subScaleLine: {
          space: 1,
          color: '#484B50',
          len: 2
        },
        mainScaleLine: {
          space: 5,
          color: '#D8D8D8',
          len: 4
        },
        labelStyle: {
          display: true,
          margin: 10,
          valSpeed: 10,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#1ad1c2',
          opacity: 100,
          fontWeight: 'normal',
          shadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          format: {
            display: true,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: true,
            negativeing: 'minus'
          }
        }
      },
      indicator: {
        display: true,
        outGarden: {
          outSyncColor: false,
          color: c2,
          symbolSize: 24
        },
        inGarden: {
          inSyncColor: true,
          color: c3,
          symbolSize: 16
        },
        labelStyle: {
          display: true,
          suffix: '',
          distance: 22,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#FFFFFF',
          opacity: 100,
          fontWeight: 'normal',
          shadow: {
            shadowBlur: 0,
            shadowColor: 'rgba(0,0,0,0)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          },
          format: {
            display: true,
            decollate: true,
            decimal: 0,
            round: true,
            percentage: true,
            negativeing: 'minus'
          }
        }
      },
      company: {
        display: true,
        content: '单位',
        levelPosition: 'right',
        verticalPosition: 'top',
        xOffset: 20,
        yOffset: 0,
        fontFamily: 'PingFangSC-Regular',
        fontSize: 12,
        color: '#d32a2a',
        opacity: 100,
        fontWeight: 'normal',
        shadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      extremum: {
        min: { value: -10 },
        max: { value: 120 }
      },
      tubeStyle: {
        levelColor: c3,
        verticalColor: c2,
        grooveColor: '#2B323B',
        levelBarWidth: 600,
        levelBarHeight: 16,
        verticalBarWidth: 16,
        verticalBarHeight: 500
      }
    }
  }

  const data: any = [
    {
      value: 100
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczTestTube w={900} h={600} data={data} {...config} onClick={a => console.log(a)} />
    </div>
  )
})
