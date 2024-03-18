import React, { CSSProperties, memo, useMemo } from 'react'
import { analysisExpression } from '../../common/util'
import { ProgressConfig } from '../type/child'
import { getSectionColor } from '../common'
import { numberForMat } from '../../LczCarouselTable/common'
import { usemMemo } from '../../common/hooks'

type ProgressType = {
  value: number | string
  progressConfig: ProgressConfig
  containData: any
  id: any
  expPathArr: string[]
}

const Progress = memo(({ value, progressConfig, containData, id, expPathArr }: ProgressType) => {
  const val = value !== '' && value !== null ? +value : NaN
  const {
    maxVal = '',
    suffixConfig,
    progressStyle: _progressStyle,
    numberFormat,
    progressText,
    progressStyleIntervalFlag: styleIntervalFlag = false,
    progressStyleInterval: styleInterval = [],
    progressOutline
  } = progressConfig

  const {
    progressType = 'line',
    progressWidth = 0,
    progressHeight = 0,
    gridGap = 4,
    gridLength = 10,
    radius = 2,
    gridColorType = 'system',
    progressStartColor,
    progressEndColor,
    progressImage
  } = _progressStyle || {}

  const SuffixCon = useMemo(() => {
    const { display, content = '', yOffset = 0, fontStyle = {} } = suffixConfig || {}
    const suffixVal = analysisExpression(content || '', containData, id, {
      name: 'progressConfig.suffixConfig.suffix',
      pathArr: expPathArr
    })
    if (!display || suffixVal === '' || suffixVal === false) return null

    return (
      <span className='progress-suffix' style={{ ...fontStyle, transform: `translateY(${yOffset}px)` }}>
        {suffixVal}
      </span>
    )
  }, [JSON.stringify(containData), JSON.stringify(suffixConfig)])

  const valCon = (v, style = {}) =>
    progressText?.display && (
      <span className='progress-val' style={{ ...progressText, ...style }}>
        {v}
      </span>
    )

  const styles = usemMemo(() => {
    const conStyle: CSSProperties = {}
    if (progressOutline?.display) {
      conStyle.padding = `${progressOutline.yPadding}px ${progressOutline.xPadding}px`
      conStyle.backgroundColor = progressOutline.bgColor
      conStyle.border = `${progressOutline.borderWidth}px solid ${progressOutline.borderColor}`
      conStyle.borderRadius = progressOutline.fillet
    }

    const customStyle: CSSProperties = {},
      progressStyle = { progressStartColor, progressEndColor, progressImage }

    if (styleIntervalFlag && styleInterval.length > 0) {
      const findStyle = styleInterval.find(v => v.min <= val && v.max >= val)
      if (findStyle) {
        customStyle.fontSize = findStyle.fontSize
        customStyle.color = findStyle.color
        customStyle.fontWeight = findStyle.fontWeight
        progressStyle.progressStartColor = findStyle.progressColor?.progressStartColor || ''
        progressStyle.progressEndColor = findStyle.progressColor?.progressEndColor || ''
        progressStyle.progressImage = findStyle.progressImage || ''
      }
    }

    return { conStyle, customStyle, progressStyle }
  }, [progressOutline, progressStartColor, progressEndColor, progressImage, styleIntervalFlag, styleInterval, val])

  if (isNaN(val)) return valCon(value)

  let progressMaxVal = analysisExpression(maxVal, containData, id, {
    name: 'progressConfig.maxVal',
    pathArr: expPathArr
  })
  progressMaxVal = isNaN(progressMaxVal) ? 0 : progressMaxVal
  const progressVal = progressMaxVal == 0 ? 0 : val > progressMaxVal ? 100 : (val / progressMaxVal) * 100

  // 获取进度条的JSX
  function getProgress({ progressStartColor, progressEndColor, progressImage }) {
    let Progress: JSX.Element = <></>
    const getEndColor = (v, max = progressMaxVal) => getSectionColor(progressStartColor, progressEndColor, v, [0, max])
    switch (progressType) {
      case 'line': {
        const endColor = getEndColor(value),
          color = `linear-gradient(to right, ${progressStartColor}, ${endColor})`

        const width = progressVal < 0 ? 0 : progressVal > 100 ? 100 : progressVal

        Progress = (
          <div style={{ width: progressWidth, height: progressHeight }}>
            <div style={{ backgroundImage: color, height: progressHeight, width: `${width}%`, borderRadius: radius }} />
          </div>
        )
        break
      }
      case 'grid': {
        const itemLen = 100 / gridLength
        const liWidth = (progressWidth - gridGap * (gridLength - 1)) / gridLength,
          liLen = Math.ceil((progressVal > 100 ? 100 : progressVal) / itemLen)

        const colors = new Array(liLen > 0 ? liLen : 0).fill('').map((_, i) => {
          const v = (i + 1) * 10
          return gridColorType === 'system' ? getEndColor(v, 100) : 'rgba(0,0,0,0)'
        })

        const liStyle = (color, i) => {
          const li: CSSProperties = { width: liWidth }
          const inner: CSSProperties = {
            backgroundColor: color,
            width: liWidth
          }

          if (gridColorType === 'custom') {
            inner.backgroundImage = `url(${progressImage})`
            inner.backgroundSize = '100% 100%'
          }

          // 设置圆角
          if (liLen === 1) {
            inner.borderRadius = radius
          } else {
            if (i === 0) {
              inner.borderTopLeftRadius = radius
              inner.borderBottomLeftRadius = radius
            }
            if (i === liLen - 1) {
              inner.borderTopRightRadius = radius
              inner.borderBottomRightRadius = radius
            }
          }

          if (i === colors.length - 1) {
            const deep = progressVal % itemLen
            if (deep > 0) {
              li.width = liWidth * (deep / itemLen)
            }
          }

          return { li, inner }
        }

        Progress = (
          <ul className='progress-grid' style={{ width: progressWidth, height: progressHeight, gap: gridGap }}>
            {colors.map((color, i) => (
              <li key={i} style={liStyle(color, i).li}>
                <span style={liStyle(color, i).inner} />
              </li>
            ))}
          </ul>
        )
        break
      }
    }

    return Progress
  }

  return (
    <div className='progress-field-con'>
      <div className='progress-con' style={styles.conStyle}>
        {getProgress(styles.progressStyle)}
      </div>
      {valCon(numberForMat(val, numberFormat), styles.customStyle)}
      {SuffixCon}
    </div>
  )
})

Progress.displayName = 'Progress'
export default Progress
