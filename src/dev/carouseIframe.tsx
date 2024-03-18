import React, { useState } from 'react'
import { LczCarouselIframe } from '../index'
import { CarouseIframeProps } from '../LczCarouselIframe/type'

export const T_LczCarouselIframe = () => {
  const sweeppureColorStr = {
    selected: 'gradient',
    single: 'rgba(255,0,0,1)',
    gradient: {
      gradualAngle: 90,
      colors: [
        {
          begins: 0,
          value: 'rgba(255,255,255,1)'
        },
        {
          begins: 0,
          value: 'rgba(255,0,0,1)'
        },
        {
          begins: 0,
          value: '#0db4e7'
        }
      ]
    }
  }

  const [index, setindex] = useState(0)

  const config: CarouseIframeProps = {
    carouseEffect: 'scroll', // scrollx  fade roll
    mode: 'horizontal',
    switchSpeed: 300,
    type: 'index',
    index: { value: index },
    defaultId: { value: 0 },
    carouselConfig: {
      display: false,
      autoplaySpeed: 5000,
      infinite: true,
      moveStay: false,
      position: 'before'
    },
    pagerConfig: {
      display: true,
      width: 8,
      height: 8,
      xOffset: 0,
      yOffset: 0,
      radius: 10,
      speed: 10,
      bgColor: '#0fa7eec0',
      activeBgColor: '#0cf73f',
      horiPosition: 'bottom',
      vertPosition: 'left'
    },
    arrowsConfig: {
      display: true,
      spacing: 0,
      offset: 0,
      size: 30,
      imgWidth: 30,
      imgHeight: 30,
      resources: 'system', // system 系统 custom 自定义
      type: 'top1',
      imgUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      colorObj: sweeppureColorStr
    }
  }

  const data = [
    {
      id: 1,
      name: '页面一',
      url: 'https://juejin.cn/post/7037722196055162910?utm_source=gold_browser_extension'
    },
    {
      id: 2,
      name: '页面二',
      url: 'https://juejin.cn/post/7031482488027349028'
    },
    {
      id: 3,
      name: '页面一',
      url: 'https://juejin.cn/post/6844903505971380232'
    },
    {
      id: 2,
      name: '页面二',
      url: 'https://juejin.cn/post/7031482488027349028'
    },
    {
      id: 3,
      name: '页面一',
      url: 'https://juejin.cn/post/6844903505971380232'
    },
    {
      id: 2,
      name: '页面二',
      url: 'https://juejin.cn/post/7031482488027349028'
    },
    {
      id: 3,
      name: '页面一',
      url: 'https://juejin.cn/post/6844903505971380232'
    }
  ]

  const [flag, setFlag] = useState(true)

  return (
    <div style={{ width: 400, height: 300, margin: ' 0 auto' }}>
      <button onClick={() => setFlag(!flag)}>CHANGW</button>
      <ul>
        {data.map((v, i) => {
          return (
            <li key={i} onClick={() => setindex(i)}>
              {i}
            </li>
          )
        })}
      </ul>
      {flag && <LczCarouselIframe {...config} data={data} w={400} h={300} onChange={a => console.log(a)} />}
    </div>
  )
}
