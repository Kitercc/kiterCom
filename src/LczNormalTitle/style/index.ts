import styled from 'styled-components'
import { Shadow } from '../type'
interface TitleWrapperProps {
  titleColor: { color: string; colorType: string }
  sweepColor: string
  sweepStatus: boolean
  isAnimat: boolean
  writingMode: string
  outShadow?: Shadow
  ellipsis?: boolean
}

const getBgColor = (props: TitleWrapperProps) => {
  const { titleColor, writingMode, sweepStatus, sweepColor } = props
  const { color, colorType } = titleColor

  if (sweepStatus && colorType === 'single') {
    return `${color}  linear-gradient(
        ${writingMode === 'vertical-rl' ? '80deg' : '-20deg'},
        ${color} 0%,
        ${color} 30%,
        ${sweepColor},
        ${color} 70%,
        ${color} 100%
      ) no-repeat 0 0`
  }
  if (colorType === 'single') {
    return color
  }
  if (sweepStatus) {
    return `#fff linear-gradient( ${color} ) no-repeat 0 0`
  } else {
    return `#fff linear-gradient(${color} ) no-repeat 0 0`
  }
}

function getBgSize(props: TitleWrapperProps) {
  const { titleColor, sweepStatus, isAnimat, writingMode } = props
  const colorType = titleColor.colorType

  if (colorType === 'gradient' && sweepStatus) {
    if (writingMode === 'vertical-rl') {
      return '100% 200%'
    }
    return '200% 100%'
  }
  if (isAnimat && sweepStatus && colorType === 'single') {
    if (writingMode === 'vertical-rl') return '100% 80%'
    return '80% 100%'
  }

  return '100% 100%'
}

function getShadow(props) {
  const { outShadow } = props
  if (outShadow?.display) {
    return `${outShadow.color} ${outShadow.xOffSet}px ${outShadow.yOffSet}px ${outShadow.extend}px`
  }
  return 'none'
}

export const TitleWrapper = styled.div<TitleWrapperProps>`
  .gradient {
    background: ${props => getBgColor(props)};
    background-size: ${props => getBgSize(props)};
    animation: ${props => (props.titleColor.colorType === 'gradient' ? 'slideShineGradient' : 'slideShine')} 4s linear
      infinite;
    animation-play-state: ${props => (props.isAnimat && props.sweepStatus ? 'running' : 'paused')};
  }

  span.shadow-title {
    z-index: 1;
    text-shadow: ${props => getShadow(props)};
  }
  .single {
    color: ${props => props.titleColor.color};
  }

  @keyframes slideShine {
    0% {
      background-position: ${props => (props.writingMode === 'vertical-rl' ? '0 -300%' : '-300% 0')};
    }

    100% {
      background-position: ${props => (props.writingMode === 'vertical-rl' ? '0 300%' : '300% 0')};
    }
  }

  @keyframes slideShineGradient {
    0% {
      background-position: ${props => (props.writingMode === 'vertical-rl' ? '100% 100%' : '100% 100%')};
    }

    100% {
      background-position: ${props => (props.writingMode === 'vertical-rl' ? '100% 0' : '0% 100%')};
    }
  }
`
