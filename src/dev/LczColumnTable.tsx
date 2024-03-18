import React from 'react'
import { LczColumnTable } from '..'
import { ColumnTableProps } from '../LczColumnTable/type'

export const T_LczColumnTable = function () {
  const config: ColumnTableProps = {
    id: 'ds',
    globalConfig: {
      arrangementMode: 'portrait',
      // portrait
      rowNumber: 3,
      // horizontal
      columnNumber: 3,
      lineHeight: 60,
      scrollConfig: {
        display: true,
        displayType: 'all',
        trackConfig: { display: true, thickness: 4, color: 'rgba(255,0,0,1)', radius: 10 },
        sliderConfig: { size: 0.5, color: 'rgba(98,104,111,1)', radius: 20 }
      },
      columnLine: {
        display: true,
        color: '#ffffffc8',
        width: 1
      },
      border: {
        display: true,
        color: '#ff0000',
        width: 1
      },
      updated: false
    },
    animateConfig: {
      display: true,
      timeInterval: 3,
      switchSpeed: 1000,
      speed: 'ease',
      updataNum: 10
    },
    header: {
      display: true,
      height: 45,
      bgColor: 'rgba(142, 255, 36, 0.3)',
      align: 'center',
      headerStyle: {
        fontFamily: 'Microsoft YaHei',
        fontSize: 14,
        color: '#fff',
        fontWeight: 400,
        letterSpacing: 6
      }
    },
    lineconfig: {
      lineSpeed: 10,
      border: {
        display: true,
        color: '#8eff24',
        width: 1
      },
      lineStyle: [
        {
          bgColor: '#65ff2878',
          opacity: 100
        },
        {
          bgColor: '#48f3ff78',
          opacity: 100
        }
      ]
    },
    customCol: [
      {
        field: 'column1',
        colName: '列1',
        colWidth: 180,
        alignType: 'left',
        xOffset: 10,
        border: {
          display: true,
          color: '#8eff24',
          width: 1
        },
        valueType: 'text',
        overflow: 'ellipsis',
        textConfig: {
          fontStyle: {
            fontSize: 16,
            color: '#ff6666',
            fontWeight: 'bold',
            fontFamily: 'Microsoft YaHei',
            letterSpacing: 0
          }
        },
        suffix: {
          display: true,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      },
      {
        field: 'column2',
        colName: '列3',
        colWidth: 80,
        alignType: 'left',
        xOffset: 0,
        border: {
          display: true,
          color: '#57d0ff',
          width: 1
        },
        valueType: 'target',
        targetConfig: {
          baseValue: '100',
          showValue: true,
          iconValueSpace: 0,
          fontConfig: {
            style: 'icon2',
            size: 24,
            riseColor: '#D24C4C',
            declineColor: '#48C18D',
            flatColor: '#D2944C',
            syncValueColor: true
          },
          numberFormat: {
            display: true,
            thousandth: true,
            numDo: 0, // 保留小数 小数点位数
            rounding: true, // 四舍五入
            percentage: false,
            negativeing: 'brackets' // 负数显示值  minus 负号  brackets 括号  abs 绝对值
          },
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            color: '#17ff78',
            fontWeight: 400,
            letterSpacing: 0
          }
        },
        suffix: {
          display: true,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      },
      {
        field: 'column2',
        colName: '列2',
        colWidth: 80,
        alignType: 'left',
        xOffset: 0,
        border: {
          display: true,
          color: '#57d0ff',
          width: 1
        },
        valueType: 'number',
        overflow: 'ellipsis',
        numberConfig: {
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 },
          numberFormat: {
            display: true,
            decollate: true,
            decimal: 2,
            round: true,
            percentage: true,
            negativeing: 'minus'
          },
          styleIntervalFlag: true,
          styleInterval: [
            { min: -100, max: 40, color: '#ff0000', fontWeight: 400, fontSize: 14 },
            { min: 30, max: 90, color: '#49d807', fontWeight: 400, fontSize: 14 }
          ]
        },
        suffix: {
          display: true,
          content: '/单位',
          textStyle: { fontFamily: 'Microsoft YaHei', fontSize: 14, color: '#fff', fontWeight: 400 }
        }
      }
    ]
  }

  const data = [
    {
      column1: '第一列内容-1',
      column2: 'asas'
    },
    {
      column1: '第一列内容-2',
      column2: 40
    },
    {
      column1: '第一列内容-3',
      column2: 60
    },
    {
      column1: '第一列内容-4',
      column2: 80
    },
    {
      column1: '第一列内容-5',
      column2: 90
    },
    {
      column1: '第一列内容-6',
      column2: 95
    },
    {
      column1: '第一列内容-7',
      column2: 98
    },
    {
      column1: '第一列内容-8',
      column2: 100
    },
    {
      column1: '第一列内容-9',
      column2: 50
    },
    {
      column1: '第一列内容-10',
      column2: 48
    },
    {
      column1: '第一列内容-11',
      column2: 120
    },
    {
      column1: '第一列内容-12',
      column2: 120
    }
  ]

  return (
    <div style={{ width: 600, height: 300 }}>
      <LczColumnTable w={600} h={300} {...config} data={data} onClick={a => console.log(a, 'click')} />
    </div>
  )
}
