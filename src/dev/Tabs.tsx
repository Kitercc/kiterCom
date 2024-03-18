import React from 'react'
import { LczTabBar } from '../index'
import { TabsProps } from '../LczTabBar/type'

const colorStr = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#451197'
      },
      {
        begins: 0,
        value: '#e9d9d9'
      }
    ]
  }
}

const colorStr2 = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#320dd3'
      },
      {
        begins: 0,
        value: '#00ff95'
      }
    ]
  }
}

const colorStr3 = {
  selected: 'gradient',
  single: 'rgba(255,0,0,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#ff0a3f'
      },
      {
        begins: 0,
        value: '#8400ff'
      },
      {
        begins: 0,
        value: '#2bff00'
      }
    ]
  }
}

export const T_LczTabBar = () => {
  const config: TabsProps = {
    type: 'index', //id index
    index: { value: 0 },
    defaultId: { value: 1 },
    tabCarousel: {
      display: true,
      stopCondition: '',
      interval: 5000,
      clickInterval: 5000
    },
    tabsConfig: {
      globalConfig: {
        tabType: 'ord', // ord roll multi
        tabSize: {
          rollWidthOrHeight: 130,
          multiH: 30,
          selfAdaption: false,
          contentSpacing: 0
        },
        rollArrangement: 'horizontal', // horizontal   vertical
        ordArrangement: 'horizontal', // horizontal   vertical
        spacing: 9,
        rowSpacing: 2,
        // tabBgColor: '#eee',
        textStyle: {
          alignType: 'center',
          verticalType: 'center', // 'left' | 'center' | 'right'
          fontFamily: 'Microsoft YaHei',
          letterSpacing: 0,
          noSelfDiscountLine: { status: false, noSelfType: 'character', strNum: 2 }, // 字符 character  实际长度 widthAdaption
          selfDiscountLine: { status: false, selfType: 'character', strNum: 3 } // 字符 character
        },
        iconConfig: {
          display: true,
          iconPosition: 'left', //'left' | 'right'|'top'| 'bottom'
          valSpeed: 8,
          width: 16,
          height: 16,
          normalIcon: {
            display: true,
            iconType: 'custom',
            // system
            iconValue: '&#59230;|1',
            systemNormal: { color: colorStr2 },
            systemHover: { display: true, color: colorStr2 },
            systemFocus: { display: true, color: colorStr },
            systemFocusHover: { display: true, color: colorStr3 },
            //custom
            customNormal: { imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp' },
            customHover: {
              display: true,
              imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
            },
            customFocus: {
              display: true,
              imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
            },
            customFocusHover: {
              display: false,
              imgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
            }
          },
          iconStyleSeries: [
            {
              id: '',
              iconType: 'custom',
              // system
              iconValue: '&#59230;|1',
              systemNormal: { color: colorStr2 },
              systemHover: { display: true, color: colorStr2 },
              systemFocus: { display: true, color: colorStr },
              systemFocusHover: { display: true, color: colorStr3 },
              //custom
              customNormal: { imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp' },
              customHover: {
                display: true,
                imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
              },
              customFocus: {
                display: true,
                imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
              },
              customFocusHover: {
                display: false,
                imgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
              }
            }
          ]
        },
        iconArrowConfig: {
          display: true,

          scrollWay: 'toNumber', //'toDistance' | 'toNumber'
          scrollDistance: 200,
          scrollNumber: 2,
          spacing: 10,
          offset: 0,
          resources: 'system', // system 系统 custom 自定义

          type: 'zuo1',
          size: 30,
          colorObj: colorStr,

          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          imgWidth: 24,
          imgHeight: 24,

          arrowHoverStyle: {
            display: true,
            arrowHoverColor: colorStr3,
            arrowHoverImg: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
          },
          arrowDisabledStyle: {
            display: false,
            opacity: 100,
            styleSync: false,
            arrowDisabledColor: colorStr2,
            arrowDisabledImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          }
        }
      },
      ordStyleConfig: {
        ordTextConfig: {
          fontFamily: '微软雅黑',
          fontSize: 20,
          newcolor: colorStr,
          fontWeight: 400
        },
        bgConfig: {
          display: false,
          ordtype: 'image',
          color: colorStr,
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        ordBorderStyle: {
          borderd: true,
          borderColor: 'yellow',
          borderWidth: 1,
          borderRadius: 0
        },
        inShadow: { display: true, color: '#e619197f', x: 0, y: 2, vague: 4, extend: 0 },
        outShadow: { display: true, color: '#91e7057e', x: 0, y: 2, vague: 4, extend: 0 },
        ordHoverStyle: {
          ordHoverStatus: true,
          ordTextHover: {
            hoverStatus: true,
            fontFamily: '微软雅黑',
            fontSize: 22,
            newcolor: colorStr2,
            fontWeight: 400
          },
          Hoverbackground: '#4e3939',
          HoverborderColor: 'pink',
          HoverborderWidth: 1
        }
      },
      focusStyleConfig: {
        focusTextConfig: { fontFamily: '微软雅黑', fontSize: 20, newcolor: colorStr3, fontWeight: 400 },
        focusBg: {
          display: false,
          focustype: 'color',
          color: colorStr,
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        focusBorderStyle: { borderd: false, focusBorderColor: 'blue', focusBorderWidth: 1, focusBorderRadius: 10 },
        inShadow: { display: false, color: '#ff4810dd', x: 0, y: 2, vague: 4, extend: 0 },
        outShadow: { display: false, color: '#0084ff7e', x: 0, y: 2, vague: 10, extend: 0 },
        focusHoverStyle: {
          focusStatus: false,
          focusTextHover: {
            hoverStatus: false,
            fontFamily: '微软雅黑',
            fontSize: 22,
            newcolor: '#1ae62b',
            fontWeight: 400
          },
          focusHoverBg: {
            display: true,
            focusHovertype: 'image',
            color: colorStr,
            imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          },
          focusHoverBorderColor: 'green',
          focusHoverBorderWidth: 4
        },
        glideLine: {
          display: true,
          bgColor: 'pink',
          width: 4
        }
      }
    },
    remarkConfig: {
      display: true,
      xPosition: 'top', //'top' 'bottom'
      yPosition: 'left', // 'left' | 'right'
      xoffset: 4,
      yoffset: 4,
      maxWidth: null,
      maxHeight: null,
      bgColor: 'blue',
      radius: 10,
      textStyle: {
        fontFamily: '微软雅黑',
        fontSize: 16,
        newcolor: 'yellow',
        fontWeight: 'normal',
        letterSpacing: 0
      }
    }
  }
  const data = [
    { id: 1, content: '选项一', remark: '这是爱是感动哈根世界很多国家哈三个等级很高1' },
    { id: 2, content: '选项二', remark: '这是1' },
    { id: 3, content: '选项三', remark: '这是1' },
    { id: 4, content: '选项四', remark: '这是1' },
    { id: 5, content: '选项五', remark: '这是1' },
    { id: 6, content: '选项六', remark: '这是1' }
  ]

  function onClick(item, i) {
    console.log(item, i, 'onclick')
  }

  function onchange(item, index) {
    console.log(item, index, 'onchange')
  }

  return (
    <div style={{ width: 410, height: 100 }}>
      <LczTabBar {...config} data={data} onClick={onClick} onChange={onchange} />
    </div>
  )
}
