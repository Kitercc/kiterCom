import React, { CSSProperties, memo, useMemo } from 'react'
import { OutCardContainer } from '../type/child'
import FieldCom from './FieldCom'

type CardContainerType = {
  itemData: any
  container: OutCardContainer
}

const CardContainer = memo(({ itemData, container }: CardContainerType) => {
  const { field = [], ...otherProps } = container

  const styles = useMemo(() => {
    const { width = 0, position, layoutMode = 'relative', contentArrangement = 'level', interval = 0 } = otherProps
    const wrapper: CSSProperties = { width, top: position?.top || 0 }

    if (layoutMode === 'relative') {
      wrapper.flexDirection = contentArrangement === 'level' ? 'row' : 'column'
      wrapper.gap = interval
    }

    switch (position?.x) {
      case 'left':
        wrapper.left = 0
        break
      case 'center':
        wrapper.left = '50%'
        wrapper.transform = 'translateX(-50%)'
        break
      case 'right':
        wrapper.right = 0
        break
      default:
        wrapper.left = position?.left || 0
        break
    }

    return wrapper
  }, [JSON.stringify(otherProps)])

  return (
    <div className='lcz-card-container-item' style={styles}>
      {field.map((item: any, i: number) => (
        <FieldCom
          key={i}
          containData={itemData}
          field={item}
          expPathArr={[`field[${i}]`]}
          container={{
            layoutMode: otherProps.layoutMode,
            contentArrangement: otherProps.contentArrangement,
            id: container.id
          }}
        />
      ))}
    </div>
  )
})

CardContainer.displayName = 'CardContainer'
export default CardContainer
