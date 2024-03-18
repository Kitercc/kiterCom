import React from 'react'
import { LczQrCode } from '../index'

export const T_QrCode = () => {
  const config = {
    url: 'http://www.lechuangzhe.com',
    radius: 10,
    correctLevel: 'Q',
    fillStyle: { foreground: 'rgba(255, 0, 0,1)', background: '#ffffff' },
    borderStyle: { display: true, Bstyle: 'outset', Bcolor: '#c21f1f', Bwidth: 10 },
    logoConfig: {
      display: true,
      logoUrl: 'https://pic2.zhimg.com/50/v2-2038cd0997d58ff893d433761b90c102_hd.webp',
      logoWidth: 50,
      logoHeight: 50,
      logoRadius: 8,
      logoBgColor: '#ffffff',
      logoBorderStyle: { display: true, Bstyle: 'groove', Bcolor: '#21e683', Bwidth: 4, BRadius: 4 }
    }
  }

  const data = [{ url: 'qwqw' }]

  return (
    <div style={{ width: 300, height: 300 }}>
      <LczQrCode {...config} w={300} h={300} data={data} />
    </div>
  )
}
