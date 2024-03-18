import { cloneDeep } from 'lodash'
import React, { memo } from 'react'
import { analysisExpression } from '../../common/util'
import LczIndicatorsTrends from '../../LczIndicatorsTrends'
import { FontConfig, IndicatorsTrendsProps, SuffixConfig, TextStyle } from '../../LczIndicatorsTrends/type'
import { TargetConfig } from '../type/child'

type TargetType = {
  value: string | number
  targetConfig: TargetConfig
  containData: any
  id: string
  expPathArr: string[]
}

const Target = memo(({ value, targetConfig, containData = {}, id, expPathArr }: TargetType) => {
  const val = value !== '' && value !== null ? +value : NaN,
    {
      baseValue,
      fontConfig,
      fontSeries = [],
      showValue,
      iconValueSpace,
      textStyle,
      numberFormat,
      suffixConfig
    } = targetConfig

  let container: JSX.Element = <></>
  const suffixVal = analysisExpression(suffixConfig?.suffix || '', containData, id, {
    name: 'targetConfig.suffixConfig.suffix',
    pathArr: expPathArr
  })
  if (isNaN(val)) {
    container = (
      <>
        {showValue && <span style={textStyle}>{value || ''}</span>}
        {suffixVal && suffixConfig?.display && (
          <span
            style={{
              ...suffixConfig.textStyle,
              position: 'relative',
              left: suffixConfig.leftOffset,
              top: suffixConfig.topOffset
            }}>
            {suffixVal}
          </span>
        )}
      </>
    )
  } else {
    const base = analysisExpression(baseValue || '', containData, id, {
      name: 'targetConfig.baseValue',
      pathArr: expPathArr
    })
    const _suffix = cloneDeep(suffixConfig) || ({} as SuffixConfig)
    _suffix.suffix = suffixVal
    const indicFontStyle = cloneDeep(fontConfig) as FontConfig

    if (fontSeries.length) {
      const findFont = fontSeries.find((item, i) => {
        const condition = analysisExpression(item.condition, containData, id, {
          name: 'targetConfig.fontSeries[].condition',
          pathArr: [...expPathArr, `fontSeries[${i}]`]
        })
        return Boolean(condition)
      })
      findFont && Object.assign(indicFontStyle, findFont)
    }

    const _indicatorsTrendsConfig: IndicatorsTrendsProps = {
      iconValSpac: iconValueSpace,
      fontConfig: indicFontStyle,
      numberConfig: {
        display: showValue,
        baseValue: base,
        textStyle: textStyle as TextStyle,
        formatConfig: numberFormat,
        suffixConfig: _suffix
      }
    }
    const data = [
      {
        value: val,
        base
      }
    ]
    container = <LczIndicatorsTrends {..._indicatorsTrendsConfig} data={data} />
  }

  return <div className='target-field-con'>{container}</div>
})

Target.displayName = 'Target'
export default Target
