import styled from 'styled-components'
import { defaultPagerConfig } from '../common/defaultValue'
import { CarouselImageProps } from '../type'
interface CarouseImageWrapperProps extends CarouselImageProps {
  current?: number
  arrowMode?: string
  mode?: 'horizontal' | 'vertical'
}

function getPaginationPosition(props: CarouseImageWrapperProps) {
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

export const CarouseImageWrapper = styled.div<CarouseImageWrapperProps>`
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
`
