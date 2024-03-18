import React, { memo, useState } from 'react'
import { LczHorizontalMenu } from '../'
import { LczHorizontalMenuProps } from '../LczHorizontalMenu/type'

export const T_LczHorizontalMenu = memo(function T_LczHorizontalMenu() {
  const c = {
    selected: 'gradient',
    single: 'rgba(61, 153, 252,1)',
    gradient: {
      gradualAngle: 0,
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

  const cc = {
    selected: 'gradient',
    single: 'rgba(252, 61, 134,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgb(252, 61, 134)'
        },
        {
          begins: 100,
          value: '#21ad05'
        }
      ]
    }
  }
  const ccc = {
    selected: 'gradient',
    single: 'rgba(0,221,219,1)',
    gradient: {
      gradualAngle: 1,
      colors: [
        {
          begins: 0,
          value: 'rgba(0,221,219,1)'
        },
        {
          begins: 0,
          value: '#62ffdd'
        }
      ]
    }
  }

  const config: LczHorizontalMenuProps = {
    globalConfig: {
      currentVal: 'id',
      defaultId: { value: '1' },
      targetType: 'click',
      submenuLayout: 'horizontal',
      submenuPosition: 'bottom'
    },
    mainPanel: {
      mianGloabalConfig: {
        itemGap: 4,
        padding: {
          x: 10,
          y: 4
        }
      },
      normalStyle: {
        background: {
          display: true,
          normalBgType: 'color',
          color: c,
          imageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
        },
        textStyle: {
          fontSize: 14,
          color: '#ffffff',
          fontWeight: 'normal',
          fontFamily: '微软雅黑',
          letterSpacing: 0
        },
        border: {
          display: true,
          width: 1,
          color: '#4aff1d',
          radius: 4
        },
        inShadow: { display: true, color: '#11db5f', xOffset: 0, yOffset: 2, vague: 4, extend: 0 },
        outShadow: { display: true, color: '#e71d1d', xOffset: 0, yOffset: 0, vague: 14, extend: 0 }
      },
      hoverStyle: {
        mainHoverDisplay: true,
        background: {
          display: true,
          hoverBgType: 'color',
          color: cc,
          imageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
        },
        textStyle: {
          color: '#d711ff',
          fontFamily: '微软雅黑'
        },
        border: {
          display: true,
          width: 1,
          color: '#f3ff46',
          radius: 8
        },
        inShadow: { display: true, color: '#ff960d', xOffset: 0, yOffset: 2, vague: 4, extend: 0 },
        outShadow: { display: true, color: '#53b2ff', xOffset: 0, yOffset: 0, vague: 14, extend: 0 }
      },
      activeStyle: {
        mainActiveDisplay: true,
        background: {
          display: true,
          activeBgType: 'color',
          color: ccc,
          imageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
        },
        textStyle: {
          color: '#ff1111',
          fontFamily: '微软雅黑'
        },
        border: {
          display: true,
          width: 1,
          color: '#43f2ff',
          radius: 8
        },
        inShadow: { display: false, color: '#ff960d', xOffset: 0, yOffset: 2, vague: 4, extend: 0 },
        outShadow: { display: true, color: '#53b2ff', xOffset: 0, yOffset: 0, vague: 14, extend: 0 }
      }
    },
    subPanel: {
      subGlobalConfig: {
        width: null,
        height: null,
        lineStyle: { w: 100, h: 30 },
        itemGap: 2,
        alignment: 'left',
        yOffset: 10,
        xSubPadding: 2,
        ySubPadding: 24,
        layout: { x: 'center', y: 'center' }
      },
      background: {
        display: true,
        subPanelBgType: 'color',
        color: cc,
        imageUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg'
      },
      border: {
        display: true,
        width: 1,
        color: '#43f2ff',
        radius: 8
      },
      inShadow: { display: false, color: '#ff960d', xOffset: 0, yOffset: 2, vague: 4, extend: 0 },
      outShadow: { display: false, color: '#53b2ff', xOffset: 0, yOffset: 0, vague: 14, extend: 0 },
      horcroll: {
        display: false,
        displayType: 'all',
        trackConfig: { thickness: 6, color: '#dcff42', radius: 10 },
        sliderConfig: { size: 1, color: '#5faaff', radius: 10 }
      },
      optionLine: {
        normalStyle: {
          background: {
            display: true,
            optionLineNormalBgType: 'color',
            color: c,
            imageUrl: ''
          },
          textStyle: {
            fontSize: 12,
            color: '#ffffff',
            fontWeight: 'normal',
            fontFamily: '微软雅黑',
            letterSpacing: 0
          }
        },
        hoverStyle: {
          optionLineHoverDisplay: true,
          background: {
            display: true,
            optionLineHoverBgType: 'color',
            color: cc,
            imageUrl: ''
          },
          textStyle: {
            fontSize: 12,
            color: '#ff00aa',
            fontWeight: 'normal',
            fontFamily: '微软雅黑',
            letterSpacing: 0
          }
        },
        activeStyle: {
          optionLineActiveDisplay: true,
          background: {
            display: true,
            optionLineActiveBgType: 'color',
            color: ccc,
            imageUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
          },
          textStyle: {
            fontSize: 12,
            color: '#ff00aa',
            fontWeight: 'normal',
            fontFamily: '微软雅黑',
            letterSpacing: 0
          }
        }
      }
    }
  }

  const data = [
    {
      id: '1',
      content: '选项1',
      parentid: ''
    },
    {
      id: '2',
      content: '选项2',
      parentid: ''
    },
    {
      id: '3',
      content: '选项3',
      parentid: ''
    },
    {
      id: '4',
      content: '分类1',
      parentid: '1'
    },
    {
      id: '41',
      content: '分类11',
      parentid: '1'
    },
    {
      id: '411',
      content: '分类111',
      parentid: '1'
    },
    {
      id: '4111',
      content: '分类1111',
      parentid: '1'
    },
    {
      id: '41111',
      content: '分类11111',
      parentid: '1'
    },
    {
      id: '5',
      content: '分类2',
      parentid: '1'
    },
    {
      id: '6',
      content: '分类3',
      parentid: '3'
    },
    {
      id: '8',
      content: '分类2-1-1-2-3-4-5--8',
      parentid: '7'
    },
    {
      id: '7',
      content: '分类2-1',
      parentid: '5'
    },
    {
      id: '10',
      content: '选项4',
      parentid: ''
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 600, height: 400, margin: '40px auto', border: '1px solid white' }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && (
        <LczHorizontalMenu
          data={data}
          {...config}
          onChange={a => console.log(a, 'change')}
          onClick={a => console.log(a, 'click')}
        />
      )}
    </div>
  )
})
