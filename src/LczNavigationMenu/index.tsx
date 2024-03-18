import React, { memo, useEffect, useMemo, useRef, useState } from 'react'

import LczComCon from '../common/LczComCon'
import { Menu } from 'antd'
import { MenuWrapper, Globalstyle } from './style'
import { DataMap, NavigationMenuProps } from './type'
import { findPath, formatData, formatMenuItems } from './common'
import {
  defaultGlobalConfig,
  defaultChildPanel,
  defaultGlobalStyle,
  defaultRowStyle,
  defaultOrdStyle,
  defaultFocusStyle,
  defaultIconConfig
} from './common/defaultValue'
import { conversionData, randomChar } from '../common/util'

export default memo(function LczNavigationMenu(props: NavigationMenuProps) {
  const {
    globalConfig = defaultGlobalConfig,
    rowStyle = defaultRowStyle,
    iconConfig = defaultIconConfig,
    data = [],
    onClick,
    onChange
  } = props
  const {
    currentVal = 'first',
    defaultId = { value: '' },
    submenuShow = 'inline',
    expandCurrent = false,
    childPanel = defaultChildPanel,
    textStyle = defaultGlobalStyle
  } = globalConfig

  const { indent, ordStyle = defaultOrdStyle, focusStyle = defaultFocusStyle } = rowStyle

  const [val, setVal] = useState<string[]>([])
  const [openKey, setOpenKey] = useState<string[]>([])
  const randomId = useRef(randomChar())

  const _data = (function () {
    return conversionData(data, {
      id: 'string',
      content: 'string',
      parentid: 'string',
      ofgroup: 'string',
      url: 'string'
    })
  })()

  const dataMamo = useMemo(() => {
    try {
      let _arr: any = []
      if (_data?.length) {
        _arr = [...formatData(_data)]
      }
      return _arr
    } catch (error) {
      return []
    }
  }, [JSON.stringify(_data)])

  useEffect(() => {
    if (dataMamo?.length) {
      switch (currentVal) {
        case 'first': {
          const firstId = _data[0].id
          const _findPath = findPath(_data, firstId)
          onChange && onChange(_data[0])
          setVal([String(firstId)])
          submenuShow === 'vertical' ? setOpenKey([]) : setOpenKey([..._findPath])
          break
        }
        case 'id': {
          if (defaultId?.value) {
            const _find = _data.find(v => String(v.id) === defaultId?.value) || ({} as DataMap)
            const _findPath = findPath(_data, defaultId?.value)
            onChange && onChange(_find)
            setVal([String(defaultId?.value)])
            submenuShow === 'vertical' ? setOpenKey([]) : setOpenKey([..._findPath])
          } else {
            setVal([])
            setOpenKey([])
          }
          break
        }
      }
    }
  }, [currentVal, submenuShow, JSON.stringify(defaultId), JSON.stringify(dataMamo)])

  const handleSelect = e => {
    const selectId = e.selectedKeys[0]
    const param = _data.find(v => v.id == selectId) || ({} as DataMap)
    onChange && onChange(param)
    setVal([...e.selectedKeys])
  }

  const handleOnClick = e => {
    const param = _data.find(v => v.id == e.key) || ({} as DataMap)
    onClick && onClick(param)
  }

  const rootSubmenuKeys = dataMamo.map(v => String(v.id))
  // 副容器展开的事件
  const onOpenChange = keys => {
    if (expandCurrent) {
      const latestOpenKey = keys.find(key => openKey.indexOf(key) === -1)
      if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKey(keys)
      } else {
        setOpenKey(latestOpenKey ? [latestOpenKey] : [])
      }
    } else {
      setOpenKey(keys)
    }
  }

  const menuItems = useMemo(() => {
    const items = formatMenuItems(
      dataMamo,
      { iconConfig, randomId: randomId.current, rowStyle },
      {
        popupOffset: [childPanel.space, 0],
        popupClassName: `lcz-navigation-submenu lcz-vertical-menu-${randomId.current}`
      },
      { fontFamily: textStyle.fontFamily, letterSpacing: textStyle.letterSpacing }
    )

    return items
  }, [dataMamo, iconConfig, rowStyle, textStyle])

  return (
    <LczComCon>
      <MenuWrapper
        rowStyle={rowStyle}
        globalConfig={globalConfig}
        focusStyle={focusStyle}
        className='lcz-navigation-menu-wrapper '>
        <Menu
          inlineIndent={indent}
          className={`lcz-menu-wrapper-${randomId.current}`}
          expandIcon={() => (
            <span
              className={`lcz-memu-expandIcon iconfont lcz-com-icon-${ordStyle?.arrow?.type} lcz-memu-expand-${submenuShow}`}></span>
          )}
          selectedKeys={val}
          openKeys={openKey}
          onClick={handleOnClick}
          onSelect={handleSelect}
          onOpenChange={onOpenChange}
          items={menuItems}
          mode={submenuShow}
        />
        <Globalstyle
          rowStyle={rowStyle}
          globalConfig={globalConfig}
          childPanel={childPanel}
          randomId={randomId.current}
          focusStyle={focusStyle}
        />
      </MenuWrapper>
    </LczComCon>
  )
})
