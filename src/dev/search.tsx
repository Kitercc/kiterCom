import React, { memo } from 'react'
import { LczSearch } from '../'
import { SearchProps } from '../LczSearch/type'

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

export const T_LczSearch = memo(function T_LczSearch() {
  const config: SearchProps = {
    radius: 20,
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
      position: 'left',
      speed: 14,
      color: '#3d99fc',
      size: 24
    },
    outShadow: { display: true, color: '#e71d1d7f', xOffset: 0, yOffset: 0, vague: 4, extend: 0 },
    inShadow: { display: true, color: '#11db5e7f', xOffset: 0, yOffset: 2, vague: 4, extend: 0 }
  }

  const data = [{ value: '哈1111哈哈' }]
  return (
    <div style={{ width: 400, height: 50 }}>
      <LczSearch {...config} data={data} onChange={val => console.log(val)} />
    </div>
  )
})
