import React, { memo } from 'react'
import { LczDropdown } from '../index'
import { DropdownProps } from '../LczDropdown/type'

export const T_LczDropdown = memo(() => {
  const config: DropdownProps = {
    name: { value: '下121212拉菜单' },
    trigger: 'hover',
    globalStyle: {
      fontFamily: '微软雅黑',
      fontSize: 14,
      fontWeight: 100,
      letterSpacing: 0
    },
    optionBoxConfig: {
      boxBgColor: '#246ed6',
      boxLeftOffset: 12,
      boxColor: {
        textStatus: true,
        color: 'rgba(255,255,255)'
      },
      boxBorderStyle: {
        bordered: true,
        boxBorderC: 'red',
        boxBorderW: 4,
        boxHoverBorderC: 'blue',
        boxRadius: 4
      },
      iconConfig: {
        display: true,
        type: 'custom', // system custom
        iconValue: '&#59230;|1',
        imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        iconColor: '#dd1199',
        iconSize: 16,
        imgWidth: 20,
        imgHeight: 20,
        rightOffset: 20
      }
    },
    dropdownConfig: {
      dropHeight: 100,
      dropWidth: 200,
      placement: 'bottomLeft',
      xOffset: 0,
      yOffset: 20,
      dropBgColor: '#15181C',
      dropBorderStyle: {
        display: true,
        color: '#d3e90a',
        width: 1,
        radius: 6
      },
      parentStyle: {
        rowBgColor: 'rgba(255,255,255,0)',
        rowColor: '#4A4A4A'
      },
      optionLine: {
        lineHeight: 30,
        rowSpacing: 4,
        downBoxLeftOffset: 12,
        plainStyle: {
          rowBgColor: 'rgba(255,255,255,0)',
          rowColor: '#fff'
        },
        hoverStyle: {
          hoverType: true,
          rowHoverBgColor: 'rgba(61,153,252,0.16)',
          rowHoverColor: '#fff'
        }
      },
      horcroll: {
        display: true,
        displayType: 'hover',
        trackConfig: { thickness: 6, color: 'rgba(255,0,0,1)', radius: 10 },
        sliderConfig: { size: 1, color: '#38ee00', radius: 10 }
      }
    },
    optionIcon: {
      display: true,
      occupy: true,
      width: 16,
      height: 16,
      distance: 8,
      iconSeries: [
        {
          type: '2',
          iconType: 'custom',
          moreIconValue: '&#59230;|1',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg',
          iconColor: '#C8D0D8',
          iconHoverColor: '#f00'
        },
        {
          type: '3',
          iconType: 'system',
          iconValue: 'zhuye',
          iconColor: '#C8D0D8',
          iconHoverColor: '#f00'
        },
        {
          type: '7',
          iconType: 'system',
          iconValue: 'yingyong',
          iconColor: '#C8D0D8',
          iconHoverColor: '#f00'
        },
        {
          type: '1',
          iconType: 'custom',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg'
        },
        {
          type: '5',
          iconType: 'custom',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg'
        }
      ]
    }
  }

  const data = [
    {
      id: 2,
      parentTitle: '页面一',
      content: '页面一1',
      itemGroup: true,
      type: '1'
    },
    {
      id: 2,
      parentTitle: '页面一',
      content: '页面二',
      itemGroup: false,
      type: '2'
    },
    {
      id: 21,
      parentTitle: '页面二',
      content: '页面二1',
      itemGroup: false,
      type: '3'
    },
    {
      id: 22,
      parentTitle: '页面二',
      content: '页面二2',
      itemGroup: false,
      type: '4'
    },
    {
      id: 3,
      parentTitle: '',
      content: '页面三',
      itemGroup: false,
      type: '5'
    },
    {
      id: 4,
      parentTitle: '',
      content: '页面四',
      itemGroup: false,
      type: '6'
    },
    {
      id: 14,
      parentTitle: '',
      content: '页面四1',
      itemGroup: false,
      type: '7'
    }
  ]

  return (
    <div style={{ width: 300, height: 300 }}>
      <LczDropdown {...config} data={data} onClick={a => console.log(a)} />
    </div>
  )
})

T_LczDropdown.displayName = 'T_LczDropdown'
