/* eslint-disable indent */
import styled from 'styled-components'
import { configDisplayCompatible } from '../../common/util'
import { BorderConfig, CarouselConfig, Horcroll, SliderConfig } from '../type'

interface CarouselWrapperProps {
  lineBorder?: BorderConfig
  horcroll?: Horcroll
  itemWidth: number | string
  interval: number
  sliderConfig?: SliderConfig
  carousel: CarouselConfig
}

export function getMaxSrcollSize(horcroll) {
  return Math.max(horcroll?.trackConfig?.thickness, horcroll?.sliderConfig?.size)
}

function getScrollInnerBarWidth(props) {
  return (props.horcroll?.trackConfig?.thickness * (1 - props.sliderConfig?.size)) / 2
}

export const CarouseTableWrapper = styled.div<CarouselWrapperProps>`
  .lcz-carouse-table-container {
    overflow-x: ${props => (props.horcroll?.display && props.itemWidth !== '100%' ? 'auto' : 'hidden')};
    overflow-y: hidden;
    max-width: 100%;
    max-height: 100%;

    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
      display: ${props => (props.itemWidth === '100%' || !props.horcroll?.trackConfig?.display) && 'none'};
      height: ${props => props.horcroll?.trackConfig?.thickness}px !important;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius: ${props => props.horcroll?.trackConfig?.radius}px;
      background: ${props => props.horcroll?.trackConfig?.color};
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius: ${props => (props.sliderConfig?.radius || 0) * (props.sliderConfig?.size || 0)}px;
      background: content-box ${props => props.sliderConfig?.color};
      border-style: solid;
      border-color: transparent;
      border-width: ${props => getScrollInnerBarWidth(props)}px;
      border-image: initial;
      border-left-width: 0;
      border-right-width: 0;
    }

    scrollbar-color: ${props =>
      props.horcroll?.display
        ? `${props.sliderConfig?.color} ${props.horcroll?.trackConfig?.color}`
        : 'transparent transparent'};
    scrollbar-width: ${props => (props.horcroll?.display ? 'thin' : 'none')};
    scrollbar-track-color: ${props => (props.horcroll?.display ? '' : 'transparent')};
    -ms-scrollbar-track-color: ${props => (props.horcroll?.display ? '' : 'transparent')};
  }

  .carouse-box-inner {
    /* 设置滚动条的样式 */
    ::-webkit-scrollbar {
      display: ${props => (props.itemWidth === '100%' || !props.horcroll?.trackConfig?.display) && 'none'};
      width: ${props => getMaxSrcollSize(props.horcroll)}px !important;
    }
    /* 滚动槽 */
    ::-webkit-scrollbar-track {
      border-radius: ${props => props.horcroll?.trackConfig?.radius}px;
      background: ${props => props.horcroll?.trackConfig?.color};
    }
    /* 滚动条滑块 */
    ::-webkit-scrollbar-thumb {
      border-radius: ${props => (props.sliderConfig?.radius || 0) * (props.sliderConfig?.size || 0)}px;
      background: content-box ${props => props.sliderConfig?.color};
      border-style: solid;
      border-color: transparent;
      border-width: ${props => (getMaxSrcollSize(props.horcroll) * (1 - (props.sliderConfig?.size || 0))) / 2}px;
      border-image: initial;
      border-top-width: 0;
      border-bottom-width: 0;
    }

    scrollbar-color: ${props =>
      props.horcroll?.display
        ? `${props.sliderConfig?.color} ${props.horcroll?.trackConfig?.color}`
        : 'transparent transparent'};
    scrollbar-width: ${props => (props.horcroll?.display ? 'thin' : 'none')};
    scrollbar-track-color: ${props => (props.horcroll?.display ? '' : 'transparent')};
    -ms-scrollbar-track-color: ${props => (props.horcroll?.display ? '' : 'transparent')};
  }
  .table-colmun {
    border-style: solid;
    border-width: ${props =>
      configDisplayCompatible(props.lineBorder, 'borderd') ? props.lineBorder?.borderWidth : 0}px;
    border-color: ${props => props.lineBorder?.borderColor};
  }

  .clearnOpacityAnimation {
    animation: clearnOpacit ${({ carousel }) => carousel.duration * 2}ms;
  }

  .animate {
    transition: all ${({ carousel }) => `${carousel.duration}ms ${carousel.speed}`};
  }
`

interface ProgressProps {
  progressWidth?: number
  progressHeight?: number
  enColor: string
  fontSize?: number | string
  outLineStyle: { padding: string; w: number; h: number; bgColor: string; border: string; borderRadius: number }
}

export const ProgressWrapper = styled.div<ProgressProps>`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;

  .ant-progress {
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    display: flex;
    align-items: center;
    line-height: 1.2;
    width: initial;

    &.ant-progress-status-success {
      .ant-progress-bg {
        background-color: ${props => props.enColor} !important;
      }
    }
    .ant-progress-outer {
      width: ${props => props.outLineStyle.w}px;
      height: ${props => props.outLineStyle.h}px;
      padding: ${props => props.outLineStyle.padding};
      border: ${props => props.outLineStyle.border};
      border-radius: ${props => props.outLineStyle.borderRadius}px;
      background-color: ${props => props.outLineStyle.bgColor};
      .ant-progress-inner {
        width: ${props => props.progressWidth}px;
        height: ${props => props.progressHeight}px;
        background: transparent;

        .ant-progress-bg {
          height: 100% !important;
          background-color: transparent;
        }
      }
    }
  }

  .progress-box {
    .grid-box {
      width: ${props => props.outLineStyle.w}px;
      height: ${props => props.outLineStyle.h}px;
      padding: ${props => props.outLineStyle.padding};
      border: ${props => props.outLineStyle.border};
      border-radius: ${props => props.outLineStyle.borderRadius}px;
      background-color: ${props => props.outLineStyle.bgColor};
    }
  }
`
