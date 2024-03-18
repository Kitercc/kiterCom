import React, { CSSProperties, Fragment, memo, useCallback } from 'react'
import { Progress } from 'antd'
import { ColumnArr, TextStyle } from '../type'
import { LczSlideTitle } from '../..'
import { ProgressWrapper } from '../style'
import { alignType, analysisExpression, getSectionColors } from '../../common/util'
import { gradientColor, numberForMat } from '../common'
import { defaultProgressOutline, defaultTipConfig } from '../common/defaultValue'
import TooltipWrapper from './TooltipWrapper'
import { usemMemo } from '../../common/hooks'

interface ProgressProps {
  id: string
  colItem: ColumnArr
  item: any
  data: any
  fontStyle: TextStyle
  expPathArr?: string[]
}

export default memo(function ProgressItems(props: ProgressProps) {
  const { id = '', colItem, item, fontStyle, data = [], expPathArr } = props,
    {
      field,
      subTitle,
      alignType: align = 'center',
      suffix,
      contentOverflow,
      interval = 8,
      constantPlay = false,
      constanDuration = 1,
      progressWidth = 80,
      progressHeight = 8,
      progressType = 'line',
      numberFormat,

      progressColorType = 'bicolor',
      progressStartColor = 'red',
      progressEndColor = 'green',
      multiColor,

      progressText,
      sectionStyleFlag = true,
      sectionStyle = [],
      progressOutline = defaultProgressOutline,
      tipConfig = defaultTipConfig,
      progressMaxValType = 'filedMax',
      progressMaxVal = ''
    } = colItem,
    progressVal = item[field],
    formatval = numberForMat(progressVal, numberFormat),
    showValue = !isNaN(Number(progressVal))

  const progressTextColor = usemMemo(() => {
    let style: CSSProperties = {}
    if (sectionStyleFlag && sectionStyle.length > 0) {
      sectionStyle.forEach(v => {
        const { progressMin = 1, progressMax = 1 } = v
        if (progressVal <= progressMax && progressVal > progressMin) {
          style = { color: v.color, fontWeight: v.fontWeight, fontSize: v.fontSize } as CSSProperties
        }
      })
    }
    return style
  }, [item, field, sectionStyleFlag, sectionStyle])

  const progressBarTransitColor: any = usemMemo(() => {
    const _sectionStyle =
      sectionStyleFlag &&
      [...sectionStyle]
        .reverse()
        .find(({ progressMax = 0, progressMin = 0 }) => progressMax >= progressVal && progressVal >= progressMin)

    if (progressType === 'line') {
      // 条形
      if (progressColorType === 'bicolor') {
        let strokeColor = { from: '', to: '' }
        if (!_sectionStyle) return { from: progressStartColor, to: progressEndColor }
        const progressColor = _sectionStyle.progressColor
        if (progressColor?.display) {
          strokeColor = { from: progressColor?.startColor, to: progressColor?.endColor }
        } else {
          strokeColor = { from: progressStartColor, to: progressEndColor }
        }

        return strokeColor
      } else {
        let colorObj = multiColor
        if (_sectionStyle && _sectionStyle.progressColor?.display) {
          colorObj = _sectionStyle.progressColor.multiColor
        }

        const { selected = 'single', single = '#8EF5FF', gradient = { colors: [] } } = colorObj
        if (selected === 'single' || gradient.colors.length === 1) {
          const color = selected === 'single' ? single : gradient.colors[0].value
          return { from: color, to: color }
        } else {
          const isZero = gradient.colors.every(color => color.begins == 0)
          const speed = isZero ? (1 / (gradient.colors.length - 1)) * 100 : 0
          return gradient.colors.reduce((pre, cur, i) => {
            if (!isZero) {
              pre[`${cur.begins}%`] = cur.value
            } else {
              pre[`${i * speed}%`] = cur.value
            }
            return pre
          }, {})
        }
      }
    } else {
      // 栅格
      let color: string[] = []
      if (progressColorType === 'bicolor') {
        if (!_sectionStyle) return gradientColor(progressStartColor, progressEndColor, 10)
        const progressColor = _sectionStyle.progressColor
        if (progressColor?.display) {
          color = gradientColor(progressColor?.startColor, progressColor?.endColor, 10)
        } else {
          color = gradientColor(progressStartColor, progressEndColor, 10)
        }
      } else {
        let colorObj = multiColor
        if (_sectionStyle && _sectionStyle.progressColor?.display) {
          colorObj = _sectionStyle.progressColor.multiColor
        }
        const { selected = 'single', single = '#8EF5FF', gradient = { colors: [] } } = colorObj

        if (selected === 'single' || gradient.colors.length === 1) {
          const _color = selected === 'single' ? single : gradient.colors[0].value
          color = Array(10).fill(_color)
        } else {
          const isZero = gradient.colors.every(color => color.begins == 0),
            speed = isZero ? (1 / (gradient.colors.length - 1)) * 100 : 0,
            colorLen = gradient.colors.length

          const colors = !isZero ? gradient.colors : gradient.colors.map((v, i) => ({ ...v, begins: i * speed }))
          if (!isZero && gradient.colors[colorLen - 1].begins !== 100) {
            gradient.colors.push({ begins: 100, value: gradient.colors[colorLen - 1].value })
          }
          return getSectionColors(colors)
        }
      }
      return color
    }
  }, [
    item,
    field,
    sectionStyleFlag,
    sectionStyle,
    progressStartColor,
    progressColorType,
    progressEndColor,
    multiColor,
    progressType
  ])

  const getProgressValue = usemMemo(() => {
    let valMax

    if (progressVal < 0) return 0
    if (progressMaxValType === 'filedMax') {
      valMax = Math.max(...data.map(v => (isNaN(v[field]) ? 0 : v[field])))
    } else {
      valMax = +analysisExpression(progressMaxVal, item, id, {
        name: 'customCol[].progressMaxVal',
        pathArr: expPathArr
      })
    }
    valMax = isNaN(valMax) ? 0 : valMax

    return valMax == 0 ? 0 : progressVal > valMax ? 100 : (progressVal / valMax) * 100
  }, [field, item, data, progressMaxValType, progressMaxVal])

  const subTitleData = usemMemo(() => {
    const position = subTitle?.position || 'onAfter',
      space = (subTitle?.space || 0) + 'px'
    return {
      contOrd: position === 'onAfter' ? 1 : 2,
      subOrd: position === 'onAfter' ? 2 : 1,
      subSpce: position === 'onAfter' ? `${space} 0px 0px` : `0px 0px ${space}`,
      data: subTitle?.field ? subTitle.field.split(',') : []
    }
  }, [subTitle])

  const outLineStyle = usemMemo(() => {
    const _style: {
      padding: string
      w: number
      h: number
      bgColor: string
      border: string
      borderRadius: number
    } = {
      w: progressWidth,
      h: progressHeight,
      padding: '0 0',
      bgColor: 'rgba(0,0,0,0)',
      border: 'none',
      borderRadius: 0
    }
    if (progressOutline.display) {
      const {
        xPadding = 4,
        yPadding = 4,
        bgColor = 'rgba(0,0,0,0)',
        fillet = 0,
        borderColor = 'rgba(61,153,252,0.4)',
        borderWidth = 1
      } = progressOutline

      _style.w = progressWidth + xPadding * 2 + borderWidth * 2
      _style.h = progressHeight + yPadding * 2 + borderWidth * 2
      _style.bgColor = bgColor
      _style.borderRadius = fillet
      _style.border = `${borderWidth}px solid ${borderColor}`
      _style.padding = `${yPadding}px ${xPadding}px`
    }

    return _style
  }, [progressOutline, progressWidth, progressHeight])

  // 根据类型 获取不同的进度条组件
  const getProgress = useCallback(
    percent => {
      if (progressType === 'line') {
        return (
          <Fragment>
            <Progress percent={percent} showInfo={false} strokeColor={progressBarTransitColor} />
            {progressText?.display && <span className='grid-value'>{formatval}</span>}
          </Fragment>
        )
      } else {
        const floorValue: number = Math.floor(percent / 10)

        return (
          <Fragment>
            <div className='grid-box'>
              {new Array(10).fill(null).map((_, i) => {
                return (
                  <span
                    key={i}
                    className='progress-grid'
                    style={{
                      width: (progressWidth - 18) / 10,
                      height: progressHeight,
                      background: floorValue > i ? progressBarTransitColor[i] : 'rgba(0, 0, 0, 0)'
                    }}
                  />
                )
              })}
            </div>
            {progressText?.display && <span className='grid-value'>{formatval}</span>}
          </Fragment>
        )
      }
    },
    [progressWidth, progressHeight, progressType, progressStartColor, progressEndColor, numberFormat]
  )

  const SubTitleContent = val => {
    let SubTitleContent = (
      <span
        className='content-text'
        style={{
          order: subTitleData.subOrd,
          margin: subTitleData.subSpce,
          ...subTitle?.textStyle,
          wordBreak: contentOverflow === 'ellipsis' ? 'keep-all' : 'break-word',
          whiteSpace: contentOverflow === 'ellipsis' ? 'nowrap' : 'initial',
          ...fontStyle
        }}>
        {val}
      </span>
    )
    if (contentOverflow === 'ellipsis' && tipConfig.display) {
      SubTitleContent = (
        <TooltipWrapper tipConfig={tipConfig} value={val}>
          {SubTitleContent}
        </TooltipWrapper>
      )
    }

    return SubTitleContent
  }

  let ProgressContent = (
    <div
      className='progress-box'
      style={{
        order: subTitleData.contOrd,
        width: progressText?.display ? '100%' : 'auto',
        justifyContent: alignType[align]
      }}>
      {showValue ? getProgress(getProgressValue) : <span>{progressVal}</span>}
      <i style={{ ...suffix?.textStyle, ...fontStyle }}>{suffix?.display && suffix.content}</i>
    </div>
  )

  if (contentOverflow === 'ellipsis' && tipConfig.display) {
    const val = showValue ? formatval : progressVal
    ProgressContent = (
      <TooltipWrapper tipConfig={tipConfig} value={val}>
        {ProgressContent}
      </TooltipWrapper>
    )
  }

  const slideTitleAniamte = {
    carousel: true,
    duration: interval * 1000,
    constantPlay,
    constanDuration: constanDuration * 1000
  }
  return (
    <ProgressWrapper
      enColor={progressBarTransitColor.to}
      progressWidth={progressWidth}
      progressHeight={progressHeight}
      fontSize={fontStyle.fontSize || progressTextColor.fontSize || progressText?.fontSize}
      outLineStyle={outLineStyle}
      style={{ ...progressText, ...progressTextColor, alignItems: alignType[align], ...fontStyle }}>
      {contentOverflow === 'slidetitle' ? (
        <div className='slide-box'>
          <LczSlideTitle w={colItem.colWidth} style={{ order: subTitleData.contOrd }} animateConfig={slideTitleAniamte}>
            <div className='progress-box' style={{ width: progressText?.display ? '100%' : 'auto' }}>
              {showValue ? getProgress(getProgressValue) : <span>{progressVal}</span>}
              <i style={{ ...suffix?.textStyle, ...fontStyle }}>{suffix?.display && suffix.content}</i>
            </div>
          </LczSlideTitle>
          {subTitle?.display &&
            subTitleData.data.map((v, i) => {
              return (
                <Fragment key={i}>
                  {item[v] ? (
                    <LczSlideTitle
                      w={colItem.colWidth}
                      style={{
                        order: subTitleData.subOrd,
                        ...subTitle.textStyle,
                        ...fontStyle
                      }}
                      data={[{ value: item[v] }]}
                      animateConfig={slideTitleAniamte}
                    />
                  ) : null}
                </Fragment>
              )
            })}
        </div>
      ) : (
        <Fragment>
          {ProgressContent}
          {subTitle?.display &&
            subTitleData.data.map((v, i) => {
              return <Fragment key={i}>{item[v] ? SubTitleContent(item[v]) : null}</Fragment>
            })}
        </Fragment>
      )}
    </ProgressWrapper>
  )
})
