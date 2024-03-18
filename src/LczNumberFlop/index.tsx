import React, { memo, useEffect, useState, useMemo } from 'react'

import { CountWrapper, SymbolWrapper } from './style'
import LczComCon from '../common/LczComCon'
import Number from './Number/Number'
import CountUpCom from './Number/CountUpCom'
import { NumberFlopProps } from './type'
import { conversionData } from '../common/util'
import { getBgColorMemo } from './common'
import { defalutTextStyle } from './common/defaultVal'
import { useStyle } from './common/useStyle'

const LczNumberFlop = memo(function (props: NumberFlopProps = {}) {
  const {
    titleConfig = {},
    scrollCountConfig = {},
    titlePosition = 'top',
    data = [],
    onDataChange,
    onClick,
    onMouseenter,
    onMouseleave
  } = props

  const { name } = titleConfig
  const { prefixConfig = {}, suffixConfig = {}, numberConfig = {} } = scrollCountConfig
  const { prefixStatus = true, prefix = '' } = prefixConfig
  const { suffixStatus = true, suffix = '' } = suffixConfig
  const {
    numberAnimate = {},
    numberFormat = {},
    symbolCustom = {},
    widthAdaptation = false,
    textStyle = defalutTextStyle,
    numberBg = {}
  } = numberConfig
  const {
    display: numberDis = false,
    verMargin = 0,
    horMargin = 0,
    numBoxRadius = 0,
    numBgColor = {},
    numBoxBg = '',
    separateBg = false
  } = numberBg
  const { numberbits = 0, digit = 3, rounding = true, negativeing = 'minus' } = numberFormat
  const { symbolSpeed = 2, symbolSize = 20 } = symbolCustom

  const scrollType = numberAnimate.scrollType || 'roll',
    colorString = numBgColor.colorString

  const dataMemo = useMemo(() => {
    const _data = conversionData(data, { value: 'number', name: 'string', prefix: 'string', suffix: 'string' })
    if (_data.length == 0) return [{ value: 0 }]
    return _data
  }, [data])

  const { styledMemo, symbolMemo, numColor } = useStyle(props, dataMemo)

  // 配置翻页器标题
  const nameMemo: any = useMemo(() => {
    let nameStr = ''
    if (dataMemo && dataMemo.length > 0 && dataMemo[0].name) {
      nameStr = dataMemo[0].name
    } else if (name) {
      nameStr = name
    }
    return nameStr
  }, [dataMemo[0]?.name, name])

  // 前缀  后缀
  const prefixMemo = dataMemo[0]?.prefix || prefix,
    suffixMemo = dataMemo[0]?.suffix || suffix

  // 控制组件刷新
  const [refresh, setRefresh] = useState(false)

  // 数据更新
  useEffect(() => {
    dataMemo.length &&
      onDataChange &&
      onDataChange({ ...dataMemo[0], name: nameMemo, prefix: prefixMemo, suffix: suffixMemo })
  }, [JSON.stringify(dataMemo)])

  const refreshMemo = useMemo(() => {
    return JSON.stringify(numberAnimate) + JSON.stringify(numberConfig?.textStyle?.fontSize)
  }, [numberAnimate, numberConfig?.textStyle?.fontSize])

  // 控制组件更新
  useEffect(() => {
    setRefresh(false)
    setTimeout(() => {
      setRefresh(true)
    }, 400)
  }, [refreshMemo, numberbits, rounding, digit, numColor.fontSize, verMargin, horMargin])

  const handleChange = (type: 'click' | 'enter' | 'leave', e) => {
    e.stopPropagation()
    const param = { ...dataMemo[0], name: nameMemo, prefix: prefixMemo, suffix: suffixMemo }
    switch (type) {
      case 'click': {
        onClick && onClick(param)
        break
      }
      case 'enter': {
        onMouseenter && onMouseenter(param)
        break
      }
      case 'leave': {
        onMouseleave && onMouseleave(param)
        break
      }
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <CountWrapper
        refresh={refresh}
        numBoxRadius={numBoxRadius}
        numBgColor={getBgColorMemo(colorString).color}
        numBoxBg={numBoxBg}
        separateBg={separateBg}
        spanSpeed={textStyle.letterSpacing || 0}
        numberDis={numberDis}
        widthAdaptation={widthAdaptation}
        titlePosition={titlePosition}
        numColor={numColor}
        verMargin={verMargin}
        horMargin={horMargin}>
        {refresh && (
          <div
            className='scrolldown'
            style={styledMemo.bigStyle}
            onClick={handleChange.bind(null, 'click')}
            onMouseEnter={handleChange.bind(null, 'enter')}
            onMouseLeave={handleChange.bind(null, 'leave')}>
            {titleConfig.display && (
              <div className='title' style={styledMemo.mytitleStyle}>
                {nameMemo}
              </div>
            )}
            <div
              className='countUp-box'
              style={{
                flex: `${widthAdaptation ? 1 : 0} 1 0%`,
                ...styledMemo.countupStyle
              }}>
              {prefixStatus && prefixMemo && (
                <span className='prefix' style={styledMemo.prefixTextStyle}>
                  {prefixMemo}
                </span>
              )}

              {symbolMemo.type && (
                <SymbolWrapper
                  symbolSpeed={symbolSpeed}
                  symbolSize={symbolSize}
                  symbolMemo={symbolMemo}
                  className={['symbol-type', symbolMemo.type === 'text' ? numColor.colorType : ''].join(' ')}
                  style={{
                    letterSpacing: 0,
                    fontSize: numColor.fontSize
                  }}
                  numColor={numColor}>
                  {symbolMemo.type === 'text' && symbolMemo.url}
                </SymbolWrapper>
              )}

              {dataMemo[0]?.value < 0 && negativeing === 'brackets' && (
                <span
                  className={['minus-brackets', numColor.colorType].join(' ')}
                  style={{
                    ...textStyle,
                    marginRight: textStyle.letterSpacing
                  }}>
                  (
                </span>
              )}

              {!isNaN(+dataMemo[0]?.value) && (
                <div
                  className='count-number'
                  style={{
                    ...styledMemo.countNumberStyle,
                    fontSize: numColor.fontSize,
                    fontWeight: numColor.fontWeight
                  }}>
                  {scrollType === 'roll' ? (
                    <CountUpCom numColor={numColor} {...props} />
                  ) : (
                    <Number refresh={refresh} numColor={numColor} {...props} />
                  )}
                </div>
              )}

              {dataMemo[0]?.value < 0 && negativeing === 'brackets' && (
                <span
                  className={['minus-brackets', numColor.colorType].join(' ')}
                  style={{
                    ...textStyle,
                    marginLeft: textStyle.letterSpacing
                  }}>
                  )
                </span>
              )}

              {suffixStatus && suffixMemo && (
                <span className='suffix' style={styledMemo.suffixTextStyle}>
                  {suffixMemo}
                </span>
              )}
            </div>
          </div>
        )}
      </CountWrapper>
    </LczComCon>
  )
})

LczNumberFlop.displayName = 'LczNumberFlop'

export default LczNumberFlop
