import React, { memo, useRef, useCallback } from 'react'
import LczComCon from '../common/LczComCon'
import GraphicsStyle from './component/GraphicsStyle'

import { randomChar } from '../common/util'
import { GraphicsProps } from './type'
import RectContainer from './component/RectContainer'
import { defaultBorderStyle, defaultBoxShadow, defaultVagueConfig } from './common/defaultValue'
import CircContainer from './component/CircContainer'
import TriangleContainer from './component/TriangleContainer'
import StarContainer from './component/StarContainer'

export default memo(function LczCustomGraphics(props: GraphicsProps = {}) {
  const {
    w = 300,
    h = 300,
    shape = 'rect',
    radius = 0,
    fillColor,
    borderStyle = defaultBorderStyle,
    outShadow = defaultBoxShadow,
    inShadow = defaultBoxShadow,
    vagueConfig = defaultVagueConfig,
    onClick
  } = props

  const randomId = useRef(randomChar())

  const getContainer = useCallback(() => {
    switch (shape) {
      case 'rect':
        return <RectContainer {...props} randomId={randomId.current} />
      case 'circular':
        return <CircContainer {...props} randomId={randomId.current} />
      case 'triangle':
        return <TriangleContainer {...props} randomId={randomId.current} />
      case 'star':
        return <StarContainer {...props} randomId={randomId.current} />
      default:
        return shape
    }
  }, [shape, w, h, radius, fillColor, borderStyle, outShadow, inShadow, vagueConfig])

  const handlerClick = e => {
    e.stopPropagation()
    onClick && onClick()
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <div className='custom-graphics-box' style={{ width: w, height: h }} onClick={handlerClick}>
        {((shape !== 'rect' && shape !== 'circular') || borderStyle.display) && (
          <GraphicsStyle {...props} randomId={randomId.current} />
        )}
        {getContainer()}
      </div>
    </LczComCon>
  )
})
