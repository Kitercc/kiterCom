import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Input, InputRef } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import LczComCon from '../common/LczComCon'
import { SearchWrapper } from './style'

import { SearchProps } from './type'
import {
  defaultBgConfig,
  defaultBorderConfig,
  defaultPadding,
  defaultPlaceholderConfig,
  defaultSearchIcon,
  defaultShadow,
  defaultTextStyle
} from './common/defaultValue'
import { getColorObj } from '../common/util'

export default memo(function LczSearch(props: SearchProps) {
  const {
    radius = 20,
    placeholderConfig = defaultPlaceholderConfig,
    textStyle = defaultTextStyle,
    padding = defaultPadding,
    bgConfig = defaultBgConfig,
    borderConfig = defaultBorderConfig,
    searchIcon = defaultSearchIcon,
    outShadow = defaultShadow,
    inShadow = defaultShadow,
    onChange,
    data = []
  } = props

  // hook
  const [inpValue, setInpValue] = useState<string>('')
  const inpWrapper = useRef<HTMLDivElement | null>(null)
  const inpRef = useRef<InputRef>(null)
  const eventActive = useRef<boolean>(false)

  useEffect(() => {
    if (data && data[0] && data[0].value) {
      setInpValue(String(data[0].value))
      onChange && onChange(data[0])
    } else {
      setInpValue('')
    }
  }, [JSON.stringify(data)])

  useEffect(() => {
    window.addEventListener('click', windowHandlerClick)
    return () => {
      window.removeEventListener('click', windowHandlerClick)
    }
  }, [])

  function windowHandlerClick(ev: MouseEvent) {
    // @ts-ignore
    if (inpWrapper.current && ev.target && !inpWrapper.current.contains(ev.target)) {
      inpRef.current?.blur()
    }
  }

  const bgColorMemo = useMemo(() => {
    const { display, color } = bgConfig
    if (!display) return 'transparent'
    const { color: colorValue, colorType } = getColorObj(color)
    if (colorType === 'single') {
      return colorValue
    } else {
      return `linear-gradient(${colorValue})`
    }
  }, [JSON.stringify(bgConfig)])

  const handlerChange = () => {
    if (eventActive.current) return false
    eventActive.current = true
    onChange && onChange({ value: inpValue })
    setTimeout(() => {
      eventActive.current = false
    }, 100)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <SearchWrapper
        ref={inpWrapper}
        outShadow={outShadow}
        inShadow={inShadow}
        searchIcon={searchIcon}
        borderConfig={borderConfig}
        radius={radius}
        placeTextStyle={placeholderConfig.placeTextStyle}
        padding={padding}
        bgColorMemo={bgColorMemo}
        style={{ ...textStyle }}
        className='lcz-search-wrapper'>
        <Input
          value={inpValue}
          ref={inpRef}
          onPressEnter={() => inpRef.current?.blur()}
          onChange={e => setInpValue(e.target.value)}
          onBlur={() => handlerChange()}
          placeholder={placeholderConfig.display ? placeholderConfig.text : ''}
          prefix={
            <SearchOutlined
              onClick={() => {
                inpRef.current?.blur()
              }}
              style={{ color: searchIcon.color, fontSize: searchIcon.size }}
            />
          }
        />
      </SearchWrapper>
    </LczComCon>
  )
})
