import { createGlobalStyle, CSSObject } from 'styled-components'
import { getColorObj } from '../../../common/util'
import { HighLinghtStyle, CenterPointStyle, PointHighLight } from '../../../LczAMap/type/child'

interface AmapCenterPointStylesProps {
  pointsId: string
  centerStyle: CenterPointStyle
}

function getStyles(config: AmapCenterPointStylesProps, hover = false) {
  const css: CSSObject = {}
  const centerStyle = config.centerStyle
  if (!hover) {
    css.width = centerStyle?.width
    css.height = centerStyle?.height
    css.borderRadius = centerStyle.radius
    css.top = centerStyle.yOffset
    css.left = centerStyle.xOffset
    css.transform = `rotate(${centerStyle.rotate}deg)`

    switch (centerStyle.imageType) {
      case 'bitmap': {
        css.backgroundImage = `url(${centerStyle.bitmapUrl})`
        break
      }
      case 'vector': {
        const { colorType, color } = getColorObj(centerStyle.fillColor)
        css.WebkitMaskImage = `url(${centerStyle.vectorUrl})`
        css.background = colorType === 'single' ? color : `linear-gradient(${color})`
        break
      }
    }
  } else {
    const highstyle = centerStyle.highLight as PointHighLight
    if (!highstyle?.display) return css

    const highLinghtStyle = (highstyle.highLinghtStyle || {}) as HighLinghtStyle

    switch (centerStyle.imageType) {
      case 'bitmap': {
        css.backgroundImage = `url(${highLinghtStyle.bitmapUrl})`
        css.borderRadius = highLinghtStyle.radius
        css.top = highLinghtStyle.yOffset
        css.left = highLinghtStyle.xOffset
        css.transform = `rotate(${highLinghtStyle.rotate}deg) scale(${highLinghtStyle.scale})`
        break
      }
      case 'vector': {
        if (highLinghtStyle.imageFllow) {
          const { colorType, color } = getColorObj(highLinghtStyle.fillColor)
          css.WebkitMaskImage = `url(${centerStyle.vectorUrl})`
          css.background = colorType === 'single' ? color : `linear-gradient(${color})`
        } else {
          const { colorType, color } = getColorObj(highLinghtStyle.fillColor)
          css.WebkitMaskImage = `url(${highLinghtStyle.vectorUrl})`
          css.background = colorType === 'single' ? color : `linear-gradient(${color})`
          css.borderRadius = highLinghtStyle.radius
          css.top = highLinghtStyle.yOffset
          css.left = highLinghtStyle.xOffset
          css.transform = `rotate(${highLinghtStyle.rotate}deg) scale(${highLinghtStyle.scale})`
        }
        break
      }
    }
  }
  return css
}

export const AmapCenterPointStyles = createGlobalStyle<AmapCenterPointStylesProps>`
  .${props => props.pointsId}{
    pointer-events: auto;
    color: #f00;
     position: relative;
    image-rendering: -webkit-optimize-contrast;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
     transition:all 0.3s;

     
   ${props => getStyles(props)}

   
    &:hover{
      ${props => getStyles(props, true)}       
    }
  }
`
