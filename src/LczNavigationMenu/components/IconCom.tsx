import React, { memo, ReactNode, useRef } from 'react'
import { randomChar } from '../../common/util'
import { IconGlobal } from '../style'
import { DataMap, IconConfig, RowStyle } from '../type'
import IconCon from '../../common/IconCon'

export const IconCom = memo(
  ({
    item,
    iconConfig,
    randomId,
    rowStyle
  }: {
    item: DataMap
    iconConfig: IconConfig
    randomId: string
    rowStyle: RowStyle
  }) => {
    const { display = true, width = 16, height = 16, occupy = false, iconSeries = [] } = iconConfig
    const iconTextSpace = rowStyle.iconTextSpace
    if (!display) return <></>
    const Iconfind = iconSeries.find(v => v.id == item.id)
    if (!Iconfind) {
      let ELEMENT = <></>
      if (occupy) {
        // 占位
        const firstIcon = iconSeries[0],
          type = firstIcon?.type || 'custom'

        ELEMENT =
          type === 'custom' ? (
            <div className='lcz-occupy-icon' style={{ marginRight: iconTextSpace, width, height }} />
          ) : (
            <span
              className='lcz-occupy-icon iconfont lcz-com-icon-zhuye'
              style={{ marginRight: iconTextSpace, fontSize: width }}
            />
          )
      }
      return ELEMENT
    }

    const iconId = useRef(randomChar())
    const { type, iconValue, moreIconValue = '' } = Iconfind
    let iconNode: ReactNode = null

    switch (type) {
      case 'system': {
        iconNode = (
          <span
            style={{ marginRight: iconTextSpace, fontSize: width }}
            className={`lcz-menu-item-icon iconfont lcz-com-icon-${iconValue} lcz-menu-item-system-icon-${iconId.current}`}></span>
        )
        break
      }
      case 'custom': {
        iconNode = (
          <div
            className={`lcz-menu-item-custom-icon lcz-menu-item-custom-icon-${iconId.current}`}
            style={{ marginRight: iconTextSpace, width, height }}></div>
        )
        break
      }
      case 'more': {
        iconNode = (
          <IconCon
            style={{ marginRight: iconTextSpace, fontSize: width }}
            className={`lcz-menu-item-icon lcz-menu-item-system-icon-${iconId.current}`}
            iconValue={moreIconValue}
          />
        )
      }
    }

    return (
      <>
        <IconGlobal Iconfind={Iconfind} iconId={iconId.current} randomId={randomId} />
        {iconNode}
      </>
    )
  }
)
IconCom.displayName = 'IconCom'
