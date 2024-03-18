import React, { memo, useEffect, useMemo, useRef } from 'react'
import LczComCon from '../common/LczComCon'

interface VoiceProps {
  w?: number
  h?: number
  url?: { src: string }
  autoPlay?: boolean
  loop?: boolean
  controls?: boolean
  volume?: number
  data?: { url: string }[]
}

export default memo(function LczVoice(props: VoiceProps) {
  const { w = 400, h = 200, data = [], ...ordProps } = props
  const { url = { src: '' }, autoPlay = true, loop = true, controls = false, volume = 50 } = ordProps

  const audioRef = useRef<HTMLAudioElement>(null)

  const urlMemo = useMemo(() => {
    if (data && data[0] && data[0].url) {
      return String(data[0].url)
    }
    return typeof url === 'string' ? url : url.src
  }, [JSON.stringify(data), JSON.stringify(url)])

  useEffect(() => {
    audioRef.current?.load()
    setTimeout(() => {
      audioRef.current && (audioRef.current.volume = volume / 100)
    })
  }, [JSON.stringify(ordProps)])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <audio
        ref={audioRef}
        style={{ width: w, height: h }}
        src={urlMemo}
        autoPlay={autoPlay}
        loop={loop}
        preload='auto'
        controls={controls}></audio>
    </LczComCon>
  )
})
