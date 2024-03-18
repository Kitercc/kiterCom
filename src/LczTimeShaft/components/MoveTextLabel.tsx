import React, { CSSProperties, forwardRef, memo, useImperativeHandle, useMemo, useState } from 'react'

import { getDomSzie, getMoveTextStyle } from '../common'
import { TimeShaftDataMap } from '../type'

const MoveTextLabel = forwardRef((props: any, ref: any) => {
  const { mode, shaftMoveLabel, progressSize } = props,
    { textStyle } = shaftMoveLabel
  const [moveTextData, setMoveTextData] = useState<TimeShaftDataMap | null>(null)

  useImperativeHandle(ref, () => ({
    moveTextData,
    setMoveTextData
  }))

  const styleMemo = useMemo(() => {
    if (moveTextData) {
      const { containerHeight, containerWidth } = getDomSzie(textStyle, moveTextData.text)
      const moveStyle = getMoveTextStyle(mode, progressSize, containerHeight, containerWidth, shaftMoveLabel)
      const cssStyle: CSSProperties = {
        ...textStyle,
        ...moveStyle
      }

      return cssStyle
    } else {
      return {}
    }
  }, [JSON.stringify(shaftMoveLabel), moveTextData])

  return (
    <>
      {moveTextData && (
        <div className='shaft-move-text' style={styleMemo}>
          <span>{moveTextData.text}</span>
        </div>
      )}
    </>
  )
})
MoveTextLabel.displayName = 'moveTextLabel'
export default memo(MoveTextLabel)
