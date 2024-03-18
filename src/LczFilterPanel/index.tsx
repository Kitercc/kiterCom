import React, { memo, useState, useEffect, useRef, useMemo } from 'react'
import LczComCon from '../common/LczComCon'
import { FilterPanelWrapper } from './style'
import SearchInput from './components/SearchInput'
import PanleListItem from './components/PanleListItem'

import { checkOption, configDisplayCompatible, conversionData, multipleselec } from '../common/util'
import { DataMap, FilterPanelProps } from './type'
import {
  defaultaArrowConfig,
  defaultActiveStyle,
  defaultBgConfig,
  defaultHoverStyle,
  defaultOptionLine,
  defaultPlainStyle,
  defaultSearchConfig,
  defaultTextStyle
} from './common/defalutValue'
import { defaultOptionIcon } from '../LczSelect/common/defaultValue'

const LczFilterPanel = (props: FilterPanelProps) => {
  const {
    w = 0,
    h = 0,
    mode = 'single',
    loadEvent = true,
    type = 'index',
    singleIndex = { value: 0 },
    singleId = { value: 1 },
    multipleIndex = { value: '0,1' },
    multipleId = { value: '1,2' },

    autoHide = true,
    outHide = true,
    bgConfig = defaultBgConfig,
    arrowConfig = defaultaArrowConfig,
    textStyle = defaultTextStyle,
    searchConfig = defaultSearchConfig,
    optionLine = defaultOptionLine,
    optionIcon = defaultOptionIcon,
    data = [],
    onHided,
    onChange,
    onClick
  } = props

  const {
    plainStyle = defaultPlainStyle,
    hoverStyle = defaultHoverStyle,
    activeStyle = defaultActiveStyle
  } = optionLine

  const { boxBgColor = '#fff', boxImage, boxBorderW = 1, boxBorderC = '#ccc', boxRadius = 0 } = bgConfig

  const searchDis = configDisplayCompatible(searchConfig, 'searchStatus')

  // hook
  const [activeArr, setArr] = useState<any[]>([])
  const [searchArr, setSearch] = useState<any[]>([])
  const wrapper = useRef<HTMLDivElement>(null)
  const lczCom = useRef<HTMLDivElement>(null)
  const dataRef = useRef<{ data: DataMap[]; id: any[]; mode: string | 'single" | "multiple'; timer: any }>({
    mode: 'single',
    data: [],
    id: [],
    timer: null
  })

  const optionsMemo = useMemo(() => {
    let optionAr: any = []
    if (data && data.length > 0) {
      optionAr = conversionData(data, { id: 'string', content: 'string', type: 'string' })
    } else {
      optionAr = []
    }
    dataRef.current.data = [...optionAr]
    return optionAr
  }, [JSON.stringify(data), JSON.stringify(searchArr)])

  const boxStyle = useMemo(() => {
    return {
      background: boxImage ? `url(${boxImage})` : boxBgColor,
      borderWidth: boxBorderW,
      borderColor: boxBorderC,
      borderRadius: boxRadius
    }
  }, [boxBgColor, boxBorderW, boxBorderC, boxRadius, boxImage])

  useEffect(() => {
    dataRef.current.mode = mode
    if (mode !== 'single') {
      const checkId = multipleselec(optionsMemo, type, multipleIndex, multipleId)
      dataRef.current.id = [...checkId]
      setArr([...checkId])
    } else {
      const checkId = checkOption(optionsMemo, type, singleIndex, singleId)
      dataRef.current.id = [checkId]
      setArr([checkId])
    }
  }, [
    JSON.stringify(optionsMemo),
    mode,
    type,
    JSON.stringify(multipleIndex),
    JSON.stringify(multipleId),
    JSON.stringify(singleIndex),
    JSON.stringify(singleId)
  ])

  useEffect(() => {
    if (dataRef.current.data.length) {
      dataRef.current.timer = setTimeout(() => {
        const { id = [], data, mode } = dataRef.current
        const findArr: any = data.filter(v => id.includes(v.id))
        if (findArr.length) {
          switch (mode) {
            case 'single':
              loadEvent && onChange && onChange(findArr[0], id)
              break
            case 'multiple':
              loadEvent && onChange && onChange(findArr, id)
              break
          }
        }
      }, 100)
    }
    return () => {
      dataRef.current.timer && clearTimeout(dataRef.current.timer)
    }
  }, [JSON.stringify(dataRef.current.id)])

  useEffect(() => {
    const pointerEvents = lczCom.current ? window.getComputedStyle(lczCom.current, null).pointerEvents : 'auto'
    if (outHide && pointerEvents !== 'none') {
      window.addEventListener('click', _globalHandlerClick)
    } else {
      window.removeEventListener('click', _globalHandlerClick)
    }
    return () => {
      window.removeEventListener('click', _globalHandlerClick)
    }
  }, [outHide])

  // function
  const _globalHandlerClick = e => {
    if (wrapper.current && e.target && !wrapper.current.contains(e.target)) {
      onHided && onHided()
    }
  }

  const downItemHandlerClick = item => {
    item && onClick && onClick(item)
    if (mode === 'single' && activeArr.includes(item.id)) return
    let active: any[] = []
    if (activeArr.includes(item.id)) {
      const newArr = activeArr.filter(v => v !== item.id)
      active = mode === 'single' ? [item.id] : newArr
      setArr([...active])
    } else {
      active = mode === 'single' ? [item.id] : [...activeArr, item.id]
      setArr([...active])
    }
    const params = mode === 'single' ? item : optionsMemo.filter(v => active.includes(v.id))

    onChange && onChange(params, active)

    if (mode === 'single') {
      autoHide && onHided && onHided()
      setSearch([])
    }
  }

  const onSearchHandler = value => {
    const searchOp = optionsMemo.filter(op => String(op.content).includes(value))
    setSearch(searchOp)
  }

  const panelH = searchDis ? h - (searchConfig.height + searchConfig.topBottomMargin * 2) : h

  return (
    <LczComCon style={{ overflow: 'visible' }} ref={lczCom}>
      <FilterPanelWrapper
        boxBgColor={boxBgColor}
        arrowConfig={arrowConfig}
        w={w}
        h={h}
        searchConfig={searchConfig}
        optionLine={optionLine}
        plainStyle={plainStyle}
        hoverStyle={hoverStyle}
        activeStyle={activeStyle}
        bgConfig={bgConfig}
        ref={wrapper}
        className='panel-wrapper'
        style={{ ...boxStyle, ...textStyle, fontSize: plainStyle.fontSize }}>
        {searchDis && (
          <div
            className={['panel-search'].join(' ')}
            style={{
              ...textStyle,
              fontSize: searchConfig.boxFontSize,
              color: searchConfig.textColor,
              height: searchConfig.height + searchConfig.topBottomMargin * 2
            }}>
            <SearchInput onChange={onSearchHandler} />
          </div>
        )}
        <div className='panle-list' style={{ height: panelH }}>
          {optionsMemo.length > 0 && (
            <>
              {(searchArr.length > 0 ? searchArr : optionsMemo).map((v, i) => {
                return (
                  <PanleListItem
                    key={i}
                    optionIcon={optionIcon}
                    mode={mode}
                    optionLine={optionLine}
                    activeArr={activeArr}
                    item={v}
                    downItemHandlerClick={downItemHandlerClick}
                  />
                )
              })}
            </>
          )}
        </div>
      </FilterPanelWrapper>
    </LczComCon>
  )
}

export default memo(LczFilterPanel)
