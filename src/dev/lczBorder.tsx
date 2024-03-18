import React from 'react'
import { LczBorder } from '../index'

export const T_LczBorder = () => {
  const config1 = {
    borderColor1: '#73ff00',
    hornColor1: '#4AA3DD'
  }
  const config2 = {
    w: 300,
    h: 150,
    borderColor2: '#0A5A8B',
    hornColor2: '#4AA3DD',
    borderRadiu2: 6
  }
  const config3 = {
    borderColor3: '#1189ef',
    iconColor3: '#44caff',
    lineColor3: '#0a3d7f',
    borderRadiu3: 8,
    bgColor3: 'rgba(8, 25, 92,1)'
  }
  const config4 = {
    topBgColor4: '#ff008c',
    bottomBgColor4: '#1b6dc5'
  }
  const config5 = {
    topBgColor5: 'yellow',
    hornColor5: 'red',
    borderColor5: 'green',
    bgColor5: '#1b6dc5'
  }

  const props = { ...config1, ...config2, ...config3, ...config4, ...config5 }

  return (
    <div style={{ width: 568, height: 267 }}>
      <LczBorder borderType='lcz-border-rectangle' {...props} />
      <LczBorder borderType='lcz-border-radiu' {...props} />
      <LczBorder borderType='lcz-border-radiu-right-icon' {...props} />
      <LczBorder borderType='lcz-border-top-gradient' {...props} />
      <LczBorder borderType='lcz-border-columns' {...props} />
    </div>
  )
}
