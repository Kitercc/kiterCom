import { DataMap } from '../type'

/**
 * 处理级联选择搜索时的render
 * @param path
 * @returns
 */
export const getValue = function (path: any[]) {
  let _str = ''
  const _arr: any[] = []
  path.forEach(item => {
    _str += item.content + '/'
    _arr.push(item.id)
  })
  _str = _str.slice(0, -1).replace(/\s*\([^/\\)]*\)\s*/g, '')
  return { str: _str, arr: _arr }
}

/**
 * 格式化data
 * @param data
 *
 */
export const formatData = function (data: DataMap[]) {
  const cloneData: any[] = JSON.parse(JSON.stringify(data))
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

export const secondFormatData = function (data: any[]) {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      item.content = `${item.content} (${item.children.length})`
      secondFormatData(item.children)
    }
  })
}

/**
 *
 * @param data 数据数组
 * @param value 需要寻找的子集id
 * @param arr 初始化数据 默认为空
 * @returns 寻找到的数据
 */

export const getDefaultValue = function (
  data: DataMap[],
  value: string,
  changeOnSelect: boolean,
  arr: any[] = []
): string[] {
  const idObj = {}
  data.forEach(item => {
    if (item.id) {
      idObj[item.id] = item
    }
  })
  const current = idObj[value]
  const child = data.filter(da => da.parentid === value)

  if (
    (arr.length === 0 && !changeOnSelect && current && child.length > 0) ||
    (current && current.id == current.parentid)
  ) {
    arr = []
    return arr
  }

  if (current) {
    arr.unshift(value)
    if (current.parentid) {
      return getDefaultValue(data, current.parentid, changeOnSelect, arr)
    }
  }
  return arr
}
