import React, { CSSProperties, memo, useMemo } from 'react'
import { ScatterSign } from '../../../Lcz3dAreaMap/type/child'

export default memo(function SignContain({
  scatterSign,
  data,
  scatterEvent
}: {
  scatterSign: ScatterSign
  data: any
  scatterEvent
}) {
  const styles = useMemo(() => {
    const { imgUrl = '', opacity = 0, size, fontStyle } = scatterSign,
      css: CSSProperties = {
        opacity: opacity / 100,
        width: size?.width,
        height: size?.height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: 'auto',
        ...(fontStyle || {})
      }
    if (imgUrl) {
      css.backgroundImage = `url(${imgUrl})`
    }
    return css
  }, [JSON.stringify(scatterSign)])

  return (
    <div
      className='background-image-100 lcz-com-3d-area-map-scatter-sign'
      onClick={() => {
        if (typeof scatterEvent == 'function') {
          scatterEvent(data)
        }
      }}
      style={styles}>
      {data.value}
    </div>
  )
})
