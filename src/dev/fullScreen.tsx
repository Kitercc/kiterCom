import React, { memo } from 'react'
import { LczFullScreen } from '../'

export const T_fullScreen = memo(function T_fullScreen() {
  const config = {
    openImg: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
    closeImg: 'https://pic2.zhimg.com/50/v2-5fbdde3dbc80b96d958c1f88538af53c_hd.webp',
    showType: 'hover' // all hover
  }

  return (
    <div style={{ width: 48, height: 48 }}>
      <LczFullScreen {...config} />
    </div>
  )
})
