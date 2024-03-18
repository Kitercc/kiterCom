import React, { memo, useState } from 'react'
import { Input } from 'antd'
const { Search } = Input

interface searchInputProps {
  onChange(value: string): void
}
const SearchInput = memo(function (props: searchInputProps) {
  const { onChange } = props
  const [value, setValue] = useState('')

  const onSearch = value => {
    onChange(value)
    setValue('')
  }

  const onSearchChange = e => {
    // onChange(e.target.value)
    setValue(e.target.value)
  }

  const onPressEnter = () => {
    onChange(value)
    setValue('')
  }

  return (
    <>
      <Search
        placeholder='搜索'
        value={value}
        onChange={onSearchChange}
        onSearch={onSearch}
        onPressEnter={onPressEnter}
      />
    </>
  )
})

SearchInput.displayName = 'SearchInput'

export default SearchInput
