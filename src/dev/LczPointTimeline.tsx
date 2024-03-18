import React, { useState } from 'react'
import { LczPointTimeline } from '../index'
import { LczPointTimelineProps } from '../LczPointTimeline/type'

export const T_LczPointTimeline = () => {
  const config: LczPointTimelineProps = {
    globalConfig: {
      valueType: 'index',
      index: { value: '0' },
      id: { value: '22' },
      direction: 'level',
      itemAxisWidth: 180,
      axisPadding: 60,
      distribution: 'bothSides',
      lineStyle: {
        color: '#e21e1e',
        size: 1
      },
      arrowConfig: {
        display: true,

        spacing: 0,
        offset: 0,
        resources: 'custom', // system 系统 custom 自定义
        type: 'zuo1',
        size: 30,
        colorObj: { selected: 'single', single: 'rgba(61, 153, 252,1)' },
        imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
        imgWidth: 24,
        imgHeight: 24,
        arrowHoverStyle: {
          display: true,
          arrowHoverColor: { selected: 'single', single: '#ff5c1c' },
          arrowHoverImg: 'https://pica.zhimg.com/80/v2-47da4a436a369c97890995d394f86f02_720w.jpg?source=1940ef5c'
        },
        arrowDisabledStyle: {
          display: true,
          opacity: 20,
          styleSync: false,
          arrowDisabledColor: { selected: 'single', single: '#494949' },
          arrowDisabledImg: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg'
        }
      },
      contentList: [{ field: 'content' }]
    },
    timelineConfig: {
      defaultStyle: {
        point: {
          imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
          width: 20,
          height: 20,
          xOffset: 0,
          yOffset: 0,
          bothSideSpacing: 0
        },
        labelStyle: {
          width: undefined,
          height: 40,
          xAlign: 'left',
          yAlign: 'center',
          expDirection: 'down',
          xOffset: 0,
          yOffset: 20,
          bothSideSpacing: 20,
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'rgba(255,255,255,1)',
            letterSpacing: 0,
            lineHeight: 16,
            italic: false
          }
        },
        contentStyle: {
          width: 140,
          height: 80,
          xAlign: 'left',
          yAlign: 'center',
          expDirection: 'down',
          xOffset: 0,
          yOffset: -40,
          itemGap: 6,
          bothSideSpacing: 50,
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#ffd000',
            letterSpacing: 0,
            lineHeight: 16,
            italic: false
          }
        }
      },
      currentStyle: {
        point: {
          imgUrl: 'https://pica.zhimg.com/80/v2-0f76beea0e5086541bc0ef6d8904b746_720w.jpg',
          width: 40,
          height: 40,
          xOffset: 0,
          yOffset: 0,
          bothSideSpacing: 0
        },
        labelStyle: {
          width: undefined,
          height: 40,
          xAlign: 'left',
          yAlign: 'center',
          expDirection: 'down',
          xOffset: 0,
          yOffset: -20,

          bothSideSpacing: 20,
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'bold',
            color: '#51ceff',
            letterSpacing: 0,
            lineHeight: 16,
            italic: false
          }
        },
        contentStyle: {
          width: 140,
          height: 80,
          xAlign: 'left',
          yAlign: 'center',
          expDirection: 'down',
          xOffset: 0,
          yOffset: -40,
          itemGap: 6,

          bothSideSpacing: 50,
          textStyle: {
            fontFamily: 'Microsoft YaHei',
            fontSize: 14,
            fontWeight: 'normal',
            color: '#ffffff',
            letterSpacing: 0,
            lineHeight: 16,
            italic: false
          }
        }
      }
    },
    animateConfig: {
      duration: 0.5,
      inRotation: true,
      interval: 6,
      showType: 'left'
    }
  }

  const data = [
    {
      id: 1,
      text: '2001-01',
      content: `
        <p>数新简介</p>
        <p>数新软件公司成立，发布快乐报表、快乐打印、快乐ETL等系列产品</p>
        <img class="cxk" style="height:40px;margin-left:10px;" src="https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp" alt="asas"/>
        <hr/>
        <ul>
          <li>JAVASCRIPT</li>
          <li>C</li>
          <li>JAVA</li>
        </ul>
      `
    },
    {
      id: 2,
      text: '2010-09',
      content: '<p><span style="color:blue;">乐创者</span></p>前身易客报表发布全新框架的V4.0版本'
    },
    {
      id: 3,
      text: '2014-06',
      content: '生意宝入股公司，公司更名为“杭州网盛数新软件有限公司”'
    },
    {
      id: 4,
      text: '2015-05',
      content: '公司总部办公地点迁入杭州湾信息港'
    },
    {
      id: 5,
      text: '2016-04',
      content: '网盛数新（www.datanew.com）正式挂牌新三板'
    },
    {
      id: 6,
      text: '2016-12',
      content: '易客报表在V6.4版本更名为乐创者，同时上线乐创者SAAS版（乐创者云平台）'
    },
    {
      id: 7,
      text: '2018-04',
      content: '公司获杭州数据资源开发协会授牌——共建数据新生态'
    },
    {
      id: 8,
      text: '2021-07',
      content: '乐创者V6.80版本中重磅推出‘数智大屏’产品'
    },
    {
      id: 9,
      text: '2022-07',
      content: '乐创者V6.90版本中重磅推出‘数智大屏’产品'
    }
  ]

  const [flag, change] = useState(true)

  const w = 600

  return (
    <div style={{ width: w, margin: '0 auto' }}>
      <button onClick={() => change(!flag)}>change</button>
      <div style={{ width: w, height: 600 }}>
        {flag && (
          <LczPointTimeline
            {...config}
            data={data}
            w={w}
            h={600}
            onChange={() => console.log('onChange')}
            onClick={() => console.log('onClick')}
          />
        )}
      </div>
    </div>
  )
}
