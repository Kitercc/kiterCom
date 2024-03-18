import React, { CSSProperties, memo } from 'react'
import { ToolTipImageConfig, ToolTipImageStyle } from '../../../LczAMap/type/child'
import { Image } from 'antd'
import { analysisExpression } from '../../../common/util'

export default memo(function LczTipImage({
  design = false,
  id,
  data,
  imageConfig,
  className = ''
}: {
  design: boolean
  id: string
  data?: any
  imageConfig?: ToolTipImageConfig
  className?: string
}) {
  let _wrapper: React.ReactElement = <></>

  function getImageWrapper(url, styles: ToolTipImageStyle, i = 0) {
    const { radius = 0, width = 80, height = 80, rotate = 10, position, clickPreview = false } = styles,
      style: CSSProperties = {}
    style.borderRadius = radius
    style.width = width
    style.height = height
    style.left = position?.x
    style.top = position?.y
    style.transform = `rotate(${rotate}deg)`
    if (!clickPreview || design) {
      style.backgroundImage = `url(${url})`
      style.backgroundSize = '100% 100%'
      style.pointerEvents = 'none'
    }

    return (
      <div className={`amap-tip-image ${className}`} style={style} key={i}>
        {clickPreview && !design && <Image style={{ borderRadius: radius, width, height }} src={url} alt='' />}
      </div>
    )
  }

  if (imageConfig?.display) {
    switch (imageConfig.source) {
      case 'exp': {
        let expImgUrl = imageConfig.expImgUrl

        if (expImgUrl) {
          expImgUrl = analysisExpression(expImgUrl, data, id, {
            name: 'imageConfig.expImgUrl'
          })
          _wrapper = getImageWrapper(expImgUrl, imageConfig)
        }
        break
      }
      case 'fixed': {
        const _fixedImageList = imageConfig.fixedImageList || [],
          fixedImageList = _fixedImageList.filter(v => v.fixedImgUrl)

        if (fixedImageList.length > 0) {
          _wrapper = <>{fixedImageList.map((item, i) => getImageWrapper(item.fixedImgUrl, item, i))}</>
        }
        break
      }
      default:
        break
    }
  }

  return _wrapper
})
