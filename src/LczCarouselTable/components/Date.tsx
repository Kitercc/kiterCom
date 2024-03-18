import React, { Fragment, memo, useMemo } from 'react'
import moment from 'moment'

import { ColumnArr, TextStyle } from '../type'
import SlideTitle from '../../LczSlideTitle'
import { defaultTipConfig } from '../common/defaultValue'
import ItemContent from './ItemContent'

interface ImageProps {
  colItem: ColumnArr
  item: any
  fontStyle: TextStyle
}
export default memo(function Date(props: ImageProps) {
  const { colItem, item, fontStyle } = props

  const {
    field,
    contentOverflow,
    suffix,
    dataForMat,
    subTitle,
    interval = 3,
    constantPlay = false,
    constanDuration = 1,
    sectionStyleFlag,
    sectionStyle,
    tipConfig = defaultTipConfig
  } = colItem

  const dateValueMemo = useMemo(() => {
    const nowDate = item[field]
    if (String(moment(nowDate).format('')).toLocaleUpperCase() === 'INVALID DATE') return item[field]
    let date = '',
      time = ''
    if (!dataForMat?.display) return nowDate
    if (dataForMat.date.display) {
      date = moment(nowDate).format(dataForMat.date.forMat)
    }
    if (dataForMat.time.display) {
      time = moment(nowDate).format(dataForMat.time.forMat)
    }
    return date + ' ' + time
  }, [dataForMat, item, field])

  const dataSectionStyleMemo = useMemo(() => {
    let styleObj = {}
    const val = moment(item[field])
    if (!sectionStyleFlag) return styleObj
    sectionStyle?.forEach(item => {
      const { maxDate, minDate, ...textStyle } = item
      const maxVal = moment(maxDate)
      const minVal = moment(minDate)
      if (val >= minVal && val <= maxVal) {
        styleObj = textStyle
      }
    })

    return styleObj
  }, [sectionStyle, sectionStyleFlag, dateValueMemo, item])

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

  const slideTitleAnimate = {
    constantPlay,
    carousel: true,
    duration: interval * 1000,
    constanDuration: constanDuration * 1000
  }

  switch (contentOverflow) {
    case 'slidetitle': {
      return (
        <div className='slide-box'>
          <SlideTitle
            w={colItem.colWidth}
            style={{
              order: subTitleData.contOrd,
              ...dataSectionStyleMemo,
              ...fontStyle
            }}
            data={[
              {
                value:
                  dateValueMemo +
                  (suffix?.display
                    ? `<i style='color:${fontStyle?.color ? fontStyle.color : suffix.textStyle.color};
                font-family:${fontStyle?.fontFamily ? fontStyle.fontFamily : suffix.textStyle.fontFamily};
                font-weight:${fontStyle?.fontWeight ? fontStyle.fontWeight : suffix.textStyle.fontWeight}; 
                font-size:${fontStyle?.fontSize ? fontStyle.fontSize : suffix.textStyle.fontSize}px;
                letter-spacing:${suffix.textStyle.letterSpacing}px;
                font-style:normal;'>${suffix?.content}</i>`
                    : '')
              }
            ]}
            animateConfig={slideTitleAnimate}
          />
          {subTitle?.display &&
            subTitleData.data.map((v, i) => {
              return (
                <Fragment key={v + i}>
                  {item[v] ? (
                    <SlideTitle
                      w={colItem.colWidth}
                      style={{
                        order: subTitleData.subOrd,
                        ...subTitle.textStyle,
                        ...fontStyle
                      }}
                      data={[{ value: item[v] }]}
                      animateConfig={slideTitleAnimate}
                    />
                  ) : null}
                </Fragment>
              )
            })}
        </div>
      )
    }
    case 'ellipsis':
    case 'lineFeed': {
      return (
        <ItemContent
          subTitle={subTitle}
          contentOverflow={contentOverflow}
          suffix={suffix}
          fontStyle={fontStyle}
          mianContain={dateValueMemo}
          tipConfig={tipConfig}
          itemData={item}
          mianStyle={{ ...dataSectionStyleMemo, ...fontStyle }}
        />
      )
    }
    default: {
      return null
    }
  }
})
