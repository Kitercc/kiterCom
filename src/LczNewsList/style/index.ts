/* eslint-disable indent */
import styled from 'styled-components'
import { getColorObj, numberIsEmpty } from '../../common/util'
import { Abstract, Drawing, GlobalConfig, MaskConfig, SplitLine, TitleConfig } from '../type'

function getColor(val: any) {
  try {
    const { color, colorType } = getColorObj(val)
    if (colorType === 'gradient') {
      return `linear-gradient(${color})`
    } else {
      return color
    }
  } catch (error) {
    return 'rgba(255,255,255,0)'
  }
}

interface WrapperProps {
  globalConfig: GlobalConfig
  titleConfig: TitleConfig
  splitLine: SplitLine
  drawing: Drawing
  maskConfig: MaskConfig
  abstract: Abstract
}

export const NewsListWrapper = styled.div<WrapperProps>`
  ul {
    li.list-item {
      gap: ${props => props.globalConfig.speed}px;

      .new-thumbnail {
        padding-top: ${props => props.drawing.topMargin}px;
        background: ${props => props.drawing.bgColor};
        order: ${props => (props.drawing.position === 'left' ? 0 : 1)};
        img {
          width: ${props => props.drawing.width}px;
          border-radius: ${props => props.drawing.radius}px;
          border: ${props => `${props.drawing.borderWidth}px solid ${props.drawing.borderColor}`};
          ${({ drawing }) => (numberIsEmpty(drawing.height) ? `height: ${drawing.height}px;` : 'height: auto;')}
        }
      }

      .new-data {
        order: ${props => (props.drawing.position === 'left' ? 1 : 0)};

        .news-title {
          padding: ${props =>
            `${props.titleConfig.titleMargin.top}px ${props.titleConfig.titleMargin.right}px ${props.titleConfig.titleMargin.bottom}px ${props.titleConfig.titleMargin.left}px`};

          h3 {
            &.data-show-ellipsis {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: ${props => props.titleConfig.titleShowrownum};
              -webkit-box-orient: vertical;
              word-break: break-all;
            }
          }
        }
        .new-split {
          display: ${props => (props.splitLine.display ? 'inline-block' : 'none')} !important;
          border-bottom: ${props => `${props.splitLine.width}px ${props.splitLine.style} ${props.splitLine.color}`};
        }
        p {
          padding: ${props =>
            `${props.abstract.absMargin.top}px ${props.abstract.absMargin.right}px ${props.abstract.absMargin.bottom}px ${props.abstract.absMargin.left}px`};

          overflow: hidden;
          .data-show-ellipsis {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: ${props => props.abstract.absShowrownum};
            -webkit-box-orient: vertical;
            word-break: break-all;
            flex: none;
          }
        }
      }
    }
  }

  &::after {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    content: '';
    display: ${props => (props.maskConfig.display ? 'block' : 'none')};
    width: 100%;
    height: ${props => props.maskConfig.maskHeight}px;
    background: ${props => getColor(props.maskConfig.color)};
  }
`
