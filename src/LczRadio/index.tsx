import React, { memo, useMemo, useState, useEffect, useRef } from 'react'
import { Radio } from 'antd'
import LczComCon from '../common/LczComCon'
import { RadioWrapper } from './style'

import { CheckBox, RadioProps, RadioStyle, TextStyle } from './type'
import { GlobalStyle } from '../LczDatePicker/type'
import { checkOption, conversionData } from '../common/util'

const RadioGroup = (props: RadioProps = {}) => {
  const defaultRadioStyle: RadioStyle = { display: true, radioSize: 16, textSpacing: 4 }
  const defaultGlobalStyle: GlobalStyle = { fontFamily: 'Microsoft YaHei', letterSpacing: 0 }

  const defaultOrdTextStyle: TextStyle = { fontSize: 14, color: '#fff', fontWeight: 400 }
  const defaultOrdHoverTextStyle: TextStyle = { display: true, fontSize: 14, color: '#fff', fontWeight: 400 }
  const defaultOrdCheckBox: CheckBox = { checkBorderColor: '#677382' }
  const defaultOrdHoverCheckBox: CheckBox = { display: true, checkBorderColor: '#677382' }

  const defaultSelectTextStyle: TextStyle = { display: true, fontSize: 14, color: '#3D99FC', fontWeight: 400 }
  const defaultSelectCheckBox: CheckBox = { display: true, checkBorderColor: '#3D99FC' }
  const defaultSelectHoverTextStyle: TextStyle = { display: true, fontSize: 14, color: '#3D99FC', fontWeight: 400 }
  const defaultSelectHoverCheckBox: CheckBox = { display: true, checkBorderColor: '#3D99FC' }

  const {
    type = 'index',
    index = { value: 0 },
    defaultId = { value: '1' },
    globalStyle = {},
    ordStyle = {},
    selectStyle = {},
    data = [],
    onChange,
    onClick
  } = props

  const {
    arrangement = 'vertical',
    itemSpacing = 10,
    radioStyle = defaultRadioStyle,
    globalTextStyle = defaultGlobalStyle
  } = globalStyle

  const { ordTextStyle = defaultOrdTextStyle, ordCheckBox = defaultOrdCheckBox, ordHoverStyle = {} } = ordStyle
  const {
    display: ordHoverDis = true,
    ordHoverTextStyle = defaultOrdHoverTextStyle,
    ordHoverCheck = defaultOrdHoverCheckBox
  } = ordHoverStyle

  const {
    selectTextStyle = defaultSelectTextStyle,
    selectCheckBox = defaultSelectCheckBox,
    selectHoverStyle = {}
  } = selectStyle

  const {
    display: selectHoverDis = false,
    selectHoverTextStyle = defaultSelectHoverTextStyle,
    selectHoverCheck = defaultSelectHoverCheckBox
  } = selectHoverStyle

  const dataRef = useRef<{ data: any[]; id: any; timer: any }>({ data: [], id: '0', timer: null })

  const arrangementTypeStyle = useMemo(() => {
    let style: any = {}
    switch (arrangement) {
      case 'level':
        style.marginRight = `${itemSpacing}px`
        style.marginBottom = '10px'
        break
      case 'vertical':
        style = {
          display: 'flex',
          height: '24px',
          lineHeight: '24px',
          marginBottom: `${itemSpacing}px`
        }
        break
      default:
        style.marginRight = `${itemSpacing}px`
    }

    return style
  }, [arrangement, itemSpacing])

  const optionsMemo = useMemo(() => {
    let nowOptions: any = []
    if (data && data.length > 0) {
      nowOptions = conversionData(data, { id: 'string', content: 'string' })
    } else {
      nowOptions = []
    }
    dataRef.current.data = [...nowOptions]
    return nowOptions
  }, [JSON.stringify(data)])

  const [defId, setDefId] = useState(data[0]?.id)

  useEffect(() => {
    const checkId = checkOption(optionsMemo, type, index, defaultId)
    dataRef.current.id = checkId
    setDefId(checkId)
  }, [JSON.stringify(optionsMemo), type, JSON.stringify(index), JSON.stringify(defaultId)])

  useEffect(() => {
    if (dataRef.current.data.length) {
      dataRef.current.timer = setTimeout(() => {
        const { data, id } = dataRef.current
        const find = data.find(v => v.id === id)
        find && onChange && onChange(find)
      }, 100)
    }
    return () => {
      dataRef.current.timer && clearTimeout(dataRef.current.timer)
    }
  }, [dataRef.current.id])

  const RadioOnChange = e => {
    const item = optionsMemo.filter(v => v.id == e.target.value)[0]
    setDefId(item.id)
    onChange && onChange(item)
  }

  const clickChange = (data: any) => {
    onClick && onClick(data)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <RadioWrapper
        arrangement={arrangement}
        radioStyle={radioStyle}
        ordTextStyle={ordTextStyle}
        ordCheckBox={ordCheckBox}
        ordHoverTextStyle={ordHoverTextStyle}
        ordHoverCheck={ordHoverCheck}
        selectTextStyle={selectTextStyle}
        selectCheckBox={selectCheckBox}
        selectHoverTextStyle={selectHoverTextStyle}
        selectHoverCheck={selectHoverCheck}
        ordHoverDis={ordHoverDis}
        selectHoverDis={selectHoverDis}
        className='lcz-radio-group'>
        <Radio.Group value={defId} onChange={RadioOnChange}>
          {optionsMemo.map((v, i) => (
            <Radio
              value={v.id}
              key={i}
              style={{ ...arrangementTypeStyle, ...globalTextStyle }}
              onClick={() => clickChange(v)}>
              {v.content}
            </Radio>
          ))}
        </Radio.Group>
      </RadioWrapper>
    </LczComCon>
  )
}

RadioGroup.displayName = 'RadioGroup'

export default memo(RadioGroup)
