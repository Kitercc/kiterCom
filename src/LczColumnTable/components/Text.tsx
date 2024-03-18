import React, { CSSProperties, memo } from 'react'
import { TextConfig } from '../type'

const Text = memo(
  ({ config, val, style, suffix }: { config: TextConfig; val: string; style: CSSProperties; suffix: JSX.Element }) => {
    const _style: CSSProperties = { ...config.fontStyle, ...style }

    return (
      <div style={_style}>
        {val}
        {suffix}
      </div>
    )
  }
)

Text.displayName = 'Text'
export default Text
