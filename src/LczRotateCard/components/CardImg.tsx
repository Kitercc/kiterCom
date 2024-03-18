import React, { CSSProperties, memo } from 'react'
import { ImgSeries } from '../type'
import { analysisExpression } from '../../common/util'
import IconCon from '../../common/IconCon'

export default memo(function LczTipImage({
  id,
  data,
  imageSeries,
  isCurrent,
  className = ''
}: {
  id: string
  data: any
  imageSeries: ImgSeries[]
  isCurrent: boolean
  className: string
}) {
  function getImageWrapper(url, styles: ImgSeries, i = 0) {
    const { radius = 0, width = 80, height = 80, rotate = 10, position } = styles,
      style: CSSProperties = {
        borderRadius: radius,
        width: width,
        height: height,
        left: position?.x,
        top: position?.y,
        transform: `rotate(${rotate}deg)`,
        backgroundImage: `url(${url})`,
        backgroundSize: '100% 100%',
        pointerEvents: 'none'
      }

    return <div className={`card-image ${className}`} style={style} key={i} />
  }

  function getIconWrapper(iconValue: IconValueType, styles: ImgSeries, iconColor: string, i = 0) {
    const { width = 80, rotate = 10, position } = styles,
      style: CSSProperties = {
        color: iconColor,
        fontSize: width,
        left: position?.x,
        top: position?.y,
        transform: `rotate(${rotate}deg)`
      }

    return (
      <IconCon key={i} className='icon-con card-icon' oldFamily='lcz-system-icon' style={style} iconValue={iconValue} />
    )
  }

  const fixedImageList = imageSeries.filter(
    (v, i) =>
      analysisExpression(v.condition, data, id, { name: 'imgSeries[].condition', pathArr: [`imgSeries[${i}]`] }) ||
      v.condition === ''
  )

  let _wrapper: React.ReactElement = <></>
  if (fixedImageList.length > 0) {
    _wrapper = (
      <>
        {fixedImageList.map((item, i) => {
          const { imgCurrent } = item,
            cardImgData = {
              itemType: item.imgType,
              imgUrl: item.cardImg,
              iconUrl: item.cardIcon,
              iconColor: item.iconColor
            }
          if (isCurrent && imgCurrent.display) {
            cardImgData.itemType = imgCurrent.currentImgType
            cardImgData.imgUrl = imgCurrent.cardImg
            cardImgData.iconUrl = imgCurrent.cardIcon
            cardImgData.iconColor = imgCurrent.iconColor
          }

          if (cardImgData.itemType === 'custom') {
            return getImageWrapper(cardImgData.imgUrl, item, i)
          }

          return getIconWrapper(cardImgData.iconUrl, item, cardImgData.iconColor, i)
        })}
      </>
    )
  }

  return _wrapper
})
