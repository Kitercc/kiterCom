import React, { memo, useMemo, CSSProperties, useCallback } from 'react'
import { analysisExpression } from '../../common/util'
import { TagsConfig } from '../type/child'

type TagsProps = {
  value: string
  tagsConfig: TagsConfig
  id: string
  expPathArr: string[]
  containData: any
}

const Tags = memo(({ value, tagsConfig, id, expPathArr, containData }: TagsProps) => {
  const { separator = '', gap = 0, styleSeries = [], ...tagOther } = tagsConfig

  const tagList = useMemo(() => {
    let list: string[] = []
    const val = String(value || '')
    if (separator && val) {
      list = val.split(separator)
    } else {
      list = val ? [val] : []
    }
    return list
  }, [value, separator])

  const tagNormalStyle = useMemo(() => {
    const { xPadding = 0, yPadding = 0, normalStyle } = tagOther
    const tagStyle: CSSProperties = {
      padding: `${yPadding}px ${xPadding}px`,
      backgroundColor: normalStyle?.bgColor || 'transparent',
      ...normalStyle?.fontStyle,
      borderRadius: normalStyle?.radius || 0
    }

    if (normalStyle?.border?.display) {
      tagStyle.border = `${normalStyle?.border?.width || 0}px solid ${normalStyle?.border?.color || 'transparent'}`
    }

    return tagStyle
  }, [JSON.stringify(tagOther)])

  const seriesStyle = useCallback(
    val => {
      const style: CSSProperties = {}

      if (styleSeries.length > 0) {
        const findStyle = styleSeries.find((item, i) => {
          if (item.condition && item.condition instanceof Object) {
            return (
              item.condition?.value !== '' &&
              item.condition?.value !== 'Execute Expression Error' &&
              item.condition?.value == val
            )
          } else {
            const condition = analysisExpression(item.condition, containData, id, {
              name: 'tagsConfig.styleSeries[].condition',
              pathArr: [...expPathArr, `styleSeries[${i}]`]
            })
            return condition !== false && condition !== '' && condition == val
          }
        })

        if (findStyle) {
          const { bgColor = 'transparent', radius = 0, border } = findStyle
          style.backgroundColor = bgColor
          style.borderRadius = radius
          Object.assign(style, findStyle.fontStyle)
          if (border?.display) {
            style.border = `${border?.width || 0}px solid ${border?.color || 'transparent'}`
          } else {
            style.border = 'none'
          }
        }
      }

      return style
    },
    [styleSeries, containData]
  )

  return (
    <ul className='tags-field-con' style={{ gap }}>
      {tagList.map((item, i) => (
        <li key={i} style={{ ...tagNormalStyle, ...seriesStyle(item) }}>
          {item}
        </li>
      ))}
    </ul>
  )
})

Tags.displayName = 'Tags'
export default Tags
