import React, { memo, CSSProperties } from 'react'
import { OutCardContainer } from '../type/child'
import CardContainer from './CardContainer'

interface cardItemProps {
  style: CSSProperties
  itemData: any
  cardContainer: OutCardContainer[]
  onClick?: any
}

const CardItem = memo((props: cardItemProps) => {
  const { style, itemData, cardContainer = [], onClick } = props

  return (
    <li className='lcz-card-list-li' style={style} onClick={() => onClick && onClick(itemData)}>
      {cardContainer.map(container => (
        <CardContainer key={container.id} itemData={itemData} container={container} />
      ))}
    </li>
  )
})

CardItem.displayName = 'CardItem'
export default CardItem
