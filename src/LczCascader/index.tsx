import React, { memo, useRef, useEffect, useState, Fragment, CSSProperties } from 'react'
import reactDOM from 'react-dom'
import { Cascader, CascaderProps } from 'antd'
import { CascaderRef } from 'antd/es/cascader'
import { CascaderWrapper } from './style'
import LczComCon from '../common/LczComCon'

import { ArrowDown, LczCascaderProps, OptionConfig } from './type'
import { formatData, getDefaultValue, getValue, secondFormatData } from './common'
import {
  defaultArrowDown,
  defaultBorderConfig,
  defaultClearIcon,
  defaultGloablTextStyle,
  defaultOptionLine,
  defaultPanelConfig,
  defaultTextConfig,
  defaultTextStyle
} from './common/defaultValue'
import { analysisExpression, conversionData } from '../common/util'
import { usemMemo, usemEffect, useSyncState } from '../common/hooks'
import IconCon from '../common/IconCon'

interface SelectIconProps {
  onClick?: () => void
  iconConfig: ArrowDown
}

const SelectIcon = memo((props: SelectIconProps) => {
  const { onClick, iconConfig } = props
  const { iconColor, arrowType, imgUrl, imgWidth, imgHeight, iconSize } = iconConfig
  return (
    <>
      {arrowType === 'system' ? (
        <IconCon
          className='select-icon'
          onClick={onClick}
          style={{ color: iconColor, fontSize: iconSize, lineHeight: 1 }}
          oldFamily='lcz-system-arrow-icon'
          iconValue={iconConfig?.iconValue}
        />
      ) : (
        imgUrl && (
          <img
            src={imgUrl}
            onClick={onClick}
            className='select-icon-image'
            style={{ width: imgWidth, height: imgHeight }}
            alt=''
          />
        )
      )}
    </>
  )
})

SelectIcon.displayName = 'SelectIcon'

export default memo(function LczCascader(props: LczCascaderProps) {
  const {
    id = '',
    design = true,
    gloablConfig,
    optionConfig,
    panelConfig = defaultPanelConfig,
    onChange,
    onClick,
    data = []
  } = props

  const {
    trigger = 'click',
    changeOnSelect = false,
    checkCondition = '',
    displayType = 'system',
    saveState = true,
    defaultId = { value: '' },
    search = true,
    gloablTextStyle = defaultGloablTextStyle
  } = gloablConfig || {}

  const {
    angle = 90,
    borderConfig = defaultBorderConfig,
    textConfig = defaultTextConfig,
    arrowDown = defaultArrowDown,
    clearIcon = defaultClearIcon
  } = optionConfig || {}

  const {
    placeholder = '请选择',
    onlyLast = false,
    pathDivision = '/',
    customContent = { value: '' },
    textStyle = defaultTextStyle
  } = textConfig

  const { yoffset, optionLine = defaultOptionLine } = panelConfig
  const shownum = optionLine.shownum || false

  // hooks
  const [actValue, setActValue] = useState<string[]>([''])
  const [open, setOpen] = useSyncState<boolean>(false)
  const [height, setH] = useState<number>(50)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cascaderRef = useRef<CascaderRef | null>(null)
  const otherOptions = useRef<any>({})

  const dataMemo = usemMemo(() => {
    return conversionData(data, { id: 'string', content: 'string', parentid: 'string' })
  }, [data])

  const optionMemo = usemMemo(() => {
    let _option: any = []
    if (dataMemo && dataMemo.length > 0) {
      const NullId = dataMemo.filter(v => !v.id)
      if (NullId.length > 0) return []
      const _data = dataMemo.map(v => ({ ...v, id: String(v.id), parentid: String(v.parentid) }))
      const newData = formatData(_data)
      if (shownum) {
        secondFormatData(newData)
      }
      _option = [...newData]
    } else {
      _option = []
    }
    return _option
  }, [dataMemo, shownum])

  useEffect(() => {
    if (!open.current && !saveState) setActValue([''])
  }, [open.current, saveState])

  usemEffect(() => {
    if (saveState) {
      const _findActiveId = getDefaultValue(data, String(defaultId.value), changeOnSelect)
      onCascaderChange(_findActiveId.length ? _findActiveId : '', false)
    }
  }, [data, defaultId, changeOnSelect, saveState])

  usemEffect(() => {
    if (dataMemo.length && optionMemo.length && actValue?.length) {
      const param = getEventParam(actValue)
      setTimeout(() => param && onChange && onChange(param))
    }
  }, [actValue, optionMemo, saveState])

  // @ts-ignore
  const cascaderProps: CascaderProps<any> = usemMemo(() => {
    const props = {
      expandTrigger: trigger,
      changeOnSelect,
      getPopupContainer: () => wrapperRef.current as HTMLDivElement,
      options: optionMemo,
      onChange: value => onCascaderChange(value),
      displayRender: selectValueRender,
      style: { ...gloablTextStyle, ...textStyle } as CSSProperties,
      placeholder: '',
      fieldNames: { label: 'content', value: 'id', children: 'children' },
      onClick: e => {
        const target = e.target as HTMLElement
        const menuEl = wrapperRef.current?.querySelector('.ant-cascader-menus') as HTMLElement
        if (menuEl && target && menuEl.contains(target) && search && isSearch) setIsSearch(false)
      }
    }

    if (displayType === 'system') {
      props.placeholder = textConfig.display ? placeholder : ''
    }

    return props
  }, [
    optionMemo,
    displayType,
    textConfig.display,
    saveState,
    angle,
    trigger,
    changeOnSelect,
    checkCondition,
    placeholder,
    search,
    onlyLast,
    gloablTextStyle,
    textStyle,
    customContent.value,
    isSearch
  ])

  const showSearch: CascaderProps<any>['showSearch'] = usemMemo(() => {
    const _search =
      search && textConfig.display
        ? { filter: handlerSearch, matchInputWidth: true, render: handlerSearchRender }
        : false

    return _search
  }, [actValue, search, textConfig.display, isSearch])

  // function

  function getEventParam(selectList: string[] = []) {
    const len = selectList.length
    return dataMemo.find(da => da.id === selectList[len - 1])
  }

  function onCascaderChange(value, isOnChange = true) {
    if (value) {
      const _id = value[value.length - 1],
        find = dataMemo.find(da => da.id === _id)
      const condition =
        checkCondition === '' || analysisExpression(checkCondition, find, id, { name: 'gloablConfig.checkCondition' })
      if (condition) {
        setActValue(value)
        const param = getEventParam(value)
        param && isOnChange && onClick && onClick(param)
      }
    } else {
      setActValue([''])
    }
    onSearch('', false)
  }

  function onSearch(val, flag = true) {
    if (val) {
      // antd@4.22.4 在搜索时会把ant-select-selection-item 这个dom 清除 所以在这里需要创建
      setTimeout(() => {
        const $label = wrapperRef.current?.querySelector('.ant-select-selection-item')

        if (!$label) {
          const $wrapper = $(wrapperRef.current)
          const $selector = $wrapper.find('.ant-select-selector')
          $selector.append('<span class=' + 'ant-select-selection-item' + '></span>')

          setTimeout(() => {
            const $label = $wrapper.find('.ant-select-selection-item')[0]
            const child = selectValueRender([''], false)
            // 保存 ant-select-selection-item  为了搜索后将新建的dom清掉
            otherOptions.current.$label = $label
            reactDOM.render(child, $label)
          })
        }
      })
    } else {
      // 移除 ant-select-selection-item
      if (otherOptions.current.$label) {
        reactDOM.unmountComponentAtNode(otherOptions.current.$label)
        otherOptions.current.$label.remove()
        otherOptions.current.$label = null
      }
      flag && search && isSearch && setIsSearch(false)
    }
  }

  function handlerSearch(inputValue, path) {
    return path.some(option => option.content.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
  }

  function handlerSearchRender(_, path) {
    const resolve = getValue(path)
    if (resolve.arr.toString() === actValue.toString()) {
      return (
        <div className='lcz-cascader-filter-item lcz-cascader-filter-item-active'>
          <span className='active-value'>{resolve.str}</span>
        </div>
      )
    }
    return <div className='lcz-cascader-filter-item'>{resolve.str}</div>
  }

  function selectValueRender(label, showLabel = true) {
    const getContainer = val => {
      return (
        <Fragment>
          <div
            className='lcz-cascader-custom-bg background-image-100'
            style={{ transform: `skewX(${angle - 90}deg)` }}
            onClick={() => showSearch && cascaderRef.current?.focus()}
          />
          {textConfig.display && showLabel && (
            <div className='lcz-cascader-custom-val' style={{ opacity: search && isSearch ? 0 : 1 }}>
              {val}
            </div>
          )}
        </Fragment>
      )
    }

    if (displayType === 'custom') return getContainer(customContent.value)

    if ((label.length === 0 || (label.length === 1 && label[0] === '')) && textConfig.display && placeholder) {
      return getContainer(placeholder)
    }

    // 去除括号里的值
    const _label = label.map(la => la.replace(/\s*\([^/\\)]*\)\s*/g, ''))

    if (onlyLast) return getContainer(_label[_label.length - 1])
    return getContainer(_label.join(pathDivision))
  }

  function onPopupVisibleChange(_open) {
    if (open.current === _open) return false

    if (_open) {
      const { display, width } = borderConfig
      const _h = (wrapperRef.current?.children[0].clientHeight || 0) + (display ? width * 2 : 0) + yoffset
      height !== _h && setH(_h)
      search && !isSearch && setIsSearch(true)
    } else {
      if (search && isSearch) setIsSearch(false)
      search && cascaderRef.current?.blur()
    }
    setOpen(_open)
  }

  const showClear =
    (!search || !isSearch) && textConfig.display && clearIcon.display && (actValue.length !== 1 || actValue[0] !== '')

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <CascaderWrapper
        className={`lcz-cascader-wrapper ${open.current ? 'lcz-cascader-wrapper-open' : ''}`}
        gloablTextStyle={gloablTextStyle}
        panelConfig={panelConfig}
        optionConfig={optionConfig || ({} as OptionConfig)}
        optionLine={optionLine}
        height={height}
        design={design}
        isSystem={displayType === 'system'}
        ref={wrapperRef}>
        <Cascader
          ref={cascaderRef}
          value={actValue}
          open={open.current}
          {...cascaderProps}
          allowClear={showClear}
          suffixIcon={
            <span className='ant-cascader-picker-arrow'>
              <SelectIcon iconConfig={arrowDown} onClick={() => setOpen(!open.current)} />
            </span>
          }
          onDropdownVisibleChange={onPopupVisibleChange}
          showSearch={showSearch}
          onSearch={onSearch}
        />
      </CascaderWrapper>
    </LczComCon>
  )
})
