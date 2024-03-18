import React, { memo, useMemo, useRef, useState, useEffect } from 'react'
import { Drawer } from 'antd'
import { LczFilterPanel } from '../../index'
import { DropDownBoxProps, OptionType } from '../type'
import { PushUpwrapper } from '../style'
import { randomChar } from '../../common/util'
import { FilterPanelProps } from '../../LczFilterPanel/type'
import { defaultOptionIcon } from '../common/defaultValue'

interface PushupProps extends DropDownBoxProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  selectValue: any[]
  optionsMemo: OptionType[]
  setSelectValue: (val: any[]) => void
}

export default memo(function PushUp(props: PushupProps) {
  const { isOpen, setOpen, selectValue, optionsMemo, setSelectValue, onChange, onClick, ...otherProps } = props
  const { mode, downBoxConfig = {}, optionIcon = defaultOptionIcon } = otherProps
  const { downBoxBorderStyle, searchConfig, optionLine } = downBoxConfig

  const [multipleVal, setMultipleVal] = useState<any[]>(selectValue)
  const drewerclass = useRef(randomChar('lcz-com-pushop-'))

  useEffect(() => {
    setMultipleVal(selectValue)
  }, [JSON.stringify(selectValue)])

  function onClose() {
    setOpen(false)
    setMultipleVal(selectValue.map(v => String(v)))
  }

  const screenWidth = window.innerWidth

  function filterChange(data: any, ids: any[]) {
    if (mode === 'single') {
      setOpen(false)
      setSelectValue(ids)
      onChange && onChange(data)
    } else {
      setMultipleVal(ids)
    }
  }

  function onOk() {
    const selectData = optionsMemo.filter(item => multipleVal.includes(item.id))
    setSelectValue(multipleVal)
    onChange && onChange(selectData)
    onClose()
  }

  const filterProps = useMemo(() => {
    const _props: FilterPanelProps = {}
    // @ts-ignore
    _props.data = optionsMemo

    _props.w = screenWidth
    _props.h = downBoxConfig?.downBoxHeight

    _props.mode = props.mode

    _props.type = 'id'
    _props.singleId = { value: selectValue[0] }
    _props.multipleId = { value: multipleVal.join(',') }

    _props.autoHide = false
    _props.outHide = false
    _props.bgConfig = {
      boxBgColor: 'rgba(0,0,0,0)',
      boxBorderW: 0,
      boxBorderC: '',
      boxImage: '',
      boxRadius: 0
    }

    _props.arrowConfig = {
      display: false,
      position: 'left',
      offset: 0,
      size: 0
    }

    _props.textStyle = props.textStyle

    // @ts-ignore
    _props.searchConfig = { ...searchConfig, ...searchConfig.borderStyle, radius: searchConfig.borderStyle.boxRadius }
    // @ts-ignore
    _props.optionLine = {
      ...optionLine,
      plainStyle: { ...optionLine?.plainStyle, fontSize: props.textStyle?.fontSize || 12 },
      hoverStyle: { hoverType: false }
    }

    _props.optionIcon = { ...optionIcon }

    _props.onChange = filterChange
    _props.onClick = onClick

    return _props
  }, [JSON.stringify(otherProps), JSON.stringify(selectValue), JSON.stringify(multipleVal)])

  return (
    <>
      <Drawer
        className={drewerclass.current}
        height={Number(downBoxConfig?.downBoxHeight || '0') + 49}
        placement={'bottom'}
        closable={false}
        onClose={onClose}
        visible={isOpen}>
        <div className='pushShop-operation' style={{ width: screenWidth, height: 49 }}>
          <span onClick={onClose}>取消</span>
          {mode === 'multiple' && <span onClick={onOk}>确定</span>}
        </div>
        <LczFilterPanel loadEvent={false} key={String(isOpen)} {...filterProps} />
      </Drawer>
      <PushUpwrapper
        downBoxConfig={downBoxConfig}
        downBoxBorderStyle={downBoxBorderStyle}
        drewerclass={drewerclass.current}
        optionLine={optionLine}
      />
    </>
  )
})
