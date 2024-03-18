import React, { Fragment, memo } from 'react'
import { ColumnArr, TextStyle } from '../type'

interface ImageProps {
  colItem: ColumnArr
  item: any
  fontStyle: TextStyle
}
export default memo(function Image(props: ImageProps) {
  const { item, colItem, fontStyle } = props

  const { suffix, subTitle, contentOverflow } = colItem

  const position = subTitle?.position || 'onAfter',
    space = (subTitle?.space || 0) + 'px',
    subSpce = position === 'onAfter' ? `${space} 0px 0px` : `0px 0px ${space}`

  return (
    <>
      <div className='content-img' style={{ order: position === 'onAfter' ? 1 : 2 }}>
        <img src={item[colItem.field]} style={{ width: colItem.imageWidth, height: colItem.imageHeight }} alt='' />
        <i style={{ ...suffix?.textStyle }}>{suffix?.display && suffix.content}</i>
      </div>
      {subTitle?.display &&
        subTitle.field &&
        subTitle.field.split(',').map((v, i) => {
          return (
            <Fragment key={v + i}>
              {item[v] && (
                <span
                  className='content-text'
                  style={{
                    order: position === 'onAfter' ? 2 : 1,
                    margin: subSpce,
                    ...subTitle.textStyle,
                    wordBreak: contentOverflow === 'ellipsis' ? 'keep-all' : 'break-word',
                    whiteSpace: contentOverflow === 'ellipsis' ? 'nowrap' : 'initial',
                    ...fontStyle
                  }}>
                  {item[v]}
                </span>
              )}
            </Fragment>
          )
        })}
    </>
  )
})
