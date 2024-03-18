import React, { memo, useRef, useEffect } from 'react'
import mAMap from '../../LczAMap/common/AMap'
import { OutTextLabel } from '../../LczAMap/type/child'
import TextLabel from './common/TextLabel'

interface TextLabelProps {
  textLabel: OutTextLabel
  mAmap: mAMap
  onChildComEvent?: (id: string, type: string, parpm: any) => void
}

export default memo(function LczAMapTextLabel(props: TextLabelProps) {
  const { textLabel, mAmap } = props

  const textLabelInstance = useRef<TextLabel | null>(null)

  useEffect(() => {
    if (mAmap.map) {
      textLabelInstance.current = new TextLabel({
        mAmap
      })
    }
    return () => {
      textLabelInstance.current?.destroy()
      textLabelInstance.current = null
    }
  }, [mAmap])

  useEffect(() => {
    if (textLabelInstance.current) {
      textLabelInstance.current.drawLabels(textLabel)
    }
  }, [mAmap, textLabelInstance.current, JSON.stringify(textLabel)])

  return <></>
})
