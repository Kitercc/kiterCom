import React, { memo, useEffect, useMemo, useRef } from 'react'
import LczComCon from '../common/LczComCon'

import { VideoProps } from './type'
import { defaultFilter, filterMap } from './common'

export default memo(function LczVideo(props: VideoProps) {
  const {
    w,
    h,
    video = { src: '' },
    radius = 0,
    poster = '',
    autoPlay = true,
    loop = true,
    muted = true,
    controls = false,
    volume = 50,
    filter = defaultFilter,
    data = []
  } = props

  // hooks
  const videoRef = useRef<HTMLVideoElement>(null)

  const VideoMemo = useMemo(() => {
    if (data && data[0] && data[0].url) {
      return String(data[0].url)
    } else {
      return typeof video === 'string' ? video : video.src
    }
  }, [JSON.stringify(data), video])

  const videoStyle = useMemo(() => {
    let filterValue = ''

    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        const item = filter[key]
        if (item.display) {
          if (key !== 'shadow') {
            const { code, symbol } = filterMap[key]
            filterValue += `${code}(${item.value}${symbol}) `
          } else {
            filterValue += `${filterMap[key](item)} `
          }
        }
      }
    }

    return { borderRadius: radius, filter: filterValue.trim() }
  }, [radius, JSON.stringify(filter)])

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.volume = volume / 100
      }
    })
  }, [volume])

  useEffect(() => {
    videoRef.current?.load()
  }, [poster, autoPlay, loop, video, JSON.stringify(data)])

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      {VideoMemo && (
        <video
          ref={videoRef}
          poster={poster}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          style={{ ...videoStyle, objectFit: 'fill', width: w, height: h }}>
          <source src={VideoMemo} type='video/mp4' />
          <source src={VideoMemo} type='video/webm' />
          <source src={VideoMemo} type='video/ogg' />
          您的浏览器不支持Video标签。
        </video>
      )}
    </LczComCon>
  )
})
