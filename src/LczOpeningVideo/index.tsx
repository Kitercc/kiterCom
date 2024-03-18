import React, { memo, useEffect, useRef, useState, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { OpeningVideoProps } from './type'

const LczOpeningVideo = memo((props: OpeningVideoProps) => {
  const { w, h, controls = false, muted = true, onEnded, ...orderProp } = props
  const { video = '', autoHide = true, autoPlay = true, loop = false, volume = 1, introduce = '', data } = orderProp

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHide, setHide] = useState(false)

  useEffect(() => {
    setHide(false)
    if (videoRef.current) videoRef.current.volume = volume
    videoRef.current?.load()
  }, [JSON.stringify(orderProp)])

  const VideoMemo = useMemo(() => {
    if (data && data[0] && data[0].url) {
      return String(data[0].url)
    } else {
      return typeof video === 'string' ? video : video.src
    }
  }, [JSON.stringify(data), video])

  const videoHandlerEnded = () => {
    autoHide && setHide(true)
    autoHide && onEnded && onEnded()
  }

  if (isHide) return null
  return (
    <LczComCon>
      {VideoMemo ? (
        <video
          ref={videoRef}
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          style={{ objectFit: 'fill', width: w, height: h }}
          onEnded={videoHandlerEnded}>
          <source src={VideoMemo} />
        </video>
      ) : (
        <p>{introduce}</p>
      )}
    </LczComCon>
  )
})

LczOpeningVideo.displayName = 'LczOpeningVideo'

export default LczOpeningVideo
