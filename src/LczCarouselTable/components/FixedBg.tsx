import React, { memo } from 'react'
import { GlobalConfig } from '../type'

interface FixedBgProps {
  globalConfig: GlobalConfig
  topLine: number
  columnHeight: number
  getColmunStyle: any
  lineSpeed: number
}
export default memo(function FixedBg(props: FixedBgProps) {
  const { globalConfig, topLine, columnHeight, getColmunStyle, lineSpeed } = props

  const num = (() => {
    return globalConfig.rowsNumber > topLine ? globalConfig.rowsNumber - topLine : globalConfig.rowsNumber
  })()

  return (
    <div className='fixed-bg'>
      {new Array(num).fill(null).map((v, i) => {
        return (
          <div
            key={i}
            style={{
              height: columnHeight,
              ...getColmunStyle(i + topLine),
              marginBottom: `${lineSpeed}px`,
              transform: 'translateX(0)'
            }}
          />
        )
      })}
    </div>
  )
})
