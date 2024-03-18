import styled from 'styled-components'

interface WrapperProps {
  textColor?: string
}

export const WeatherWrapper = styled.div<WrapperProps>`
  color: ${props => props.textColor};
  height: 100%;
  width: 100%;
`
