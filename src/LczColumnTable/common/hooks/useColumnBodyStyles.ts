import { CSSProperties, useCallback } from 'react'
import { cloneDeep } from 'lodash'
import { usemMemo } from '../../../common/hooks'
import { numberIsEmpty } from '../../../common/util'
import { GlobalConfig, LineConfig } from '../../type'

type useColumnBodyStylesProps = {
  tableBodyHeight: number
  globalConfig?: GlobalConfig
  lineconfig?: LineConfig
}

export default function useColumnBodyStyles({ tableBodyHeight, globalConfig, lineconfig }: useColumnBodyStylesProps) {
  const { arrangementMode = 'portrait', rowNumber = 4, lineHeight } = globalConfig || {},
    { lineSpeed = 0, border: lineBorder, lineStyle = [] } = lineconfig || {},
    isPortrait = arrangementMode === 'portrait'

  const styles = usemMemo(() => {
    const listStyle: CSSProperties = {}
    const ulStyle: CSSProperties = {}
    const filedStyle: CSSProperties = {}

    if (isPortrait) {
      ulStyle.gap = lineSpeed
      const fileTotalH = tableBodyHeight - lineSpeed * (rowNumber - 1)
      filedStyle.height = fileTotalH / rowNumber
    } else {
      listStyle.gap = lineSpeed
      numberIsEmpty(lineHeight) && (filedStyle.height = lineHeight)
    }

    return { listStyle, ulStyle, filedStyle }
  }, [tableBodyHeight, isPortrait, lineHeight, rowNumber, lineSpeed])

  const lineStyleMemo = usemMemo(() => {
    const lineStyleArray: CSSProperties[] = [],
      normalStyle: CSSProperties = {}

    if (lineBorder?.display) normalStyle.border = `${lineBorder.width}px solid ${lineBorder.color}`

    for (let i = 0; i < lineStyle.length; i++) {
      const { bgColor, opacity } = lineStyle[i]
      lineStyleArray.push({
        backgroundColor: bgColor,
        opacity: opacity / 100,
        ...normalStyle
      })
    }

    return { lineStyleArray, normalStyle }
  }, [lineStyle, lineBorder])

  const getLineStyle = useCallback(
    (i: number, type: 'li' | 'list', indexs?: { index: number; maxLen: number }) => {
      let style: CSSProperties = {}

      if (lineStyleMemo.lineStyleArray.length) {
        const index = i % lineStyleMemo.lineStyleArray.length
        style = cloneDeep(lineStyleMemo.lineStyleArray[index])
      } else {
        style = cloneDeep(lineStyleMemo.normalStyle)
      }

      if (isPortrait) {
        if (type === 'list') return {}
        const { index: listIndex = 0, maxLen = 0 } = indexs || {}

        const border = style.border
        delete style.border
        if (listIndex === 0) {
          style.borderRight = 'none'
          style.borderTop = border
          style.borderLeft = border
          style.borderBottom = border
        } else if (listIndex === maxLen - 1) {
          style.borderRight = border
          style.borderTop = border
          style.borderBottom = border
          style.borderLeft = 'none'
        } else {
          style.borderBottom = border
          style.borderTop = border
          style.borderLeft = 'none'
          style.borderRight = 'none'
        }
      } else {
        if (type === 'li') return {}
      }

      return style
    },
    [isPortrait, lineStyleMemo]
  )

  return { styles, lineStyleMemo, getLineStyle }
}
