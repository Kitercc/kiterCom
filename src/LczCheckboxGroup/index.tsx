import React, { memo, ReactElement, useEffect, useMemo, useState } from 'react'
import { Checkbox } from 'antd'
import { CheckboxWrapper } from './style'
import { CheckboxProps } from './type'
import { defaultGlobalConfig, defaultNormalStyle, defaultFocus } from './common/defaultValue'
import { conversionData, getComStyle, multipleselec } from '../common/util'

const LineFeed = memo(
  ({
    mode,
    className,
    rowAdapt,
    children
  }: {
    mode: 'row' | 'column'
    rowAdapt: boolean
    className: string
    children: ReactElement
  }) => {
    return mode === 'column' ? (
      <div className={className}>{children}</div>
    ) : mode === 'row' && !rowAdapt ? (
      <div className={className}>{children}</div>
    ) : (
      <React.Fragment>{children}</React.Fragment>
    )
  }
)

LineFeed.displayName = 'LineFeed'

export default memo(function LczCheckboxGroup(props: CheckboxProps) {
  const {
    type = 'index',
    index = { value: '' },
    defaultId = { value: '' },
    globalConfig = defaultGlobalConfig,
    normalStyle = defaultNormalStyle,
    focusStyle = defaultFocus,
    data = [],
    onClick,
    onChange
  } = props

  const { mode = 'row', rownum = 3, rowAdapt = false, colnum = 3 } = globalConfig

  const [value, setValue] = useState<number[] | string[]>([])

  const _conversionData = useMemo(() => {
    return conversionData(data, {
      content: 'string',
      id: 'string'
    })
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (_conversionData.length > 0) {
      const checkId = multipleselec(_conversionData, type, index, defaultId)
      setValue([...checkId])

      if (checkId.length) {
        const params = _conversionData.filter(v => checkId.includes(String(v.id)))
        onChange && onChange(params)
      }
    } else {
      setValue([])
    }
  }, [type, JSON.stringify(_conversionData), JSON.stringify(index), JSON.stringify(defaultId)])

  function handlerChange(checkedValues) {
    setValue([...checkedValues])

    const params = _conversionData.filter(v => checkedValues.includes(v.id))
    onChange && onChange(params)
  }
  function handlerClick(param) {
    onClick && onClick(param)
  }

  const num = mode === 'row' ? rownum : colnum

  return (
    <CheckboxWrapper
      globalConfig={globalConfig}
      normalStyle={normalStyle}
      focusStyle={focusStyle}
      className='lcz-checkbox-group-wrapper'>
      <Checkbox.Group onChange={handlerChange} value={value}>
        {_conversionData.length > 0 &&
          new Array(Math.ceil(_conversionData.length / num)).fill(null).map((_, i) => {
            return (
              <LineFeed key={i} mode={mode} rowAdapt={rowAdapt} className='lcz-checkbox-row-wrapper'>
                <>
                  {_conversionData.slice(i * num, i * num + num).map((d, j) => {
                    return (
                      <div key={j} className='lcz-checkbox-item'>
                        <Checkbox
                          style={{
                            fontFamily: getComStyle(globalConfig, 'textStyle.fontFamily'),
                            letterSpacing: getComStyle(globalConfig, 'textStyle.letterSpacing')
                          }}
                          value={String(d.id)}
                          onClick={() => handlerClick(d)}>
                          {String(d.content)}
                        </Checkbox>
                      </div>
                    )
                  })}
                </>
              </LineFeed>
            )
          })}
      </Checkbox.Group>
    </CheckboxWrapper>
  )
})
