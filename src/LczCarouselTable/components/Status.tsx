import React, { Fragment, memo, useMemo, CSSProperties } from 'react'
import { configDisplayCompatible } from '../../common/util'
import SlideTitle from '../../LczSlideTitle'
import { defaultBorderd, defaultStatusBgconfig, defaultStatusTextStyle, defaultTipConfig } from '../common/defaultValue'
import { ColumnArr, StatusStyle, TextStyle } from '../type'
import ItemContent from './ItemContent'

interface TextProps {
  colItem: ColumnArr
  item: any
  fontStyle: TextStyle
}

export default memo(function Status(props: TextProps) {
  const { colItem, item, fontStyle } = props
  const {
    field,
    contentOverflow,
    interval = 8,
    constantPlay = false,
    constanDuration = 1,
    subTitle,
    suffix,
    statusStyle = [],
    statusNormalstyle = {
      bgConfig: defaultStatusBgconfig,
      borderConfig: defaultBorderd,
      textStyle: defaultStatusTextStyle
    },
    tipConfig = defaultTipConfig
  } = colItem

  const subTitleData = useMemo(() => {
    const position = subTitle?.position || 'onAfter',
      space = (subTitle?.space || 0) + 'px'
    return {
      contOrd: position === 'onAfter' ? 1 : 2,
      subSpce: position === 'onAfter' ? `${space} 0px 0px` : `0px 0px ${space}`,
      subOrd: position === 'onAfter' ? 2 : 1,
      data: subTitle?.field ? subTitle.field.split(',') : []
    }
  }, [JSON.stringify(subTitle)])

  const containStyle = useMemo(() => {
    const _style: { bgStyle: CSSProperties; valShow: boolean; valStyle: CSSProperties } = {
      bgStyle: {},
      valShow: false,
      valStyle: {}
    }
    let _bgConfig
    let _borderConfig
    let _textStyle

    const findVal = statusStyle.filter(v => v.statusVal == item[field])
    if (findVal.length > 0) {
      const _now: StatusStyle = findVal[findVal.length - 1]
      const {
        bgConfig = defaultStatusBgconfig,
        borderConfig = defaultBorderd,
        textStyle = defaultStatusTextStyle
      } = _now

      if (bgConfig.display) {
        _bgConfig = bgConfig
      } else {
        _bgConfig = statusNormalstyle.bgConfig
      }

      const borderDis = configDisplayCompatible(borderConfig, 'borderd')
      if (borderDis) {
        _borderConfig = borderConfig
      } else {
        _borderConfig = statusNormalstyle.borderConfig
      }

      if (textStyle.display) {
        _textStyle = textStyle
      } else {
        _textStyle = statusNormalstyle.textStyle
      }
    } else {
      _bgConfig = statusNormalstyle.bgConfig || defaultStatusBgconfig
      _borderConfig = statusNormalstyle.borderConfig || defaultBorderd
      _textStyle = statusNormalstyle.textStyle || defaultStatusTextStyle
    }

    if (_bgConfig.display) {
      _style.bgStyle.transform = `translate(${_bgConfig.xOffset}px, ${_bgConfig.yOffset}px)`
      _style.bgStyle.width = _bgConfig.width
      _style.bgStyle.height = _bgConfig.height
      _style.bgStyle.borderRadius = _bgConfig.radius
      _style.bgStyle.backgroundColor = _bgConfig.color

      if (_bgConfig.imgUrl) {
        _style.bgStyle.backgroundImage = `url(${_bgConfig.imgUrl})`
      }
    } else {
      _style.bgStyle.background = 'transparent'
    }

    const borderDis = configDisplayCompatible(_borderConfig, 'borderd')
    if (_borderConfig && borderDis) {
      _style.bgStyle.border = `${_borderConfig.borderWidth}px solid ${_borderConfig.borderColor}`
    } else {
      _style.bgStyle.border = 'none'
    }

    const { display: textDis, xOffset, yOffset, ...otherStyle } = _textStyle

    if (textDis) {
      _style.valShow = true
      _style.valStyle.transform = `translate(${xOffset}px,${yOffset}px)`
      _style.valStyle = { ...statusNormalstyle.textStyle, ..._style.valStyle, ...otherStyle }
    }
    return _style
  }, [JSON.stringify(statusNormalstyle), JSON.stringify(statusStyle), JSON.stringify(item), field])

  const slideTitleAniamte = {
    constantPlay,
    carousel: true,
    duration: interval * 1000,
    constanDuration: constanDuration * 1000
  }

  switch (contentOverflow) {
    case 'slidetitle': {
      return (
        <Fragment>
          <div className='lcz-status-bg' style={{ ...containStyle.bgStyle }} />
          <div className='slide-box'>
            <SlideTitle
              w={colItem.colWidth}
              style={{ order: subTitleData.contOrd, ...containStyle.valStyle, ...fontStyle }}
              data={[
                {
                  value: containStyle.valShow
                    ? item[field]
                    : '' +
                      (suffix?.display
                        ? `<i style='color:${fontStyle?.color ? fontStyle.color : suffix.textStyle.color};
                          font-family:${fontStyle?.fontFamily ? fontStyle.fontFamily : suffix.textStyle.fontFamily};
                          font-weight:${fontStyle?.fontWeight ? fontStyle.fontWeight : suffix.textStyle.fontWeight}; 
                          font-size:${fontStyle?.fontSize ? fontStyle.fontSize : suffix.textStyle.fontSize}px;
                          letter-spacing:${suffix.textStyle.letterSpacing}px;
                          font-style:normal;'>${suffix?.content}
                         </i>`
                        : '')
                }
              ]}
              animateConfig={slideTitleAniamte}
            />
            {subTitle?.display &&
              subTitleData.data.map((v, i) => {
                return (
                  <Fragment key={v + i}>
                    {item[v] ? (
                      <SlideTitle
                        w={colItem.colWidth}
                        style={{ order: subTitleData.subOrd, ...subTitle.textStyle, ...fontStyle }}
                        data={[{ value: item[v] }]}
                        animateConfig={slideTitleAniamte}
                      />
                    ) : null}
                  </Fragment>
                )
              })}
          </div>
        </Fragment>
      )
    }
    case 'ellipsis':
    case 'lineFeed': {
      const statusVal = containStyle.valShow && item[field]

      return (
        <Fragment>
          <div className='lcz-status-bg' style={{ ...containStyle.bgStyle }} />
          <ItemContent
            subTitle={subTitle}
            contentOverflow={contentOverflow}
            suffix={suffix}
            fontStyle={fontStyle}
            mianContain={statusVal}
            tipConfig={tipConfig}
            itemData={item}
            mianStyle={{ ...containStyle.valStyle, ...fontStyle }}
          />
        </Fragment>
      )
    }

    default:
      return null
  }
})
