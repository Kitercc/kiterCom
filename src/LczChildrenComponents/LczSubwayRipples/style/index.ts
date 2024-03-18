import styled from 'styled-components'
import { Style } from '../type'

interface wrapperProps {
  styleObj: Style
  name: string
  haloSpeed: number
  haloInterval: number
  aniamteName?: string
}

export const LczRipplesWrapper = styled.div<wrapperProps>`
  ${props => (props.name ? `&.${props.name}` : '')} {
    position: relative;
    z-index: 1;

    div {
      width: ${props => props.styleObj.minw || 1}px;
      height: ${props => props.styleObj.minw || 1}px;
      background: ${props => props.styleObj.bgc};
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-shadow: ${props => props.styleObj.shadow};
      pointer-events: none;
    }

    ${props => getAnimateStyle(props)}

    @keyframes circle-opacity-${props => props.name || props.aniamteName} {
      0% {
        width: ${props => props.styleObj.minw}px;
        height: ${props => props.styleObj.minw}px;
        opacity: 0;
      }

      10% {
        width: ${props => props.styleObj.minw}px;
        height: ${props => props.styleObj.minw}px;
        opacity: 1;
      }

      100% {
        width: ${props => props.styleObj.maxw}px;
        height: ${props => props.styleObj.maxw}px;
        opacity: 0;
      }
    }
  }
`

export function getAnimateStyle(props: wrapperProps) {
  const { name, aniamteName, haloSpeed, haloInterval } = props
  const _frequency = Math.ceil(haloSpeed / haloInterval)
  let aniamteStr = ''
  new Array(_frequency).fill(null).forEach((_, i) => {
    aniamteStr += `
         div:nth-child(${i + 1}){
          animation: circle-opacity-${name || aniamteName} ${haloSpeed}s  ${haloInterval * i}s ease-out infinite;  
        }
      `
  })

  return aniamteStr
}
