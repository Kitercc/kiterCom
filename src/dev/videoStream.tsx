import React, { memo } from 'react'
import { LczVideoStream } from '../index'

export const T_LczVideoStream = memo(() => {
  const config = {
    path: 'http://ivi.bupt.edu.cn/hls/cctv14hd.m3u8',
    videoType: 'HTTPFLV'
  }

  // http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8
  // http://fed.dev.hzmantu.com/oa-project/bce0c613e364122715270faef1874251.flv
  const data = [{ url: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8' }]

  return (
    <div style={{ width: 400, height: 300 }}>
      <LczVideoStream {...config} data={data} />
    </div>
  )
})

T_LczVideoStream.displayName = 'T_LczVideoStream'
