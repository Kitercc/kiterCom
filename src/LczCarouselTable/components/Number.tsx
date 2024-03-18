import React, { Fragment, memo, useMemo } from 'react'
import SlideTitle from '../../LczSlideTitle'
import { numberForMat } from '../common'
import { defaultTipConfig } from '../common/defaultValue'
import { ColumnArr, TextStyle } from '../type'
import ItemContent from './ItemContent'

interface NumberProps {
  colItem: ColumnArr
  item: any
  fontStyle: TextStyle
}

export default memo(function Number(props: NumberProps) {
  const { colItem, item, fontStyle } = props

  const {
    field,
    contentOverflow,
    interval = 8,
    constantPlay = false,
    constanDuration = 1,
    subTitle,
    suffix,
    numberFormat,
    sectionStyleFlag,
    sectionStyle,
    tipConfig = defaultTipConfig
  } = colItem

  const numStyleMemo = useMemo(() => {
    const num = item[field]
    let styleObj = {}
    if (!sectionStyleFlag) return {}
    sectionStyle?.forEach(item => {
      if (num <= (item?.max || 1) && num >= (item?.min || 1)) {
        styleObj = { color: item.color, fontWeight: item.fontWeight, fontSize: item.fontSize }
      }
    })
    return styleObj
  }, [item, field, sectionStyle, sectionStyleFlag])

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
              ...numStyleMemo
            }}
            data={[
              {
                value:
                  numberForMat(item[field], numberFormat) +
                  (suffix?.display
                    ? `<i style='color:${fontStyle?.color ? fontStyle.color : suffix.textStyle.color};
                      font-family:${fontStyle?.fontFamily ? fontStyle.fontFamily : suffix.textStyle.fontFamily};
                      font-weight:${fontStyle?.fontWeight ? fontStyle.fontWeight : suffix.textStyle.fontWeight}; 
                      font-size:${fontStyle?.fontSize ? fontStyle.fontSize : suffix.textStyle.fontSize}px;
                      letter-spacing:${suffix.textStyle.letterSpacing}px;
                      font-style:normal;'>
                        ${suffix?.content}
                  </i>`
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
      const numberVal = numberForMat(item[field], numberFormat)

      return (
        <ItemContent
          subTitle={subTitle}
          contentOverflow={contentOverflow}
          suffix={suffix}
          fontStyle={fontStyle}
          mianContain={numberVal}
          tipConfig={tipConfig}
          itemData={item}
          mianStyle={{ ...numStyleMemo, ...fontStyle }}
        />
      )
    }
    default:
      return null
  }
})
