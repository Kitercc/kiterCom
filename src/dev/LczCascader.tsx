import React from 'react'
import { LczCascader } from '..'
import { LczCascaderProps } from '../LczCascader/type'

const colorStr = {
  selected: 'single',
  single: 'rgba(255, 255, 255, 0.1)',
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
export const T_LczCascader = function () {
  const config: LczCascaderProps = {
    gloablConfig: {
      trigger: 'click',
      changeOnSelect: true,
      checkCondition: '',
      displayType: 'system',
      search: true,
      saveState: true,
      defaultId: { value: '320102' }, // 320102 330100
      gloablTextStyle: { fontFamily: '微软雅黑', letterSpacing: 0 }
    },
    optionConfig: {
      height: undefined,
      angle: 80,
      borderConfig: {
        display: true,
        color: 'yellow',
        width: 1,
        hoverColor: '#f00',
        focusColor: '#15d835'
      },
      bgConfig: {
        display: true,
        bgType: 'color',
        bgColor: colorStr,
        imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        radius: 8,
        focusStyle: {
          display: false,
          focusBgType: 'custom',
          bgColor: colorStr,
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          radius: 2
        },
        hoverStyle: {
          display: false,
          hoverBgType: 'custom',
          bgColor: colorStr,
          imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
          radius: 2
        }
      },
      textConfig: {
        display: true,
        placeholder: '请选择',
        onlyLast: false,
        pathDivision: '/',
        customContent: {
          value: '自定义内容'
        },
        contentLeft: 12,
        textAlign: 'left',
        textStyle: {
          fontSize: 20,
          color: '#53ff3c',
          fontWeight: 'normal'
        },
        focusStyle: {
          display: false,
          color: '#ff0909',
          fontWeight: 'bold'
        },
        hoverStyle: {
          display: false,
          color: '#5fecff',
          fontWeight: 'bold'
        }
      },
      arrowDown: {
        display: true,
        arrowType: 'custom', // system custom
        iconValue: '&#59230;|1',
        imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        iconColor: '#C8D0D8',
        iconSize: 16,
        imgWidth: 20,
        imgHeight: 20,
        rightOffset: 12,
        animate: true
      },
      clearIcon: { display: true, size: 16, color: '#CCCCCC', right: 12 }
    },
    panelConfig: {
      height: 160,
      width: 160,
      yoffset: 0,
      xOffset: 0,
      padding: {
        x: 0,
        y: 10
      },
      panelBgConfig: {
        display: true,
        bgColor: '#15181C',
        radius: 0
      },
      panelBorderConfig: { display: true, color: '#313337', width: 1 },
      optionLine: {
        rowHeight: 40,
        rowSpacing: 10,
        fontSize: 14,
        lineMargin: 10,
        shownum: false,
        plainStyle: {
          rowNormalBgType: 'color',
          rowBgColor: colorStr,
          imageUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg',
          rowColor: '#FFFFFF',
          arrowColor: '#CCCCCC',
          fontWeight: 'normal'
        },
        hoverStyle: {
          hoverType: false,
          rowHoverBgType: 'custom',
          bgColor: colorStr,
          imageUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg',
          arrowColor: '#15a4f78b',
          color: '#15a4f78b',
          fontWeight: '900'
        },
        activeStyle: {
          activeType: true,
          rowActiveBgType: 'custom',
          bgColor: colorStr,
          imageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          arrowColor: '#CCCCCC',
          color: '#da2a2a',
          fontWeight: '900',
          tickColor: '#3D99FC'
        }
      },
      horcroll: {
        display: false,
        displayType: 'all',
        trackConfig: { thickness: 6, color: 'rgba(255,0,0,1)', radius: 10 },
        sliderConfig: { size: 1, color: '#38ee00', radius: 10 }
      }
    }
  }
  const data = [
    {
      id: '330000',
      content: '浙江省',
      parentid: ''
    },
    {
      id: '320000',
      content: '江苏省',
      parentid: ''
    },
    {
      id: '330100',
      content: '杭州市',
      parentid: '330000'
    },
    {
      id: '320100',
      content: '南京市',
      parentid: '320000'
    },
    {
      id: '330106',
      content: '西湖区',
      parentid: '330100'
    },
    {
      id: '320102',
      content: '玄武区',
      parentid: '320100'
    },
    {
      id: '1',
      content: '玄武区1',
      parentid: ''
    },
    {
      id: '11',
      content: '玄武区11',
      parentid: '1'
    },
    {
      id: '111',
      content: '玄武区111',
      parentid: '11'
    },
    {
      id: '2',
      content: '玄武区2',
      parentid: ''
    },
    {
      id: '22',
      content: '玄武区22',
      parentid: '2'
    },
    {
      id: '222',
      content: '玄武区222',
      parentid: '22'
    },
    {
      id: '3',
      content: '玄武区3',
      parentid: ''
    },
    {
      id: '33',
      content: '玄武区33',
      parentid: '3'
    },
    {
      id: '331',
      content: '玄武区331',
      parentid: '3'
    },
    {
      id: '332',
      content: '玄武区332',
      parentid: '3'
    },
    {
      id: '3321',
      content: '玄武区3321',
      parentid: '3'
    },
    {
      id: '333',
      content: '玄武区333',
      parentid: '33'
    }
  ]

  return (
    <div style={{ width: 300, height: 200, margin: '100px auto' }}>
      <LczCascader
        id='lcz-cascader-1skcacannaic'
        design={false}
        {...config}
        data={data}
        onChange={par => console.log(par)}
      />
    </div>
  )
}
