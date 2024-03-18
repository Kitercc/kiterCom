import React, { memo, useEffect, useState } from 'react'

import { Input } from 'antd'
import { clearSearchText, showSearchText } from '../common'
const { Search } = Input

interface searchInputProps {
  onChange(value: string): void
  isOpen: boolean
  randomId: string
  selectValue: any[]
  mode: string
  setSearchValue: (v: string) => void
  data: any[]
}
export const SearchInput = memo((props: searchInputProps) => {
  const { onChange, isOpen, randomId, setSearchValue, selectValue, mode = 'single' } = props
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue('')
    setSearchValue('')

    if (!isOpen) {
      clearSearchText(randomId, mode)
    }
  }, [isOpen])

  const onSearch = value => {
    onChange(value)
    setValue('')
    !value && clearSearchText(randomId, mode)
  }

  const onSearchChange = e => {
    showSearchText(
      randomId,
      mode,
      (selectValue.length === 0 || !selectValue[0]) && e.target.value.trim(),
      undefined,
      true
    )

    onChange(e.target.value)
    setValue(e.target.value)
  }

  const onEnter = () => {
    onChange(value)
    setValue('')
    setSearchValue('')
  }

  return (
    <Search
      placeholder='搜索'
      value={value}
      onChange={onSearchChange}
      onSearch={onSearch}
      onPressEnter={onEnter}
      onBlur={onEnter}
    />
  )
})

SearchInput.displayName = 'SearchInput'
