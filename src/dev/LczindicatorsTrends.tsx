import React, { useState } from 'react'
import { LczIndicatorsTrends } from '../index'
import { IndicatorsTrendsProps } from '../LczIndicatorsTrends/type'

export const T_LczIndicatorsTrends = () => {
  const config: IndicatorsTrendsProps = {
    horiAlign: 'left',
    vertAlign: 'top',
    titlePosition: 'left', // left right top bottom
    titleIconSpac: 4,
    iconValSpac: 4,
    titleConfig: {
      display: true,
      titleContent: '标题',
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: 'rgba(255,255,255,1)',
        fontWeight: 400,
        letterSpacing: 0
      },
      lineFeed: true
    },
    fontConfig: {
      style: 'icon1',
      size: 24,
      riseColor: '#D24C4C',
      declineColor: '#48C18D',
      flatColor: '#D2944C',
      syncValueColor: true
    },
    numberConfig: {
      display: true,
      baseValue: 100,
      textStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: 'rgba(255,255,255,1)',
        fontWeight: 400,
        letterSpacing: 0
      },
      formatConfig: {
        display: true,
        thousandth: true,
        numDo: 0, // 保留小数 小数点位数
        rounding: true, // 四舍五入
        percentage: false,
        negativeing: 'minus' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
      },
      suffixConfig: {
        display: true,
        leftOffset: 0,
        topOffset: 0,
        suffix: '%',
        textStyle: {
          fontFamily: 'Microsoft YaHei',
          fontSize: 14,
          color: '#ff0000',
          fontWeight: 400,
          letterSpacing: 0
        }
      }
    }
  }

  const [data, setData] = useState([
    {
      // text: '',
      value: 100,
      base: 0
    }
  ])

  const clickHandler = data => {
    console.log(data)
  }

  const dataChange = data => {
    console.log(data)
  }

  return (
    <div style={{ width: 300, height: 300 }}>
      <button onClick={() => setData([{ ...data[0] }])}>change</button>
      <LczIndicatorsTrends {...config} onClick={clickHandler} onDataChange={dataChange} />
    </div>
  )
}
