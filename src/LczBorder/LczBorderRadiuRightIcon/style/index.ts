import styled from 'styled-components'

interface BorderRightIconWrapper {
  iconColor: string
  lineColor: string
}

export const BorderRightIconWrapper = styled.div<BorderRightIconWrapper>`
  .icon {
    ul {
      li {
        background-color: ${props => props.iconColor} !important;
      }
    }
  }

  &::before {
    background-color: ${props => props.lineColor} !important;
  }
`
