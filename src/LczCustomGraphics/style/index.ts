import styled from 'styled-components'
import { VagueConfig } from '../type'

interface RectWrapperProps {
  radius?: number
  borderWidth: number
  borderDisplay: boolean
}

interface CircWrapperProps {
  borderWidth: number
  borderDisplay: boolean
}

export const RectWrapper = styled.div<RectWrapperProps>`
  border-radius: ${props => props.radius}px;
  position: absolute;
  top: 0;
  left: 0;
  border: ${props => (props.borderDisplay ? props.borderWidth : 0)}px solid transparent;
`

export const CircWrapper = styled.div<CircWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  border: ${props => (props.borderDisplay ? props.borderWidth : 0)}px solid transparent;
`

interface TriangleProps {
  vagueConfig: VagueConfig
}

export const TriangleWtapper = styled.svg<TriangleProps>`
  position: absolute;
  top: 0;
  left: 0;
  filter: blur(${props => (props.vagueConfig.display ? props.vagueConfig.gaussianBlur : 0)}px);
`

interface SvgIconProps {
  vagueConfig: VagueConfig
}

export const SvgIconWapper = styled.svg<SvgIconProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: blur(${props => (props.vagueConfig.display ? props.vagueConfig.gaussianBlur : 0)}px);
`
