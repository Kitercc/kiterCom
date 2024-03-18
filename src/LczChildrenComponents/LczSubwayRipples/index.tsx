import React, { memo, useMemo } from 'react'
import { analysisExpression } from '../../common/util'
import { defaultBoxShadow } from '../../LczCustomGraphics/common/defaultValue'
import { LczRipplesWrapper } from './style'
import { LczSubwayRipplesProps, Style } from './type'

export default memo(function LczSubwayRipples(props: LczSubwayRipplesProps) {
  const { repName, id, styleIntervalItem, className, dataItem } = props
  const { radius, haloRadius, haloSpeed, haloInterval, color, stroke } = styleIntervalItem
  const { color: borderColor, inShadow = defaultBoxShadow } = stroke

  const styleObj = useMemo(() => {
    const _obj: Style = { minw: 0, maxw: 0, shadow: '', bgc: color }
    const _haloRadius = Number(
      analysisExpression(haloRadius, dataItem, id, { name: 'styleInterval[].haloRadius', pathArr: [repName] })
    )
    const _radius = Number(
      analysisExpression(radius, dataItem, id, { name: 'styleInterval[].radius', pathArr: [repName] })
    )
    _obj.maxw = isNaN(_haloRadius) ? 0 : _haloRadius <= 0 ? 0 : _haloRadius
    _obj.minw = isNaN(_radius) ? 0 : _radius <= 0 ? 0 : _radius
    _obj.shadow = `0 0 0 1px ${borderColor} ${
      inShadow.display
        ? `,${inShadow.x}px ${inShadow.y}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
        : ''
    };`
    return _obj
  }, [JSON.stringify(dataItem), haloRadius, radius, color, JSON.stringify(stroke)])

  const _frequency = Math.ceil(haloSpeed / haloInterval)

  return (
    <LczRipplesWrapper
      className={className}
      styleObj={styleObj}
      name={className}
      haloSpeed={haloSpeed}
      haloInterval={haloInterval}>
      {new Array(_frequency).fill(undefined).map((_, i) => (
        <div key={i} />
      ))}
    </LczRipplesWrapper>
  )
})
