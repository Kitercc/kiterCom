import React, { memo } from 'react'
import { LczBadge } from '../'
import { BadgeProps } from '../LczBadge/type'

export const T_lczbadge = memo(function T_lczbadge() {
  const config: BadgeProps = {
    global: {
      lessThanZeroHidden: false,
      thumbnail: {
        display: false,
        threshold: 99
      }
    },
    superNumber: {
      format: {
        display: false,
        splitDigit: 2,
        decimal: 2,
        rounding: true,
        negativeing: 'abs' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
      },
      bgConfig: {
        display: true,
        xOffset: 5,
        yOffset: 2,
        color: '#f36767',
        radius: 9
      },
      textStyle: {
        display: true,
        fontWeight: 'normal',
        fontFamily: 'PingFangSC-Regular',
        fontSize: 15,
        color: '#FFFFFF',
        letterSpacing: 0
      },
      sectionStyleFlag: false,
      sectionStyle: [
        {
          min: -9007199254740991,
          max: 9007199254740991,
          bgConfig: {
            display: true,
            xOffset: 10,
            yOffset: 2,
            color: '#D24C4C',
            radius: 9
          },
          text: {
            display: true,
            showVal: true,
            fontSize: 15,
            color: '#07fa95',
            fontWeight: 'normal'
          }
        }
      ]
    }
  }

  const data = [
    {
      value: 0
    }
  ]

  return (
    <div style={{ width: 40, height: 40 }}>
      <LczBadge data={data} {...config} onDataChange={a => console.log(a)} />
    </div>
  )
})
