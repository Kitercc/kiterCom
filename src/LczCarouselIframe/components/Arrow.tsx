import React, { memo, useMemo } from 'react'
import { getColorObj } from '../../common/util'
import { ArrowWrapper } from '../style'

interface ArrowProps {
  direction: string
  size?: number
  imgWidth?: number
  imgHeight?: number
  resources: string // system 系统 custom 自定义
  type?: string
  imgUrl?: string
  colorObj: any
  onClick?: () => void
}

const position = {
  left: 'scaleX(1)',
  right: 'scaleX(-1)',
  top: 'scaleY(1)',
  bottom: 'scaleY(-1)'
}

export default memo(function Arrow(props: ArrowProps) {
  const { direction, onClick, size = 40, imgWidth = 40, imgHeight = 40, resources, type, imgUrl, colorObj } = props

  // hooks

  const systemColorMemo = useMemo(() => {
    const { color, colorType } = getColorObj(colorObj)
    if (colorType === 'single') {
      return { color, colorType }
    } else {
      return { background: `linear-gradient( ${color} )`, colorType }
    }
  }, [colorObj])

  const content = useMemo(() => {
    switch (resources) {
      case 'system':
        return (
          <span
            className={['iconfont', `lcz-com-icon-${type}`, systemColorMemo.colorType].join(' ')}
            style={systemColorMemo}
          />
        )
      case 'custom':
        return imgUrl && <img src={imgUrl} />
      default:
        return (
          <span
            className={['iconfont', `lcz-com-icon-${type}`, systemColorMemo.colorType].join(' ')}
            style={systemColorMemo}
          />
        )
    }
  }, [resources, type, imgUrl, JSON.stringify(systemColorMemo)])

  return (
    <ArrowWrapper
      size={size}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      style={{
        transform: `${position[direction]} `
      }}
      onClick={e => {
        e.stopPropagation()
        onClick && onClick()
      }}>
      {content}
    </ArrowWrapper>
  )
})
