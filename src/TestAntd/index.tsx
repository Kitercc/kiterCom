import React, { useState, useEffect, useRef } from 'react'

import { randomChar } from '../common/util'

import './index.less'
const content = [
  { id: 1, value: '菜单一' },
  { id: 2, value: '菜单二' },
  { id: 3, value: '菜单三' },
  { id: 4, value: '菜单四' }
]

const TestAntd = () => {
  const [flag, setFalg] = useState(true)
  const [activeArr, setArr] = useState<any[]>([])

  const id = useRef(randomChar())

  useEffect(() => {
    window.addEventListener('click', _globalHandlerClick)

    return () => {
      window.removeEventListener('click', _globalHandlerClick)
    }
  }, [])

  const _globalHandlerClick = e => {
    const _id = e.target.id
    const _class = Array.from(e.target.classList)
    if (id.current !== _id && !_class.includes('lcz-drop-dowm-item') && flag) {
      setFalg(false)
    }
  }

  const downItemHandlerClick = item => {
    // console.log(item.id)
    if (activeArr.includes(item.id)) {
      const newArr = activeArr.filter(v => v !== item.id)
      setArr(newArr)
    } else {
      setArr([...activeArr, item.id])
    }
  }

  return (
    <>
      <button
        onClick={e => {
          e.stopPropagation()
          setFalg(!flag)
        }}>
        CHANGE
      </button>
      <div id={id.current} className={['panel-wrapper', flag ? 'show' : 'hide'].join(' ')}>
        {content.map((v, i) => {
          return (
            <div
              onClick={() => {
                downItemHandlerClick(v)
              }}
              className={['lcz-drop-dowm-item', activeArr.includes(v.id) ? 'active' : ''].join(' ')}
              key={i}>
              {v.value}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TestAntd
