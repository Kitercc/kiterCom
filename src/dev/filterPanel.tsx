import React from 'react'
import { LczFilterPanel } from '../index'
import { FilterPanelProps } from '../LczFilterPanel/type'
const color = {
  selected: 'single',
  single: 'rgba(61, 153, 252,1)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(61, 153, 252,1)'
      }
    ]
  }
}

export const T_LczFilterPanel = () => {
  const config: FilterPanelProps = {
    mode: 'multiple', // single multiple

    type: 'index',
    singleIndex: { value: 1 },
    singleId: { value: '4' },
    multipleIndex: { value: '' },
    multipleId: { value: '' },

    autoHide: true,
    outHide: true,
    bgConfig: {
      boxBgColor: 'rgba(21, 24, 28, 1)',
      boxImage: '',
      boxBorderW: 1,
      boxBorderC: 'rgba(49, 51, 55, 1)',
      boxRadius: 2
    },
    arrowConfig: {
      display: true,
      position: 'top',
      offset: 0,
      size: 10
    },
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontWeight: 0,
      letterSpacing: 0
    },
    searchConfig: {
      searchStatus: true,
      topBottomMargin: 12,
      leftMargin: 12,
      height: 28,
      bgColor: 'rgba(255,255,255,0)',
      iconColor: '#C8D0D8',
      textColor: '#FFFFFF',
      boxBorderC: '#333731',
      boxBorderW: 1,
      boxFontSize: 20,
      radius: 0
    },
    optionLine: {
      checkType: 'check', // check tick
      itemLineHeight: 30,
      itemRowSpacing: 4,
      downBoxLeftOffset: 12,
      plainStyle: { rowBgColor: 'rgba(255,255,255,0)', fontSize: 16, rowColor: '#fff', checkColor: '#677382' },
      hoverStyle: {
        hoverType: true,
        rowHoverBgColor: 'rgba(61, 153, 252, 0.16)',
        rowHoverColor: '#fff'
      },
      activeStyle: {
        activeType: true,
        rowActiveBgColor: '#15181C',
        rowActiveColor: '#3D99FC',
        aCheckColor: '#3D99FC',
        aTickColor: '#3D99FC'
      }
    },
    optionIcon: {
      occupy: true,
      contSpacing: 8,
      width: 16,
      height: 16,
      iconSeries: [
        {
          type: '1',
          iconType: 'system',
          iconValue: '&#59230;|1',
          normalColor: color,
          hoverColor: { display: true, value: { ...color, single: 'red' } },
          focusColor: { display: true, value: { ...color, single: 'skyblue' } },
          normalImgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: {
            display: true,
            value: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
          },
          focusImgUrl: {
            display: true,
            value: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
          }
        },
        {
          type: '2',
          iconType: 'custom',
          iconValue: '&#59230;|1',
          normalColor: { ...color, single: 'red' },
          hoverColor: { display: true, value: { ...color, single: 'green' } },
          focusColor: { display: true, value: { ...color, single: 'skyblue' } },
          normalImgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
          hoverImgUrl: {
            display: true,
            value: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
          },
          focusImgUrl: {
            display: true,
            value: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
          }
        }
      ]
    }
  }

  const data = [
    { id: 1, content: '菜单一', type: '1' },
    { id: 2, content: '菜单二', type: '1' },
    { id: 3, content: '菜单三', type: '2' },
    { id: 4, content: '菜单四', type: '' },
    { id: 5, content: '菜单五', type: '' }
  ]

  return (
    <>
      <div style={{ width: 300, height: 300, margin: 10 }}>
        <LczFilterPanel
          {...config}
          w={300}
          h={300}
          data={data}
          onChange={(a, b) => {
            console.log(a, b)
          }}
        />
      </div>
    </>
  )
}
