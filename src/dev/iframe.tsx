import React from 'react'
import { LczIframe } from '../index'

export const T_LczIframe = () => {
  const config = {
    close: true,
    scale: 1,
    scroll: true,
    customPage: [
      {
        condition: 'true',
        contain: {
          link: '',
          url: ''
        }
      },
      {
        condition: 'true',
        contain: {
          link: '',
          url: ''
        }
      }
    ]
  }

  const data = [
    {
      url: 'https://juejin.cn/post/7020946654303879205?utm_source=gold_browser_extension'
    }
  ]

  return (
    <div style={{ width: 500, height: 600 }} className='lcz-com-wrap hided'>
      <LczIframe {...config} data={data} onLoadEnd={a => console.log(a)} />
    </div>
  )
}
