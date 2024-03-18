import React, { memo } from 'react'
import { LczCheckboxGroup } from '../'
import { CheckboxProps } from '../LczCheckboxGroup/type'

export const LczCheckbox = memo(function LczCheckbox() {
  const config: CheckboxProps = {
    type: 'id',
    index: { value: '0,1,2' },
    defaultId: { value: '1,2' },
    globalConfig: {
      mode: 'row',
      rownum: 3,
      rowAdapt: false,
      bisectorWidth: true,
      colnum: 3,
      horizontalSpacing: 10,
      verticalSpacing: 4,
      show: 'auto',
      checkConfig: {
        display: true,
        position: 'before',
        size: 14,
        spacing: 6,
        fillet: 2
      },
      textStyle: {
        fontFamily: 'PingFangSC-Regular',
        letterSpacing: 0
      }
    },
    normalStyle: {
      checkStyle: { color: '#677382', width: 1, bgColor: 'rgba(255,255,255,0)' },
      textStyle: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'normal'
      },
      hoverStyle: {
        display: true,
        checkStyle: {
          display: true,
          color: '#3d99fc',
          bgColor: 'rgba(255,255,255,0)'
        },
        hoverTextStyle: {
          display: false,
          fontSize: 14,
          color: '#3d99fc',
          fontWeight: 'normal'
        }
      }
    },
    focusStyle: {
      checkStyle: { color: '#3d99fc', bgColor: 'rgba(255,255,255,0)', tickColor: '#3d99fc' },
      textStyle: {
        display: true,
        fontSize: 14,
        color: '#3d99fc',
        fontWeight: 'normal'
      },
      hoverStyle: {
        display: false,
        checkStyle: {
          display: false,
          color: '#3d99fc',
          bgColor: 'rgba(255,255,255,0)',
          tickColor: '#3d99fc'
        },
        hoverTextStyle: {
          display: false,
          fontSize: 14,
          color: '#3d99fc',
          fontWeight: 'normal'
        }
      }
    }
  }

  const data = [
    {
      id: '1',
      content: '选项1'
    },
    {
      id: '2',
      content: '选项2'
    },
    {
      id: '3',
      content: '选项3'
    },
    {
      id: '11',
      content: '选项11'
    },
    {
      id: '21',
      content: '选项21'
    },
    {
      id: '31',
      content: '选项31'
    },
    {
      id: '311',
      content: '选项311'
    }
  ]
  return (
    <div style={{ width: 500, height: 120 }}>
      <LczCheckboxGroup
        onChange={a => console.log(a, 'chang')}
        onClick={a => console.log(a, 'click')}
        {...config}
        data={data}
      />
    </div>
  )
})
