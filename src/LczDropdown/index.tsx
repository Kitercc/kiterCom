import React, { memo, useRef, useMemo, useState, useEffect } from 'react'
import { Menu, Dropdown, MenuProps } from 'antd'
import { DropdownWrapper, Globalstyle } from './style'
import LczComCon from '../common/LczComCon'
type MenuItem = Required<MenuProps>['items'][number]

import { DataMap, DropdownProps, FilterDataMap, OptionIcon } from './type'
import { IconConfig } from '../LczSelect/type'
import { defaultDropdownConfig, defaultGlobal, defaultOptionBoxConfig, defaultOptionLine } from './common/defaultValue'
import { configDisplayCompatible, conversionData, randomChar } from '../common/util'
import IconCom from './components/IconCom'
import IconCon from '../common/IconCon'

interface SelectIconProps {
  onClick?: () => void
  iconConfig?: IconConfig
}

const SelectIcon = (props: SelectIconProps) => {
  const { onClick, iconConfig = {} } = props
  const { iconColor, type, imgUrl, imgWidth, imgHeight, iconSize } = iconConfig
  return (
    <>
      {type === 'system' || !imgUrl ? (
        <IconCon
          className='lcz-dropdown-icon select-icon'
          style={{ color: iconColor, fontSize: iconSize }}
          oldFamily='lcz-system-arrow-icon'
          onClick={onClick}
          iconValue={iconConfig?.iconValue}
        />
      ) : (
        <img
          src={imgUrl}
          className='lcz-dropdown-icon select-icon-image'
          style={{ width: imgWidth, height: imgHeight }}
          alt=''
        />
      )}
    </>
  )
}

export default memo(function LczDropdown(props: DropdownProps) {
  const {
    trigger = 'click',
    globalStyle = defaultGlobal,
    optionBoxConfig = defaultOptionBoxConfig,
    dropdownConfig = defaultDropdownConfig,
    optionIcon,
    onClick,
    name = '',
    data = []
  } = props

  const { placement = 'bottomLeft', optionLine = defaultOptionLine } = dropdownConfig
  // hooks
  const wrapperRef = useRef<HTMLDivElement>(null)
  const itemsData = useRef<any>({})
  const popupid = useRef(randomChar())
  const [offsetHeight, setOffSetHeight] = useState<number>(0)

  const showName = (() => {
    const textDis = configDisplayCompatible(optionBoxConfig.boxColor, 'textStatus')
    if (!textDis) return ''
    if (typeof name === 'string') {
      return name
    } else {
      return String(name.value || '')
    }
  })()

  useEffect(() => {
    const height = wrapperRef.current?.clientHeight || 0
    setOffSetHeight(height)
  }, [])

  const dataMemo = useMemo(() => {
    return conversionData(data, { id: 'string', parentTitle: 'string', content: 'string', itemGroup: 'boolean' })
  }, [data])

  // 处理数据
  const fillterData = useMemo(() => {
    const _arr: FilterDataMap[] = []
    if (dataMemo && dataMemo.length > 0) {
      dataMemo.forEach((da: DataMap) => {
        if (!da.parentTitle) {
          _arr.push({ ...da, level: 1 })
        } else {
          const findIndex = _arr.findIndex((item: FilterDataMap) => item.content === da.parentTitle && item.level > 1)
          if (findIndex < 0) {
            _arr.push({
              id: randomChar(),
              content: da?.parentTitle,
              itemGroup: da?.itemGroup,
              children: [da],
              level: 2
            })
          } else {
            _arr[findIndex].children?.push(da)
          }
        }
      })

      return _arr
    }
  }, [dataMemo])

  const DropdownMenu = useMemo(() => {
    const data = fillterData || []
    const _itemData = {}

    function getItem(
      label: React.ReactNode,
      key?: React.Key | null,
      icon?: React.ReactNode,
      type?: 'group',
      children?: MenuItem[],
      itemData?: any
    ): MenuItem {
      _itemData[key || ''] = itemData
      return {
        key,
        icon,
        children,
        type,
        label
      } as MenuItem
    }

    const items = data.map((itemData, i) => {
      const { content, id, itemGroup, children = [] } = itemData
      const childItems = children.map((item, index) =>
        getItem(
          item.content,
          `${item.id}-${index}-${item.parentTitle}`,
          <IconCom item={item} iconConfig={(optionIcon || {}) as OptionIcon} randomId={popupid.current} />,
          undefined,
          undefined,
          item
        )
      )

      const item: any = getItem(
        content,
        `${id}-${i}`,
        <IconCom item={itemData} iconConfig={(optionIcon || {}) as OptionIcon} randomId={popupid.current} />,
        itemGroup ? 'group' : undefined,
        childItems.length ? childItems : undefined,
        itemData
      )

      if (item?.children?.length && item.type !== 'group') {
        Object.assign(item, { popupOffset: [0, 0], popupClassName: `lcz-drop-submenu-popup-${popupid.current}` })
      }

      if (item?.children) {
        item.icon = undefined
      }

      return item
    })

    itemsData.current = _itemData

    return <Menu onClick={itemHandlerClick} items={items} />
  }, [fillterData, optionIcon])

  function itemHandlerClick(target) {
    const key = target?.key || ''
    const param = itemsData.current[key]
    param && onClick && onClick(param)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <DropdownWrapper
        ref={wrapperRef}
        className='lcz-drop-down-wrapper'
        style={globalStyle}
        optionBoxConfig={optionBoxConfig}
        dropdownConfig={dropdownConfig}
        optionLine={optionLine}
        offsetHeight={offsetHeight}>
        <Dropdown
          overlay={DropdownMenu}
          placement={placement}
          getPopupContainer={() => wrapperRef.current as HTMLDivElement}
          trigger={trigger}>
          <div className='lcz-drop-down-button'>
            <span className='text'>{showName}</span>
            {optionBoxConfig.iconConfig?.display && <SelectIcon iconConfig={optionBoxConfig.iconConfig} />}
          </div>
        </Dropdown>
      </DropdownWrapper>
      <Globalstyle
        popupid={popupid.current}
        globalStyle={globalStyle}
        optionLine={optionLine}
        dropdownConfig={dropdownConfig}
      />
    </LczComCon>
  )
})
