import React, { memo } from 'react'
import { LczChart } from '../'
import { Lcz3dTorusprops } from '../LczChart/LczChartPie/Lcz3dTorus/type'

const Lcz3dTorus = LczChart.LczChartPie.Lcz3dTorus

export const T_Lcz3dTorus = memo(function T_Lcz3dTorus() {
  const config: Lcz3dTorusprops = {
    globalConfig: {
      margin: {
        t: 0,
        l: 0
      },
      bgColor: '#2f3233',
      cameraSettings: {
        visualAngle: 20,
        sightDistance: 200
      },
      sort: 'normal',
      legendConfig: {
        display: true,
        clickInt: {
          clicked: true,
          disableStyles: '#fc1616'
        },
        size: { w: 12, h: 12 },
        iconConfig: {
          iconType: 'system',
          systemStyle: 'circle',
          customUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp'
        },
        seriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal',
          charNums: undefined
        },
        proportion: {
          display: true,
          decimal: 0,
          colorFollow: true,
          speed: 2,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#ff5709',
          fontWeight: 'normal',
          charNums: 1
        },
        trueValue: {
          display: true,
          speed: 2,
          colorFollow: false,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#148ac0',
          fontWeight: 'normal',
          charNums: undefined,
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false,
            percentage: false,
            negativeing: 'minus'
          },
          prefix: {
            display: true,
            content: 'prefix',
            xOffset: 0,
            yOffset: 0,
            colorFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          },
          suffix: {
            display: true,
            content: 'suffix',
            xOffset: 0,
            yOffset: 0,
            colorFollow: false,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          }
        },

        layout: {
          distributionMode: 'bothSides',
          itemGap: 20,
          orient: 'vertical',
          xPosition: 'auto',
          yPosition: 'bottom',
          xOffset: 20,
          yOffset: 0,
          layoutmode: 'topbottom'
        }
      }
    },
    pieChartProper: {
      pieConfig: {
        innerOutRadiusRatio: 0.8,
        contour: false,
        height: 10,
        minHeight: 4,
        maxHeight: 50
      },
      currentValue: {
        display: true,
        position: { x: 50, y: 50 },
        spacing: 10,
        currentSeriesName: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0
        },
        currentProportion: {
          display: true,
          decimal: 2,
          colorFollow: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          color: '#E6F7FF',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0
        },
        currentTrueValue: {
          display: true,
          fontFamily: 'Microsoft Yahei',
          fontSize: 12,
          colorFollow: false,
          numberformat: {
            display: true,
            decollate: true,
            decimal: 0,
            round: false,
            percentage: false,
            negativeing: 'minus'
          },
          color: '#2c9c0a',
          fontWeight: 'normal',
          xOffset: 0,
          yOffset: 0,
          currentPrefix: {
            display: true,
            content: 'pre',
            xOffset: 0,
            yOffset: 0,
            colorFollow: true,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          },
          currentSuffix: {
            display: true,
            content: 'suff',
            xOffset: 0,
            yOffset: 0,
            colorFollow: true,
            fontFamily: 'Microsoft Yahei',
            fontSize: 12,
            color: '#E6F7FF',
            fontWeight: 'normal'
          }
        }
      }
    },
    series: {
      dataSeries: [
        {
          map: { fieldName: '系列一', displayName: '' },
          color: '#ff1e00'
        },
        {
          map: { fieldName: '系列二', displayName: '' },
          color: '#1381ff'
        },
        {
          map: { fieldName: '系列一', displayName: '' },
          color: '#e7ff13'
        }
      ]
    },
    rotateAnimation: {
      animateDis: false,
      interval: 3,
      current: { highGrowth: 10, opacity: 0.4 },
      interactionMode: 'click'
    }
  }

  const data = [
    {
      item: '系列一',
      itemTitle: 'asasas',
      value: 80
    },
    {
      item: '系列二',
      itemTitle: 'wew',
      value: 40
    },
    {
      item: '系列三',
      itemTitle: '',
      value: 20
    },
    {
      item: '系列四',
      itemTitle: '',
      value: 10
    },
    {
      item: '系列五',
      itemTitle: '',
      value: 5
    }
  ]

  return (
    <div style={{ width: 600, height: 400 }}>
      <Lcz3dTorus
        {...config}
        w={600}
        h={400}
        data={data}
        onClick={a => console.log(a, 'click')}
        onChange={a => console.log(a, 'onChange')}
      />
    </div>
  )
})
