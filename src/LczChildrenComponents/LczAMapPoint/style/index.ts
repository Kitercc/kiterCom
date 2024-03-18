/* eslint-disable indent */
import { createGlobalStyle, CSSObject } from 'styled-components'
import { getColorObj } from '../../../common/util'
import { HighLinghtStyle, ImageStyle, PointHighLight, PointIconConfig } from '../../../LczAMap/type/child'
import { defaultAnimation } from '../../../LczImage/common/defaultValue'

export interface iconStyle extends PointIconConfig {
  type: 'normal' | 'custom' | 'active'
}

interface AmapPointStylesProps {
  id: string
  styled: iconStyle
}

function getStyles({ id, styled }: AmapPointStylesProps, isChild: boolean, hover = false) {
  const css: CSSObject = {},
    imageStyle = (styled.imageStyle || {}) as ImageStyle,
    hoverStyle = (styled.highLight || {}) as PointHighLight
  if (!hover) {
    if (isChild) {
      css.width = imageStyle?.width
      css.height = imageStyle?.height
      css.borderRadius = imageStyle.radius

      switch (imageStyle.imageType) {
        case 'bitmap': {
          css.backgroundImage = `url(${imageStyle.bitmapUrl})`
          break
        }
        case 'vector': {
          const { colorType, color } = getColorObj(imageStyle.fillColor)
          css.WebkitMaskImage = `url(${imageStyle.vectorUrl})`
          css.background = colorType === 'single' ? color : `linear-gradient(${color})`
          break
        }
      }

      if (styled.animation?.display) {
        css.animation = getImageAnimation({ id, styled }) as any
      }
    } else {
      css.top = imageStyle.yOffset
      css.left = imageStyle.xOffset
      css.transform = `rotate(${imageStyle.rotate}deg)`
    }

    return css
  } else {
    if (!styled.highLight?.display) return css

    const highLinghtStyle = (hoverStyle.highLinghtStyle || {}) as HighLinghtStyle

    switch (imageStyle.imageType) {
      case 'bitmap': {
        if (isChild) {
          css.backgroundImage = `url(${highLinghtStyle.bitmapUrl})`
          css.borderRadius = highLinghtStyle.radius
        } else {
          css.top = highLinghtStyle.yOffset
          css.left = highLinghtStyle.xOffset
          css.transform = `rotate(${highLinghtStyle.rotate}deg) scale(${highLinghtStyle.scale})`
        }

        break
      }
      case 'vector': {
        if (highLinghtStyle.imageFllow) {
          const { colorType, color } = getColorObj(highLinghtStyle.fillColor)
          if (isChild) {
            css.WebkitMaskImage = `url(${imageStyle.vectorUrl})`
            css.background = colorType === 'single' ? color : `linear-gradient(${color})`
          }
        } else {
          if (isChild) {
            const { colorType, color } = getColorObj(highLinghtStyle.fillColor)
            css.WebkitMaskImage = `url(${highLinghtStyle.vectorUrl})`
            css.background = colorType === 'single' ? color : `linear-gradient(${color})`
            css.borderRadius = highLinghtStyle.radius
          } else {
            css.top = highLinghtStyle.yOffset
            css.left = highLinghtStyle.xOffset
            css.transform = `rotate(${highLinghtStyle.rotate}deg) scale(${highLinghtStyle.scale})`
          }
        }
        break
      }
    }

    return css
  }
}

export const AmapPointStyles = createGlobalStyle<AmapPointStylesProps>`
 .${props => `${props.id}-${props.styled.type}`}{
  pointer-events: auto;
  position: relative;
  transition:all 0.3s;
  ${props => getStyles(props, false)}

  &:hover{
    ${props => getStyles(props, false, true)}        
  }


  .content{
    image-rendering: -webkit-optimize-contrast;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    -webkit-mask-repeat: no-repeat;
    ${props => getStyles(props, true)}

     &:hover{
      ${props => getStyles(props, true, true)}        
    }
    
  }
  
   @keyframes ${props => `${props.styled.type}-${props.styled.animation?.animationType}-${props.id}`} {
    ${props => getAnimattion(props.styled)}
  }
 }
`

const getImageAnimation = (props: AmapPointStylesProps) => {
  const { id = '', styled } = props,
    {
      delayed = 0,
      loop = true,
      interval = 0,
      animationType = 'opacity',
      duration = 3,
      speed = 'linear',
      keyFrame = []
    } = styled.animation || {},
    _delayed = loop ? (delayed >= interval ? delayed - interval : delayed) : delayed

  if (animationType !== 'custom') {
    return `${props.styled.type + '-' + animationType + '-' + id} ${duration + interval}s ${speed} ${_delayed}s ${
      loop ? 'infinite' : 1
    }`
  }
  if (!keyFrame?.length) return null
  const _totalduration = keyFrame.reduce((pre, current) => pre + current.duration / 1000, 0) + (loop ? interval : 0)
  return `${props.styled.type}-${animationType}-${id} ${_totalduration}s linear ${_delayed}s ${loop ? 'infinite' : 1}`
}

const getAnimattion = ({ animation = defaultAnimation }) => {
  const { interval = 0, loop = true, duration = 3, animationType = 'opacity', keyFrame = [] } = animation,
    _delayed = loop ? (interval / (duration + interval)) * 100 : 0,
    midden = (100 - _delayed) / 2

  switch (animationType) {
    case 'opacity': {
      return `
        0%, ${_delayed}% {opacity:1;}
        ${_delayed + midden}% {opacity:0;}
        100% {opacity:1;}
      `
    }
    case 'scale': {
      return `
        0% ,${_delayed}% {transform: scale(1);}
        ${_delayed + midden}% {transform: scale(0.5);}
        100% {transform: scale(1);}
      `
    }
    case 'clockwise': {
      return `
         0% ,${_delayed}% {transform: rotate(0deg);}
         100% {transform: rotate(360deg);}
      `
    }
    case 'anticlockwise': {
      return `
        0% ,${_delayed}% {transform: rotate(0deg);}
        100% {transform: rotate(-360deg);}
      `
    }
    case 'backrotation': {
      return `
        0% ,${_delayed}% {transform: rotate(0deg);}
        ${_delayed + midden}% {transform: rotate(360deg);}
        100% {transform: rotate(0deg);}
      `
    }
    case 'custom': {
      if (!keyFrame?.length) return null

      const totalduration = keyFrame.reduce((pre, current) => pre + current.duration / 1000, 0) + (loop ? interval : 0)
      const _customDelayed = loop ? (interval / totalduration) * 100 : 0
      let keyframe = `
            0%,${_customDelayed}% {
              opacity:1;
              transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1,1) translate(0,0);
            } `,
        percentage = _customDelayed

      for (let i = 0; i < keyFrame.length; i++) {
        const { duration, opacity, rotate, scale, translate } = keyFrame[i]
        percentage += (duration / 1000 / totalduration) * 100
        let _style = `${percentage}% { opacity:${opacity}; transform:`

        rotate?.display &&
          (_style += ` rotateX(${rotate.rotateX}deg) rotateY(${rotate.rotateY}deg) rotateZ(${rotate.rotateZ}deg) `)
        scale?.display && (_style += ` scaleX(${scale.scaleX / 100}) scaleY(${scale.scaleY / 100}) `)
        translate?.display &&
          (_style += ` translateX(${translate.translateX}px) translateY(${translate.translateY}px) `)
        keyframe += `${_style}; }`
      }

      return keyframe
    }
    default:
      return null
  }
}
