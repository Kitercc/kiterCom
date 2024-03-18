import React, { memo, useEffect, useMemo, useState } from 'react'

import LczComCon from '../common/LczComCon'
import ProgressBar from './components/ProgressBar'
import { ProgressBarWrapper } from './style'

import {
  defaultGridConfig,
  defaultProgressConfig,
  defaultOutBorder,
  defaultMessageConfig,
  defaultAnimat
} from './common/defaultValue'
import { MessageBg, ProgressBarProps, TextStyle } from './type'
import NumberFlop from './components/NumberFlop'
import { configDisplayCompatible, conversionData } from '../common/util'

export default memo(function LczProgressBar(props: ProgressBarProps = {}) {
  const {
    data = [],
    w = 300,
    progressConfig = defaultProgressConfig,
    message = defaultMessageConfig,
    animateConfig = defaultAnimat,
    onDataChange
  } = props
  const { barRadius, gridConfig = defaultGridConfig, outBorder = defaultOutBorder } = progressConfig
  const { height } = gridConfig
  const { inMargin } = outBorder
  const { vermargin, leftMargin, rightMargin } = inMargin
  const {
    position,
    inArrangement,
    outArrangement,
    textConfig,
    horiOffset,
    vertOffset,
    messageBg,
    messageSection = false,
    messageStyleSection = []
  } = message
  const { negativeing, trueValue } = textConfig
  const { proportion } = animateConfig

  const outBorderDisplay = configDisplayCompatible(outBorder, 'outBorderDisplay')

  const [animat, setAnimat] = useState(true)

  const arrangement = useMemo(() => {
    if (position === 'in') {
      return inArrangement
    }
    return outArrangement
  }, [position, inArrangement, outArrangement])

  const dataMemo = useMemo(() => {
    if (data.length > 0) {
      return conversionData(data, { value: 'num', max: 'num' })
    }
    return [{ value: 0, max: 100 }]
  }, [data])

  useEffect(() => {
    dataMemo?.length && onDataChange && onDataChange(dataMemo[0])
  }, [dataMemo])

  useEffect(() => {
    setAnimat(false)
    setTimeout(
      () => {
        setAnimat(true)
      },
      animateConfig.display ? 200 : 10
    )
  }, [w, position, arrangement, animateConfig.display, animateConfig.type, animateConfig.timer, proportion, trueValue, negativeing, outBorderDisplay])

  const valueMemo = useMemo(() => {
    const value = dataMemo[0]?.value
    const max = dataMemo[0]?.max
    if (max === 0) return '0%'
    if (value / max > 1) return '100%'
    return value / max > 0 ? ((value / max) * 100).toFixed(textConfig.decimal) + '%' : '0%'
  }, [JSON.stringify(dataMemo)])

  const barWidth = w - leftMargin - rightMargin

  // 获取提示框的区间样式
  const messageSectionConfig = useMemo(() => {
    const _obj: { message?: MessageBg; textStyle?: TextStyle; show: boolean } = { show: false }
    if (dataMemo[0]?.value === undefined || !messageSection || (messageSection && messageStyleSection.length <= 0)) {
      return _obj
    }
    const val = dataMemo[0].value
    const findArr = messageStyleSection.filter(item => val >= item.min && val <= item.max)
    if (findArr.length <= 0) return _obj
    const findItem = findArr[findArr.length - 1]
    _obj.show = true
    if (findItem.messageBg.display) _obj.message = findItem.messageBg
    if (findItem.textConfig.display) _obj.textStyle = findItem.textConfig
    return _obj
  }, [JSON.stringify(dataMemo), messageSection, JSON.stringify(messageStyleSection)])

  const getProgressBarStyle = useMemo(() => {
    return {
      height: height + (outBorderDisplay ? vermargin * 2 : 0) + (outBorderDisplay ? outBorder.borderWidth * 2 : 0),
      paddingTop: outBorderDisplay ? vermargin : 0,
      paddingBottom: outBorderDisplay ? vermargin : 0,
      paddingLeft: outBorderDisplay ? leftMargin : 0,
      paddingRight: outBorderDisplay ? rightMargin : 0,
      background: outBorderDisplay ? outBorder.bgColor : 'none',
      borderWidth: outBorderDisplay ? outBorder.borderWidth : 0,
      borderColor: outBorderDisplay ? outBorder.borderColor : 'none',
      borderRadius: outBorderDisplay ? outBorder.radius : '0'
    }
  }, [inMargin, outBorderDisplay, outBorder])

  const positionStyle = useMemo(() => {
    const comconStyle: any = {}
    const barStyle: any = {}
    const valueStyle: any = {}
    if (position === 'out' || !outBorderDisplay) {
      switch (arrangement) {
        case 'self':
          comconStyle.width = barWidth
          valueStyle.transform = valueMemo === '0%' ? 'translateX(0%)' : 'translateX(-50%)'
          valueStyle.left = `calc( ${valueMemo} + ${outBorderDisplay ? leftMargin : 0}px)`
          valueStyle.top = `calc( -${message.height}px ) `
          break
        case 'left':
          valueStyle.marginTop = (getProgressBarStyle.height - message.height) / 2
          valueStyle.left = `${-message.width}px`
          valueStyle.top = vertOffset
          break
        case 'right':
          comconStyle.flexDirection = 'row'
          valueStyle.marginTop = (getProgressBarStyle.height - message.height) / 2
          valueStyle.left = '100% '
          valueStyle.top = vertOffset
          break
        default:
          break
      }
    }

    const { message: sectionMessage, show } = messageSectionConfig

    if (show && sectionMessage?.display) {
      // 启用区间样式
      sectionMessage?.type === 'color' && (valueStyle.backgroundColor = sectionMessage?.bgColor)
      sectionMessage?.type === 'image' && (valueStyle.backgroundImage = `url(${sectionMessage?.imageUrl})`)
    } else {
      // 使用默认背景
      messageBg.type === 'color' && (valueStyle.backgroundColor = messageBg.display ? messageBg.bgColor : '')
      messageBg.type === 'image' &&
        (valueStyle.backgroundImage = messageBg.display ? `url(${messageBg.imageUrl})` : 'none')
    }

    return {
      comconStyle,
      barStyle,
      valueStyle
    }
  }, [
    arrangement,
    dataMemo,
    position,
    leftMargin,
    gridConfig.width,
    gridConfig.space,
    messageBg,
    horiOffset,
    outBorderDisplay,
    getProgressBarStyle,
    barWidth,
    valueMemo,
    message,
    vertOffset,
    JSON.stringify(messageSectionConfig)
  ])

  const _barValue =
    !isNaN(data[0]?.value) || !isNaN(data[0]?.max)
      ? (trueValue ? +data[0]?.value : (+data[0]?.value * 100) / +data[0]?.max).toFixed(textConfig.decimal)
      : ''

  const outLeft = useMemo(() => {
    if (animat || arrangement !== 'self') {
      return positionStyle.valueStyle.left
    } else if (arrangement === 'self') {
      return proportion + '%'
    }
    return 0 + '%'
  }, [animat, arrangement, positionStyle.valueStyle.left, proportion])

  return (
    <ProgressBarWrapper
      animat={animat}
      animateConfig={animateConfig}
      messageBg={messageBg}
      message={message}
      textConfig={textConfig}
      arrangement={arrangement}
      messageSectionConfig={messageSectionConfig}
      className='progress-bar-wrapper'>
      <LczComCon style={{ ...positionStyle.comconStyle }}>
        <ProgressBar
          animat={animat}
          style={{ ...positionStyle.barStyle }}
          barRadius={barRadius}
          value={valueMemo}
          gridConfig={gridConfig}
          barWidth={barWidth}
          globalWidth={w}
          message={message}
          getProgressBarStyle={getProgressBarStyle}
          proportion={proportion}
          animateConfig={animateConfig}
          outBorder={outBorder}
          data={dataMemo}
          arrangement={arrangement}
          messageSectionConfig={messageSectionConfig}
        />
        {(position === 'out' || !outBorderDisplay) && message.display && (
          <div
            className='out-value'
            style={{
              ...positionStyle.valueStyle,
              width: message.width,
              height: message.height,
              ...textConfig.textStyle,
              left: outLeft,
              ...(messageSectionConfig.textStyle?.display ? messageSectionConfig.textStyle : {})
            }}>
            {animat ? (
              <NumberFlop
                animateConfig={animateConfig}
                textConfig={textConfig}
                timer={animateConfig.timer}
                proportion={proportion}
                data={dataMemo}
              />
            ) : (
              <span>{animateConfig.display ? proportion : _barValue + (!trueValue ? '%' : '')}</span>
            )}
          </div>
        )}
      </LczComCon>
    </ProgressBarWrapper>
  )
})
