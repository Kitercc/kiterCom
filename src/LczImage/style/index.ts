import styled from 'styled-components'
import { defaultAnimation } from '../common/defaultValue'
import { AnimationConfig, Rotate, Scale, Translate } from '../type'

type ImageWrapperProps = {
  imageid: string
  animation: AnimationConfig
  opacity: number
  rotate?: Rotate
}

export const ImageWrapper = styled.div<ImageWrapperProps>`
  width: 100%;
  height: 100%;

  .lcz-image {
    ${props => getDefaultStyle(props)}
  }

  ${props =>
    props.animation.display
      ? `
          .lcz-image{ 
            animation: ${getImageAnimation(props)}; 
          }

          @keyframes ${`${props.animation.animationType}-${props.imageid}`} {
            ${getAnimattion(props)}
          }
        `
      : ''}
`

const getDefaultStyle = (props: ImageWrapperProps) => {
  const { opacity, rotate, animation } = props,
    { display, animationType } = animation
  let style = ''
  if (!display || animationType !== 'opacity') style = `opacity:${opacity};`
  if (!display || !['clockwise', 'anticlockwise', 'backrotation'].includes(animationType)) {
    style += `transform: ${getRotate(rotate)};`
  }
  return style
}

const getImageAnimation = (props: ImageWrapperProps) => {
  const { imageid = '', animation = defaultAnimation } = props
  const {
    delayed = 0,
    loop = true,
    interval = 0,
    animationType = 'opacity',
    duration = 3,
    speed = 'linear',
    keyFrame = []
  } = animation
  const _delayed = loop ? (delayed >= interval ? delayed - interval : delayed) : delayed

  if (animationType !== 'custom') {
    return `${animationType + '-' + imageid} ${duration + interval}s ${speed} ${_delayed}s ${loop ? 'infinite' : 1}`
  }
  if (!keyFrame?.length) return null
  const _totalduration = keyFrame.reduce((pre, current) => pre + current.duration / 1000, 0) + (loop ? interval : 0)
  return `${animationType + '-' + imageid} ${_totalduration}s linear ${_delayed}s ${loop ? 'infinite' : 1}`
}

const getAnimattion = ({
  animation = defaultAnimation,
  opacity: defaultOpa,
  rotate: defaultRot
}: ImageWrapperProps) => {
  const { interval = 0, loop = true, duration = 3, animationType = 'opacity', keyFrame = [] } = animation

  const _delayed = loop ? (interval / (duration + interval)) * 100 : 0

  const midden = (100 - _delayed) / 2
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
        0% ,${_delayed}% {transform: scale(1) ${getRotate(defaultRot)}; }
        ${_delayed + midden}% {transform: scale(0.5) ${getRotate(defaultRot)};}
        100% {transform: scale(1) ${getRotate(defaultRot)};}
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
            0%,${_customDelayed}% { ${getKeyFrameStyle({ opacity: defaultOpa, rotate: defaultRot })}} `,
        percentage = _customDelayed

      for (let i = 0; i < keyFrame.length; i++) {
        const { duration, opacity, rotate, scale, translate } = keyFrame[i]
        percentage += (duration / 1000 / totalduration) * 100
        keyframe += `${percentage}% { ${getKeyFrameStyle({ opacity, rotate, scale, translate })} }`
      }

      return keyframe
    }
    default:
      return null
  }
}

function getKeyFrameStyle({ opacity, rotate = {} as Rotate, scale = {} as Scale, translate = {} as Translate }) {
  let style = opacity !== undefined ? `opacity:${opacity};` : 0

  if (rotate.display || scale.display || translate.display) style += `transform: ${getRotate(rotate)}`

  if (scale.display) {
    const { scaleX = 100, scaleY = 100 } = scale
    style += ` scaleX(${scaleX / 100}) scaleY(${scaleY / 100})`
  }

  if (translate.display) {
    const { translateX = 0, translateY = 0 } = translate
    style += ` translateX(${translateX}px) translateY(${translateY}px)`
  }
  style && (style += ';')

  return style
}

function getRotate(rotate = {} as Rotate) {
  if (rotate.display) {
    const { rotateX = 0, rotateY = 0, rotateZ = 0 } = rotate
    return ` rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
  }
  return ''
}
