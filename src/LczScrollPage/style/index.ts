import styled from 'styled-components'
import { ArrowConfig } from '../../LczCircularTarget/type'
import { defaultGlobal, defaultpager } from '../common/defaultValue'
import { PagerConfig, ScrollGlobal } from '../type'

interface ScrollPageWrapperProps {
  w: number
  h: number
  global: ScrollGlobal
  unselected?: { proportion: number; offset: number }
  animate: { switchEffect: 'slide' | 'fade'; switchSpeed: number }
  pagerConfig: PagerConfig
  arrowConfig: ArrowConfig
}

function getPaginationPosition(props: ScrollPageWrapperProps) {
  const { global = defaultGlobal, pagerConfig = defaultpager, unselected = { proportion: 1, offset: 0 } } = props
  const { horiPosition, vertPosition, speed, xOffset, yOffset } = pagerConfig
  const { proportion, offset } = unselected
  if (global.mode === 'horizontal') {
    switch (horiPosition) {
      case 'bottom':
        return {
          left: xOffset + 'px',
          top: 'initial',
          right: 0,
          bottom: `${10 - yOffset}px`,
          margin: `0 ${speed / 2}px`,
          transform: `translateY(${offset}px)   scale(${proportion})`
        }
      case 'top':
        return {
          left: xOffset + 'px',
          top: `${10 + yOffset}px`,
          right: 0,
          bottom: 'initial',
          margin: `0 ${speed / 2}px`,
          transform: `translateY(${offset}px)   scale(${proportion})`
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
          margin: `${speed / 2}px 0 `,
          transform: `translateX(${offset}px)   scale(${proportion})`
        }
      case 'right':
        return {
          left: 'initial',
          top: `calc( 50% + ${yOffset}px)`,
          right: `${10 - xOffset}px`,
          bottom: 0,
          margin: `${speed / 2}px 0 `,
          transform: `translateX(${offset}px)   scale(${proportion})`
        }
    }
  }
}

function getArrowStyle(props: ScrollPageWrapperProps) {
  const { w, h, global = defaultGlobal, arrowConfig } = props
  if (global.mode === 'horizontal') {
    return {
      prev: {
        top: '50%',
        left: (-w * (global.pageNum - 1)) / 2 - arrowConfig.spacing + 'px',
        right: 'initial',
        bottom: 'initial',
        transform: 'translateY(-50%) translateX(-100%)'
      },
      next: {
        top: '50%',
        left: 'initial',
        right: (-w * (global.pageNum - 1)) / 2 - arrowConfig.spacing + 'px',
        bottom: 'initial',
        transform: 'translateY(-50%) translateX(100%)'
      }
    }
  }
  return {
    prev: {
      top: (-h * (global.pageNum - 1)) / 2 - arrowConfig.spacing + 'px',
      left: '50%',
      right: 'initial',
      bottom: 'initial',
      transform: 'translateX(-50%) translateY(-100%)'
    },
    next: {
      top: 'initial',
      left: '50%',
      right: 'initial',
      bottom: (-h * (global.pageNum - 1)) / 2 - arrowConfig.spacing + 'px',
      transform: 'translateX(-50%) translateY(100%)'
    }
  }
}

export const ScrollPageWrapper = styled.div<ScrollPageWrapperProps>`
  .swiper-container {
    .swiper-wrapper {
      display: flex;
      align-items: center;
      .swiper-slide {
        height: ${props => props.h}px;
        transition: ${props => `all ${props.animate.switchSpeed / 1000}s`};
        transform: ${props => getPaginationPosition(props)?.transform};
        iframe {
          width: ${props => props.w}px;
          height: ${props => props.h}px;
          pointer-events: none;
        }

        &.lcz-scroll-active-page {
          width: ${props => props.w}px !important;
          height: ${props => props.h}px;
          transform: translateY(0px) scale(1);

          iframe {
            pointer-events: auto;
          }
        }
      }
    }

    .swiper-pagination {
      top: ${props => getPaginationPosition(props)?.top};
      right: ${props => getPaginationPosition(props)?.right};
      bottom: ${props => getPaginationPosition(props)?.bottom};
      left: ${props => getPaginationPosition(props)?.left};
      flex-direction: ${props => (props.global.mode === 'horizontal' ? 'row' : 'column')};

      .swiper-pagination-bullet {
        width: ${props => props.pagerConfig.wdith}px;
        height: ${props => props.pagerConfig.height}px;
        border-radius: ${props => props.pagerConfig.radios}px;
        background-color: ${props => props.pagerConfig.defaultColor};
        margin: ${props => getPaginationPosition(props)?.margin};
        transition: all 0.3s;
        opacity: 1;

        &.swiper-pagination-bullet-active {
          background-color: ${props => props.pagerConfig.activeColor};
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
