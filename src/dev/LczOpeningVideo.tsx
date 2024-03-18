import React from 'react'
import { LczOpeningVideo } from '../index'

export const T_LczOpeningVideo = () => {
  const config = {
    video: {
      name: '',
      src: 'https://www.runoob.com/try/demo_source/movie.mp4'
    },
    autoHide: true,
    controls: false,
    autoPlay: true,
    loop: false,
    muted: true,
    volume: 1
  }

  const data = [{ url: '' }]

  return (
    <div style={{ width: 300, height: 300 }}>
      <LczOpeningVideo
        w={300}
        h={300}
        {...config}
        data={data}
        onEnded={() => {
          console.log('end')
        }}
      />
    </div>
  )
}
