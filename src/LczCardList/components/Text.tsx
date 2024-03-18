import React, { memo, CSSProperties } from 'react'
import { analysisExpression } from '../../common/util'
import { TextConfig } from '../type/child'

type TextType = {
  textConfig: TextConfig
  textVal: string
  containData: any
  id: any
  expPathArr: string[]
}
const Text = memo(({ textConfig, textVal, containData, id, expPathArr }: TextType) => {
  const {
    overflow = 'hidden',
    richText = false,
    newlineLimit = 'none',
    maxRow = 1,
    lineHeight,
    fontStyle,
    textStyleSeries = []
  } = textConfig

  let style: CSSProperties = {
    ...fontStyle,
    overflow: 'hidden',
    lineHeight: lineHeight?.type === 'fixed' ? `${lineHeight.fixedNum}px` : lineHeight?.multipleNum || 1
  }

  switch (overflow) {
    case 'hidden': {
      style.whiteSpace = 'nowrap'
      break
    }
    case 'ellipsis': {
      style.whiteSpace = 'nowrap'
      style.textOverflow = 'ellipsis'
      break
    }
    case 'lineFeed': {
      if (newlineLimit === 'row' && maxRow > 0) {
        style.textOverflow = 'ellipsis'
        style.wordBreak = 'break-all'
        style.display = '-webkit-box'
        style.WebkitLineClamp = maxRow
        style.WebkitBoxOrient = 'vertical'
      }
    }
  }

  if (textStyleSeries.length > 0) {
    const findSeries = textStyleSeries.find((item, i) =>
      Boolean(
        analysisExpression(item.condition, containData, id, {
          name: 'textStyleSeries[].condition',
          pathArr: [...expPathArr, `textStyleSeries[${i}]`]
        })
      )
    )
    findSeries && (style = { ...style, ...findSeries })
  }

  if (!richText) return <span style={style}>{textVal}</span>
  return <span style={style} dangerouslySetInnerHTML={{ __html: textVal }} />
})

Text.displayName = 'Text'
export default Text
