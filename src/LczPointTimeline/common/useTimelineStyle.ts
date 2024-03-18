import { CSSProperties } from 'react'
import { usemMemo } from '../../common/hooks'
import { alignType, getTextStyle, numberIsEmpty } from '../../common/util'
import { LczPointTimelineProps } from '../type'

export type BothSideStyleType = {
  point: CSSProperties
  label: CSSProperties
  content: CSSProperties
  cPoint: CSSProperties
  cLabel: CSSProperties
  cContent: CSSProperties
}

const expDirectionMap = {
  up: 'bottom',
  down: 'top'
}

export default function useTimelineStyle(props: LczPointTimelineProps) {
  const { globalConfig, timelineConfig } = props,
    { direction = 'level', distribution = 'unilateral', itemAxisWidth = 60, lineStyle } = globalConfig || {},
    { defaultStyle, currentStyle } = timelineConfig || {},
    isLevel = direction === 'level',
    pos = isLevel ? 0 : '50%'
  const dPoint = defaultStyle?.point,
    cPoint = currentStyle?.point,
    dLabel = defaultStyle?.labelStyle,
    cLabel = currentStyle?.labelStyle,
    dContent = defaultStyle?.contentStyle,
    cContent = currentStyle?.contentStyle

  const timelineStyle = usemMemo(() => {
    const { xOffset: dPointXOffset = 0, yOffset: dPointYOffset = 0 } = dPoint || {},
      { xOffset: cPointXOffset = 0, yOffset: cPointYOffset = 0 } = cPoint || {},
      {
        width: dLabelWidth,
        height: dLabelHeight,
        yAlign: dLabelYAlign = 'top',
        expDirection: dLabelExpDirection = 'down',
        xOffset: dLabelXOffset = 0,
        yOffset: dLabelYOffset = 0
      } = dLabel || {},
      {
        width: cLabelWidth,
        height: cLabelHeight,
        yAlign: cLabelYAlign = 'top',
        expDirection: cLabelExpDirection = 'down',
        xOffset: cLabelXOffset = 0,
        yOffset: cLabelYOffset = 0
      } = cLabel || {},
      {
        width: dContentWidth,
        height: dContentHeight,
        yAlign: dContentYAlign = 'top',
        xOffset: dContentXOffset = 0,
        expDirection: dContentExpDirection = 'down',
        yOffset: dContentYOffset = 0
      } = dContent || {},
      {
        width: cContentWidth,
        height: cContentHeight,
        yAlign: cContentYAlign = 'top',
        expDirection: cContentExpDirection = 'down',
        xOffset: cContentXOffset = 0,
        yOffset: cContentYOffset = 0
      } = cContent || {}

    const itemLine: CSSProperties = {
      width: itemAxisWidth,
      height: itemAxisWidth,
      backgroundColor: lineStyle?.color || 'transparent'
    }
    isLevel ? (itemLine.height = lineStyle?.size) : (itemLine.width = lineStyle?.size)
    const defaultPoint: CSSProperties = {
      width: dPoint?.width,
      height: dPoint?.height,
      backgroundImage: `url(${dPoint?.imgUrl})`,
      transform: `translate(calc(-50% + ${dPointXOffset}px), calc(-50% + ${dPointYOffset}px))`
    }
    const activePoint: CSSProperties = {
      width: cPoint?.width,
      height: cPoint?.height,
      backgroundImage: `url(${cPoint?.imgUrl})`,
      transform: `translate(calc(-50% + ${cPointXOffset}px), calc(-50% + ${cPointYOffset}px))`
    }
    const defaultLabel: CSSProperties = {
      textAlign: dLabel?.xAlign,
      transform: `translate(calc(-50% + ${dLabelXOffset}px), ${dLabelYOffset}px)`,
      ...getTextStyle(dLabel?.textStyle)
    }
    const activeLabel: CSSProperties = {
      textAlign: cLabel?.xAlign,
      transform: `translate(calc(-50% + ${cLabelXOffset}px), ${cLabelYOffset}px)`,
      ...getTextStyle(cLabel?.textStyle)
    }
    defaultLabel[expDirectionMap[dLabelExpDirection]] = pos
    activeLabel[expDirectionMap[cLabelExpDirection]] = pos

    const defaultContent: CSSProperties = {
      textAlign: dContent?.xAlign,
      transform: `translate(calc(-50% + ${dContentXOffset}px), ${dContentYOffset}px)`,
      gap: dContent?.itemGap,
      ...getTextStyle(dContent?.textStyle)
    }
    const activeContent: CSSProperties = {
      textAlign: cContent?.xAlign,
      transform: `translate(calc(-50% + ${cContentXOffset}px), ${cContentYOffset}px)`,
      gap: cContent?.itemGap,
      ...getTextStyle(cContent?.textStyle)
    }
    defaultContent[expDirectionMap[dContentExpDirection]] = pos
    activeContent[expDirectionMap[cContentExpDirection]] = pos

    numberIsEmpty(dLabelWidth) ? (defaultLabel.width = dLabelWidth) : (defaultLabel.whiteSpace = 'nowrap')
    numberIsEmpty(cLabelWidth) ? (activeLabel.width = cLabelWidth) : (activeLabel.whiteSpace = 'nowrap')
    numberIsEmpty(dContentWidth) ? (defaultContent.width = dContentWidth) : (defaultContent.whiteSpace = 'nowrap')
    numberIsEmpty(cContentWidth) ? (activeContent.width = cContentWidth) : (activeContent.whiteSpace = 'nowrap')

    if (!isLevel) {
      numberIsEmpty(dLabelHeight) &&
        ((defaultLabel.height = dLabelHeight), (defaultLabel.justifyContent = alignType[dLabelYAlign]))
      numberIsEmpty(cLabelHeight) &&
        ((activeLabel.height = cLabelHeight), (activeLabel.justifyContent = alignType[cLabelYAlign]))
      numberIsEmpty(dContentHeight) &&
        ((defaultContent.height = dContentHeight), (defaultContent.justifyContent = alignType[dContentYAlign]))
      numberIsEmpty(cContentHeight) &&
        ((activeContent.height = cContentHeight), (activeContent.justifyContent = alignType[cContentYAlign]))
    }

    return { line: itemLine, defaultPoint, activePoint, defaultLabel, activeLabel, defaultContent, activeContent }
  }, [itemAxisWidth, isLevel, lineStyle, timelineConfig])

  const timelineBothSideStyle = usemMemo(() => {
    if (distribution !== 'bothSides') return { point: {}, label: {}, content: {} }

    const { xOffset: dPointXOffset = 0, yOffset: dPointYOffset = 0, bothSideSpacing: dPointBothSideSpacing = 0 } =
        dPoint || {},
      { xOffset: cPointXOffset = 0, yOffset: cPointYOffset = 0, bothSideSpacing: cPointBothSideSpacing = 0 } =
        cPoint || {},
      { xOffset: dLabelXOffset = 0, yOffset: dLabelYOffset = 0, bothSideSpacing: dLabelBothSideSpacing = 0 } =
        dLabel || {},
      { xOffset: cLabelXOffset = 0, yOffset: cLabelYOffset = 0, bothSideSpacing: cLabelBothSideSpacing = 0 } =
        cLabel || {},
      { xOffset: dContentXOffset = 0, yOffset: dContentYOffset = 0, bothSideSpacing: dContentBothSideSpacing = 0 } =
        dContent || {},
      { xOffset: cContentXOffset = 0, yOffset: cContentYOffset = 0, bothSideSpacing: cContentBothSideSpacing = 0 } =
        cContent || {}

    const flipAxis = isLevel ? 'Y' : 'X'

    const topStyle: BothSideStyleType = {
      point: {},
      label: { top: 'initial', bottom: pos },
      content: { top: 'initial', bottom: pos },
      cPoint: {},
      cLabel: { top: 'initial', bottom: pos },
      cContent: { top: 'initial', bottom: pos }
    }
    const bottomStyle: BothSideStyleType = {
      point: {},
      label: { top: pos, bottom: 'initial' },
      content: { top: pos, bottom: 'initial' },
      cPoint: {},
      cLabel: { top: pos, bottom: 'initial' },
      cContent: { top: pos, bottom: 'initial' }
    }

    if (isLevel) {
      // 默认标记
      topStyle.point.transform = `translate(calc(-50% + ${dPointXOffset}px), calc(-50% - ${dPointBothSideSpacing}px))`
      bottomStyle.point.transform = `translate(calc(-50% + ${dPointXOffset}px), calc(-50% + ${dPointBothSideSpacing}px)) scale${flipAxis}(-1)`
      // 选中标记
      topStyle.cPoint.transform = `translate(calc(-50% + ${cPointXOffset}px), calc(-50% - ${cPointBothSideSpacing}px))`
      bottomStyle.cPoint.transform = `translate(calc(-50% + ${cPointXOffset}px), calc(-50% + ${cPointBothSideSpacing}px))  scale${flipAxis}(-1)`
      // 默认标签
      topStyle.label.transform = `translate(calc(-50% + ${dLabelXOffset}px), -${dLabelBothSideSpacing}px)`
      bottomStyle.label.transform = `translate(calc(-50% + ${dLabelXOffset}px), ${dLabelBothSideSpacing}px)`
      // 选中标签
      topStyle.cLabel.transform = `translate(calc(-50% + ${cLabelXOffset}px), -${cLabelBothSideSpacing}px)`
      bottomStyle.cLabel.transform = `translate(calc(-50% + ${cLabelXOffset}px), ${cLabelBothSideSpacing}px)`
      // 默认文本
      topStyle.content.transform = `translate(calc(-50% + ${dContentXOffset}px), -${dContentBothSideSpacing}px)`
      bottomStyle.content.transform = `translate(calc(-50% + ${dContentXOffset}px), ${dContentBothSideSpacing}px)`
      // 选中文本
      topStyle.cContent.transform = `translate(calc(-50% + ${cContentXOffset}px), -${cContentBothSideSpacing}px)`
      bottomStyle.cContent.transform = `translate(calc(-50% + ${cContentXOffset}px), ${cContentBothSideSpacing}px)`
    } else {
      // 默认标记
      topStyle.point.transform = `translate(calc(-50% - ${dPointBothSideSpacing}px), calc(-50% + ${dPointYOffset}px))`
      bottomStyle.point.transform = `translate(calc(-50% + ${dPointBothSideSpacing}px), calc(-50% + ${dPointYOffset}px)) scale${flipAxis}(-1)`
      // 选中标记
      topStyle.cPoint.transform = `translate(calc(-50% - ${cPointBothSideSpacing}px), calc(-50% + ${cPointYOffset}px))`
      bottomStyle.cPoint.transform = `translate(calc(-50% + ${cPointBothSideSpacing}px), calc(-50% + ${cPointYOffset}px)) scale${flipAxis}(-1)`
      // 默认标签
      topStyle.label.right = 0
      topStyle.label.top = pos
      topStyle.label.bottom = 'initial'
      topStyle.label.left = 'initial'
      topStyle.label.transform = `translate(${-dLabelBothSideSpacing}px, ${dLabelYOffset}px)`
      bottomStyle.label.left = 0
      bottomStyle.label.top = pos
      bottomStyle.label.bottom = 'initial'
      bottomStyle.label.transform = `translate(${dLabelBothSideSpacing}px, ${dLabelYOffset}px)`
      // 选中标签
      topStyle.cLabel.right = 0
      topStyle.cLabel.top = pos
      topStyle.cLabel.bottom = 'initial'
      topStyle.cLabel.left = 'initial'
      topStyle.cLabel.transform = `translate(${-cLabelBothSideSpacing}px, ${cLabelYOffset}px)`
      bottomStyle.cLabel.left = 0
      bottomStyle.cLabel.top = pos
      bottomStyle.cLabel.bottom = 'initial'
      bottomStyle.cLabel.transform = `translate(${cLabelBothSideSpacing}px, ${cLabelYOffset}px)`
      // 默认文本
      topStyle.content.right = 0
      topStyle.content.top = pos
      topStyle.content.bottom = 'initial'
      topStyle.content.left = 'initial'
      topStyle.content.transform = `translate(${-dContentBothSideSpacing}px, ${dContentYOffset}px)`
      bottomStyle.content.right = 0
      bottomStyle.content.top = pos
      bottomStyle.content.bottom = 'initial'
      bottomStyle.content.transform = `translate(${dContentBothSideSpacing}px, ${dContentYOffset}px)`
      // 选中文本
      topStyle.cContent.right = 0
      topStyle.cContent.top = pos
      topStyle.cContent.bottom = 'initial'
      topStyle.cContent.left = 'initial'
      topStyle.cContent.transform = `translate(${-cContentBothSideSpacing}px, ${cContentYOffset}px)`
      bottomStyle.cContent.right = 0
      bottomStyle.cContent.top = pos
      bottomStyle.cContent.bottom = 'initial'
      bottomStyle.cContent.transform = `translate(${cContentBothSideSpacing}px, ${cContentYOffset}px)`
    }

    return [
      {
        default: { point: topStyle.point, label: topStyle.label, content: topStyle.content },
        current: { point: topStyle.cPoint, label: topStyle.cLabel, content: topStyle.cContent }
      },
      {
        default: { point: bottomStyle.point, label: bottomStyle.label, content: bottomStyle.content },
        current: { point: bottomStyle.cPoint, label: bottomStyle.cLabel, content: bottomStyle.cContent }
      }
    ]
  }, [distribution, isLevel, timelineConfig])

  function getBothSideStyle(i: number, isActive = false) {
    if (distribution !== 'bothSides') return timelineBothSideStyle
    const style = timelineBothSideStyle[i % 2]
    return isActive ? style.current : style.default
  }

  return { timelineStyle, getBothSideStyle }
}
