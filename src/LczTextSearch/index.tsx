import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import { Input, InputRef } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import LczComCon from '../common/LczComCon'
import { SearchUl, SearchWrapper } from './style'
import { DataMap, TextSearchProps } from './type'
import {
  defaultBgConfig,
  defaultBorderConfig,
  defaultOptionsPanel,
  defaultPadding,
  defaultPlaceholderConfig,
  defaultSearchIcon,
  defaultShadow,
  defaultTextStyle
} from './common/defaultValue'
import { conversionData, getColorObj } from '../common/util'

export default memo(function LczTextSearch(props: TextSearchProps) {
  const {
    h = 40,
    radius = 20,
    enterSearch = true,
    searchConfig = {
      unfoldWay: 'allUnfold', //'allUnfold' | 'clickUnfold'
      packWidth: 53,
      unfoldDirection: 'left', //'left' | 'right'
      searchPack: true
    },
    optionsPanel = defaultOptionsPanel,
    emptyIcon = { display: false, size: 16, color: '#C8D0D8' },
    placeholderConfig = defaultPlaceholderConfig,
    textStyle = defaultTextStyle,
    padding = defaultPadding,
    bgConfig = defaultBgConfig,
    borderConfig = defaultBorderConfig,
    searchIcon = defaultSearchIcon,
    outShadow = defaultShadow,
    inShadow = defaultShadow,
    onChange,
    onClick,
    data = []
  } = props

  // hook
  const [inpValue, setInpValue] = useState<string>('')

  const inpRef = useRef<InputRef>(null)
  const timer = useRef<any>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [wrapperWidth, setWrapperWidth] = useState<any>('')
  const [isUnfold, setIsUnfold] = useState<boolean>(true)
  const [panelshow, setPanelShow] = useState<boolean>(false)
  const [panelData, setPanelData] = useState<any[]>([])

  const dataMemo = useMemo(() => {
    let newData: DataMap[] = []
    if (data && data.length > 0) {
      newData = conversionData(data, { id: 'string', content: 'string', value: 'string' })
    } else {
      newData = []
    }

    return newData
  }, [JSON.stringify(data)])

  useEffect(() => {
    setPanelData([])
    const _value = dataMemo[0]?.value.trim() || ''
    if (data && data[0] && optionsPanel.displayMode == 'nullAll') {
      const _data = dataMemo.filter(v => v.content.includes(_value) || v.id.includes(_value))
      setPanelData(_data)
    }

    if (data && data[0] && data[0].value && optionsPanel.displayMode == 'nullNone') {
      const _data = dataMemo.filter(v => v.content.includes(_value) || v.id.includes(_value))
      setPanelData(_data)
    }

    if (data && data[0] && data[0].value) {
      setInpValue(dataMemo[0].value)
      onChange && onChange({ id: '', content: '', value: data[0].value })
    } else {
      setInpValue('')
    }
  }, [JSON.stringify(dataMemo), optionsPanel.displayMode])

  //挂载盒子外面点击事件
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, false)
    return () => {
      document.removeEventListener('click', handleClickOutside, false)
    }
  }, [searchConfig, panelshow, isUnfold, panelData])

  //判断是否展开
  useEffect(() => {
    if (searchConfig.unfoldWay == 'clickUnfold') {
      setWrapperWidth(searchConfig.packWidth)
      setIsUnfold(false)
    } else {
      setWrapperWidth('100%')
    }
  }, [JSON.stringify(searchConfig)])

  //搜索面板收起,收缩框收起
  const handleClickOutside = () => {
    if (searchConfig.searchPack || panelData.length == 0) {
      if (searchConfig.unfoldWay == 'clickUnfold') {
        setWrapperWidth(searchConfig.packWidth)
        setIsUnfold(false)
      }
      setPanelShow(false)
    } else {
      if (searchConfig.unfoldWay == 'clickUnfold' && !panelshow) {
        setWrapperWidth(searchConfig.packWidth)
        setIsUnfold(false)
      }
      if (isUnfold && panelshow) {
        setPanelShow(false)
      }
    }
  }

  //盒子点击事件
  const warpClick = (e: any) => {
    e.stopPropagation()
    if (!isUnfold) {
      setWrapperWidth('100%')
      setIsUnfold(true)
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
    enterSearch && inpRef.current?.blur()
    enterSearch && onChange && onChange({ id: '', value: inpValue, content: '' })
    enterSearch && handleClickOutside()
  }

  //搜索框change事件
  const _onChangeInput = (value: any) => {
    timer.current && clearTimeout(timer.current)
    const _value = value.trim()
    if (optionsPanel.displayMode == 'nullNone') {
      if (_value) {
        timer.current = setTimeout(() => {
          let _data: any[] = []
          if (data.length) {
            _data = dataMemo.filter(v => v.content.includes(_value) || v.id.includes(_value))
          }
          setPanelData(_data)
        }, 300)
      } else {
        timer.current = setTimeout(() => {
          setPanelData([])
        }, 300)
      }
    } else {
      timer.current = setTimeout(() => {
        let _data: any[] = []
        if (data.length) {
          _data = dataMemo.filter(v => v.content.includes(_value) || v.id.includes(_value))
        }
        setPanelData(_data)
      }, 300)
    }
  }

  //搜索选项点击事件
  const lineItemClick = (v: any) => {
    handleClickOutside()
    setInpValue(v.content)
    _onChangeInput(v.content)
    onChange && onChange({ ...v, value: v.content })
    onClick && onClick({ ...v, value: v.content })
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <SearchWrapper
        outShadow={outShadow}
        inShadow={inShadow}
        searchIcon={searchIcon}
        borderConfig={borderConfig}
        radius={radius}
        emptyIcon={emptyIcon}
        searchConfig={searchConfig}
        placeTextStyle={placeholderConfig.placeTextStyle}
        padding={padding}
        bgColorMemo={bgColorMemo}
        style={textStyle}
        ref={wrapperRef}
        className='lcz-search-wrapper'>
        <div
          onClick={warpClick}
          className={`lcz-search-input ${isUnfold ? 'open' : 'close'}`}
          style={{ width: wrapperWidth, float: searchConfig.unfoldDirection }}>
          <Input
            value={inpValue}
            ref={inpRef}
            onFocus={() => {
              setPanelShow(true)
            }}
            onPressEnter={() => handlerChange()}
            onChange={e => {
              _onChangeInput(e.target.value)
              setInpValue(e.target.value)
            }}
            placeholder={placeholderConfig.display ? placeholderConfig.text : ''}
            allowClear
            prefix={<SearchOutlined style={{ color: searchIcon.color, fontSize: searchIcon.size }} />}
          />
        </div>
        {optionsPanel.display && panelshow && panelData.length > 0 && (
          <SearchUl h={h} optionsPanel={optionsPanel} className='lcz-search-ul'>
            <ul className='search-ul'>
              {panelData.map((v: any, i: number) => {
                return (
                  <li className='search-li' key={v.id + i} onClick={() => lineItemClick(v)}>
                    <p>{v.content}</p>
                  </li>
                )
              })}
            </ul>
          </SearchUl>
        )}
      </SearchWrapper>
    </LczComCon>
  )
})
