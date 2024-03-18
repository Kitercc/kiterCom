import React, { memo, useState } from 'react'
import { LczCarouselVideoStream } from '../index'
import { CarouselVideoSteamProps } from '../LczCarouselVideoStream/type'

export const T_carouselVideoSteam = memo(() => {
  const config: CarouselVideoSteamProps = {
    globalConfig: {
      type: 'index',
      index: { value: 0 },
      defaultId: { value: 3 }
    },
    animationConfig: {
      carouseEffect: 'scroll',
      switchSpeed: 500,
      mode: 'horizontal',
      carouselConfig: {
        display: false,
        autoplaySpeed: 5,
        position: 'after',
        moveStay: true
      }
    },
    pagerConfig: {
      display: true,
      width: 28,
      height: 28,
      radius: 14,
      xOffset: 0,
      yOffset: 0,
      speed: 12,
      bgColor: 'rgba(255,255,255,0.4)',
      activeBgColor: '#ff1100',
      horiPosition: 'bottom',
      vertPosition: 'left'
    }
  }

  const data = [
    { id: 1, url: 'http://kbs-dokdo.gscdn.com/dokdo_300/_definst_/dokdo_300.stream/playlist.m3u8', title: '1' },
    { id: 2, url: 'http://fed.dev.hzmantu.com/oa-project/bce0c613e364122715270faef1874251.flv', title: '2' },
    {
      id: 3,
      url: 'http://videocdn.renrenjiang.cn/Act-ss-m3u8-sd/1037359_1546064640169/1037359_1546064640169.m3u8',
      title: '3'
    }
  ]

  const [show, setShow] = useState(true)

  return (
    <div style={{ width: 400, height: 400 }}>
      <button onClick={() => setShow(!show)}>CHANGE</button>
      {show && <LczCarouselVideoStream w={400} h={400} data={data} {...config} onChange={item => console.log(item)} />}
    </div>
  )
})

T_carouselVideoSteam.displayName = 'T_carouselVideoSteam'
