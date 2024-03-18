import React, { memo, useState } from 'react'
import { LczScrollPage } from '../index'
import { ScrollProps } from '../LczScrollPage/type'

export const T_scrollPage = memo(function T_scrollPage() {
  const [index, setIndex] = useState(0)

  const config: ScrollProps = {
    global: {
      type: 'index',
      index: { value: index },
      defaultId: { value: '3' },
      pageNum: 3,
      mode: 'horizontal',
      pageSpeed: 10,
      unselected: {
        proportion: 0.7,
        offset: 10
      },
      animate: {
        switchEffect: 'slide',
        switchSpeed: 1500
      }
    },
    carousel: {
      display: false,
      speed: 3,
      position: 'after',
      moveStay: true
    },
    pagerConfig: {
      display: true,
      horiPosition: 'bottom',
      vertPosition: 'right',
      xOffset: 0,
      yOffset: 0,
      wdith: 8,
      height: 8,
      radios: 4,
      speed: 4,
      defaultColor: '#ff16164c',
      activeColor: '#3D99FC'
    },
    arrowConfig: {
      display: true,
      spacing: -10,
      yOffset: 0,
      showType: 'all',
      arrowIconType: 'system',
      iconValue: 'zuo1',
      iconSize: 56,
      iconColor: {
        selected: 'gradient',
        single: '#99F6FF',
        gradient: {
          gradualAngle: 90,
          colors: [
            {
              begins: 0,
              value: '#f70c03'
            },
            {
              begins: 0,
              value: '#08D7FC'
            }
          ]
        }
      },
      imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      imgWidth: 56,
      imgHeight: 56
    },
    customPage: [
      { id: 1, contain: { link: null, url: 'https://www.swiper.com.cn/api/navigation/355.html' } },
      {
        id: 3,
        contain: { link: null, url: 'https://juejin.cn/post/7001060484677894158?utm_source=gold_browser_extension' }
      }
    ]
  }
  const data = [
    {
      id: '1',
      name: '页面一',
      url: 'https://juejin.cn/post/7055465860651024421?utm_source=gold_browser_extension'
    },
    {
      id: '2',
      name: '页面二',
      url: 'https://juejin.cn/post/7055460626923012104?utm_source=gold_browser_extension'
    },
    {
      id: '3',
      name: '页面三',
      url: 'https://juejin.cn/post/7055441354054172709?utm_source=gold_browser_extension'
    }
  ]

  return (
    <div style={{ width: 400, height: 320, margin: '0px auto' }}>
      <LczScrollPage w={400} h={320} {...config} data={data} />
      <ul>
        {data.map((_, i) => (
          <li key={i} onClick={() => setIndex(i)}>
            {i}
          </li>
        ))}
      </ul>
    </div>
  )
})
