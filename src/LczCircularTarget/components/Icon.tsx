import React, { memo, useMemo } from 'react'
import IconCon from '../../common/IconCon'
import { getColorObj } from '../../common/util'
import { defaultIconConfig } from '../common/defaultValue'
import { IconWrapper } from '../style'
import { DataMap, IconConfig } from '../type'

export interface IconProps {
  iconConfig: IconConfig
  item?: DataMap
  iconColor?: { color: string; colorType: string }
}

export default memo(function Icon(props: IconProps) {
  const { item, iconConfig = defaultIconConfig } = props

  const iconMemo = useMemo(() => {
    const _icon: { icon: IconValueType; type: 'system' | 'custom'; color?: { color: any; colorType: string } } = {
      icon: '',
      type: 'custom'
    }
    if (item?.icon) {
      _icon.type = 'custom'
      _icon.icon = item.icon
      return _icon
    }
    const iconSeries = iconConfig.iconSeries
    if (iconSeries.length === 0) return _icon

    const _find = iconSeries.filter(it => it.nameValue === item?.name)

    if (_find.length === 0) return _icon

    const _findIcon = _find[_find.length - 1]

    switch (_findIcon.type) {
      case 'system': {
        const { color, colorType } = getColorObj(_findIcon.iconColor)
        _icon.icon = _findIcon.iconVlaue || ''
        _icon.type = _findIcon.type
        if (colorType === 'single') {
          _icon.color = { colorType, color }
        } else {
          _icon.color = { colorType, color: `linear-gradient(${color})` }
        }
        break
      }
      case 'custom':
        _icon.icon = _findIcon.imgUrl || ''
        _icon.type = _findIcon.type
    }

    return _icon
  }, [JSON.stringify(props)])

  return (
    <>
      {iconMemo.icon && (
        <IconWrapper iconColor={iconMemo.color} iconConfig={props.iconConfig} className='lcz-circular-icon'>
          {iconMemo.type === 'system' ? (
            <IconCon
              className={`icon-con ${iconMemo.color?.colorType}`}
              oldFamily='lcz-system-icon'
              iconValue={iconMemo.icon}
            />
          ) : (
            <div className='bg-image' style={{ backgroundImage: `url(${iconMemo.icon})` }} />
          )}
        </IconWrapper>
      )}
    </>
  )
})
