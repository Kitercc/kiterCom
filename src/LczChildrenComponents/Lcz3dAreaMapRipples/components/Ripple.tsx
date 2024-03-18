import React, { memo, useMemo, useRef } from 'react'
import { analysisExpression, randomChar } from '../../../common/util'
import { RipplesStyle, RipplesData } from '../../../Lcz3dAreaMap/type/child'
import { defaultBoxShadow } from '../../../LczCustomGraphics/common/defaultValue'
import { LczRipplesWrapper } from '../../LczSubwayRipples/style'

interface Props {
  ripplestyle: RipplesStyle
  itemData: RipplesData
  id: string
  expName: string
  expPathArr: string[]
}

export type Style = { minw: number; maxw: number; shadow: string; bgc: string }

export default memo(function Ripple({ id, expName, expPathArr, ripplestyle, itemData }: Props) {
  const { radius, haloRadius, haloSpeed, haloInterval, color, stroke } = ripplestyle,
    { color: borderColor, inShadow = defaultBoxShadow } = stroke

  const uid = useRef<string>(randomChar())
  const num = Math.ceil(haloSpeed / haloInterval)

  const styleObj = useMemo(() => {
    const _obj: Style = { minw: 0, maxw: 0, shadow: '', bgc: color }
    const _haloRadius = +analysisExpression(haloRadius, itemData, id, {
      name: `${expName}.haloRadius`,
      pathArr: expPathArr
    })
    const _radius = +analysisExpression(radius, itemData, id, { name: `${expName}.radius`, pathArr: expPathArr })
    _obj.maxw = isNaN(_haloRadius) ? 0 : _haloRadius <= 0 ? 0 : _haloRadius
    _obj.minw = isNaN(_radius) ? 0 : _radius <= 0 ? 0 : _radius
    _obj.shadow = `0 0 0 1px ${borderColor} ${
      inShadow.display
        ? `,${inShadow.x}px ${inShadow.y}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
        : ''
    };`
    return _obj
  }, [JSON.stringify(itemData), haloRadius, radius, color, JSON.stringify(stroke), expName])

  return (
    <LczRipplesWrapper
      name=''
      aniamteName={uid.current}
      haloSpeed={haloSpeed}
      haloInterval={haloInterval}
      styleObj={styleObj}>
      {new Array(num).fill(undefined).map((_, i) => (
        <div key={i} />
      ))}
    </LczRipplesWrapper>
  )
})
