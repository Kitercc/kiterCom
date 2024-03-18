import React, { memo, ReactElement, useState } from 'react'
import { Checkbox } from 'antd'

import { DataMap, OptionLine } from '../type'
import { IconSeries, OptionIcon } from '../../LczSelect/type'
import { findOptionIcon } from '../../LczSelect/common'
import { FilterItemWrapper } from '../style'
import IconCon from '../../common/IconCon'

interface PanleListItemProps {
  item: DataMap
  mode: string
  optionLine: OptionLine
  activeArr: any[]
  optionIcon: OptionIcon
  downItemHandlerClick: (daL: DataMap) => void
}

const PanleListItem = memo(function (props: PanleListItemProps) {
  const { item, activeArr, mode, optionLine, optionIcon, downItemHandlerClick } = props
  const { checkType } = optionLine
  const { contSpacing = 8, width = 16, height = 16, occupy = false, iconSeries = [] } = optionIcon

  const [hoved, setHoved] = useState<boolean>(false)
  const act = activeArr.includes(item.id)

  const radioValue = (() => {
    return !!activeArr.filter(a => a === item.id).length
  })()

  function handlerClick(e) {
    e.stopPropagation()
    downItemHandlerClick(item)
  }

  const ICON = (() => {
    const iconConfig = findOptionIcon(iconSeries, item?.type)
    // @ts-ignore
    const _obj: { show: boolean; cont: ReactElement; iconConfig: IconSeries } = {
      show: true,
      cont: <></>
    }

    if (!iconConfig) {
      if (occupy) {
        // 占位
        const firstIcon = iconSeries[0],
          type = firstIcon?.iconType || 'custom',
          iconValue = firstIcon?.iconValue || ''

        _obj.cont =
          type === 'custom' ? (
            <div className='lcz-occupy-icon' style={{ marginRight: contSpacing, width, height, opacity: 0 }} />
          ) : (
            <IconCon
              className='lcz-occupy-icon'
              oldFamily='lcz-system-icon'
              style={{ marginRight: contSpacing, fontSize: width, opacity: 0 }}
              iconValue={iconValue}
            />
          )
      } else {
        _obj.show = false
      }

      return _obj
    }
    _obj.iconConfig = iconConfig
    const { iconType = 'system', iconValue, hoverColor, focusColor, hoverImgUrl, focusImgUrl } = iconConfig
    switch (iconType) {
      case 'system': {
        const hoverStatus = hoverColor?.display && hoved
        const focusStatus = focusColor?.display && act

        const _classname = focusStatus
          ? 'panel-item-system-icon-focus'
          : `panel-item-system-icon${hoverStatus ? '-hover' : ''}`

        _obj.cont = (
          <IconCon
            className={'gradient ' + _classname}
            oldFamily='lcz-system-icon'
            style={{ fontSize: width, marginRight: contSpacing }}
            iconValue={iconValue}
          />
        )
        break
      }
      case 'custom': {
        const hoverStatus = hoverImgUrl?.display && hoved
        const focusStatus = focusImgUrl?.display && act
        const _classname = focusStatus
          ? 'panel-item-custom-icon-focus'
          : `panel-item-custom-icon${hoverStatus ? '-hover' : ''}`

        _obj.cont = (
          <div className={`${_classname} panel-item-img`} style={{ width, height, marginRight: contSpacing }} />
        )
        break
      }
    }
    return _obj
  })()

  return (
    <FilterItemWrapper
      occupy={occupy}
      iconConfig={ICON.iconConfig}
      onClick={handlerClick}
      onMouseEnter={() => setHoved(true)}
      onMouseLeave={() => setHoved(false)}
      className={['lcz-drop-dowm-item', act ? 'active' : ''].join(' ')}>
      {mode === 'multiple' && checkType === 'check' && (
        <span className='check-box' style={{ marginRight: 8 }}>
          <Checkbox checked={radioValue} />
        </span>
      )}
      {ICON.show && ICON.cont}
      <span className='content-value'>{item.content}</span>
      {(mode === 'single' || checkType === 'tick') && radioValue && <span className='iconfont lcz-com-icon-gou tick' />}
    </FilterItemWrapper>
  )
})

PanleListItem.displayName = 'PanleListItem'

export default PanleListItem
