import React, { CSSProperties, memo } from 'react'
import { Suffix } from '../../LczCarouselTable/type'
import LczIndicatorsTrends from '../../LczIndicatorsTrends'
import { IndicatorsTrendsProps, TextStyle } from '../../LczIndicatorsTrends/type'
import { TargetConfig } from '../type'

type TargetProps = {
  config: TargetConfig
  val: any
  style: CSSProperties
  suffixConfig?: Suffix
  suffix: JSX.Element
  base: number
}

const Target = memo(({ config, val, style, suffixConfig = {} as Suffix, suffix, base }: TargetProps) => {
  const { showValue = true, iconValueSpace = 10, fontConfig, numberFormat, textStyle } = config
  if (isNaN(val)) {
    return showValue ? (
      <div style={{ ...textStyle, ...style }}>
        {val}
        {suffix}
      </div>
    ) : null
  }

  const { display: suffixDis = false, content = '', textStyle: suffixStyle } = suffixConfig

  const indicatorsTrendsConfig: IndicatorsTrendsProps = {
    iconValSpac: iconValueSpace,
    fontConfig,
    numberConfig: {
      display: showValue,
      baseValue: base,
      textStyle: textStyle as TextStyle,
      formatConfig: numberFormat,
      suffixConfig: {
        display: suffixDis,
        leftOffset: 0,
        topOffset: 0,
        suffix: String(content),
        textStyle: suffixStyle as TextStyle
      }
    }
  }

  const data = [
    {
      value: val,
      base
    }
  ]

  return (
    <div style={style}>
      <LczIndicatorsTrends {...indicatorsTrendsConfig} data={data} />
    </div>
  )
})

Target.displayName = 'Target'
export default Target
