import React, { memo, useMemo, useRef, useEffect } from 'react'
import QrCode from 'qrcode'
import LczComCon from '../common/LczComCon'

import { QrCodeProps } from './type'
import { defaultBorderStyle, defaultFillStyle, defaultLogoConfig, defaultLogoBorderStyle } from './commomn/defaultValue'
import { colorHex } from '../common/util'
import { message } from 'antd'

export default memo(function LczQrCode(props: QrCodeProps) {
  const {
    w = 200,
    h = 200,
    url = '',
    radius = 0,
    correctLevel = 'M',
    fillStyle = defaultFillStyle,
    borderStyle = defaultBorderStyle,
    logoConfig = defaultLogoConfig,
    data = []
  } = props

  const { foreground = '#000', background = '#fff' } = fillStyle
  const { display: Bdis = false, Bstyle = 'solid', Bcolor = '#fff', Bwidth = 1 } = borderStyle
  const {
    display: logoDis = false,
    logoUrl = '',
    logoWidth = 50,
    logoHeight = 50,
    logoRadius = 8,
    logoBgColor = '#fff',
    logoBorderStyle = defaultLogoBorderStyle
  } = logoConfig

  // hooks
  const QrCodeRef = useRef<HTMLDivElement>(null)

  const QrUrl = useMemo(() => {
    if (data && data.length > 0 && data[0].url) {
      return String(data[0].url)
    }
    return url
  }, [JSON.stringify(data), url])

  const qrcodeStyle = useMemo(() => {
    const _style: any = {}
    if (Bdis) {
      _style.border = `${Bwidth}px ${Bstyle} ${Bcolor}`
    }
    _style.borderRadius = radius
    return _style
  }, [JSON.stringify(borderStyle), radius])

  const logoStyle = useMemo(() => {
    const { display: Bdis = false, Bstyle = 'solid', Bcolor = '#fff', Bwidth = 4, BRadius = 4 } = logoBorderStyle
    const logoBoxStyle: any = {}
    const logoImgStyle: any = {}
    logoBoxStyle.width = logoWidth
    logoBoxStyle.height = logoHeight
    logoBoxStyle.background = logoBgColor
    if (Bdis) {
      logoBoxStyle.border = `${Bwidth}px ${Bstyle} ${Bcolor}`
      logoBoxStyle.borderRadius = BRadius
    }
    logoImgStyle.borderRadius = logoRadius

    return {
      logoBoxStyle,
      logoImgStyle
    }
  }, [JSON.stringify(logoConfig)])

  useEffect(() => {
    if (QrCodeRef.current) {
      QrCodeRef.current.innerHTML = ''
    }
    const diffW = Bdis ? Bwidth * 2 : 0
    const op: any = {
      errorCorrectionLevel: correctLevel,
      margin: 0,
      color: {
        dark: colorHex(foreground),
        light: colorHex(background)
      }
    }

    QrCode.toCanvas(QrUrl, op, function (err, canvas) {
      if (!err) {
        canvas.style.width = w - diffW + 'px'
        canvas.style.height = h - diffW + 'px'
        QrCodeRef.current && QrCodeRef.current.appendChild(canvas)
      } else {
        message.error('二维码绘制失败,请检查!!!')
      }
    })
  }, [w, h, QrUrl, foreground, background, correctLevel, Bdis, Bwidth])
  return (
    <LczComCon>
      <div className='lcz-qrcode-wrapper'>
        <div ref={QrCodeRef} className='qr-code' style={qrcodeStyle} />
        {logoDis && logoUrl && (
          <div className='qr-logo' style={logoStyle.logoBoxStyle}>
            <img src={logoUrl} alt='' style={logoStyle.logoImgStyle} />
          </div>
        )}
      </div>
    </LczComCon>
  )
})
