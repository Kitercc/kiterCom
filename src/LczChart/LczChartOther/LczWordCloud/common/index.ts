import { getEchartColor } from '../../../common'
import { GeneralPieDataMap } from '../../../common/type'
import { WordCloudProps, Highlight, DataSeries } from '../type'
import { defaultGlobal, defaultWordTextStyle } from './defaultValue'

const formatData = (data: GeneralPieDataMap[], stylesMemo: DataSeries[]) => {
  return data.map((item, i) => {
    const style = stylesMemo[i],
      other = { ...item }
    let name = item.itemTitle || item.item

    style.map?.fieldName === item.item &&
      style.map?.displayName &&
      ((name = style.map?.displayName), (other.itemTitle = style.map?.displayName))

    const _data = {
      ...item,
      name,
      other,
      textStyle: {
        color: getEchartColor(style.color),
        opacity: style.opacity / 100
      }
    }

    return _data
  })
}

function getBase64(url) {
  return new Promise((resolve, reject) => {
    try {
      const Img = new Image(),
        resImage = new Image()
      Img.src = url
      Img.setAttribute('crossOrigin', 'anonymous')
      resImage.setAttribute('crossOrigin', 'anonymous')
      Img.onload = function () {
        const canvas = document.createElement('canvas') as HTMLCanvasElement,
          width = Img.width,
          height = Img.height
        canvas.width = width
        canvas.height = height
        canvas.getContext('2d')?.drawImage(Img, 0, 0, width, height) //将图片绘制到canvas中
        const ext = url.substr(url.lastIndexOf('.') + 1)
        resImage.src = canvas.toDataURL(`image/${ext}`)
      }
      Img.onerror = resImage.onerror = err => {
        reject(err)
      }
      resImage.onload = () => {
        resolve(resImage)
      }
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

const getSizeSort = (v1, v2) => (v1 >= v2 ? [v2, v1] : [v1, v2])

export async function getSeries(config: WordCloudProps, data: GeneralPieDataMap[], stylesMemo: DataSeries[]) {
  const { margin, wordsStyle, wordTextStyle = defaultWordTextStyle } = config.globalConfig || defaultGlobal
  const highlight = (wordTextStyle.highlight || defaultWordTextStyle.highlight) as Highlight

  const options: any = {
    series: [
      {
        left: margin?.l,
        top: margin?.t,
        right: null,
        bottom: null,
        width: `${wordsStyle?.width}%`,
        height: `${wordsStyle?.height}%`,
        shape: 'circle',
        type: 'wordCloud',
        gridSize: wordTextStyle.gridsize,
        sizeRange: getSizeSort(wordTextStyle.minSize, wordTextStyle.maxSize),
        rotationRange: getSizeSort(wordTextStyle.maxRotat, wordTextStyle.minSize),
        layoutAnimation: true,
        rotationStep: wordTextStyle.rotationStep,

        textStyle: {
          fontFamily: wordTextStyle.fontFamily,
          fontWeight: wordTextStyle.fontWeight,
          textShadowBlur: wordTextStyle.shadow?.shadowBlur,
          textShadowColor: wordTextStyle.shadow?.shadowColor,
          textShadowOffsetX: wordTextStyle.shadow?.shadowOffsetX,
          textShadowOffsetY: wordTextStyle.shadow?.shadowOffsetY
        },
        data: formatData(data, stylesMemo)
      }
    ]
  }

  margin?.l === 'auto' && (options.series[0].left = margin?.autoL)
  margin?.t === 'auto' && (options.series[0].top = margin?.autoT)

  if (wordsStyle?.shape === 'system') {
    options.series[0].shape = wordsStyle?.systemStyle
  } else {
    if (wordsStyle?.customStyle) {
      try {
        const maskImage = await getBase64(wordsStyle.customStyle)
        options.series[0].maskImage = maskImage
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (highlight.display) {
    options.series[0].emphasis = {
      focus: highlight.focus || 'none',
      textStyle: {
        fontFamily: highlight.fontFamily,
        fontSize: highlight.fontSize,
        color: highlight.color,
        fontWeight: highlight.fontWeight,
        textShadowBlur: highlight.shadow?.shadowBlur,
        textShadowColor: highlight.shadow?.shadowColor,
        textShadowOffsetX: highlight.shadow?.shadowOffsetX,
        textShadowOffsetY: highlight.shadow?.shadowOffsetY
      }
    }
  }

  return options
}
