import React, { memo, useState, useRef, useEffect } from 'react'
import LczComCon from '../common/LczComCon'
import { IframeProps } from './type'

export default memo(function LczIframe(props: IframeProps = {}) {
  const { id = '', close = true, scale = 1, data = [], scroll = true, customPage = [], onLoadEnd } = props

  // hook

  const [display, setDisplay] = useState<boolean>(true)
  const [iframeUrl, setIframeUrl] = useState<string>('')

  const ComconRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    ;(async () => {
      let _url = ''
      if (data?.[0]?.url) {
        _url = data[0].url
      } else if (customPage?.length) {
        const findIndex = customPage.findIndex(item => !!item.condition)
        const findNullIndex = customPage.findIndex(item => item.condition === '')

        const _findIndex = findIndex >= 0 ? findIndex : findNullIndex

        if (_findIndex >= 0) {
          const item = customPage[_findIndex]
          if (item.contain.link) {
            try {
              // @ts-ignore
              _url = await window.handleFileLinkUrl(item.contain.link, id)
            } catch (error) {
              console.warn(error)
            }
          }
        }
      }
      setIframeUrl(_url)
    })()
  }, [data, JSON.stringify(customPage)])

  return (
    <LczComCon ref={ComconRef} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {display && iframeUrl && (
        <div className='lcz-iframe-container'>
          {close && (
            <span className='close' title='点击隐藏页面' onClick={() => setDisplay(false)}>
              X
            </span>
          )}

          <iframe
            key={iframeUrl}
            src={iframeUrl}
            onLoad={() => {
              onLoadEnd && onLoadEnd({ url: iframeUrl })
            }}
            ref={iframeRef}
            frameBorder='0'
            scrolling={scroll ? 'yes' : 'no'}
            style={{ transformOrigin: 'left top', transform: `scale(${scale})`, border: 'none' }}></iframe>
        </div>
      )}
    </LczComCon>
  )
})
