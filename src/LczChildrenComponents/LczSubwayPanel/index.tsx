import React, { memo, useEffect, useState } from 'react'
import { defaultPromptPanel } from '../../LczSubwayLine/common/defaultValue'
import { outPanel } from '../../LczSubwayLine/type/child'

interface InfoWindowProps {
  promptPanel: outPanel
}

export default memo(function LczSubwayPanel({ promptPanel = defaultPromptPanel }: InfoWindowProps) {
  const { width, height, contain, data } = promptPanel
  const [iframeUrl, setIframeUrl] = useState('')

  function getUrl() {
    if (data?.[0]?.url) return String(data?.[0]?.url)
    if (!contain.link) return undefined
    try {
      // @ts-ignore
      return window.handleFileLinkUrl(contain.link, promptPanel.id)
    } catch (error) {
      return undefined
    }
  }

  useEffect(() => {
    ;(async () => {
      const url = await getUrl()
      setIframeUrl(url)
    })()
  }, [JSON.stringify(contain), JSON.stringify(data)])

  return <>{iframeUrl && <iframe key={iframeUrl} src={iframeUrl} style={{ width, height, border: 'none' }} />}</>
})
