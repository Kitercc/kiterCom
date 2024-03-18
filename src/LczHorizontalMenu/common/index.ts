import { MenuData } from '../type'

export function formatMenuData(_data: MenuData[]) {
  const ids: string[] = [],
    objectId: { [key: string]: MenuData } = {}

  for (let index = 0; index < _data.length; index++) {
    const item = _data[index]
    objectId[item.id] = item
  }

  const data = _data.filter(item => {
    if (!objectId[item.parentid || ''] || item.id !== objectId[item.parentid || ''].parentid) {
      return true
    } else {
      delete objectId[item.id]
      return false
    }
  })

  // 收集parentid为空 或者 parentid不存在的菜单
  const resolve: MenuData[] = data.filter(item => {
    if (!item.parentid || !objectId[item.parentid]) {
      ids.push(item.id)
      return true
    }
  })

  // 添加children
  resolve.forEach(item => {
    const findItem = data.filter(da => {
      if (da.parentid == item.id) {
        ids.push(da.id)
        return true
      }
    })
    if (findItem.length) {
      item.children = findItem
    }
  })

  let i = 0
  // 处理2级菜单
  function getSecondData() {
    if (data.length === ids.length || i < 10) return true
    for (let index = 0; index < data.length; index++) {
      if (data.length === ids.length) break

      const item = data[index]
      if (!ids.includes(item.id)) {
        for (let i = 0; i < resolve.length; i++) {
          const childIds = resolve[i].children?.map(da => da.id) || []
          if (item.parentid && childIds.includes(item.parentid)) {
            resolve[i].children ? resolve[i].children?.push(item) : (resolve[i].children = [item])
            ids.push(item.id)
            break
          }
        }
      }
    }
    i++
    if (data.length > ids.length) getSecondData()
  }

  getSecondData()
  return resolve
}

// 获取激活项路径
export function getActivePath(data: MenuData[], activeId: string, isFirst = false) {
  activeId = String(activeId)
  let resolve: string[] = []
  if (data.length) {
    try {
      if (!isFirst) {
        for (let i = 0; i < data.length; i++) {
          const itemData = data[i],
            child = itemData.children || []
          if (!itemData.children?.length && itemData.id === activeId) {
            resolve = [activeId]
            break
          }

          for (let j = 0; j < child.length; j++) {
            const childItem = child[j]
            if (childItem.id === activeId) {
              resolve = [itemData.id, activeId]
              break
            }
          }

          if (resolve.length) break
        }
      } else {
        resolve = [data[0].id]
        if (data[0].children && data[0].children.length) {
          resolve.push(data[0].children[0].id)
        }
      }
    } catch (error) {
      console.warn(error)
      resolve = []
    }
  }
  return resolve
}
