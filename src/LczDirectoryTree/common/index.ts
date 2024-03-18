import { DataMap } from '../type'

export const formatData = function (data: DataMap[]) {
  const ids = data.map(v => v.id)
  if (ids.length !== [...new Set(ids)].length) return []
  const cloneData: any[] = data.filter(v => v.id !== v.parentid && v.id !== '' && v.id !== undefined && v.id !== null)
  const idObj = {}
  cloneData.forEach(v => {
    idObj[v.id] = v
  })

  return cloneData.filter(father => {
    const branchArr = cloneData.filter(child => father.id == child.parentid)
    branchArr.length > 0 ? (father.children = branchArr) : null
    return !father.parentid || !idObj[father.parentid]
  })
}

// 查找id
export const findId = function (data: any, type: 'first' | 'id' = 'first', id?: string) {
  let target: any
  if (type === 'first') {
    const _data = extractTree(data, 'children')
    return _data.find(v => v.isLeaf)
  } else {
    if (id) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.id != id) {
          if (item?.children?.length > 0) {
            target = findId(item.children, 'id', id)
          } else {
            continue
          }
        } else {
          target = item
        }
        if (target) break
      }
    }
  }
  return target
}

// 找到展开路径
export const findExpanded = (data: any, id, path: any[] = []) => {
  const find = data.find(v => v.id == id)
  if (find && find?.parentid) {
    path.push(find.parentid)
    if (data?.[find.parentid]?.parentid) findExpanded(data, find.parentid, path)
  }
  return path
}

// 手风琴效果
export const getaccordion = (data: any, target: any[], key: any, initialData: any) => {
  const root = data.map(v => v.id)
  const isRoot = root.includes(key)
  if (target.includes(key)) {
    if (isRoot) {
      const notroot = target.filter(v => !root.includes(v))
      target = [...notroot, key]
    } else {
      const parentids = findExpanded(initialData, key)
      const _obj = findId(data, 'id', parentids[0])?.children
      if (_obj?.length) {
        target = getaccordion(_obj, target, key, initialData)
      } else {
        target.push(key)
      }
    }
  }

  return target
}

/**
 *
 * @param {Array} arrs 树形数据
 * @param {string} childs 树形数据子数据的属性名,常用'children'
 * @param {Array} attrArr 需要提取的公共属性数组(默认是除了childs的全部属性)
 * @returns
 */
function extractTree(arrs, childs, attrArr?: any) {
  let attrList: any[] = []
  if (!Array.isArray(arrs) && !arrs.length) return []
  if (typeof childs !== 'string') return []
  if (!Array.isArray(attrArr) || (Array.isArray(attrArr) && !attrArr.length)) {
    attrList = Object.keys(arrs[0])
    attrList.splice(attrList.indexOf(childs), 1)
  } else {
    attrList = attrArr
  }
  const list: any[] = []
  const getObj = arr => {
    arr.forEach(function (row) {
      const obj: any = {}
      attrList.forEach(item => {
        obj[item] = row[item]
      })
      list.push(obj)
      if (row[childs]) {
        getObj(row[childs])
      }
    })
    return list
  }
  return getObj(arrs)
}
