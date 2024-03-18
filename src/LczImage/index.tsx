import React, { memo, useMemo, useRef, CSSProperties } from 'react'
import LczComCon from '../common/LczComCon'
import { LczImageProps } from './type'
import { getColorObj, randomChar } from '../common/util'
import { defaultAnimation, defaultFillColor, defaultFilter } from './common/defaultValue'
import { ImageWrapper } from './style'
import { filterMap } from '../LczVideo/common'

const LczImage = (props: LczImageProps = {}) => {
  const { imgconfig, animation = defaultAnimation, filter = defaultFilter, data = [], onClick } = props
  const {
    type = 'bitmap',
    url = '',
    fillColor = defaultFillColor,
    radius = 0,
    mixBlendMode = 'normal',
    opacity = 1,
    rotate
  } = imgconfig || {}

  const imageid = useRef<string>(randomChar(''))

  const getFillColor = useMemo(() => {
    const { color: fillBgColor, display: fillDis } = fillColor
    if (!fillDis) return 'transparent'
    try {
      const { colorType, color } = getColorObj(fillBgColor)
      if (!colorType || !color) {
        throw new Error('颜色配置有误')
      }
      if (colorType === 'single') {
        return color
      }
      return `linear-gradient(${color})`
    } catch (error) {
      console.warn(error)
    }
    return 'rgba(42,185,201,1)'
  }, [JSON.stringify(fillColor)])

  const urlMemo = useMemo(() => {
    let image = ''
    if (data[0] && data[0].img) {
      image = data[0].img
    } else {
      image = url
    }
    return image
  }, [JSON.stringify(data), url])

  const imageStyleMemo = useMemo(() => {
    const imageStyle: CSSProperties = { mixBlendMode, borderRadius: radius }
    switch (type) {
      case 'bitmap':
        imageStyle.backgroundImage = `url(${urlMemo})`
        break
      case 'vector':
        imageStyle.WebkitMaskImage = `url(${urlMemo})`
        imageStyle.background = getFillColor
        break
    }
    return imageStyle
  }, [type, urlMemo, JSON.stringify(fillColor), mixBlendMode, radius])

  // 滤镜样式
  const imgFilterStyle = useMemo(() => {
    let filterValue = ''
    for (const key in filter) {
      if (Object.prototype.hasOwnProperty.call(filter, key)) {
        const item = filter[key]
        if (item.display) {
          if (key !== 'shadow') {
            const { code, symbol } = filterMap[key]
            filterValue += `${code}(${item.value}${symbol}) `
          } else {
            filterValue += `${filterMap[key](item)} `
          }
        }
      }
    }
    return { filter: filterValue.trim() }
  }, [JSON.stringify(filter)])

  // 鼠标单击事件
  const imageClick = e => {
    e.stopPropagation()
    onClick && onClick(data[0], e)
  }

  return (
    <LczComCon style={{ overflow: 'initial' }}>
      <ImageWrapper imageid={imageid.current} animation={animation} rotate={rotate} opacity={opacity}>
        <div className='lcz-image' onClick={imageClick} style={{ ...imageStyleMemo, ...imgFilterStyle }} />
      </ImageWrapper>
    </LczComCon>
  )
}

export default memo(LczImage)
