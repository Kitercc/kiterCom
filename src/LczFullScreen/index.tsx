import React, { memo, useEffect, useState } from 'react'
import LczComCon from '../common/LczComCon'
import { resMobile } from '../common/util'

interface FullScreenProps {
  openImg: string
  closeImg: string
  showType: string // all hover
}

export default memo(function LczFullScreen(props: FullScreenProps) {
  const { openImg, closeImg, showType = 'all' } = props

  const [full, setFull] = useState(false)
  const [device, setDevice] = useState('pc')

  useEffect(() => {
    resMobile(setDevice)
    window.addEventListener('resize', () => resMobile(setDevice))
    return () => {
      window.removeEventListener('resize', () => resMobile(setDevice))
    }
  }, [device])

  useEffect(() => {
    document.documentElement.addEventListener('fullscreenchange', fullStatusHandlerChange, false)
    document.addEventListener('mozfullscreenchange', fullStatusHandlerChange, false)
    document.addEventListener('webkitfullscreenchange', fullStatusHandlerChange, false)
    document.addEventListener('msfullscreenchange', fullStatusHandlerChange, false)

    return () => {
      document.documentElement.removeEventListener('fullscreenchange', fullStatusHandlerChange, false)
      document.removeEventListener('mozfullscreenchange', fullStatusHandlerChange, false)
      document.removeEventListener('webkitfullscreenchange', fullStatusHandlerChange, false)
      document.removeEventListener('msfullscreenchange', fullStatusHandlerChange, false)
    }
  }, [full])

  const handlerClick = () => {
    if (!full) {
      fullScreen(document.documentElement)
    } else {
      exitFullscreen(document)
    }
  }

  // 开启全屏的事件
  function fullScreen(element) {
    if (element.requestFullScreen) {
      element.requestFullScreen()
    } else if (element.webkitRequestFullScreen) {
      element.webkitRequestFullScreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    }
  }

  // 关闭全屏的事件
  function exitFullscreen(element) {
    if (full) {
      if (element.exitFullscreen) {
        element.exitFullscreen()
      } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen()
      } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen()
      }
    }
  }

  // 监听页面全屏的事件
  function fullStatusHandlerChange() {
    setFull(document.fullscreen)
  }

  return (
    <LczComCon>
      {device === 'pc' && (
        <div
          className={['lcz-full-screen-wrpper', showType].join(' ')}
          style={{ backgroundImage: `url(${!full ? openImg : closeImg})` }}
          onClick={handlerClick}
        />
      )}
    </LczComCon>
  )
})
