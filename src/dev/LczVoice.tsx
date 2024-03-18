import React, { memo } from 'react'
import { LczVoice } from '..'

export const T_LczVoice = memo(function T_LczVoice() {
  const config = {
    url: { src: 'https://easyv.assets.dtstack.com/data/110239/358794/audio/bx96fj3asa_1627623603840_n8oznri35.flac' },
    autoPlay: true,
    loop: false,
    controls: true,
    volume: 50
  }

  const data = [{ url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3' }]

  return (
    <div>
      <LczVoice {...config} data={data} />
    </div>
  )
})
