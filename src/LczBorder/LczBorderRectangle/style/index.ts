import styled from 'styled-components'

import { rgbaRegX } from '../../../common/util'

interface rectWrapperProps {
  hornColor: string
  borderColor: string
}

export const LczBorderRectangleWrapper = styled.div<rectWrapperProps>`
  box-shadow: 0 0 20px 4px ${props => rgbaRegX(props.borderColor, 0.7)} inset;
  &::before,
  &::after,
  span::after,
  span::before {
    border-color: ${props => props.hornColor} !important;
  }
`
