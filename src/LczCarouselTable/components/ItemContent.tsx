import React, { Fragment, memo, ReactNode, useMemo } from 'react'
import { SubTitle, Suffix, TextStyle, TipConfig } from '../type'
import TooltipWrapper from './TooltipWrapper'

interface ItemContentProps {
  subTitle?: SubTitle
  contentOverflow: string
  suffix?: Suffix
  fontStyle: TextStyle
  mianContain: string
  tipConfig: TipConfig
  itemData: any
  mianStyle?: any
}

export default memo(function ItemContent(props: ItemContentProps) {
  const { subTitle, contentOverflow, suffix, fontStyle, mianContain, tipConfig, itemData = {}, mianStyle = {} } = props

  const subTitleData = useMemo(() => {
    const position = subTitle?.position || 'onAfter',
      space = (subTitle?.space || 0) + 'px'
    return {
      contOrd: position === 'onAfter' ? 1 : 2,
      subOrd: position === 'onAfter' ? 2 : 1,
      subSpce: position === 'onAfter' ? `${space} 0px 0px` : `0px 0px ${space}`,
      data: subTitle?.field ? subTitle.field.split(',') : []
    }
  }, [subTitle])

  let Content: ReactNode = (
    <span
      className='content-text'
      style={{
        order: subTitleData.contOrd,
        wordBreak: contentOverflow === 'ellipsis' ? 'keep-all' : 'break-word',
        whiteSpace: contentOverflow === 'ellipsis' ? 'nowrap' : 'initial',
        ...mianStyle
      }}>
      {mianContain}
      <i style={{ ...suffix?.textStyle, ...fontStyle }}>{suffix?.display && suffix.content}</i>
    </span>
  )

  if (contentOverflow === 'ellipsis' && tipConfig.display && mianContain) {
    Content = (
      <TooltipWrapper tipConfig={tipConfig} value={mianContain}>
        {Content}
      </TooltipWrapper>
    )
  }

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

  return (
    <Fragment>
      {Content}
      {subTitle?.display &&
        subTitleData.data.map((v, i) => {
          return <Fragment key={v + i}>{itemData[v] ? SubTitleContent(itemData[v]) : null}</Fragment>
        })}
    </Fragment>
  )
})
