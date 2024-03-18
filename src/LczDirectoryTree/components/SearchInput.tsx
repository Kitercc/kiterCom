import React, { memo, useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SelectWrapper } from '../style'
import { SearchConfig, SearchTextStyle, TextStyle } from '../type'
import { defaultSearchConfig, defaultTextBox } from '../common/defaultValue'

interface SearchProps {
  searchConfig: SearchConfig
  textStyle: TextStyle
  onChange: (val: string) => void
}
export default memo(function SearchInput({ searchConfig = defaultSearchConfig, textStyle, onChange }: SearchProps) {
  const { height = 32, display: searchDis = true, speed = 12, textBox = defaultTextBox } = searchConfig
  const { searchTextStyle = defaultTextBox.searchTextStyle as SearchTextStyle } = textBox
  const [val, setVal] = useState<string>('')

  const onhandlerChange = ({ target }) => {
    setVal(target.value)
    onChange && onChange(target.value)
  }

  return (
    <>
      {searchDis && (
        <SelectWrapper textBox={textBox}>
          <Input
            value={val}
            style={{
              height,
              marginBottom: speed,
              fontSize: searchTextStyle.fontSize,
              fontWeight: searchTextStyle.fontWeight,
              ...textStyle
            }}
            onChange={onhandlerChange}
            placeholder={searchTextStyle.placeholder}
            prefix={<SearchOutlined />}
          />
        </SelectWrapper>
      )}
    </>
  )
})
