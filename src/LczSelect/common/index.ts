import { IconSeries } from '../type'

export const showSearchText = (
  id: string,
  mode: string,
  condition: boolean,
  setSearchValue?: (val: string) => void,
  searchStatus = false
) => {
  const _dom = document.getElementById(id)?.querySelector('.ant-select-selection-overflow-item-suffix')

  if (!searchStatus) return false

  if (condition) {
    //@ts-ignore
    _dom?.innerHTML = '<span style="opacity:0.5">请选择</span>'
  } else {
    //@ts-ignore
    _dom?.innerHTML = ''
  }
}

export const clearSearchText = (id: string, mode: string) => {
  const _dom = document
    .getElementById(id)
    ?.querySelector(mode === 'single' ? '.ant-select-selection-search' : '.ant-select-selection-overflow-item-suffix')

  if (mode === 'single') {
    //@ts-ignore
    _dom?.innerHTML = ''
  }
}

export const findOptionIcon = (iconSeries: IconSeries[], type: string | number | undefined) => {
  if (type === '' || type === undefined || type === null || !iconSeries?.length) return undefined
  return iconSeries.find(v => v.type == type)
}
