import React, { memo } from 'react'
import { LczDirectoryTree } from '../'
import { TreeProps } from '../LczDirectoryTree/type'

const colorStr1 = {
  selected: 'single',
  single: '#2B323B',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      },
      {
        begins: 100,
        value: 'rgba(255,0,0,1)'
      }
    ]
  }
}
const colorStr2 = {
  selected: 'single',
  single: 'rgba(61, 153, 252, 0.2)',
  gradient: {
    gradualAngle: 90,
    colors: [
      {
        begins: 0,
        value: '#3284ff'
      },
      {
        begins: 0,
        value: 'rgba(255,0,0,1)'
      }
    ]
  }
}

export const T_directoryTree = memo(function DirectoryTree() {
  const config: TreeProps = {
    globalConfig: {
      current: 'first',
      defaultId: { value: '8' },
      isleafVal: '1',
      parentSelect: false,
      accordionMode: false,
      connectLine: {
        display: true,
        color: 'red',
        width: 1
      },
      horcroll: {
        display: true,
        displayType: 'hover',
        trackConfig: { thickness: 6, color: '#dcff42', radius: 10 },
        sliderConfig: { size: 1, color: '#5faaff', radius: 10 }
      }
    },
    searchConfig: {
      display: true,
      height: 32,
      speed: 12,
      textBox: {
        bgColor: '#15181C',
        btnColor: '#CCCCCC',
        borderConfig: {
          display: true,
          color: '#313337',
          width: 1,
          hoverColor: '#3D99FC',
          focusColor: '#3D99FC'
        },
        searchTextStyle: {
          placeholder: '搜索',
          fontSize: 13,
          placeholderColor: '#287eee',
          textColor: '#D8E0E9',
          mateColor: '#3D99FC',
          fontWeight: 'normal'
        }
      }
    },
    arrowConfig: {
      speed: 8,
      size: 16,
      icon: 'filled',
      color: '#C8D0D8',
      hoverColor: '#dd03fa',
      focusColor: '#3D99FC'
    },
    lineStyle: {
      indent: 20,
      lineHeight: 32,
      lineSpeed: 0,
      hoverBgColor: colorStr1,
      focusBgColor: colorStr2
    },
    styleConfig: {
      fontSize: 14,
      color: '#D8E0E9',
      fontWeight: 'normal',
      hoverStyle: {
        display: true,
        fontSize: 14,
        color: '#14e425',
        fontWeight: 'normal'
      },
      focusStyle: {
        display: true,
        fontSize: 14,
        color: '#3D99FC',
        fontWeight: 'normal'
      }
    },
    iconConfig: {
      display: true,
      width: 16,
      height: 16,
      parentNode: {
        display: true,
        parentNodeType: 'system',
        stowed: {
          iconValue: 'wenjianjiastowed',
          color: '#D8D8D8',
          hoverColor: '#D8D8D8',
          focusColor: '#3D99FC',
          imgUrl: 'https://pica.zhimg.com/80/v2-feafb48c4f49bf2ad3793d42a58d456c_720w.jpg?source=1940ef5c',
          hoverImgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
          focusImgUrl: ''
        },
        expand: {
          iconValue: 'wenjianjiaexpand',
          color: '#D8D8D8',
          hoverColor: '#D8D8D8',
          focusColor: '#3D99FC',
          imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
          hoverImgUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg',
          focusImgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
        }
      },
      childNode: {
        nodeType: 'system',
        iconValue: '&#845715;|1',
        color: '#D8D8D8',
        hoverColor: '#22ff47',
        focusColor: '#3D99FC',
        imgUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
        hoverImgUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg',
        focusImgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
      }
    }
  }
  const data = [
    {
      id: 1,
      content: '选项1',
      parentid: '',
      isleaf: '2'
    },
    {
      id: 2,
      content: '选项2',
      parentid: '',
      isleaf: '2'
    },
    {
      id: 3,
      content: '选项3',
      parentid: '',
      isleaf: '2'
    },
    {
      id: 4,
      content: '选项1-1',
      parentid: 1,
      isleaf: '2'
    },
    {
      id: 5,
      content: '选项1-2',
      parentid: 1,
      isleaf: '2'
    },
    {
      id: 6,
      content: '选项1-3',
      parentid: 1,
      isleaf: '2'
    },
    {
      id: 7,
      content: '选项1-1-1',
      parentid: 4,
      isleaf: '2'
    },
    {
      id: 71,
      content: '选项1-1-1-1',
      parentid: 7,
      isleaf: '1'
    },
    {
      id: 8,
      content: '选项1-1-2',
      parentid: 4,
      isleaf: '1'
    },
    {
      id: 9,
      content: '选项2-1',
      parentid: 2,
      isleaf: '1'
    }
  ]
  return (
    <div style={{ width: 360, height: 320 }}>
      <LczDirectoryTree {...config} data={data} onClick={a => console.log(a)} onChange={a => console.log(a)} />
    </div>
  )
})
