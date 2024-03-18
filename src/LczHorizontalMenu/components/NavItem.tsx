import React, { memo, CSSProperties } from 'react'
import { EventType, MenuData } from '../type'

type NavItemProps = {
  showNavId: string
  itemData: MenuData
  activeId: string[]
  navItemHangerChange: (type: EventType, param: MenuData, isChild?: boolean) => void
  styles: { [key: string]: CSSProperties }
}

const NavItem = memo((props: NavItemProps) => {
  const { itemData, showNavId, activeId = [], navItemHangerChange, styles } = props
  const hasChild = itemData.children && itemData.children.length > 0

  const getClassName = data => {
    if (activeId.length && activeId.includes(data.id)) return 'active'
    return ''
  }

  return (
    <li
      className={['lcz-menu-nav-item', 'background-image-100', getClassName(itemData)].join(' ')}
      style={styles.navItem}
      onMouseEnter={navItemHangerChange.bind(null, 'enter', itemData, false)}
      onMouseLeave={navItemHangerChange.bind(null, 'leave', itemData, false)}
      onClick={navItemHangerChange.bind(null, 'click', itemData, false)}>
      <span className='lcz-menu-nav-content'>{itemData.content}</span>
      {hasChild && (
        <div
          className='lcz-menu-submenu-wrapper'
          style={{
            display: showNavId === itemData.id ? 'block' : 'none',
            ...styles.subWrapper
          }}>
          <ul className='lcz-menu-submenu-list background-image-100' style={styles.sublist}>
            {itemData.children?.map((item, i) => (
              <li
                key={i}
                className={['lcz-menu-submenu-item', 'background-image-100', getClassName(item)].join(' ')}
                style={styles.subitem}
                onClick={e => {
                  e.stopPropagation()
                  navItemHangerChange('click', item, true)
                }}>
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  )
})

NavItem.displayName = 'NavItem'
export default NavItem
