import React, { CSSProperties, memo, useMemo } from 'react'
import { getColorObj } from '../../common/util'
import { defaultCurrentStyle, defaultHoverStyle, defaultNormalCard } from '../common/defaultValue'
import { CardWrapper } from '../style'
import { AnimateConfig, CardLineContent, CurrentStyle, DataMap, HoverStyle, ImgSeries, NormalCard } from '../type'
import CardContentItem from './CardContentItem'
import CardImg from './CardImg'

export interface CardProps {
  id?: string
  currentIndex: number
  cardLineContent: CardLineContent[]
  index: number
  item: DataMap
  normalCard?: NormalCard
  animate?: AnimateConfig
  hoverStyle?: HoverStyle
  currentStyle?: CurrentStyle
  imgSeries?: ImgSeries[]
  onClick?: (data: DataMap, i: number) => void
}

export default memo(function CardItem(props: CardProps) {
  const {
    currentIndex,
    index,
    id = '',
    item,
    normalCard = defaultNormalCard,
    animate,
    hoverStyle = defaultHoverStyle,
    currentStyle = defaultCurrentStyle,
    cardLineContent = [],
    imgSeries = [],
    onClick
  } = props
  const {
    bgConfig = defaultNormalCard.bgConfig,
    border = defaultNormalCard.border,
    outShadow = defaultNormalCard.outShadow,
    inShadow = defaultNormalCard.inShadow
  } = normalCard

  const normalStyleMemo = useMemo(() => {
    const _style: CSSProperties = {}
    let shoadowStr = ''
    const { color: bgColor, colorType } = getColorObj(bgConfig?.color)

    if (bgConfig?.display) {
      if (colorType === 'single') {
        _style.backgroundColor = bgColor
      } else {
        _style.backgroundImage = `linear-gradient(${bgColor})`
      }

      if (bgConfig?.imgUrl && bgConfig?.imgUrl.trim()) {
        _style.backgroundImage = `url(${bgConfig?.imgUrl})`
      }
    }

    if (border?.display) {
      _style.border = `${border.width}px solid ${border.color}`
    }

    if (outShadow?.display) {
      shoadowStr = `${outShadow.x}px ${outShadow.y}px ${outShadow.vague}px ${outShadow.extend}px ${outShadow.color}`
    }

    if (inShadow?.display) {
      shoadowStr && (shoadowStr += ',')
      shoadowStr += `${inShadow.x}px ${inShadow.y}px ${inShadow.vague}px ${inShadow.extend}px ${inShadow.color} inset`
    }

    if (shoadowStr) _style.boxShadow = shoadowStr

    return _style
  }, [JSON.stringify(normalCard)])

  function handlerClick(e) {
    e.stopPropagation()
    e.preventDefault()
    onClick && onClick(item, index)
  }

  const Container = useMemo(() => {
    if (!cardLineContent.length) return null
    return cardLineContent.map((v: any, i) => (
      <CardContentItem
        key={i}
        id={id}
        expPathArr={[`cardLineContent[${i}]`]}
        isCurrent={currentIndex === index}
        itemData={item}
        item={v}
      />
    ))
  }, [JSON.stringify(item), JSON.stringify(cardLineContent), currentIndex])

  return (
    <CardWrapper
      item={item}
      index={index}
      cardLineContent={cardLineContent}
      currentIndex={currentIndex}
      animate={animate}
      normalCard={normalCard}
      key={index}
      hoverStyle={hoverStyle}
      currentStyle={currentStyle}
      className={`lcz-rotate-card-items ${currentIndex === index ? ' lcz-rotate-card-active' : ''}`}
      data-index={index}>
      <div className='lcz-rotate-card-wrapper' onClick={handlerClick} style={{ ...normalStyleMemo }}>
        <ul className='lcz-rotate-card-items-ul'>{Container}</ul>
        <CardImg
          id={id}
          data={item}
          isCurrent={currentIndex === index}
          className='lcz-3d-area-map-tooltip-image'
          imageSeries={imgSeries}
        />
      </div>
    </CardWrapper>
  )
})
