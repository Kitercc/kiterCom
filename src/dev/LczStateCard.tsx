import React, { memo, useState } from 'react'
import { LczStateCard } from '../index'
import { StateCardProps } from '../LczStateCard/type'

export const T_LczStateCard = memo(function T_LczStateCard() {
  const config: StateCardProps = {
    globalConfig: {
      alignmentType: 'lt',
      ArrangementMode: 'horizontal', // horizontal 横向 portrait 纵向
      horizontalNumber: 2,
      portraitNumber: 2,
      horiSpeed: 50,
      portSpeed: 100,
      overflow: 'animate',
      textNumberSpeed: 10,
      animateConfig: {
        animate: {
          updataNum: 1,
          switchSpeed: 300,
          timeInterval: 3,
          movePause: true
        },
        pager: {
          display: true,
          vertPosition: 'right',
          horiPosition: 'bottom',
          xOffset: 0,
          yOffset: 20,
          wdith: 18,
          height: 18,
          radios: 4,
          speed: 4,
          defaultColor: '#16f7ff4b',
          activeColor: '#fc4a3d'
        }
      }
    },
    fontStyle: {
      showWidth: null,
      textAlign: 'center',
      fontFamily: 'PingFangSC-Regular',
      fontSize: 16,
      color: '#0affa1',
      fontWeight: 'normal',
      letterSpacing: 0
    },
    hoverFontStyle: {
      display: true,
      color: '#efff09',
      fontWeight: 'bold'
    },
    numberStyle: {
      display: true,
      showWidth: null,
      textAlign: 'left',
      numberFormat: {
        display: false,
        decollate: false,
        decimal: 2,
        round: false,
        percentage: false,
        negativeing: 'minus'
      },
      fontStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 18,
        color: '#ff6c0a',
        fontWeight: 'normal',
        letterSpacing: 0
      },
      sectionStyle: [
        { min: -30, max: 90, colorConfig: { display: true, color: '#fa09ee' }, fontWeight: 400, fontSize: 24 },
        { min: 30, max: 90, colorConfig: { display: true, color: '#c79bc5' }, fontWeight: 400, fontSize: 24 }
      ],
      suffix: {
        display: true,
        content: '后缀',
        yOffset: 2,
        fontStyle: {
          fontFamily: 'PingFangSC-Regular',
          fontSize: 12,
          color: '#0dffcb',
          fontWeight: 'normal',
          letterSpacing: 0
        }
      }
    },
    numberHoverStyle: {
      display: false,
      color: '#f00',
      fontWeight: 'bold',
      suffix: {
        display: true,
        color: '#f00',
        fontWeight: 'bold'
      }
    },
    markStyle: {
      position: 'left',
      speed: 8,
      width: 30,
      height: 20,
      radius: 0,
      rotate: 0,
      normalMaskStyle: {
        markType: 'custom',
        iconValue: '&#59230;|1',
        iconColor: '#d82626',
        imgUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg'
      }
    },
    stateCategory: [
      {
        state: '使用中',
        markType: 'custom',
        iconValue: '',
        iconColor: '',
        imgUrl: 'https://pic1.zhimg.com/80/v2-4af581163d11d760c7347265459d04c1_720w.jpg'
      },
      {
        state: '已停用',
        markType: 'custom',
        iconValue: '',
        iconColor: '',
        imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
      },
      {
        state: '已注销',
        markType: 'custom',
        iconValue: '',
        iconColor: '',
        imgUrl: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
      }
    ]
  }

  const data = [
    {
      status: '使用中',
      name: '账号001：使用中',
      value: 213
    },
    {
      status: '已停用',
      name: '账号002：已停用',
      value: 123
    },
    {
      status: '已注销',
      name: '账号003：已注销',
      value: -23
    },
    {
      status: '已注销',
      name: '账号004：已注销',
      value: -23
    },
    {
      status: '已注销',
      name: '账号005：已注销',
      value: -23
    },
    {
      status: '已注销',
      name: '账号006：已注销',
      value: -23
    }
  ]

  const [show, setShow] = useState(true)
  return (
    <div style={{ width: 500, height: 200, border: '1px solid #fff' }}>
      <button onClick={() => setShow(!show)}>按钮</button>
      {show && <LczStateCard w={500} h={200} {...config} data={data} onClick={a => console.log(a)} />}
    </div>
  )
})
