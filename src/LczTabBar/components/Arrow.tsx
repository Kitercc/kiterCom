import React, { memo, useMemo, useState } from 'react'
import { getColorObj } from '../../common/util'
import { ArrowWrapper } from '../style'
import { ArrowDisabledStyle } from '../type'

interface ArrowProps {
  direction: string
  size?: number
  imgWidth?: number
  imgHeight?: number
  spacing?: number
  offset?: number
  resources?: string // system 系统 custom 自定义
  type?: string
  imgUrl?: string
  colorObj?: any
  arrowHoverStyle?: any
  arrowDisabledStyle?: ArrowDisabledStyle
  onClick?: (type: string) => void
  isDisabled: boolean
}

const position = {
  left: 'scaleX(1) translateY(-50%) ',
  right: 'scaleX(-1) translateY(-50%)',
  top: 'scaleY(1) translateX(-50%)',
  bottom: 'scaleY(-1) translateX(-50%)'
}

export default memo(function Arrow(props: ArrowProps) {
  const {
    direction,
    onClick,
    spacing = 16,
    size = 40,
    imgWidth = 40,
    imgHeight = 40,
    offset = 0,
    resources,
    type,
    imgUrl,
    colorObj,
    arrowHoverStyle = {
      display: false,
      arrowHoverColor: '',
      arrowHoverImg: ''
    },
    arrowDisabledStyle = {
      display: false,
      opacity: 100,
      styleSync: false,
      arrowDisabledColor: '',
      arrowDisabledImg: ''
    },
    isDisabled
  } = props

  // hooks
  const [hoved, setHoved] = useState<boolean>(false)

  const systemColorMemo = colorObj => {
    const { color, colorType } = getColorObj(colorObj)
    if (colorType === 'single') {
      return { color, colorType }
    } else {
      return { background: `linear-gradient( ${color} )`, colorType }
    }
  }

  const systemPostionMemo = useMemo(() => {
    if (direction == 'left') {
      switch (resources) {
        case 'system':
          return { left: `${-size - spacing}px`, top: `calc(50% + ${offset}px)` }
        case 'custom':
          return { left: `${-imgWidth - spacing}px`, top: `calc(50%  + ${offset}px)` }
      }
    }
    if (direction == 'right') {
      switch (resources) {
        case 'system':
          return { right: `${-size - spacing}px`, top: `calc(50% + ${offset}px)` }
        case 'custom':
          return { right: `${-imgWidth - spacing}px`, top: `calc(50% + ${offset}px)` }
      }
    }
    if (direction == 'top') {
      switch (resources) {
        case 'system':
          return { top: `${-size - spacing}px`, left: `calc(50% + ${offset}px)` }
        case 'custom':
          return { top: `${-imgHeight - spacing}px`, left: `calc(50% + ${offset}px)` }
      }
    }
    if (direction == 'bottom') {
      switch (resources) {
        case 'system':
          return { bottom: `${-size - spacing}px`, left: `calc(50% + ${offset}px)` }
        case 'custom':
          return { bottom: `${-imgHeight - spacing}px`, left: `calc(50% + ${offset}px)` }
      }
    }
  }, [direction, size, imgWidth, resources, imgHeight, spacing, offset])

  const content = () => {
    if (isDisabled && arrowDisabledStyle.display) {
      const disabledColor = arrowDisabledStyle.styleSync ? colorObj : arrowDisabledStyle.arrowDisabledColor,
        disabledImg = arrowDisabledStyle.styleSync ? imgUrl : arrowDisabledStyle.arrowDisabledImg
      switch (resources) {
        case 'system':
          return (
            <span
              className={['iconfont', `lcz-com-icon-${type}`, systemColorMemo(disabledColor).colorType].join(' ')}
              style={{ ...systemColorMemo(disabledColor), opacity: arrowDisabledStyle.opacity / 100 }}
            />
          )
        case 'custom':
          return disabledImg && <img style={{ opacity: arrowDisabledStyle.opacity / 100 }} src={disabledImg} />
      }
    }
    if (hoved && arrowHoverStyle.display) {
      switch (resources) {
        case 'system':
          return (
            <span
              className={[
                'iconfont',
                `lcz-com-icon-${type}`,
                systemColorMemo(arrowHoverStyle.arrowHoverColor).colorType
              ].join(' ')}
              style={systemColorMemo(arrowHoverStyle.arrowHoverColor)}
            />
          )
        case 'custom':
          return arrowHoverStyle.arrowHoverImg && <img src={arrowHoverStyle.arrowHoverImg} />
      }
    } else {
      switch (resources) {
        case 'system':
          return (
            <span
              className={['iconfont', `lcz-com-icon-${type}`, systemColorMemo(colorObj).colorType].join(' ')}
              style={systemColorMemo(colorObj)}
            />
          )
        case 'custom':
          return imgUrl && <img src={imgUrl} />
      }
    }
  }

  return (
    <ArrowWrapper
      className={'arrow-btn' + (isDisabled ? ' disabled' : '')}
      size={size}
      imgWidth={imgWidth}
      imgHeight={imgHeight}
      style={{
        ...systemPostionMemo,
        transform: `${position[direction]} `
      }}
      onClick={e => {
        e.stopPropagation()
        !isDisabled && onClick && onClick(direction)
      }}
      onMouseEnter={() => setHoved(true)}
      onMouseLeave={() => setHoved(false)}>
      {content()}
    </ArrowWrapper>
  )
})
