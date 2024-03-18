import React, { useState } from 'react'
import { LczCarouselTable } from '../index'
import { CarouseTableProps } from '../LczCarouselTable/type'
const colorStr = {
  selected: 'single',
  single: 'rgba(206, 84, 36,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#1ece0e'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      },
      {
        begins: 0,
        value: '#8cd439'
      }
    ]
  }
}
const pureColorStr = {
  selected: 'single',
  single: 'rgba(255, 0, 0, 0.478)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#dd1f1f'
      },
      {
        begins: 0,
        value: '#a1df12'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      }
    ]
  }
}

const pureColorStr1 = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#dd1f1f'
      },
      {
        begins: 0,
        value: '#ff76ab'
      },
      {
        begins: 0,
        value: '#6251ff'
      },
      {
        begins: 0,
        value: '#34ff01'
      }
    ]
  }
}

const pureColorStr2 = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 50,
        value: '#2ae6ff'
      }
    ]
  }
}
export const T_LczCarouselTable = () => {
  const config: CarouseTableProps = {
    globalConfig: {
      showType: 'fixedHeight',
      rowsNumber: 6,
      topBgColor: 'rgba(61,153,252,0.40)',
      topLine: 0,
      textSpacing: 0,
      horcroll: {
        display: true,
        trackConfig: { display: true, thickness: 6, color: 'rgba(255,0,0,.1)', radius: 0 },
        sliderConfig: { size: 1, color: 'rgba(98,104,111,1)', radius: 0 }
      },
      updated: true
    },
    carousel: {
      display: false,
      interval: 3,
      fixedBg: true,
      animateMode: 'one', // 动画模式 all 全部  one 单个
      animatConnect: 'headTail', // 动画衔接 headTail首尾衔接  startAgain重头开始
      animationEffect: 'flop',
      direction: 'up',
      duration: 500,
      speed: 'linear',
      animateStep: 50
    },
    customCol: [
      {
        field: 'column5',
        colName: '进度条列',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'left',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: false,
          borderColor: 'rgba(255,222,99,1)',
          borderWidth: 1,
          borderRadius: 2
        },
        contentType: 'progress', // 内容类型 text 文字  number 数字 progress

        progressMaxValType: 'custom',
        progressMaxVal: '100',

        progressType: 'grid', // 进度条类型  // line 条形  栅格 grid
        progressWidth: 80,
        progressHeight: 8,
        progressColorType: 'multicolor',
        progressStartColor: 'rgba(255,0,0,1)',
        progressEndColor: 'rgba(27, 197, 27, 1)',
        multiColor: pureColorStr2,

        contentOverflow: 'slidetitle', // ellipsis 省略号  lineFeed换行 slidetitle 跑马灯 hidden 隐藏
        interval: 3,

        tipConfig: {
          display: true,
          position: 'top',
          xPadding: 4,
          yPadding: 4,
          maxHeight: undefined,
          maxWidth: null,
          bgColor: '#000000',
          radius: 2,
          border: { borderd: true, borderColor: '#0fa7ff', borderWidth: 1 },
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        progressText: {
          display: true,
          fontFamily: 'Microsoft YaHei',
          fontSize: 14,
          color: '#df3e3e',
          fontWeight: 400
        },
        subTitle: {
          display: false,
          position: 'onBefore',
          field: 'column2,column1',
          space: 10,
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 12, color: '#fff', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#ffffff', fontWeight: 400 }
        },
        numberFormat: {
          display: false,
          decollate: true,
          decimal: 0,
          round: true,
          percentage: true,
          negativeing: 'minus'
        },
        sectionStyleFlag: true,
        sectionStyle: [
          {
            progressMin: 0,
            progressMax: 50,
            color: '#ff0000',
            progressColor: {
              display: true,
              startColor: 'rgba(255,0,0,1)',
              endColor: 'rgba(153, 153, 153,1)',
              multiColor: pureColorStr2
            },
            fontWeight: 400,
            fontSize: 14
          }
        ],
        progressOutline: {
          display: true,
          xPadding: 4,
          yPadding: 2,
          bgColor: 'rgba(255,255,255,0)',
          borderColor: '#e7d91066',
          borderWidth: 1,
          fillet: 10
        }
      },
      {
        field: 'column5',
        colName: '文字',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'center',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: false,
          borderColor: 'rgba(255,222,99,1)',
          borderWidth: 1,
          borderRadius: 2
        },
        contentType: 'text', // 内容类型 text 文字  number 数字
        contentOverflow: 'ellipsis', // ellipsis 省略号  lineFeed换行 slidetitle 跑马灯
        interval: 3,
        tipConfig: {
          display: true,
          position: 'top',
          xPadding: 4,
          yPadding: 4,
          maxHeight: null,
          maxWidth: null,
          bgColor: '#000000',
          radius: 2,
          border: { borderd: true, borderColor: 'rgba(255,222,99,1)', borderWidth: 1 },
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#e61c1c', fontWeight: 400 },
        statusNormalstyle: {
          bgConfig: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            width: 24,
            height: 24,
            radius: 12,
            color: 'rgba(255,255,255,0.2)',
            imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          },
          borderConfig: { borderd: true, borderColor: '#3D99FC', borderWidth: 1 },
          textStyle: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            fontFamily: 'PingFangSC-Regular',
            fontSize: 14,
            color: '#fff',
            fontWeight: 400,
            letterSpacing: 0
          }
        },
        statusStyle: [
          {
            statusVal: '第一列内容1',
            bgConfig: {
              display: true,
              xOffset: 0,
              yOffset: 0,
              width: 24,
              height: 24,
              radius: 12,
              color: 'rgba(255,255,255,0)',
              imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
            },
            borderConfig: { borderd: true, borderColor: '#3D99FC', borderWidth: 1 },
            textStyle: {
              display: true,
              xOffset: 0,
              yOffset: 0,
              fontFamily: 'PingFangSC-Regular',
              fontSize: 14,
              color: '#e70909',
              fontWeight: 400,
              letterSpacing: 0
            }
          }
        ],
        subTitle: {
          display: true,
          position: 'onAfter', //"onBefore" | "onAfter"
          field: 'column2,column3',
          space: 6,
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 12, color: '#1eff00', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      },

      {
        field: 'column5',
        colName: '状态列',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'center',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: false,
          borderColor: 'rgba(255,222,99,1)',
          borderWidth: 1,
          borderRadius: 2
        },
        contentType: 'status', // 内容类型 text 文字  number 数字 progress
        progressType: 'line', // 进度条类型  // line 条形  栅格 grid
        progressWidth: 80,
        progressHeight: 8,
        progressStartColor: 'rgba(255,0,0,1)',
        progressEndColor: 'rgba(27, 197, 27, 1)',
        contentOverflow: 'ellipsis', // ellipsis 省略号  lineFeed换行 slidetitle 跑马灯 hidden 隐藏
        interval: 3,
        tipConfig: {
          display: true,
          position: 'top',
          xPadding: 4,
          yPadding: 4,
          maxHeight: undefined,
          maxWidth: null,
          bgColor: '#000000',
          radius: 2,
          border: { borderd: true, borderColor: '#0fa7ff', borderWidth: 1 },
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        statusNormalstyle: {
          bgConfig: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            width: 88,
            height: 88,
            radius: 44,
            color: 'rgba(255,255,255,0)',
            imgUrl: ''
          },
          borderConfig: { borderd: true, borderColor: '#0fa7ff', borderWidth: 1 },
          textStyle: {
            display: true,
            xOffset: 0,
            yOffset: 0,
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            color: '#fff',
            fontWeight: 400
          }
        },
        subTitle: {
          display: true,
          position: 'onBefore',
          field: 'column2,column1',
          space: 0,
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 12, color: '#fff', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#720c0c', fontWeight: 400 }
        },
        numberFormat: {
          display: false,
          decollate: true,
          decimal: 0,
          round: true,
          percentage: true,
          negativeing: 'minus'
        },
        sectionStyleFlag: true,
        sectionStyle: [
          {
            progressMin: 10,
            progressMax: 60,
            color: '#ff0000',
            progressColor: { display: true, startColor: 'rgba(255,0,0,1)', endColor: 'rgba(153, 153, 153,1)' },
            fontWeight: 400,
            fontSize: 14
          },
          {
            progressMin: 60,
            progressMax: 100,
            color: '#ff0000',
            progressColor: { display: true, startColor: 'rgba(255,0,0,1)', endColor: 'rgba(25, 168, 204,1)' },
            fontWeight: 400,
            fontSize: 14
          }
        ],
        progressOutline: {
          display: true,
          xPadding: 4,
          yPadding: 2,
          bgColor: 'rgba(255,255,255,0)',
          borderColor: '#e7d91066',
          borderWidth: 1,
          fillet: 10
        }
      },

      {
        field: 'column4',
        colName: '时间列',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'center',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: false,
          borderColor: '#ff6363',
          borderWidth: 1,
          borderRadius: 8
        },
        contentType: 'date',
        contentOverflow: 'ellipsis',
        tipConfig: {
          display: true,
          position: 'top',
          xPadding: 4,
          yPadding: 4,
          maxHeight: undefined,
          maxWidth: null,
          bgColor: '#000000',
          radius: 2,
          border: { borderd: true, borderColor: 'rgba(255,222,99,1)', borderWidth: 1 },
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#94ff19', fontWeight: 400 }
        },
        interval: 3,
        textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 },
        dataForMat: {
          display: true,
          date: { display: true, forMat: 'YYYY-MM-DD' },
          time: { display: true, forMat: 'HH:mm:ss' }
        },
        sectionStyleFlag: true,
        sectionStyle: [
          { minDate: '2020-01-01', maxDate: '2020-05-01', color: '#ff6c0a', fontWeight: 400, fontSize: 14 },
          { minDate: '2020-02-08', maxDate: '2020-11-08', color: '#99da7b', fontWeight: 400, fontSize: 14 }
        ],
        subTitle: {
          display: true,
          position: 'onAfter',
          field: 'column1,column2',
          space: 0,
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      },
      {
        field: 'column2',
        colName: '数字列',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'center',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: true,
          borderColor: '#63ff7d',
          borderWidth: 1,
          borderRadius: 10
        },
        contentType: 'number',
        contentOverflow: 'ellipsis', // ellipsis 省略号  lineFeed换行 slidetitle 跑马灯
        tipConfig: {
          display: true,
          position: 'top',
          xPadding: 4,
          yPadding: 4,
          maxHeight: undefined,
          maxWidth: null,
          bgColor: '#000000',
          radius: 2,
          border: { borderd: true, borderColor: 'rgba(255,222,99,1)', borderWidth: 1 },
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 },
        subTitle: {
          display: true,
          position: 'onBefore',
          space: 0,
          field: 'column1',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#7afd00', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        numberFormat: {
          display: true,
          decollate: true,
          decimal: 2,
          round: true,
          percentage: false,
          negativeing: 'minus'
        },
        sectionStyleFlag: true,
        sectionStyle: [
          { min: -100, max: 40, color: '#ff0000', fontWeight: 400, fontSize: 14 },
          { min: 30, max: 90, color: '#49d807', fontWeight: 400, fontSize: 14 }
        ]
      },

      {
        field: 'column3',
        colName: '图片列',
        colWidth: 130,
        colSpeed: 0,
        alignType: 'center',
        horOffset: 0,
        verOffset: 0,
        borderStyle: {
          borderd: false,
          borderColor: '#ff6363',
          borderWidth: 1,
          borderRadius: 8
        },
        contentType: 'image',
        contentOverflow: 'ellipsis',
        imageWidth: 36,
        imageHeight: 20,
        textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 },
        subTitle: {
          display: true,
          position: 'onAfter',
          field: 'column1,column2',
          space: 0,
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        },
        suffix: {
          display: false,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      }
    ],

    header: {
      display: true,
      height: 45,
      bgColor: { color: colorStr },
      headerStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: '#fff',
        fontWeight: 400,
        letterSpacing: 6,
        textAlign: 'center'
      }
    },
    serialCol: {
      display: true,
      headerTitle: '#',
      inintNumber: 1,
      colWidth: 40,
      colSpac: 0,
      alignType: 'center',
      serialStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400, letterSpacing: 0 },
      serialStyleList: []
    },
    lineconfig: {
      lineSpeed: 2,
      yPadding: 8,
      borderStyle: {
        borderd: true,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0)'
      },
      lineStyle: [
        { bgColor: { color: pureColorStr }, leftOffSet: 0, opacity: 100, radius: 0 },
        { bgColor: { color: colorStr }, leftOffSet: 0, opacity: 100, radius: 0 },
        {
          bgColor: { color: { ...pureColorStr, single: '#0059ff4c' } },
          leftOffSet: 0,
          opacity: 100,
          radius: 60
        }
      ]
    },
    seriesStyle: [
      {
        condition: '111',
        seriesLineStyle: {
          display: true,
          border: { borderd: true, borderColor: '#D0021B', borderWidth: 1 },
          bgConfig: { display: true, color: pureColorStr1, opacity: 100, radius: 10 }
        },
        seriesTextStyle: {
          display: true,
          fontFamily: 'Microsoft YaHei',
          fontSize: 14,
          color: '#6de9ff',
          fontWeight: 900
        }
      }
    ],
    emptyDataStyle: {
      display: true,
      bgColor: 'rgba(32,37,43,0.5)',
      image: {
        display: true,
        xOffset: 0,
        yOffset: -12,
        imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
        width: 96,
        height: 96
      },
      text: {
        display: true,
        content: '暂无数据',
        xOffset: 0,
        yOffset: 51,
        textStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 13,
          color: '#C8D0D8',
          fontWeight: 'normal',
          letterSpacing: 0
        }
      }
    }
  }

  const data: any = [
    {
      column1: '第一列内容1',
      column2: 254640.478,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-01-08',
      column5: 100
    },
    {
      column1: '第一列内容2',
      column2: 30.01,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-02-08',
      column5: -40
    },
    {
      column1: '第一列内容1第一列内容1第一列内容1第一列内容1第一列内容1第一列内容1',
      column2: -60,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-07-08',
      column5: 12
    },
    {
      column1: '第一列内容4',
      column2: 80,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-07-08',
      column5: 80
    },
    {
      column1: '第一列内容5',
      column2: -90,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-11-08',
      column5: 12
    },
    {
      column1: '第一列内容6',
      column2: 95,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-09-08',
      column5: 12
    },
    {
      column1: '第一列内容7',
      column2: 795,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-07-08',
      column5: 12
    },
    {
      column1: '第一列内容122',
      column2: 795,
      column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
      column4: '2020-07-08',
      column5: 12
    }
  ]

  const [tabData, setTabData] = useState(data)
  const pushData = () => {
    if (tabData.length > 0) {
      const _data = JSON.parse(JSON.stringify(tabData))
      _data[0] = {
        column1: '第一列内容1',
        column2: 254640.478,
        column3: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
        column4: '2020-01-08',
        column5: 10011212111221
      }
      setTabData(_data)
    } else {
      setTabData(data)
    }
  }

  console.log(tabData)

  const tableClick = data => {
    console.log(data, 999999)
  }

  return (
    <div style={{ width: 700, height: 600 }}>
      <button onClick={pushData}>pushData</button>
      <LczCarouselTable
        {...config}
        data={tabData}
        w={600}
        h={600}
        onClick={tableClick}
        onMouseenter={() => console.log('onMouseenter')}
        onMouseleave={() => console.log('onMouseleave')}
      />
    </div>
  )
}
