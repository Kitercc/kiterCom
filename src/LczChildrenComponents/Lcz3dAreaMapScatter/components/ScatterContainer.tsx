import React, { CSSProperties, memo, useMemo } from 'react'
import { Scattertype } from '../../../Lcz3dAreaMap/type/child'

export default memo(function ScatterContainer({
  size,
  scatter,
  zindex
}: {
  size: number
  scatter: Scattertype
  zindex: number
}) {
  const styles = useMemo(() => {
    const css: CSSProperties = {
      zIndex: zindex,
      width: size,
      height: size,
      opacity: scatter.opacity / 100,
      pointerEvents: 'none'
    }
    if (scatter.imgUrl) {
      css.backgroundImage = `url(${scatter.imgUrl})`
    } else {
      css.display = 'none'
    }

    return css
  }, [JSON.stringify(scatter), size, zindex])

  return <div className='lcz-3d-area-map-scatter background-image-100 animate' style={styles}></div>
})
