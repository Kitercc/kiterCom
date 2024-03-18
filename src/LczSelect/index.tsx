import React, { memo, useMemo, forwardRef, useState, useCallback, useEffect, useRef } from 'react'
import { DropDownBoxWrapper } from './style'
import LczComCon from '../common/LczComCon'
import { Select, Checkbox } from 'antd'
const { Option } = Select

import { DropDownBoxProps, IconConfig, OptionType } from './type'
import {
  checkOption,
  configDisplayCompatible,
  conversionData,
  multipleselec,
  randomChar,
  resMobile
} from '../common/util'
import { SearchInput } from './components/Search'
import { findOptionIcon, showSearchText } from './common'
import PushUp from './components/PushUp'
import {
  boxColorDefault,
  defalutTextStyle,
  iconConfigDefault,
  optionLineDefault,
  searchConfigDefault,
  tagConfigDefault,
  boxBorderDefault,
  defaulePlainStyle,
  defauleHoverStyle,
  defauleActiveStyle,
  defaultOptionIcon,
  defaultSelectIcon
} from './common/defaultValue'
import Icon from './components/Icon'
import OptionIcon from './components/OptionIcon'
import CloseOutlined from '@ant-design/icons/lib/icons/CloseOutlined'
import { defaultClearIcon } from '../LczCascader/common/defaultValue'
import { usemMemo } from '../common/hooks'
import IconCon from '../common/IconCon'

interface SelectIconProps {
  onClick: () => void
  iconConfig: IconConfig
}

const SelectIcon = (props: SelectIconProps) => {
  const { onClick, iconConfig } = props
  const { display = true, iconColor, type, imgUrl, imgWidth, imgHeight } = iconConfig
  if (!display) return null
  return (
    <>
      {type === 'system' || !imgUrl ? (
        <IconCon
          className='select-icon'
          oldFamily='lcz-system-arrow-icon'
          onClick={onClick}
          style={{ color: iconColor }}
          iconValue={iconConfig?.iconValue}
        />
      ) : (
        <img src={imgUrl} className='select-icon-image' style={{ width: imgWidth, height: imgHeight }} alt='' />
      )}
    </>
  )
}

const LczSelect = forwardRef((props: DropDownBoxProps, ref: any) => {
  const {
    xOffset = 0,
    mode = 'single',
    currentType = 'index',
    singleIndex = { value: 0 },
    singleId = { value: 1 },
    multipleIndex = { value: '0,1' },
    multipleId = { value: '1,2' },
    optionBoxConfig = {},
    textStyle = defalutTextStyle,
    downBoxConfig = {},
    optionIcon = defaultOptionIcon,
    data = [],
    onChange,
    onClick
  } = props
  // props 解构

  // 选择框
  const {
    boxBgColor = '#15181c',
    boxColor = boxColorDefault,
    boxLeftOffset = 12,
    boxTopOffset = 8,
    boxBottomOffset = 8,
    iconConfig = iconConfigDefault,
    boxBorderStyle = boxBorderDefault,
    tagConfig = tagConfigDefault,
    selectIcon = defaultSelectIcon,
    clearIcon = defaultClearIcon
  } = optionBoxConfig

  // 下拉框
  const {
    pushUp = false,
    downBoxHeight = 106,
    downBoxBgColor = '#15181c',
    searchConfig = searchConfigDefault,
    optionLine = optionLineDefault
  } = downBoxConfig

  const {
    checkType,
    itemLineHeight = 20,
    itemRowSpacing,
    downBoxLeftOffset,
    plainStyle = defaulePlainStyle,
    hoverStyle = defauleHoverStyle,
    activeStyle = defauleActiveStyle
  } = optionLine
  const iconSeries = optionIcon.iconSeries || []

  const optionBorderDis = configDisplayCompatible(boxBorderStyle, 'bordered'),
    searchDis = configDisplayCompatible(searchConfig, 'searchStatus'),
    searchBorderDis = configDisplayCompatible(searchConfig.borderStyle, 'bordered')

  const [isOpen, setOpen] = useState(false)
  const [selectValue, setSelectValue] = useState<any[]>([])
  const [device, setDevice] = useState<string>('pc')
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectH, setSelectH] = useState(0)
  const selectId = useRef<string>(randomChar('lcz-dropdownbox-wrapper'))
  const iconType = useRef<string[]>([])

  const dataRef = useRef<{ data: OptionType[]; id: any[]; mode: 'single' | 'multiple'; timer: any }>({
    mode: 'single',
    data: [],
    id: [],
    timer: null
  })

  const isPushUp = device === 'pc' ? isOpen : pushUp ? false : isOpen

  const activeCheckColor = usemMemo(() => {
    switch (checkType) {
      case 'check':
        return activeStyle.aCheckColor
      case 'tick':
        return activeStyle.aTickColor

      default:
        return activeStyle.aCheckColor
    }
  }, [checkType, activeStyle])

  useEffect(() => {
    resMobile(setDevice)
  }, [])

  useEffect(() => {
    const dom = document.querySelector(`#${selectId.current} .select .ant-select-selector`) as HTMLElement
    const h = dom?.clientHeight + (optionBorderDis ? boxBorderStyle.boxBorderW || 1 : 0) * 2
    h !== selectH && setSelectH(dom?.clientHeight + (optionBorderDis ? boxBorderStyle.boxBorderW || 1 : 0) * 2)
  }, [textStyle.fontSize, boxBorderStyle.boxBorderW, isOpen, selectValue, selectH])

  const optionsMemo = usemMemo(() => {
    let optionAr: any = []

    if (data && data.length > 0) {
      optionAr = conversionData(data, { id: 'string', content: 'string', type: 'string' })
    } else {
      optionAr = []
    }
    dataRef.current.data = [...optionAr]
    return optionAr
  }, [data, pushUp, device])

  useEffect(() => {
    if (mode !== 'single') {
      const checkId = multipleselec(optionsMemo, currentType, multipleIndex, multipleId)
      dataRef.current.id = [...checkId]
      dataRef.current.mode = mode
      setSelectValue(checkId)
    } else {
      const checkId = checkOption(optionsMemo, currentType, singleIndex, singleId)
      dataRef.current.id = checkId ? [checkId] : []
      dataRef.current.mode = mode
      setSelectValue([...dataRef.current.id])
    }
  }, [
    optionsMemo,
    mode,
    currentType,
    JSON.stringify(singleIndex),
    JSON.stringify(singleId),
    JSON.stringify(multipleIndex),
    JSON.stringify(multipleId)
  ])

  // 组件加载时处理切换事件
  useEffect(() => {
    if (dataRef.current.data.length) {
      dataRef.current.timer = setTimeout(() => {
        const { id = [], data, mode } = dataRef.current
        const findArr = data.filter(v => id.includes(v.id))
        if (findArr.length) {
          switch (mode) {
            case 'single':
              onChange && onChange(findArr[0])
              break
            case 'multiple':
              onChange && onChange(findArr)
              break
          }
        }
      }, 100)
    }
    return () => {
      dataRef.current.timer && clearTimeout(dataRef.current.timer)
    }
  }, [JSON.stringify(dataRef.current.id)])

  const selectOptionHeight = useMemo(() => {
    const { height: selectH = 0, topBottomMargin = 0, borderStyle } = searchConfig
    const { boxBorderW = 0 } = borderStyle
    if (searchDis) {
      const _h = downBoxHeight - selectH - topBottomMargin * 2 - (searchBorderDis ? boxBorderW * 2 : 0)
      return _h > 0 ? _h : 0.0001
    }
    return downBoxHeight
  }, [downBoxHeight, searchConfig, itemLineHeight, device, mode, searchValue])

  const radioValue = useCallback(
    id => {
      const arr = [...selectValue]

      return arr.filter(v => v == id).length > 0
    },
    [JSON.stringify(selectValue), mode]
  )

  const RadioChange = (_, id) => {
    if (mode === 'single') {
      return setSelectValue([id])
    }

    return selectValue.includes(id)
      ? setSelectValue(selectValue.filter(v => v !== id))
      : setSelectValue([...selectValue, id])
  }

  const handlerClick = da => {
    const params = optionsMemo.find(v => v.id == da.id)
    params && onClick && onClick(params)
    if (mode === 'single') {
      setSelectValue([da.id])
      !selectValue.includes(da.id) && params && onChange && onChange(params)
      setOpen(false)
    }
  }

  const OptionsArray = usemMemo(() => {
    let optionAr: any = []
    iconType.current = []
    optionAr = optionsMemo.map((op, opIndex) => {
      const icon = findOptionIcon(iconSeries, op?.type)
      return (
        <Option value={op.id} label={op.content} key={opIndex}>
          <div className='lcz-option-item' title={op.content} onClick={() => handlerClick(op)}>
            {checkType === 'check' && mode === 'multiple' && (
              <Checkbox className='check-box' checked={radioValue(op.id)} onChange={e => RadioChange(e, op.id)} />
            )}
            <Icon _id={selectId.current} iconTypes={iconType} iconConfig={icon} optionIcon={optionIcon} />
            <div className='options-item-value'>{op.content}</div>
          </div>
        </Option>
      )
    })
    return optionAr
  }, [optionsMemo, selectValue, searchValue])

  const tagRender = (props: any) => {
    const { label, value, onClose } = props
    const { type } = optionsMemo.find(v => v.id == value) || {}
    const iconConfig = iconSeries.find(i => type && i.type == type)
    // const
    switch (mode) {
      case 'single': {
        return (
          <div className='lcz-select-option-box'>
            {iconConfig && selectIcon.display && <OptionIcon selectIcon={selectIcon} iconConfig={iconConfig} />}
            <span className='lcz-select-option-label'>{label}</span>
          </div>
        )
      }
      case 'multiple': {
        const onPreventMouseDown = event => {
          event.preventDefault()
          event.stopPropagation()
        }
        return (
          <div className='ant-select-selection-item' onMouseDown={onPreventMouseDown}>
            <span className='ant-select-selection-item-content'>
              {iconConfig && selectIcon.display && <OptionIcon selectIcon={selectIcon} iconConfig={iconConfig} />}
              {label}
            </span>
            <span className='ant-select-selection-item-remove' aria-hidden='true' style={{ userSelect: 'none' }}>
              <CloseOutlined onClick={onClose} />
            </span>
          </div>
        )
      }
    }
    return <></>
  }

  const selectHandler = async (type: 'focus' | 'blur' | 'clear' | 'visible' | 'change', value?: any) => {
    switch (type) {
      case 'focus':
      case 'blur': {
        setSearchValue('')
        break
      }
      case 'visible': {
        setOpen(value || false)
        break
      }
      case 'clear': {
        setSelectValue([])
        setSearchValue('')
        setOpen(false)
        break
      }
      case 'change': {
        await showSearchText(selectId.current, mode, value.length === 0 && !!searchValue, setSearchValue, searchDis)
        let params: any = null
        if (mode === 'multiple') {
          setSelectValue(value)
          params = optionsMemo.filter(v => value.includes(v.id))
          onChange && onChange(params)
        }
        break
      }

      default:
        break
    }
  }

  return (
    <DropDownBoxWrapper
      contentOffset={{ left: boxLeftOffset, top: boxTopOffset, bottom: boxBottomOffset }}
      optionBoxConfig={optionBoxConfig}
      tagConfig={tagConfig}
      itemLineHeight={itemLineHeight}
      textStyle={textStyle}
      itemRowSpacing={itemRowSpacing}
      downBoxLeftOffset={downBoxLeftOffset}
      plainStyle={plainStyle}
      hoverStyle={hoverStyle}
      activeStyle={activeStyle}
      checkType={checkType}
      mode={mode}
      selectH={selectH}
      downBoxConfig={downBoxConfig}
      className='DropDownBoxWrapper'
      selectOptionHeight={selectOptionHeight}
      activeCheckColor={activeCheckColor}
      device={device}
      xOffset={xOffset}>
      <LczComCon id={selectId.current}>
        <Select
          open={isPushUp}
          notFoundContent={<></>}
          searchValue={searchValue}
          allowClear={clearIcon.display}
          optionLabelProp='label'
          className='select'
          placeholder='请选择'
          bordered={optionBorderDis}
          showSearch
          showArrow
          mode='multiple'
          defaultActiveFirstOption={false}
          virtual={false}
          style={{
            ...textStyle,
            color: boxColor.color,
            background: boxBgColor
          }}
          listHeight={selectOptionHeight}
          value={selectValue}
          optionFilterProp='label'
          dropdownClassName={`dropdownClassName  ${!downBoxConfig.horcroll?.display ? 'hide-scroll' : ''}`}
          getPopupContainer={() => document.getElementById(selectId.current) as HTMLElement}
          suffixIcon={<SelectIcon onClick={() => setOpen(!isOpen)} iconConfig={iconConfig} />}
          onChange={selectHandler.bind(null, 'change')}
          onFocus={selectHandler.bind(null, 'focus')}
          onBlur={selectHandler.bind(null, 'blur')}
          onDropdownVisibleChange={selectHandler.bind(null, 'visible')}
          onClear={selectHandler.bind(null, 'clear')}
          dropdownStyle={{ background: downBoxBgColor, ...textStyle }}
          ref={ref}
          dropdownRender={menu => {
            return searchDis ? (
              <div className='drop-down-render' style={{ ...textStyle, color: searchConfig.textColor }}>
                <SearchInput
                  onChange={setSearchValue}
                  isOpen={isOpen}
                  randomId={selectId.current}
                  selectValue={selectValue}
                  setSearchValue={setSearchValue}
                  mode={mode}
                  data={optionsMemo}
                />
                {menu}
              </div>
            ) : (
              menu
            )
          }}
          tagRender={tagRender}>
          {OptionsArray}
        </Select>
        {device !== 'pc' && pushUp && (
          <PushUp
            isOpen={isOpen}
            setOpen={setOpen}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
            onChange={onChange}
            onClick={onClick}
            optionsMemo={optionsMemo}
            {...props}
          />
        )}
      </LczComCon>
    </DropDownBoxWrapper>
  )
})
LczSelect.displayName = 'LczSelect'

export default memo(LczSelect)
