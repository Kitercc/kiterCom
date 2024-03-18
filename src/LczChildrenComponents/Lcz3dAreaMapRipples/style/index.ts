import styled from 'styled-components'
import { Style } from '../components/Ripple'

interface RipplesContainProps {
  styleObj: Style
  haloSpeed: number
  haloInterval: number
}

export const RipplesContain = styled.div<RipplesContainProps>`
  position: relative;
  z-index: 1;
  div {
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => props.styleObj.minw}px;
    height: ${props => props.styleObj.minw}px;
    background: ${props => props.styleObj.bgc};
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${props => props.styleObj.shadow};
    pointer-events: none;
  }
`
