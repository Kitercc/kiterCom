import React, { memo, useMemo } from 'react'
import { configDisplayCompatible } from '../../common/util'
import { defaultOutBorder } from '../common/defaultValue'
import { AnimateConfig, dataMap, GridConfig, MessageBg, MessageConfig, OutBorder, TextStyle } from '../type'
import NumberFlop from './NumberFlop'
import ProgressBgBar from './ProgressBgBar'
import ProgressInnerBar from './ProgressInnerBar'

interface ProgressProps {
  value: string | number
  gridConfig: GridConfig
  barWidth: number
  globalWidth: number
  barRadius: number
  style: any
  getProgressBarStyle: any
  message: MessageConfig
  animat: boolean
  proportion: number
  animateConfig: AnimateConfig
  outBorder: OutBorder
  data: dataMap[]
  arrangement?: string
  messageSectionConfig?: {
    message?: MessageBg | undefined
    textStyle?: TextStyle | undefined
    show: boolean
  }
}

export default memo(function ProgressBar(props: ProgressProps) {
  const {
    value,
    gridConfig,
    barWidth,
    globalWidth,
    barRadius,
    style,
    getProgressBarStyle,
    message,
    animat,
    proportion,
    animateConfig,
    data,
    outBorder = defaultOutBorder,
    arrangement = 'right',
    messageSectionConfig
  } = props
  const { width, space } = gridConfig
  const { message: sectionMes, textStyle: sectionText } = messageSectionConfig || {}
  const { position, vertOffset, horiOffset, messageBg, textConfig } = message

  const outBorderDisplay = configDisplayCompatible(outBorder, 'outBorderDisplay')

  const grildNumMemo = useMemo(() => {
    const { position, width: messW } = message
    const grildw =
      barWidth -
      (position === 'out' || !outBorderDisplay ? 0 : messW) -
      (outBorderDisplay ? outBorder.borderWidth * 2 : 0)

    if (outBorderDisplay) {
      return Math.floor(grildw / (width + space || 1)) > 0 ? Math.floor(grildw / (width + space || 1)) : 1
    }
    return Math.ceil(grildw / (width + space || 1)) > 0 ? Math.ceil(grildw / (width + space || 1)) : 1
  }, [barWidth, width, space, outBorder, globalWidth, message.width, message.position, outBorderDisplay])

  const getContainerStyle = useMemo(() => {
    const { borderWidth, paddingLeft } = getProgressBarStyle
    const progressBoxStyle: any = {}
    const valueStyle: any = {}
    if (position === 'in' && outBorderDisplay) {
      switch (arrangement) {
        case 'self':
          valueStyle.position = 'absolute'
          valueStyle.left = `calc(${(width + space) * grildNumMemo}px / 100 * ${parseFloat(value + '')} + ${
            paddingLeft + horiOffset
          }px)`
          valueStyle.top = vertOffset
          valueStyle.marginTop = (getProgressBarStyle.height - message.height - borderWidth * 2) / 2
          break
        case 'right':
          valueStyle.left = 'initial'
          valueStyle.right = `calc( ${outBorderDisplay ? outBorder.inMargin.rightMargin : 0}px + ${horiOffset}px)`
          valueStyle.top = vertOffset
          valueStyle.marginTop = (getProgressBarStyle.height - message.height - borderWidth * 2) / 2
          break
        default:
          progressBoxStyle.display = 'flex'
          progressBoxStyle.justifyContent = 'space-between'
          progressBoxStyle.alignItems = 'center'
          valueStyle.left = horiOffset
          break
      }
    }

    const messageBgStyle = sectionMes || messageBg

    if (messageBgStyle.type === 'color') {
      valueStyle.background = messageBgStyle.display ? messageBgStyle.bgColor : 'none'
    } else {
      valueStyle.backgroundImage = messageBgStyle.display ? `url(${messageBgStyle.imageUrl})` : 'none'
    }

    return {
      progressBoxStyle,
      valueStyle
    }
  }, [horiOffset, position, arrangement, value, getProgressBarStyle, outBorderDisplay, sectionMes, messageBg])

  const inLeft = useMemo(() => {
    if (animat || arrangement !== 'self') {
      return getContainerStyle.valueStyle.left
    } else if (arrangement === 'self') {
      return proportion + '%'
    }
    return 0 + '%'
  }, [animat, arrangement, getContainerStyle.valueStyle.left, proportion])

  return (
    <div
      className='progress-bar-box'
      style={{
        width: globalWidth,
        ...getProgressBarStyle,
        ...style,
        ...getContainerStyle.progressBoxStyle
      }}>
      {(position !== 'in' || !outBorderDisplay) && (
        <ProgressBgBar
          globalWidth={globalWidth}
          barRadius={barRadius}
          barWidth={barWidth}
          grildNumMemo={grildNumMemo}
          gridConfig={gridConfig}
        />
      )}
      <ProgressInnerBar
        globalWidth={globalWidth}
        animat={animat}
        barRadius={barRadius}
        barWidth={barWidth}
        grildNumMemo={grildNumMemo}
        gridConfig={gridConfig}
        value={value}
        proportion={proportion}
        animateConfig={animateConfig}
        data={data}
      />
      {position === 'in' && outBorderDisplay && message.display && (
        <div
          className='in-value'
          style={{
            ...getContainerStyle.valueStyle,
            width: message.width,
            height: message.height,
            ...textConfig.textStyle,
            left: inLeft,
            ...(sectionText?.display ? sectionText : {})
          }}>
          {animat ? (
            <NumberFlop
              animateConfig={animateConfig}
              textConfig={textConfig}
              timer={animateConfig.timer}
              proportion={proportion}
              data={data}
            />
          ) : (
            <span>
              {animateConfig.display
                ? proportion + (!textConfig.trueValue ? '%' : '')
                : 0 + (!textConfig.trueValue ? '%' : '')}
            </span>
          )}
        </div>
      )}
    </div>
  )
})
