import React from 'react'
import { LczVideo } from '../index'
import { VideoProps } from '../LczVideo/type'

export const T_LczVideo = () => {
  const config: VideoProps = {
    video: {
      name: '',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4'
    },
    radius: 20,
    poster: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
    controls: false,
    autoPlay: true,
    loop: false,
    muted: true,
    volume: 50,
    filter: {
      blur: { display: false, value: 5 },
      brightness: { display: false, value: 50 },
      contrastRatio: { display: false, value: 50 },
      grayscale: { display: false, value: 50 },
      hue: { display: false, value: 0 },
      antiColor: { display: false, value: 0 },
      saturation: { display: false, value: 100 },
      brown: { display: false, value: 0 },
      shadow: {
        display: false,
        color: '#d80f0f7f',
        xOffset: 0,
        yOffset: 0,
        vague: 4
      }
    }
  }

  const data = [{ url: '' }]

  return (
    <div style={{ width: 300, height: 300 }}>
      <LczVideo w={300} h={300} data={data} {...config} />
    </div>
  )
}
