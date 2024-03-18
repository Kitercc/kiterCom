/* eslint-disable indent */
import Styled from 'styled-components'
import { ArrowConfig } from '../../LczCarouselIframe/type'

interface WrapperProps {
  isPortrait: boolean
  arrowConfig?: ArrowConfig
  overflow: 'hidden' | 'initial' | 'animate'
}

function getArrowStyle(props: WrapperProps) {
  const { isPortrait = false, arrowConfig } = props
  const { offset = 0, spacing = 0 } = arrowConfig || {}

  if (isPortrait) {
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

export const LczCardListWrapper = Styled.div<WrapperProps>`

  ${({ overflow, isPortrait }) =>
    overflow !== 'initial'
      ? `
        .card-container{
          overflow: hidden;

          &:hover{
            overflow:auto;
            ${isPortrait ? 'height:calc( 100% + 4px);' : ''}
          }
        }
      `
      : ''}

  .card-container-ul-box{
    flex-direction: ${props => (props.isPortrait ? 'row' : 'column')};

    .lcz-card-list-ul{
      flex-direction: ${props => (props.isPortrait ? 'column' : 'row')};
    }
  }

   ${props =>
     props.arrowConfig?.display && props.overflow === 'animate'
       ? ` 
       .lcz-card-list-prev {
          left: ${getArrowStyle(props).prev.left};
          top: ${getArrowStyle(props).prev.top};
          bottom: ${getArrowStyle(props).prev.bottom};
          right: ${getArrowStyle(props).prev.right};
          transform: ${getArrowStyle(props).prev.transform};
          display:${props.arrowConfig.showType === 'all' ? 'block' : 'none'};
       }

        .lcz-card-list-next {
          left: ${getArrowStyle(props).next.left};
          top: ${getArrowStyle(props).next.top};
          bottom: ${getArrowStyle(props).next.bottom};
          right: ${getArrowStyle(props).next.right};
          transform: ${getArrowStyle(props).next.transform};
          display:${props.arrowConfig.showType === 'all' ? 'block' : 'none'};
        }

        &:hover{
          .lcz-card-list-prev , .lcz-card-list-next {
            display: block;
          }
        }
       `
       : ''} 

  
`
