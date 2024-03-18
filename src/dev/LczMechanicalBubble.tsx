import React, { memo } from 'react'
import { LczChart } from '../'
import { MechanicalBubbleProps } from '../LczChart/LczChartScatter/LczMechanicalBubble/type'

const LczMechanicalBubble = LczChart.LczChartScatter.LczMechanicalBubble

const c = {
  selected: 'single',
  single: '#cff565',
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
        value: '#1000f5'
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
export const T_LczMechanicalBubble = memo(function T_LczMechanicalBubble() {
  const config: MechanicalBubbleProps = {
    globalConfig: {
      margin: {
        x: 50,
        y: 50
      },
      bgColor: 'rgba(0,0,0,0)',
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
      repulsion: {
        max: 300,
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
            color: '#eb0f7d',
            fontWeight: 'normal'
          }
        },
        normalValue: {
          display: true,
          xOffset: 0,
          yOffset: 0,
          valueDisplay: 'proportion', // 'proportion' | 'true'
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
      roamMove: false,
      roamScale: false,
      friction: 0.6
    },
    bubbleConfig: {
      defaultStyle: {
        defaultSize: {
          max: 100,
          min: 30
        },
        colorFill: {
          fillStyle: 'forValue', //'forValue' | 'forColor'
          maxColor: '#3612d6',
          minColor: '#e62012',
          defaultColor: c3
        },
        defaultBorderStyle: {
          display: false,
          borderColor: '#0e24e2',
          borderWidth: 1,
          borderType: 'solid'
        },
        defaultShadowStyle: {
          shadowColor: 'rgba(0,0,0,1)',
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0
        }
      },
      customStyle: [
        {
          customName: '系列二',
          customStyle: {
            color: c2,
            customStyleSync: true
          },
          customBorderStyle: {
            display: true,
            borderColor: '#df2333',
            borderWidth: 3,
            borderType: 'solid'
          },
          customShadowStyle: {
            shadowColor: '#0adf15',
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      ],
      highlightStyle: {
        display: true,
        scale: false,
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
    }
  }

  const data = [
    {
      item: '系列一',
      itemTitle: '这是系列一',
      value: 10
    },
    {
      item: '系列二',
      itemTitle: '',
      value: 20
    },
    {
      item: '系列三',
      itemTitle: '',
      value: 30
    },
    {
      item: '系列四',
      itemTitle: '',
      value: 40
    },
    {
      item: '系列五',
      itemTitle: '',
      value: 50
    },
    {
      item: '系列六',
      itemTitle: '',
      value: 60
    },
    {
      item: '系列七',
      itemTitle: '',
      value: 70
    },
    {
      item: '系列八',
      itemTitle: '',
      value: 80
    },
    {
      item: '系列九',
      itemTitle: '',
      value: 90
    }
  ]

  const a = [900, 500]
  return (
    <div style={{ width: a[0], height: a[1], margin: ' 0 auto' }}>
      <LczMechanicalBubble {...config} w={a[0]} h={a[1]} data={data} onClick={a => console.log(a)} />
    </div>
  )
})
