import React from 'react'
import { LczRadio } from '../index'
import { RadioProps } from '../LczRadio/type'

export const T_Radio = () => {
  const config: RadioProps = {
    type: 'index',
    index: { value: 0 },
    defaultId: { value: '12' },
    globalStyle: {
      arrangement: 'level', // level 横向 vertical 垂直
      itemSpacing: 10,
      radioStyle: { radioDisplay: true, radioSize: 16, textSpacing: 3 },
      globalTextStyle: { fontFamily: 'Microsoft YaHei', letterSpacing: 10 }
    },
    ordStyle: {
      ordTextStyle: { fontSize: 14, color: '#d33131', fontWeight: 400 },
      ordCheckBox: { checkBorderColor: 'red' },
      ordHoverStyle: {
        display: true,
        ordHoverTextStyle: {
          display: true,
          fontSize: 16,
          color: 'green',
          fontWeight: 900
        },
        ordHoverCheck: { display: true, checkBorderColor: 'yellow' }
      }
    },
    selectStyle: {
      selectTextStyle: {
        display: true,
        fontSize: 14,
        color: 'skyblue',
        fontWeight: 400
      },
      selectCheckBox: { display: true, checkBorderColor: 'pink' },
      selectHoverStyle: {
        display: true,
        selectHoverTextStyle: { display: true, fontSize: 14, color: 'red', fontWeight: 900 },
        selectHoverCheck: { display: true, checkBorderColor: 'yellow' }
      }
    }
  }

  const data = [
    { id: 12, content: 'data 单元一' },
    { id: 322, content: 'data 单元二' },
    { id: 433, content: 'data 单元三' },
    { id: 412, content: 'data 单元四' }
  ]

  const onClick = data => {
    console.log(data)
  }

  const onChange = (item, value, e) => {
    console.log(item, value, e)
  }

  return (
    <div style={{ width: 200, height: 100, margin: '100px auto' }}>
      <LczRadio {...config} data={data} onChange={onChange} onClick={onClick} />
    </div>
  )
}
