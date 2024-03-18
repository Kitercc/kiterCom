import React, { memo } from 'react'
import { LczChart } from '../'
import { WordCloudProps } from '../LczChart/LczChartOther/LczWordCloud/type'

const LczWordCloud = LczChart.LczChartOther.LczWordCloud

export const T_LczWordCloud = memo(function T_LczWordCloud() {
  //#region
  const c = {
    selected: 'single',
    single: 'red',
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
    single: 'green',
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
    single: 'yellow',
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
  //#endregion

  const config: WordCloudProps = {
    globalConfig: {
      margin: {
        t: 'center',
        l: 'center',
        autoL: 0,
        autoT: 0
      },
      backgroundColor: 'rgba(0,0,0,0)',
      wordsStyle: {
        width: 50,
        height: 50,
        shape: 'system',
        systemStyle: 'circle',
        customStyle: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
      },
      wordTextStyle: {
        fontFamily: 'PingFangSC-Regular',
        maxSize: 24,
        minSize: 12,
        gridsize: 4,
        maxRotat: -45,
        minRotat: 90,
        rotationStep: 1,
        fontWeight: 'normal',
        shadow: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,0)',
          shadowOffsetX: 0,
          shadowOffsetY: 0
        },
        highlight: {
          display: false,
          focus: true,
          fontFamily: 'PingFangSC-Regular',
          fontSize: 20,
          color: '#FFFFFF',
          fontWeight: 'normal',
          shadow: {
            shadowBlur: 4,
            shadowColor: 'rgba(255,0,0,1)',
            shadowOffsetX: 0,
            shadowOffsetY: 0
          }
        }
      },
      titleConfig: {
        display: true,
        content: {
          value: 'TITLE'
        },
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: 'rgba(255,255,255,1)',
        fontWeight: 'normal',
        subTitle: {
          display: true,
          content: {
            value: 'SUBTITLE'
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
          showTitle: false
        },
        tool: {
          saveAsImage: true
        }
      }
    },
    seriesConfig: {
      dataSeries: [
        {
          map: {
            fieldName: '',
            displayName: '12121212'
          },
          color: c,
          opacity: 100
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c2,
          opacity: 100
        },
        {
          map: {
            fieldName: '',
            displayName: ''
          },
          color: c3,
          opacity: 100
        }
      ]
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
            backgroundColor: 'rgba(0,0,0,1)',
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
      }
    }
  }

  const data = [
    {
      item: '北京市',
      itemTitle: '',
      value: 100
    },
    {
      item: '天津市',
      itemTitle: '',
      value: 80
    },
    {
      item: '内蒙古自治区',
      itemTitle: '',
      value: 20
    },
    {
      item: '浙江省',
      itemTitle: '',
      value: 90
    },
    {
      item: '湖北省',
      itemTitle: '',
      value: 50
    },
    {
      item: '吉林省',
      itemTitle: '',
      value: 40
    },
    {
      item: '河北省',
      itemTitle: '',
      value: 66
    },
    {
      item: '山西省',
      itemTitle: '',
      value: 24
    },
    {
      item: '河南省',
      itemTitle: '',
      value: 42
    },
    {
      item: '山东省',
      itemTitle: '',
      value: 68
    },
    {
      item: '江苏省',
      itemTitle: '',
      value: 86
    },
    {
      item: '上海市',
      itemTitle: '',
      value: 95
    },
    {
      item: '辽宁省',
      itemTitle: '',
      value: 57
    },
    {
      item: '甘肃省',
      itemTitle: '',
      value: 20
    },
    {
      item: '青海省',
      itemTitle: '',
      value: 35
    },
    {
      item: '澳门特别行政区',
      itemTitle: '',
      value: 75
    },
    {
      item: '四川省',
      itemTitle: '',
      value: 59
    },
    {
      item: '宁夏回族自治区',
      itemTitle: '',
      value: 44
    },
    {
      item: '贵州省',
      itemTitle: '',
      value: 53
    },
    {
      item: '海南省',
      itemTitle: '',
      value: 59
    },
    {
      item: '台湾省',
      itemTitle: '',
      value: 62
    },
    {
      item: '湖南省',
      itemTitle: '',
      value: 69
    },
    {
      item: '江西省',
      itemTitle: '',
      value: 52
    },
    {
      item: '福建',
      itemTitle: '',
      value: 88
    },
    {
      item: '安徽省',
      itemTitle: '',
      value: 40
    },
    {
      item: '新疆维吾尔自治区',
      itemTitle: '',
      value: 29
    },
    {
      item: '重庆市',
      itemTitle: '',
      value: 76
    },
    {
      item: '西藏自治区',
      itemTitle: '',
      value: 33
    },
    {
      item: '黑龙江省',
      itemTitle: '',
      value: 46
    },
    {
      item: '广西壮族自治区',
      itemTitle: '',
      value: 55
    }
  ]

  return (
    <div style={{ width: 900, height: 600 }}>
      <LczWordCloud w={900} h={600} data={data} {...config} onClick={a => console.log(a)} />
    </div>
  )
})
