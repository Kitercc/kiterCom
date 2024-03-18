import React, { memo } from 'react'
import ChinaMap from '../../LczChina2dMap/common/chinaMap'
import { OutFlyLine } from '../../LczChina2dMap/type/child'
import { LineWrapper } from './style'
import FlyLineWrapper from './components/FlyLineWrapper'

interface LczChina2dFlyLineProps {
  w: number
  h: number
  flyLineConfig: OutFlyLine[]
  myMap: ChinaMap
}

export default memo(function LczChina2dFlyLine(props: LczChina2dFlyLineProps) {
  const { w, h, flyLineConfig, myMap } = props

  return (
    <LineWrapper className='lcz-china-map-flyline-wrapper'>
      {flyLineConfig.length > 0 &&
        flyLineConfig.map(v => <FlyLineWrapper myMap={myMap} flyLine={v} w={w} h={h} key={v.id} />)}
    </LineWrapper>
  )
})
