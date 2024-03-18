import React, { memo } from 'react'
import { ImageConfig } from '../type/child'
import { analysisExpression } from '../../common/util'

type ImageProps = {
  imageUrl: string
  imageConfig: ImageConfig
  containData: any
  additionalField: boolean
  id: string
  expPathArr: string[]
}

const Image = memo(({ imageUrl, imageConfig, containData, additionalField, id, expPathArr }: ImageProps) => {
  const config = (function () {
    const { width = 0, height = 0, imageSeries = [] } = imageConfig
    const obj = {
      url: imageUrl,
      width,
      height
    }

    if (additionalField && imageSeries.length) {
      const findSeries = imageSeries.find((item, i) =>
        Boolean(
          analysisExpression(item.condition, containData, id, {
            name: 'imageConfig.imageSeries[].condition',
            pathArr: [...expPathArr, `imageSeries[${i}]`]
          })
        )
      )
      findSeries && Object.assign(obj, { url: findSeries.imageUrl, width: findSeries.width, height: findSeries.height })
    }

    return { backgroundImage: `url(${obj.url})`, width: obj.width, height: obj.height }
  })()

  return <div className='image-field background-image-100' style={config} />
})

Image.displayName = 'Image'
export default Image
