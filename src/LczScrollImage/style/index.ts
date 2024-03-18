import styled from 'styled-components'
import { defaultGlobalConfig, defaultImgArrowConfig } from '../common/defaultValue'

import { ScrollImageProps } from '../type'
interface CarouseImageWrapperProps extends ScrollImageProps {
  data?: any
}

function getArrowStyle(props: CarouseImageWrapperProps) {
  const { global = defaultGlobalConfig, arrowConfig = defaultImgArrowConfig } = props
  if (global.mode === 'horizontal') {
    return {
      prev: {
        top: '50%',
        left: -arrowConfig.spacing + 'px',
        right: 'initial',
        bottom: 'initial',
        transform: 'translateY(-50%) translateX(-100%)'
      },
      next: {
        top: '50%',
        left: 'initial',
        right: -arrowConfig.spacing + 'px',
        bottom: 'initial',
        transform: 'translateY(-50%) translateX(100%)'
      }
    }
  }
  return {
    prev: {
      top: -arrowConfig.spacing + 'px',
      left: '50%',
      right: 'initial',
      bottom: 'initial',
      transform: 'translateX(-50%) translateY(-100%)'
    },
    next: {
      top: 'initial',
      left: '50%',
      right: 'initial',
      bottom: -arrowConfig.spacing + 'px',
      transform: 'translateX(-50%) translateY(100%)'
    }
  }
}

export const ScrollImageWrapper = styled.div<CarouseImageWrapperProps>`
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
