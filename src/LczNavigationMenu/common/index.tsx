import type { MenuProps } from 'antd'
import React from 'react'
import { IconCom } from '../components/IconCom'

import { DataMap } from '../type'
type MenuItem = Required<MenuProps>['items'][number]

export const formatData = (data: DataMap[]) => {
  const _ids = data.map(v => v.id)
  if (_ids.length !== [...new Set(_ids)].length) return []
  let _data: any = []
  data.forEach(da => {
    if (da.ofgroup) {
      const findIndex = _data.findIndex(_da => _da.id == `${da.ofgroup}-${da.parentid}`)
      if (findIndex < 0) {
        _data = _data.concat([
          { ...da, content: da.ofgroup, id: `${da.ofgroup}-${da.parentid}` },
          { ...da, parentid: `${da.ofgroup}-${da.parentid}`, myParent: da.parentid, ofgroup: undefined }
        ])
      } else {
        _data.push({ ...da, parentid: `${da.ofgroup}-${da.parentid}`, myParent: da.parentid, ofgroup: undefined })
      }
    } else {
      _data.push({ ...da })
    }
  })

  const cloneData: any[] = _data
    .map(v => ({ ...v, id: String(v.id) }))
    .filter(v => v.id !== v.parentid && v.id !== '' && v.id !== undefined && v.id !== null)
  const idObj = {}
  cloneData.forEach(v => {
    idObj[v.id] = v
  })

  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father.id == child.parentid)
    branchArr.length > 0 ? (father.children = branchArr) : ''
    return !father.parentid || !idObj[father.parentid]
  })
}

export const findPath = (data: any, id, path: any[] = []) => {
  const find = data.find(v => v.id == id)
  if (find && find?.parentid) {
    path.push(find.parentid)
    if (data?.[find.parentid]?.parentid) findPath(data, find.parentid, path)
  }
  return path.map(v => String(v))
}

export const formatMenuItems = (data, iconProps, subMenuProps, style) => {
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    type?: 'group',
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      type,
      label,
      style
    } as MenuItem
  }

  function getItems(itemData: any): MenuItem {
    const { id, content, children = [], ofgroup } = itemData
    let _children
    if (children?.length) {
      _children = formatMenuItems(children, iconProps, subMenuProps, style)
    }

    const items: any = getItem(
      content,
      id,
      <IconCom item={itemData} {...iconProps} />,
      ofgroup && children.length ? 'group' : undefined,
      _children?.length ? _children : undefined
    )

    if (items?.children?.length) {
      if (items.type !== 'group') {
        Object.assign(items, subMenuProps)
      } else {
        items.icon = undefined
      }
    }

    return items
  }

  const resolve: MenuItem[] = []

  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    resolve.push(getItems(item))
  }

  return resolve
}
