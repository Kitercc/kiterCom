import React from 'react'
import { LczSelect } from '../index'
import { DropDownBoxProps } from '../LczSelect/type'
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
export const T_DropDownBox = () => {
  const config: DropDownBoxProps = {
    textStyle: {
      fontFamily: 'Microsoft YaHei',
      fontSize: 12,
      fontWeight: 400,
      letterSpacing: 0
    },
    mode: 'multiple', // single multiple
    currentType: 'id',
    singleIndex: { value: 9 },
    singleId: { value: '1' },
    multipleIndex: { value: '0,1' },
    multipleId: { value: '1,2,3' },
    optionBoxConfig: {
      boxColor: {
        textStatus: true,
        color: 'rgba(255,255,255)',
        signOverflow: 'ellipsis',
        multipleOverflow: 'linefeed'
      },
      boxLeftOffset: 12,
      boxTopOffset: 8,
      boxBottomOffset: 8,
      boxBorderStyle: {
        bordered: true,
        boxBorderC: 'red',
        boxBorderW: 1,
        boxHoverBorderC: 'blue',
        boxFocusBorderC: 'yellow',
        boxRadius: 4
      },
      iconConfig: {
        display: true,
        type: 'custom', // system custom
        iconValue: '&#59230;|1',
        imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        iconColor: '#C8D0D8',
        iconSize: 16,
        imgWidth: 20,
        imgHeight: 20,
        rightOffset: 12,
        animate: true
      },
      selectIcon: {
        display: true,
        width: 14,
        height: 14,
        contSpacing: 8
      },
      tagConfig: {
        tagBgColor: 'rgba(61,153,252,0.16)',
        tagRadius: 4,
        speed: 4,
        tagBorderColor: '#3D99FC',
        tagBorderWidth: 1,
        iconColor: '#C8D0D8'
      },
      clearIcon: {
        display: true,
        size: 16,
        color: '#ccc',
        right: 12
      }
    },
    downBoxConfig: {
      pushUp: true,
      downBoxHeight: 180,
      downBoxWidth: 260,
      topOffset: 2,
      leftOffset: 10,
      downBoxBgColor: '#15181C',
      downBoxBorderStyle: {
        bordered: true,
        boxBorderC: 'red',
        boxBorderW: 1,
        boxRadius: 10
      },
      searchConfig: {
        searchStatus: true,
        topBottomMargin: 10,
        leftMargin: 12,
        height: 28,
        width: 216,
        bgColor: 'rgba(255,255,255,0)',
        iconColor: '#C8D0D8',
        textColor: '#ccc',
        borderStyle: {
          bordered: true,
          boxBorderC: '#313337',
          boxBorderW: 1,
          boxRadius: 10
        }
      },
      optionLine: {
        checkType: 'check', // check tick
        itemLineHeight: 30,
        itemRowSpacing: 2,
        downBoxLeftOffset: 20,
        plainStyle: {
          rowBgColor: 'rgba(255,255,255,0)',
          rowColor: '#fff',
          checkColor: 'rgba(103, 115, 130, 1)'
        },
        hoverStyle: { hoverType: true, rowHoverBgColor: 'rgba(255,255,255,0.1)', rowHoverColor: '#fff' },
        activeStyle: {
          activeType: true,
          rowActiveBgColor: '#ff000022',
          rowActiveColor: '#3d99fc',
          aCheckColor: '#3d99fc',
          aTickColor: '#3d99fc'
        }
      },
      horcroll: {
        display: true,
        displayType: 'hover',
        trackConfig: { thickness: 6, color: 'rgba(255,0,0,.1)', radius: 10 },
        sliderConfig: { size: 1, color: 'rgba(98,104,111,1)', radius: 10 }
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
          iconType: 'custom',
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
          iconType: 'system',
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
    {
      id: 1,
      content:
        '选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一选项一',
      type: '1'
    },
    { id: 2, content: '选项二', type: '2' },
    { id: 3, content: '选项三', type: '' },
    { id: 4, content: '选项四', type: '' },
    { id: 5, content: '选项五', type: '' }
  ]

  return (
    <div style={{ width: 300, transform: 'translate(10px, 100px)' }}>
      <LczSelect
        {...config}
        data={data}
        xOffset={10}
        onChange={a => console.log(a, 'change')}
        onClick={a => console.log(a, 'click')}
      />
    </div>
  )
}
