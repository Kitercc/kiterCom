import styled from 'styled-components'

interface ColumnsWrapperProps {
  topBgColor: string
  hornColor: string
}

export const ColumnsWrapper = styled.div<ColumnsWrapperProps>`
  &::before {
    background: ${props => props.topBgColor} !important;
  }
  .line1,
  .line2 {
    &::before,
    &::after {
      border-color: ${props => props.hornColor}!important;
    }
  }
`
