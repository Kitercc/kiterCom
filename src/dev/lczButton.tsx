import React from 'react'
import { LczButton } from '../index'

export const T_LczButton = () => {
  const config = {
    align: 'center',
    horiOffset: 0,
    vertOffset: 0,
    radius: 2,
    commonStyle: {
      borderColor: 'rgba(255,0,0,1)',
      borderWidth: 1,
      bgConfig: {
        display: true,
        type: 'color', // color image
        color: '#3D99FC',
        imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp'
      },
      textConfig: {
        display: true,
        defaultValue: '按钮',
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: 'rgba(255,255,255,1)',
        fontWeight: 400,
        letterSpacing: 1
      },
      iconConfig: {
        display: true,
        size: 26,
        width: 28,
        height: 28,
        iconPosition: 'left',
        horiOffset: 10,
        vertOffset: 0,
        iconType: 'custom', //system 系统  custom 自定义
        iconValue: '&#59230;|1',
        imageUrl: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
        fillColor: '#b43434'
      }
    },
    hoverStyle: {
      display: true,
      borderColor: '#00ff22',
      borderWidth: 1,
      hoverBgConfig: {
        display: true,
        color: '#3d99fca2',
        imageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
      },
      hoverTextConfig: {
        display: false,
        fontFamily: 'Microsoft YaHei',
        fontSize: 24,
        color: '#23f11c',
        fontWeight: 900,
        letterSpacing: 2
      },
      hoverIconConfig: {
        display: true,
        width: 0,
        height: 0,
        size: 0,
        horiOffset: 30,
        vertOffset: 0,
        fillColor: '#fff',
        imageUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
      }
    }
  }

  const data = [
    {
      value: 'sdssd'
    }
  ]

  const onClick = data => {
    console.log(data)
  }

  return (
    <div style={{ width: 200, height: 60 }}>
      <LczButton {...config} data={data} onClick={onClick} />
    </div>
  )
}
