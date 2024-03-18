import React, { memo, useEffect, useRef, useMemo, forwardRef, useImperativeHandle } from 'react'
import LczComCon from '../common/LczComCon'
import { loadScript } from '../common/util'
import { relyOnJSMap } from './common'
import { VideoStreamProps } from './type'

const LczVideoStream = forwardRef((props: VideoStreamProps, ref) => {
  const { videoType = 'HLS', path = '', controls = true, loop = false, muted = true, volume = 50, data = [] } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<any>(null)
  const flvRef = useRef<any>(null)

  useImperativeHandle(ref, () => ({
    type: hlsRef.current ? 'hls' : flvRef.current ? 'flv' : null,
    videoRef: hlsRef.current || flvRef.current
  }))

  const pathMemo = useMemo(() => {
    if (data && data[0] && data[0].url) {
      return String(data[0].url)
    }
    return path
  }, [path, JSON.stringify(data)])

  useEffect(() => {
    destroyVideo()
    let scriptType = videoType
    if (pathMemo.includes('hls') || pathMemo.includes('HLS')) {
      scriptType = 'HLS'
    } else if (pathMemo.includes('flv') || pathMemo.includes('FLV')) {
      scriptType = 'HTTPFLV'
    }
    loadScript(relyOnJSMap[scriptType])
    scriptType === 'HLS' ? loadHLS() : loadFLV()

    return () => {
      destroyVideo()
    }
  }, [pathMemo, videoType])

  useEffect(() => {
    videoRef.current && (videoRef.current.volume = volume / 100)
  }, [volume])

  async function loadHLS() {
    if (!pathMemo) return
    try {
      if (window.Hls && window.Hls.isSupported() && videoRef.current) {
        hlsRef.current = new window.Hls()
        hlsRef.current.loadSource(pathMemo)
        hlsRef.current.attachMedia(videoRef.current)
        videoRef.current.volume = volume / 100
      } else {
        setTimeout(loadHLS, 50)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  async function loadFLV() {
    if (!pathMemo) return
    try {
      if (window.flvjs && window.flvjs.isSupported() && videoRef.current) {
        flvRef.current = await window.flvjs.createPlayer({
          type: 'flv',
          isLive: true,
          url: pathMemo
        })

        flvRef.current.attachMediaElement(videoRef.current)
        flvRef.current.load() //加载
        flvRef.current.play()

        if (videoRef.current) {
          videoRef.current.volume = volume / 100
        }
      } else {
        setTimeout(loadFLV, 50)
      }
    } catch (error) {
      console.warn(error)
    }
  }

  function destroyVideo() {
    if (flvRef.current) {
      flvRef.current.unload()
      flvRef.current.detachMediaElement()
      flvRef.current.destroy()
      flvRef.current = null
    }

    if (hlsRef.current) {
      hlsRef.current.stopLoad()
      hlsRef.current.detachMedia()
      hlsRef.current.destroy()
      hlsRef.current = null
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      {pathMemo && (
        <video
          style={{ width: '100%', height: '100%' }}
          autoPlay={true}
          ref={videoRef}
          controls={controls}
          loop={loop}
          muted={muted}
        />
      )}
    </LczComCon>
  )
})

LczVideoStream.displayName = 'LczVideoStream'

export default memo(LczVideoStream)
