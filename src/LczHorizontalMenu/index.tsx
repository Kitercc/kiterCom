import React, { memo, useState, useRef, useEffect, CSSProperties } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { isEqual } from 'lodash'
import { usemMemo, useSyncState, usemEffect } from '../common/hooks'
import LczComCon from '../common/LczComCon'
import { alignType, arrDuplicateRemove, conversionData, colorFunc, numberIsEmpty } from '../common/util'
import { formatMenuData, getActivePath } from './common'
import NavItem from './components/NavItem'
import { LczHorizontalMenuWrapper } from './style'
import { EventType, LczHorizontalMenuProps, MainPanel, MenuData, SubPanel } from './type'

const LczHorizontalMenu = memo((props: LczHorizontalMenuProps) => {
  const { globalConfig, mainPanel, subPanel, data = [], onChange, onClick } = props,
    { currentVal = 'first', defaultId, targetType = 'hover', submenuLayout = 'vertical', submenuPosition = 'bottom' } =
      globalConfig || {},
    { itemGap = 0, padding } = mainPanel?.mianGloabalConfig || {}

  const [showNavId, setShowNavId] = useSyncState<string>(''),
    [activeId, setActiveId] = useState<string[]>([]),
    prevActiveId = useRef<string[]>([]),
    listRef = useRef<HTMLUListElement>(null)

  const dataMemo = usemMemo(() => {
    try {
      let newData = conversionData(data, { id: 'string', content: 'string', parentid: 'string' }).filter(
        item => item.id && item.id != item.parentid
      )
      newData = arrDuplicateRemove(newData, 'id')
      newData = formatMenuData(newData)

      if (currentVal === 'first') {
        const ids = getActivePath(newData, '', true)
        setActiveId(ids)
      }
      return newData
    } catch (error) {
      console.warn(error)
      return []
    }
  }, [data, currentVal])

  usemEffect(() => {
    if (currentVal === 'id') {
      const val = defaultId?.value || ''
      const active = getActivePath(dataMemo, val)
      setActiveId(active)
    }
  }, [data, defaultId, currentVal])

  // 处理事件
  usemEffect(() => {
    const actLen = activeId.length
    if (actLen && !isEqual(activeId, prevActiveId.current)) {
      const focusId = activeId[actLen - 1]
      const param = data.find(item => item.id === focusId)
      param && onChange && onChange(param)
      prevActiveId.current = activeId
    }
  }, [activeId, data])

  // 点击激活时点击列表外收起子菜单
  useEffect(() => {
    function clickOutsideList(ev: MouseEvent) {
      if (listRef.current && ev.target && !listRef.current.contains(ev.target as Node) && showNavId.current) {
        setShowNavId('')
      }
    }

    if (targetType === 'click') window.addEventListener('click', clickOutsideList)

    return () => {
      if (targetType === 'click') window.removeEventListener('click', clickOutsideList)
    }
  }, [])

  const styles = usemMemo(() => {
    const {
      subGlobalConfig,
      background: subPanelBg,
      border: subPanelBorder,
      outShadow: subPanelOutShadow,
      inShadow: subPanelInShadow
    } = subPanel || {}
    const { lineStyle, itemGap = 0, alignment = 'left', yOffset = 0, xSubPadding = 0, ySubPadding = 0, layout } =
      subGlobalConfig || {}
    const submenuIshorizontal = submenuLayout === 'horizontal'
    const submenuIsTop = submenuPosition === 'top'

    const navItem: CSSProperties = {
      padding: `${padding?.y || 0}px ${padding?.x || 0}px`
    }
    const subWrapper: CSSProperties = {
      paddingTop: submenuIsTop ? 0 : yOffset,
      paddingBottom: submenuIsTop ? yOffset : 0
    }
    const sublist: CSSProperties = {
      gap: itemGap,
      padding: `${ySubPadding}px ${submenuIshorizontal ? xSubPadding : 0}px`
    }
    const subitem: CSSProperties = {
      width: lineStyle?.w || 0,
      height: lineStyle?.h || 0,
      alignItems: alignType[layout?.y || 'center'],
      justifyContent: alignType[layout?.x || 'center']
    }

    sublist.flexDirection = submenuIshorizontal ? 'row' : 'column'
    submenuIsTop ? (subWrapper.bottom = '100%') : (subWrapper.top = '100%')

    if (alignment === 'left') subWrapper.left = '0'
    if (alignment === 'right') subWrapper.right = '0'
    if (alignment === 'center') {
      subWrapper.left = '50%'
      subWrapper.transform = 'translateX(-50%)'
    }

    if (subPanelBg?.display) {
      const { subPanelBgType = 'color', color, imageUrl } = subPanelBg
      if (subPanelBgType === 'color') {
        const { color: bgC, colorType } = colorFunc(color)
        colorType === 'single' ? (sublist.backgroundColor = bgC) : (sublist.backgroundImage = bgC)
      } else {
        sublist.backgroundImage = `url(${imageUrl})`
      }
    }

    if (subPanelBorder?.display) {
      const { color, width, radius } = subPanelBorder
      sublist.border = `${width}px solid ${color}`
      sublist.borderRadius = `${radius}px`
    }

    if (subPanelOutShadow?.display) {
      const { color, xOffset, yOffset, vague, extend } = subPanelOutShadow
      sublist.boxShadow = `${xOffset}px ${yOffset}px ${vague}px ${extend}px ${color}`
    }

    if (subPanelInShadow?.display) {
      const { color, xOffset, yOffset, vague, extend } = subPanelInShadow
      sublist.boxShadow = `${
        sublist.boxShadow ? `${sublist.boxShadow},` : ''
      }${xOffset}px ${yOffset}px ${vague}px ${extend}px ${color} inset`
    }

    submenuIshorizontal && numberIsEmpty(subGlobalConfig?.width) && (sublist.width = subGlobalConfig?.width)
    !submenuIshorizontal && numberIsEmpty(subGlobalConfig?.height) && (sublist.height = subGlobalConfig?.height)

    return { sublist, subWrapper, navItem, subitem }
  }, [submenuLayout, submenuPosition, padding, subPanel])

  function navItemHangerChange(type: EventType, param: MenuData, isChild = true) {
    switch (type) {
      case 'click': {
        onClick && onClick(param)
        // 点击含有子的父节点展开子节点
        if (!isChild && targetType === 'click' && param.children?.length) {
          showNavId.current !== param.id && setShowNavId(param.id)
        } else {
          // 已经激活直接收起
          if (activeId.includes(param.id) && isChild) return setShowNavId('')

          const active = getActivePath(dataMemo, param.id)
          if (active.length) {
            unstable_batchedUpdates(() => {
              setActiveId(active)
              setShowNavId('')
            })
          }
        }

        break
      }
      case 'enter': {
        if (!isChild && showNavId.current !== param.id && targetType === 'hover' && param.children?.length) {
          setShowNavId(param.id)
        }
        break
      }
      case 'leave': {
        if (!isChild && targetType === 'hover' && showNavId.current) setShowNavId('')
        break
      }
      default:
        break
    }
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <LczHorizontalMenuWrapper
        className='lcz-horizontal-menu'
        mainPanel={mainPanel || ({} as MainPanel)}
        subPanel={subPanel || ({} as SubPanel)}
        submenuIshorizontal={submenuLayout === 'horizontal'}>
        <ul className='lcz-horizontal-menu-list' ref={listRef} style={{ gap: itemGap }}>
          {dataMemo.map((item: MenuData, i: number) => (
            <NavItem
              key={i}
              activeId={activeId}
              showNavId={showNavId.current}
              itemData={item}
              navItemHangerChange={navItemHangerChange}
              styles={styles}
            />
          ))}
        </ul>
      </LczHorizontalMenuWrapper>
    </LczComCon>
  )
})

LczHorizontalMenu.displayName = 'LczHorizontalMenu'
export default LczHorizontalMenu
