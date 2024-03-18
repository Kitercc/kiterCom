import React, { memo } from 'react'
import { LczTextSearch } from '../'
import { TextSearchProps } from '../LczTextSearch/type'

const colorObj = {
  selected: 'single',
  single: 'rgba(61,153,252,0.2)',
  gradient: {
    gradualAngle: 0,
    colors: [
      {
        begins: 0,
        value: 'rgba(255,255,255,1)'
      },
      {
        begins: 100,
        value: '#ff0000'
      }
    ]
  }
}

export const T_LczTextSearch = memo(function T_LczTextSearch() {
  const config: TextSearchProps = {
    enterSearch: true,
    radius: 20,
    searchConfig: {
      unfoldWay: 'clickUnfold', //'allUnfold' | 'clickUnfold'
      packWidth: 110,
      unfoldDirection: 'right', //'left' | 'right'
      searchPack: true
    },
    placeholderConfig: {
      display: true,
      text: '搜索…',
      placeTextStyle: {
        fontFamily: 'PingFangSC-Regular',
        fontSize: 16,
        color: '#e99e14',
        fontWeight: 'normal',
        letterSpacing: 0
      }
    },
    textStyle: {
      fontFamily: 'PingFangSC-Regular',
      fontSize: 16,
      color: '#d41818',
      fontWeight: 'normal',
      letterSpacing: 0
    },
    bgConfig: {
      display: true,
      color: colorObj
    },
    borderConfig: { display: true, color: 'rgba(61,153,252,0.6)', width: 1, focusColor: '#fca93d' },
    searchIcon: {
      display: true,
      position: 'left', //'left' | 'right'
      speed: 14,
      color: '#3d99fc',
      size: 24
    },
    emptyIcon: {
      display: true,
      size: 12,
      color: '#C8D0D8'
    },
    optionsPanel: {
      display: true,
      displayMode: 'nullAll', //'nullAll' | 'nullNone'
      topOffset: 12,
      height: 180,
      borderRadius: 4,
      bgConfig: {
        display: true,
        bgColor: 'pink',
        img: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
      },
      borderConfig: {
        display: true,
        color: 'yellow',
        width: 2
      },
      backGauge: {
        display: true,
        top: 12,
        bottom: 20
      },
      lineOptions: {
        lineHeight: 30,
        lineSpace: 10,
        margin: 16,
        textStyle: { fontFamily: 'PingFangSC-Regular', fontWeight: 'normal', letterSpacing: 0 },
        normalStyle: {
          lineBgColor: 'green',
          color: 'blue',
          fontSize: 16
        },
        hoverStyle: {
          display: true,
          lineBgColor: '#294461',
          color: '#FFFFFF',
          fontSize: 16
        }
      },
      outShadow: { display: false, color: '#e71d1d7f', xOffset: 12, yOffset: 0, vague: 24, extend: 0 },
      inShadow: { display: true, color: '#730dc77c', xOffset: 12, yOffset: 2, vague: 24, extend: 0 },
      horcroll: {
        display: true,
        displayType: 'hover',
        trackConfig: { thickness: 6, color: 'rgba(255,0,0,1)', radius: 10 },
        sliderConfig: { size: 1, color: '#38ee00', radius: 10 }
      }
    },
    outShadow: { display: false, color: '#e71d1d7f', xOffset: -10, yOffset: 0, vague: 4, extend: 0 },
    inShadow: { display: false, color: '#11db5e7f', xOffset: 10, yOffset: 2, vague: 4, extend: 0 }
  }

  const data = [
    {
      id: 1,
      value: '',
      content: '   '
    },
    {
      id: 2,
      content: '选项二啊实打实水水水水'
    },
    {
      id: 3,
      content: '选项三水水水水水水水'
    },
    {
      id: 4,
      content: '选项四'
    },
    {
      id: 5,
      content: '选项五'
    }
  ]
  return (
    <div style={{ width: 400, height: 40, margin: '20px auto' }}>
      <LczTextSearch
        h={40}
        {...config}
        data={data}
        onChange={val => console.log(val)}
        onClick={val => console.log(val, 'click')}
      />
    </div>
  )
})
