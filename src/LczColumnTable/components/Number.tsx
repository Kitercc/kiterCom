import React, { CSSProperties, memo } from 'react'
import { numberForMat } from '../../LczCarouselTable/common'
import { NumberConfig } from '../type'

const Number = memo(
  ({ config, style, suffix, val }: { config: NumberConfig; style: CSSProperties; suffix: JSX.Element; val: any }) => {
    const { textStyle, numberFormat, styleIntervalFlag = false, styleInterval = [] } = config
    const _style: CSSProperties = { ...textStyle, ...style }

    const showValue = isNaN(val) ? val : numberForMat(val, numberFormat)

    if (styleIntervalFlag && styleInterval.length && !isNaN(val)) {
      const findStyle = styleInterval.find(item => item.min <= val && item.max >= val)
      if (findStyle) {
        Object.assign(_style, {
          color: findStyle.color,
          fontWeight: findStyle.fontWeight,
          fontSize: findStyle.fontSize
        })
      }
    }

    return (
      <div style={_style}>
        {showValue}
        {suffix}
      </div>
    )
  }
)

Number.displayName = 'Number'
export default Number
