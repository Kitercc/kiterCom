import React, { Fragment, memo, useMemo } from 'react'
import SlideTitle from '../../LczSlideTitle'
import { defaultTipConfig } from '../common/defaultValue'
import { ColumnArr, TextStyle } from '../type'
import ItemContent from './ItemContent'

interface TextProps {
  colItem: ColumnArr
  item: any
  fontStyle: TextStyle
}

const Text = memo(function Text(props: TextProps) {
  const { colItem, item, fontStyle } = props
  const {
    field,
    contentOverflow,
    interval = 8,
    constantPlay = false,
    constanDuration = 1,
    subTitle,
    suffix,
    tipConfig = defaultTipConfig
  } = colItem

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

  const sliderAnimate = {
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
              order: subTitleData.contOrd
            }}
            data={[
              {
                value:
                  item[field] +
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
            animateConfig={sliderAnimate}
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
                      animateConfig={sliderAnimate}
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
          mianContain={item[field]}
          tipConfig={tipConfig}
          itemData={item}
          mianStyle={fontStyle}
        />
      )
    }
    default: {
      return null
    }
  }
})

export default Text
