import styled from 'styled-components'
import { hexToRgba, rgbaRegX } from '../../../common/util'
import { GradientProps } from '../type'

export const GradientWrapper = styled.div<GradientProps>`
  &::before,
  &::after {
    background: linear-gradient(
      to bottom,
      #b1d7fd,
      ${hexToRgba('#012753', 0.5)} 40%,
      ${props => rgbaRegX(props.bottomBgColor4 || '', 0.7)} 70%,
      ${props => rgbaRegX(props.bottomBgColor4 || '', 1)} 100%
    ) !important;
  }
`
