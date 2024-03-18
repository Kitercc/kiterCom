import React, { CSSProperties, memo, useEffect, useState } from 'react'
import { SubwaySignWrapper } from './style'
import { outSign, SignConfig, StyleSeries } from '../../LczSubwayLine/type/child'
import { getAttribute } from './common'
import { defaultSignConfig, defaultShoadow } from './common/defaultValue'

export interface SignProps {
  signMemo: outSign
  dataItem: { type: string; station: string }
}

export default memo(function LczSubwaySign({ signMemo, dataItem }: SignProps) {
  const { shadow = defaultShoadow, signConfig = defaultSignConfig, styleSeries = [] } = signMemo
  const [isShadow, setIsShadow] = useState(false)
  const [attrState, setAttrState] = useState({ style: {}, className: '', dangerouslySetInnerHTML: { __html: '' } })

  useEffect(() => {
    ;(async function () {
      let _obj: { style: CSSProperties; className: string; dangerouslySetInnerHTML: any } = {
        style: {},
        className: '',
        dangerouslySetInnerHTML: { __html: '' }
      }
      const _finStyle = styleSeries.find(v => v.type == dataItem.type) as StyleSeries
      if (!styleSeries?.length || !_finStyle) {
        const { obj, isShadow } = await getAttribute(signConfig, shadow)
        _obj = obj
        setIsShadow(isShadow)
      } else {
        const { obj, isShadow } = await getAttribute(_finStyle.signStyle as SignConfig, shadow)
        _obj = obj
        setIsShadow(isShadow)
      }
      setAttrState(_obj)
    })()
  }, [JSON.stringify(signMemo), JSON.stringify(dataItem)])

  return (
    <SubwaySignWrapper>
      <div {...attrState} />
      {isShadow && <div {...attrState} className={`${attrState.className}  gradient-shadow`} />}
    </SubwaySignWrapper>
  )
})
