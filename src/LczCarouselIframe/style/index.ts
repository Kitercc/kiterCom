import styled from 'styled-components'
import { defaultArrowsConfig, defaultPagerConfig } from '../common/defaultValue'
import { CarouseIframeProps } from '../type'
interface CarouseIframeWrapperProps extends CarouseIframeProps {
  current?: number
  arrowMode?: string
}

function getPaginationPosition(props: CarouseIframeWrapperProps) {
  const { pagerConfig = defaultPagerConfig, mode = 'horizontal' } = props
  const { horiPosition, vertPosition, speed, xOffset, yOffset } = pagerConfig
  if (mode === 'horizontal') {
    switch (horiPosition) {
      case 'bottom':
        return {
          left: xOffset + 'px',
          top: 'initial',
          right: 0,
          bottom: `${10 - yOffset}px`,
          margin: `0 ${speed / 2}px`
        }
      case 'top':
        return {
          left: xOffset + 'px',
          top: `${10 + yOffset}px`,
          right: 0,
          bottom: 'initial',
          margin: `0 ${speed / 2}px`
        }
    }
  } else {
    switch (vertPosition) {
      case 'left':
        return {
          left: `${10 + xOffset}px`,
          top: `calc( 50% + ${yOffset}px)`,
          right: 'initial',
          bottom: 0,
          margin: `${speed / 2}px 0 `
        }
      case 'right':
        return {
          left: 'initial',
          top: `calc( 50% + ${yOffset}px)`,
          right: `${10 - xOffset}px`,
          bottom: 0,
          margin: `${speed / 2}px 0 `
        }
    }
  }
}

function getArrowStyle(props: CarouseIframeWrapperProps) {
  const { mode = 'horizontal', arrowsConfig = defaultArrowsConfig } = props
  const { offset, spacing } = arrowsConfig

  if (mode === 'horizontal') {
    return {
      prev: {
        top: `calc( 50% + ${offset}px )`,
        left: -spacing + 'px',
        right: 'initial',
        bottom: 'initial',
        transform: 'translateY(-50%)'
      },
      next: {
        top: `calc( 50% + ${offset}px )`,
        left: 'initial',
        right: -spacing + 'px',
        bottom: 'initial',
        transform: 'translateY(-50%)'
      }
    }
  }
  return {
    prev: {
      top: -spacing + 'px',
      left: `calc( 50% + ${offset}px )`,
      right: 'initial',
      bottom: 'initial',
      transform: 'translateX(-50%)'
    },
    next: {
      top: 'initial',
      left: `calc( 50% + ${offset}px )`,
      right: 'initial',
      bottom: -spacing + 'px',
      transform: 'translateX(-50%)'
    }
  }
}

export const CarouseIframeWrapper = styled.div<CarouseIframeWrapperProps>`
  .swiper-container {
    .swiper-pagination {
      display: flex;
      top: ${props => getPaginationPosition(props)?.top};
      right: ${props => getPaginationPosition(props)?.right};
      bottom: ${props => getPaginationPosition(props)?.bottom};
      left: ${props => getPaginationPosition(props)?.left};
      flex-direction: ${props => (props.mode === 'horizontal' ? 'row' : 'column')};
      justify-content: center;
      .swiper-pagination-bullet {
        width: ${props => props.pagerConfig?.width}px;
        height: ${props => props.pagerConfig?.height}px;
        border-radius: ${props => props.pagerConfig?.radius}px;
        background-color: ${props => props.pagerConfig?.bgColor};
        margin: ${props => getPaginationPosition(props)?.margin};
        transition: all 0.3s;
        opacity: 1;
        flex-shrink: 0;

        &.swiper-pagination-bullet-active {
          background-color: ${props => props.pagerConfig?.activeBgColor};
        }
      }
    }
  }

  .lcz-scroll-page-prev {
    left: ${props => getArrowStyle(props).prev.left};
    top: ${props => getArrowStyle(props).prev.top};
    bottom: ${props => getArrowStyle(props).prev.bottom};
    right: ${props => getArrowStyle(props).prev.right};
    transform: ${props => getArrowStyle(props).prev.transform};
  }
  .lcz-scroll-page-next {
    left: ${props => getArrowStyle(props).next.left};
    top: ${props => getArrowStyle(props).next.top};
    bottom: ${props => getArrowStyle(props).next.bottom};
    right: ${props => getArrowStyle(props).next.right};
    transform: ${props => getArrowStyle(props).next.transform};
  }
`

type ArrowWrapperProps = {
  size: number
  imgWidth: number
  imgHeight: number
}

export const ArrowWrapper = styled.div<ArrowWrapperProps>`
  cursor: pointer;
  span {
    font-size: ${props => props.size}px;
  }

  span.gradient {
    z-index: 9;
  }

  img {
    width: ${props => props.imgWidth}px;
    height: ${props => props.imgHeight}px;
  }
`
