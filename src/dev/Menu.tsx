import React, { memo } from 'react'
import { LczNavigationMenu } from '../'
import { NavigationMenuProps } from '../LczNavigationMenu/type'

const colorStr1 = {
  selected: 'single',
  single: '#20252B',
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

const colorStr2 = {
  selected: 'single',
  single: '#12349c',
  gradient: {
    gradualAngle: 0,
    colors: [
      {
        begins: 0,
        value: '#f17c1c'
      },
      {
        begins: 0,
        value: '#8400ff'
      }
    ]
  }
}

export const T_Menu = memo(function T_Menu() {
  const config: NavigationMenuProps = {
    globalConfig: {
      currentVal: 'id',
      defaultId: { value: '11' },
      submenuShow: 'inline',
      expandCurrent: false,
      contentLeftOffset: 20,
      childPanel: {
        space: 10,
        width: 160,
        borderConfig: {
          display: false,
          color: '#d85904',
          width: 1
        },
        outShadow: {
          display: false,
          color: '#fa2b2b7f',
          x: 0,
          y: 0,
          vague: 4,
          extend: 10
        }
      },
      margin: {
        top: 8,
        bottom: 8
      },
      bgConfig: {
        display: true,
        rootBg: colorStr1,
        childBg: colorStr2
      },
      borderConfig: {
        display: false,
        width: 4,
        color: '#f00'
      },
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        letterSpacing: 0,
        groupStyle: {
          fontSize: 14,
          color: '#ff792c',
          fontWeight: 'normal'
        }
      },
      horcroll: {
        display: false,
        displayType: 'all',
        trackConfig: { thickness: 6, color: '#dcff42', radius: 10 },
        sliderConfig: { size: 1, color: '#5faaff', radius: 10 }
      }
    },
    rowStyle: {
      rowHeight: 48,
      rowSpacing: 10,
      indent: 20,
      iconTextSpace: 8,
      ordStyle: {
        arrow: {
          rightOffset: 16,
          type: 'linear',
          size: 16,
          color: '#cccccc'
        },
        ordTextStyle: {
          fontSize: 14,
          color: '#dbe9d8',
          fontWeight: 'normal'
        }
      },
      hoverStyle: {
        display: true,
        rowBg: '#ff080819',
        arrowColor: '#8b1212',
        hoverFontStyle: {
          display: true,
          fontSize: 16,
          color: '#fc893d',
          fontWeight: 'normal'
        }
      },
      focusStyle: {
        display: true,
        rowBg: 'rgba(61, 153, 252, 0.2)',
        arrowColor: '#3D99FC',
        tagLine: {
          display: true,
          position: 'right',
          color: '#3D99FC',
          width: 2
        },
        focusFontStyle: {
          display: true,
          fontSize: 14,
          color: '#3d99fc',
          fontWeight: 'normal'
        }
      }
    },
    iconConfig: {
      display: true,
      occupy: true,
      width: 16,
      height: 16,
      iconSeries: [
        {
          id: '2',
          type: 'custom',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
          focusImgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
        },
        {
          id: '3',
          type: 'more',
          iconValue: 'zhuye',
          moreIconValue: '&#59230;|1',
          iconColor: '#C8D0D8',
          iconFocusColor: '#3D99FC',
          iconHoverColor: '#f00'
        },
        {
          id: '7',
          type: 'system',
          iconValue: 'yingyong',
          iconColor: '#C8D0D8',
          iconFocusColor: '#c4f120',
          iconHoverColor: '#f00'
        },
        {
          id: '1',
          type: 'custom',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
          focusImgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
        },
        {
          id: '4',
          type: 'custom',
          imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
          hoverImgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c',
          focusImgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c'
        }
      ]
    }
  }

  const data = [
    {
      id: 1,
      content: '选项1',
      parentid: '',
      ofgroup: '分类1212'
    },
    {
      id: 111,
      content: '选项11',
      parentid: '',
      ofgroup: '分类1212'
    },
    {
      id: 2,
      content: '选项2',
      parentid: '',
      ofgroup: ''
    },
    {
      id: 3,
      content: '选项3',
      parentid: '',
      ofgroup: ''
    },
    {
      id: 31,
      content: '选项31',
      parentid: '',
      ofgroup: ''
    },
    {
      id: 4,
      content: '分类1',
      parentid: '',
      ofgroup: ''
    },
    {
      id: 5,
      content: '分类2',
      parentid: '',
      ofgroup: ''
    },
    {
      id: 6,
      content: '选项4',
      parentid: 4,
      ofgroup: '分组1'
    },
    {
      id: 7,
      content: '选项5',
      parentid: 4,
      ofgroup: '分组1'
    },
    {
      id: 8,
      content: '选项6',
      parentid: 7,
      ofgroup: ''
    },
    {
      id: 9,
      content: '选项7',
      parentid: 4,
      ofgroup: '分组2'
    },
    {
      id: 91,
      content: '选项71',
      parentid: 4,
      ofgroup: '分组2'
    },
    {
      id: 10,
      content: '选项8',
      parentid: 5,
      ofgroup: ''
    },
    {
      id: 11,
      content: '分类2-1',
      parentid: 5,
      ofgroup: ''
    },
    {
      id: 12,
      content: '选项9',
      parentid: 10,
      ofgroup: ''
    },
    {
      id: 13,
      content: '选项10',
      parentid: 10,
      ofgroup: ''
    }
  ]

  return (
    <div style={{ width: 300, height: 500 }}>
      <LczNavigationMenu
        {...config}
        data={data}
        onClick={a => console.log(a, 'onClick')}
        onChange={a => console.log(a, 'onChange')}
      />
    </div>
  )
})
