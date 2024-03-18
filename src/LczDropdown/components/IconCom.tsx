import React, { memo, ReactNode, useRef } from 'react'
import IconCon from '../../common/IconCon'
import { randomChar } from '../../common/util'
import { IconGlobal } from '../style'
import { OptionIcon } from '../type'

const IconCom = memo(({ item, iconConfig, randomId }: { item: any; iconConfig: OptionIcon; randomId: string }) => {
  const { display = true, width = 16, height = 16, distance = 0, occupy = false, iconSeries = [] } = iconConfig

  if (!display) return <></>
  const Iconfind = iconSeries.find(v => v.type == item.type)

  if (!Iconfind) {
    let ELEMENT = <></>
    if (occupy) {
      // 占位
      const firstIcon = iconSeries[0],
        type = firstIcon?.iconType || 'custom'

      ELEMENT =
        type === 'custom' ? (
          <div
            className='lcz-occupy-icon'
            style={{ marginRight: distance, width, height, opacity: 0, flexShrink: 0 }}
          />
        ) : (
          <span
            className='lcz-occupy-icon iconfont lcz-com-icon-zhuye'
            style={{ marginRight: distance, fontSize: width, opacity: 0, flexShrink: 0 }}
          />
        )
    }
    return ELEMENT
  }

  const iconId = useRef(randomChar())
  const { iconType, iconValue, moreIconValue = '' } = Iconfind
  let iconNode: ReactNode = null

  switch (iconType) {
    case 'system': {
      iconNode = (
        <span
          style={{ marginRight: distance, fontSize: width }}
          className={`iconfont lcz-com-icon-${iconValue} lcz-menu-item-system-icon-${iconId.current}`}></span>
      )
      break
    }
    case 'custom': {
      iconNode = (
        <div
          className={`lcz-menu-item-custom-icon  background-image-100 lcz-menu-item-custom-icon-${iconId.current}`}
          style={{ marginRight: distance, width, height }}></div>
      )
      break
    }
    case 'more': {
      iconNode = (
        <IconCon
          className={`lcz-menu-item-system-icon-${iconId.current}`}
          style={{ marginRight: distance, fontSize: width }}
          oldFamily='lcz-system-icon'
          iconValue={moreIconValue}
        />
      )
      break
    }
  }

  return (
    <>
      <IconGlobal Iconfind={Iconfind} occupy={occupy} iconId={iconId.current} randomId={randomId} />
      {iconNode}
    </>
  )
})
IconCom.displayName = 'IconCom'

export default IconCom
