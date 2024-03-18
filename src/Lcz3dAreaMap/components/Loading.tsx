import React, { memo, CSSProperties } from 'react'

export default memo(function Loading({ load }: { load: boolean }) {
  const style: CSSProperties = {}

  if (!load) {
    style.display = 'block'
  }

  return (
    <div className='lcz-3d-amap-load-mask' style={style}>
      加载中...
    </div>
  )
})
